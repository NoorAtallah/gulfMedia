import { getAllJournalists } from "@/lib/queries/journalists";
import JournalistsPage from "./JournalistsPage";

export default async function Page() {
  const journalists = await getAllJournalists();
  return <JournalistsPage journalists={journalists} />;
}