import React from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Card } from "@/components/ui/card";
import "@/components/home-page.css";

type Props = {};

const StrengthCard = (props: Props) => {
  return (
    <Card className="flex justify-around p-4 bg-[#FFFFFF]">
      <div className="text-xs font-bold  justify-self-center self-center text-[#5B8989]">
        Definition, Representation and Standard Form of Rational Numbers
      </div>
      <div className=" flex justify-self-center self-center">
        <span className="text-sm font-bold  text-[#5B8989]">
          10
        </span>
        <StarBorderOutlinedIcon fontSize="small" className="star"/>
      </div>
    </Card>
  );
};

export default StrengthCard;
