import React from "react";
import NoahQuiz from "./yourScore/noah-quiz";
import StrengthWeakness from "./yourScore/strength-weakness";
import YourScore from "./yourScore/your-score";
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
