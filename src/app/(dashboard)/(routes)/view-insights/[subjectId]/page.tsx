import QuizScore from "@/components/quiz-score";
import React, { Suspense } from "react";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import CircularProgress from "@mui/material/CircularProgress";
import { getDashboard, getInsight } from "@/app/supabase-server";

type Props = {
  subjectId: number;
};

const PageContent = async (props: Props) => {
  const user_Id = getCookie("userId", { cookies });
  const grade = getCookie("grade", { cookies });
  const [dashboardData, insightData] = await Promise.all([
    getDashboard(user_Id!, props.subjectId),
    getInsight(user_Id!, props.subjectId, parseInt(grade!)),
  ]);
  return (
    <div className="p-5 md:p-12 w-full md:max-w-5xl mx-auto bg-[#FFF] !important">
      <QuizScore dashboardData={dashboardData} insights={insightData} />
    </div>
  );
};

const Page = ({ params: { subjectId } }: { params: { subjectId: number } }) => {
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[90vh]">
            <CircularProgress size={40} />
          </div>
        }
      >
        <PageContent subjectId={subjectId} />
      </Suspense>
    </div>
  );
};

export default Page;
