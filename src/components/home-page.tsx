"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { BrainCircuit, Pen } from "lucide-react";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { styled } from "@mui/material/styles";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import quizIcon from "../assets/Images/quizIcon.svg";
import quizCupIcon from "../assets/Images/quizCupIcon.svg";
import quizTopicIcon from "../assets/Images/quizTopicIcon.svg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, {
      message: "Topic must be at least 4 characters long",
    })
    .max(50, {
      message: "Topic must be at most 50 characters long",
    }),
  amount: z.number().min(1).max(10),
  name: z.string().min(2).max(50),
  age: z.string(),
});

type Input = z.infer<typeof quizCreationSchema>;

// type Props = {};

const HomePage = ({ QuestionList }: { QuestionList: any }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);
  const onSubmit = async (data: Input) => {
    console.log("QuestionList", QuestionList);
    const userId = Math.random().toString(36).substring(7);
    const user = {
      name: data.name || "satvik",
      age: data.age || 15,
      id: userId,
    };
    sessionStorage.setItem("quiz_user", JSON.stringify(user));
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data: assessment_data, error } = await supabase
      .from("quiz")
      .insert({
        random_user_id: userId,
        topic: QuestionList?.[0].metadata.topic,
        questions: QuestionList,
      })
      .select();

    if (error) {
      console.error(error);
    }
    if (assessment_data && assessment_data.length > 0) {
      router.push(`/chat/${assessment_data[0].id}`);
    }
  };
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#E0EAFF",
    },
  }));
  return (
    <div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <div className="justify-self-center self-center grid gap-2 mt-2 md:grid-cols-1">
          <div className="text-[#2F4F4F] font-extrabold text-wrap text-3xl font-inter">
            {isActive
              ? "Resume your progress to identify your strength & weakness"
              : "Introducing the AI quiz bot"}
          </div>
          {isActive ? (
            <div className="w-[100%] pr-20 mt-[2rem] text-[#5B8989] font-inter font-medium text-wrap text-lg">
              <BorderLinearProgress variant="determinate" value={50} />
              <div className="mt-[10px]">Completed 4 out of 10 quizzes</div>
            </div>
          ) : (
            <div className="mt-[2rem] text-[#5B8989] font-inter font-medium text-wrap text-lg">
              Your personalised AI which curates quizzes to keep you engaged and
              learning
            </div>
          )}
          <div className="grid gap-2 md:grid-cols-2">
            <Button
              className="w-max px-11 mt-[2rem] py-6 bg-[#E98451] text-lg font-bold text-[#FFF] hover:bg-[#E98451]"
              onClick={onSubmit}
            >
              Get Started{" "}
              <EastOutlinedIcon className="ml-[0.5rem]" fontSize="small" />
            </Button>
            <Button
              className="w-max px-11 mt-[2rem] py-6 bg-[#B59585] text-lg font-bold text-[#FFFFFF] hover:bg-[#B59585]"
              // onClick={onSubmit}
            >
              View Insights{" "}
              <LockOutlinedIcon className="ml-[0.5rem]" fontSize="small" />
            </Button>
          </div>
        </div>
        <div>
          <Image src={quizIcon} alt="quiz" style={{ height: "350px" }} />
        </div>
      </div>
      <div className="mt-[5rem] grid gap-8 md:grid-cols-2">
        <Card className="flex p-4 bg-[#F3F7F7]">
          <div className="justify-self-center	self-center	">
            <Image src={quizTopicIcon} alt="topics" />
          </div>
          <div className="ml-[1.5rem] justify-self-center	self-center	">
            Answer quizzes based on topics which you are learning
          </div>
        </Card>
        <Card className="flex p-4 bg-[#F3F7F7]">
          <div className="justify-self-center self-center	">
            <Image src={quizCupIcon} alt="cup" />
          </div>
          <div className="ml-[1.5rem] justify-self-center	self-center	">
            Complete at least 10 quizzes to get detailed analysis on your
            strengths and weaknesses
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
