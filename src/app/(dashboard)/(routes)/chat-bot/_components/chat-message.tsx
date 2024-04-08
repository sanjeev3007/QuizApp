"use client";

import Image from "next/image";
import FeedBackForm from "./feedback-form";
import botIcon from "@/assets/Images/bot_icon.png";
import userIcon from "@/assets/Images/user_icon.png";
import { Message } from "ai";
import SuggestedQuestionForm from "./suggestion-form";
import { UseChatHelpers } from "ai/react";

export interface ChatMessageProps
  extends Pick<UseChatHelpers, "append" | "setInput"> {
  message: Message;
  setInput: UseChatHelpers["setInput"];
  id?: string;
  index?: number;
  messagesLength?: number;
}
export default function ChatMessage({
  message,
  messagesLength,
  index,
  setInput,
  append,
  id,
}: ChatMessageProps) {
  return (
    <div className="flex-1 relative w-full">
      <div className="flex w-full justify-start gap-x-2 mt-4">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          {message.role === "user" ? (
            <Image src={userIcon} alt="user" className="stroke-white" />
          ) : (
            <Image src={botIcon} alt="user" className="stroke-orange-300" />
          )}
        </div>
        <div className="w-fit grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F0F6FA] text-[#5B8989] bg-[#F0F6FA] p-4 rounded-lg rounded-ss-none">
          {message.role === "user"
            ? message.content
            : (() => {
                try {
                  const parsedContent = JSON.parse(message.content);
                  return parsedContent.answer ?? message.content;
                } catch (error) {
                  return message.content;
                }
              })()}
          {messagesLength &&
            index === messagesLength - 1 &&
            message.role === "assistant" &&
            (() => {
              try {
                const parsedContent = JSON.parse(
                  message.content
                    .replace(/\\n/g, "\\\\n")
                    .replace(/\\'/g, "\\'")
                );
                return parsedContent.nextPossibleQuestions?.map(
                  (ques: { question: string }, i: number) => (
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
                  )
                );
              } catch (error) {
                return null;
              }
            })()}
        </div>
      </div>
    </div>
  );
}
