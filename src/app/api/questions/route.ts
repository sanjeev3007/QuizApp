import { NextRequest, NextResponse } from "next/server";

import { ZodError } from "zod";
import { strict_output } from "@/lib/strict-json";
import { getQuestionsSchema } from "@/schemas/question.schema";

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "Hello from the API" });
}

export const runtime = "nodejs";
// export const maxDuration = 10;

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { amount, topic } = getQuestionsSchema.parse(body);
    let questions: any;

    questions = await strict_output(
      "You are a helpful AI that is able to generate mcq question and answers on topic integers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
      `You are to generate a random hard mcq question about Integers`,
      {
        question: "question",
        answer: "answer with max length of 15 words",
        option1: "option1 with max length of 15 words",
        option2: "option2 with max length of 15 words",
        option3: "option3 with max length of 15 words",
        option4: "option4 with max length of 15 words",
      }
    );

    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error("elle gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}
