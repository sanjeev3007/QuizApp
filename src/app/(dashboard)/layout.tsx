import React from "react";
import Navbar from "./_components/navbar";

import { getSession } from "../supabase-server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return redirect("/i");
  }

  return (
    <div className="h-full">
      <Navbar />

      <main className="mt-[4rem]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
