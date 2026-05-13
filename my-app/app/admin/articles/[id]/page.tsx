import AdminForm from "../../component/AdminForm";
import { ARTICLE_FIELDS } from "@/lib/admin-configs";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await supabaseAdmin
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <AdminForm
      table="articles"
      fields={ARTICLE_FIELDS}
      initialData={data}
      backHref="/admin/articles"
      title="مقال"
      titleEn="Article"
    />
  );
}