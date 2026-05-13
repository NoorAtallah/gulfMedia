import AdminForm from "../../component/AdminForm";
import { ARTICLE_FIELDS } from "@/lib/admin-configs";

export default function Page() {
  return (
    <AdminForm
      table="articles"
      fields={ARTICLE_FIELDS}
      backHref="/admin/articles"
      title="مقال"
      titleEn="Article"
    />
  );
}