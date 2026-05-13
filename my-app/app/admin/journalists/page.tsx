"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminPageHeader from "../component/AdminPageHeader";
import AdminTable from "../component/AdminTable";
import type { Journalist } from "@/lib/types";

export default function AdminJournalists() {
  const [data, setData] = useState<Journalist[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase.from("journalists").select("*").order("display_order");
    setData(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(row: Journalist) {
    if (!confirm("هل أنت متأكد؟")) return;
    await supabase.from("journalists").delete().eq("id", row.id);
    load();
  }

  return (
    <div className="px-8 py-10" dir="rtl">
      <AdminPageHeader title="الإعلاميون" titleEn="Journalists" count={data.length} newHref="/admin/journalists/new" newLabel="إعلامي جديد" />
      {loading ? (
        <p className="text-[#202151]/30 text-[13px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>جارٍ التحميل...</p>
      ) : (
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm overflow-hidden">
          <AdminTable
            data={data}
            columns={[
              {
                label: "الصورة",
                key: "avatar_url",
                render: (row) => row.avatar_url
                  ? <img src={row.avatar_url} className="w-8 h-8 rounded-full object-cover" />
                  : <div className="w-8 h-8 rounded-full bg-[#D0B66A]/15 flex items-center justify-center text-[#D0B66A] text-[11px] font-black">{row.full_name_ar[0]}</div>,
              },
              { label: "الاسم", key: "full_name_ar" },
              { label: "التخصص", key: "specialty" },
              { label: "الدولة", key: "country" },
              { label: "الخبرة", key: "experience_years" },
              {
                label: "مميز",
                key: "is_featured",
                render: (row) => row.is_featured
                  ? <span className="text-[#D0B66A] font-black text-[11px]">✓</span>
                  : <span className="text-[#202151]/25 text-[11px]">—</span>,
              },
            ]}
            onEdit={(row) => window.location.href = `/admin/journalists/${row.id}`}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}