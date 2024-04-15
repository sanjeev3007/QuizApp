import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

type Props = {};

const LastInteractions = (props: Props) => {
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
        {arr.map((data, index) => {
          return (
            <div
              key={index}
              className="bg-[#F0F6FA] p-[12px] flex justify-between"
            >
              <span className="text-[#5B8989] text-sm font-medium">
                {data.length > 100 ? `${data.slice(1, 100)}...` : data}
              </span>
              <ArrowForwardOutlinedIcon
                fontSize="small"
                className="text-[#5B8989]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LastInteractions;
