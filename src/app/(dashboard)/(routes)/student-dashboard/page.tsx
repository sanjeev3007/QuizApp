"use client";
import Activity from "@/components/activity/activity";
import SubjectCard from "./components/subject-card";
import "./components/student-dashboard.css";
import GlobalLeaderboard from "@/components/leaderboard";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import {
  getStudentDashboard,
  getSubjectWise,
} from "@/lib/student-dashboard/apiClient";
import constants from "../../../../constants/constants";

const PageContent = () => {
  const [subjectData, setSubjectData] = useState({
    math: {
      subjectId: constants.SUBJECT_IDS.MATH,
      subjectName: "Mathematics",
      rank: null,
      answeredCount: null,
    },
    science: {
      subjectId: constants.SUBJECT_IDS.SCIENCE,
      subjectName: "Science",
      rank: null,
      answeredCount: null,
    },
    english: {
      subjectId: constants.SUBJECT_IDS.ENGLISH,
      subjectName: "English",
      rank: null,
      answeredCount: null,
    },
    coding: {
      subjectId: constants.SUBJECT_IDS.CODING,
      subjectName: "Coding",
      rank: null,
      answeredCount: null,
    },
  });
  const [leaderboardData, setLeaderboardData] = useState({
    studentMeta: {},
    topTenStudentList: [],
  });
  const [studentActivity, setStudentActivity] = useState([]);
  const [streakData, setStreakData] = useState({});
  const [studentData, setStudentData] = useState(null);
  const [avatar, setAvatar] = useState<string>("");
  const [subjectWiseLoader, setSubjectWiseLoader] = useState<boolean>(false);
  const [dashboardLoader, setDashboardLoader] = useState<boolean>(false);

  useEffect(() => {
    const userId = getCookie("userId");
    if (!userId) {
      window.open(process.env.NEXT_PUBLIC_SANDBOX_URL, "_self");
    }
  }, []);

  useEffect(() => {
    const userId = getCookie("userId");
    const fetchData = async () => {
      if (userId) {
        setSubjectWiseLoader(true);
        try {
          const data = await getSubjectWise({ userId, subjectId: null });
          let updatedSubjectData: any = subjectData;
          data.response.forEach((subject: any) => {
            updatedSubjectData[subject.subjectName].rank = subject.rank;
            updatedSubjectData[subject.subjectName].answeredCount = parseInt(
              subject.count,
              10
            );
          });
          setSubjectData(updatedSubjectData);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
        setSubjectWiseLoader(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userId = getCookie("userId");
    const fetchData = async () => {
      if (userId) {
        setDashboardLoader(true);
        try {
          const data2 = await getStudentDashboard({
            studentId: userId,
            subjectId: null,
          });
          setLeaderboardData(data2.response.leaderboard);
          setStudentActivity(data2.response.activity);
          setStreakData(data2.response.streak);

          const currentStudent =
            data2.response.leaderboard.topTenStudentList.find(
              (row: any) => row.userid == userId
            );
          setStudentData({
            ...data2.response.currentStudentMeta,
            rank: currentStudent?.rank,
          });
          setAvatar(data2.response.currentStudentMeta?.pic || "");
          localStorage.setItem("studentProfilePic", data2.response.currentStudentMeta?.pic);

          if (data2.response.currentStudentMeta?.pic) {
            localStorage.setItem(
              "user-avatar",
              data2.response.currentStudentMeta?.pic
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

  return (
    <div className={`font-sans`}>
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center flex-col">
          <div className="lg:text-4xl md:text-2xl xs:text-xl font-semibold leading-[38.73px] text-center lg:mt-10 md:mt-8 xs:mt-6">
            <span className="text-[#5B8989]">Various subjects curated by</span>
            <span className="gradient-text"> Noah.</span>
          </div>
          <div className="lg:text-4xl md:text-2xl xs:text-xl font-semibold leading-[38.73px] text-center lg:mt-4 md:mt-2 xs:mt-1">
            <span className="text-[#5B8989]">Just for</span>
            <span className="gradient-text-2"> You.</span>
          </div>
          <div className="text-[#5B8989] lg:text-xl xs:text-base font-semibold leading-[24.2px] text-center lg:mt-12 md:mt-10 xs:mt-10">
            Choose a subject to get started
          </div>
          <div className="md:mt-4 xs:mt-0">
            <div className="flex justify-center md:flex-row xs:flex-col">
              <SubjectCard
                subjectName={subjectData["math"].subjectName}
                rank={subjectData["math"].rank}
                answeredCount={subjectData["math"].answeredCount}
                status={true}
                cardClassName={"math"}
                loading={subjectWiseLoader}
              />
              <SubjectCard
                subjectName={subjectData["science"].subjectName}
                rank={subjectData["science"].rank}
                answeredCount={subjectData["science"].answeredCount}
                status={true}
                cardClassName={"science"}
                loading={subjectWiseLoader}
              />
            </div>
            <div className="flex justify-center md:flex-row xs:flex-col">
              <SubjectCard
                subjectName={subjectData["english"].subjectName}
                rank={subjectData["english"].rank}
                answeredCount={subjectData["english"].answeredCount}
                status={true}
                cardClassName={"english"}
                loading={subjectWiseLoader}
              />
              <SubjectCard
                subjectName={subjectData["coding"].subjectName}
                rank={subjectData["coding"].rank}
                answeredCount={subjectData["coding"].answeredCount}
                status={false}
                cardClassName={"coding"}
                loading={subjectWiseLoader}
              />
            </div>
          </div>
          <div className="lg:text-4xl md:text-2xl xs:text-[19px] font-semibold leading-[38.73px] text-center lg:mt-20 md:mt-18 xs:mt-16">
            <span className="text-[#5B8989]">Practice</span>
            <span className="gradient-text-2"> Daily</span>
            <span className="text-[#5B8989]"> and track your activity.</span>
          </div>
          <div className="lg:text-4xl md:text-2xl xs:text-[19px] font-semibold leading-[38.73px] text-center lg:mt-4 md:mt-2 xs:mt-0">
            <span className="text-[#5B8989]">Consistency can be</span>
            <span className="gradient-text-2"> magical.</span>
          </div>
          <div className="flex lg:flex-row xs:flex-col justify-center gap-8 lg:mt-14 md:mt-12 xs:mt-6 mb-10">
            <Activity
              subject={null}
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
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="w-full md:max-w-7xl mx-auto bg-[#FFF] overflow-hidden !important">
      <PageContent />
    </div>
  );
};

export default Page;
