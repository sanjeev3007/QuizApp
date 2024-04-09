import React from "react";
import Index from "./_components/Index";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

type Props = {};

const Page = (props: Props) => {
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID!;
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <Index user_Id={user_Id} />
    </div>
  );
};

export default Page;
