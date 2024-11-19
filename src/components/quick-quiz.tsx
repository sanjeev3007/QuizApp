"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, FlaskRoundIcon as Flask, PiSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SubjectIconProps {
  Icon: React.ComponentType<{ className?: string }>;
  subject: string;
  isSelected: boolean;
  onClick: () => void;
}

function SubjectIcon({ Icon, subject, isSelected, onClick }: SubjectIconProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center transition-all duration-200 transform ${
        isSelected ? "scale-110" : "hover:scale-105"
      }`}
      aria-pressed={isSelected}
    >
      <div
        className={`bg-white p-6 rounded-full mb-3 shadow-md ${
          isSelected ? "ring-4 ring-orange-300" : ""
        }`}
      >
        <Icon
          className={`w-12 h-12 ${
            isSelected ? "text-orange-500" : "text-orange-600"
          }`}
        />
      </div>
      <span
        className={`text-lg font-medium ${
          isSelected ? "text-yellow-300" : "text-[#5b8989]"
        }`}
      >
        {subject}
      </span>
    </button>
  );
}

export default function QuickQuiz() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      // setIsVisible(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full mb-8"
        >
          <div className="w-full bg-[#F5F9FF] p-6 rounded-xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-[#5b8989] text-center mb-6">
                Ready for a Quiz?
              </h2>
              <p className="text-xl text-[#5b8989] text-center mb-8">
                Choose your subject and start learning
              </p>

              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <SubjectIcon
                  Icon={PiSquare}
                  subject="Mathematics"
                  isSelected={selectedSubject === "Mathematics"}
                  onClick={() => setSelectedSubject("Mathematics")}
                />
                <SubjectIcon
                  Icon={Flask}
                  subject="Science"
                  isSelected={selectedSubject === "Science"}
                  onClick={() => setSelectedSubject("Science")}
                />
                <SubjectIcon
                  Icon={BookOpen}
                  subject="English"
                  isSelected={selectedSubject === "English"}
                  onClick={() => setSelectedSubject("English")}
                />
              </div>

              <div className="text-center">
                {selectedSubject && (
                  <Button
                    size="lg"
                    className="bg-white hover:bg-orange-100 text-orange-500 px-8 py-2 rounded-md text-lg font-medium transition-colors"
                  >
                    Let's Start {selectedSubject}
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-center mt-6 text-[#5b8989]">
                <span className="inline-block mr-2">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-lg">
                  Time left: <span className="font-medium">{timeLeft}</span>{" "}
                  seconds
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
