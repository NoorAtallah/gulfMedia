import AdminForm from "../../component/AdminForm";
import { COURSE_FIELDS } from "@/lib/admin-configs";
export default function Page() {
  return <AdminForm table="courses" fields={COURSE_FIELDS} backHref="/admin/courses" title="دورة" titleEn="Course" />;
}