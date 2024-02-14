"use client";

import { Bot } from "lucide-react";
import OptionsBox from "./options-box";
import QuestionBox from "./question-box";
import ExplainationPopover from "./explaination-popover";
export default function MCQBox({
  currentQuestion,
  handleNext,
  submissions,
  questionIndex,
}: {
  currentQuestion: any;
  handleNext: any;
  submissions: any;
  questionIndex: number;
}) {
  const correctAnswer = JSON.parse(currentQuestion?.options).find(
    (option: any) => option.correct == "true"
  )?.text;
  return (
    <div className="max-w-lg my-2 flex items-start w-full gap-x-2">
      <div className="bg-orange-300 w-10 h-10 rounded-full grid place-items-center">
        <Bot size={20} className="stroke-white" />
      </div>
      <div className="flex-1 relative">
        <QuestionBox
          question={currentQuestion?.question}
          questionIndex={questionIndex}
        />
        <OptionsBox
          options={currentQuestion?.options}
          handleNext={handleNext}
          submissions={submissions}
          questionId={currentQuestion?.uuid}
        />
        <ExplainationPopover
          question={currentQuestion?.question}
          answer={correctAnswer}
        />
      </div>
    </div>
  );
}
