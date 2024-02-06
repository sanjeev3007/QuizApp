"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const QuestionsList = ({ questions, submissions }: any) => {
  return (
    <Table className="mt-4">
      <TableCaption>End of list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">No.</TableHead>
          <TableHead>Question & Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map((question: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {question.question} <br />
                  <br />
                  <span className="font-semibold">
                    {
                      JSON.parse(question.options).find(
                        (option: any) => option.correct == "true"
                      )?.text
                    }
                  </span>
                </TableCell>

                <TableCell
                  className={`${
                    submissions.find(
                      (submission: any) =>
                        submission.questionId === question.uuid
                    )?.isCorrect
                      ? "text-green-600"
                      : "text-red-600"
                  } font-semibold`}
                >
                  {
                    submissions.find(
                      (submission: any) =>
                        submission.questionId === question.uuid
                    )?.selected?.text
                  }
                </TableCell>
              </TableRow>
            );
          })}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionsList;
