"use client";
import React, { useEffect, useState } from "react";
import mathIcon from "@/assets/Images/mathIcon.png";
import gkIcon from "@/assets/Images/gk-icon.png";
import chatsIcon from "@/assets/Images/chatsIcon.png";
import start_chat_icon from "@/assets/Images/start_chat_icon.png";
import chatIcon from "@/assets/Images/chat-icon.png";
import Image from "next/image";
import ProgressBar from "./progress-bar";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import redirect_arrow from "@/assets/Images/redirect_arrow.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

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
  getNumberOfCompletedMathQuiz,
} from "@/actions/math";
import { useQuery } from "@tanstack/react-query";

type Props = {
  type: string;
  path: string;
  userId: string;
  grade: number;
  mathQuiz: {
    level: number;
    numberOfCompletedQuiz: number;
    totalQuiz: number;
  };
  gkQuiz: {
    accuracy: number;
    totalQuiz: number;
  };
  title: string;
  description: {
    active: string;
    inActive: string;
  };
};
const Card = ({
  type,
  path,
  userId,
  grade,
  mathQuiz,
  gkQuiz,
  title,
  description,
}: Props) => {
  const isActiveJourney = mathQuiz?.numberOfCompletedQuiz == 0 ? false : true;
  const [isActive] = useState<boolean>(isActiveJourney);
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [insightLoader, setInsightLoader] = useState<boolean>(false);

  const viewScore = () => {
    if (mathQuiz!.numberOfCompletedQuiz > 9) {
      router.push(`/view-insights`);
    }
  };

  const generateMathQuiz = async () => {
    try {
      setLoader(true);

      const inCompleteQuiz = await getInCompletedMathQuiz(userId);

      if (inCompleteQuiz && inCompleteQuiz?.length! > 0) {
        router.push(`/math-quiz/${inCompleteQuiz[0]?.id}`);
        setLoader(false);
        return;
      }

      // create quiz and redirect to quiz page
      const data = await createMathQuiz(userId, grade!);
      if (!data) return;
      router.push(`/math-quiz/${data[0]?.id}`);
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

      const inCompleteQuiz = await getInCompletedGKQuiz(userId);

      if (inCompleteQuiz && inCompleteQuiz?.length! > 0) {
        router.push(`/gk-quiz/${inCompleteQuiz[0]?.id}`);
        setLoader(false);
        return;
      }

      const { questions, topics } = await getGKQuestions(userId);
      if (questions.length === 0) {
        return;
      }

      // create gk quiz and redirect to gk-quiz page
      const data = await createGKQuiz(userId, questions, topics);
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
    if (type === "/math") {
      generateMathQuiz();
    } else {
      generateGKQuiz();
    }
  };

  return (
    <div className="bg-[#F0F6FA] w-full py-4 px-6 flex flex-col justify-center content-center items-center rounded-lg">
      <Image
        src={type === "math" ? mathIcon : type === "gk" ? gkIcon : chatIcon}
        alt=""
      />
      <span className="text-[#2F4F4F] text-lg font-extrabold mt-2">
        {title}
      </span>
      <div className="text-center text-[#5B8989] text-sm font-medium mt-2">
        {isActive ? description.active : description.inActive}
      </div>
      {isActive && (
        <div className="w-[70%] sm:w-[55%] lg:w-full">
          <ProgressBar type={type} mathQuiz={mathQuiz} gkQuiz={gkQuiz} />
        </div>
      )}
      <div
        className={cn(
          "w-[70%] sm:w-[55%] lg:w-full",
          isActive && type === "math"
            ? "flex justify-between"
            : "flex justify-center"
        )}
      >
        {isActive && type === "math" && (
          <Button
            className={cn(
              "w-max mt-[1.5rem] py-[6px] px-[12px] bg-[#B59585] text-sm font-semibold text-[#FFFFFF] hover:bg-[#B59585]",
              mathQuiz!.numberOfCompletedQuiz > 9 &&
                "text-[#E98451] border-2 border-[#E98451] bg-[#FFF] hover:bg-[#FFF]"
              // mobileScreen && "px-5 py-6 w-[50%]"
            )}
            onClick={viewScore}
            title={
              mathQuiz!.numberOfCompletedQuiz < 10
                ? "Complete at least 10 quizzes to view insights"
                : ""
            }
          >
            Insights{" "}
            {insightLoader ? (
              <CircularProgress color="inherit" size={25} className="ml-2" />
            ) : mathQuiz!.numberOfCompletedQuiz > 9 ? (
              <Image src={redirect_arrow} alt="redirect" className="ml-2" />
            ) : (
              <LockOutlinedIcon className="ml-2" fontSize="small" />
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
              <ArrowForwardOutlinedIcon
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
