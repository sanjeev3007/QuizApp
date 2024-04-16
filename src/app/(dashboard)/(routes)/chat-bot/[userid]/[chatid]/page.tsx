import { getChat } from "@/actions/chat-doubt";
import { Chat } from "../../_components/chat";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function ChatPage({
  params: { userid, chatid },
}: {
  params: { userid: string; chatid: string };
}) {
  //   const userName = getCookie("userName", { cookies }) || "demo_user_id_6";
  //   const user_Id = getCookie("userId", { cookies }) || "demo_user_id_6";
  //   const grade =
  //     getCookie("grade", { cookies }) ||
  //     Math.max(1, Math.floor(Math.random() * 8) + 1);

  const chat = await getChat(userid, chatid);
  return (
    <div className="h-[calc(100vh-4rem)] pb-[5rem] left-0 w-full">
      <Chat id={chatid} user_id={userid} initialMessages={chat?.messages} />
    </div>
  );
}
