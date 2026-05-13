"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminPageHeader from "../component/AdminPageHeader";
import AdminTable from "../component/AdminTable";
import type { Article } from "@/lib/types";
import Link from "next/link";

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase
      .from("articles")
      .select("*, journalist:journalists(full_name_ar), category:categories(name_ar)")
      .order("created_at", { ascending: false });
    setArticles(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(row: Article) {
    if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) return;
    await supabase.from("articles").delete().eq("id", row.id);
    load();
  }

  async function handleStatusChange(row: Article, status: string) {
    await supabase.from("articles").update({ status }).eq("id", row.id);
    load();
  }

  return (
    <div className="px-8 py-10" dir="rtl">
      <AdminPageHeader
        title="المقالات"
        titleEn="Articles"
        count={articles.length}
        newHref="/admin/articles/new"
        newLabel="مقال جديد"
      />

      {loading ? (
        <p className="text-[#202151]/30 text-[13px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
          جارٍ التحميل...
        </p>
      ) : (
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm overflow-hidden">
          <AdminTable
            data={articles}
            columns={[
              {
                label: "العنوان",
                key: "title_ar",
                render: (row) => (
                  <span className="font-black text-[13px] line-clamp-1 max-w-xs block">{row.title_ar}</span>
                ),
              },
              {
                label: "الكاتب",
                key: "journalist",
                render: (row) => (row as Record<string, unknown>).journalist
                  ? String(((row as Record<string, unknown>).journalist as Record<string, unknown>).full_name_ar)
                  : "—",
              },
              {
                label: "التصنيف",
                key: "category",
                render: (row) => (row as Record<string, unknown>).category
                  ? String(((row as Record<string, unknown>).category as Record<string, unknown>).name_ar)
                  : "—",
              },
              {
                label: "مميز",
                key: "is_featured",
                render: (row) => row.is_featured
                  ? <span className="text-[#D0B66A] font-black text-[11px]">✓ مميز</span>
                  : <span className="text-[#202151]/25 text-[11px]">—</span>,
              },
              {
                label: "التاريخ",
                key: "published_at",
                render: (row) => row.published_at
                  ? new Date(row.published_at).toLocaleDateString("ar-SA")
                  : "—",
              },
            ]}
            statusKey="status"
            statusOptions={["draft", "published"]}
            onStatusChange={handleStatusChange}
            onEdit={(row) => window.location.href = `/admin/articles/${row.id}`}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}