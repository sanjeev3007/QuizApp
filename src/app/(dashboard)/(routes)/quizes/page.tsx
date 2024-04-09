import {
  getInCompletedQuiz,
  getNumberOfCompletedQuiz,
  getDashboard,
  getInsight,
} from "@/app/supabase-server";
import Quizes from "./_components/quizes";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const Page = async () => {
  const userName = getCookie("userName", { cookies }) || "aaryan_dev_1";
  const user_Id = getCookie("userId", { cookies }) || "aaryan_dev_1";
  const grade =
    getCookie("grade", { cookies }) ||
    Math.max(1, Math.floor(Math.random() * 8) + 1);

  const numberOfCompletedQuizData = await getNumberOfCompletedQuiz(user_Id!);
  const inCompleteQuiz = await getInCompletedQuiz(user_Id!); // get the incompleted quiz

  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <Quizes
        inCompleteQuiz={inCompleteQuiz![0]}
        userId={user_Id!}
        userName={userName!}
        grade={grade as number}
        quizData={numberOfCompletedQuizData}
      />
    </div>
  );
};

export default Page;
