import React from "react";
import noahSmallIcon from "@/assets/Images/noahSmallIcon.png";
import Image from "next/image";
import Card from "./quiz-card";

type Props = {
  userId: string;
  userName: string;
  grade: number;
};

const Quizes = ({ userId, userName, grade }: Props) => {
  return (
    <div className="flex flex-col justify-center content-center items-center">
      <div className="flex justify-between content-center items-center">
        <Image src={noahSmallIcon} alt="noah" className="h-[54px] w-[54px]" />
        <div className="ml-4 text-4xl text-[#2F4F4F] font-extrabold">
          What would you like to do today?
        </div>
      </div>
      <div className="flex flex-col mt-2 w-full md:w-[80%] md:grid md:grid-cols-3 gap-4 md:mt-8">
        <Card
          type="math"
          path={"/chat"}
          user_id={userId}
          userName={userName}
          grade={grade}
        />
        <Card
          type="gk"
          path={"/gk-quiz"}
          user_id={userId}
          userName={userName}
          grade={grade}
        />
        <Card type="chat" path={"/chat-home"} user_id={userId} />
      </div>
    </div>
  );
};

export default Quizes;
