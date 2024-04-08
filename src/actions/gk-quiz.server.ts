import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient({ cookies })
);

const gk_table = "quiz_gk";

export const getNumberOfCompletedGKQuiz = async (userid: string) => {
  const supabase = createServerSupabaseClient();
  const { data: allQuizes, error } = await supabase
    .from(gk_table)
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

export const getGKQuizById = async (id: any) => {
  const supabase = createServerSupabaseClient();
  try {
    let { data, error } = await supabase
      .from(gk_table)
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
