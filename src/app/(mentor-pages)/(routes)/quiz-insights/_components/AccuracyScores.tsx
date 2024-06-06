"use client";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { getAccuracyScores } from "@/lib/quiz-insights/apiCLient";

const useStyles = makeStyles(() => ({
  conatiner: {
    background: "#FFFFFF",
    padding: "16px 24px",
    borderRadius: "8px",
    border: "1px solid #FDECD9",
    height: "232px",
    minWidth: "590px",
  },
  title: {
    color: "#3D3D3D",
    fontSize: "16px",
    lineHeight: "18.71px",
    fontWeight: "600",
  },
  scrollContainer: {
    marginTop: "20px",
    maxHeight: "168px",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#EAECEC",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#D3D9D9",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#D3D9D9",
    },
  },
  scoresContainer: {
    marginRight: "20px",
  },
  scoreWrapper: {
    display: "flex",
    background: "#FBF9F9",

    padding: "8px",
    justifyContent: "space-between",
    borderRadius: "4px",
  },
  addMargin: {
    marginTop: "12px",
  },
  quizName: {
    color: "#7A7A7A",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "14.52px",
  },
  score: {
    color: "#7A7A7A",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "16.94px",
  },
}));

const AccuracyScores = ({ mentorId, userId }) => {
  const classes = useStyles();
  const [scoreDetails, setScoreDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAccuracyScores(mentorId, userId);
        console.log(data, "dataaa");
        if (data && data?.response.length > 0) {
          setScoreDetails(data?.response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.conatiner}>
      <div className={classes.title}>Accuracy Scores</div>
      <div className={classes.scrollContainer}>
        <div className={classes.scoresContainer}>
          {scoreDetails &&
            scoreDetails.length > 0 &&
            scoreDetails.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${classes.scoreWrapper} ${
                    index !== 0 && classes.addMargin
                  }`}
                >
                  <div className={classes.quizName}>{item.topic}</div>
                  <div className={classes.score}>{item.totalScore}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AccuracyScores;
