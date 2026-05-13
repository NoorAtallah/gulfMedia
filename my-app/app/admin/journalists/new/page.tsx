import AdminForm from "../../component/AdminForm";
import { JOURNALIST_FIELDS } from "@/lib/admin-configs";

export default function Page() {
  return <AdminForm table="journalists" fields={JOURNALIST_FIELDS} backHref="/admin/journalists" title="إعلامي" titleEn="Journalist" />;
}