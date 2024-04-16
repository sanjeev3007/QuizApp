import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Link from "next/link";
type chatData = {
  id: string;
  user_id: string;
  payload: {
    id: string;
    path: string;
    title: string;
    user_id: string;
  };
};
type Props = {
  recentChats: chatData[];
};

const LastInteractions = ({ recentChats }: Props) => {
  const arr = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Why do we need to learn algebra in maths?",
    "Why stars are infinite in the sky?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Why do we need to learn algebra in maths?",
  ];
  return (
    <div>
      <div className="flex items-center mb-[1rem]">
        <AccessTimeOutlinedIcon fontSize="small" className="text-[#FFC31F]" />{" "}
        <span className="text-[#2F4F4F] text-sm font-medium ml-[5px]">
          Last interactions with Noah
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
        {recentChats.map((data, index) => {
          return (
            <Link
              href={data.payload.path}
              key={index}
              className="bg-[#F0F6FA] p-[12px] flex justify-between"
            >
              <span className="text-[#5B8989] text-sm font-medium">
                {data.payload.title.length > 100
                  ? `${data.payload.title.slice(1, 100)}...`
                  : data.payload.title}
              </span>
              <ArrowForwardOutlinedIcon
                fontSize="small"
                className="text-[#5B8989]"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LastInteractions;
