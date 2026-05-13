"use client";
import { useEffect, useState } from "react";
import { adminSelect, adminDelete, adminUpdate } from "../../../lib/admin";
import AdminPageHeader from "../component/AdminPageHeader";
import AdminTable from "../component/AdminTable";

export default function AdminPodcasts() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await adminSelect("podcasts", {
      orderBy: "created_at",
      ascending: false,
    });
    setData(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(row: Record<string, unknown>) {
    if (!confirm("هل أنت متأكد من حذف هذه الحلقة؟")) return;
    await adminDelete("podcasts", row.id as string);
    load();
  }

  async function handleStatusChange(row: Record<string, unknown>, status: string) {
    await adminUpdate("podcasts", row.id as string, { status });
    load();
  }

  return (
    <div className="px-8 py-10" dir="rtl">
      <AdminPageHeader
        title="البودكاست"
        titleEn="Podcasts"
        count={data.length}
        newHref="/admin/podcasts/new"
        newLabel="حلقة جديدة"
      />
      {loading ? (
        <p className="text-[#202151]/30 text-[13px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
          جارٍ التحميل...
        </p>
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
              { label: "الحلقة", key: "episode_number" },
              { label: "الموسم", key: "season_number" },
              {
                label: "مميز",
                key: "is_featured",
                render: (row) => (row as Record<string, unknown>).is_featured
                  ? <span className="text-[#D0B66A] font-black text-[11px]">✓</span>
                  : <span className="text-[#202151]/25 text-[11px]">—</span>,
              },
              {
                label: "الحالة",
                key: "status",
                render: (row) => {
                  const s = String((row as Record<string, unknown>).status ?? "draft");
                  return (
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-[1px] ${
                      s === "published" ? "text-green-600 bg-green-50" : "text-[#D0B66A] bg-[#D0B66A]/10"
                    }`} style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                      {s === "published" ? "منشور" : "مسودة"}
                    </span>
                  );
                },
              },
            ]}
            statusKey="status"
            statusOptions={["draft", "published"]}
            onStatusChange={handleStatusChange}
            onEdit={(row) => window.location.href = `/admin/podcasts/${(row as Record<string, unknown>).id as string}`}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}