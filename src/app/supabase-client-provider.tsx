import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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

export const updateQuizStats = async (
  quizId: string,
  submissions: any[],
  userId: string
) => {
  const supabase = createClientComponentClient();
  const { error } = await supabase
    .from("quiz")
    .update({
      submissions,
    })
    .eq("id", quizId)
    .eq("random_user_id", userId)
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
