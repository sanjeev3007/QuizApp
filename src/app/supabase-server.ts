import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// export async function getUserDetails() {
//   const supabase = createServerSupabaseClient();
//   try {
//     const { data: userDetails } = await supabase
//       .from("users")
//       .select("*")
//       .single();
//     return userDetails;
//   } catch (error) {
//     console.error("Error:", error);
//     return null;
//   }
// }

export const getInitialAssessmentStats = async () => {
  const supabase = createServerSupabaseClient();
  try {
    const session = await getSession();
    const user = session?.user;
    let { data, error } = await supabase
      .from("initial_assessments")
      .select("*")
      .eq("user_id", user?.id)
      .limit(1);

    if ((data?.length ?? 0) > 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const getQuizById = async (id: any) => {
  const supabase = createServerSupabaseClient();
  try {
    const session = await getSession();
    const user = session?.user;
    let { data, error } = await supabase
      .from("quiz")
      .select("*")
      .eq("id", id)
      .limit(1);

    if ((data?.length ?? 0) > 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const getQuizStats = async (quizId: string) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("quiz")
    .select("*")
    .eq("id", quizId)
    .single();
  if (error) {
    console.error(error);
  }
  return data;
};

export const getNumberOfCompletedQuiz = async (userid: string) => {
  const supabase = createServerSupabaseClient();
  const { data: allQuizes, error } = await supabase
    .from("quiz")
    .select("questions, submissions")
    .eq("userid", userid)
    .eq("complete", "True");

  if (error) {
    console.error(error);
  }
  let numberOfCompletedQuiz = allQuizes?.length || 0;

  const totalQuiz =
    numberOfCompletedQuiz <= 10
      ? 10
      : numberOfCompletedQuiz - (numberOfCompletedQuiz % 10) + 10;
  const level = totalQuiz / 10;
  return {
    numberOfCompletedQuiz,
    level,
    totalQuiz,
  };
};

// const compareScoreDescending = (a: any, b: any) =>
//   subtopics[b].totalScore - subtopics[a].totalScore;

// export const getInsight = async (userid: string) => {
//   const supabase = createServerSupabaseClient();
//   const { data: allQuizes, error } = await supabase
//     .from("quiz")
//     .select("questions, submissions")
//     .eq("userid", userid);
//   let numberOfCompletedExercise = 0;
//   const subtopics = {};
//   const quiredQuestion = {};
//   allQuizes?.map(async ({ submissions }) => {
//     if (submissions) {
//       submissions.map(async ({ questionId, isCorrected }) => {
//         const response = await supabase
//           .from("db_grade7_math")
//           .select("difficulty_level", "metadata")
//           .eq("uuid", questionId);
//       });
//       if (subtopics[response.metadata.subtopic]) {
//         subtopics[response.metadata.subtopic].totalQuestion += 1;
//         if (isCorrected)
//           subtopics[response.metadata.subtopic].totalCorrectQuestion += 1;
//         switch (response.difficulty_level) {
//           case "easy":
//             // code block
//             subtopics[response.metadata.subtopic].easy += 1;
//             break;
//           case "medium":
//             // code block
//             subtopics[response.metadata.subtopic].medium += 1;

//             break;
//           default:
//             // code block
//             subtopics[response.metadata.subtopic].hard += 1;
//         }
//       } else {
//         subtopics[response.metadata.subtopic] = {
//           totalQuestion: 1,
//           totalCorrectQuestion: isCorrected ? 1 : 0,
//           easy: response.difficulty_level == "easy" ? 1 : 0,
//           medium: response.difficulty_level == "medium" ? 1 : 0,
//           hard: response.difficulty_level == "hard" ? 1 : 0,
//         };
//       }
//     }
//   });
//   Object.keys(subtopics).map((subTopic) => {
//     const { easy, medium, hard } = subtopics[subTopic];
//     if (!(easy && medium && hard)) delete subtopics[subTopic];
//   });
//   subtopics.map(({ easy, medium, hard }) => {
//     subtopics.totalScore = easy * 1 + medium * 2 + hard * 4;
//   });
//   const scoreGreaterThanOrEqualTo4 = [];
//   const scoreLessThanOrEqualTo3 = [];

//   // Function to compare ages in descending order

//   // Categorize students into arrays
//   for (const topic in subtopics) {
//     if (subtopics.hasOwnProperty(topic)) {
//       const score = subtopics[topic].totalScore;

//       if (score >= 4) {
//         scoreGreaterThanOrEqualTo4.push(topic);
//       } else {
//         scoreLessThanOrEqualTo3.push(topic);
//       }
//     }
//   }

//   // Sort arrays by age in descending order
//   scoreGreaterThanOrEqualTo4.sort(compareScoreDescending);
//   scoreLessThanOrEqualTo3.sort(compareScoreDescending);
//   if (error) {
//     console.error(error);
//   }
//   return numberOfCompletedExercise;
// };

export async function getInCompletedQuiz(userId: string) {
  const supabase = createServerSupabaseClient();
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // Calculate the timestamp for 2 hours ago
  const { data, error } = await supabase
    .from("quiz")
    .select("*")
    .eq("userid", userId)
    .eq("start", true)
    .eq("complete", false)
    .gte("created_at", twoHoursAgo.toISOString()); // Filter quizzes created within the last 2 hours

  if (error) {
    console.error("incomplete quiz error", error);
  }
  return data;
}
