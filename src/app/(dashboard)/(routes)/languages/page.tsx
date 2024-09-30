"use client";
import { useSearchParams } from "next/navigation";
import "../subject-dashboard/components/subject-dashboard.css";
import Activity from "@/components/activity/activity";
import GlobalLeaderboard from "@/components/leaderboard";
import { getCookie } from "cookies-next";
import { getStudentDashboard } from "@/lib/student-dashboard/apiClient";
import { Suspense, useEffect, useState } from "react";
import saveGTMEvents from "@/lib/gtm";
import LanguageCard from "./components/language-card";
import HeadingCard from "./components/heading-card";
import TopicSlider from "./components/topic-slider";
import { useQuery } from "@tanstack/react-query";
import { getLanguageLevels } from "@/actions/language.actions";

type TopicCardLayout = {
  badge: string | null;
  topicName: string;
  totalScore: number;
  totalQuestion: number;
  subjectId: number;
  subjectName: string | null;
  topicId: number;
  userId: string;
  userGrade: string;
};

type TopicCardLayoutArr = TopicCardLayout[];

const PageContent = () => {
  const [leaderboardData, setLeaderboardData] = useState({
    studentMeta: {},
    topTenStudentList: [],
  });
  const [studentActivity, setStudentActivity] = useState([]);
  const [streakData, setStreakData] = useState({});
  const [studentData, setStudentData] = useState(null);
  const [topicData, setTopicData] = useState<TopicCardLayoutArr>([]);
  const [avatar, setAvatar] = useState<string>("");
  const [topicLoader, setTopicLoader] = useState<boolean>(false);
  const [dashboardLoader, setDashboardLoader] = useState<boolean>(false);

  const { data, isFetching, error } = useQuery({
    queryKey: ["language_levels"],
    queryFn: async () => {
      return await getLanguageLevels();
    },
  });

  const params = useSearchParams();
  const lang = params.get("lang");

  return (
    <div className="w-full md:max-w-7xl mx-auto bg-[#FFF] pb-10 overflow-hidden !important">
      <div className="font-sans w-full flex justify-center">
        <div className="w-full flex justify-center flex-col">
          <HeadingCard lang={lang as string} />
          <LanguageCard />
          <div className="flex lg:flex-row xs:flex-col justify-center gap-8 lg:mt-14 md:mt-6 xs:mt-12 mb-10">
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

          {(topicLoader || (topicData && topicData.length > 0)) && (
            <div className="lg:text-4xl md:text-2xl xs:text-xl font-semibold leading-[38.73px] text-center lg:mt-10 md:mt-8 xs:mt-6">
              <span className="gradient-title-2">Master</span>
              <span className="text-[#5B8989]"> every topic</span>
            </div>
          )}
          {(topicLoader || (topicData && topicData.length > 0)) && (
            <div className="lg:text-4xl md:text-2xl xs:text-xl font-semibold leading-[38.73px] text-center lg:mt-4 md:mt-3 xs:mt-2">
              <span className="text-[#5B8989]">Improve ratings with more </span>
              <span className="gradient-title-3">practice</span>
            </div>
          )}
          <div className="lg:mt-20 md:mt-12 md:inline xs:hidden">
            {data && <TopicSlider levels={data!} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const SubjectDashboard = () => {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
};

export default SubjectDashboard;
