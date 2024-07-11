import { Suspense } from "react";
import { doubtSolveDashboard } from "@/app/supabase-server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import CircularProgress from "@mui/material/CircularProgress";
import HomePage from "@/components/home-page";

const PageContent = async () => {
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const total_chats = await doubtSolveDashboard(user_Id!);

  return <HomePage userId={user_Id!} totalChats={total_chats} />;
};

const Page = () => {
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[90vh]">
            <CircularProgress size={40} />
          </div>
        }
      >
        <PageContent />
      </Suspense>
    </div>
  );
};

export default Page;
