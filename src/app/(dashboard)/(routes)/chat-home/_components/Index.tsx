"use client";

import React from "react";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import noahSmallIcon from "@/assets/Images/noahSmallIcon.png";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import ion_send from "@/assets/Images/ion_send.png";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./index.css";
import { nanoid } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useChatQuery from "@/store/chat-query";

type Props = {
  user_Id: string;
};

const Index = (props: Props) => {
  const id = nanoid();
  const [userInput, setUserInput] = useState("");
  const router = useRouter();
  const chatQuery = useChatQuery((state) => state);

  const handleUserInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle user input
    if (userInput === "") {
      toast({ title: "Enter the Question", duration: 3000 });
    }
    // converting user input to lowercase and removing any extra spaces
    const optimizedAnswer: string = userInput.toLowerCase().trim();

    setUserInput("");
    chatQuery.setQuery(optimizedAnswer);

    router.push(`/chat-bot/${props.user_Id}/${id}`);
  };
  return (
    <div className="flex flex-col justify-center content-center items-center">
      <div className="flex justify-between content-center items-center">
        <Image src={noahSmallIcon} alt="noah" className="h-[54px] w-[54px]" />
        <div className="ml-4 text-4xl text-[#2F4F4F] font-extrabold">
          Lets <span className="headerClrTxt">smash doubts</span> together!
        </div>
      </div>
      <div className="text-[#5B8989] text-lg font-medium mt-6">
        What would you like to discuss about today?
      </div>
      <div className="w-full mt-8 md:max-w-3xl">
        <form
          onSubmit={handleUserInput}
          className="bg-white h-[4rem] px-4 flex items-center justify-center gap-x-2 w-full"
        >
          <div className="w-full p-1 rounded-lg flex bg-[#FFF] border-2 border-[#95B2B2]">
            <Input
              type="text"
              placeholder="Ask something..."
              className="w-full border-0 focus-visible:outline-none focus-visible:border-0 focus-visible:ring-0"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button
              type="submit"
              className="border-0 py-[4px] px-[12px] text-sm fomt-semibold text-[#FFF] bg-[#E98451] hover:bg-[#E98451]"
            >
              Start Chat
              <ArrowRightOutlinedIcon fontSize="small" className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
      <div className="flex-col justify-around border-2 border-[#E4E2DC] bg-[#F6F5F4] p-6 mt-[4rem]">
        <div className="text-center text-sm font-bold text-[#2F4F4F]">
          Do you know?
        </div>
        <div className="w-full text-center text-sm font-medium text-[#5B8989] mt-3 md:max-w-lg">
          Zero is a fascinating number. It's the only even number that can't be
          represented by Roman numerals.
        </div>
      </div>
    </div>
  );
};

export default Index;
