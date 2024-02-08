"use client";
import AccuracyCard from "@/components/accuracy-card";
import ResultsCard from "@/components/results-card";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getQuizStats } from "@/app/supabase-client-provider";

export default function QuizScore({
  quizId,
  open,
  setOpen,
}: {
  quizId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [accuracy, setAccuracy] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    fetchQuizStats();
  }, []);

  const fetchQuizStats = async () => {
    const quiz_stats = await getQuizStats(quizId);
    let accuracy: number = 0;

    let totalCorrect = quiz_stats.submissions.reduce(
      (acc: any, question: any) => {
        if (question.isCorrect) {
          return acc + 1;
        }
        return acc;
      },
      0
    );
    setTotalCorrect(totalCorrect);

    const questionLength = quiz_stats.questions.length;
    setTotalQuestions(questionLength);
    accuracy = (totalCorrect / questionLength) * 100;
    setAccuracy(accuracy);
  };
  return (
    <div className="max-w-lg mx-auto w-full">
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Score</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <ResultsCard accuracy={accuracy} />
            <AccuracyCard
              accuracy={accuracy}
              totalCorrect={totalCorrect}
              totalQuestions={totalQuestions}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
