import { getLanguageLevels } from "@/actions/language.actions";
import LanguageDashboard from "./components/language-dashboard";

export default async function DashboardPage() {
  const levels = await getLanguageLevels();
  return <LanguageDashboard levels={levels!} />;
}
