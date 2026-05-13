import { getAllEvents } from "@/lib/queries/events";
import { getAllCategories } from "@/lib/queries/categories";
import EventsPage from "./EventsPage";

export default async function Page() {
  const events = await getAllEvents();
  return <EventsPage events={events} />;
}