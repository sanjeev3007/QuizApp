import {
  getLast10Quizes,
  getNumberOfCompletedQuiz,
  quizWiseScore,
} from "@/app/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 100;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, subjectId } = body;

    const quizCurrentStatus = await getNumberOfCompletedQuiz(userId, subjectId);
    const last10Quizes = await getLast10Quizes({
      limit: 10,
      userid: userId,
      subjectId,
    });

    const quizNumber =
      quizCurrentStatus.numberOfCompletedQuiz <= 10
        ? 0
        : quizCurrentStatus.numberOfCompletedQuiz - 10;
    const quizWise = quizWiseScore({ quizes: last10Quizes, quizNumber });
    return NextResponse.json(
      {
        quizNumber,
        quizWise,
        quizCurrentStatus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
