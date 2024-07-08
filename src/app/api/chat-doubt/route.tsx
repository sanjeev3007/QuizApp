import "server-only";
import { OpenAIStream, StreamingTextResponse, StreamData } from "ai";
import OpenAI from "openai";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { nanoid } from "@/lib/utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const supabase = createServerComponentClient({ cookies });
  const json = await req.json();
  const { messages, user_id, chatTitle } = json;
  const data = new StreamData();

  if (!user_id) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    stream: true,
    temperature: 0.5,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `Your are Noah, You are a friendly educational chatbot designed to assist with academic queries. You can provide information and explanations on various subjects. If user have a question related to a school subject, homework or academic topic, feel free to answer! You are here to help user to learn. Give your best to answer the question, If user is asking a question that is not educational, give the reason to not answer the question.\n
        Response in this json format and don't keep the blank to any parameter ${JSON.stringify(
          json_format
        )}, json response should contains 2 possible questions that user can ask, give the answe in the structured format.\n
        Here are some examples question where you should respond:
        Q: I want help in my trigonometry homework,
        Respond: 'Yes, I can help you with your trigonometry homework. What specific topic or problem do you need assistance with?',
        Q: What is the capital of France?
        Respond: 'The capital of France is Paris.',
        Q: What is the chemical formula of water?
        Respond: 'The chemical formula of water is H2O. This formula indicates that a water molecule consists of two hydrogen atoms (H) bonded to one oxygen atom (O). Each hydrogen atom shares a pair of electrons with the oxygen atom, forming covalent bonds, resulting in the molecular structure H-O-H, where the bond angle is approximately 104.5 degrees. Water is a vital substance for life on Earth and is essential for various biochemical processes and functions.',
        Q: Can we talk?,
        Respond: 'Of course! I am here to help you with your academic queries. What do you need assistance with?',
        Q: Hi, how are you?,
        Respond: 'Hello! I am here to help you with your academic queries. What do you need assistance with?',
        Q: Who are you?,
        Respond: 'I am Noah, A friendly educational chatbot designed to assist with academic queries. How can I help you today?',
        Q: Give me 5 facts.
        Respond: 'Sure! What topic would you like to learn about? I can provide you with interesting facts on a variety of subjects.',\n
        Here are some examples where you should not to respond:
        Q: Who is shahruk khan?,
        Respond: 'I am here to support your learning. Can we focus our discussion on a topic related to your studies?',
        Q: What is the best movie of 2021?,
        Respond: 'As an educationally-focused AI, I encourage us to focus on your syllabus. Do you have a question about your study material?',
        Q: What is the weather today?
        Respond: 'My main function is to assist with your academic studies. Can we focus our discussion on your academic material?'.
        Q: How to make tea?
        Respond: 'I am dedicated to supporting your learning goals. Can I help you with an academic concept or topic?',
        Q: Tell me a joke.
        Respond: 'I am primarily designed to assist you with educational queries. Can we focus our discussion on your syllabus?',
        Q: when will my friend varun come home?
        Respond: 'Well I don't have that information, but I can help you with your academic queries. What do you need help with?'\n
        Don't neccessary to follow the above examples, you can give the response in your own way.`,
      },
      ...messages,
    ],
  });

  const generateTitle = async (messages: any, completion: string) => {
    const messagesList = [
      ...messages,
      {
        content: completion,
        role: "assistant",
      },
    ];
    const history = messagesList
      ?.map((message: any) => message.content)
      .join("\n");

    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that analyzes text to identify doubts or questions or basic conversation and generates title for them.",
        },
        {
          role: "user",
          content: `Analyze the following text and if it contains a doubt or question or basic conversation, generate a one title (7 words or less) for it, Don't put the 'Title:' or any mark in the starting of the text.\n
          ${history}`,
        },
      ],
    });
    return res.choices[0].message.content;
  };

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      let title;
      if (messages.length < 6) {
        title = await generateTitle(messages, completion);
      } else {
        title = chatTitle;
      }
      data.append({
        chat_title: title,
      });
      data.close();
      const id = json.id ?? nanoid();
      const createdAt = Date.now();
      const stringDate = new Date(createdAt).toISOString();
      const path = `/chat-bot/${user_id}/${id}`;
      const payload = {
        id,
        title,
        user_id,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: "assistant",
          },
        ],
      };
      // Insert chat into database.
      await supabase
        .from("chats_doubt_solve")
        .upsert({ id, payload, user_id, createdAt: stringDate })
        .throwOnError();
    },
  });

  return new StreamingTextResponse(stream, {}, data);
}

const json_format = {
  answer: "",
  nextPossibleQuestions: [
    {
      question: "",
    },
    {
      question: "",
    },
  ],
};
