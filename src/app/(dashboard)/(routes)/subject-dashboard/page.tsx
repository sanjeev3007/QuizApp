"use client";
import { useSearchParams } from "next/navigation";
import "./components/subject-dashboard.css";
import Activity from "@/components/activity/activity";
import GlobalLeaderboard from "@/components/leaderboard";
import NoahHeader from "./components/noah-says";
import { getCookie } from "cookies-next";
import {
  getStudentDashboard,
  getStudentTopics,
} from "@/lib/student-dashboard/apiClient";
import { Suspense, useEffect, useState } from "react";
import constants from "@/constants/constants";
import TopicCardCarousel from "./components/topic-card/topic-card-carousel";

const PageContent = () => {
  const [leaderboardData, setLeaderboardData] = useState({
    studentMeta: {},
    topTenStudentList: [],
  });
  const [studentActivity, setStudentActivity] = useState([]);
  const [streakData, setStreakData] = useState({});
  const [studentData, setStudentData] = useState(null);
  const [topicData, setTopicData] = useState([]);
  const [avatar, setAvatar] = useState<string>("");

  const params = useSearchParams();
  const subject = params.get("subject");

  let sub = "";
  let subjectId: any = null;

  if (subject == "mathematics") {
    sub = "Math";
    subjectId = constants.SUBJECT_IDS.MATH;
  } else if (subject == "science") {
    sub = "Science";
    subjectId = constants.SUBJECT_IDS.ENGLISH;
  } else if (subject == "english") {
    sub = "English";
    subjectId = constants.SUBJECT_IDS.SCIENCE;
  }

  useEffect(() => {
    const userId = getCookie("userId");
    const grade = getCookie("grade");
    const fetchData = async () => {
      try {
        if (userId) {
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

          const data2 = await getStudentTopics({
            studentId: userId,
            course: subject == "mathematics" ? "math" : subject,
            grade: grade || null,
          });
          setTopicData(data2.response);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full md:max-w-7xl mx-auto bg-[#FFF] pb-10 overflow-hidden !important">
      <div className="font-sans w-full flex justify-center">
        <div className="w-full flex justify-center flex-col">
          <div className="lg:text-4xl md:text-2xl xs:text-xl font-semibold leading-[38.73px] text-center lg:mt-10 md:mt-8 xs:mt-6">
            <span className="gradient-title-1">Supercharge</span>
            <span className="text-[#5B8989]">{` your ${sub} learning`}</span>
          </div>
          <NoahHeader />
          <div className="flex lg:flex-row xs:flex-col justify-center gap-8 lg:mt-14 md:mt-6 xs:mt-12 mb-10">
            <Activity
              subject={subject}
              studentActivity={studentActivity}
              streakData={streakData}
              studentData={studentData}
              avatar={avatar}
              setAvatar={setAvatar}
            />
            <GlobalLeaderboard
              leaderboardData={leaderboardData}
              studentData={studentData}
              avatar={avatar}
            />
          </div>
          <div className="lg:text-4xl md:text-2xl xs:text-xl font-semibold leading-[38.73px] text-center lg:mt-10 md:mt-8 xs:mt-6">
            <span className="gradient-title-2">Master</span>
            <span className="text-[#5B8989]"> every topic</span>
          </div>
          <div className="lg:text-4xl md:text-2xl xs:text-xl font-semibold leading-[38.73px] text-center lg:mt-4 md:mt-3 xs:mt-2">
            <span className="text-[#5B8989]">Improve ratings with more </span>
            <span className="gradient-title-3">practice</span>
          </div>
          <div className="lg:mt-20 md:mt-12">
            <TopicCardCarousel items={topicData} />
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
