import { getNumberOfCompletedQuiz, getGkQuizById } from "@/app/supabase-server";
import Chat from "../_components/chat-box";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function Page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const quizData = await getGkQuizById(quizId);
  const userName = getCookie("userName", { cookies }) || "demo_user_id_4";
  const user_Id = getCookie("userId", { cookies }) || "demo_user_id_4";
  const grade =
    getCookie("grade", { cookies }) ||
    Math.max(1, Math.floor(Math.random() * 7) + 1);
  const numberOfCompletedQuizData = await getNumberOfCompletedQuiz(user_Id!);

  if (!quizData?.length)
    return <div className='mt-44 text-center'>Not found.</div>;
  return (
    <div className='h-[calc(100vh-4rem)] pb-[5rem] left-0 w-full'>
      <Chat
        quizData={quizData[0]}
        quizId={quizId}
        user={{
          name: userName!,
          grade: grade as number,
          id: user_Id!,
        }}
        numberOfCompletedQuizData={numberOfCompletedQuizData}
      />
    </div>
  );
}