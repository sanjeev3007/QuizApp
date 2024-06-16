"use client";
import { AI } from "@/actions/chat-stream";
import { PartialAnswer } from "@/schemas/chat";
import { useActions, useStreamableValue, useUIState } from "ai/rsc";
import Image from "next/image";
import botIcon from "@/assets/Images/bot_icon.png";

type BotMessageProps = {
  message: PartialAnswer;
};

export const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  const [data] = useStreamableValue<PartialAnswer>(message);
  const [_, setMessages] = useUIState<typeof AI>();
  const { submit } = useActions();

  // const followUp = async (inputValue: string) => {
  //   setMessages((currentMessages) => [
  //     ...currentMessages,
  //     {
  //       id: nanoid(),
  //       component: <UserMessage message={inputValue} />,
  //     },
  //   ]);

  //   const res = await submit(inputValue);

  //   setMessages((currentMessages) => [...currentMessages, res as any]);
  // };
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
    </div>
  );
};
