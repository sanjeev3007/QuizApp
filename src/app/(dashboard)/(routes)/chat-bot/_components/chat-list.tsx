import { type Message } from "ai";

import ChatMessage from "./chat-message";
import FeedBackForm from "./feedback-form";
import { UseChatHelpers } from "ai/react";

export interface ChatList {
  messages: UseChatHelpers["messages"];
  setInput: UseChatHelpers["setInput"];
  append: UseChatHelpers["append"];
  chat_id: string;
  user_id: string;
  isLoading?: boolean;
  id?: string;
}

export function ChatList({
  messages,
  chat_id,
  user_id,
  setInput,
  append,
  id,
  isLoading,
}: ChatList) {
  if (!messages.length) {
    return null;
  }
  return (
    <div className="relative mx-auto max-w-2xl px-4 space-y-8">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage
            message={message}
            messagesLength={messages.length}
            index={index}
            setInput={setInput}
            append={append}
            id={id}
            isLoading={isLoading}
          />
          {index == messages.length - 1 && message.role === "assistant" && (
            <FeedBackForm
              key={index}
              answerId={index + 1}
              answer={message.content}
              chat_id={chat_id}
              user_id={user_id}
            />
          )}
        </div>
      ))}
    </div>
  );
}
