import React from "react";
import StrengthCard from "./strength-card";
import { cn } from "@/lib/utils";
import "@/components/home-page.css";

type Props = {
  type: string;
};

const StrengthWeakness = ({ type }: Props) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div
      className={cn(
        "relative pb-3 ",
        type === "strengths" ? "bg-[#F2F6F7]" : "bg-[#F7F4F2]"
      )}
    >
      <div
        className={cn(
          "absolute w-full top-0 flex justify-center pt-2 pb-2",
          type === "strengths"
            ? " bg-[#DBF0E6] text-[#439E73]"
            : "bg-[#F3EBE2] text-[#E77E23]"
        )}
      >
        {type === "strengths" ? "Your Strengths" : "Areas of Improvement"}
      </div>
      <div className="p-3 pt-[4rem] overflow-y-auto max-h-[290px] grid grid-cols-1 md:grid-cols-2 gap-2 mt-[1rem]">
        {arr.map((strength: any, i: number) => {
          return <StrengthCard />;
        })}
      </div>
    </div>
  );
};

export default StrengthWeakness;
