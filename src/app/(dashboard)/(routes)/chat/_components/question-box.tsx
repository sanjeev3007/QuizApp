"use client";

export default function QuestionBox({
  question,
  questionIndex,
}: {
  question: string;
  questionIndex: number;
}) {
  return (
    <div className="flex gap-x-2 border border-orange-200 bg-white p-4 rounded-lg rounded-ss-none">
      <span className="font-semibold">{questionIndex}.</span>
      <p className="text-sm py-0.5">{question}</p>
    </div>
  );
}
