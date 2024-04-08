"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ChatBox from "./chat";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Answers from "./answers";
import { Input } from "@/components/ui/input";
import ion_send from "@/assets/Images/ion_send.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ChatProps = {
};

export default function Chat({}: ChatProps) {
  const bottom = useRef<HTMLDivElement>(null);
  const arr = [
    {
      question: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,"
    },
    {
      question: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,"
    },
    {
      question: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,"
    },
    {
      question: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,"
    },
    {
      question: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,"
    },
  ]

  const handleUserInput = (e: FormEvent<HTMLFormElement>) => {
    console.log("skhd")
  };

  return (
    <ScrollArea className="h-full w-full flex flex-col">
      <div className="flex-1 px-2 md:px-8">
        <div className="pb-4 max-w-4xl mx-auto h-full w-full">
          {arr.map((question, i) => (
              <div className="grid" key={i}>
                <ChatBox
                  currentQuestion={question}
                  questionIndex={i + 1}
                />
                <Answers index={i} />
              </div>
            ))}
        </div>
        <div className="" ref={bottom}></div>
        <form
          onSubmit={handleUserInput}
          className="bg-white h-[4rem] border-t px-4 flex items-center justify-center gap-x-2 fixed left-0 bottom-0 w-full shadow-md z-10"
        >
          <div className="w-full rounded-lg md:ml-[-7rem] md:max-w-3xl flex bg-[#FFF] border-2 border-[#95B2B2]">
            <Input
              type="text"
              placeholder="Enter your answer e.g. 'A'"
              className="w-full border-0 focus-visible:outline-none focus-visible:border-0 focus-visible:ring-0"
              value={"userInput"}
              // onChange={(e) => setUserInput(e.target.value)}
            />
            <Button
              type="submit"
              className="border-0 bg-[#FFF] hover:bg-[#FFF]"
            >
              <Image src={ion_send} alt="" />
            </Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
}
