"use server";

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

  const { data, error } = await supabase
    .from("languages_quiz")
    .insert({
      user_id: userId,
      total,
      correct,
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

  const languageData = await fetchLanguageIdfromSlug(language);
  const { data, error } = await supabase
    .from("languages_quiz")
    .upsert({
      id: quizId,
      user_id: userId,
      total,
      correct,
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
    .select("*")
    .eq("id", quizId)
    .single();

  if (error) {
    console.log(error);
  }

  return data;
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
}: {
  userId: string;
  topicId: number;
  levelId: number;
  state: number;
}) => {
  const supabase = createServerSupabaseClient();

  console.log({ userId, topicId, levelId, state });
  const { data, error } = await supabase
    .from("languages_quiz")
    .select("*")
    .eq("user_id", userId)
    .eq("topic_id", topicId)
    .eq("level_id", levelId)
    .eq("card_state", state)
    .single();

  console.log(data);

  return data;
};
