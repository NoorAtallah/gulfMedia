import AdminForm from "../../component/AdminForm";
import { PARTNER_FIELDS } from "@/lib/admin-configs";
export default function Page() {
  return <AdminForm table="partners" fields={PARTNER_FIELDS} backHref="/admin/partners" title="شريك" titleEn="Partner" />;
}