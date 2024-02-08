"use client";

import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function OptionsBox({
  options,
  handleNext,
  setSelectedChoice,
  submissions,
  questionId,
}: {
  options: any;
  handleNext: any;
  setSelectedChoice: any;
  submissions: any;
  questionId: string;
}) {
  const completedQuestion = submissions.find(
    (option: any) => option.questionId === questionId
  );

  const handleOptionClick = (index: number) => {
    if (completedQuestion) {
      return;
    }
    setSelectedChoice(index);
    handleNext(index);
  };

  const alphabet = ["A", "B", "C", "D"];

  return (
    <div className="space-y-2 mt-2">
      <div className="grid grid-cols-2 gap-2">
        {JSON.parse(options).map((option: any, i: number) => (
          <button
            type="button"
            disabled={completedQuestion}
            key={i}
            onClick={() => handleOptionClick(i)}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg border border-orange-200 bg-white hover:bg-orange-50 cursor-pointer transition-all",
              completedQuestion?.selected.text === option.text &&
                option.correct === "true"
                ? "bg-emerald-200"
                : completedQuestion?.selected.text === option.text &&
                  option.correct === "false"
                ? "bg-red-200"
                : ""
            )}
          >
            <div className="rounded-full bg-slate-100 w-6 h-6 flex items-center justify-center text-sm font-semibold">
              {alphabet[i]}
            </div>
            <p className="text-sm">{option.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
