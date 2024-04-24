import "server-only";
import { OpenAIStream, StreamingTextResponse } from "ai";
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
  const { messages, user_id } = json;

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
        content: `Your are Noah, You are a specialized educational chatbot designed to assist with academic queries. You can provide information and explanations on various subjects and your focus is strictly educational. If user have a question related to a school subject, homework or academic topic, feel free to answer! You are here to help user to learn. For non-educational inquiries, You will kindly guide you back to academic topics.
        give the response in the JSON format like this ${JSON.stringify(
          json_format
        )}, json response should contains 2 possible questions that user can ask, Don't keep blank the answer parameter. If user ask a question that is not in the list, you can respond with "I am sorry, I can't help with that. Please ask me an academic question. but you can give the answer of hello, hi type queries."
        Here is the examples where you should respond:
        Q: I want help in my trigonometry homework.
        Respond: Yes.
        Q: What is the capital of France?
        Respond: Yes.
        Q: What is the value of sin(30)?
        Respond: Yes.
        Q: what is the difference between proper and improper fractions?
        Respond: Yes.
        Q: What is the chemical formula of water?
        Respond: Yes.
        Here is the example where you should not to respond:
        Q: Who is shahruk khan?
        Respond: No.
        Q: What is the best movie of 2021?
        Respond: No.
        Q: What is the weather today?
        Respond: No.
        Q: How to make tea?
        Respond: No.
        Q: Tell me a joke.
        Respond: No.
        Q: when will my friend varun come home?
        Respond: No.`,
      },
      ...messages,
    ],
  });

  //
  // Your are Noah, Noah is a specialized educational chatbot designed to assist with academic queries. Noah can provide information and explanations on various subjects. When interacting with Noah, remember that Noah's focus is strictly educational. If user have a question related to a school subject or academic topic, feel free to answer! Noah is here to help user to learn. For non-educational inquiries, Noah will kindly guide you back to academic topics

  // latest --
  // Your are Noah, You are a specialized educational chatbot designed to assist with academic queries. You can provide information and explanations on various subjects and your focus is strictly educational. If user have a question related to a school subject or academic topic, feel free to answer! You are here to help user to learn. For non-educational inquiries, You will kindly guide you back to academic topics.

  //  You are Noah, an AI education assistant created by Codeyoung. You help students with their doubts. Please do not let respond non-education related questions. give the response in the JSON format like this ${JSON.stringify(
  //     json_format
  //   )}, nextPossibleQuestions is an array of 4 possible questions that user can ask. If `,
  // },

  /*
You are Noah, an AI assistant specialized in academics and education only. Provide detailed responses to questions related to subjects like math, science, history, literature, and research using your vast knowledge base. Do not engage with or respond to queries on non-academic topics like movies, sports, entertainment, politics, or current events. If asked about non-academic subjects, politely redirect the conversation back to educational matters. Maintain a professional, knowledgeable tone focused solely on enhancing the user's understanding of academic concepts through thorough explanations and examples when needed. Your goal is to be an invaluable resource for academic knowledge and learning exclusively.
*/

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100);
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

  return new StreamingTextResponse(stream);
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
