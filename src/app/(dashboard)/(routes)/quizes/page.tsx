import { Suspense } from "react";
import {
  getInCompletedQuiz,
  getNumberOfCompletedQuiz,
  getDashboard,
  getInsight,
} from "@/app/supabase-server";
import Quizes from "./_components/quizes";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import CircularProgress from "@mui/material/CircularProgress";

const PageContent = async () => {
  const userName = getCookie("userName", { cookies }) || "gk_user_1";
  const user_Id = getCookie("userId", { cookies }) || "gk_user_1";
  const grade =
    getCookie("grade", { cookies }) ||
    Math.max(1, Math.floor(Math.random() * 8) + 1);

  const numberOfCompletedQuizData = await getNumberOfCompletedQuiz(user_Id!);
  const inCompleteQuiz = await getInCompletedQuiz(user_Id!);

  return (
    <Quizes
      inCompleteQuiz={inCompleteQuiz[0]}
      userId={user_Id!}
      userName={userName!}
      grade={grade as number}
      quizData={numberOfCompletedQuizData}
    />
  );
};

const Page = () => {
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[90vh]">
            <CircularProgress size={40} />
          </div>
        }
      >
        <PageContent />
      </Suspense>
    </div>
  );
};

export default Page;
