import React, { useEffect } from "react";
import "@/components/home-page.css";
import Image from "next/image";
import NoahImage from "@/assets/Images/noah_doubt_solve_dp.svg";
import { Button, Card, CircularProgress, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { createQuizBySubject } from "@/actions/quiz.client";

const NoahHeader = ({
  subjectId,
  quizPath,
}: {
  subjectId: number;
  quizPath: string;
}) => {
  const userId = getCookie("userId");
  const grade = parseInt(getCookie("grade")!);
  const studentName = getCookie("studentName");
  const [isMount, setIsMount] = React.useState(false);
  const welcomeMessage =
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  const createQuiz = async () => {
    if (!userId || !grade) return;
    try {
      setLoading(true);
      const data = await createQuizBySubject({ userId, grade, subjectId });
      console.log(data);
      if (data && data.length > 0) {
        router.push(`${quizPath}/${data[0].id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isMount) return null;
  return (
    <div className="noah-heading-wrapper">
      <div className="noah-image-fact-wrap">
        <div className="noah-image-txtContainer">
          <Image
            src={NoahImage}
            alt="Noah image"
            width={104}
            height={104}
            className="h-[104px]"
          />
          <Typography className="noah-image-txt">Noah says</Typography>
        </div>
        <div className="fact-card-container">
          <Card className="fact-card">
            <Typography className="fact-card-txt">
              {welcomeMessage.text.replace(
                "{name}",
                studentName?.split(" ")[0] || ""
              )}
            </Typography>
          </Card>
          <Button
            variant="text"
            className="insights-btn"
            endIcon={<ArrowOutwardRoundedIcon />}
          >
            View detailed insights
          </Button>
        </div>
      </div>
      <div className="noah-subject-wrap">
        <Card className="noah-subject-quiz">
          <Typography className="noah-subject-text">
            Noah curates quizzes to help you learn better
          </Typography>
          <Button
            variant="contained"
            className="resume-quizz-btn"
            endIcon={loading ? <CircularProgress /> : <EastRoundedIcon />}
            onClick={async () => createQuiz()}
            disabled={loading}
          >
            Continue Quiz
          </Button>
        </Card>
      </div>
    </div>
  );
};

const welcomeMessages = [
  {
    text: "Hey {name}, We're thrilled to continue this learning journey with you! I'm here to help you master new concepts and overcome challenges as you work towards your academic goals. Together, we'll explore fascinating topics that spark your curiosity. Remember, Alex, each question you ask is a building block for your future success!",
  },
  {
    text: "Welcome back, {name}! Your dedication to learning is inspiring. I'm excited to guide you through new concepts and help you tackle any obstacles that come your way. We'll dive into thought-provoking subjects and sharpen your analytical skills. Alex, always remember that your growth mindset is your greatest asset!",
  },
  {
    text: "{name}, great to see you! Ready for another exciting learning adventure? I'm pumped to help you uncover new ideas and conquer academic hurdles. We're a team in this journey, exploring intriguing topics and boosting your problem-solving abilities. Hey Alex, don't forget - your questions are the fuel that powers our learning rocket!",
  },
  {
    text: "Welcome, {name}! It's wonderful to have you back on this learning expedition. My role is to support you in grasping complex ideas and turning challenges into victories. We'll embark on fascinating intellectual explorations together, enhancing your critical thinking along the way. Alex, always remember that your curiosity is the key to unlocking new understanding!",
  },
  {
    text: "{name}, welcome aboard! I'm thrilled to continue guiding you towards academic excellence. Together, we'll crack tough concepts and transform obstacles into stepping stones for your success. Get ready to dive into captivating subjects that will expand your intellectual horizons. Remember, Alex - every 'aha!' moment brings you closer to your goals!",
  },
];

export default NoahHeader;
