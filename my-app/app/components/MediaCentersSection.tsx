"use client";

import { useState } from "react";

const COUNTRIES = ["الكل", "السعودية", "الإمارات", "الكويت", "قطر", "عُمان", "البحرين"];

const CENTERS = [
  { name: "مركز الإعلام السعودي", country: "السعودية", type: "مركز حكومي", size: "large", city: "الرياض" },
  { name: "قناة العربية", country: "السعودية", type: "إعلام مرئي", size: "small", city: "دبي" },
  { name: "مجموعة MBC", country: "السعودية", type: "إعلام مرئي", size: "medium", city: "الرياض" },
  { name: "مركز الإمارات للإعلام", country: "الإمارات", type: "مركز حكومي", size: "medium", city: "أبوظبي" },
  { name: "قناة الجزيرة", country: "قطر", type: "إعلام مرئي", size: "large", city: "الدوحة" },
  { name: "تلفزيون الكويت", country: "الكويت", type: "إعلام حكومي", size: "medium", city: "الكويت" },
  { name: "سكاي نيوز عربية", country: "الإمارات", type: "إعلام مرئي", size: "small", city: "أبوظبي" },
  { name: "صحيفة الخليج", country: "الإمارات", type: "صحافة مكتوبة", size: "small", city: "الشارقة" },
  { name: "راديو مونت كارلو الشرق الأوسط", country: "قطر", type: "إذاعة", size: "medium", city: "الدوحة" },
  { name: "مركز الإعلام العُماني", country: "عُمان", type: "مركز حكومي", size: "small", city: "مسقط" },
  { name: "صحيفة عُمان", country: "عُمان", type: "صحافة مكتوبة", size: "medium", city: "مسقط" },
  { name: "تلفزيون البحرين", country: "البحرين", type: "إعلام حكومي", size: "small", city: "المنامة" },
  { name: "مركز الدوحة للإعلام", country: "قطر", type: "مركز أكاديمي", size: "large", city: "الدوحة" },
  { name: "صحيفة الاتحاد", country: "الإمارات", type: "صحافة مكتوبة", size: "medium", city: "أبوظبي" },
  { name: "إذاعة الكويت", country: "الكويت", type: "إذاعة", size: "small", city: "الكويت" },
];

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "إعلام مرئي":     { bg: "rgba(214,18,20,0.12)",    text: "#D61214" },
  "مركز حكومي":    { bg: "rgba(208,182,106,0.12)",   text: "#D0B66A" },
  "صحافة مكتوبة":  { bg: "rgba(245,241,232,0.08)",   text: "#F5F1E8" },
  "إذاعة":          { bg: "rgba(76,175,80,0.12)",     text: "#4CAF50" },
  "إعلام حكومي":   { bg: "rgba(208,182,106,0.12)",   text: "#D0B66A" },
  "مركز أكاديمي":  { bg: "rgba(33,150,243,0.12)",    text: "#64B5F6" },
};

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";

export default function MediaCentersSection() {
  const [active, setActive] = useState("الكل");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = active === "الكل"
    ? CENTERS
    : CENTERS.filter((c) => c.country === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');

        .center-cell {
          transition: all 0.3s cubic-bezier(.2,0,0,1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .center-cell::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(208,182,106,0.06);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .center-cell:hover::before { opacity: 1; }
        .center-cell:hover {
          border-color: rgba(208,182,106,0.35) !important;
        }

        .country-tab {
          transition: all 0.2s ease;
          cursor: pointer;
          position: relative;
        }
        .country-tab::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: ${GOLD};
          transform: scaleX(0);
          transition: transform 0.25s ease;
        }
        .country-tab.tab-active::after { transform: scaleX(1); }

        .count-badge {
          transition: all 0.3s ease;
        }
      `}</style>

      <section className="w-full bg-[#202151] py-24 px-6 md:px-14" dir="rtl">

        {/* ── HEADER ── */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#D61214]" />
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "11px",
                letterSpacing: "0.3em",
                color: GOLD,
                opacity: 0.8,
              }}>
                Directory · دليل
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(32px, 4vw, 52px)",
              color: CREAM,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}>
              المراكز الإعلامية
            </h2>
            <div className="w-12 h-px mt-4" style={{ background: GOLD, opacity: 0.5 }} />
          </div>

          {/* Live count */}
          <div className="flex flex-col items-end gap-1">
            <span style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontWeight: 900,
              fontSize: "48px",
              color: GOLD,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}>
              ٨٥٠+
            </span>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "12px",
              color: CREAM,
              opacity: 0.35,
              letterSpacing: "0.15em",
            }}>
              Media Center
            </span>
          </div>
        </div>

        {/* ── COUNTRY FILTER TABS ── */}
        <div
          className="flex items-center gap-0 mb-10 overflow-x-auto"
          style={{ borderBottom: `0.5px solid rgba(208,182,106,0.12)` }}
        >
          {COUNTRIES.map((c) => (
            <button
              key={c}
              className={`country-tab ${active === c ? "tab-active" : ""}`}
              onClick={() => setActive(c)}
              style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontSize: "13px",
                fontWeight: active === c ? 700 : 400,
                color: active === c ? GOLD : `rgba(245,241,232,0.4)`,
                background: "transparent",
                border: "none",
                padding: "12px 20px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
                transition: "color 0.2s ease, font-weight 0.2s ease",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ── MOSAIC GRID ── */}
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            background: "rgba(208,182,106,0.08)",
          }}
        >
          {filtered.map((center, i) => {
            const typeColor = TYPE_COLORS[center.type] || { bg: "rgba(208,182,106,0.1)", text: GOLD };
            const isHovered = hovered === i;

            return (
              <div
                key={i}
                className="center-cell bg-[#202151] p-6 flex flex-col gap-3"
                style={{
                  border: `0.5px solid transparent`,
                  minHeight: center.size === "large" ? "180px" : center.size === "medium" ? "150px" : "130px",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  {/* Initial circle */}
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: `0.5px solid rgba(208,182,106,0.2)`,
                    background: isHovered ? "rgba(208,182,106,0.1)" : "rgba(208,182,106,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}>
                    <span style={{
                      fontFamily: "'Noto Kufi Arabic', sans-serif",
                      fontWeight: 900,
                      fontSize: "14px",
                      color: GOLD,
                    }}>
                      {center.name[0]}
                    </span>
                  </div>

                  {/* Type badge */}
                  <span style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "9px",
                    fontWeight: 600,
                    color: typeColor.text,
                    background: typeColor.bg,
                    padding: "3px 8px",
                    borderRadius: "1px",
                    whiteSpace: "nowrap",
                  }}>
                    {center.type}
                  </span>
                </div>

                {/* Name */}
                <p style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: isHovered ? CREAM : `rgba(245,241,232,0.7)`,
                  lineHeight: 1.4,
                  flex: 1,
                  transition: "color 0.3s ease",
                }}>
                  {center.name}
                </p>

                {/* City */}
                <div className="flex items-center justify-between">
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "10px",
                    color: CREAM,
                    opacity: 0.3,
                    letterSpacing: "0.1em",
                  }}>
                    {center.city}
                  </span>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "10px",
                    color: GOLD,
                    opacity: isHovered ? 0.8 : 0,
                    transition: "opacity 0.3s ease",
                    letterSpacing: "0.1em",
                  }}>
                    عرض ←
                  </span>
                </div>
              </div>
            );
          })}

          {/* Join CTA cell */}
          <div
            className="bg-[#202151] p-6 flex flex-col items-center justify-center gap-4"
            style={{
              border: `0.5px solid rgba(208,182,106,0.15)`,
              minHeight: "150px",
              cursor: "pointer",
            }}
          >
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: `1px solid rgba(208,182,106,0.3)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ color: GOLD, fontSize: "20px", lineHeight: 1 }}>+</span>
            </div>
            <p style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              color: GOLD,
              opacity: 0.7,
              textAlign: "center",
              lineHeight: 1.4,
            }}>
              سجّل مركزك الإعلامي
            </p>
          </div>
        </div>

        {/* ── BOTTOM RULE ── */}
        <div
          className="mt-16 flex items-center gap-4"
          style={{ borderTop: `0.5px solid rgba(208,182,106,0.12)`, paddingTop: "24px" }}
        >
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "12px",
            color: CREAM,
            opacity: 0.35,
            letterSpacing: "0.15em",
          }}>
            Gulf Media Platform · المراكز الإعلامية
          </span>
          <div className="flex-1 h-px" style={{ background: GOLD, opacity: 0.1 }} />
          <span style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontWeight: 300,
            fontSize: "11px",
            color: GOLD,
            opacity: 0.5,
          }}>
            ٦ دول خليجية
          </span>
        </div>

      </section>
    </>
  );
}