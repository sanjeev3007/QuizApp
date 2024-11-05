"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Lock from "@/public/images/icons/lock-white.png";

type TopicCardProps = {
  lock: boolean;
  cards: number;
  topic: {
    id: number;
    name: string;
    languages_quiz: { card_state: number; id: number }[];
  };
  levelId: number;
};

export default function TopicCard({
  cards,
  lock,
  topic,
  levelId,
}: TopicCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");

  const getIcon = (topic: string) => {
    switch (topic) {
      case "Animals and Nature":
        return "🐶";
      case "Body Parts":
        return "👃";
      case "Everyday Objects":
        return "🛍️";
      case "Family Members":
        return "👪";
      case "Food and Drinks":
        return "🍔";
      case "Colors and Shapes":
        return "🌈";
      case "Greetings and Introductions":
        return "👋";
      case "School and Classroom":
        return "🏫";
      case "Numbers and Time":
        return "🔢";
      case "Shopping and Money":
        return "💰";
      case "Weather and Seasons":
        return "🌤️";
      case "Hobbies and Activities":
        return "🎮";
      case "Holidays and Celebrations":
        return "🎉";
      case "Making Friends":
        return "👫";
      case "Music and Arts":
        return "🎸";
      case "Travel and Transportation":
        return "🚗";
      case "At the Restaurant":
        return "🍴";
      case "Sports and Games":
        return "🏊";
      case "Colors":
        return "🌈";
      case "Shapes":
        return "🔶";
    }
  };

  const quizSubmission = topic?.languages_quiz.sort(
    (a, b) => a.card_state - b.card_state
  )[topic?.languages_quiz.length - 1];

  const nextState =
    quizSubmission?.card_state == 1
      ? "6-10"
      : quizSubmission?.card_state == 2
      ? "11-15"
      : quizSubmission?.card_state == 3
      ? "16-20"
      : "1-5";

  return (
    <div className="px-2">
      <Card
        className={cn(
          "w-full shadow-none rounded-2xl",
          lock ? "bg-[#FAFAFA]" : "bg-[#F5F9FF]"
        )}
        style={{
          boxShadow: "0px 0px 8px 0px #0053F429",
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-xl">{getIcon(topic.name)}</span>
            <h3 className="text-lg md:text-xl font-semibold text-[#517B7B]">
              {topic.name}
            </h3>
          </div>
          <p className="text-sm text-[#A3A3A3] font-medium">
            {cards} flash cards available
          </p>
          <div className="flex items-center gap-2 pt-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-12 h-2 bg-[#f2c445] rounded-full"
                style={{
                  opacity: index < topic?.languages_quiz.length ? 1 : 0.3,
                }}
              ></div>
            ))}
          </div>
        </CardContent>
        {lock ? (
          <CardFooter className="flex justify-between p-6 pt-4 gap-6">
            <Button
              disabled={lock}
              onClick={() => {}}
              className="bg-[#C3B8AC] hover:bg-[#C3B8AC]/80 disabled:opacity-1000 rounded-lg text-white w-fit items-center flex"
            >
              Start Learning{" "}
              <Image
                src={Lock}
                alt="lock"
                width={12}
                height={12}
                className="ml-2"
              />
            </Button>
          </CardFooter>
        ) : (
          <CardFooter className="flex justify-between p-6 pt-4 gap-6">
            <Button
              onClick={() =>
                router.push(
                  `/languages/learn?lang=${lang}&topic=${topic.id}&level=${levelId}&cards=${nextState}`
                )
              }
              className="bg-[#F0A919] hover:bg-yellow-500 text-white w-full"
            >
              Learn
            </Button>
            <Button
              onClick={() =>
                router.push(
                  `/languages/quiz?lang=${lang}&topic=${topic.id}&level=${levelId}&cards=${nextState}`
                )
              }
              className="bg-[#E98451] hover:bg-orange-500 text-white w-full"
            >
              Practice
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
