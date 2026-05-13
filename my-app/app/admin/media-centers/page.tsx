"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminPageHeader from "../component/AdminPageHeader";
import AdminTable from "../component/AdminTable";

export default function AdminMediaCenters() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase
      .from("media_centers")
      .select("*")
      .order("display_order", { ascending: true });
    setData(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(row: Record<string, unknown>) {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    await supabase.from("media_centers").delete().eq("id", row.id as string);
    load();
  }

  return (
    <div className="px-8 py-10" dir="rtl">
      <AdminPageHeader
        title="المراكز الإعلامية"
        titleEn="Media Centers"
        count={data.length}
        newHref="/admin/media-centers/new"
        newLabel="مركز جديد"
      />
      {loading ? (
        <p className="text-[#202151]/30 text-[13px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>جارٍ التحميل...</p>
      ) : (
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm overflow-hidden">
          <AdminTable
            data={data as ({ id: string } & Record<string, unknown>)[]}
            columns={[
              { label: "الاسم", key: "name_ar" },
              { label: "الدولة", key: "country" },
              {
                label: "الموقع",
                key: "website_url",
                render: (row) => (row as Record<string, unknown>).website_url
                  ? <a href={String((row as Record<string, unknown>).website_url)} target="_blank" rel="noopener noreferrer" className="text-[#D0B66A] text-[11px] font-black no-underline hover:underline">رابط ↗</a>
                  : <span className="text-[#202151]/25 text-[11px]">—</span>,
              },
              { label: "الترتيب", key: "display_order" },
            ]}
            onEdit={(row) => window.location.href = `/admin/media-centers/${(row as Record<string, unknown>).id as string}`}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}