"use client";

import { Bot } from "lucide-react";
import OptionsBox from "./options-box";
import QuestionBox from "./question-box";

export default function MCQBox({
  currentQuestion,
  handleNext,
  setSelectedChoice,
  submissions,
  questionIndex,
}: {
  currentQuestion: any;
  handleNext: any;
  setSelectedChoice: any;
  submissions: any;
  questionIndex: number;
}) {
  return (
    <div className="max-w-lg my-2 flex items-start w-full gap-x-2">
      <div className="bg-orange-300 w-10 h-10 rounded-full grid place-items-center">
        <Bot size={20} className="stroke-white" />
      </div>
      <div className="flex-1">
        <QuestionBox
          question={currentQuestion?.question}
          questionIndex={questionIndex}
        />
        <OptionsBox
          options={currentQuestion?.options}
          handleNext={handleNext}
          setSelectedChoice={setSelectedChoice}
          submissions={submissions}
          questionId={currentQuestion?.uuid}
        />
      </div>
    </div>
  );
}
