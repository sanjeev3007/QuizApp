import React from "react";
import StrengthCard from "./strength-card";
import { cn } from "@/lib/utils";
import "@/components/home-page.css";

type Insights = {
  scoreGreaterThanOrEqualTo4: string[] | never[];
  scoreLessThanOrEqualTo3: string[] | never[];
};
type Props = {
  type: string;
  insights: Insights;
};

const StrengthWeakness = ({ type, insights }: Props) => {
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
      <div>
        {type === "strengths" && (
          <div>
            {insights?.scoreGreaterThanOrEqualTo4.length > 0 ? (
              <div className="p-3 pt-[4rem] overflow-y-auto max-h-[290px] grid grid-cols-1 md:grid-cols-2 gap-2 mt-[1rem]">
                {insights?.scoreGreaterThanOrEqualTo4?.map(
                  (strength: string, i: number) => {
                    return <StrengthCard strength={strength} />;
                  }
                )}
              </div>
            ) : (
              <div className="min-h-[270px] flex justify-center items-center text-center text-[#E3634F] p-3 pt-[4rem] mt-[1rem]">
                Keep practicing with more quizzes to build strength areas!
              </div>
            )}
          </div>
        )}
        {type === "weakness" && (
          <div>
            {insights?.scoreLessThanOrEqualTo3.length > 0 ? (
              <div className="p-3 pt-[4rem] overflow-y-auto max-h-[290px] grid grid-cols-1 md:grid-cols-2 gap-2 mt-[1rem]">
                {insights?.scoreLessThanOrEqualTo3?.map(
                  (strength: string, i: number) => {
                    return <StrengthCard strength={strength} />;
                  }
                )}
              </div>
            ) : (
              <div className="min-h-[270px] flex justify-center items-center text-center text-[#5B8989] p-3 pt-[4rem] mt-[1rem]">
                Excellent! You don’t have any areas of improvement. <br/> Keep
                rocking!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StrengthWeakness;
