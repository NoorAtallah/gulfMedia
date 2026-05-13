"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminPageHeader from "../component/AdminPageHeader";
import AdminTable from "../component/AdminTable";

export default function AdminLibrary() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase
      .from("library_resources")
      .select("*, category:categories(name_ar)")
      .order("created_at", { ascending: false });
    setData(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(row: Record<string, unknown>) {
    if (!confirm("هل أنت متأكد من حذف هذا المرجع؟")) return;
    await supabase.from("library_resources").delete().eq("id", row.id as string);
    load();
  }

  return (
    <div className="px-8 py-10" dir="rtl">
      <AdminPageHeader
        title="المكتبة"
        titleEn="Library"
        count={data.length}
        newHref="/admin/library/new"
        newLabel="مرجع جديد"
      />
      {loading ? (
        <p className="text-[#202151]/30 text-[13px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>جارٍ التحميل...</p>
      ) : (
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm overflow-hidden">
          <AdminTable
            data={data as ({ id: string } & Record<string, unknown>)[]}
            columns={[
              {
                label: "الغلاف",
                key: "cover_url",
                render: (row) => (row as Record<string, unknown>).cover_url
                  ? <img src={String((row as Record<string, unknown>).cover_url)} className="w-10 h-12 object-cover rounded-sm" />
                  : <div className="w-10 h-12 bg-[#D0B66A]/10 rounded-sm" />,
              },
              { label: "العنوان", key: "title_ar" },
              { label: "المؤلف", key: "author_name_ar" },
              { label: "النوع", key: "type" },
              {
                label: "التصنيف",
                key: "category",
                render: (row) => {
                  const cat = (row as Record<string, unknown>).category as Record<string, unknown> | null;
                  return cat ? String(cat.name_ar) : "—";
                },
              },
              { label: "السنة", key: "year" },
              {
                label: "ملف",
                key: "file_url",
                render: (row) => (row as Record<string, unknown>).file_url
                  ? <span className="text-green-600 font-black text-[11px]">✓ متاح</span>
                  : <span className="text-[#202151]/25 text-[11px]">غير متاح</span>,
              },
            ]}
            onEdit={(row) => window.location.href = `/admin/library/${(row as Record<string, unknown>).id as string}`}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}