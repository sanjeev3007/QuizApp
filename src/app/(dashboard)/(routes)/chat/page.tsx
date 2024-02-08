import { getQuestions } from "@/app/supabase-server";
import InitialAssessmentCreationCard from "@/components/initial-assessment-creation";
import React from "react";

const page = async () => {
  const data = await getQuestions();
  return (
    <div className="h-[calc(100vh-4rem)] pb-[4rem] bg-slate-50 bg-dot-black/[0.2] fixed top-[4rem] left-0 w-full">
      <InitialAssessmentCreationCard QuestionList={data} />
    </div>
  );
};

export default page;
