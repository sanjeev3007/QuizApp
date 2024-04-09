import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// generating questions
export const getGKQuestions = async (userId: string) => {
  let db = "fetch_rows_db_gk";
  // generate two random topics
  const topics = await generateRandomTopics();

  // fetching stored correct submissions
  const questionIds = await fetchCorrectSubmissions(userId, topics);

  const level1 = await fetchQuestionsByLevel(
    "easy",
    4,
    topics,
    questionIds,
    db
  );
  const level2 = await fetchQuestionsByLevel(
    "medium",
    4,
    topics,
    questionIds,
    db
  );
  const level3 = await fetchQuestionsByLevel(
    "hard",
    2,
    topics,
    questionIds,
    db
  );

  const questions = [...level1, ...level2, ...level3];
  return { questions, topics: topics };
};

// fetching question function
const fetchQuestionsByLevel = async (
  level: "easy" | "medium" | "hard",
  limit: number,
  topics: string[],
  questionIds: string[],
  db_url: string
) => {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase.rpc(db_url, {
    level: level,
    rows_limit: limit,
    topics: topics,
    uuids: questionIds,
  });

  if (error) {
    console.log(error);
  }

  return data;
};

//   generating random topics
const generateRandomTopics = async () => {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase.from("db_gk_quiz").select("topic");

  if (error) {
    console.log(error);
  }

  const allTopics = Array.from(new Set(data?.map((topic) => topic.topic)));

  const randomTopics = [] as string[];
  for (let i = 0; i < 2; i++) {
    const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
    if (randomTopics.includes(randomTopic)) {
      i--;
      continue;
    }
    randomTopics.push(randomTopic);
  }

  return randomTopics;
};

// fetching correct submissions
export const fetchCorrectSubmissions = async (
  userId: string,
  topics: string[]
) => {
  const supabase = createClientComponentClient();

  const { data } = await supabase
    .from("correct_submissions_gk")
    .select("questionid")
    .eq("userid", userId)
    .in("topic", topics);

  if (!data) {
    return [];
  }

  const formattedData = data.map((quiz) => {
    return quiz.questionid;
  });

  return formattedData;
};

// create quiz
export async function createQuiz(
  userId: string,
  questions: any,
  topics: string[]
) {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from("quiz_gk")
    .insert({
      userid: userId,
      questions: questions,
      start: true,
      multiple_topics: topics,
    })
    .select();

  if (error) {
    console.error(error);
  }

  return data;
}

// get quiz stats
export const getGKQuizStats = async (quizId: string) => {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("quiz_gk")
    .select("*")
    .eq("id", quizId)
    .single();

  if (error) {
    console.error(error);
  }
  return data;
};

// update quiz
export const updateGKQuizStats = async (quizId: string, userId: string) => {
  const supabase = createClientComponentClient();
  const { error } = await supabase
    .from("quiz_gk")
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

// store user submission
export async function storeUserSubmissionInGKQuiz(
  quizId: string,
  userId: string,
  submission: any
) {
  const supabase = createClientComponentClient();

  const { data } = await supabase
    .from("quiz_gk")
    .update({
      submissions: submission,
    })
    .eq("id", quizId)
    .eq("userid", userId)
    .select();

  return { success: true, data };
}

// storing correct submission
export async function storeCorrectSubmissionForGK(
  userId: string,
  questionId: string,
  quizId: number,
  multiple_topics: string[]
) {
  const supabase = createClientComponentClient();

  const { error } = await supabase.from("correct_submissions_gk").insert({
    userid: userId,
    questionid: questionId,
    quizid: quizId,
    multiple_topics: multiple_topics,
  });

  if (error) {
    console.error("store Correct Submission error", error);
    return { success: false };
  }

  return { success: true };
}

// add feedback in gk quiz
export const feedbackGKQuiz = async ({
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
    .from("quiz_gk_feedback")
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