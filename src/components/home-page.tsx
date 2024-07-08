"use client";
import React, { useState, useEffect } from "react";
import "@/components/home-page.css";
import { Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import noahImage from "@/assets/Images/noahHomepageImage.png";
import noahHeadingImage from "@/assets/Images/NoahHeading.png";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { getNumberOfCompletedGKQuiz } from "@/actions/gk-quiz.server";
import { createGKQuiz, getGKQuestions } from "@/actions/gk-quiz";
import { doubtSolveDashboard } from "@/app/supabase-server";

type Props = {
  userId: string;
  userName: string;
  grade: number;
  gkQuiz: {
    accuracy: number;
    totalQuiz: number;
  };
  totalChats: number;
};

type QuizData = {
  numberOfCompletedQuiz: number;
  level: number;
  totalQuiz: number;
};

const HomePage: React.FC<Props> = ({
  userId,
  userName,
  grade,
  gkQuiz,
  totalChats: initialTotalChats,
}: Props) => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [totalDoubtChats, setTotalDoubtChats] =
    useState<number>(initialTotalChats);
  const numbers = 140;
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const cards = [
    {
      title: "Learn",
      subtitle:
        "Learn through quizzes on different academic subjects tailored for you",
      description: `${numbers} questions completed`,
    },
    {
      title: "Fun Trivia",
      subtitle:
        "Test your general knowledge skills across various topics through quizzes",
      description:
        quizData && quizData.numberOfCompletedQuiz ? (
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
      description: totalDoubtChats ? (
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
      setLoader(true);
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
    } finally {
      setLoader(false);
    }
  };

  const handleButtonClick = (title: string) => {
    if (title === "Fun Trivia") {
      generateGKQuiz();
    } else if (title === "Ask a Doubt") {
      router.push("/chat-home");
    } else if (title === "Learn") {
      router.push("/student-dashboard");
    }
  };

  return (
    <div className="parentDiv">
      <div className="titleSectionWrapper">
        <div className="titleTxt">
            <Image
              src={noahHeadingImage}
              alt="Noah heading"
              height={42}
              width={151}
              className="noahHeadingImg"
            />
          <Typography className="subHeadingTxt">
            Built to make you better.
          </Typography>
        </div>
        <div className="noahHomeIcon">
          <Image src={noahImage} alt="Noah image" height={222} width={266} />
        </div>
      </div>
      <div className="cardContainer">
        <Typography className="cardHeading">
          What do you want to do today?
        </Typography>
        <div className="cardsWrapper">
          {cards.map((card, index) => (
            <Card key={index} className="cardLayout">
              <CardContent>
                <Typography className="cardTitle">{card.title}</Typography>
                <Typography className="cardSubTitle">
                  {card.subtitle}
                </Typography>
                <Typography className="cardDescription">
                  {card.description}
                </Typography>
                <div className="btnContainer">
                  <Button
                    className="getStartedBtn"
                    endIcon={<EastRoundedIcon />}
                    variant="contained"
                    onClick={() => handleButtonClick(card.title)}
                  >
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
