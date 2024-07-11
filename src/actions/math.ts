import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// create quiz
export async function createMathQuiz(
  userid: string,
  grade: number,
  subjectId: number
) {
  const supabase = createClientComponentClient();

  const metadata = {
    grade: grade,
  };

  const { data, error } = await supabase
    .from("quiz")
    .insert({
      userid: userid,
      metadata: metadata,
      subject_id: subjectId,
    })
    .select();

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

export async function updateMathQuiz({
  userid,
  questions,
  topic_id,
  quiz_id,
  grade,
  assignedData,
}: {
  userid: string;
  questions: Array<any>;
  topic_id: number;
  quiz_id: string;
  grade: number;
  assignedData?: any;
}) {
  const supabase = createClientComponentClient();

  let metadata;
  let isAssigned = !!assignedData?.topic;

  if (assignedData) {
    metadata = {
      grade: assignedData?.currentGrade || grade,
      topic: topic_id,
      assignedGrade: assignedData?.topic?.grade,
    };
  } else {
    metadata = {
      grade: grade,
      topic: topic_id,
    };
  }

  const { data, error } = await supabase
    .from("quiz")
    .update({
      questions,
      start: true,
      topic_id,
      metadata,
      assigned: isAssigned,
    })
    .eq("id", quiz_id)
    .eq("userid", userid)
    .select();

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

export const getMathQuestions = async (
  user_grade: number,
  userId: string,
  selectedTopic?: any
) => {
  let grade;
  let topicData;

  if (!!selectedTopic?.topic) {
    grade = selectedTopic.topic?.grade;
    topicData = await getIdFromTopic(selectedTopic.topic?.topic, grade);
    console.log(topicData);
  } else {
    grade = user_grade;
    if (grade > 8) grade = 8;
    topicData = await generateRandomTopic(grade);
  }

  const questionIds = await fetchCorrectSubmissions(userId, topicData?.id);

  const level1 = await fetchQuestionsByLevel(
    "easy",
    4,
    topicData?.topic,
    questionIds,
    grade
  );
  const level2 = await fetchQuestionsByLevel(
    "medium",
    4,
    topicData?.topic,
    questionIds,
    grade
  );
  const level3 = await fetchQuestionsByLevel(
    "hard",
    2,
    topicData?.topic,
    questionIds,
    grade
  );

  const questions = [...level1, ...level2, ...level3];
  return { questions, topicName: topicData?.topic, topicId: topicData?.id };
};

// fetching question function
const fetchQuestionsByLevel = async (
  level: "easy" | "medium" | "hard",
  limit: number,
  topic: string,
  questionIds: string[],
  grade: number
) => {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase.rpc("db_math_rpc", {
    level: level,
    rows_limit: limit,
    subject_topic: topic,
    uuids: questionIds,
    selected_grade: grade,
  });

  if (error) {
    console.log(error);
  }

  return data;
};

const getIdFromTopic = async (topic: string, grade: number) => {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from("topic")
    .select("id, topic_name")
    .eq("topic_name", topic)
    .eq("grade", grade)
    .limit(1)
    .single();

  if (error) {
    console.log(error);
  }

  if (!data) return null;
  return {
    id: data.id,
    topic: data.topic_name,
  };
};

//   generating random topics
const generateRandomTopic = async (grade: number) => {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from(`topic`)
    .select("id, topic_name")
    .eq("grade", grade);

  if (error) {
    console.log(error);
  }

  const allTopics = Array.from(
    new Set(
      data?.map((topic) => {
        return { id: topic.id, topic: topic.topic_name };
      })
    )
  );

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
  user_id: string,
  topic_id: string
) => {
  const supabase = createClientComponentClient();

  const { data } = await supabase
    .from("correct_submissions")
    .select("question_id")
    .eq("user_id", user_id)
    .eq("topic_id", topic_id);

  if (!data) {
    return [];
  }

  const formattedData = data.map((quiz) => {
    return quiz.question_id;
  });

  return formattedData;
};

// storing correct submission
export async function storeCorrectSubmission({
  grade,
  question_id,
  quiz_id,
  topic_id,
  user_id,
}: {
  user_id: string;
  question_id: string;
  quiz_id: number;
  topic_id: number;
  grade: number;
}) {
  const supabase = createClientComponentClient();

  const { error } = await supabase.from("correct_submissions").insert({
    userid: user_id,
    questionid: question_id,
    quiz_id,
    quizid: quiz_id,
    topic_id,
    grade,
  });

  if (error) {
    console.error("store Correct Submission error", error);
    return { success: false };
  }

  return { success: true };
}

// store user submission
export async function storeUserSubmission(
  quizId: string,
  userId: string,
  submissions: any
) {
  const supabase = createClientComponentClient();

  const { data } = await supabase
    .from("quiz")
    .update({
      submissions: submissions,
    })
    .eq("id", quizId)
    .eq("userid", userId)
    .select();

  return { success: true, data };
}

// store user submission to submissions table
export async function storeUserSubmissionToSubmissions({
  quizId,
  questionId,
  isCorrect,
  optionSelected,
  correctOption,
}: {
  quizId: number;
  questionId: number;
  isCorrect: boolean;
  optionSelected: string;
  correctOption: string;
}) {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from("submissions")
    .insert([
      {
        quiz_id: quizId,
        question_id: questionId,
        is_correct: isCorrect,
        option_selected: optionSelected,
        correct_option: correctOption,
      },
    ])
    .select();

  console.log(data);
  if (error) {
    console.error("store user submission to submissions error", error);
    return { success: false };
  }
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
    .eq("complete", true);

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

export async function getTopicNameFromDB(topic_id: number) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("topic")
    .select("topic_name")
    .eq("id", topic_id)
    .single();
  if (error) {
    console.error("get topic name error", error);
  }
  console.log(data);
  return data?.topic_name;
}
