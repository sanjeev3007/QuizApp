"use client";

import { Button } from "@/components/ui/button";
import { BarChart, Bot } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

if (typeof window !== "undefined") {
}

export function InitialChatMessage({
  setStart,
}: {
  setStart: Dispatch<SetStateAction<boolean>>;
}) {
  const [user, setUser] = useState<{ name: string; age: string } | null>(null);

  useEffect(() => {
    if (sessionStorage && !sessionStorage.getItem("quiz_user")) return;
    const storedUser = JSON.parse(sessionStorage.getItem("quiz_user")!);
    setUser(storedUser);
  }, []);

  if (!user) return null;
  return (
    <div className="max-w-lg my-2 flex items-start w-full gap-x-2">
      <div className="bg-orange-300 w-10 h-10 rounded-full grid place-items-center">
        <Bot size={20} className="stroke-white" />
      </div>
      <div className="flex-1">
        <div className="flex gap-x-2 border border-orange-200 bg-white p-4 rounded-lg rounded-ss-none">
          <p className="text-sm py-0.5">
            {user
              ? `Hi ${user.name}, Get ready for the quiz. Click on the start button to begin.`
              : "Get ready for the quiz. Click on the start button to begin."}
          </p>
          <Button variant={"secondary"} onClick={() => setStart(true)}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EndChatMessage({
  showQuizScore,
}: {
  showQuizScore: Dispatch<SetStateAction<boolean>>;
}) {
  const user = JSON.parse(sessionStorage.getItem("quiz_user")!);
  return (
    <div className="max-w-lg my-2 flex items-start w-full gap-x-2">
      <div className="bg-orange-300 w-10 h-10 rounded-full grid place-items-center">
        <Bot size={20} className="stroke-white" />
      </div>
      <div className="flex-1">
        <div className="flex gap-x-2 justify-between border border-orange-200 bg-white p-4 rounded-lg rounded-ss-none">
          <p className="text-sm py-0.5">
            {user
              ? `Great ${user.name}, You have completed the quiz. Click on the button to see your score.`
              : "Great, You have completed the quiz. Click on the button to see your score."}
          </p>
          <Button
            variant={"secondary"}
            className="w-fit"
            onClick={() => showQuizScore(true)}
          >
            View Score
            <BarChart className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
