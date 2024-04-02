import { createServerSupabaseClient } from "@/app/supabase-server";

export async function GET(req: Request) {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("quiz")
    .select("id, metadata, questions, created_at");

  let mismatch = [];

  for (const quiz of data!) {
    if (quiz.metadata !== null) {
      if (quiz.metadata.grade != quiz.questions[0].grade) {
        mismatch.push(quiz);
      }
    }
  }
  console.log(mismatch);

  return new Response(JSON.stringify(mismatch), {
    headers: {
      "content-type": "application/json",
    },
  });
}
