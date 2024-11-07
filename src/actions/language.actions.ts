"use server";

import { createClient } from "@/lib/supabase/server";

export const getLanguageLevels = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("languages_levels").select("*");

  if (error) {
    console.log(error);
  }

  return data;
};

export const getLanguageTopics = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("languages_topics").select("*");

  if (error) {
    console.log(error);
  }

  return data;
};

export const getLanguageIdByName = async (name: string) => {
  const supabase = createClient();

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
}: {
  topic: number;
  language: string;
}) => {
  const supabase = createClient();
  const languageId = await getLanguageIdByName(language);

  const { data, error } = await supabase
    .from("languages_db")
    .select("*")
    .eq("topic_id", topic)
    .eq("language_id", languageId?.id);

  if (error) {
    console.log(error);
  }

  return data;
};
