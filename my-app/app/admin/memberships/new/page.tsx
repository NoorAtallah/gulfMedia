import AdminForm from "../../component/AdminForm";
import { MEMBERSHIP_FIELDS } from "@/lib/admin-configs";
export default function Page() {
  return <AdminForm table="membership_plans" fields={MEMBERSHIP_FIELDS} backHref="/admin/memberships" title="خطة عضوية" titleEn="Membership Plan" />;
}