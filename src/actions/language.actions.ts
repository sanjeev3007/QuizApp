"use server";

import {
  LanguageDB,
  LanguageQuiz,
  LanguageTopic,
} from "@/app/(dashboard)/(routes)/languages/learn/_types";
import { createServerSupabaseClient } from "@/app/supabase-server";

export const getLanguageLevels = async () => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.from("languages_levels").select("*");

  if (error) {
    console.log(error);
  }

  return data;
};

export const getLanguageTopics = async ({
  langId,
  userId,
}: {
  langId: number;
  userId: string;
}) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("languages_topics")
    .select("*, languages_db(*), languages_quiz(*)")
    .eq("languages_db.language_id", langId)
    .eq("languages_quiz.user_id", userId)
    .eq("languages_quiz.language_id", langId)
    .filter("languages_db", "not.is", null);

  console.log(data);

  if (error) {
    console.log(error);
  }

  return data;
};

export const getLanguageIdByName = async (name: string) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("subject")
    .select("id")
    .eq("subject_name", name.toLowerCase())
    .single();

  if (error) {
    console.log(error);
  }

  return data;
};

export const getTopicContent = async ({
  language,
  topic,
  from,
  to,
}: {
  topic: number;
  language: string;
  from: number;
  to: number;
}) => {
  const supabase = createServerSupabaseClient();
  const languageId = await getLanguageIdByName(language);

  const { data, error } = await supabase
    .from("languages_db")
    .select("*")
    .eq("topic_id", topic)
    .eq("language_id", languageId?.id)
    .order("id", { ascending: true })
    .range(from || 0, to || 20);

  if (error) {
    console.log(error);
  }

  return data;
};

type QuizSubmission = {
  questionId: number;
  answer: string;
  isCorrect: boolean;
};

export const saveQuizData = async ({
  userId,
  total,
  correct,
  submission,
  language,
  topicId,
  levelId,
  state,
}: {
  userId: string;
  total: number;
  correct: number;
  submission: QuizSubmission[];
  language: string;
  topicId: number;
  levelId: number;
  state: number;
}) => {
  const supabase = createServerSupabaseClient();
  const languageData = await fetchLanguageIdfromSlug(language);

  // Calculate points based on level
  const pointsPerQuestion = levelId;
  const points = correct * pointsPerQuestion;

  const { data, error } = await supabase
    .from("languages_quiz")
    .insert({
      user_id: userId,
      total,
      correct,
      points,
      submission,
      language_id: languageData?.id,
      topic_id: topicId,
      level_id: levelId,
      card_state: state,
    })
    .select("*")
    .single();

  if (error) {
    console.log(error);
  }
  return data;
};

export const updateQuizData = async ({
  userId,
  total,
  correct,
  submission,
  language,
  topicId,
  levelId,
  quizId,
  state,
}: {
  userId: string;
  total: number;
  correct: number;
  submission: QuizSubmission[];
  language: string;
  topicId: number;
  levelId: number;
  quizId: number;
  state: number;
}) => {
  const supabase = createServerSupabaseClient();

  console.log({
    quizId,
    userId,
    total,
    correct,
    submission,
    topicId,
    levelId,
    state,
  });

  // Calculate points based on level
  const pointsPerQuestion = levelId;
  const points = correct * pointsPerQuestion;

  const { data, error } = await supabase
    .from("languages_quiz")
    .update({
      user_id: userId,
      total,
      correct,
      points,
      submission,
      topic_id: topicId,
      level_id: levelId,
      card_state: state,
    })
    .eq("id", quizId)
    .select("*")
    .single();

  if (error) {
    console.log(error);
  }
  return data;
};

export const fetchLanguageIdfromSlug = async (slug: string) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("subject")
    .select("id,subject_name")
    .eq("subject_name", slug.toLowerCase())
    .single();
  return data;
};

export const fetchQuizResult = async (quizId: number) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("languages_quiz")
    .select("*, languages_topics(*, languages_quiz(*), languages_db(*))")
    .eq("id", quizId)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  const topicDB = data?.languages_topics?.languages_db?.filter(
    (topic: LanguageDB) => topic.language_id === data?.language_id
  );
  const quizDB = data?.languages_topics?.languages_quiz?.filter(
    (quiz: LanguageQuiz) => quiz.language_id === data?.language_id
  );

  const totalQuestions = topicDB?.length || 0;
  const completedQuestions =
    quizDB?.reduce(
      (acc: number, curr: LanguageQuiz) => acc + curr.submission.length,
      0
    ) || 0;

  // Calculate level total questions and completed questions
  const levelDB = await supabase
    .from("languages_db")
    .select("*")
    .eq("level_id", data?.level_id)
    .eq("language_id", data?.language_id);

  const levelTotalQuestions = levelDB.data?.length || 0;
  const levelCompletedQuestions = await supabase
    .from("languages_quiz")
    .select("submission")
    .eq("level_id", data?.level_id)
    .eq("language_id", data?.language_id)
    .eq("user_id", data?.user_id);

  const levelCompleted =
    levelCompletedQuestions.data?.reduce(
      (acc: number, curr: { submission: any[] }) =>
        acc + curr.submission.length,
      0
    ) || 0;

  return {
    ...data,
    totalQuestions,
    completedQuestions,
    levelTotalQuestions,
    levelCompletedQuestions: levelCompleted,
  };
};

type LearningSubmission = {
  questionId: number;
  answer: string;
  isCorrect: boolean;
};

export const saveLearningData = async ({
  userId,
  total,
  correct,
  submission,
  language,
  topicId,
  levelId,
}: {
  userId: string;
  total: number;
  correct: number;
  submission: LearningSubmission[];
  language: string;
  topicId: number;
  levelId: number;
}) => {
  const supabase = createServerSupabaseClient();

  const languageData = await fetchLanguageIdfromSlug(language);
  const { data, error } = await supabase
    .from("languages_learning")
    .insert({
      user_id: userId,
      total,
      correct,
      submission,
      language_id: languageData?.id,
      topic_id: topicId,
      level_id: levelId,
    })
    .select("*")
    .single();

  if (error) {
    console.log(error);
  }
  return data;
};

export const getUserCardState = async ({
  userId,
  topicId,
  levelId,
  state,
  lang,
}: {
  userId: string;
  topicId: number;
  levelId: number;
  state: number;
  lang: string;
}) => {
  const supabase = createServerSupabaseClient();

  const languageData = await fetchLanguageIdfromSlug(lang);
  const { data, error } = await supabase
    .from("languages_quiz")
    .select("*")
    .eq("user_id", userId)
    .eq("topic_id", topicId)
    .eq("level_id", levelId)
    .eq("card_state", state)
    .eq("language_id", languageData?.id)
    .single();

  return data;
};

export const fetchUpcomingTopics = async (
  languageId: number,
  currentTopicId: number
) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("languages_topics")
    .select("*, languages_db(*)")
    .eq("languages_db.language_id", languageId)
    .gt("id", currentTopicId)
    .limit(3);

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};
