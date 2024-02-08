"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import MCQBox from "./mcq-box";
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import SelectedAnswer from "./selected-answer";
import Link from "next/link";
import { BarChart, Bot } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import QuizScore from "./quiz-score-diloag";

type Option = {
  text: string;
  correct: string;
};

export default function Chat({
  questionList,
  quizId,
}: {
  questionList: any[];
  quizId: string;
}) {
  const bottom = useRef<HTMLDivElement>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [stats, setStats] = useState({
    correct_answers: 0,
    wrong_answers: 0,
  });
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [submissions, setSubmissions] = useState([] as any[]);
  const [progress, setProgress] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const currentQuestion = useMemo(() => {
    return questionList[questionIndex];
  }, [questionIndex, questionList]);

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options) as Option[];
  }, [currentQuestion]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [bottom.current, currentQuestion, submissions]);

  const endGame = async () => {
    const user = sessionStorage.getItem("quiz_user");
    const userId = JSON.parse(user!).id;
    if (!userId) return;
    const supabase = createClientComponentClient();
    const { data: assessment_data, error } = await supabase
      .from("quiz")
      .update({
        submissions,
      })
      .eq("id", quizId)
      .eq("random_user_id", userId)
      .select();

    if (error) {
      toast({
        title: "Error",
        description: "An error occurred while ending the game",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const checkAnswer = (index: number) => {
    const isCorrect = options[index!].correct === "true";
    setSelectedChoice(null);
    return isCorrect;
  };

  const handleNext = useCallback(
    (index: number) => {
      const isCorrect = checkAnswer(index);

      setSubmissions((submissions) => [
        ...submissions,
        {
          questionId: currentQuestion?.uuid,
          selected: options[index!],
          isCorrect,
        },
      ]);

      if (isCorrect) {
        setStats((stats) => ({
          ...stats,
          correct_answers: stats.correct_answers + 1,
        }));
      } else {
        setStats((stats) => ({
          ...stats,
          wrong_answers: stats.wrong_answers + 1,
        }));
      }
      if (allQuestionsAnswered) {
        console.log(submissions, submissions.length, questionList.length);
        return;
      }
      setProgress((progress) => progress + 1);
      setQuestionIndex((questionIndex) => questionIndex + 1);
    },
    [checkAnswer, questionIndex, questionList]
  );

  const allQuestionsAnswered = useMemo(() => {
    return submissions.length === questionList.length;
  }, [submissions, questionList]);

  useEffect(() => {
    // Check if all questions have been answered
    if (allQuestionsAnswered) {
      setHasEnded(true);
      endGame();
      return;
    }
  }, [submissions]);

  return (
    <ScrollArea className="h-full w-full flex flex-col">
      <div className="flex-1 px-2 md:px-8">
        <div className="pb-4 max-w-4xl mx-auto h-full w-full">
          <Toaster />
          <div className="max-w-lg my-2 flex items-start w-full gap-x-2">
            <div className="bg-orange-300 w-10 h-10 rounded-full grid place-items-center">
              <Bot size={20} className="stroke-white" />
            </div>
            <div className="flex-1">
              <div className="flex gap-x-2 border border-orange-200 bg-white p-4 rounded-lg rounded-ss-none">
                <p className="text-sm py-0.5">
                  Get ready for the quiz battle!!!✊🏻
                </p>
              </div>
            </div>
          </div>
          {questionList.slice(0, questionIndex + 1).map((question, i) => (
            <div className="grid" key={i}>
              <MCQBox
                currentQuestion={question}
                handleNext={handleNext}
                setSelectedChoice={setSelectedChoice}
                submissions={submissions}
                questionIndex={i + 1}
              />
              <SelectedAnswer submissions={submissions} index={i} />
            </div>
          ))}
        </div>
        <div className="" ref={bottom}></div>
        <div className="bg-white h-[4rem] px-4 flex items-center justify-center gap-x-2 fixed left-0 bottom-0 w-full shadow-md z-10">
          <Input
            type="text"
            placeholder="Enter here..."
            className="max-w-3xl focus-visible:outline-none focus-visible:ring-0"
          />
          {hasEnded ? (
            <Button onClick={() => setDialogOpen(true)}>
              View Score
              <BarChart className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-sm font-medium">
                {progress}/{questionList.length}
              </span>
            </div>
          )}
        </div>
      </div>
      <QuizScore quizId={quizId} open={dialogOpen} setOpen={setDialogOpen} />
    </ScrollArea>
  );
}
