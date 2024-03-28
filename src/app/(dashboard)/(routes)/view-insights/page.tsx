import QuizScore from "@/components/quiz-score";
import React from "react";
import { getDashboard, getInsight } from "@/app/supabase-server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

type Props = {};

const Page = async (props: Props) => {
  const user_Id = getCookie("userId", { cookies }) || "demo_user_id_6";
  const dashboardData = await getDashboard(user_Id!); 
  const insights = await getInsight(user_Id!);
  return (
    <div className="p-5 md:p-12 w-full md:max-w-5xl mx-auto bg-[#FFF] !important">
      <QuizScore dashboardData={dashboardData} insights={insights} />
    </div>
  );
};

export default Page;
