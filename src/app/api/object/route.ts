import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe("Name of a fictional person."),
      message: z.string().describe("Message. Do not use emojis or links."),
    })
  ),
});

export async function POST(req: Request) {
  const { context } = await req.json();

  const result = await streamObject({
    model: openai("gpt-3.5-turbo"),
    prompt:
      `Generate 3 notifications for a messages app in this context:` + context,
    schema: notificationSchema,
    onFinish: (object) => {
      console.log(object);
    },
  });

  return result.toTextStreamResponse();
}
