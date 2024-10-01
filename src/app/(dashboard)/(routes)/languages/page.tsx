import { getLanguageLevels } from "@/actions/language.actions";
import LanguageDashboard from "./components/language-dashboard";
import { Suspense } from "react";

export default async function DashboardPage() {
  const levels = await getLanguageLevels();
  return (
    <div>
      <Suspense>
        <LanguageDashboard levels={levels!} />
      </Suspense>
    </div>
  );
}
