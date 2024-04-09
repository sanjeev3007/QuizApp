"use client";
import React, { use, useState } from "react";
import mathIcon from "@/assets/Images/mathIcon.png";
import gkIcon from "@/assets/Images/gk-icon.png";
import chatsIcon from "@/assets/Images/chatsIcon.png";
import chatIcon from "@/assets/Images/chat-icon.png";
import Image from "next/image";
import ProgressBar from "./progress-bar";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import redirect_arrow from "@/assets/Images/redirect_arrow.png";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getQuestions } from "@/app/supabase-client-provider";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createQuiz, getGKQuestions } from "@/actions/gk-quiz";

type Props = {
  type: string;
  path: string;
  user_id: string;
  inCompleteQuiz: any;
  userName: string;
  grade: number;
  quizData: any;
};
const Card = ({
  type,
  path,
  user_id,
  inCompleteQuiz,
  userName,
  grade,
  quizData,
}: Props) => {
  const isActiveJourney = quizData?.numberOfCompletedQuiz == 0 ? false : true;
  const [isActive] = useState<boolean>(isActiveJourney);
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [insightLoader, setInsightLoader] = useState<boolean>(false);

  const viewScore = () => {
    if (quizData?.numberOfCompletedQuiz > 9) {
      setInsightLoader(true);
      setTimeout(() => {
        router.push(`/view-insights`);
        setInsightLoader(false);
      }, 400);
    }
  };

  const onSubmit = async () => {
    try {
      if (!!inCompleteQuiz) {
        router.push(`/chat/${inCompleteQuiz.id}`);
        setLoader(false);
        return;
      }

      const { questions, topics } = await getQuestions(grade, user_id);
      if (questions.length === 0) {
        return;
      }

      const metadata = {
        grade: grade,
        topics: topics,
      };
      const supabase = createClientComponentClient();
      const { data: assessment_data, error } = await supabase
        .from("quiz")
        .insert({
          userid: user_id,
          multiple_topics: topics,
          questions: questions,
          start: true,
          metadata: metadata,
        })
        .select();

      if (error) {
        console.error(error);
      }
      if (assessment_data && assessment_data.length > 0) {
        router.push(`/chat/${assessment_data[0].id}`);
      }
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoader(false);
    }
    setLoader(false);
  };

  const navigateTo = async () => {
    setLoader(true);
    if (path === "/chat") {
      onSubmit();
    } else if (path === "/chat-home") {
      router.push(path);
      setLoader(false);
    } else {
      try {
        const { questions, topics } = await getGKQuestions(user_id);
        if (questions.length === 0) {
          return;
        }
        const data = await createQuiz(user_id, questions, topics);
        if (data && data.length > 0) {
          router.push(`/gk-quiz/${data[0].id}`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div className="bg-[#F0F6FA] w-full py-4 px-6 flex flex-col justify-center content-center items-center">
      <Image
        src={type === "math" ? mathIcon : type === "gk" ? gkIcon : chatIcon}
        alt=""
      />
      <span className="text-[#2F4F4F] text-lg font-extrabold ">
        {type === "math"
          ? "Math Quiz"
          : type === "gk"
          ? "General Quiz"
          : "Doubt Solving"}
      </span>
      <div className="text-[#5B8989] text-sm font-medium">
        {type === "math"
          ? "Get better. One quiz at a time"
          : type === "gk"
          ? "General trivia. Just for fun."
          : "Ask anything. Anytime"}
      </div>
      {type === "chat" ? (
        <div className="w-full text-[#5B8989] flex justify-center content-center items-center mt-[2rem]">
          <Image src={chatsIcon} alt="chat" />
          <span className="font-bold text-xl ml-1">80</span>
          <span className="text-sm font-medium ml-1">chats done</span>
        </div>
      ) : (
        <div className="w-full">
          <ProgressBar quizData={quizData} />
        </div>
      )}
      <div
        className={cn(
          isActive && type !== "chat"
            ? "w-full flex justify-around"
            : "flex justify-center"
        )}
      >
        {isActive && type !== "chat" && (
          <Button
            className={cn(
              "w-max mt-[1.5rem] py-[6px] px-[12px] bg-[#B59585] text-sm font-semibold text-[#FFFFFF] hover:bg-[#B59585]",
              quizData?.numberOfCompletedQuiz > 9 &&
                "text-[#E98451] border-2 border-[#E98451] bg-[#FFF] hover:bg-[#FFF]"
              // mobileScreen && "px-5 py-6 w-[50%]"
            )}
            onClick={viewScore}
            title={
              quizData?.numberOfCompletedQuiz < 10
                ? "Complete at least 10 quizzes to view insights"
                : ""
            }
          >
            Insights{" "}
            {insightLoader ? (
              <CircularProgress color="inherit" size={25} className="ml-2" />
            ) : quizData?.numberOfCompletedQuiz > 9 ? (
              <Image src={redirect_arrow} alt="redirect" className="ml-3" />
            ) : (
              <LockOutlinedIcon className="ml-[0.5rem]" fontSize="small" />
            )}
          </Button>
        )}
        {isActive ? (
          <Button
            className={cn(
              "w-max mt-[1.5rem] py-[6px] px-[12px] bg-[#E98451] text-sm font-semibold text-[#FFF] hover:bg-[#E98451]"
              // mobileScreen && "px-5 py-6 w-[50%]"
            )}
            onClick={() => navigateTo()}
          >
            Continue
            {loader ? (
              <CircularProgress color="inherit" size={25} className="ml-2" />
            ) : (
              <FastForwardOutlinedIcon
                className="ml-[0.5rem]"
                fontSize="small"
              />
            )}
          </Button>
        ) : (
          <Button
            className={cn(
              "w-max mt-[1.5rem] py-[6px] px-[12px] bg-[#E98451] text-sm font-semibold text-[#FFF] hover:bg-[#E98451]"
              // mobileScreen && "fixed bottom-3 w-[90%]" // Conditionally apply 'fixed bottom-0' for mobile screens
            )}
            onClick={() => navigateTo()}
          >
            Get Started
            {loader ? (
              <CircularProgress color="inherit" size={25} className="ml-2" />
            ) : (
              <FastForwardOutlinedIcon
                className="ml-[0.5rem]"
                fontSize="small"
              />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
