"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

export default function QuickQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      questionText: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      questionText: "Which planet is known as the Red Planet?",
      options: ["Jupiter", "Mars", "Venus", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      questionText: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
  ];

  const handleAnswerClick = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };
  return (
    <div className="w-full bg-[#f4f8f8] rounded-lg flex justify-center items-center p-8 mb-4">
      <Card className="overflow-hidden w-full max-w-2xl">
        <CardContent className="p-6">
          {showScore ? (
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold">
                You scored {score} out of {questions.length}!
              </h2>
              <Button
                onClick={handleRestart}
                className="bg-orange-400 hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                Restart Quiz
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="mb-6 text-center font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p className="mb-4 text-lg">
                Q. {questions[currentQuestion].questionText}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    variant="outline"
                    className="h-auto p-2 text-left text-base hover:bg-teal-50 dark:hover:bg-teal-900"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
