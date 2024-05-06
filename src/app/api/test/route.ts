import { z } from "zod";
import { OpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { NextResponse } from "next/server";

const parser = StructuredOutputParser.fromZodSchema(
  z
    .object({
      answer: z
        .string()
        .describe(
          "Give the answer to the user's question. If the question is inappropriate or uneducational, you can choose not to answer it. If you choose not to answer the question, you can provide a reason why you are not answering it."
        ),
      nextPossibleQuestions: z
        .array(z.string())
        .describe(
          "generate two next possible questions related to the user's question that user can ask after it. but if the question is not educational generate two random educational questions."
        ),
      isEducational: z
        .boolean()
        .describe(
          "whether the answer is educational or not. if it is not educational, return false. if it is educational, return true."
        ),
    })
    .strict()
);

export async function POST(req: Request) {
  const body = await req.json();
  const { question } = body;
  try {
    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(
        "You are a helpful educational chatbot name is 'Noah'. Answer every educational or informational question as best as possible but if the question is inappropriate or uneducational, you can choose not to answer it. for example if the question is about a movie related, an actor related, or any other inappropriate that you think it is not educational for a student, you should not to answer it. If user will ask about you, just say 'I am a helpful educational chatbot name is Noah. I am here to help you with your educational questions.' and don't provide any other information about you.\n{format_instructions}\n{question}"
      ),
      new OpenAI({ temperature: 0.2 }),
      parser,
    ]);
    console.log(chain);
    const response = await chain.invoke({
      question: question,
      format_instructions: parser.getFormatInstructions(),
    });

    console.log(response);

    return new NextResponse(JSON.stringify({ response }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
}
