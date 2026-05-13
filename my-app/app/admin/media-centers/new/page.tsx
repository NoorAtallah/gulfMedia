import AdminForm from "../../component/AdminForm";
import { MEDIA_CENTER_FIELDS } from "@/lib/admin-configs";
export default function Page() {
  return <AdminForm table="media_centers" fields={MEDIA_CENTER_FIELDS} backHref="/admin/media-centers" title="مركز إعلامي" titleEn="Media Center" />;
}