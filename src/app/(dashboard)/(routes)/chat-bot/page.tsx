import React from "react";
import { recentChat } from "@/app/supabase-server";
import ChatHome from "./_components/home";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const HomePage = async () => {
  const userId = getCookie("userId", { cookies });
  const recent_chats = await recentChat(userId!);
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <ChatHome user_Id={userId!} recentChats={recent_chats} />
    </div>
  );
};

export default HomePage;
