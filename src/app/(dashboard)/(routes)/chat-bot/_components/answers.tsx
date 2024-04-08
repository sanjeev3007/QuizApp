"use client";

import { User } from "lucide-react";
import botIcon from "@/assets/Images/bot_icon.png";
import Image from "next/image";
import FeedBackForm from "./feedback-form";

export default function Answers({ index }: { index: number }) {
  return (
    <div className="flex-1 relative w-full mt-4 mb-8">
      <div className="flex w-full justify-start gap-x-2 mt-4">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          <Image src={botIcon} alt="user" className="stroke-orange-300" />
        </div>
        <div className="w-fit grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F0F6FA] text-[#5B8989] bg-[#F0F6FA] p-4 rounded-lg rounded-ss-none">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ut
          perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
          odit aut fugit, est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
          enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
          voluptas nulla pariatur
        </div>
      </div>
      <FeedBackForm answerId={index} />
    </div>
  );
}
