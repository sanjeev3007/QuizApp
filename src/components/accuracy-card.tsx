import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
type Props = { accuracy: number; totalCorrect: number; totalQuestions: number };

const AccuracyCard = ({ accuracy, totalCorrect, totalQuestions }: Props) => {
  accuracy = Math.round(accuracy * 100) / 100;
  return (
    <Card className="">
      <CardContent className="p-0 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">Correct</CardTitle>
          <CheckCircle />
        </CardHeader>
        <div className="grid place-items-center h-full w-full flex-1 pt-8">
          <div className="text-sm font-medium flex items-end">
            <p className="text-4xl font-bold">{totalCorrect}</p>
            <p className="text-2xl font-bold">/</p>
            <p className="text-2xl font-bold">{totalQuestions}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
