import {
  getInCompletedQuiz,
  getNumberOfCompletedQuiz,
} from "@/app/supabase-server";
import HomePage from "@/components/home-page";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const Home = async () => {
  const userName = getCookie("userName", { cookies }) || "demo_user_id_2";
  const user_Id = getCookie("userId", { cookies }) || "demo_user_id_2";
  const grade = getCookie("grade", { cookies }) || "demo_user_id_2";

  const numberOfCompletedQuizData = await getNumberOfCompletedQuiz(user_Id!);
  const inCompleteQuiz = await getInCompletedQuiz(user_Id!); // get the incompleted quiz

  return (
    <div className="p-5 md:p-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <HomePage
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
