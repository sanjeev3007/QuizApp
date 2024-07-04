"use client";
import { Avatar, Button, CardContent, Typography } from "@mui/material";
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bowlby = Bowlby_One_SC({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bowlby-one-sc",
});



const activity = () => {

  const userName = getCookie("userName") || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const userId = getCookie("userId") || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade = getCookie("grade") || process.env.NEXT_PUBLIC_DEMO_USER_GRADE!;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [avatar, setAvatar] = React.useState<string>("");
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const rank = 10;

  const streakData = [
    { date: "01 Jan", count: 7, subject: "science" },
    { date: "02 Jan", count: 8, subject: "science" },
    { date: "03 Jan", count: 10, subject: "science" },
    { date: "04 Jan", count: 8, subject: "science" },
    { date: "05 Jan", count: 10, subject: "science" },
    { date: "06 Jan", count: 5, subject: "science" },
    { date: "07 Jan", count: 2, subject: "science" },
  ];

  useEffect(() => {
    const savedAvatar = localStorage.getItem(`avatar_${userId}`);
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, [userId]);

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
              <Image src={rank > 0 ? rank_active : rank_gray} alt="rank" />
              <Typography className="rankNumber">
                {rank > 0 ? rank : ""}
              </Typography>
            </div>
            <Typography className={rank > 0 ? "rankTitle" : "rankTitleGray"}>
              {rank > 0 ? "Your Rank" : "Unranked"}
            </Typography>
          </div>
        </div>
        <div className="activitiesTrackerContainer">
          {streakData ? (
            <>
              <div className="streaksGraphContainer">
                <Typography className="activityTrackHeading">
                  Activities in last 7 days
                </Typography>
              </div>
              <div className="streaksContainer">
                <div className="streakGraph">
                <ActivityStreak streakData={streakData}/>
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
                    <div className="font-bowlby text-4xl font-normal text-[#FFA85D]">6x</div>

                      <Typography className="streakTxt">
                        daily streak
                      </Typography>
                    </div>
                  </div>
                  <Typography className="streakDescription">
                    <strong>{140}</strong> questions completed
                  </Typography>
                </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
          
        </div>
      </CardContent>
      {openDialog && (
        <EditProfileDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onAvatarUpdate={handleAvatarUpdate}
          userName={userName || ''}
          grade={grade}
        />
      )}
    </>
  );
};

export default activity;
