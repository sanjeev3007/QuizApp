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
      complete: true,
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
  const { data, error } = await supabase
    .from("quiz")
    .select("submissions")
    .eq("id", quizId)
    .eq("userid", userId)
    .single();

  if (error) {
    console.error("store user submission error", error);
    return { success: false };
  }

  const previousSubmissions = data?.submissions || [];
  const updatedSubmissions = [...previousSubmissions, submission];

  const { error: updateError } = await supabase
    .from("quiz")
    .update({
      submissions: updatedSubmissions,
    })
    .eq("id", quizId)
    .eq("userid", userId)
    .select();

  if (updateError) {
    console.error("store user submission error", updateError);
    return { success: false };
  }

  return { success: true, data };
}
