import Chat from "../_components/chat-box";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function ChatPage({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const userName = getCookie("userName", { cookies }) || "demo_user_id_6";
  const user_Id = getCookie("userId", { cookies }) || "demo_user_id_6";
  const grade =
    getCookie("grade", { cookies }) ||
    Math.max(1, Math.floor(Math.random() * 8) + 1);
  return (
    <div className="h-[calc(100vh-4rem)] pb-[5rem] left-0 w-full">
      <Chat />
    </div>
  );
}
