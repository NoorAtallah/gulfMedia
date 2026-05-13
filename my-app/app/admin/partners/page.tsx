"use client";

import { useEffect, useState } from "react";
import { adminSelect, adminDelete } from "../../../lib/admin";
import AdminPageHeader from "../component/AdminPageHeader";
import AdminTable from "../component/AdminTable";

export default function AdminPartners() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await adminSelect("partners", {
      orderBy: "display_order",
      ascending: true,
    });
    setData(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(row: Record<string, unknown>) {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    await adminDelete("partners", row.id as string);
    load();
  }

  return (
    <div className="px-8 py-10" dir="rtl">
      <AdminPageHeader
        title="الشركاء والداعمون"
        titleEn="Partners"
        count={data.length}
        newHref="/admin/partners/new"
        newLabel="شريك جديد"
      />
      {loading ? (
        <p className="text-[#202151]/30 text-[13px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>جارٍ التحميل...</p>
      ) : (
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm overflow-hidden">
          <AdminTable
            data={data as ({ id: string } & Record<string, unknown>)[]}
            columns={[
              { label: "الاسم", key: "name_ar" },
              {
                label: "النوع",
                key: "type",
                render: (row) => {
                  const t = String((row as Record<string, unknown>).type ?? "");
                  return t === "partner"
                    ? <span className="text-[#D0B66A] bg-[#D0B66A]/10 text-[10px] font-black px-2 py-0.5 rounded-[1px]">شريك</span>
                    : <span className="text-[#202151] bg-[#202151]/8 text-[10px] font-black px-2 py-0.5 rounded-[1px]">داعم</span>;
                },
              },
              {
                label: "الموقع",
                key: "website_url",
                render: (row) => (row as Record<string, unknown>).website_url
                  ? <a href={String((row as Record<string, unknown>).website_url)} target="_blank" rel="noopener noreferrer" className="text-[#D0B66A] text-[11px] font-black no-underline hover:underline">رابط ↗</a>
                  : <span className="text-[#202151]/25 text-[11px]">—</span>,
              },
              { label: "الترتيب", key: "display_order" },
            ]}
            onEdit={(row) => window.location.href = `/admin/partners/${(row as Record<string, unknown>).id as string}`}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}