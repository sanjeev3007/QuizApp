import { getInCompletedQuiz, getQuestions } from "@/app/supabase-server";
import DetailsDialog from "@/components/details-dialog";
import HistoryCard from "@/components/history-card";
import HomePage from "@/components/home-page";
import InitialAssessmentCard from "@/components/initial-assessment-card";
import InitialAssessmentDialog from "@/components/initial-assessment-dialog";
import QuizMeCard from "@/components/quiz";

const Home = async () => {
  const data = await getQuestions();
  const inCompleteQuiz = await getInCompletedQuiz("user123"); // get the incompleted quiz
  return (
    <div className="p-5 md:p-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <HomePage QuestionList={data} inCompleteQuiz={inCompleteQuiz![0]} />
    </div>
  );
};

export default Home;
