import { getChat } from "@/actions/chat-doubt.server";
import { Chat } from "../../_components/chat";
import { AI } from "@/actions/chat-stream";

export default async function ChatPage({
  params: { userid, chatid },
}: {
  params: { userid: string; chatid: string };
}) {
  const { chat, doubtSolved } = await getChat(userid, chatid);
  console.log(chat?.messages);
  return (
    <AI initialAIState={{ chatId: chatid, messages: chat?.messages || [] }}>
      <div className="h-[calc(100vh-4rem)] pb-[5rem] left-0 w-full">
        <Chat
          id={chatid}
          user_id={userid}
          initialMessages={chat?.messages}
          doubtSolved={doubtSolved}
        />
      </div>
    </AI>
  );
}
