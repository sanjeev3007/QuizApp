import Quizes from "./_components/quizes";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import {
  getInCompletedGKQuiz,
  getNumberOfCompletedGKQuiz,
} from "@/actions/gk-quiz.server";

const Page = async () => {
  const userName =
    getCookie("userName", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade =
    getCookie("grade", { cookies }) ||
    Math.max(1, Math.floor(Math.random() * 8) + 1);

  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <Quizes userId={user_Id!} userName={userName!} grade={grade as number} />
    </div>
  );
};

export default Page;
