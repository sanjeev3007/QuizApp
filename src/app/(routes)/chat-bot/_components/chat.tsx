"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import ion_send from "@/assets/Images/ion_send.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Message } from "ai";
import { nanoid } from "nanoid";
import { useActions, useAIState, useUIState } from "ai/rsc";
import { AI } from "@/actions/chat-stream";
import { UserMessage } from "./user-message";
import { ChatMessage } from "./chat-message";
import useChatQuery from "@/store/chat-query";

type ChatProps = {
  id: string;
  user_id: string;
  initialMessages: Message[];
  doubtSolved: boolean;
};

export function Chat({ id, user_id, initialMessages, doubtSolved }: ChatProps) {
  const [messages] = useUIState();
  const [aiState] = useAIState();
  const [doubtSolveStatus, setDoubtSolveStatus] =
    useState<boolean>(doubtSolved);
  const bottom = useRef<HTMLDivElement>(null);
  const chatQuery = useChatQuery((state) => state);
  const [inputValue, setInputValue] = useState(chatQuery.query ?? "");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { submit } = useActions();
  const [_, setMessages] = useUIState<typeof AI>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: nanoid(),
        component: <UserMessage message={inputValue} />,
      },
    ]);

    const res = await submit(inputValue, id);

    setMessages((currentMessages) => [...currentMessages, res as any]);

    setInputValue("");
    console.log(aiState);
  };
  console.log(messages);

  useEffect(() => {
    const focusInput = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusInput);

    return () => {
      window.removeEventListener("keydown", focusInput);
    };
  }, []);

  return (
    <ScrollArea className="h-full w-full flex flex-col">
      <div className="flex-1 px-2 md:px-8">
        <ChatMessage
          messages={messages}
          aiState={aiState}
          initialMessages={initialMessages}
        />
        {!doubtSolveStatus && (
          <form
            onSubmit={onSubmit}
            className="bg-white h-[5rem] border-t px-4 flex items-center justify-center gap-x-2 fixed left-0 bottom-0 w-full shadow-md z-10"
          >
            <div className="w-full p-1 rounded-lg md:max-w-3xl flex bg-[#FFF] border-2 border-[#95B2B2]">
              <Input
                type="text"
                placeholder="Ask anything ..."
                className="w-full border-0 focus-visible:outline-none focus-visible:border-0 focus-visible:ring-0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                type="submit"
                className="border-0 bg-[#FFF] hover:bg-[#FFF]"
              >
                <Image src={ion_send} alt="" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </ScrollArea>
  );
}
