import React from "react";
import LevelCard from "./level-card";
import ScoreGraph from "./score-graph";
import "@/components/home-page.css";

type Props = {};

const YourScore = (props: Props) => {
  return (
    <>
      <div className="text-[#2F4F4F] text-lg font-bold">Your Score</div>
      <div className="mt-[1rem] md:flex md:justify-between">
        <div className="overflow-x-auto">
          <ScoreGraph />
        </div>
        <LevelCard />
      </div>
    </>
  );
};

export default YourScore;
