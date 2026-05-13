import AdminForm from "../../component/AdminForm";
import { EVENT_FIELDS } from "@/lib/admin-configs";
export default function Page() {
  return <AdminForm table="events" fields={EVENT_FIELDS} backHref="/admin/events" title="فعالية" titleEn="Event" />;
}