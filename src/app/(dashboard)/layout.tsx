import React from "react";
import sandboxLogo from "@/assets/Images/sandboxLogo.svg";
import Image from "next/image";
import { getSession } from "../supabase-server";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = session?.user;
  // if (!user) {
  //   return redirect("/i");
  // }

  return (
    <div className="h-full w-full bg-[#FFF]">
      <div className="w-full border-b-2 flex justify-center bg-[#FFF] py-4 sticky top-0">
        <Image src={sandboxLogo} alt="sandbox-logo" />
      </div>
      <main className="mt-[1rem] h-[calc(100vh-90px)] bg-[#FFF] overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
