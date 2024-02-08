"use client";

import { User } from "lucide-react";

export default function SelectedAnswer({
  submissions,
  index,
}: {
  submissions: any[];
  index: number;
}) {
  return (
    submissions[index] && (
      <div className="flex w-full justify-end gap-x-2">
        <p className="bg-white border border-orange-200 px-4 py-1 rounded-md flex items-center w-fit rounded-se-none">
          {submissions[index]?.selected?.text}
          {/* <span className="text-sm font-medium ml-1">: You</span> */}
        </p>
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          <User size={18} className="stroke-orange-300" />
        </div>
      </div>
    )
  );
}
