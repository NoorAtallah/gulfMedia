"use client";

import { useState, useEffect, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";

interface HeroSlide {
  id: string;
  slug: string;
  label_ar: string;
  label_en: string;
  subtitle_ar: string;
  href: string;
  img_url: string;
  display_order: number;
  is_active: boolean;
  updated_at: string;
}

const EMPTY_SLIDE: Omit<HeroSlide, "id" | "updated_at"> = {
  slug: "",
  label_ar: "",
  label_en: "",
  subtitle_ar: "",
  href: "/",
  img_url: "",
  display_order: 0,
  is_active: true,
};

export default function HeroSlidesAdmin() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const newFileRef = useRef<HTMLInputElement | null>(null);

  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<HeroSlide>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // Add modal state
  const [showAdd, setShowAdd] = useState(false);
  const [newSlide, setNewSlide] = useState({ ...EMPTY_SLIDE });
  const [addingImg, setAddingImg] = useState(false);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2500);
  };

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchSlides = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("display_order", { ascending: true });
    if (!error && data) setSlides(data as HeroSlide[]);
    setLoading(false);
  };

  useEffect(() => { fetchSlides(); }, []);

  // ─── Upload to Supabase Storage ───────────────────────────────────────────────
  // Bucket: "hero-slides" (create it in Supabase → Storage, set to public)
  const uploadImage = async (file: File, slug: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `hero/${slug}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("hero-slides")
      .upload(path, file, { upsert: true, cacheControl: "3600" });
    if (error) { showToast("فشل رفع الصورة: " + error.message, false); return null; }
    const { data } = supabase.storage.from("hero-slides").getPublicUrl(path);
    return data.publicUrl;
  };

  // ─── Edit existing row ────────────────────────────────────────────────────────
  const startEdit = (slide: HeroSlide) => {
    setEditingRow(slide.id);
    setDraft({ label_ar: slide.label_ar, label_en: slide.label_en, subtitle_ar: slide.subtitle_ar, href: slide.href, img_url: slide.img_url });
  };
  const cancelEdit = () => { setEditingRow(null); setDraft({}); };

  const saveEdit = async (id: string) => {
    setSaving(true);
    const { error } = await supabase.from("hero_slides").update(draft).eq("id", id);
    if (error) { showToast("خطأ أثناء الحفظ", false); }
    else { setSlides((p) => p.map((s) => s.id === id ? { ...s, ...draft } : s)); showToast("تم الحفظ"); cancelEdit(); }
    setSaving(false);
  };

  // Upload image for existing row (in edit mode)
  const handleRowUpload = async (slideId: string, slug: string, file: File) => {
    setUploading(slideId);
    const url = await uploadImage(file, slug);
    if (url) setDraft((d) => ({ ...d, img_url: url }));
    setUploading(null);
  };

  // ─── Toggle active ────────────────────────────────────────────────────────────
  const toggleActive = async (slide: HeroSlide) => {
    const val = !slide.is_active;
    setSlides((p) => p.map((s) => s.id === slide.id ? { ...s, is_active: val } : s));
    const { error } = await supabase.from("hero_slides").update({ is_active: val }).eq("id", slide.id);
    if (error) { setSlides((p) => p.map((s) => s.id === slide.id ? { ...s, is_active: !val } : s)); showToast("فشل تغيير الحالة", false); }
  };

  // ─── Reorder ──────────────────────────────────────────────────────────────────
  const reorder = async (id: string, dir: "up" | "down") => {
    const i = slides.findIndex((s) => s.id === id);
    if ((dir === "up" && i === 0) || (dir === "down" && i === slides.length - 1)) return;
    const j = dir === "up" ? i - 1 : i + 1;
    const next = [...slides];
    const a = next[i].display_order, b = next[j].display_order;
    next[i] = { ...next[i], display_order: b };
    next[j] = { ...next[j], display_order: a };
    next.sort((x, y) => x.display_order - y.display_order);
    setSlides(next);
    await Promise.all([
      supabase.from("hero_slides").update({ display_order: b }).eq("id", slides[i].id),
      supabase.from("hero_slides").update({ display_order: a }).eq("id", slides[j].id),
    ]);
  };

  // ─── Add new slide ────────────────────────────────────────────────────────────
  const handleNewUpload = async (file: File) => {
    if (!newSlide.slug) { showToast("أدخل الـ slug أولاً", false); return; }
    setAddingImg(true);
    const url = await uploadImage(file, newSlide.slug);
    if (url) setNewSlide((p) => ({ ...p, img_url: url }));
    setAddingImg(false);
  };

  const addSlide = async () => {
    if (!newSlide.slug || !newSlide.label_ar || !newSlide.label_en) {
      showToast("يرجى ملء الحقول المطلوبة", false);
      return;
    }
    setSaving(true);
    const payload = { ...newSlide, display_order: slides.length };
    const { data, error } = await supabase.from("hero_slides").insert(payload).select().single();
    if (error) { showToast("خطأ أثناء الإضافة: " + error.message, false); }
    else { setSlides((p) => [...p, data as HeroSlide]); showToast("تمت الإضافة"); setShowAdd(false); setNewSlide({ ...EMPTY_SLIDE }); }
    setSaving(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="w-full" dir="rtl">

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2 text-xs font-black rounded-sm pointer-events-none ${toast.ok ? "bg-[#202151] text-[#D0B66A]" : "bg-[#D61214] text-white"}`}
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#202151] font-black text-xl tracking-tight" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
            شرائح الهيرو
          </h1>
          <p className="text-[#202151]/40 text-[11px] font-bold tracking-widest italic mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Hero Slides · {slides.filter((s) => s.is_active).length} / {slides.length} active
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchSlides} className="text-[#202151]/40 hover:text-[#202151] text-[11px] font-black bg-transparent border-none cursor-pointer" style={{ fontFamily: "'Playfair Display', serif" }}>
            تحديث ↺
          </button>
          <button onClick={() => setShowAdd(true)} className="bg-[#D0B66A] text-[#202151] text-[11px] font-black px-4 py-2 rounded-sm hover:opacity-90 transition-opacity" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
            + إضافة شريحة
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#D0B66A]/20">
              {["#", "الصورة", "العنوان", "النص الفرعي", "الرابط", "الحالة", "الترتيب", "إجراءات"].map((h) => (
                <th key={h} className="text-right text-[#202151]/40 text-[11px] font-black tracking-widest px-4 py-3 whitespace-nowrap" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center py-16 text-[#202151]/25 text-sm font-black" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>جارٍ التحميل...</td></tr>
            ) : slides.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-16 text-[#202151]/25 text-sm font-black" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>لا توجد بيانات</td></tr>
            ) : slides.map((slide, i) => {
              const isEditing = editingRow === slide.id;
              const isUploading = uploading === slide.id;

              return (
                <tr key={slide.id} className={`border-b border-[#D0B66A]/10 transition-colors ${isEditing ? "bg-[#D0B66A]/5" : i % 2 === 0 ? "bg-white hover:bg-[#D0B66A]/[0.03]" : "bg-[#202151]/[0.02] hover:bg-[#D0B66A]/[0.03]"}`}>

                  {/* # */}
                  <td className="px-4 py-3 w-8">
                    <span className="text-[#202151]/25 text-[11px] font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </td>

                  {/* Image */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={isEditing ? (draft.img_url ?? slide.img_url) : slide.img_url} alt={slide.label_ar} className="w-16 h-11 object-cover rounded-sm flex-shrink-0" />
                        {isEditing && (
                          <>
                            <input ref={(el) => { fileRefs.current[slide.id] = el; }} type="file" accept="image/*" className="hidden"
                              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleRowUpload(slide.id, slide.slug, f); }} />
                            <button onClick={() => fileRefs.current[slide.id]?.click()} disabled={isUploading}
                              className="text-[#202151]/40 hover:text-[#D0B66A] text-[10px] font-black border border-[#202151]/15 hover:border-[#D0B66A]/50 px-2 py-1 rounded-sm bg-transparent cursor-pointer disabled:opacity-40 transition-colors whitespace-nowrap"
                              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                              {isUploading ? "..." : "↑ رفع صورة"}
                            </button>
                          </>
                        )}
                      </div>
                      {isEditing && (
                        <input type="text" value={draft.img_url ?? ""} dir="ltr" placeholder="أو الصق رابط الصورة هنا..."
                          onChange={(e) => setDraft((d) => ({ ...d, img_url: e.target.value }))}
                          className="w-full text-[10px] font-bold border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-2 py-1 bg-transparent outline-none text-[#202151]" />
                      )}
                    </div>
                  </td>

                  {/* Title */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <div className="flex flex-col gap-1.5 min-w-[140px]">
                        <input type="text" value={draft.label_ar ?? ""} placeholder="عربي" dir="rtl"
                          onChange={(e) => setDraft((d) => ({ ...d, label_ar: e.target.value }))}
                          className="text-xs font-black border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-2 py-1.5 bg-transparent outline-none text-[#202151] w-full"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }} />
                        <input type="text" value={draft.label_en ?? ""} placeholder="English" dir="ltr"
                          onChange={(e) => setDraft((d) => ({ ...d, label_en: e.target.value }))}
                          className="text-xs font-bold border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-2 py-1.5 bg-transparent outline-none text-[#202151] w-full"
                          style={{ fontFamily: "'Playfair Display', serif" }} />
                      </div>
                    ) : (
                      <div>
                        <p className="text-[#202151] text-[13px] font-black" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>{slide.label_ar}</p>
                        <p className="text-[#202151]/35 text-[11px] italic font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{slide.label_en}</p>
                      </div>
                    )}
                  </td>

                  {/* Subtitle */}
                  <td className="px-4 py-3 max-w-[180px]">
                    {isEditing ? (
                      <input type="text" value={draft.subtitle_ar ?? ""} dir="rtl"
                        onChange={(e) => setDraft((d) => ({ ...d, subtitle_ar: e.target.value }))}
                        className="text-xs font-bold border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-2 py-1.5 bg-transparent outline-none text-[#202151] w-full"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }} />
                    ) : (
                      <span className="text-[#202151]/55 text-xs font-bold line-clamp-2" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>{slide.subtitle_ar}</span>
                    )}
                  </td>

                  {/* Href */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input type="text" value={draft.href ?? ""} dir="ltr"
                        onChange={(e) => setDraft((d) => ({ ...d, href: e.target.value }))}
                        className="text-[11px] font-bold border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-2 py-1.5 bg-transparent outline-none text-[#202151] w-full min-w-[80px]" />
                    ) : (
                      <span className="text-[#202151]/40 text-[11px] font-bold font-mono" dir="ltr">{slide.href}</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(slide)}
                      className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-sm border-none cursor-pointer transition-colors ${slide.is_active ? "bg-[#202151]/[0.07] text-[#202151]" : "bg-[#D61214]/[0.06] text-[#D61214]/50"}`}
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                      <span>{slide.is_active ? "●" : "○"}</span>
                      {slide.is_active ? "مفعّل" : "مخفي"}
                    </button>
                  </td>

                  {/* Reorder */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1" dir="ltr">
                      <button onClick={() => reorder(slide.id, "up")} disabled={i === 0}
                        className="w-5 h-5 flex items-center justify-center text-[10px] text-[#202151]/30 hover:text-[#D0B66A] border border-[#202151]/12 hover:border-[#D0B66A]/50 rounded-sm bg-transparent cursor-pointer disabled:opacity-20 disabled:cursor-default transition-colors">↑</button>
                      <span className="text-[#202151]/25 text-[10px] font-black w-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{slide.display_order + 1}</span>
                      <button onClick={() => reorder(slide.id, "down")} disabled={i === slides.length - 1}
                        className="w-5 h-5 flex items-center justify-center text-[10px] text-[#202151]/30 hover:text-[#D0B66A] border border-[#202151]/12 hover:border-[#D0B66A]/50 rounded-sm bg-transparent cursor-pointer disabled:opacity-20 disabled:cursor-default transition-colors">↓</button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {isEditing ? (
                        <>
                          <button onClick={() => saveEdit(slide.id)} disabled={saving}
                            className="text-[#202151]/40 hover:text-[#D0B66A] text-[11px] font-black border border-[#D0B66A]/30 hover:border-[#D0B66A] px-2 py-1 rounded-sm bg-transparent cursor-pointer disabled:opacity-40 transition-colors"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            {saving ? "..." : "حفظ"}
                          </button>
                          <button onClick={cancelEdit}
                            className="text-[#D61214]/35 hover:text-[#D61214] text-[11px] font-black bg-transparent border-none cursor-pointer px-2 py-1 transition-colors"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                            إلغاء
                          </button>
                        </>
                      ) : (
                        <button onClick={() => startEdit(slide)}
                          className="text-[#202151]/35 hover:text-[#D0B66A] text-[11px] font-black bg-transparent border-none cursor-pointer px-2 py-1 transition-colors"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                          تعديل
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-[#D0B66A]/10 mt-1 pt-3 flex items-center justify-between px-4">
        <span className="text-[#202151]/25 text-[11px] font-black tracking-widest" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>{slides.length} شريحة</span>
        <span className="text-[#202151]/20 text-[10px] italic font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Gulf Media Platform · Hero Slides</span>
      </div>

      {/* ── Add Slide Modal ── */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#202151]/60 backdrop-blur-sm" dir="rtl">
          <div className="bg-white w-full max-w-lg mx-4 rounded-sm shadow-2xl">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#D0B66A]/20">
              <div>
                <h2 className="text-[#202151] font-black text-base" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>إضافة شريحة جديدة</h2>
                <p className="text-[#202151]/35 text-[10px] italic font-bold mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>New Hero Slide</p>
              </div>
              <button onClick={() => setShowAdd(false)} className="text-[#202151]/30 hover:text-[#D61214] text-lg font-black bg-transparent border-none cursor-pointer leading-none transition-colors">✕</button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 flex flex-col gap-4">

              {/* Slug */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#202151]/40 text-[11px] font-black tracking-widest" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>SLUG <span className="text-[#D61214]">*</span></label>
                <input type="text" value={newSlide.slug} dir="ltr" placeholder="e.g. media, sports"
                  onChange={(e) => setNewSlide((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                  className="text-xs font-bold border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-3 py-2 bg-transparent outline-none text-[#202151] w-full" />
                <p className="text-[#202151]/30 text-[10px] font-bold" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>معرّف فريد لا يتغير — يُستخدم لتخزين الصورة</p>
              </div>

              {/* Labels */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#202151]/40 text-[11px] font-black tracking-widest" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>العنوان العربي <span className="text-[#D61214]">*</span></label>
                  <input type="text" value={newSlide.label_ar} dir="rtl" placeholder="مثال: إعلام"
                    onChange={(e) => setNewSlide((p) => ({ ...p, label_ar: e.target.value }))}
                    className="text-xs font-black border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-3 py-2 bg-transparent outline-none text-[#202151] w-full"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#202151]/40 text-[11px] font-black tracking-widest" style={{ fontFamily: "'Playfair Display', serif" }}>English Label <span className="text-[#D61214]">*</span></label>
                  <input type="text" value={newSlide.label_en} dir="ltr" placeholder="e.g. Media"
                    onChange={(e) => setNewSlide((p) => ({ ...p, label_en: e.target.value }))}
                    className="text-xs font-bold border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-3 py-2 bg-transparent outline-none text-[#202151] w-full"
                    style={{ fontFamily: "'Playfair Display', serif" }} />
                </div>
              </div>

              {/* Subtitle */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#202151]/40 text-[11px] font-black tracking-widest" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>النص الفرعي</label>
                <input type="text" value={newSlide.subtitle_ar} dir="rtl" placeholder="وصف قصير يظهر أسفل العنوان"
                  onChange={(e) => setNewSlide((p) => ({ ...p, subtitle_ar: e.target.value }))}
                  className="text-xs font-bold border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-3 py-2 bg-transparent outline-none text-[#202151] w-full"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }} />
              </div>

              {/* Href */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#202151]/40 text-[11px] font-black tracking-widest" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>الرابط</label>
                <input type="text" value={newSlide.href} dir="ltr" placeholder="/page-slug"
                  onChange={(e) => setNewSlide((p) => ({ ...p, href: e.target.value }))}
                  className="text-xs font-bold border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-3 py-2 bg-transparent outline-none text-[#202151] w-full" />
              </div>

              {/* Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#202151]/40 text-[11px] font-black tracking-widest" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>الصورة</label>
                <div className="flex gap-2">
                  <input type="text" value={newSlide.img_url} dir="ltr" placeholder="https://... أو ارفع صورة"
                    onChange={(e) => setNewSlide((p) => ({ ...p, img_url: e.target.value }))}
                    className="flex-1 text-xs font-bold border border-[#202151]/15 focus:border-[#D0B66A] rounded-sm px-3 py-2 bg-transparent outline-none text-[#202151]" />
                  <input ref={newFileRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleNewUpload(f); }} />
                  <button onClick={() => newFileRef.current?.click()} disabled={addingImg || !newSlide.slug}
                    className="text-[#202151]/40 hover:text-[#D0B66A] text-[11px] font-black border border-[#202151]/15 hover:border-[#D0B66A]/50 px-3 py-2 rounded-sm bg-transparent cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                    {addingImg ? "..." : "↑ رفع"}
                  </button>
                </div>
                {newSlide.img_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={newSlide.img_url} alt="preview" className="w-full h-28 object-cover rounded-sm mt-1" />
                )}
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#D0B66A]/10">
              <button onClick={() => { setShowAdd(false); setNewSlide({ ...EMPTY_SLIDE }); }}
                className="text-[#D61214]/40 hover:text-[#D61214] text-xs font-black bg-transparent border-none cursor-pointer transition-colors"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                إلغاء
              </button>
              <button onClick={addSlide} disabled={saving}
                className="bg-[#202151] text-[#D0B66A] text-xs font-black px-6 py-2.5 rounded-sm hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer border-none"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                {saving ? "جارٍ الإضافة..." : "إضافة الشريحة"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}