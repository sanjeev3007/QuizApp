"use client";
import { AI } from "@/actions/chat-stream";
import { PartialAnswer } from "@/schemas/chat";
import {
  StreamableValue,
  useActions,
  useStreamableValue,
  useUIState,
} from "ai/rsc";
import Image from "next/image";
import botIcon from "@/assets/Images/bot_icon.png";
import stars_icon from "@/assets/Images/stars_icon.png";
import { cn, nanoid } from "@/lib/utils";
import { UserMessage } from "./user-message";

type BotMessageProps = {
  message: StreamableValue<PartialAnswer>;
  messageId?: string;
  showSuggestions: boolean;
};

export const BotMessage: React.FC<BotMessageProps> = ({
  message,
  messageId,
  showSuggestions,
}) => {
  const [data] = useStreamableValue<PartialAnswer>(message);
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submit } = useActions();

  const followUp = async (inputValue: string) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage message={inputValue} />,
      },
    ]);

    const res = await submit(inputValue);

    setMessages((currentMessages) => [...currentMessages, res as any]);
  };

  console.log(data, messageId, messages);

  if (!data) return;
  return (
    <div className="flex-1 relative w-full">
      <div className="flex w-full justify-start gap-x-2 max-w-4xl mx-auto h-full">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          <Image src={botIcon} alt="user" className="stroke-orange-300" />
        </div>
        <div
          className={
            "w-fit grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F0F6FA] text-[#5B8989] bg-[#F0F6FA] p-4 rounded-lg rounded-ss-none whitespace-pre-wrap"
          }
        >
          {data?.answer}
        </div>
      </div>
      <div className={cn(showSuggestions ? "inline-block" : "hidden")}>
        {!!data?.relatedQuestions?.length && (
          <div className="flex items-center max-w-3xl w-full mx-auto mt-[2rem] mb-2 text-[#2F4F4F] text-sm font-medium">
            Suggestions for you
            <div className="ml-1">
              <Image src={stars_icon} alt="" />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl w-full mx-auto">
          {data?.relatedQuestions?.map((q, i) => (
            <button
              key={i}
              type="button"
              className="flex items-center w-full h-full cursor-pointer rounded-md border border-[#E4E2DC] bg-[#F6F5F4] px-3 py-2 text-sm text-[#5B8989] hover:bg-[#E4E2DC]"
              onClick={() => followUp(q!)}
            >
              <div className="mr-1">
                <Image src={stars_icon} alt="" />
              </div>
              <div className="text-left ml-2">{q}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const StaticBotMessage: React.FC<{
  message: string;
}> = ({ message }) => {
  if (!message) return;
  return (
    <div className="flex-1 relative w-full">
      <div className="flex w-full justify-start gap-x-2 max-w-4xl mx-auto h-full">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          <Image src={botIcon} alt="user" className="stroke-orange-300" />
        </div>
        <div
          className={
            "w-fit grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F0F6FA] text-[#5B8989] bg-[#F0F6FA] p-4 rounded-lg rounded-ss-none whitespace-pre-wrap"
          }
        >
          {JSON.parse(message)?.answer}
        </div>
      </div>
    </div>
  );
};
