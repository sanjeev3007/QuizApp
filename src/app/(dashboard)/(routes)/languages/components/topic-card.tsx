"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";

type TopicCardProps = {
  title: string;
  icon: React.ReactNode;
  cards: number;
};

export default function TopicCard({ title, icon, cards }: TopicCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");
  return (
    <div className="px-2">
      <Card
        className="w-full bg-[#F5F9FF] shadow-none rounded-2xl"
        style={{
          boxShadow: "0px 0px 8px 0px #0053F429",
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-3xl">{icon}</span>
            <h3 className="text-xl font-semibold text-[#517B7B]">{title}</h3>
          </div>
          <p className="text-sm text-[#A3A3A3] font-medium">
            {cards} flash cards available
          </p>
        </CardContent>
        <CardFooter className="flex justify-between p-6 pt-6 gap-6">
          <Button
            onClick={() => router.push("/languages/learn?lang=" + lang)}
            className="bg-[#F0A919] hover:bg-yellow-500 text-white w-full"
          >
            Learn
          </Button>
          <Button
            onClick={() => router.push("/languages/quiz?lang=" + lang)}
            className="bg-[#E98451] hover:bg-orange-500 text-white w-full"
          >
            Practice
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
