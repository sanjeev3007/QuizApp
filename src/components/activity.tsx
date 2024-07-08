"use client";
import {
  Avatar,
  Button,
  CardContent,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";
import "@/components/home-page.css";
import Image from "next/image";
import rank_active from "@/assets/Images/rank_active.svg";
import rank_gray from "@/assets/Images/rank_greyed.svg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditProfileDialog from "@/components/avatar-dialog";
import ScoreGraph from "./quiz-score-tracking/score-graph";
import noahFireStreak from "@/assets/Images/noah_fire_streak_transparent_v1.gif";
import { getCookie } from "cookies-next";
import { Bowlby_One_SC } from "next/font/google";
import ActivityStreak from "./activity-streak";
import { Inter } from "next/font/google";
import { getStudentActivity } from "@/lib/quiz-insights/apiCLient";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const bowlby = Bowlby_One_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bowlby-one-sc"
});

interface ActivityItem {
  date: string;
  numberOfQuestion: number;
  subjectId: number;
}

interface StudentActivityResponse {
  response: {
    activity: ActivityItem[];
    leaderShip?: {
      topTenStudentList?: { userid: string; rank: string }[];
    };
    streak?: {
      streak: number;
    };
    totalQuestionAnswered?: {
      totalQuestionAnswered: number;
    };
  };
}

const Activity = () => {
  const userName =
    (getCookie("userName") as string) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const userId =
    (getCookie("userId") as string) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade =
    (getCookie("grade") as string) ||
    (process.env.NEXT_PUBLIC_DEMO_USER_GRADE as string);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [avatar, setAvatar] = React.useState<string>("");
  const [studentActivity, setStudentActivity] = React.useState<StudentActivityResponse | null>(null);
  const [streakData, setStreakData] = React.useState<any[]>([]);
  const [userRank, setUserRank] = React.useState<number | null>(null);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("en-US", { day: "2-digit", month: "short" })
      .replace(",", "");
  };

  useEffect(() => {
    const savedAvatar = localStorage.getItem(`avatar_${userId}`);
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }

    const fetchStudentActivity = async () => {
      try {
        const data: StudentActivityResponse = await getStudentActivity(userId);
        setStudentActivity(data);

        if (data && data.response) {
          if (data.response.activity) {
            const formattedActivity = data.response.activity.map((item: ActivityItem) => ({
              date: formatDate(item.date),
              count: item.numberOfQuestion,
              subject: mapSubjectIdToName(item.subjectId)
            }));
            setStreakData(formattedActivity);
          }

          if (data.response.leaderShip && data.response.leaderShip.topTenStudentList) {
            const userRankData = data.response.leaderShip.topTenStudentList.find(
              (student) => student.userid === userId
            );
            setUserRank(userRankData ? parseInt(userRankData.rank) : null);
          }
        }
      } catch (err) {
        console.error("Error fetching student activity:", err);
      }
    };

    const mapSubjectIdToName = (subjectId: number): string => {
      switch (subjectId) {
        case 1:
          return "Maths"
        case 2:
          return "Science";
        case 3:
          return "English";
        case 4:
          return "Coding";
        default:
          return "Unknown";
      }
    };

    fetchStudentActivity();
  }, [userId]);

  const getSubjectColor = (subject: string) => {
    switch (subject?.toLowerCase()) {
      case "math":
        return "#FFA85D";
      case "science":
        return "linear-gradient(123.74deg, #54C993 -2.88%, #54C9B2 103.53%)";
      case "english":
        return "linear-gradient(123.74deg, #47BAD7 -2.88%, #47ACD7 103.53%)";
      default:
        return "#FFA85D";
    }
  };

  const handleAvatarUpdate = (newAvatar: string) => {
    setAvatar(newAvatar);
    localStorage.setItem(`avatar_${userId}`, newAvatar);
    handleCloseDialog();
  };

  return (
    <>
      <CardContent className="activityCardContainer">
        <Typography className="cardHeadingTxt">My Activity</Typography>
        <div className="profileWrapper">
          <div className="profileSection">
            <Avatar src={avatar} alt="profile" sx={{ width: 80, height: 80 }} />
            <div className="profileDetails">
              <span className="nameTag">{userName}</span>
              <Typography className="gradeTag">Grade {grade}</Typography>
              <Button
                variant="text"
                className="editBtn"
                endIcon={<EditOutlinedIcon fontSize="small" />}
                onClick={handleOpenDialog}
              >
                Edit
              </Button>
            </div>
          </div>
          <div className="rankContainer">
            <div className="rankSection">
              <Image src={userRank ? rank_active : rank_gray} alt="rank" />
              <Typography className="rankNumber">
                {userRank ? userRank : ""}
              </Typography>
            </div>
            <Typography className={userRank ? "rankTitle" : "rankTitleGray"}>
              {userRank ? "Your Rank" : "Unranked"}
            </Typography>
          </div>
        </div>
        <div className="activitiesTrackerContainer">
          {studentActivity ? (
            <>
              <div className="streaksGraphContainer">
                <Typography className="activityTrackHeading">
                  Activities in last 7 days
                </Typography>
              </div>
              <div className="streaksContainer">
                <div className="streakGraph">
                  <ActivityStreak streakData={streakData} />
                </div>
                <div className="activityStreak">
                  <div className="streakGifAndText">
                    <Image
                      src={noahFireStreak}
                      alt="noahFireStreak"
                      width={66}
                      height={72}
                    />
                    <div>
                      <div className="font-bowlby text-4xl font-normal text-[#FFA85D]">
                        {studentActivity.response.streak?.streak}x
                      </div>
                      <Typography className="streakTxt">
                        daily streak
                      </Typography>
                    </div>
                  </div>
                  <Typography className="streakDescription">
                    <strong>
                      {studentActivity.response.totalQuestionAnswered?.totalQuestionAnswered}
                    </strong>{" "}
                    questions completed
                  </Typography>
                </div>
              </div>
            </>
          ) : (
            <div className="new-user-activity">
              <Image
                src={noahFireStreak}
                alt="noahFireStreak"
                width={66}
                height={72}
              />
              <Typography className="streakTxt">
                Keep completing your daily activities and watch your learning
                streak burning brightly here!
              </Typography>
            </div>
          )}
        </div>
      </CardContent>
      {openDialog && (
        <EditProfileDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onAvatarUpdate={handleAvatarUpdate}
          userName={userName || ""}
          grade={grade}
        />
      )}
    </>
  );
};

export default Activity;
