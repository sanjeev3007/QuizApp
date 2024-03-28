"use client";
import React from "react";
import NoahQuiz from "./quiz-score-tracking/noah-quiz";
import StrengthWeakness from "./quiz-score-tracking/strength-weakness";
import YourScore from "./quiz-score-tracking/your-score";
import Divider from "@mui/material/Divider";

type QuizData = {
  quizNumber: number;
  correctAnswers: number;
};
type Insights = {
  scoreGreaterThanOrEqualTo4: string[] | never[];
  scoreLessThanOrEqualTo3: string[] | never[];
};
type Props = {
  dashboardData: {
    quizNumber: number | null;
    quizWise: QuizData[] | never[];
  };
  insights: Insights;
};

const QuizScore = ({ dashboardData, insights }: Props) => {
  return (
    <div>
      <YourScore dashboardData={dashboardData} />
      <div className="mt-[2rem] mb-[2rem]">
        <Divider />
      </div>
      <div className="mt-[2rem]">
        <StrengthWeakness type="strengths" insights={insights} />
      </div>
      <div className="mt-[2rem]">
        <StrengthWeakness type="weakness" insights={insights} />
      </div>
      <div className="mt-[2rem]">
        <NoahQuiz />
      </div>
    </div>
  );
};

export default QuizScore;
