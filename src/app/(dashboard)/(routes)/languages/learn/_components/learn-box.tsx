"use client";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { AnimatePresence, motion } from "framer-motion";
import { Flashcard } from "./flashcard";
import { useEffect, useState } from "react";
import { DB, FlashcardPageProps } from "../_types";
import { SummarySlide } from "./summary-slide";

const isTouchDevice = () =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

export default function LearnBox({
  content,
  levelId,
  topicId,
  cardIndex,
  mode,
}: FlashcardPageProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] =
    useState<SpeechSynthesis | null>(null);
  const [flashcards, setFlashcards] = useState<DB[]>([]);

  const topicContent = content.filter(
    (f) =>
      f.language_id === 1 && f.level_id === levelId && f.topic_id === topicId
  );

  useEffect(() => {
    setFlashcards(content);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
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
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const completeSet = () => {
    const percentageCorrect = (correctAnswers / flashcards.length) * 100;
    let progressIncrease = 0;

    if (percentageCorrect >= 90) {
      progressIncrease = 20;
    } else if (percentageCorrect >= 70) {
      progressIncrease = 15;
    } else if (percentageCorrect >= 50) {
      progressIncrease = 10;
    } else {
      progressIncrease = 5;
    }

    setIsCompleted(true);
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setCorrectAnswers(0);
    setIsCompleted(false);
  };

  const Backend = isTouchDevice() ? TouchBackend : HTML5Backend;

  if (isCompleted) {
    return (
      <SummarySlide
        correctAnswers={correctAnswers}
        totalQuestions={flashcards.length}
        onRestart={handleRestart}
        levelId={levelId}
        topicId={topicId}
        mode={mode}
      />
    );
  }
  return (
    <div className="">
      <DndProvider backend={Backend}>
        <div className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {true ? (
              <motion.div
                key={"currentCardIndex"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg"
              >
                <Flashcard
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
                  mode={mode}
                />
              </motion.div>
            ) : (
              <p>No flashcards available</p>
            )}
          </AnimatePresence>
        </div>
      </DndProvider>
    </div>
  );
}
