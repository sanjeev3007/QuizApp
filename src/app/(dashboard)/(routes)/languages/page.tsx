import { redirect } from "next/navigation";
import {
  getLanguageIdByName,
  getLanguageLevels,
} from "@/actions/language.actions";
import LanguageDashboard from "./components/language-dashboard";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  if (!searchParams.lang) {
    redirect("/student-dashboard");
  }

  try {
    const [levels, langInfo] = await Promise.all([
      getLanguageLevels(),
      getLanguageIdByName(searchParams.lang),
    ]);

    if (!levels || !langInfo) {
      redirect("/student-dashboard");
    }

    return (
      <LanguageDashboard
        levels={levels}
        lang={searchParams.lang}
        langId={langInfo.id}
      />
    );
  } catch (error) {
    console.error("Error loading language dashboard:", error);
    redirect("/student-dashboard");
  }
}
