import { cn } from "@/lib/utils";
import { UIState } from "@/actions/chat-stream";
import { useEffect, useRef } from "react";

export interface ChatMessageProps {
  messages: UIState;
  aiState: any;
  initialMessages: any[];
}

export function ChatMessage({
  messages,
  aiState,
  initialMessages,
}: ChatMessageProps) {
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(messages, aiState);
  }, [messages, aiState?.messages, initialMessages]);
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-4 max-w-3xl mx-auto pt-10 overflow-y-auto"
      )}
    >
      {messages.map((message, index: number) => {
        return (
          <div className="" key={message.id ?? index}>
            {message.component}
          </div>
        );
      })}
      <div ref={bottomScrollRef} className="pb-12" />
    </div>
  );
}
