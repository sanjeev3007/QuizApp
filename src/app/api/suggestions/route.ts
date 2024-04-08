import OpenAI from "openai";
import { StreamingTextResponse, OpenAIStream } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const json_format = {
  answer: "",
  nextPossibleQuestions: [
    {
      question: "",
    },
    {
      question: "",
    },
    {
      question: "",
    },
    {
      question: "",
    },
  ],
};

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt: question, correctOption } = body;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    stream: true,
    temperature: 0,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant designed to output in JSON format like this ${JSON.stringify(
          json_format
        )}, nextPossibleQuestions is an array of some possible questions that user can ask.`,
      },
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream, {
    status: 200,
  });
}
