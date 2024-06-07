import { gkQuiz, doubtSolveDashboard } from "@/app/supabase-server";
import Quizes from "./_components/quizes";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function PageContent() {
  const userName =
    getCookie("userName", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade =
    getCookie("grade", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_GRADE!;
  const gk_quiz = await gkQuiz(user_Id!);
  const total_chats = await doubtSolveDashboard(user_Id!);

  return (
    <Quizes
      userId={user_Id!}
      userName={userName!}
      grade={parseInt(grade)}
      totalChats={total_chats}
      gkQuiz={gk_quiz}
    />
  );
}
