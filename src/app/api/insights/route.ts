import {
  createServerSupabaseClient,
  getTopicWiseLevelScore,
} from "@/app/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 100;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, subjectId, grade } = body;
    const supabase = createServerSupabaseClient();

    const { data: allQuizes, error } = await supabase
      .from("quiz")
      .select()
      .eq("userid", userId)
      .eq("complete", true)
      .eq("subject_id", subjectId);
    if (error) {
      console.error(error);
    }
    const quiredQuestion = {};
    if (!allQuizes?.length)
      return NextResponse.json({ error: "No quiz found" });
    const subtopics = await getTopicWiseLevelScore(allQuizes, grade);
    //   pushFinalScore(subtopics);
    const scoreGreaterThanOrEqualTo4 = [];
    const scoreLessThanOrEqualTo3 = [];

    // Function to compare ages in descending order
    // Categorize students into arrays
    for (const topic in subtopics) {
      if (subtopics.hasOwnProperty(topic)) {
        const score = subtopics[topic].totalScore;
        if (score >= 4) {
          scoreGreaterThanOrEqualTo4.push({
            topic,
            totalScore: subtopics[topic].totalScore,
          });
        } else {
          scoreLessThanOrEqualTo3.push({
            topic,
            totalScore: subtopics[topic].totalScore,
          });
        }
      }
    }

    const compareScoreDescending = (a: any, b: any) =>
      b.totalScore - a.totalScore;
    // Sort arrays by age in descending order
    scoreGreaterThanOrEqualTo4.sort(compareScoreDescending);
    scoreLessThanOrEqualTo3.sort(compareScoreDescending);
    return NextResponse.json(
      {
        scoreGreaterThanOrEqualTo4: scoreGreaterThanOrEqualTo4.slice(0, 6),
        scoreLessThanOrEqualTo3: scoreLessThanOrEqualTo3.slice(0, 6),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
