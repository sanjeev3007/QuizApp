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
  const levels = await getLanguageLevels();
  const langInfo = await getLanguageIdByName(searchParams.lang);
  return (
    <LanguageDashboard
      levels={levels!}
      lang={searchParams.lang}
      langId={langInfo?.id!}
    />
  );
}
