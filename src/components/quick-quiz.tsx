"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createQuizBySubject } from "@/actions/quiz.client";
import constants from "@/constants/constants";

interface SubjectCardProps {
  Icon: React.ComponentType<{ className?: string }>;
  subject: string;
  isSelected: boolean;
  onClick: () => void;
  color: "sky" | "emerald" | "indigo";
}

export default function QuickQuiz() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const userId = getCookie("userId");
  const grade = parseInt(getCookie("grade")!);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsVisible(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleStartQuiz = async () => {
    if (!selectedSubject || !userId || !grade) return;

    let subjectId: number;
    let quizPath: string;

    // Map selected subject to subjectId and quizPath
    switch (selectedSubject) {
      case "Mathematics":
        subjectId = constants.SUBJECT_IDS.MATH;
        quizPath = "math";
        break;
      case "Science":
        subjectId = constants.SUBJECT_IDS.SCIENCE;
        quizPath = "science";
        break;
      case "English":
        subjectId = constants.SUBJECT_IDS.ENGLISH;
        quizPath = "english";
        break;
      default:
        return;
    }

    try {
      setLoading(true);

      const { quiz, previous } = await createQuizBySubject({
        userId,
        grade,
        subjectId,
      });

      if (quiz && quiz.length > 0) {
        if (previous) {
          router.push(`/quiz/${quizPath}/${quiz[0].id}?previous=true`);
        } else {
          router.push(`/quiz/${quizPath}/${quiz[0].id}`);
        }
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

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
              <h2 className="text-3xl font-bold text-[#5b8989] text-center mb-2">
                Let's Play a Quiz Game!
              </h2>
              <p className="text-xl text-[#5b8989] text-center mb-8">
                Just 5 Questions to showcase your brilliance
              </p>

              <div className="grid grid-cols-3 gap-8 mb-8">
                <SubjectCard
                  Icon={() => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-12 h-12"
                    >
                      <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                      <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                      <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                    </svg>
                  )}
                  subject="Mathematics"
                  isSelected={selectedSubject === "Mathematics"}
                  onClick={() => setSelectedSubject("Mathematics")}
                  color="sky"
                />
                <SubjectCard
                  Icon={() => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-12 h-12"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  subject="Science"
                  isSelected={selectedSubject === "Science"}
                  onClick={() => setSelectedSubject("Science")}
                  color="emerald"
                />
                <SubjectCard
                  Icon={() => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-12 h-12"
                    >
                      <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                    </svg>
                  )}
                  subject="English"
                  isSelected={selectedSubject === "English"}
                  onClick={() => setSelectedSubject("English")}
                  color="indigo"
                />
              </div>

              <div className="text-center">
                {selectedSubject && (
                  <Button
                    size="lg"
                    className="bg-white hover:bg-[#5b8989]/10 text-[#5b8989] px-8 py-2 rounded-lg text-lg font-semibold border border-[#5b8989]/40 transition-colors"
                    onClick={handleStartQuiz}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        Loading...
                        {/* You can add a loading spinner here */}
                      </div>
                    ) : (
                      `Let's Start ${selectedSubject}`
                    )}
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

function SubjectCard({
  Icon,
  subject,
  isSelected,
  onClick,
  color,
}: SubjectCardProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: isSelected ? 1.1 : 1,
      rotate: isSelected ? [0, -5, 5, -5, 5, 0] : 0,
      transition: { duration: 0.5 },
    });
  }, [isSelected, controls]);

  // Create a color mapping object for different states
  const colorStyles = {
    sky: {
      selected: "bg-white border-2 border-sky-300 text-sky-500",
      default: "bg-white text-sky-500 hover:border-2 hover:border-sky-300",
      iconBg: "bg-sky-100",
    },
    emerald: {
      selected: "bg-white border-2 border-emerald-300 text-emerald-500",
      default:
        "bg-white text-emerald-500 hover:border-2 hover:border-emerald-300",
      iconBg: "bg-emerald-100",
    },
    indigo: {
      selected: "bg-white border-2 border-indigo-300 text-indigo-500",
      default:
        "bg-white text-indigo-500 hover:border-2 hover:border-indigo-300",
      iconBg: "bg-indigo-100",
    },
  };

  const currentColor = colorStyles[color as keyof typeof colorStyles];

  return (
    <motion.button
      animate={controls}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex w-full flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
        isSelected ? currentColor.selected : currentColor.default
      }`}
      aria-pressed={isSelected}
    >
      <motion.div
        className={`p-4 rounded-full mb-4 ${currentColor.iconBg}`}
        animate={{ rotate: isSelected ? [0, -10, 10, -10, 10, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon />
      </motion.div>
      <span className="text-lg font-bold text-center">{subject}</span>
    </motion.button>
  );
}
