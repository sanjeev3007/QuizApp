import React from "react";
import NoahQuiz from "./quiz-score-tracking/noah-quiz";
import StrengthWeakness from "./quiz-score-tracking/strength-weakness";
import YourScore from "./quiz-score-tracking/your-score";
import Divider from "@mui/material/Divider";

type Props = {};

const QuizScore = (props: Props) => {
  return (
    <div>
      <YourScore />
      <div className="mt-[2rem] mb-[2rem]">
        <Divider />
      </div>
      <div className="mt-[2rem]">
        <StrengthWeakness type="strengths" />
      </div>
      <div className="mt-[2rem]">
        <StrengthWeakness type="weakness" />
      </div>
      <div className="mt-[2rem]">
        <NoahQuiz />
      </div>
    </div>
  );
};

export default QuizScore;
