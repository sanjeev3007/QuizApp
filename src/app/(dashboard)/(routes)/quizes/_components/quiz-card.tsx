"use client";
import React, { useState } from "react";
import mathIcon from "@/assets/Images/mathIcon.png";
import gkIcon from "@/assets/Images/gk-icon.png";
import chatIcon from "@/assets/Images/chat-icon.png";
import Image from "next/image";
import ProgressBar from "./progress-bar";
import CircularProgress from "@mui/material/CircularProgress";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  type: string;
};

const Card = ({ type }: Props) => {
  const [loader, setLoader] = useState<boolean>(false);
  return (
    <div className="bg-[#F0F6FA] p-4 flex flex-col justify-center content-center items-center">
      <Image
        src={type === "math" ? mathIcon : type === "gk" ? gkIcon : chatIcon}
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
      <div>
        <ProgressBar />
      </div>
      <div className="flex justify-center">
        <Button
          className={cn(
            "w-max px-11 mt-[2rem] py-6 bg-[#E98451] text-lg font-semibold text-[#FFF] hover:bg-[#E98451]"
          )}
          //onClick={() => onSubmit()}
          //onClick={()=> router.push("/quizes")}
        >
          Continue
          {loader ? (
            <CircularProgress color="inherit" size={25} className="ml-2" />
          ) : (
            <EastOutlinedIcon className="ml-[0.5rem]" fontSize="small" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Card;
