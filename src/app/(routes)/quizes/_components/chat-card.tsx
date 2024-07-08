"use client";
import chatsIcon from "@/assets/Images/chatsIcon.png";
import start_chat_icon from "@/assets/Images/start_chat_icon.png";
import chatIcon from "@/assets/Images/chat-icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  totalChats: number;
};
const ChatCard = ({ totalChats }: Props) => {
  const router = useRouter();

  const navigateTo = async () => {
    router.push("/chat-bot");
  };

  return (
    <div className="bg-[#F0F6FA] w-full py-4 px-6 flex flex-col justify-center content-center items-center rounded-lg">
      <Image src={chatIcon} alt="" />
      <span className="text-[#2F4F4F] text-lg font-extrabold mt-2">
        Doubt Solving
      </span>
      <div className="text-center text-[#5B8989] text-sm font-medium mt-2">
        {totalChats > 0
          ? "Ask anything. Anytime"
          : "Chat with Noah to get your academic doubts resolved for any subject"}
      </div>
      {totalChats > 0 && (
        <div className="w-full text-[#5B8989] flex justify-center content-center items-center mt-[2rem]">
          <Image src={chatsIcon} alt="chat" />
          <span className="font-bold text-xl ml-1">{totalChats}</span>
          <span className="text-sm font-medium mt-1 ml-1">chats done</span>
        </div>
      )}
      <div className={cn("w-[70%] sm:w-[55%] lg:w-full flex justify-center")}>
        <Button
          className={cn(
            "w-max mt-[1.5rem] py-[6px] px-[12px] bg-[#E98451] text-sm font-semibold text-[#FFF] hover:bg-[#E98451]"
            // mobileScreen && "fixed bottom-3 w-[90%]" // Conditionally apply 'fixed bottom-0' for mobile screens
          )}
          onClick={() => navigateTo()}
        >
          Start Chat
          {totalChats > 0 ? (
            <FastForwardOutlinedIcon className="ml-[0.5rem]" fontSize="small" />
          ) : (
            <Image src={start_chat_icon} alt="chat" className="ml-[0.5rem]" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatCard;
