"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminPageHeader from "../component/AdminPageHeader";
import AdminTable from "../component/AdminTable";

export default function AdminEvents() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: true });
    setData(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(row: Record<string, unknown>) {
    if (!confirm("هل أنت متأكد من حذف هذه الفعالية؟")) return;
    await supabase.from("events").delete().eq("id", row.id as string);
    load();
  }

  async function handleStatusChange(row: Record<string, unknown>, status: string) {
    await supabase.from("events").update({ status }).eq("id", row.id as string);
    load();
  }

  return (
    <div className="px-8 py-10" dir="rtl">
      <AdminPageHeader
        title="الفعاليات"
        titleEn="Events"
        count={data.length}
        newHref="/admin/events/new"
        newLabel="فعالية جديدة"
      />
      {loading ? (
        <p className="text-[#202151]/30 text-[13px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>جارٍ التحميل...</p>
      ) : (
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm overflow-hidden">
          <AdminTable
            data={data as ({ id: string } & Record<string, unknown>)[]}
            columns={[
              { label: "العنوان", key: "title_ar" },
              { label: "المكان", key: "location_ar" },
              {
                label: "النوع",
                key: "location_type",
                render: (row) => {
                  const t = String((row as Record<string, unknown>).location_type ?? "—");
                  const map: Record<string, string> = { online: "أونلاين", "in-person": "حضوري", hybrid: "هجين" };
                  return map[t] ?? t;
                },
              },
              {
                label: "البداية",
                key: "starts_at",
                render: (row) => {
                  const d = (row as Record<string, unknown>).starts_at;
                  return d ? new Date(String(d)).toLocaleDateString("ar-SA") : "—";
                },
              },
              {
                label: "المقاعد",
                key: "capacity",
                render: (row) => `${(row as Record<string, unknown>).capacity ?? "—"} مقعد`,
              },
            ]}
            statusKey="status"
            statusOptions={["draft", "published"]}
            onStatusChange={handleStatusChange}
            onEdit={(row) => window.location.href = `/admin/events/${(row as Record<string, unknown>).id as string}`}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}