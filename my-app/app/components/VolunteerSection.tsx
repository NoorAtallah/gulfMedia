"use client";

import { useState } from "react";
import { submitVolunteer } from "@/lib/queries/submissions";

const FIELDS = [
  { id: "journalism", label: "صحافة مكتوبة" },
  { id: "broadcast", label: "إعلام مرئي" },
  { id: "digital", label: "إعلام رقمي" },
  { id: "photo", label: "تصوير صحفي" },
  { id: "podcast", label: "بودكاست" },
  { id: "research", label: "بحث وتحليل" },
  { id: "design", label: "تصميم إعلامي" },
  { id: "translation", label: "ترجمة" },
];

const SKILLS = [
  { id: "writing", label: "كتابة المحتوى" },
  { id: "editing", label: "تحرير وتدقيق" },
  { id: "presenting", label: "تقديم وإلقاء" },
  { id: "interviewing", label: "إجراء المقابلات" },
  { id: "investigating", label: "استقصاء وتحقيق" },
  { id: "social", label: "إدارة السوشيال ميديا" },
  { id: "video", label: "مونتاج فيديو" },
  { id: "data", label: "صحافة بيانات" },
];

const COUNTRIES = ["السعودية", "الإمارات", "الكويت", "قطر", "عُمان", "البحرين", "أخرى"];

export default function VolunteerSection() {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", country: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const toggleField = (id: string) =>
    setSelectedFields((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);

  const toggleSkill = (id: string) =>
    setSelectedSkills((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  async function handleSubmit() {
    if (!form.full_name || !form.email) return;
    setStatus("loading");
    const { error } = await submitVolunteer({
      ...form,
      skills: selectedSkills,
      domain: selectedFields.join(", "),
    });
    setStatus(error ? "error" : "success");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .chip { transition: all 0.2s ease; cursor: pointer; }
        .chip:hover { border-color: rgba(208,182,106,0.5) !important; }
        .chip.active { background: #202151 !important; color: #D0B66A !important; border-color: #202151 !important; }
      `}</style>

      <section className="w-full bg-white py-24" dir="rtl">

        {/* ── LAYOUT ── */}
        <div className="flex flex-col lg:flex-row min-h-[600px]">

          {/* ── LEFT PANEL ── */}
          <div className="lg:w-[38%] flex-shrink-0 bg-[#202151] px-8 md:px-14 py-16 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-[#D61214]" />
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Volunteer · تطوع
                </span>
              </div>

              <h2
                className="text-white font-black text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-0.02em] mb-6"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                كن جزءاً
                <br />
                <span className="text-[#D0B66A]">من الفريق</span>
              </h2>

              <div className="w-12 h-px bg-[#D0B66A] opacity-50 mb-8" />

              <p
                className="text-white/55 text-[14px] font-bold leading-[1.9] mb-12 max-w-xs"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                نبحث عن إعلاميين متطوعين يؤمنون برسالة الإعلام الخليجي ويريدون المساهمة في بناء أكبر تجمع إعلامي في المنطقة
              </p>

              <div className="flex flex-col gap-6">
                {[
                  { n: "١٢٠+", l: "متطوع نشط" },
                  { n: "٨", l: "مجالات تطوع" },
                ].map((s) => (
                  <div key={s.l} className="flex items-baseline gap-4">
                    <span
                      className="text-[#D0B66A] font-black text-[32px] leading-none tracking-[-0.02em]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {s.n}
                    </span>
                    <span
                      className="text-white/35 text-[12px] italic font-bold tracking-[0.1em]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[#D0B66A]/15">
              <div className="w-6 h-px bg-[#D0B66A]/30 mb-4" />
              <p
                className="text-white/30 text-[13px] italic font-bold leading-[1.7] tracking-[0.05em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "الإعلام الحقيقي يُبنى بأيدي الملتزمين برسالته"
              </p>
            </div>
          </div>

          {/* ── RIGHT — FORM ── */}
          <div className="flex-1 px-8 md:px-14 py-16 flex flex-col gap-10 border-r border-[#D0B66A]/15">

            {/* ── STEP 01 — Personal Info ── */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#D0B66A]/20">
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-60"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  01
                </span>
                <h3
                  className="text-[#202151] text-[15px] font-black tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  المعلومات الشخصية
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[#202151] text-[11px] font-black tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    الاسم الكامل <span className="text-[#D61214]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="محمد العتيبي"
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal rounded-sm"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[#202151] text-[11px] font-black tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    البريد الإلكتروني <span className="text-[#D61214]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal rounded-sm"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    dir="ltr"
                  />
                </div>

                {/* Phone */}
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

                {/* Country */}
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
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ── STEP 02 — Fields ── */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#D0B66A]/20">
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-60"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  02
                </span>
                <h3
                  className="text-[#202151] text-[15px] font-black tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  مجال التطوع
                </h3>
                <span
                  className="text-[#202151]/30 text-[11px] font-bold mr-auto"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  يمكن اختيار أكثر من مجال
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {FIELDS.map((field) => (
                  <button
                    key={field.id}
                    onClick={() => toggleField(field.id)}
                    className={`chip text-[12px] font-black px-4 py-2 rounded-sm border tracking-wide ${
                      selectedFields.includes(field.id)
                        ? "active"
                        : "text-[#202151]/50 bg-transparent border-[#202151]/15"
                    }`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {field.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── STEP 03 — Skills ── */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#D0B66A]/20">
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-60"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  03
                </span>
                <h3
                  className="text-[#202151] text-[15px] font-black tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  المهارات
                </h3>
                <span
                  className="text-[#202151]/30 text-[11px] font-bold mr-auto"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  يمكن اختيار أكثر من مهارة
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`chip text-[12px] font-black px-4 py-2 rounded-sm border tracking-wide ${
                      selectedSkills.includes(skill.id)
                        ? "active"
                        : "text-[#202151]/50 bg-transparent border-[#202151]/15"
                    }`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {skill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── STEP 04 — Notes ── */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#D0B66A]/20">
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-60"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  04
                </span>
                <h3
                  className="text-[#202151] text-[15px] font-black tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  ملاحظات إضافية
                </h3>
              </div>

              <textarea
                placeholder="أخبرنا أكثر عن خبرتك ودوافعك للتطوع..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={4}
                className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal resize-none rounded-sm"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              />
            </div>

            {/* ── SUBMIT ── */}
            <div className="flex items-center justify-between pt-6 border-t border-[#D0B66A]/20 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {selectedFields.length > 0 && (
                  <span
                    className="text-[#D0B66A] text-[12px] font-black"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {selectedFields.length} مجال
                  </span>
                )}
                {selectedSkills.length > 0 && (
                  <>
                    {selectedFields.length > 0 && <span className="w-px h-3 inline-block bg-[#D0B66A]/30" />}
                    <span
                      className="text-[#D0B66A] text-[12px] font-black"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {selectedSkills.length} مهارة
                    </span>
                  </>
                )}
                {selectedFields.length === 0 && selectedSkills.length === 0 && (
                  <span
                    className="text-[#202151]/25 text-[11px] italic font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    اختر مجالاتك ومهاراتك أعلاه
                  </span>
                )}
              </div>

              {status === "error" && (
                <p
                  className="text-[#D61214] text-[12px] font-black"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  حدث خطأ، يرجى المحاولة مجدداً
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === "loading" || !form.full_name || !form.email}
                className="text-[#202151] bg-[#D0B66A] text-[14px] font-black px-10 py-3.5 rounded-sm tracking-wide transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {status === "loading" ? "جارٍ الإرسال..." : "أرسل طلب التطوع"}
              </button>
            </div>

          </div>
        </div>

        {/* ── SUCCESS STATE ── */}
        {status === "success" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#202151]/80 p-4"
            style={{ animation: "fadeIn 0.2s ease" }}
          >
            <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <div
              className="bg-white p-12 max-w-md w-full flex flex-col items-center gap-4 text-center"
              style={{ animation: "slideUp 0.3s cubic-bezier(.2,0,0,1)" }}
            >
              <div className="w-px h-14 bg-[#D0B66A]/40" />
              <h2
                className="text-[#202151] font-black text-[clamp(24px,3vw,36px)] tracking-[-0.02em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                شكراً، {form.full_name}
              </h2>
              <p
                className="text-[#D0B66A] text-[13px] italic font-bold opacity-70 tracking-[0.15em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Your application has been received
              </p>
              <p
                className="text-[#202151]/45 text-[14px] font-bold leading-[1.8] max-w-xs"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                سيتواصل معك فريق المنصة قريباً على بريدك الإلكتروني
              </p>
              <div className="w-px h-14 bg-[#D0B66A]/40" />
            </div>
          </div>
        )}

      </section>
    </>
  );
}