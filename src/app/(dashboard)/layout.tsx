import React from "react";

import { getSession } from "../supabase-server";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = session?.user;
  // if (!user) {
  //   return redirect("/i");
  // }

  return (
    <div className="h-full w-full bg-[#FFF]">
      <main className="mt-[2rem] bg-[#FFF]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
