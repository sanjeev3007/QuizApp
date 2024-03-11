import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";

export const getQuizStats = async (quizId: string) => {
  const supabase = createClientComponentClient();
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
  const { data, error } = await supabase
    .from("quiz_feedback")
    .insert({
      questionId: questionId,
      userId: userId,
      response: response,
      reason: reason,
    })
    .select();

  if (error) console.log(error);
  else console.log(data);
  return;
};

export async function getInCompletedQuiz(userId: string) {
  const supabase = createClientComponentClient();
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
  const { data, error } = await supabase
    .from("quiz")
    .select("*")
    .eq("random_user_id", userId)
    .eq("start", true)
    .eq("complete", false)
    .gte("created_at", twoHoursAgo.toISOString()); // Filter quizzes created within the last 2 hours

  if (error) {
    console.error("incomplete quiz error", error);
  }
  return data;
}

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

// generating questions
export const getQuestions = async (grade: number | 7) => {
  const supabase = createClientComponentClient();
  let db_with_grade = `fetch_rows_db_grade${grade}_math`;

  let { data: random_topics, error: topic_error } = await supabase
    .from(`db_grade${grade}_math`)
    .select("topic");

  if (topic_error) {
    console.log(topic_error);
  }
  if (random_topics === null) {
    random_topics = [{ topic: "Fractions and Decimals" }];
  }
  const randomTopic =
    random_topics[Math.floor(Math.random() * random_topics.length)];

  const { data: level1, error: level1Error } = await supabase.rpc(
    db_with_grade,
    {
      level: "easy",
      topic_name: randomTopic.topic,
      rows_limit: 4,
    }
  );

  const { data: level2, error: level2Error } = await supabase.rpc(
    db_with_grade,
    {
      level: "medium",
      topic_name: randomTopic.topic,
      rows_limit: 4,
    }
  );

  const { data: level3, error: level3Error } = await supabase.rpc(
    db_with_grade,
    {
      level: "hard",
      topic_name: randomTopic.topic,
      rows_limit: 2,
    }
  );

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

// get gk quiz
export const getGkQuestions = async () => {
  const supabase = createClientComponentClient();
  try {
    const { data } = await axios.post("/api/questions");
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
