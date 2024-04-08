"use client";

import { Bot } from "lucide-react";
import QuestionBox from "./question-box";
import Image from "next/image";
import userIcon from "@/assets/Images/user_icon.png";
export default function ChatBox({
  currentQuestion,
  questionIndex
}: {
  currentQuestion: any;
  questionIndex: number;
}) {
  return (
    <div className="max-w-3xl my-2 flex items-start w-full gap-x-2">
      <div className="bg-orange-300 w-10 h-10 rounded-full grid place-items-center">
        <Image src={userIcon} alt="bot" className="stroke-white" />
      </div>
      <div className="flex-1">
        <QuestionBox
          question={currentQuestion?.question}
          questionIndex={questionIndex}
        />
      </div>
    </div>
  );
}
