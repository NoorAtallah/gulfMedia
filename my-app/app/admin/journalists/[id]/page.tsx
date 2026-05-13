import AdminForm from "../../component/AdminForm";
import { JOURNALIST_FIELDS } from "@/lib/admin-configs";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabase.from("journalists").select("*").eq("id", id).single();
  if (!data) notFound();
  return <AdminForm table="journalists" fields={JOURNALIST_FIELDS} initialData={data} backHref="/admin/journalists" title="إعلامي" titleEn="Journalist" />;
}