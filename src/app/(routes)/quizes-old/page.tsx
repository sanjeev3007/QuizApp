import { gkQuiz, doubtSolveDashboard } from "@/app/supabase-server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import React from "react";
import noahSmallIcon from "@/assets/Images/noahSmallIcon.png";
import Image from "next/image";
import Card from "./_components/quiz-card";
import { getNumberOfCompletedMathQuiz } from "@/actions/math.server";
import { redirect } from "next/navigation";
import ChatCard from "./_components/chat-card";

export default async function PageContent() {
  const userId =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade = parseInt(
    getCookie("grade", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_GRADE!
  );

  if (!userId) {
    redirect("/");
  }

  const gk_quiz = await gkQuiz(userId!);
  const total_chats = await doubtSolveDashboard(userId!);

  const completedMathQuiz = await getNumberOfCompletedMathQuiz(userId!);

  return (
    <div className="flex flex-col justify-center content-center items-center">
      <div className="flex justify-between content-center items-center">
        <Image src={noahSmallIcon} alt="noah" className="h-[54px] w-[54px]" />
        <div className="ml-4 text-2xl md:text-4xl text-[#2F4F4F] font-extrabold">
          What would you like to do today?
        </div>
      </div>
      <div className="flex flex-col mt-4 w-full sm:w-[80%] lg:grid lg:grid-cols-3 gap-4 lg:mt-8">
        <Card
          type="math"
          path={"/math-quiz"}
          userId={userId}
          grade={grade}
          mathQuiz={completedMathQuiz}
          gkQuiz={gk_quiz}
          title={"Math Quiz"}
          description={{
            active: "Get better. One quiz at a time",
            inActive:
              "Explore math topic based quizzes which are adaptive and personalised for you",
          }}
        />
        <Card
          type="gk"
          path={"/gk-quiz"}
          userId={userId}
          grade={grade}
          mathQuiz={completedMathQuiz}
          gkQuiz={gk_quiz}
          title={"GK Quiz"}
          description={{
            active: "General trivia. Just for fun.",
            inActive:
              "Explore quizzes around diverse topics to test your general knowledge",
          }}
        />
        <ChatCard totalChats={total_chats} />
      </div>
    </div>
  );
}
