"use client";
import { Avatar, Button, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "@/components/home-page.css";
import Image from "next/image";
import rank_active from "@/assets/Images/rank_active.svg";
import rank_gray from "@/assets/Images/rank_greyed.svg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditProfileDialog from "@/components/edit-avatar/avatar-dialog";
import noahFireStreak from "@/assets/Images/noah_fire_streak_transparent_v1.gif";
import ActivityStreak from "./activity-streak";

const activity = ({
  subject,
  studentActivity,
  streakData,
  studentData,
}: {
  subject: string | null;
  studentActivity: any;
  streakData: any;
  studentData: any;
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [avatar, setAvatar] = React.useState<string>("");
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    if (studentData) {
      setAvatar(studentData.pic);
    }
  }, [studentData]);

  const getBackgroundColor = (subject: string | null) => {
    switch (subject) {
      case "mathematics":
        return "math-gradient";
      case "science":
        return "science-gradient";
      case "english":
        return "english-gradient";
      default:
        return "math-gradient";
    }
  };

  return (
    <>
      <CardContent className="activityCardContainer">
        <Typography className="cardHeadingTxt">My Activity</Typography>
        <div className="profileWrapper">
          <div className="profileSection">
            <Avatar src={avatar} alt="profile" sx={{ width: 80, height: 80 }} />
            <div className="profileDetails">
              <span className="nameTag">
                {studentData?.studentName || "N/A"}
              </span>
              <Typography className="gradeTag">
                Grade {studentData?.grade || "N/A"}
              </Typography>
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
              <Image
                src={studentData?.rank > 0 ? rank_active : rank_gray}
                alt="rank"
                width={126}
                height={80}
              />
              <Typography className="rankNumber">
                {studentData?.rank > 0 ? studentData?.rank : ""}
              </Typography>
            </div>
            <Typography
              className={studentData?.rank > 0 ? "rankTitle" : "rankTitleGray"}
            >
              {studentData?.rank > 0 ? "Your Rank" : "Unranked"}
            </Typography>
          </div>
        </div>
        <div className="activitiesTrackerContainer">
          {streakData?.totalQuestions > 0 ? (
            <>
              <div className="streaksGraphContainer">
                <Typography className="activityTrackHeading">
                  Activities in last 7 days
                </Typography>
              </div>
              <div className="streaksContainer">
                <div className="streakGraph">
                  <ActivityStreak
                    studentActivity={studentActivity}
                    subjectGradient={getBackgroundColor(subject)}
                  />
                </div>
                <div className="activityStreak">
                  <div className="streakGifAndText">
                    <Image
                      src={
                        streakData?.streak > 0
                          ? noahFireStreak
                          : "/images/streak_grey.svg"
                      }
                      alt="noahFireStreak"
                      width={72}
                      height={72}
                    />
                    <div className="mt-auto mb-auto">
                      <div
                        className={`font-bowlby text-4xl font-normal ${
                          streakData?.streak > 0
                            ? getBackgroundColor(subject) +
                              "gradient-text-addon"
                            : "text-[#C4C3C1]"
                        } text-center`}
                      >
                        {`${streakData?.streak}x`}
                      </div>

                      <Typography className="streakTxt">
                        daily streak
                      </Typography>
                    </div>
                  </div>
                  <Typography className="streakDescription">
                    <strong>{`${streakData?.totalQuestions}`}</strong> questions
                    completed
                  </Typography>
                </div>
              </div>
            </>
          ) : (
            <div className="grid justify-center content-center xs:mt-36 md:mt-24">
              <div className="flex flex-row md:w-[429px] xs:w-[300px] justify-center">
                <Image
                  src={noahFireStreak}
                  alt="noahFireStreak"
                  width={66}
                  height={72}
                  className="mt-auto mb-auto"
                />
                <Typography className="streakTxt mt-auto mb-auto">
                  Keep completing your daily activities and watch your learning
                  streak burning brightly here!
                </Typography>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      {openDialog && (
        <EditProfileDialog
          open={openDialog}
          onClose={handleCloseDialog}
          userName={studentData.studentName || ""}
          grade={studentData.grade}
          studentId={studentData.studentId}
          setAvatar={setAvatar}
        />
      )}
    </>
  );
};

export default activity;
