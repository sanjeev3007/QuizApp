"use client";
import React, { useState, useEffect } from "react";
import "@/components/home-page.css";
import Image from "next/image";
import noahImage from "@/assets/Images/noahHomepageImage.png";
import noahHeadingImage from "@/assets/Images/NoahHeading.png";
import { useRouter } from "next/navigation";
import { getNumberOfCompletedGKQuiz } from "@/actions/gk-quiz.server";
import { createGKQuiz, getGKQuestions } from "@/actions/gk-quiz";
import {
  doubtSolveDashboard,
  getNumberOfSubmittedAnswers,
} from "@/app/supabase-server";
import { setCookie } from "cookies-next";

type Props = {
  userId: string;
  totalChats: number;
};

type QuizData = {
  numberOfCompletedQuiz: number;
  level: number;
  totalQuiz: number;
};

const HomePage: React.FC<Props> = ({
  userId,
  totalChats: initialTotalChats,
}: Props) => {
  const [quizData, setQuizData] = useState<QuizData | null>({
    numberOfCompletedQuiz: 0,
    level: 1,
    totalQuiz: 10,
  });
  const [totalDoubtChats, setTotalDoubtChats] =
    useState<number>(initialTotalChats);
  const [numberOfCompletedQuiz, setNumberOfCompletedQuiz] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const x = await getNumberOfSubmittedAnswers(userId);
      setNumberOfCompletedQuiz(x);
    };
    fetchData();
  }, []);

  const router = useRouter();
  const cards = [
    {
      title: "Learn",
      subtitle:
        "Learn through quizzes on different academic subjects tailored for you",
      description: (
        <span>
          <strong>{numberOfCompletedQuiz}</strong> questions completed
        </span>
      ),
    },
    {
      title: "Fun Trivia",
      subtitle:
        "Test your general knowledge skills across various topics through quizzes",
      description:
        (quizData && quizData?.numberOfCompletedQuiz == 0) ||
        quizData?.numberOfCompletedQuiz ? (
          <span>
            <strong>{quizData.numberOfCompletedQuiz}</strong> questions
            completed
          </span>
        ) : (
          ""
        ),
    },
    {
      title: "Ask a Doubt",
      subtitle:
        "Chat with Noah real time to get any of your doubts resolved or discuss any topic",
      description:
        totalDoubtChats == 0 || totalDoubtChats ? (
          <span>
            <strong>{totalDoubtChats}</strong> chats completed
          </span>
        ) : (
          ""
        ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNumberOfCompletedGKQuiz(userId!);
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching completed quiz data:", error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const totalchats = await doubtSolveDashboard(userId!);
        setTotalDoubtChats(totalchats);
      } catch (error) {
        console.error("Error fetching completed total chats:", error);
      }
    };
    fetchCount();
  }, [userId]);

  const generateGKQuiz = async () => {
    try {
      const { questions, topics } = await getGKQuestions(userId);
      if (questions.length === 0) {
        return;
      }

      // create gk quiz and redirect to gk-quiz page
      const data = await createGKQuiz(userId, questions, topics);
      if (!data || !data!.length) return;
      router.push(`/gk-quiz/${data[0]?.id}`);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleButtonClick = (title: string) => {
    if (title === "Fun Trivia") {
      generateGKQuiz();
    } else if (title === "Ask a Doubt") {
      router.push("/chat-bot");
    } else if (title === "Learn") {
      router.push("/student-dashboard");
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="parentDiv">
        <div className="titleSectionWrapper">
          <div className="titleTxt">
            <div className="flex flex-row xs:justify-center md:justify-start">
              <Image
                src={noahHeadingImage}
                alt="Noah heading"
                height={42}
                width={151}
                className="noahHeadingImg"
              />
            </div>
            <div className="subHeadingTxt">Built to make you better.</div>
          </div>
          <div className="noahHomeIcon">
            <Image
              src={noahImage}
              alt="Noah image"
              height={222}
              width={266}
              className="md:w-[266px] md:h-[222px] xs:w-[206px] xs:h-[172px]"
            />
          </div>
        </div>
        <div className="cardContainer">
          <div className="cardHeading">What do you want to do today?</div>
          <div className="cardsWrapper">
            {cards.map((card, index) => (
              <div key={index} className="cardLayout">
                <div className="lg:m-6 md:m-2 lg:p-0 xs:p-4 h-5/6 relative">
                  <div className="cardTitle">{card.title}</div>
                  <div className="cardSubTitle">{card.subtitle}</div>
                  <div className="cardDescription">{card.description}</div>
                  <div className="btnContainer">
                    <button
                      className="getStartedBtn"
                      onClick={() => handleButtonClick(card.title)}
                    >
                      <span className="flex flex-row justify-center gap-2">
                        Get Started
                        <Image
                          src="/images/icons/arrow-right.png"
                          alt="arrow-right"
                          width={16}
                          height={16}
                          className="mb-1"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
