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
    <div className="p-12 max-w-7xl mx-auto">
      <div className="bg-[#FFF]">
        <HomePage QuestionList={data} inCompleteQuiz={inCompleteQuiz![0]} />
      </div>
    </div>
  );
};

export default Home;
