import { createServerSupabaseClient } from "@/app/supabase-server";

export async function GET(req: Request) {
  const supabase = createServerSupabaseClient();

  const { data: previousData, error } = await supabase
    .from("db_grade7_math")
    .select("id, uuid, metadata, options, topic, subject, grade");

  for (let i = 0; i < previousData?.length!; i++) {
    const updatedMetadata = JSON.parse(previousData![i].metadata);
    // const updatedOptions = JSON.parse(previousData![i].options);

    const { data } = await supabase
      .from("db_grade7_math")
      .update({
        metadata: updatedMetadata,
      })
      .eq("uuid", previousData![i].uuid)
      .select("id, metadata, options, grade, topic, subject");
    console.log(data);
  }

  console.log("End.");
  if (error) {
    return new Response(JSON.stringify({ data: error }), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ message: "Successful" }), {
    headers: {
      "content-type": "application/json",
    },
  });
}
