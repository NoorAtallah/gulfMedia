import AdminForm from "../../component/AdminForm";
import { LIBRARY_FIELDS } from "@/lib/admin-configs";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await admin.from("library_resources").select("*").eq("id", id).single();
  if (!data) notFound();
  return <AdminForm table="library_resources" fields={LIBRARY_FIELDS} initialData={data} backHref="/admin/library" title="مرجع" titleEn="Resource" />;
}