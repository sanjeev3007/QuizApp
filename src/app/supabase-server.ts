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

export const getQuestions = async () => {
  const supabase = createServerSupabaseClient();
  let { data: level1, error: level1Error } = await supabase
    .from("db_grade7_math")
    .select("*")
    .in("blooms_level", ["Knowing", "Understanding"])
    .limit(4);

  let { data: level2, error: level2Error } = await supabase
    .from("db_grade7_math")
    .select("*")
    .in("blooms_level", ["Analyzing", "Applying"])
    .limit(3);

  let { data: level3, error: level3Error } = await supabase
    .from("db_grade7_math")
    .select("*")
    .in("blooms_level", ["Evaluating", "Creating"])
    .limit(3);

  if (level1Error || level2Error || level3Error) {
    console.log(level1Error || level2Error || level3Error);
  }

  // Shuffles the questions array
  function shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  return shuffle(
    [...(level1 ?? []), ...(level2 ?? []), ...(level3 ?? [])] ?? []
  );
};

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



const quizWiseScore = ({ quizes, quizNumber }) => {
  const reverse = quizes.reverse()
  const score = [];
  reverse.map((quizDetails, index) => {
    quizNumber += 1
    const { submissions } = quizDetails
    const correctAnswers = submissions.filter(({ isCorrect }) => isCorrect)
    score.push({ quizNumber, correctAnswers: correctAnswers.length })
  })
  return score
}

export const getInsight = async (userid: string) => {
  const supabase = createServerSupabaseClient();
  const { data: allQuizes, error } = await supabase
    .from("quiz")
    .select()
    .eq("userid", "TFwkXyjDPQ")
    .eq("complete", "true")
  let numberOfCompletedExercise = 0;
  const subtopics = {}
  const quiredQuestion = {}
  if (!allQuizes?.length) return []
  allQuizes?.map(async ({ submissions }) => {
    console.log(submissions, "submissions")
    if (submissions.length) {
      submissions.map(async ({ questionId, isCorrected }) => {
        const response = await supabase
          .from("db_grade7_math")
          .select()
          .eq("uuid", questionId)
        const subtopic = response.data[0].metadata.subtopic
        const difficultyLevel = response.data[0].difficulty_level
        console.log(subtopic, "subtopicsubtopicsubtopicsubtopic")
        if (subtopics[subtopic]) {
          subtopics[subtopic].totalQuestion += 1
          if (isCorrected) subtopics[subtopic].totalCorrectQuestion += 1
          switch (difficultyLevel) {
            case "easy":
              // code block
              subtopics[subtopic].easy += 1
              break;
            case "medium":
              // code block
              subtopics[subtopic].medium += 1

              break;
            default:
              // code block
              subtopics[subtopic].hard += 1

          }
        }
        else {
          subtopics[subtopic] = {
            totalQuestion: 1,
            totalCorrectQuestion: isCorrected ? 1 : 0,
            easy: difficultyLevel == "easy" ? 1 : 0,
            medium: difficultyLevel == "medium" ? 1 : 0,
            hard: difficultyLevel == "hard" ? 1 : 0
          }
          console.log(subtopics, "subtopicssubtopicssubtopics")
        }
      })
    }
  })
  console.log("subtopicssubtopicssubtopicssubtopicssubtopics")
  console.log(subtopics, "subtopics")
  Object.keys(subtopics).map((subTopic) => {
    const { easy, medium, hard } = subtopics[subTopic]
    if (!(easy && medium && hard)) delete subtopics[subTopic]
    else {
      subtopics[subTopic].totalScore = (easy * 1) + (medium * 2) + (hard * 4)
    }
  })
  console.log(subtopics, "subtopics----after---filter")
  // subtopics.map(({ easy, medium, hard }) => {

  // })
  const scoreGreaterThanOrEqualTo4 = [];
  const scoreLessThanOrEqualTo3 = [];

  // Function to compare ages in descending order

  // Categorize students into arrays
  for (const topic in subtopics) {
    if (subtopics.hasOwnProperty(topic)) {
      const score = subtopics[topic].totalScore;

      if (score >= 4) {
        scoreGreaterThanOrEqualTo4.push(topic);
      } else {
        scoreLessThanOrEqualTo3.push(topic);
      }
    }
  }
  const compareScoreDescending = (a, b) => subtopics[b].totalScore - subtopics[a].totalScore;

  // Sort arrays by age in descending order
  scoreGreaterThanOrEqualTo4.sort(compareScoreDescending);
  scoreLessThanOrEqualTo3.sort(compareScoreDescending);
  if (error) {
    console.error(error);
  }
  return {
    scoreGreaterThanOrEqualTo4,
    scoreLessThanOrEqualTo3
  };
}

const getLast10Quizes = async ({ limit, userid }) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('quiz')
    .select('*')
    .eq("complete", "true")
    .eq("userid", userid)
    .order('created_at', { ascending: false })
    .limit(limit);

  return data
}

export const getDashboard = async (userid: string) => {
  const supabase = createServerSupabaseClient();
  const { data: allQuizes, error } = await supabase
    .from("quiz")
    .select("questions", "submissions")
    .eq("userid", userid)
    .eq("complete", "true")

  const quizCurrentStatus = await getNumberOfCompletedQuiz(userid)
  const last10Quizes = await getLast10Quizes({ limit: 10, userid })
  console.log(quizCurrentStatus, "quizCurrentStatus")
  // console.log(last10Quizes,"last10Quizes")

  const quizNumber = quizCurrentStatus.numberOfCompletedQuiz <= 10 ? 0 : quizCurrentStatus.numberOfCompletedQuiz - 10
  const quizWise = quizWiseScore({ quizes: last10Quizes, quizNumber })
  console.log(quizNumber, "quizNumber")
  console.log(quizWise, "quizWise")
  if (error) {
    console.error(error);
  }
  console.log(quizCurrentStatus,)
  // return numberOfCompletedExercise;
};

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
