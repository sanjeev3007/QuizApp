"use client";

import { feedbackQuiz } from "@/app/supabase-client-provider";
import { cn } from "@/lib/utils";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import FeedBackPopup from "./feedback-popup";

export default function FeedBackForm({
  answerId,
}: {
  answerId: number;
}) {
  const [response, setResponse] = useState<string | null>(null);
  const [feedbackDone, setFeedbackDone] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleResponse = async (res: string) => {
    setResponse(res);
    // if (res === "good") {
    //   submitFeedback(res, null);
    // }
  };

  const showOptions = response === "bad" || response === "good";

  if (feedbackDone) return;
  return (
    <div className="px-10 py-2 space-y-2">
      <div className="flex gap-x-2 items-center">
        <ThumbsUp
          onClick={() => {
            handleClickOpen();
            handleResponse("good");
          }}
          className={cn(
            "stroke-slate-500 w-4 h-4 hover:fill-slate-300 cursor-pointer",
            response === "good" && "fill-slate-300"
          )}
        />
        <ThumbsDown
          onClick={() => {
            handleClickOpen();
            handleResponse("bad");
          }}
          className={cn(
            "stroke-slate-500 w-4 h-4 hover:fill-slate-300 cursor-pointer",
            response === "bad" && "fill-slate-300"
          )}
        />
      </div>
      {open && (
        <FeedBackPopup
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          showOptions={showOptions}
          responses={response}
          loader={loader}
        />
      )}
    </div>
  );
}
