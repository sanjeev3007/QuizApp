"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import MCQBox from "./mcq-box";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import SelectedAnswer from "./selected-answer";
import { Input } from "@/components/ui/input";
import QuizScore from "./quiz-score-diloag";
import { EndChatMessage, InitialChatMessage } from "./chat-messages";
import {
  getQuestions,
  storeUserSubmission,
  updateQuizStats,
} from "@/app/supabase-client-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { QuizDataType } from "@/types/quiz.types";

type Option = {
  text: string;
  correct: string;
};

type ChatProps = {
  quizData: QuizDataType;
  quizId: string;
  user: {
    name: string;
    grade: number;
    id: string;
  };
  numberOfCompletedQuizData: any;
};

export default function Chat({
  quizData,
  quizId,
  user,
  numberOfCompletedQuizData,
}: ChatProps) {
  const bottom = useRef<HTMLDivElement>(null);
  const [questionIndex, setQuestionIndex] = useState(
    quizData.submissions?.length || 0
  );
  const [hasEnded, setHasEnded] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>(
    quizData?.submissions || []
  );
  const [quizScore, showQuizScore] = useState(false);
  const [start, setStart] = useState(!!quizData.submissions?.length);
  const [userInput, setUserInput] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const { questions: questionList, complete: isComplete } = quizData;

  const startNewQuiz = async () => {
    const supabase = createClientComponentClient();

    const QuestionLists = await getQuestions(user.grade);
    if (QuestionLists.length === 0) {
      return;
    }

    const { data: assessment_data, error } = await supabase
      .from("quiz")
      .insert({
        userid: user.id,
        topic: QuestionLists?.[0].metadata.topic,
        questions: QuestionLists,
        start: true,
      })
      .select();

    if (error) {
      console.error(error);
    }
    if (assessment_data && assessment_data.length > 0) {
      router.push(`/chat/${assessment_data[0].id}`);
    }
  };

  // Get the current question
  const currentQuestion = useMemo(() => {
    return questionList[questionIndex];
  }, [questionIndex, questionList]);

  // Get the options for the current question
  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options) as Option[];
  }, [currentQuestion]);

  // Scroll to the bottom of the chat
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [bottom.current, currentQuestion, submissions, hasEnded]);

  // End the quiz
  const endGame = async () => {
    // Update the quiz stats
    const { success } = await updateQuizStats(quizId, user.id);
    if (!success) {
      toast({ title: "Something went wrong!", duration: 3000 });
    }
  };

  // Check if the selected answer is correct
  const checkAnswer = (index: number) => {
    const isCorrect = options[index!].correct === "true";
    return isCorrect;
  };

  useEffect(() => {
    // Store the user submission to the db
    (async () => {
      await storeUserSubmission(quizId, user.id, submissions);
      router.refresh();
    })();
  }, [submissions]);

  // Handle the next button click
  const handleNext = useCallback(
    (index: number) => {
      if (!options[index]) {
        toast({ title: "Invalid answer", duration: 3000 });
        return;
      }
      const isCorrect = checkAnswer(index);

      setSubmissions((submissions: any) => [
        ...submissions,
        {
          questionId: currentQuestion?.uuid,
          selected: options[index!],
          isCorrect,
        },
      ]);

      if (allQuestionsAnswered) return;
      // Move to the next question
      setQuestionIndex((questionIndex) => questionIndex + 1);
    },
    [checkAnswer, questionIndex, questionList]
  );

  // Check if all questions have been answered
  const allQuestionsAnswered = useMemo(() => {
    return submissions.length === questionList.length;
  }, [submissions, questionList]);

  useEffect(() => {
    // Show the quiz score
    if (allQuestionsAnswered) {
      setHasEnded(true);
      endGame();
      return;
    }
  }, [submissions]);

  const handleUserInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle user input
    if (userInput === "") {
      toast({ title: "Enter the answer", duration: 3000 });
    }
    // converting user input to lowercase and removing any extra spaces
    const optimizedAnswer: string = userInput.toLowerCase().trim();
    const formattedOptions = ["a", "b", "c", "d"];
    // Check if the user input is in type of a, b, c, d
    if (formattedOptions.includes(optimizedAnswer)) {
      const index = formattedOptions.indexOf(optimizedAnswer);
      handleNext(index);
      setUserInput("");
    } else {
      // Check if the user input is in the options text
      const optionTexts = options.map((option) =>
        option.text.toLowerCase().trim()
      );
      const index = optionTexts.indexOf(optimizedAnswer);
      if (index === -1) {
        toast({ title: "Invalid answer", duration: 3000 });
        return;
      }
      handleNext(index);
      setUserInput("");
    }
  };

  useEffect(() => {
    // If the quiz is complete, redirect to the home page
    if (isComplete) {
      router.push("/");
    }
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ScrollArea className="h-full w-full flex flex-col">
      <div className="flex-1 px-2 md:px-8">
        <div className="pb-4 max-w-4xl mx-auto h-full w-full">
          <Toaster />
          <InitialChatMessage setStart={setStart} user={user} />
          {start &&
            questionList.slice(0, questionIndex + 1).map((question, i) => (
              <div className="grid" key={i}>
                <MCQBox
                  currentQuestion={question}
                  handleNext={handleNext}
                  submissions={submissions}
                  questionIndex={i + 1}
                />
                <SelectedAnswer submissions={submissions} index={i} />
              </div>
            ))}
          {hasEnded && (
            <EndChatMessage
              showQuizScore={showQuizScore}
              user={user}
              startNewQuiz={startNewQuiz}
            />
          )}
        </div>
        <div className="" ref={bottom}></div>
        <form
          onSubmit={handleUserInput}
          className="bg-white h-[4rem] border-t px-4 flex items-center justify-center gap-x-2 fixed left-0 bottom-0 w-full shadow-md z-10"
        >
          <Input
            type="text"
            placeholder="Enter your answer e.g. 'A'"
            className="max-w-3xl focus-visible:outline-none focus-visible:ring-0 border-slate-400"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button type="submit">Submit</Button>
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium">
              {questionIndex}/{questionList.length}
            </span>
          </div>
        </form>
      </div>
      <QuizScore
        quizId={quizId}
        open={quizScore}
        setOpen={showQuizScore}
        numberOfCompletedQuizData={numberOfCompletedQuizData}
      />
    </ScrollArea>
  );
}
