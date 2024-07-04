import React from "react";
import "@/components/home-page.css";

type StreakData = {
  date: string;
  count: number;
  subject: string;
};

type ActivityStreakProps = {
  streakData: StreakData[];
};

const ActivityStreak: React.FC<ActivityStreakProps> = ({ streakData }) => {
  const maxBarHeight = 136;
  const minBarHeight = 20;
  const maxValue = Math.max(...streakData.map((item) => item.count));
  const scalingFactor =
    maxValue > 0 ? (maxBarHeight - minBarHeight) / maxValue : 0;

    const getBackgroundColor = (subject: string) => {
      switch (subject) {
        case "maths":
          return "linear-gradient(121.17deg, #FD9621 0%, #FDB549 100%)";
        case "science":
          return "linear-gradient(123.74deg, #54C993 -2.88%, #54C9B2 103.53%)";
        case "english":
          return "linear-gradient(123.74deg, #47BAD7 -2.88%, #47ACD7 103.53%)";
        default:
          return "linear-gradient(121.17deg, #FD9621 0%, #FDB549 100%)";
      }
    }

  return (
    <div className="flex items-end" style={{ gap: "18px" }}>
      {streakData.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="relative rounded w-[30px] flex justify-center"
            style={{
              height: `${minBarHeight + item.count * scalingFactor}px`,
              background: getBackgroundColor(item.subject),
            }}
          >
            <span className="bar-numbers">{item.count}</span>
          </div>
          <div className="activityStreakTxt">{item.date}</div>
        </div>
      ))}
    </div>
  );
};

export default ActivityStreak;