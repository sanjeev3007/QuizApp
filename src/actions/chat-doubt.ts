import { Chat } from "@/types/chat.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getChat(user_id: string, chat_id: string) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("chats_doubt_solve")
    .select("payload")
    .eq("user_id", user_id)
    .eq("id", chat_id)
    .single();
  if (error) {
    console.log(error);
  }
  return (data?.payload as Chat) ?? null;
}

export async function addFeedback(
  user_id: string,
  chat_id: string,
  response: string,
  message: any
) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("feedback_doubt_solve")
    .upsert({ user_id, chat_id, response, message });
  if (error) {
    console.log(error);
  }
  console.log(data);
}
