import React from "react";
import Image from "next/image";
import levelCupStraight from "@/assets/Images/levelCupStraight.png";
import "@/components/home-page.css";

type Props = {};

const LevelCard = (props: Props) => {
  return (
    <div className="level-card mt-[2rem]  flex-column items-center content-center w-full p-4 md:mt-[0rem] md:max-w-56">
      <div className="flex justify-center">
        <Image
          src={levelCupStraight}
          alt="level-cup"
          className="-rotate-12 h-5 w-5 mr-2"
        />
        <span className="text-[#2F4F4F] text-lg font-semibold">Level 2</span>
        <Image
          src={levelCupStraight}
          alt="level-cup"
          className="rotate-12 h-5 w-5 ml-2"
        />
      </div>
      <div className="mt-[1rem] flex justify-center text-[#569090] text-[48px] font-[700]">
        8
      </div>
      <div className="flex justify-center text-[#569090] text-[14px] font-[500]">
        Completed Quizzes
      </div>
    </div>
  );
};

export default LevelCard;
