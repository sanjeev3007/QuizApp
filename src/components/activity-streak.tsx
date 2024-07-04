import React from "react";
import "@/components/home-page.css";

type StreakData = {
  date: string;
  count: number;
};

type ActivityStreakProps = {
  streakData: StreakData[];
};

const ActivityStreak: React.FC<ActivityStreakProps> = ({ streakData }) => {
  const maxBarHeight = 136;
  const minBarHeight = 20;
  const maxValue = Math.max(...streakData.map(item => item.count));
  const scalingFactor = maxValue > 0 ? (maxBarHeight - minBarHeight) / maxValue : 0;

  return (
    <div className="flex items-end md:custom-bar-graph" style={{ gap: '10px' }}>
      {streakData.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="relative rounded w-[30px] flex justify-center"
            style={{
              height: `${minBarHeight + item.count * scalingFactor}px`,
              backgroundColor: "#FFA85D",
            }}
          >
            <span 
              style={{ 
                color: "#FFF", 
                fontSize: "14px", 
                fontWeight: "bold",
                position: "absolute",
                top: "4px"
              }}
            >
              {item.count}
            </span>
          </div>
          <div
          className="activityStreakTxt"
          >
            {item.date}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityStreak;