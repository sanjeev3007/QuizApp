"use client";
import "../../subject-dashboard/components/subject-dashboard.css";
import Activity from "@/components/activity/activity";
import GlobalLeaderboard from "@/components/leaderboard";
import { useState } from "react";
import LanguageCard from "../components/language-card";
import HeadingCard from "../components/heading-card";
import TopicSlider from "../components/topic-slider";
import { useQuery } from "@tanstack/react-query";
import { getLanguageDashboard } from "@/lib/student-dashboard/apiClient";
import type { LeaderboardResponse } from "@/lib/types/leaderboard";
import { getCookie } from "cookies-next";

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
  const userId = getCookie("userId");

  const { data, isLoading: dashboardLoader } = useQuery<LeaderboardResponse>({
    queryKey: ["languageLeaderboard", userId, langId],
    queryFn: () =>
      getLanguageDashboard({
        studentId: userId || null,
        lang: langId?.toString() || null,
      }),
    enabled: !!userId && !!langId,
  });

  const [studentActivity] = useState([]);
  const [streakData] = useState({});
  const [studentData] = useState(null);
  const [avatar, setAvatar] = useState<string>("");

  const leaderboardData = {
    studentMeta: {},
    topTenStudentList:
      data?.leaderboard.map((item) => ({
        userid: item.user_id,
        count: item.totalPoints,
        rank: item.rank,
      })) || [],
  };

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
