"use client";
import React, { useEffect, useState } from "react";
import mathIcon from "@/assets/Images/mathIcon.png";
import gkIcon from "@/assets/Images/gk-icon.png";
import chatsIcon from "@/assets/Images/chatsIcon.png";
import chatIcon from "@/assets/Images/chat-icon.png";
import Image from "next/image";
import ProgressBar from "./progress-bar";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import redirect_arrow from "@/assets/Images/redirect_arrow.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  createGKQuiz,
  getGKQuestions,
  getInCompletedGKQuiz,
} from "@/actions/gk-quiz";
import {
  createMathQuiz,
  getInCompletedMathQuiz,
  getMathQuestions,
} from "@/actions/math";

type Props = {
  type: string;
  path: string;
  user_id: string;
  inCompleteQuiz: any;
  userName: string;
  grade: number;
  quizData: any;
  gkQuiz: {
    accuracy: number;
    totalQuiz: number;
  };
  totalChats: number;
};
const Card = ({
  type,
  path,
  user_id,
  inCompleteQuiz,
  userName,
  grade,
  quizData,
  gkQuiz,
  totalChats
}: Props) => {
  const isActiveJourney = quizData?.numberOfCompletedQuiz == 0 ? false : true;
  const [isActive] = useState<boolean>(isActiveJourney);
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [insightLoader, setInsightLoader] = useState<boolean>(false);

  const viewScore = () => {
    if (quizData?.numberOfCompletedQuiz > 9) {
      router.push(`/view-insights`);
    }
  };

  const generateMathQuiz = async () => {
    try {
      setLoader(true);

      const inCompleteQuiz = await getInCompletedMathQuiz(user_id);

      if (inCompleteQuiz && inCompleteQuiz?.length! > 0) {
        router.push(`/chat/${inCompleteQuiz[0]?.id}`);
        setLoader(false);
        return;
      }

      const { questions, topics } = await getMathQuestions(grade!, user_id);
      if (questions.length === 0) return;

      // create quiz and redirect to quiz page
      const data = await createMathQuiz(user_id, questions, topics, grade!);
      if (!data) return;
      router.push(`/chat/${data[0]?.id}`);
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoader(false);
    }
  };

  const generateGKQuiz = async () => {
    try {
      setLoader(true);

      const inCompleteQuiz = await getInCompletedGKQuiz(user_id);

      if (inCompleteQuiz && inCompleteQuiz?.length! > 0) {
        router.push(`/gk-quiz/${inCompleteQuiz[0]?.id}`);
        setLoader(false);
        return;
      }

      const { questions, topics } = await getGKQuestions(user_id);
      if (questions.length === 0) {
        return;
      }

      // create gk quiz and redirect to gk-quiz page
      const data = await createGKQuiz(user_id, questions, topics);
      if (!data || !data!.length) return;
      router.push(`/gk-quiz/${data[0]?.id}`);
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoader(false);
    }
  };

  const navigateTo = async () => {
    setLoader(true);
    if (path === "/chat") {
      generateMathQuiz();
    } else if (path === "/chat-home") {
      router.push(path);
      setLoader(false);
    } else {
      generateGKQuiz();
    }
  };

  useEffect(() => {
    (async () => {
      // await getNumberOfCompletedQuizes();
    })();
  }, [isActive]);

  // const getNumberOfCompletedQuizes = async () => {
  //   if (type === "chat") return;
  //   if (type === "math") {
  //     const completedMathQuiz = await getNumberOfCompletedMathQuiz(user_id!);
  //     setIsActive(completedMathQuiz.numberOfCompletedQuiz > 0);
  //     setQuizData(completedMathQuiz);
  //     return;
  //   }
  //   if (type === "gk") {
  //     const completedGKQuiz = await getNumberOfCompletedGKQuiz(user_id!);
  //     setIsActive(completedGKQuiz.numberOfCompletedQuiz > 0);
  //     setQuizData(completedGKQuiz);
  //     return;
  //   }
  // };

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
          <span className="font-bold text-xl ml-1">{totalChats}</span>
          <span className="text-sm font-medium ml-1">chats done</span>
        </div>
      ) : (
        <div className="w-full">
          <ProgressBar type={type} quizData={quizData} gkQuiz={gkQuiz}/>
        </div>
      )}
      <div
        className={cn(
          isActive && type !== "chat"
            ? "w-full flex justify-around"
            : "flex justify-center"
        )}
      >
        {isActive && type === "math" && (
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
