import AdminForm from "../../component/AdminForm";
import { MEMBERSHIP_FIELDS } from "@/lib/admin-configs";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await admin.from("membership_plans").select("*").eq("id", id).single();
  if (!data) notFound();
  return <AdminForm table="membership_plans" fields={MEMBERSHIP_FIELDS} initialData={data} backHref="/admin/memberships" title="خطة عضوية" titleEn="Membership Plan" />;
}