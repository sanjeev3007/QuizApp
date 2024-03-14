import { createServerSupabaseClient } from "@/app/supabase-server";

export async function GET(req: Request) {
  // const supabase = createServerSupabaseClient();

  // let db_with_grade = `fetch_rows_db_grade7_math`;

  // let { data: random_topics, error: topic_error } = await supabase
  //   .from(`db_grade7_math`)
  //   .select("topic");

  // const allTopics = Array.from(
  //   new Set(random_topics?.map((topic) => topic.topic))
  // );

  // const randomTopics = [] as string[];
  // for (let i = 0; i < 2; i++) {
  //   const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
  //   if (randomTopics.includes(randomTopic)) {
  //     i--;
  //     continue;
  //   }
  //   randomTopics.push(randomTopic);
  // }

  // console.log(randomTopics);
  // const { data: correct_submissions } = await supabase
  //   .from("correct_submissions")
  //   .select("questionid")
  //   .eq("userid", "demo_user_id_6");

  // const questionIds = correct_submissions?.map((quiz) => {
  //   return quiz.questionid;
  // });

  // console.log(questionIds);

  // const { data, error } = await supabase.rpc(db_with_grade, {
  //   level: "easy",
  //   rows_limit: 4,
  //   topics: randomTopics,
  //   uuids: questionIds,
  // });

  // if (error) console.log(error);

  // console.log(data);

  return new Response(JSON.stringify({ data: "hello" }), {
    headers: {
      "content-type": "application/json",
    },
  });
}
