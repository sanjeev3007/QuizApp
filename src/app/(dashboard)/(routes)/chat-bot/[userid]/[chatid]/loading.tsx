"use client";

import Image from "next/image";
import botIcon from "@/assets/Images/bot_icon.png";
import userIcon from "@/assets/Images/user_icon.png";
import { useEffect, useState } from "react";

export default function Loading() {
  const [userAvatar, setUserAvatar] = useState<any>(userIcon);
  useEffect(() => {
    if (localStorage.getItem("user-avatar")) {
      setUserAvatar(localStorage.getItem("user-avatar"));
    }
  }, []);

  return (
    <div className="flex-1 relative w-full max-w-lg mx-auto px-2">
      <div className="flex w-full justify-start gap-x-2 mt-4">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          <Image
            src={userAvatar}
            alt="user"
            className="stroke-white rounded-[20px]"
            width={32}
            height={32}
          />
        </div>
        <div
          className={
            "animate-pulse w-full max-w-[12rem] grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F9F4EC] text-[#5B8989] bg-[#F9F4EC] p-4 rounded-lg rounded-ss-none whitespace-pre-wrap"
          }
        ></div>
      </div>
      <div className="flex w-full justify-start gap-x-2 mt-4">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          <Image
            src={botIcon}
            alt="user"
            className="stroke-white animate-pulse"
          />
        </div>
        <div
          className={
            "animate-pulse w-full max-w-[18rem] grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F0F6FA] text-[#5B8989] bg-[#F0F6FA] p-4 rounded-lg rounded-ss-none whitespace-pre-wrap"
          }
        ></div>
      </div>
    </div>
  );
}
