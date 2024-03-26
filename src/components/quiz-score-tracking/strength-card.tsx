import React from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import starIcon from "@/assets/Images/starIcon.svg";

import "@/components/home-page.css";

type Props = {};

const StrengthCard = (props: Props) => {
  return (
    <Card className="flex justify-around p-4 bg-[#FFFFFF]">
      <div className="text-xs font-semibold  justify-self-center self-center text-[#5B8989]">
        Definition, Representation and Standard Form of Rational Numbers
      </div>
      <div className=" flex justify-self-center self-center">
        <span className="text-sm font-semibold  text-[#5B8989]">
          10
        </span>
        <Image src={starIcon} alt="star"/>
      </div>
    </Card>
  );
};

export default StrengthCard;
