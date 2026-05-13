"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminPageHeader from "../component/AdminPageHeader";
import AdminTable from "../component/AdminTable";

export default function AdminCourses() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase
      .from("courses")
      .select("*, instructor:journalists(full_name_ar)")
      .order("created_at", { ascending: false });
    setData(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(row: Record<string, unknown>) {
    if (!confirm("هل أنت متأكد من حذف هذه الدورة؟")) return;
    await supabase.from("courses").delete().eq("id", row.id as string);
    load();
  }

  async function handleStatusChange(row: Record<string, unknown>, status: string) {
    await supabase.from("courses").update({ status }).eq("id", row.id as string);
    load();
  }

  return (
    <div className="px-8 py-10" dir="rtl">
      <AdminPageHeader
        title="الدورات التدريبية"
        titleEn="Courses"
        count={data.length}
        newHref="/admin/courses/new"
        newLabel="دورة جديدة"
      />
      {loading ? (
        <p className="text-[#202151]/30 text-[13px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>جارٍ التحميل...</p>
      ) : (
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm overflow-hidden">
          <AdminTable
            data={data as ({ id: string } & Record<string, unknown>)[]}
            columns={[
              {
                label: "الصورة",
                key: "cover_url",
                render: (row) => (row as Record<string, unknown>).cover_url
                  ? <img src={String((row as Record<string, unknown>).cover_url)} className="w-10 h-10 object-cover rounded-sm" />
                  : <div className="w-10 h-10 bg-[#D0B66A]/10 rounded-sm" />,
              },
              { label: "العنوان", key: "title_ar" },
              {
                label: "المدرب",
                key: "instructor",
                render: (row) => {
                  const inst = (row as Record<string, unknown>).instructor as Record<string, unknown> | null;
                  return inst ? String(inst.full_name_ar) : "—";
                },
              },
              { label: "المستوى", key: "level" },
              {
                label: "السعر",
                key: "price",
                render: (row) => {
                  const price = (row as Record<string, unknown>).price;
                  return price === 0 ? <span className="text-green-600 font-black text-[11px]">مجاني</span> : <span className="font-black text-[11px]">{String(price)} ر.س</span>;
                },
              },
              { label: "المدة", key: "duration_hours", render: (row) => `${(row as Record<string, unknown>).duration_hours ?? "—"} ساعة` },
            ]}
            statusKey="status"
            statusOptions={["draft", "published"]}
            onStatusChange={handleStatusChange}
            onEdit={(row) => window.location.href = `/admin/courses/${(row as Record<string, unknown>).id as string}`}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}