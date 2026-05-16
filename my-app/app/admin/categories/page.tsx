"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { adminDelete, adminInsert } from "../../../lib/admin";
import AdminTable from "../component/AdminTable";

interface Category {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  created_at: string;
}

interface Specialty {
  id: string;
  name: string;
  created_at: string;
}

export default function CategoriesPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddCat, setShowAddCat] = useState(false);
  const [catForm, setCatForm] = useState({ name_ar: "", name_en: "", slug: "" });

  const [showAddSpec, setShowAddSpec] = useState(false);
  const [specForm, setSpecForm] = useState({ name: "" });

  const [saving, setSaving] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: cats }, { data: specs }] = await Promise.all([
      supabase.from("categories").select("*").order("name_ar"),
      supabase.from("journalist_specialties").select("*").order("name"),
    ]);
    if (cats) setCategories(cats);
    if (specs) setSpecialties(specs);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  // ── Categories ──
  const handleAddCat = async () => {
    if (!catForm.name_ar || !catForm.name_en || !catForm.slug) return;
    setSaving(true);
    await adminInsert("categories", catForm);
    setCatForm({ name_ar: "", name_en: "", slug: "" });
    setShowAddCat(false);
    await fetchAll();
    setSaving(false);
  };

  const handleDeleteCat = async (row: Category) => {
    if (!confirm("حذف هذا التصنيف؟")) return;
    await adminDelete("categories", row.id);
    await fetchAll();
  };

  // ── Specialties ──
  const handleAddSpec = async () => {
    if (!specForm.name.trim()) return;
    setSaving(true);
    await adminInsert("journalist_specialties", { name: specForm.name.trim() });
    setSpecForm({ name: "" });
    setShowAddSpec(false);
    await fetchAll();
    setSaving(false);
  };

  const handleDeleteSpec = async (row: Specialty) => {
    if (!confirm(`حذف التخصص "${row.name}"؟`)) return;
    await adminDelete("journalist_specialties", row.id);
    await fetchAll();
  };

  const SectionHeader = ({
    title, titleEn, onAdd
  }: { title: string; titleEn: string; onAdd: () => void }) => (
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-5 h-px bg-[#D61214]" />
          <span className="text-[#D0B66A] text-[10px] italic font-bold tracking-[0.3em] opacity-70"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {titleEn}
          </span>
        </div>
        <h2 className="text-[#202151] font-black text-[22px] tracking-[-0.02em]"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
          {title}
        </h2>
      </div>
      <button onClick={onAdd}
        className="bg-[#D0B66A] text-[#202151] text-[13px] font-black px-6 py-2.5 rounded-sm hover:opacity-90 transition-opacity cursor-pointer border-none"
        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
        + إضافة
      </button>
    </div>
  );

  const InlineForm = ({
    fields, onSave, onCancel, saving
  }: {
    fields: { key: string; label: string; dir?: string }[];
    values: Record<string, string>;
    onChange: (key: string, val: string) => void;
    onSave: () => void;
    onCancel: () => void;
    saving: boolean;
  }) => null; // unused — inlined below for simplicity

  return (
    <div className="px-8 py-10 max-w-4xl" dir="rtl">

      {/* ── CATEGORIES ── */}
      <SectionHeader
        title="تصنيفات المحتوى"
        titleEn="Content Categories"
        onAdd={() => setShowAddCat(true)}
      />

      {showAddCat && (
        <div className="bg-white border border-[#D0B66A]/20 rounded-sm p-6 mb-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { key: "name_ar", label: "الاسم عربي", dir: "rtl" },
              { key: "name_en", label: "الاسم إنجليزي", dir: "ltr" },
              { key: "slug", label: "Slug", dir: "ltr" },
            ].map((f) => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <label className="text-[#202151]/40 text-[11px] font-black tracking-widest"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {f.label}
                </label>
                <input
                  type="text"
                  value={catForm[f.key as keyof typeof catForm]}
                  dir={f.dir}
                  onChange={(e) => {
                    const val = f.key === "slug"
                      ? e.target.value.toLowerCase().replace(/\s+/g, "-")
                      : e.target.value;
                    setCatForm((p) => ({ ...p, [f.key]: val }));
                  }}
                  className="bg-[#202151]/3 border border-[#202151]/15 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-3 py-2.5 outline-none rounded-sm transition-colors"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#D0B66A]/10">
            <button onClick={handleAddCat} disabled={saving}
              className="bg-[#D0B66A] text-[#202151] text-[13px] font-black px-8 py-2.5 rounded-sm hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer border-none"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
              {saving ? "جارٍ الحفظ..." : "حفظ"}
            </button>
            <button onClick={() => setShowAddCat(false)}
              className="text-[#D61214]/40 hover:text-[#D61214] text-[13px] font-black bg-transparent border-none cursor-pointer transition-colors"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-[#D0B66A]/15 rounded-sm mb-14">
        {loading ? (
          <p className="text-center py-16 text-[#202151]/25 text-sm font-black"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
            جارٍ التحميل...
          </p>
        ) : (
          <AdminTable
            columns={[
              { label: "الاسم عربي", key: "name_ar" },
              { label: "الاسم إنجليزي", key: "name_en" },
              { label: "Slug", key: "slug" },
            ]}
            data={categories}
            onDelete={handleDeleteCat}
          />
        )}
      </div>

      {/* ── JOURNALIST SPECIALTIES ── */}
      <SectionHeader
        title="تخصصات الإعلاميين"
        titleEn="Journalist Specialties"
        onAdd={() => setShowAddSpec(true)}
      />

      {showAddSpec && (
        <div className="bg-white border border-[#D0B66A]/20 rounded-sm p-6 mb-6">
          <div className="flex flex-col gap-1.5 max-w-xs">
            <label className="text-[#202151]/40 text-[11px] font-black tracking-widest"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
              اسم التخصص
            </label>
            <input
              type="text"
              value={specForm.name}
              dir="rtl"
              onChange={(e) => setSpecForm({ name: e.target.value })}
              className="bg-[#202151]/3 border border-[#202151]/15 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-3 py-2.5 outline-none rounded-sm transition-colors"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            />
          </div>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#D0B66A]/10">
            <button onClick={handleAddSpec} disabled={saving}
              className="bg-[#D0B66A] text-[#202151] text-[13px] font-black px-8 py-2.5 rounded-sm hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer border-none"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
              {saving ? "جارٍ الحفظ..." : "حفظ"}
            </button>
            <button onClick={() => setShowAddSpec(false)}
              className="text-[#D61214]/40 hover:text-[#D61214] text-[13px] font-black bg-transparent border-none cursor-pointer transition-colors"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
              إلغاء
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-[#D0B66A]/15 rounded-sm">
        {loading ? (
          <p className="text-center py-16 text-[#202151]/25 text-sm font-black"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
            جارٍ التحميل...
          </p>
        ) : (
          <AdminTable
            columns={[{ label: "التخصص", key: "name" }]}
            data={specialties}
            onDelete={handleDeleteSpec}
          />
        )}
      </div>
    </div>
  );
}