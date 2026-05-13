"use client";

import { useState } from "react";
import type { MembershipPlan } from "@/lib/types";
import { submitMembership } from "@/lib/queries/submissions";

type Props = { plans: MembershipPlan[] };

const STATIC_TIERS = [
  {
    nameAr: "عضو عادي",
    nameEn: "Basic",
    number: "٠١",
    highlight: false,
    locked: ["نشر المقالات", "صفحة بروفايل احترافية", "التواصل المباشر مع الإعلاميين"],
  },
  {
    nameAr: "عضو إعلامي",
    nameEn: "Journalist",
    number: "٠٢",
    highlight: true,
    locked: [],
  },
  {
    nameAr: "عضو داعم",
    nameEn: "Supporter",
    number: "٠٣",
    highlight: false,
    locked: [],
  },
];

function MembershipModal({
  plan,
  onClose,
}: {
  plan: MembershipPlan;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", country: "", specialty: "", notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit() {
    if (!form.full_name || !form.email) return;
    setStatus("loading");
    const { error } = await submitMembership({ ...form, plan_id: plan.id });
    setStatus(error ? "error" : "success");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202151]/80"
      style={{ animation: "fadeIn 0.2s ease" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      dir="rtl"
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ animation: "slideUp 0.3s cubic-bezier(.2,0,0,1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-[#D0B66A]/20">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="w-5 h-px bg-[#D61214]" />
              <h3
                className="text-[#202151] font-black text-[18px] tracking-[-0.01em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                التسجيل في {plan.name_ar}
              </h3>
            </div>
            <span
              className="text-[#202151]/35 text-[11px] italic font-bold tracking-[0.15em] mr-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {plan.price === 0 ? "Free · مجاني" : `${plan.price} SAR / month`}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#202151]/30 hover:text-[#202151] text-[18px] font-black transition-colors duration-200 bg-transparent border-none cursor-pointer w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

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
              سيتواصل معك فريقنا قريباً لاستكمال التسجيل
            </p>
            <button
              onClick={onClose}
              className="text-[#202151] bg-[#D0B66A] text-[13px] font-black px-8 py-3 rounded-sm tracking-wide hover:opacity-85 transition-opacity mt-2"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              إغلاق
            </button>
          </div>
        ) : (
          <div className="p-6 md:p-8 flex flex-col gap-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-[#202151] text-[11px] font-black tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  الاسم الكامل <span className="text-[#D61214]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal rounded-sm"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                />
              </div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {["السعودية", "الإمارات", "الكويت", "قطر", "عُمان", "البحرين", "أخرى"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-[#202151] text-[11px] font-black tracking-wide"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                التخصص الإعلامي
              </label>
              <select
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 rounded-sm cursor-pointer"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                <option value="">اختر تخصصك</option>
                {["صحافة رقمية", "إعلام مرئي", "صحافة استقصائية", "إعلام رقمي", "صحافة اقتصادية", "صحافة سياسية", "صحافة تقنية", "إنتاج إعلامي", "أخرى"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-[#202151] text-[11px] font-black tracking-wide"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                ملاحظات إضافية
              </label>
              <textarea
                placeholder="أي معلومات إضافية تودّ مشاركتها..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
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

            <div className="flex items-center gap-4 pt-4 border-t border-[#D0B66A]/15">
              <button
                onClick={handleSubmit}
                disabled={status === "loading" || !form.full_name || !form.email}
                className="flex-1 text-[#202151] bg-[#D0B66A] text-[14px] font-black py-3.5 rounded-sm tracking-wide transition-opacity duration-200 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {status === "loading" ? "جارٍ التسجيل..." : "سجّل الآن"}
              </button>
              <button
                onClick={onClose}
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
  );
}

export default function MembershipSection({ plans }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);

  const tiers = STATIC_TIERS.map((static_, i) => ({
    ...static_,
    plan: plans[i] ?? null,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .tier-card { transition: transform 0.4s cubic-bezier(.2,0,0,1), box-shadow 0.3s ease; cursor: pointer; }
        .tier-card:hover { transform: translateY(-8px); box-shadow: 0 12px 40px rgba(32,33,81,0.1); }
        .tier-card.highlighted { transform: translateY(-16px); box-shadow: 0 16px 48px rgba(208,182,106,0.12); }
        .tier-card.highlighted:hover { transform: translateY(-20px); }
      `}</style>

      <section className="w-full bg-white py-24 px-6 md:px-14" dir="rtl">

        {/* ── HEADER ── */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-6 h-px bg-[#D61214]" />
            <span
              className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Membership · عضوية
            </span>
            <div className="w-6 h-px bg-[#D61214]" />
          </div>

          <h2
            className="text-[#202151] font-black text-[clamp(32px,4vw,56px)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            اختر عضويتك
          </h2>

          <p
            className="text-[#202151]/35 text-[14px] italic font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Three tiers · three paths · one platform
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-[#D0B66A]/20" />
            <span className="text-[#D0B66A]/40 text-[8px]">✦</span>
            <div className="h-px w-16 bg-[#D0B66A]/20" />
          </div>
        </div>

        {/* ── TIER CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {tiers.map(({ nameAr, nameEn, number, highlight, locked, plan }) => {
            const features = (plan?.features as string[]) ?? [];
            const price = plan?.price ?? 0;
            const desc = plan?.description_ar ?? "";
            const cta = nameEn === "Basic" ? "ابدأ مجاناً" : nameEn === "Journalist" ? "انضم كإعلامي" : "ادعم المنصة";

            return (
              <div
                key={nameEn}
                className={`tier-card ${highlight ? "highlighted" : ""} overflow-hidden rounded-sm`}
                style={{
                  border: highlight ? `1px solid #D0B66A` : `0.5px solid rgba(32,33,81,0.1)`,
                  background: highlight
                    ? `linear-gradient(160deg, #202151 0%, #1a1b50 100%)`
                    : "#FFFFFF",
                }}
              >
                {/* Top badge */}
                {highlight && (
                  <div
                    className="w-full py-2 text-center text-[#202151] bg-[#D0B66A] text-[11px] font-black tracking-[0.1em]"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    الأكثر اختياراً
                  </div>
                )}

                <div className="p-8">
                  {/* Number + name + price */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p
                        className="text-[#D0B66A] text-[11px] italic font-bold opacity-60 tracking-[0.2em] mb-1.5"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {number} · {nameEn}
                      </p>
                      <h3
                        className="font-black text-[22px] leading-[1.2] tracking-[-0.01em]"
                        style={{
                          fontFamily: "'Noto Kufi Arabic', sans-serif",
                          color: highlight ? "#F5F1E8" : "#202151",
                        }}
                      >
                        {nameAr}
                      </h3>
                    </div>

                    <div dir="ltr" className="text-left flex-shrink-0">
                      <span
                        className="font-black leading-none"
                        style={{
                          fontFamily: "'Noto Kufi Arabic', sans-serif",
                          fontSize: price === 0 ? "20px" : "32px",
                          color: highlight ? "#D0B66A" : "#202151",
                        }}
                      >
                        {price === 0 ? "مجاني" : price}
                      </span>
                      {price > 0 && (
                        <span
                          className="block text-[10px] italic font-bold opacity-35 tracking-[0.1em] mt-0.5"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: highlight ? "#F5F1E8" : "#202151",
                          }}
                        >
                          ريال / شهر
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Desc */}
                  {desc && (
                    <p
                      className="text-[13px] font-bold leading-[1.7] mb-6 pb-6"
                      style={{
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        color: highlight ? "#F5F1E8" : "#202151",
                        opacity: 0.55,
                        borderBottom: highlight
                          ? "0.5px solid rgba(208,182,106,0.15)"
                          : "0.5px solid rgba(32,33,81,0.1)",
                      }}
                    >
                      {desc}
                    </p>
                  )}

                  {/* Features */}
                  <div className="flex flex-col gap-3 mb-8">
                    {features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span
                          className="text-[12px] flex-shrink-0"
                          style={{ color: highlight ? "#D0B66A" : "#2E7D32" }}
                        >
                          ✓
                        </span>
                        <span
                          className="text-[13px] font-bold leading-[1.4]"
                          style={{
                            fontFamily: "'Noto Kufi Arabic', sans-serif",
                            color: highlight ? "#F5F1E8" : "#202151",
                            opacity: 0.75,
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                    {locked.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-[#202151]/20 text-[12px] flex-shrink-0">✕</span>
                        <span
                          className="text-[#202151]/20 text-[13px] font-bold leading-[1.4] line-through decoration-[#202151]/15"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => plan && setSelectedPlan(plan)}
                    disabled={!plan}
                    className={`w-full py-3.5 text-[14px] font-black tracking-wide rounded-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                      highlight
                        ? "text-[#202151] bg-[#D0B66A] hover:opacity-85"
                        : "text-[#202151]/50 bg-transparent border border-[#202151]/15 hover:border-[#D0B66A]/40 hover:text-[#D0B66A]"
                    }`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM NOTE ── */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#D0B66A]/25 pt-6">
          <span
            className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.15em] text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            جميع العضويات تشمل دعماً مباشراً من فريق المنصة · All memberships include direct platform support
          </span>
          <span
            className="text-[#D0B66A]/60 text-[11px] font-black whitespace-nowrap"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            يمكن الإلغاء في أي وقت
          </span>
        </div>

      </section>

      {/* ── MODAL ── */}
      {selectedPlan && (
        <MembershipModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </>
  );
}