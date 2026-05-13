import AdminForm from "../../component/AdminForm";
import { MEDIA_CENTER_FIELDS } from "@/lib/admin-configs";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await admin.from("media_centers").select("*").eq("id", id).single();
  if (!data) notFound();
  return <AdminForm table="media_centers" fields={MEDIA_CENTER_FIELDS} initialData={data} backHref="/admin/media-centers" title="مركز إعلامي" titleEn="Media Center" />;
}