"use client";

import { feedbackQuiz } from "@/app/supabase-client-provider";
import { cn } from "@/lib/utils";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

const reasons = [
  {
    id: 1,
    text: "Question is not clear",
  },
  {
    id: 2,
    text: "Options are not clear",
  },
  {
    id: 3,
    text: "Didn't like the question",
  },
  {
    id: 4,
    text: "Irrelevant question",
  },
];

export default function FeedBackForm({ questionId }: { questionId: string }) {
  const [response, setResponse] = useState<string | null>(null);
  const [feedbackDone, setFeedbackDone] = useState<boolean>(false);

  const handleReason = (reasonId: number) => {
    const reason = reasons[reasonId - 1].text;
    submitFeedback(response ?? "bad", reason);
  };

  const handleResponse = async (res: string) => {
    setResponse(res);
    if (res === "good") {
      submitFeedback(res, null);
    }
  };

  const submitFeedback = async (res: string, reason: string | null) => {
    const user = sessionStorage.getItem("quiz_user");
    const userId = JSON.parse(user!).id;
    if (!userId) return;
    await feedbackQuiz({
      questionId: questionId,
      userId: userId,
      reason: reason,
      response: res as string,
    });
    setFeedbackDone(true);
  };

  const showOptions = response === "bad";

  if (feedbackDone) return;
  return (
    <div className="py-2 space-y-2">
      <div className="flex gap-x-2 items-center">
        <ThumbsUp
          onClick={() => handleResponse("good")}
          className={cn(
            "stroke-slate-500 w-4 h-4 hover:fill-slate-300 cursor-pointer",
            response === "good" && "fill-slate-300"
          )}
        />
        <ThumbsDown
          onClick={() => handleResponse("bad")}
          className={cn(
            "stroke-slate-500 w-4 h-4 hover:fill-slate-300 cursor-pointer",
            response === "bad" && "fill-slate-300"
          )}
        />
      </div>
      <div className="flex flex-wrap gap-1">
        {showOptions &&
          reasons.map((reason) => (
            <div
              key={reason.id}
              className="py-1 px-4 rounded-md bg-white border hover:bg-slate-50 cursor-pointer"
              onClick={() => handleReason(reason.id)}
            >
              <span className="text-xs font-medium">{reason.text}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
