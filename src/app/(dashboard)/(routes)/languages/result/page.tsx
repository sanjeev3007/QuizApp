import {
  fetchQuizResult,
  fetchUpcomingTopics,
} from "@/actions/language.actions";
import ScoreCard from "./_components/score";
import UpcomingTopics from "./_components/upcoming-topics";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { lang: string; quiz: number; learning: number };
}) {
  const quizResult = await fetchQuizResult(searchParams.quiz);
  const upcomingTopics = await fetchUpcomingTopics(
    quizResult?.language_id,
    quizResult?.topic_id
  );

  return (
    <div className="">
      <ScoreCard lang={searchParams.lang} quizResult={quizResult} />
      <UpcomingTopics langId={searchParams.lang!} topics={upcomingTopics!} />
    </div>
  );
}
