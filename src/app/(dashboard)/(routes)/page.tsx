import HomePage from "@/components/home-page";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const Home = async () => {
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  return (
    <div className="p-5 lg:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <HomePage userId={user_Id!} totalChats={0} />
    </div>
  );
};

export default Home;
