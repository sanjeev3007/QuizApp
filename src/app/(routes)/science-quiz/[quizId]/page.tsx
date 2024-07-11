import Chat from "../_components/chat-box";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { getAssignStatus } from "@/lib/utils";
import { getNumberOfCompletedQuiz, getQuizById } from "@/actions/quiz.server";

export default async function ChatPage({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const quizData = await getQuizById(quizId);
  const userName =
    getCookie("userName", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const userId =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade =
    getCookie("grade", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_GRADE!;
  const assignStatus = await getAssignStatus(userId!);

  if (!quizData?.length)
    return <div className="mt-44 text-center">Not found.</div>;

  const subjectId = quizData[0].subject_id;
  const numberOfCompletedQuizData = await getNumberOfCompletedQuiz({
    userId: userId!,
    subjectId,
  });

  return (
    <div className="h-[calc(100vh-4rem)] pb-[5rem] left-0 w-full">
      <Chat
        quizData={quizData[0]}
        quizId={quizId}
        user={{
          name: userName!,
          grade: parseInt(grade),
          id: userId!,
        }}
        numberOfCompletedQuizData={numberOfCompletedQuizData}
        assignStatus={assignStatus}
        subjectId={subjectId}
      />
    </div>
  );
}
