import AdminForm from "../../component/AdminForm";
import { PODCAST_FIELDS } from "@/lib/admin-configs";
export default function Page() {
  return <AdminForm table="podcasts" fields={PODCAST_FIELDS} backHref="/admin/podcasts" title="حلقة بودكاست" titleEn="Podcast" />;
}