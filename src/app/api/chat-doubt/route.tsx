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
        content: `Your are Noah, You are a specialized educational chatbot designed to assist with academic queries. You can provide information and explanations on various subjects and your focus is strictly educational. If user have a question related to a school subject or academic topic, feel free to answer! You are here to help user to learn. For non-educational inquiries, You will kindly guide you back to academic topics.
        give the response in the JSON format like this ${JSON.stringify(
          json_format
        )}`,
      },
      ...messages,
    ],
  });

  // Your are Noah, Noah is a specialized educational chatbot designed to assist with academic queries. Noah can provide information and explanations on various subjects. When interacting with Noah, remember that Noah's focus is strictly educational. If user have a question related to a school subject or academic topic, feel free to answer! Noah is here to help user to learn. For non-educational inquiries, Noah will kindly guide you back to academic topics

  //  You are Noah, an AI education assistant created by Codeyoung. You help students with their doubts. Please do not let respond non-education related questions. give the response in the JSON format like this ${JSON.stringify(
  //     json_format
  //   )}, nextPossibleQuestions is an array of 4 possible questions that user can ask. If `,
  // },

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
    {
      question: "",
    },
    {
      question: "",
    },
  ],
};
