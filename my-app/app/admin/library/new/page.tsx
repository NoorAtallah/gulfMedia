import AdminForm from "../../component/AdminForm";
import { LIBRARY_FIELDS } from "@/lib/admin-configs";
export default function Page() {
  return <AdminForm table="library_resources" fields={LIBRARY_FIELDS} backHref="/admin/library" title="مرجع" titleEn="Resource" />;
}