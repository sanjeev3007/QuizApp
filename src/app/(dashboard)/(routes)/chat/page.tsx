import { getQuestions } from "@/app/supabase-server";
import InitialAssessmentCreationCard from "@/components/initial-assessment-creation";
import { Bot } from "lucide-react";
import React from "react";

const page = async () => {
  const data = await getQuestions();
  return (
    <div className="h-[calc(100vh-4rem)] pb-[4rem] bg-slate-50 bg-dot-black/[0.2] fixed top-[4rem] left-0 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-lg my-2 flex items-start w-full gap-x-2 fixed -z-10">
          <div className="bg-orange-300 w-10 h-10 rounded-full grid place-items-center">
            <Bot size={20} className="stroke-white" />
          </div>
          <div className="flex-1">
            <div className="flex gap-x-2 border border-orange-200 bg-white p-4 rounded-lg rounded-ss-none">
              <p className="text-sm py-0.5">
                Get ready for the quiz battle!!!✊🏻
              </p>
            </div>
          </div>
        </div>
      </div>
      <InitialAssessmentCreationCard QuestionList={data} />
    </div>
  );
};

export default page;
