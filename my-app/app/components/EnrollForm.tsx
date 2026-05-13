"use client";

import { useState } from "react";
import { submitCourseEnrollment } from "@/lib/queries/submissions";

type Props = { courseId: string };

export default function EnrollForm({ courseId }: Props) {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit() {
    if (!form.full_name || !form.email) return;
    setStatus("loading");
    const { error } = await submitCourseEnrollment({ course_id: courseId, ...form });
    setStatus(error ? "error" : "success");
  }

  if (status === "success") {
    return (
      <div className="bg-[#202151] p-12 flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#D0B66A]/15 border border-[#D0B66A]/40 flex items-center justify-center">
          <span className="text-[#D0B66A] text-[22px]">✓</span>
        </div>
        <p
          className="text-white text-[18px] font-black text-center"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          تم التسجيل بنجاح
        </p>
        <p
          className="text-white/50 text-[13px] font-bold text-center leading-[1.8]"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          سيتواصل معك فريقنا قريباً على بريدك الإلكتروني
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#202151] p-8 md:p-10 flex flex-col gap-6" dir="rtl">

      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-[#D0B66A]/15">
        <div className="w-6 h-px bg-[#D61214]" />
        <h3
          className="text-white font-black text-[18px] tracking-[-0.01em]"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          سجّل في الدورة
        </h3>
        <span
          className="text-[#D0B66A] text-[11px] italic font-bold opacity-60 mr-auto"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          مجاني
        </span>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label
            className="text-white/60 text-[11px] font-black tracking-wide"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            الاسم الكامل <span className="text-[#D61214]">*</span>
          </label>
          <input
            type="text"
            placeholder="أدخل اسمك الكامل"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-white text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-white/20 placeholder:font-normal rounded-sm"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-white/60 text-[11px] font-black tracking-wide"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            البريد الإلكتروني <span className="text-[#D61214]">*</span>
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-white text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-white/20 placeholder:font-normal rounded-sm"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            dir="ltr"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label
          className="text-white/60 text-[11px] font-black tracking-wide"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          رقم الجوال
        </label>
        <input
          type="tel"
          placeholder="+966 5X XXX XXXX"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-white/5 border border-white/10 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-white text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-white/20 placeholder:font-normal rounded-sm"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          dir="ltr"
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-2">
        <label
          className="text-white/60 text-[11px] font-black tracking-wide"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          ملاحظات إضافية
        </label>
        <textarea
          placeholder="أي أسئلة أو ملاحظات..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={3}
          className="w-full bg-white/5 border border-white/10 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-white text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-white/20 placeholder:font-normal resize-none rounded-sm"
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

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={status === "loading" || !form.full_name || !form.email}
        className="w-full text-[#202151] bg-[#D0B66A] text-[14px] font-black py-4 rounded-sm tracking-wide transition-opacity duration-200 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
      >
        {status === "loading" ? "جارٍ التسجيل..." : "سجّل الآن"}
      </button>

      <p
        className="text-white/25 text-[11px] italic font-bold text-center"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        بالتسجيل توافق على التواصل معك من قِبل فريق المنصة
      </p>
    </div>
  );
}