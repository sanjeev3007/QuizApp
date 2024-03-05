import {
  getInCompletedQuiz,
  getQuestions,
  getNumberOfCompletedQuiz,
} from "@/app/supabase-server";
import HomePage from "@/components/home-page";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const Home = async () => {
  const data = await getQuestions();
  const userName = getCookie("userName", { cookies }) || "demo_user";
  const user_Id = getCookie("userId", { cookies }) || "demo_user_id";
  const grade = getCookie("grade", { cookies }) || "demo_grade_7";

  const numberOfCompletedQuizData = await getNumberOfCompletedQuiz(user_Id!);
  const inCompleteQuiz = await getInCompletedQuiz(user_Id!); // get the incompleted quiz

  return (
    <div className="p-5 md:p-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <HomePage
        QuestionList={data}
        inCompleteQuiz={inCompleteQuiz![0]}
        userId={user_Id!}
        userName={userName!}
        grade={grade}
        quizData={numberOfCompletedQuizData}
      />
    </div>
  );
};

export default Home;
