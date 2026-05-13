"use client";

import { useEffect, useRef, useState } from "react";
import type { Partner } from "@/lib/types";
import { submitPartner } from "@/lib/queries/submissions";
type Props = { partners: Partner[] };

type ModalType = "partner" | "supporter" | null;

function MarqueeRow({ items, reverse = false }: { items: Partner[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let x = reverse ? 0 : -(trackRef.current?.scrollWidth ?? 0) / 2;
    const speed = reverse ? -0.4 : 0.4;

    const animate = () => {
      const el = trackRef.current;
      if (!el) return;
      const half = el.scrollWidth / 2;
      x += speed;
      if (!reverse && x <= -half) x = 0;
      if (reverse && x >= 0) x = -half;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [reverse]);

  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-4 whitespace-nowrap will-change-transform py-2"
        style={{ direction: "ltr" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-4 px-8 py-4 border border-[#D0B66A]/20 bg-[#D0B66A]/3 cursor-pointer transition-all duration-200 hover:border-[#D0B66A]/45 hover:bg-[#D0B66A]/7 rounded-sm"
          >
            <div className="w-9 h-9 rounded-full border border-[#D0B66A]/30 bg-[#D0B66A]/8 flex items-center justify-center flex-shrink-0">
              {item.logo_url ? (
                <img src={item.logo_url} alt={item.name_ar} className="w-6 h-6 object-contain" />
              ) : (
                <span
                  className="text-[#D0B66A] font-black text-[13px]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {item.name_ar[0]}
                </span>
              )}
            </div>

            <div dir="rtl">
              <p
                className="text-[#202151] text-[13px] font-black leading-[1.2] opacity-80"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {item.name_ar}
              </p>
              <p
                className="text-[#D0B66A] text-[10px] italic font-bold opacity-60 tracking-[0.1em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {item.type === "partner" ? "شريك" : "داعم"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnerModal({
  type,
  onClose,
}: {
  type: ModalType;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "", organization: "", notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

async function handleSubmit() {
  if (!form.full_name || !form.email) return;
  setStatus("loading");
  const { error } = await submitPartner({ ...form, type: type! });
  setStatus(error ? "error" : "success");
}

  const title = type === "partner" ? "انضم كشريك" : "انضم كداعم";
  const subtitle = type === "partner"
    ? "Partner with Gulf Media Platform"
    : "Support Gulf Media Platform";

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
                {title}
              </h3>
            </div>
            <span
              className="text-[#202151]/35 text-[11px] italic font-bold tracking-[0.15em] mr-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {subtitle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#202151]/30 hover:text-[#202151] text-[18px] font-black transition-colors duration-200 bg-transparent border-none cursor-pointer w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Body */}
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
              onClick={onClose}
              className="text-[#202151] bg-[#D0B66A] text-[13px] font-black px-8 py-3 rounded-sm tracking-wide hover:opacity-85 transition-opacity mt-2"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              إغلاق
            </button>
          </div>
        ) : (
          <div className="p-6 md:p-8 flex flex-col gap-5">

            {/* Name + Organization */}
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
                  اسم الجهة / المؤسسة
                </label>
                <input
                  type="text"
                  placeholder="اسم الشركة أو المؤسسة"
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal rounded-sm"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                />
              </div>
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

            {/* Notes */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[#202151] text-[11px] font-black tracking-wide"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                رسالتك
              </label>
              <textarea
                placeholder={type === "partner" ? "أخبرنا عن مؤسستك وكيف تريد الشراكة..." : "أخبرنا عن مؤسستك وكيف تريد دعم المنصة..."}
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

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#D0B66A]/15">
              <button
                onClick={handleSubmit}
                disabled={status === "loading" || !form.full_name || !form.email}
                className="flex-1 text-[#202151] bg-[#D0B66A] text-[14px] font-black py-3.5 rounded-sm tracking-wide transition-opacity duration-200 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {status === "loading" ? "جارٍ الإرسال..." : "أرسل الطلب"}
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

export default function PartnersSection({ partners }: Props) {
  const [modal, setModal] = useState<ModalType>(null);

  const partnerItems = partners.filter((p) => p.type === "partner");
  const supporterItems = partners.filter((p) => p.type === "supporter");

  const partnersToShow = partnerItems.length > 0 ? partnerItems : [];
  const supportersToShow = supporterItems.length > 0 ? supporterItems : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
      `}</style>

      <section className="w-full bg-white py-24 overflow-hidden" dir="rtl">

        {/* ── HEADER ── */}
        <div className="px-6 md:px-14 mb-16">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#D61214]" />
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Network · شبكة
                </span>
              </div>
              <h2
                className="text-[#202151] font-black text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                الشركاء والداعمون
              </h2>
              <div className="w-12 h-px mt-4 bg-[#D0B66A] opacity-50" />
            </div>

            <div className="flex items-center gap-10 md:gap-12">
              {[
                { n: `${partnerItems.length || "٤٠"}+`, l: "شريك" },
                { n: `${supporterItems.length || "٢٠"}+`, l: "داعم" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-end gap-1">
                  <span
                    className="text-[#D0B66A] font-black text-[clamp(28px,3vw,40px)] leading-none tracking-[-0.02em]"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {s.n}
                  </span>
                  <span
                    className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.15em]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PARTNERS LABEL ── */}
        <div className="px-6 md:px-14 mb-5 flex items-center gap-4">
          <span
            className="text-[#D0B66A] text-[11px] font-black opacity-70 tracking-wide"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            الشركاء
          </span>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
        </div>

        {/* ── PARTNERS MARQUEE ── */}
        {partnersToShow.length > 0 ? (
          <MarqueeRow items={partnersToShow} reverse={false} />
        ) : (
          <div className="px-6 md:px-14 py-8 text-center">
            <p
              className="text-[#202151]/25 text-[13px] font-bold italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              سيتم إضافة الشركاء قريباً
            </p>
          </div>
        )}

        {/* ── DIVIDER ── */}
        <div className="px-6 md:px-14 my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/35 text-[11px] italic font-bold tracking-[0.2em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ✦
          </span>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
        </div>

        {/* ── SUPPORTERS LABEL ── */}
        <div className="px-6 md:px-14 mb-5 flex items-center gap-4">
          <span
            className="text-[#202151]/50 text-[11px] font-black tracking-wide"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            الداعمون
          </span>
          <div className="flex-1 h-px bg-[#202151]/8" />
        </div>

        {/* ── SUPPORTERS MARQUEE ── */}
        {supportersToShow.length > 0 ? (
          <MarqueeRow items={supportersToShow} reverse={true} />
        ) : (
          <div className="px-6 md:px-14 py-8 text-center">
            <p
              className="text-[#202151]/25 text-[13px] font-bold italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              سيتم إضافة الداعمين قريباً
            </p>
          </div>
        )}

        {/* ── BOTTOM CTA ── */}
        <div className="px-6 md:px-14 mt-16 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#D0B66A]/25">
          <div>
            <p
              className="text-[#202151] font-black text-[clamp(18px,2.5vw,26px)] leading-[1.3] mb-2"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              هل تريد أن تكون شريكاً أو داعماً؟
            </p>
            <p
              className="text-[#202151]/40 text-[13px] italic font-bold tracking-[0.1em]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Join our growing network of Gulf media organizations
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setModal("partner")}
              className="text-[#202151] bg-[#D0B66A] text-[13px] font-black px-8 py-3 rounded-sm whitespace-nowrap hover:opacity-85 transition-opacity duration-200"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              شريك
            </button>
            <button
              onClick={() => setModal("supporter")}
              className="text-[#202151] bg-transparent border border-[#202151]/20 text-[13px] font-black px-7 py-3 rounded-sm whitespace-nowrap hover:border-[#D0B66A] hover:text-[#D0B66A] transition-all duration-200"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              داعم
            </button>
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {modal && <PartnerModal type={modal} onClose={() => setModal(null)} />}
    </>
  );
}