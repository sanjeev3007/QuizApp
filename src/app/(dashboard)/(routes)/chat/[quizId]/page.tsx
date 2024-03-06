import { getNumberOfCompletedQuiz, getQuestions, getQuizById } from "@/app/supabase-server";
import Chat from "../_components/chat-box";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function Page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const quizData = await getQuizById(quizId);
  const userName = getCookie("userName", { cookies });
  const user_Id = getCookie("userId", { cookies });
  const grade = getCookie("grade", { cookies });
  const data = await getQuestions();
  const numberOfCompletedQuizData = await getNumberOfCompletedQuiz(user_Id!);

  if (!quizData?.length)
    return <div className="mt-44 text-center">Not found.</div>;
  return (
    <div className="h-[calc(100vh-4rem)] pb-[5rem] left-0 w-full">
      <Chat
        quizData={quizData[0]}
        quizId={quizId}
        user={{
          name: userName!,
          grade: grade!,
          id: user_Id!,
        }}
        QuestionLists={data}
        numberOfCompletedQuizData={numberOfCompletedQuizData}
      />
    </div>
  );
}
