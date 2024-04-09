"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import ion_send from "@/assets/Images/ion_send.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { ChatList } from "./chat-list";
import { Message } from "ai";
import SuggestedQuestionForm from "./suggestion-form";

type ChatProps = {
  id: string;
  user_id: string;
  initialMessages: Message[];
  initialQuestion?: string;
};

export function Chat({
  id,
  user_id,
  initialMessages,
  initialQuestion,
}: ChatProps) {
  const [suggestions, setSuggestions] = useState<[{ question: string }] | null>(
    null
  );
  const {
    messages,
    append,
    isLoading,
    input,
    handleSubmit,
    handleInputChange,
    setInput,
  } = useChat({
    initialMessages,
    id,
    body: {
      id,
      user_id,
    },
    async onResponse(response) {
      setSuggestions(null);
      if (response.status === 401) {
        console.log(response);
      }
    },
    onFinish(response) {
      setSuggestions(JSON.parse(response.content).nextPossibleQuestions);
    },
    api: "/api/chat-doubt",
  });
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, suggestions]);

  useEffect(() => {
    if (messages.length === 0) {
      append({
        role: "user",
        content: initialQuestion || "Hi",
      });
    }

    if (
      suggestions == null &&
      messages[messages.length - 1]?.role === "assistant"
    ) {
      setSuggestions(
        JSON.parse(messages[messages.length - 1].content).nextPossibleQuestions
      );
    }
  }, []);

  return (
    <ScrollArea className="h-full w-full flex flex-col">
      <div className="flex-1 px-2 md:px-8">
        <div className="pb-4 max-w-4xl mx-auto h-full w-full">
          <ChatList
            messages={messages}
            chat_id={id}
            user_id={user_id}
            append={append}
            setInput={setInput}
            id={id}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl w-full mx-auto">
          {suggestions?.map((ques: { question: string }, i: number) => (
            <SuggestedQuestionForm
              ques={ques}
              key={i}
              setInput={setInput}
              onSubmit={async (value) => {
                await append({
                  id,
                  content: value,
                  role: "user",
                });
              }}
            />
          ))}
        </div>
        <div className="" ref={bottom}></div>
        <form
          onSubmit={handleSubmit}
          className="bg-white h-[4rem] border-t px-4 flex items-center justify-center gap-x-2 fixed left-0 bottom-0 w-full shadow-md z-10"
        >
          <div className="w-full rounded-lg md:ml-[-7rem] md:max-w-3xl flex bg-[#FFF] border-2 border-[#95B2B2]">
            <Input
              type="text"
              placeholder="Enter your answer e.g. 'A'"
              className="w-full border-0 focus-visible:outline-none focus-visible:border-0 focus-visible:ring-0"
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="border-0 bg-[#FFF] hover:bg-[#FFF]"
              disabled={isLoading}
            >
              <Image src={ion_send} alt="" />
            </Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
}
