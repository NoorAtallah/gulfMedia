"use client";

import { useEffect, useRef } from "react";

const PARTNERS = [
  { name: "مجموعة MBC", type: "partner", category: "إعلام مرئي" },
  { name: "قناة العربية", type: "partner", category: "إعلام مرئي" },
  { name: "صحيفة الرياض", type: "partner", category: "صحافة" },
  { name: "مركز الدوحة للإعلام", type: "partner", category: "أكاديمي" },
  { name: "سكاي نيوز عربية", type: "partner", category: "إعلام مرئي" },
  { name: "صحيفة الاتحاد", type: "partner", category: "صحافة" },
];

const SUPPORTERS = [
  { name: "وزارة الإعلام السعودية", type: "supporter", category: "حكومي" },
  { name: "هيئة الصحفيين الإماراتيين", type: "supporter", category: "مهني" },
  { name: "اتحاد الصحفيين الخليجيين", type: "supporter", category: "مهني" },
  { name: "مؤسسة الكويت للتقدم العلمي", type: "supporter", category: "أكاديمي" },
  { name: "مركز الإعلام القطري", type: "supporter", category: "حكومي" },
  { name: "جمعية الصحفيين العُمانيين", type: "supporter", category: "مهني" },
];

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";

function MarqueeRow({ items, reverse = false }: { items: typeof PARTNERS; reverse?: boolean }) {
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
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div
        ref={trackRef}
        className="flex items-center gap-4 whitespace-nowrap will-change-transform py-2"
        style={{ direction: "ltr" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-4 px-8 py-4"
            style={{
              border: `0.5px solid rgba(208,182,106,0.15)`,
              borderRadius: "2px",
              background: "rgba(208,182,106,0.03)",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(208,182,106,0.4)";
              (e.currentTarget as HTMLDivElement).style.background = "rgba(208,182,106,0.07)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(208,182,106,0.15)";
              (e.currentTarget as HTMLDivElement).style.background = "rgba(208,182,106,0.03)";
            }}
          >
            {/* Logo placeholder */}
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `0.5px solid rgba(208,182,106,0.25)`,
              background: "rgba(208,182,106,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: 900,
                fontSize: "13px",
                color: GOLD,
              }}>
                {item.name[0]}
              </span>
            </div>

            <div style={{ direction: "rtl" }}>
              <p style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                color: CREAM,
                opacity: 0.8,
                lineHeight: 1.2,
              }}>
                {item.name}
              </p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "10px",
                color: GOLD,
                opacity: 0.5,
                letterSpacing: "0.1em",
              }}>
                {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');
      `}</style>

      <section className="w-full bg-[#202151] py-24 overflow-hidden" dir="rtl">

        {/* ── HEADER ── */}
        <div className="px-6 md:px-14 mb-16">
          <div className="flex items-end justify-between">
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
                  Network · شبكة
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
                الشركاء والداعمون
              </h2>
              <div className="w-12 h-px mt-4" style={{ background: GOLD, opacity: 0.5 }} />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-12">
              {[
                { n: "٤٠+", l: "شريك" },
                { n: "٢٠+", l: "داعم" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-end gap-1">
                  <span style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 900,
                    fontSize: "36px",
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
                    letterSpacing: "0.15em",
                  }}>
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PARTNERS LABEL ── */}
        <div className="px-6 md:px-14 mb-5 flex items-center gap-4">
          <span style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            color: GOLD,
            opacity: 0.6,
            letterSpacing: "0.05em",
          }}>
            الشركاء
          </span>
          <div className="flex-1 h-px" style={{ background: GOLD, opacity: 0.08 }} />
        </div>

        {/* ── PARTNERS MARQUEE ── */}
        <MarqueeRow items={PARTNERS} reverse={false} />

        {/* ── DIVIDER ── */}
        <div className="px-6 md:px-14 my-8 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: GOLD, opacity: 0.08 }} />
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "11px",
            color: GOLD,
            opacity: 0.3,
            letterSpacing: "0.2em",
          }}>
            ✦
          </span>
          <div className="flex-1 h-px" style={{ background: GOLD, opacity: 0.08 }} />
        </div>

        {/* ── SUPPORTERS LABEL ── */}
        <div className="px-6 md:px-14 mb-5 flex items-center gap-4">
          <span style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            color: CREAM,
            opacity: 0.4,
            letterSpacing: "0.05em",
          }}>
            الداعمون
          </span>
          <div className="flex-1 h-px" style={{ background: CREAM, opacity: 0.05 }} />
        </div>

        {/* ── SUPPORTERS MARQUEE — opposite direction ── */}
        <MarqueeRow items={SUPPORTERS} reverse={true} />

        {/* ── BOTTOM CTA ── */}
        <div
          className="px-6 md:px-14 mt-16 pt-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderTop: `0.5px solid rgba(208,182,106,0.12)` }}
        >
          <div>
            <p style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(18px, 2.5vw, 26px)",
              color: CREAM,
              lineHeight: 1.3,
              marginBottom: "6px",
            }}>
              هل تريد أن تكون شريكاً أو داعماً؟
            </p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "13px",
              color: CREAM,
              opacity: 0.4,
              letterSpacing: "0.1em",
            }}>
              Join our growing network of Gulf media organizations
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                color: NAVY,
                background: GOLD,
                border: "none",
                padding: "12px 32px",
                borderRadius: "2px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              شريك
            </button>
            <button
              style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: CREAM,
                background: "transparent",
                border: `0.5px solid rgba(245,241,232,0.2)`,
                padding: "12px 28px",
                borderRadius: "2px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD;
                (e.currentTarget as HTMLButtonElement).style.color = GOLD;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,241,232,0.2)";
                (e.currentTarget as HTMLButtonElement).style.color = CREAM;
              }}
            >
              داعم
            </button>
          </div>
        </div>

      </section>
    </>
  );
}