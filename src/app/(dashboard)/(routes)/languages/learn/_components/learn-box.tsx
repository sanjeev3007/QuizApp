"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { AnimatePresence, motion } from "framer-motion";
import { Flashcard } from "./flashcard";
import { useEffect, useState } from "react";
import { LanguageDB } from "../_types";
import { saveLearningData } from "@/actions/language.actions";
import { CompletionCard } from "./completion-card";

type LearningSubmission = {
  questionId: number;
  answer: string;
  isCorrect: boolean;
};

type AnsweredQuestion = {
  questionId: number;
  answer: string;
  isCorrect: boolean;
};

const DndProviderWithBackend = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Backend, setBackend] = useState(() => HTML5Backend);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setBackend(() => (isTouchDevice ? TouchBackend : HTML5Backend));
  }, []);

  return <DndProvider backend={Backend}>{children}</DndProvider>;
};

type FlashcardPageProps = {
  content: LanguageDB[];
  levelId: number;
  topicId: number;
  lang: string;
  userId: string;
  cardState: string;
};

export default function LearnBox({
  content,
  levelId,
  topicId,
  lang,
  userId,
  cardState,
}: FlashcardPageProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [learningSubmissions, setLearningSubmissions] = useState<
    LearningSubmission[]
  >([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    AnsweredQuestion[]
  >([]);

  const handleNextCard = () => {
    if (currentCardIndex < content.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      completeSet();
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    const currentQuestionId = content[currentCardIndex].id;

    if (!answeredQuestions.some((q) => q.questionId === currentQuestionId)) {
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
      }

      const newAnswer = {
        questionId: currentQuestionId,
        answer:
          content[currentCardIndex].options.find(
            (option) => option.correct === "true"
          )?.text || "",
        isCorrect,
      };

      setAnsweredQuestions([...answeredQuestions, newAnswer]);
      setLearningSubmissions([...learningSubmissions, newAnswer]);
    }
  };

  const resetQuiz = () => {
    setCurrentCardIndex(0);
    setCorrectAnswers(0);
    setLearningSubmissions([]);
  };

  const completeSet = async () => {
    try {
      const data = await saveLearningData({
        userId,
        total: content.length,
        correct: correctAnswers,
        submission: learningSubmissions,
        language: lang,
        topicId,
        levelId,
      });
      if (data) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Error saving learning data:", error);
    }
  };

  return (
    <div className="">
      <DndProviderWithBackend>
        <div className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {isCompleted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg"
              >
                <CompletionCard
                  lang={lang}
                  topicId={topicId}
                  levelId={levelId}
                  correctAnswers={correctAnswers}
                  totalCards={content.length}
                  cardState={cardState}
                />
              </motion.div>
            ) : content && content[currentCardIndex] ? (
              <motion.div
                key={"currentCardIndex"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg"
              >
                <Flashcard
                  key={`flashcard-${currentCardIndex}`}
                  data={{
                    question: content[currentCardIndex].question,
                    options: content[currentCardIndex].options.map(
                      (option, index) => ({
                        id: index.toString(),
                        text: option.text,
                      })
                    ),
                    correctAnswer:
                      content[currentCardIndex].options.find(
                        (option) => option.correct === "true"
                      )?.text || "",
                    explanation: content[currentCardIndex].explanation,
                  }}
                  currentCard={currentCardIndex + 1}
                  totalCards={content.length}
                  onNextCard={handleNextCard}
                  onPrevCard={handlePrevCard}
                  onAnswer={handleAnswer}
                  resetQuiz={resetQuiz}
                  previousAnswer={answeredQuestions.find(
                    (q) => q.questionId === content[currentCardIndex].id
                  )}
                />
              </motion.div>
            ) : (
              <p>No content available</p>
            )}
          </AnimatePresence>
        </div>
      </DndProviderWithBackend>
    </div>
  );
}
