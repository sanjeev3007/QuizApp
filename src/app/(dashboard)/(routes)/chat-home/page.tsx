import React from "react";
import {
  recentChat,
} from "@/app/supabase-server";
import Index from "./_components/Index";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

type Props = {};

const Page = async (props: Props) => {
  const user_Id = await getCookie("userId", { cookies }) || "chat_doubt_123";
  const recent_chats = await recentChat(user_Id!)
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <Index user_Id={user_Id} recentChats={recent_chats} />
    </div>
  );
};

export default Page;
