"use client";
import "../../subject-dashboard/components/subject-dashboard.css";
import Activity from "@/components/activity/activity";
import GlobalLeaderboard from "@/components/leaderboard";
import { useState } from "react";
import LanguageCard from "../components/language-card";
import HeadingCard from "../components/heading-card";
import TopicSlider from "../components/topic-slider";

type Props = {
  levels: {
    level: number;
    id: number;
    name: string;
    points: number;
  }[];
  lang: string;
  langId: number;
};

const LanguageDashboard = ({ levels, lang, langId }: Props) => {
  const [leaderboardData] = useState({
    studentMeta: {},
    topTenStudentList: [],
  });
  const [studentActivity] = useState([]);
  const [streakData] = useState({});
  const [studentData] = useState(null);
  const [avatar, setAvatar] = useState<string>("");
  const [dashboardLoader] = useState<boolean>(false);

  return (
    <div className="w-full md:max-w-7xl mx-auto bg-[#FFF] pb-10 overflow-hidden !important">
      <div className="font-sans w-full flex justify-center">
        <div className="w-full flex justify-center flex-col">
          <HeadingCard lang={lang as string} />
          <LanguageCard lang={lang as string} />
          <div className="flex lg:flex-row xs:flex-col justify-center gap-8 lg:mt-14 md:mt-6 xs:mt-12 mb-10 px-4">
            <Activity
              subject={lang}
              studentActivity={studentActivity}
              streakData={streakData}
              studentData={studentData}
              avatar={avatar}
              setAvatar={setAvatar}
              loading={dashboardLoader}
            />
            <GlobalLeaderboard
              leaderboardData={leaderboardData}
              studentData={studentData}
              avatar={avatar}
              loading={dashboardLoader}
            />
          </div>

          <div id={"topics"} className="lg:mt-20 md:mt-12">
            {levels && <TopicSlider levels={levels} langId={langId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageDashboard;
