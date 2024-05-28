import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// create quiz
export async function createMathQuiz(userid: string, grade: number) {
  const supabase = createClientComponentClient();

  const metadata = {
    grade: grade,
  };

  const { data, error } = await supabase
    .from("quiz")
    .insert({
      userid: userid,
      metadata: metadata,
    })
    .select();

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

export async function updateMathQuiz(
  userid: string,
  questions: Array<any>,
  topic: string,
  quizId: string,
  grade: number
) {
  const supabase = createClientComponentClient();

  const metadata = {
    grade: grade,
    topic: topic,
  };

  const { data, error } = await supabase
    .from("quiz")
    .update({
      questions: questions,
      start: true,
      topic: topic,
      metadata: metadata,
    })
    .eq("id", quizId)
    .eq("userid", userid)
    .select();

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

// generating questions// generating questions
export const getMathQuestions = async (
  user_grade: number,
  userId: string,
  defineTopic?: string
) => {
  let grade = user_grade;
  if (grade > 8) grade = 8;

  let db_with_grade = `new_db_math_grade${grade}`;

  let topic = defineTopic || (await generateRandomTopic(grade));

  // fetching stored correct submissions
  const questionIds = await fetchCorrectSubmissions(userId, topic);

  const level1 = await fetchQuestionsByLevel(
    "easy",
    4,
    topic,
    questionIds,
    db_with_grade
  );
  const level2 = await fetchQuestionsByLevel(
    "medium",
    4,
    topic,
    questionIds,
    db_with_grade
  );
  const level3 = await fetchQuestionsByLevel(
    "hard",
    2,
    topic,
    questionIds,
    db_with_grade
  );

  const questions = [...level1, ...level2, ...level3];
  return { questions, topic };
};

// fetching question function
const fetchQuestionsByLevel = async (
  level: "easy" | "medium" | "hard",
  limit: number,
  topic: string,
  questionIds: string[],
  db_url: string
) => {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase.rpc(db_url, {
    level: level,
    rows_limit: limit,
    subject_topic: topic,
    uuids: questionIds,
  });

  if (error) {
    console.log(error);
  }

  return data;
};

//   generating random topics
const generateRandomTopic = async (grade: number) => {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from(`db_grade${grade}_math`)
    .select("topic");

  if (error) {
    console.log(error);
  }

  const allTopics = Array.from(new Set(data?.map((topic) => topic.topic)));

  const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];

  return randomTopic;
};

// update quiz stats to complete
export const updateQuizStats = async (quizId: string, userId: string) => {
  const supabase = createClientComponentClient();
  const { error } = await supabase
    .from("quiz")
    .update({
      complete: true,
    })
    .eq("id", quizId)
    .eq("userid", userId)
    .select();
  if (error) {
    console.error(error);
    return { success: false };
  }
  return { success: true };
};

// ---------- submissions actions ------------
// fetching correct submissions
export const fetchCorrectSubmissions = async (
  userId: string,
  topic: string
) => {
  const supabase = createClientComponentClient();

  const { data } = await supabase
    .from("correct_submissions")
    .select("questionid")
    .eq("userid", userId)
    .eq("topic", topic);

  if (!data) {
    return [];
  }

  const formattedData = data.map((quiz) => {
    return quiz.questionid;
  });

  return formattedData;
};

// store user submission
export async function storeUserSubmission(
  quizId: string,
  userId: string,
  submission: any
) {
  const supabase = createClientComponentClient();

  const { data } = await supabase
    .from("quiz")
    .update({
      submissions: submission,
    })
    .eq("id", quizId)
    .eq("userid", userId)
    .select();

  return { success: true, data };
}

// storing correct submission
export async function storeCorrectSubmission(
  userId: string,
  questionId: string,
  quizId: number,
  topic: string,
  grade: number
) {
  const supabase = createClientComponentClient();

  const { error } = await supabase.from("correct_submissions").insert({
    userid: userId,
    questionid: questionId,
    quizid: quizId,
    topic: topic,
    grade: grade,
  });

  if (error) {
    console.error("store Correct Submission error", error);
    return { success: false };
  }

  return { success: true };
}

// feedback quiz
export const feedbackQuiz = async ({
  questionId,
  userId,
  response,
  reason,
}: {
  questionId: string;
  userId: string;
  response: string;
  reason: string | null;
}) => {
  const supabase = createClientComponentClient();
  const { error } = await supabase
    .from("quiz_feedback")
    .insert({
      questionId: questionId,
      userId: userId,
      response: response,
      reason: reason,
    })
    .select();

  if (error) console.log(error);
  return;
};

export const getNumberOfCompletedMathQuiz = async (userid: string) => {
  const supabase = createClientComponentClient();
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

export async function getInCompletedMathQuiz(userId: string) {
  const supabase = createClientComponentClient();
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
