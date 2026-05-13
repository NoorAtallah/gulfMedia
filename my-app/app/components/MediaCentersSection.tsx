"use client";

import { useState } from "react";
import Link from "next/link";
import type { MediaCenter } from "@/lib/types";
import { submitMediaCenter } from "@/lib/queries/submissions";

type Props = { mediaCenters: MediaCenter[] };

const COUNTRIES = ["الكل", "السعودية", "الإمارات", "الكويت", "قطر", "عُمان", "البحرين"];
const COUNTRY_OPTIONS = ["السعودية", "الإمارات", "الكويت", "قطر", "عُمان", "البحرين"];

export default function MediaCentersSection({ mediaCenters }: Props) {
  const [active, setActive] = useState("الكل");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    center_name: "", email: "", phone: "", country: "", website_url: "", description_ar: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const filtered = active === "الكل"
    ? mediaCenters
    : mediaCenters.filter((c) => c.country === active);

  async function handleSubmit() {
    if (!form.center_name || !form.email) return;
    setStatus("loading");
    const { error } = await submitMediaCenter(form);
    setStatus(error ? "error" : "success");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .center-cell { transition: all 0.3s cubic-bezier(.2,0,0,1); }
        .center-cell:hover { border-color: rgba(208,182,106,0.5) !important; background: rgba(208,182,106,0.04) !important; }
        .center-cell:hover .center-arrow { opacity: 1 !important; }
        .center-cell:hover .center-name { color: #202151 !important; }
        .country-tab { transition: color 0.2s ease; position: relative; }
        .country-tab::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1.5px; background: #D0B66A; transform: scaleX(0); transition: transform 0.25s ease; }
        .country-tab.tab-active::after { transform: scaleX(1); }
        .modal-overlay { animation: fadeIn 0.2s ease; }
        .modal-box { animation: slideUp 0.3s cubic-bezier(.2,0,0,1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <section className="w-full bg-white py-24 px-6 md:px-14" dir="rtl">

        {/* ── HEADER ── */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#D61214]" />
              <span
                className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Directory · دليل
              </span>
            </div>
            <h2
              className="text-[#202151] font-black text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              المراكز الإعلامية
            </h2>
            <div className="w-12 h-px mt-4 bg-[#D0B66A] opacity-50" />
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              className="text-[#D0B66A] font-black text-[clamp(32px,4vw,48px)] leading-none tracking-[-0.02em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              ٨٥٠+
            </span>
            <span
              className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.15em]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Media Center
            </span>
          </div>
        </div>

        {/* ── COUNTRY TABS ── */}
        <div className="flex items-center gap-0 mb-10 overflow-x-auto border-b border-[#D0B66A]/25">
          {COUNTRIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`country-tab ${active === c ? "tab-active" : ""} whitespace-nowrap px-5 py-3 bg-transparent border-none cursor-pointer text-[13px] tracking-wide`}
              style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: active === c ? 900 : 700,
                color: active === c ? "#D0B66A" : "rgba(32,33,81,0.45)",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ── GRID ── */}
        <div
          className="grid gap-px bg-[#D0B66A]/12"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))" }}
        >
          {filtered.map((center) => (
            <Link
              key={center.id}
              href={center.website_url ?? "#"}
              target={center.website_url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="center-cell bg-white p-6 flex flex-col gap-3 no-underline border border-transparent min-h-[150px]"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-full border border-[#D0B66A]/30 bg-[#D0B66A]/6 flex items-center justify-center flex-shrink-0">
                  {center.logo_url ? (
                    <img src={center.logo_url} alt={center.name_ar} className="w-7 h-7 object-contain" />
                  ) : (
                    <span
                      className="text-[#D0B66A] font-black text-[16px]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {center.name_ar[0]}
                    </span>
                  )}
                </div>
                {center.country && (
                  <span
                    className="text-[#202151]/60 bg-[#202151]/6 text-[9px] font-black px-2 py-1 rounded-[1px] tracking-wide whitespace-nowrap"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {center.country}
                  </span>
                )}
              </div>

              {/* Name */}
              <p
                className="center-name text-[#202151]/70 text-[14px] font-black leading-[1.4] flex-1 transition-colors duration-300"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {center.name_ar}
              </p>

              {center.description_ar && (
                <p
                  className="text-[#202151]/40 text-[11px] font-bold leading-[1.6] line-clamp-2"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {center.description_ar}
                </p>
              )}

              <div className="flex items-center justify-between mt-auto">
                <span
                  className="text-[#202151]/25 text-[10px] italic font-bold tracking-[0.1em]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {center.website_url
                    ? (() => { try { return new URL(center.website_url).hostname.replace("www.", ""); } catch { return "—"; } })()
                    : "—"}
                </span>
                <span
                  className="center-arrow text-[#D0B66A] text-[10px] italic font-bold tracking-[0.1em] opacity-0 transition-opacity duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  عرض ←
                </span>
              </div>
            </Link>
          ))}

          {/* CTA cell */}
          <button
            onClick={() => setModalOpen(true)}
            className="bg-white p-6 flex flex-col items-center justify-center gap-4 border border-[#D0B66A]/20 min-h-[150px] cursor-pointer hover:border-[#D0B66A]/50 hover:bg-[#D0B66A]/3 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-full border border-[#D0B66A]/35 flex items-center justify-center">
              <span className="text-[#D0B66A] text-[22px] font-black leading-none">+</span>
            </div>
            <p
              className="text-[#D0B66A]/70 text-[12px] font-black text-center leading-[1.5] tracking-wide"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              سجّل مركزك الإعلامي
            </p>
          </button>
        </div>

        {/* ── BOTTOM RULE ── */}
        <div className="mt-16 flex items-center gap-4 border-t border-[#D0B66A]/25 pt-6">
          <span
            className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · المراكز الإعلامية
          </span>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/60 text-[11px] font-black"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ٦ دول خليجية
          </span>
        </div>

      </section>

      {/* ── MODAL ── */}
      {modalOpen && (
        <div
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202151]/80"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          dir="rtl"
        >
          <div className="modal-box bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-[#D0B66A]/20">
              <div className="flex items-center gap-3">
                <div className="w-5 h-px bg-[#D61214]" />
                <h3
                  className="text-[#202151] font-black text-[18px] tracking-[-0.01em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  تسجيل مركز إعلامي
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#202151]/30 hover:text-[#202151] text-[20px] font-black transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            {status === "success" ? (
              <div className="p-10 flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#D0B66A]/10 border border-[#D0B66A]/30 flex items-center justify-center">
                  <span className="text-[#D0B66A] text-[22px]">✓</span>
                </div>
                <p
                  className="text-[#202151] text-[18px] font-black text-center"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  تم إرسال الطلب بنجاح
                </p>
                <p
                  className="text-[#202151]/50 text-[13px] font-bold text-center leading-[1.8]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  سيراجع فريقنا طلبك ويتواصل معك قريباً
                </p>
                <button
                  onClick={() => { setModalOpen(false); setStatus("idle"); setForm({ center_name: "", email: "", phone: "", country: "", website_url: "", description_ar: "" }); }}
                  className="text-[#202151] bg-[#D0B66A] text-[13px] font-black px-8 py-3 rounded-sm tracking-wide hover:opacity-85 transition-opacity mt-2"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <div className="p-6 md:p-8 flex flex-col gap-5">

                {/* Center name */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[#202151] text-[11px] font-black tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    اسم المركز الإعلامي <span className="text-[#D61214]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="أدخل اسم المركز"
                    value={form.center_name}
                    onChange={(e) => setForm({ ...form, center_name: e.target.value })}
                    className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal rounded-sm"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[#202151] text-[11px] font-black tracking-wide"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      البريد الإلكتروني <span className="text-[#D61214]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal rounded-sm"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      dir="ltr"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[#202151] text-[11px] font-black tracking-wide"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      رقم الجوال
                    </label>
                    <input
                      type="tel"
                      placeholder="+966 5X XXX XXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal rounded-sm"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Country + Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[#202151] text-[11px] font-black tracking-wide"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      الدولة
                    </label>
                    <select
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 rounded-sm cursor-pointer"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      <option value="">اختر الدولة</option>
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[#202151] text-[11px] font-black tracking-wide"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      الموقع الإلكتروني
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={form.website_url}
                      onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                      className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal rounded-sm"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[#202151] text-[11px] font-black tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    وصف المركز
                  </label>
                  <textarea
                    placeholder="نبذة مختصرة عن المركز الإعلامي..."
                    value={form.description_ar}
                    onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
                    rows={3}
                    className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal resize-none rounded-sm"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  />
                </div>

                {status === "error" && (
                  <p
                    className="text-[#D61214] text-[12px] font-black"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    حدث خطأ، يرجى المحاولة مجدداً
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-[#D0B66A]/15">
                  <button
                    onClick={handleSubmit}
                    disabled={status === "loading" || !form.center_name || !form.email}
                    className="flex-1 text-[#202151] bg-[#D0B66A] text-[14px] font-black py-3.5 rounded-sm tracking-wide transition-opacity duration-200 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {status === "loading" ? "جارٍ الإرسال..." : "أرسل الطلب"}
                  </button>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-[#202151]/40 text-[13px] font-black hover:text-[#202151] transition-colors duration-200 bg-transparent border-none cursor-pointer"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    إلغاء
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}