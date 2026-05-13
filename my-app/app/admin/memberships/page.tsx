"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminPageHeader from "../component/AdminPageHeader";
import AdminTable from "../component/AdminTable";

export default function AdminMemberships() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase
      .from("membership_plans")
      .select("*")
      .order("display_order", { ascending: true });
    setData(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(row: Record<string, unknown>) {
    if (!confirm("هل أنت متأكد من حذف هذه الخطة؟")) return;
    await supabase.from("membership_plans").delete().eq("id", row.id as string);
    load();
  }

  return (
    <div className="px-8 py-10" dir="rtl">
      <AdminPageHeader
        title="خطط العضوية"
        titleEn="Membership Plans"
        count={data.length}
        newHref="/admin/memberships/new"
        newLabel="خطة جديدة"
      />
      {loading ? (
        <p className="text-[#202151]/30 text-[13px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>جارٍ التحميل...</p>
      ) : (
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm overflow-hidden">
          <AdminTable
            data={data as ({ id: string } & Record<string, unknown>)[]}
            columns={[
              { label: "الاسم", key: "name_ar" },
              { label: "الوصف", key: "description_ar" },
              {
                label: "السعر",
                key: "price",
                render: (row) => {
                  const p = (row as Record<string, unknown>).price;
                  return p === 0
                    ? <span className="text-green-600 font-black text-[11px]">مجاني</span>
                    : <span className="font-black text-[13px]">{String(p)} ر.س</span>;
                },
              },
              { label: "الترتيب", key: "display_order" },
            ]}
            onEdit={(row) => window.location.href = `/admin/memberships/${(row as Record<string, unknown>).id as string}`}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}