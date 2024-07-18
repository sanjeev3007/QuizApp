"use client";

import { Button } from "@/components/ui/button";
import { experimental_useObject as useObject } from "ai/react";

import { z } from "zod";

// define a schema for the notifications
export const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe("Name of a fictional person."),
      message: z.string().describe("Message. Do not use emojis or links."),
    })
  ),
});

export default function Page() {
  const { object, submit } = useObject({
    api: "/api/object",
    schema: notificationSchema,
    initialValue: {
      notifications: [
        { name: "Alice", message: "You have a ping message." },
        { name: "Bob", message: "You have a pong message." },
        { name: "Charlie", message: "You have a ting message." },
      ],
    },
  });

  return (
    <div className="whitespace-pre-wrap p-10">
      <Button onClick={() => submit("Messages during finals week.")}>
        Generate notifications
      </Button>

      {object?.notifications?.map((notification, index) => (
        <div key={index}>
          <p>{notification?.name}</p>
          <p>{notification?.message}</p>
        </div>
      ))}
    </div>
  );
}
