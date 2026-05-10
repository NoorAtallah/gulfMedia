"use client";

import { useState } from "react";

const FIELDS = [
  { id: "journalism", label: "صحافة مكتوبة", en: "Print Journalism" },
  { id: "broadcast", label: "إعلام مرئي", en: "Broadcast" },
  { id: "digital", label: "إعلام رقمي", en: "Digital Media" },
  { id: "photo", label: "تصوير صحفي", en: "Photojournalism" },
  { id: "podcast", label: "بودكاست", en: "Podcast" },
  { id: "research", label: "بحث وتحليل", en: "Research" },
  { id: "design", label: "تصميم إعلامي", en: "Media Design" },
  { id: "translation", label: "ترجمة", en: "Translation" },
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

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";

export default function VolunteerSection() {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const toggleField = (id: string) =>
    setSelectedFields((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const toggleSkill = (id: string) =>
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const handleSubmit = () => {
    if (!name || !email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');`}</style>
        <section className="w-full bg-[#202151] py-24 px-6 md:px-14 flex flex-col items-center justify-center text-center" dir="rtl" style={{ minHeight: "60vh" }}>
          <div style={{ width: "1px", height: "60px", background: GOLD, opacity: 0.4, margin: "0 auto 32px" }} />
          <h2 style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontWeight: 900, fontSize: "clamp(28px, 4vw, 48px)", color: CREAM, marginBottom: "12px", letterSpacing: "-0.02em" }}>
            شكراً، {name}
          </h2>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "14px", color: GOLD, opacity: 0.7, letterSpacing: "0.15em", marginBottom: "32px" }}>
            Your application has been received
          </p>
          <p style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontWeight: 300, fontSize: "14px", color: CREAM, opacity: 0.45, lineHeight: 1.8, maxWidth: "400px" }}>
            سيتواصل معك فريق المنصة قريباً على بريدك الإلكتروني لإكمال إجراءات التطوع
          </p>
          <div style={{ width: "1px", height: "60px", background: GOLD, opacity: 0.4, margin: "32px auto 0" }} />
        </section>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');

        .vol-input {
          background: transparent;
          border: none;
          border-bottom: 0.5px solid rgba(208,182,106,0.2);
          color: #F5F1E8;
          font-family: 'Noto Kufi Arabic', sans-serif;
          font-size: 15px;
          font-weight: 400;
          padding: 12px 0;
          width: 100%;
          outline: none;
          transition: border-color 0.25s ease;
          direction: rtl;
          caret-color: #D0B66A;
        }
        .vol-input::placeholder {
          color: rgba(245,241,232,0.2);
          font-weight: 300;
        }
        .vol-input:focus {
          border-bottom-color: rgba(208,182,106,0.6);
        }

        .toggle-chip {
          transition: all 0.2s ease;
          cursor: pointer;
          user-select: none;
        }
        .toggle-chip:hover {
          border-color: rgba(208,182,106,0.4) !important;
          color: rgba(245,241,232,0.8) !important;
        }
        .toggle-chip.chip-active {
          background: rgba(208,182,106,0.12) !important;
          border-color: ${GOLD} !important;
          color: ${GOLD} !important;
        }

        .submit-vol {
          transition: all 0.25s ease;
        }
        .submit-vol:hover {
          opacity: 0.85;
          transform: translateY(-2px);
        }
      `}</style>

      <section className="w-full bg-[#202151] py-24" dir="rtl">

        {/* ── SPLIT LAYOUT ── */}
        <div className="flex flex-col md:flex-row min-h-[600px]">

          {/* LEFT — context panel */}
          <div
            className="md:w-[38%] flex-shrink-0 px-6 md:px-14 py-12 flex flex-col justify-between"
            style={{ borderLeft: `0.5px solid rgba(208,182,106,0.1)` }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-[#D61214]" />
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: GOLD,
                  opacity: 0.8,
                }}>
                  Volunteer · تطوع
                </span>
              </div>

              <h2 style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: CREAM,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}>
                كن جزءاً
                <br />
                <span style={{ color: GOLD }}>من الفريق</span>
              </h2>

              <div className="w-12 h-px mb-8" style={{ background: GOLD, opacity: 0.5 }} />

              <p style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: 300,
                fontSize: "14px",
                color: CREAM,
                opacity: 0.5,
                lineHeight: 1.9,
                marginBottom: "40px",
              }}>
                نبحث عن إعلاميين متطوعين يؤمنون برسالة الإعلام الخليجي ويريدون المساهمة في بناء أكبر تجمع إعلامي في المنطقة
              </p>

              {/* Stats */}
              <div className="flex flex-col gap-6">
                {[
                  { n: "١٢٠+", l: "متطوع نشط" },
                  { n: "٦", l: "مجالات تطوع" },
                ].map((s) => (
                  <div key={s.l} className="flex items-baseline gap-4">
                    <span style={{
                      fontFamily: "'Noto Kufi Arabic', sans-serif",
                      fontWeight: 900,
                      fontSize: "32px",
                      color: GOLD,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}>
                      {s.n}
                    </span>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "12px",
                      color: CREAM,
                      opacity: 0.35,
                      letterSpacing: "0.1em",
                    }}>
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom quote */}
            <div
              className="mt-12 pt-8"
              style={{ borderTop: `0.5px solid rgba(208,182,106,0.1)` }}
            >
              <div className="w-6 h-px mb-4" style={{ background: GOLD, opacity: 0.3 }} />
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "13px",
                color: CREAM,
                opacity: 0.35,
                lineHeight: 1.7,
                letterSpacing: "0.05em",
              }}>
                "الإعلام الحقيقي يُبنى بأيدي الملتزمين برسالته"
              </p>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="flex-1 px-6 md:px-14 py-12 flex flex-col gap-10">

            {/* Personal info */}
            <div className="flex flex-col gap-8">
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "11px",
                letterSpacing: "0.3em",
                color: GOLD,
                opacity: 0.6,
              }}>
                01 · المعلومات الشخصية
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "10px",
                    color: CREAM,
                    opacity: 0.35,
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "4px",
                  }}>
                    الاسم الكامل
                  </label>
                  <input
                    className="vol-input"
                    placeholder="محمد العتيبي"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "10px",
                    color: CREAM,
                    opacity: 0.35,
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "4px",
                  }}>
                    البريد الإلكتروني
                  </label>
                  <input
                    className="vol-input"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ direction: "ltr", textAlign: "right" }}
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "10px",
                    color: CREAM,
                    opacity: 0.35,
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "4px",
                  }}>
                    الدولة
                  </label>
                  <input
                    className="vol-input"
                    placeholder="المملكة العربية السعودية"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Field selection */}
            <div className="flex flex-col gap-5">
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "11px",
                letterSpacing: "0.3em",
                color: GOLD,
                opacity: 0.6,
              }}>
                02 · مجال التطوع
              </p>

              <div className="flex flex-wrap gap-2">
                {FIELDS.map((field) => {
                  const active = selectedFields.includes(field.id);
                  return (
                    <button
                      key={field.id}
                      className={`toggle-chip ${active ? "chip-active" : ""}`}
                      onClick={() => toggleField(field.id)}
                      style={{
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        fontSize: "12px",
                        color: active ? GOLD : `rgba(245,241,232,0.4)`,
                        background: active ? "rgba(208,182,106,0.12)" : "transparent",
                        border: `0.5px solid ${active ? GOLD : "rgba(245,241,232,0.12)"}`,
                        padding: "8px 16px",
                        borderRadius: "2px",
                        cursor: "pointer",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {field.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills selection */}
            <div className="flex flex-col gap-5">
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "11px",
                letterSpacing: "0.3em",
                color: GOLD,
                opacity: 0.6,
              }}>
                03 · المهارات
              </p>

              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => {
                  const active = selectedSkills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      className={`toggle-chip ${active ? "chip-active" : ""}`}
                      onClick={() => toggleSkill(skill.id)}
                      style={{
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        fontSize: "12px",
                        color: active ? GOLD : `rgba(245,241,232,0.4)`,
                        background: active ? "rgba(208,182,106,0.12)" : "transparent",
                        border: `0.5px solid ${active ? GOLD : "rgba(245,241,232,0.12)"}`,
                        padding: "8px 16px",
                        borderRadius: "2px",
                        cursor: "pointer",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {skill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div
              className="flex items-center justify-between pt-6"
              style={{ borderTop: `0.5px solid rgba(208,182,106,0.1)` }}
            >
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "11px",
                color: CREAM,
                opacity: 0.25,
                letterSpacing: "0.1em",
              }}>
                {selectedFields.length + selectedSkills.length} items selected
              </span>

              <button
                className="submit-vol"
                onClick={handleSubmit}
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: NAVY,
                  background: GOLD,
                  border: "none",
                  padding: "13px 40px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  opacity: name && email ? 1 : 0.4,
                }}
              >
                أرسل طلب التطوع
              </button>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}