import { getQuizById } from "@/app/supabase-server";
import Chat from "../_components/chat-box";

export default async function Page({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const quizData = await getQuizById(quizId);
  if (!quizData?.length)
    return <div className="mt-44 text-center">Not found.</div>;
  return (
    <div className="h-[calc(100vh-4rem)] pb-[5rem] left-0 w-full">
      <Chat quizData={quizData[0]} quizId={quizId} />
    </div>
  );
}
