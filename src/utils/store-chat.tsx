"use server";
import { nanoid } from "ai";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AIMessage } from "@/actions/chat-stream";
import { getCookie } from "cookies-next";
import { revalidatePath } from "next/cache";

type StoreChats = {
  messages: AIMessage[];
  chat_id: string;
};

export const storeChat = async ({ messages, chat_id }: StoreChats) => {
  const user_id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID!;
  const supabase = createServerComponentClient({ cookies });

  const title = messages[0].content.substring(0, 100);
  const id = chat_id ?? nanoid();
  const createdAt = Date.now();
  const stringDate = new Date(createdAt).toISOString();
  const path = `/chat-bot/${user_id}/${id}`;
  const payload = {
    id,
    title,
    user_id,
    createdAt,
    path,
    messages,
  };
  // Insert chat into database.
  await supabase
    .from("chats_doubt_solve")
    .upsert({ id, payload, user_id, createdAt: stringDate })
    .throwOnError();

  revalidatePath("/", "layout");
};
