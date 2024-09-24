"use client";
import { useSearchParams } from "next/navigation";
import "../subject-dashboard/components/subject-dashboard.css";
import Activity from "@/components/activity/activity";
import GlobalLeaderboard from "@/components/leaderboard";
import { getCookie } from "cookies-next";
import {
  getStudentDashboard,
  getStudentTopics,
} from "@/lib/student-dashboard/apiClient";
import { Suspense, useEffect, useState } from "react";
import constants from "@/constants/constants";
import saveGTMEvents from "@/lib/gtm";
import ClipLoader from "react-spinners/ClipLoader";
import LanguageCard from "./components/language-card";
import HeadingCard from "./components/heading-card";
import TopicCard from "./components/topic-card";
import TopicSlider from "./components/topic-slider";

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

  const params = useSearchParams();
  const lang = params.get("lang");

  const userId = getCookie("userId");
  const userGrade = getCookie("grade");

  let subjectId: any = null;
  let quizPath: string = "#";

  useEffect(() => {
    saveGTMEvents({
      eventAction: "subject_opened",
      label: userId ? "student" : "guest",
      label1: userId || null,
      label2: quizPath,
      label3: null,
      label4: null,
    });
    if (!userId) {
      window.open(process.env.NEXT_PUBLIC_SANDBOX_URL, "_self");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setDashboardLoader(true);
        try {
          const data = await getStudentDashboard({
            studentId: userId,
            subjectId,
          });
          setLeaderboardData(data.response.leaderboard);
          setStudentActivity(data.response.activity);
          setStreakData(data.response.streak);

          const currentStudent =
            data.response.leaderboard.topTenStudentList.find(
              (row: any) => row.userid == userId
            );
          setStudentData({
            ...data.response.currentStudentMeta,
            rank: currentStudent?.rank,
          });
          setAvatar(data.response.currentStudentMeta?.pic || "");

          if (data.response.currentStudentMeta?.pic) {
            localStorage.setItem(
              "user-avatar",
              data.response.currentStudentMeta?.pic
            );
          }
        } catch (err) {
          console.error("Error fetching data:", err);
        }
        setDashboardLoader(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setTopicLoader(true);
        try {
          //   const data2 = await getStudentTopics({
          //     studentId: userId,
          //     course: subject == "mathematics" ? "math" : subject,
          //     grade: userGrade || null,
          //   });
          //   setTopicData(data2.response);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
        setTopicLoader(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full md:max-w-7xl mx-auto bg-[#FFF] pb-10 overflow-hidden !important">
      <div className="font-sans w-full flex justify-center">
        <div className="w-full flex justify-center flex-col">
          <HeadingCard lang={lang as string} />
          {/* card to show */}
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
            <TopicSlider />
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
