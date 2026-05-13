"use client";

import { useEffect, useState } from "react";
import { adminSelect, adminUpdate, adminDelete } from "../../../lib/admin";
import AdminPageHeader from "../component/AdminPageHeader";
import AdminTable from "../component/AdminTable";

const TABS = [
  { key: "membership", label: "طلبات العضوية", table: "membership_submissions" },
  { key: "courses", label: "تسجيلات الدورات", table: "course_enrollments" },
  { key: "events", label: "تسجيلات الفعاليات", table: "event_registrations" },
  { key: "volunteers", label: "طلبات التطوع", table: "volunteer_submissions" },
  { key: "media-centers", label: "طلبات المراكز", table: "media_center_submissions" },
  { key: "partners", label: "طلبات الشراكة", table: "partner_submissions" },
];

const STATUS_OPTIONS = ["pending", "contacted", "approved", "rejected"];
const STATUS_AR: Record<string, string> = {
  pending: "معلق",
  contacted: "تم التواصل",
  approved: "مقبول",
  rejected: "مرفوض",
};

export default function AdminSubmissions() {
  const [activeTab, setActiveTab] = useState("membership");
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  const currentTab = TABS.find((t) => t.key === activeTab)!;

  async function load() {
    setLoading(true);
    const { data } = await adminSelect(currentTab.table, {
      orderBy: "created_at",
      ascending: false,
    });
    setData(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [activeTab]);

  async function handleStatusChange(row: Record<string, unknown>, status: string) {
    await adminUpdate(currentTab.table, row.id as string, { status });
    load();
  }

  async function handleDelete(row: Record<string, unknown>) {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    await adminDelete(currentTab.table, row.id as string);
    load();
  }

  return (
    <div className="px-8 py-10" dir="rtl">
      <AdminPageHeader title="الطلبات" titleEn="Submissions" count={data.length} />

      <div className="flex items-center gap-2 flex-wrap mb-8 border-b border-[#D0B66A]/20 pb-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-[12px] font-black px-4 py-2 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
              activeTab === tab.key
                ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
            }`}
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-[#202151]/30 text-[13px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
          جارٍ التحميل...
        </p>
      ) : data.length === 0 ? (
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm p-16 text-center">
          <p
            className="text-[#202151]/25 text-[15px] font-black"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            لا توجد طلبات في هذه الفئة
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm overflow-hidden">
          <AdminTable
            data={data as ({ id: string } & Record<string, unknown>)[]}
            columns={[
              { label: "الاسم", key: "full_name" },
              { label: "البريد", key: "email" },
              { label: "الجوال", key: "phone" },
              {
                label: "الحالة",
                key: "status",
                render: (row) => {
                  const s = String((row as Record<string, unknown>).status ?? "pending");
                  const colors: Record<string, string> = {
                    pending: "text-[#D0B66A] bg-[#D0B66A]/10",
                    contacted: "text-blue-600 bg-blue-50",
                    approved: "text-green-600 bg-green-50",
                    rejected: "text-[#D61214] bg-[#D61214]/10",
                  };
                  return (
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-[1px] ${colors[s] ?? ""}`}
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {STATUS_AR[s] ?? s}
                    </span>
                  );
                },
              },
              {
                label: "التاريخ",
                key: "created_at",
                render: (row) => {
                  const d = (row as Record<string, unknown>).created_at;
                  return d ? new Date(String(d)).toLocaleDateString("ar-SA") : "—";
                },
              },
            ]}
            statusKey="status"
            statusOptions={STATUS_OPTIONS}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}