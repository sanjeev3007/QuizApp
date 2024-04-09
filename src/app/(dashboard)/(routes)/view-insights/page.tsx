import QuizScore from "@/components/quiz-score";
import React from "react";
import { getDashboard, getInsight } from "@/app/supabase-server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

type Props = {};

const Page = async (props: Props) => {
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade =
    Number(getCookie("grade", { cookies })) ||
    Math.max(1, Math.floor(Math.random() * 8) + 1);
  const dashboardData = await getDashboard(
    process.env.NEXT_PUBLIC_DEMO_USER_ID
  );
  const insights = await getInsight(process.env.NEXT_PUBLIC_DEMO_USER_ID, 7);
  return (
    <div className="p-5 md:p-12 w-full md:max-w-5xl mx-auto bg-[#FFF] !important">
      <QuizScore dashboardData={dashboardData} insights={insights} />
    </div>
  );
};

export default Page;
