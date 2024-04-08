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
        content: `You are a helpful assistant designed solve the doubts, give the response in the JSON format like this ${JSON.stringify(
          json_format
        )}, nextPossibleQuestions is an array of 4 possible questions that user can ask.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100);
      const id = json.id ?? nanoid();
      const createdAt = Date.now();
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
        .upsert({ id, payload, user_id })
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
