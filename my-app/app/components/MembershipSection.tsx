"use client";

import { useState } from "react";

const TIERS = [
  {
    id: "basic",
    nameAr: "عضو عادي",
    nameEn: "Basic",
    price: "مجاني",
    priceEn: "Free",
    desc: "للمهتمين بالإعلام الخليجي ومتابعة المحتوى",
    features: [
      "تصفح المقالات والمحتوى",
      "متابعة الفعاليات",
      "الاستماع للبودكاست",
      "التسجيل في الدورات المجانية",
    ],
    locked: [
      "نشر المقالات",
      "صفحة بروفايل احترافية",
      "التواصل المباشر مع الإعلاميين",
    ],
    cta: "ابدأ مجاناً",
    highlight: false,
    number: "٠١",
  },
  {
    id: "journalist",
    nameAr: "عضو إعلامي",
    nameEn: "Journalist",
    price: "٤٩",
    priceEn: "49 SAR / mo",
    desc: "للصحفيين والمراسلين والإعلاميين المحترفين",
    features: [
      "كل مزايا العضو العادي",
      "صفحة بروفايل احترافية كاملة",
      "نشر المقالات والتقارير",
      "التواصل المباشر مع الإعلاميين",
      "اعتماد إعلامي رقمي",
      "الوصول لكل الدورات التدريبية",
      "شارة إعلامي موثق",
    ],
    locked: [],
    cta: "انضم كإعلامي",
    highlight: true,
    number: "٠٢",
  },
  {
    id: "supporter",
    nameAr: "عضو داعم",
    nameEn: "Supporter",
    price: "٩٩",
    priceEn: "99 SAR / mo",
    desc: "للمؤسسات والجهات الداعمة لمسيرة الإعلام الخليجي",
    features: [
      "كل مزايا العضو الإعلامي",
      "شعار المؤسسة في صفحة الداعمين",
      "إعلانات مجانية في المنصة",
      "تقارير دورية عن أداء المنصة",
      "دعوة لفعاليات حصرية",
      "تواصل مباشر مع الإدارة",
    ],
    locked: [],
    cta: "ادعم المنصة",
    highlight: false,
    number: "٠٣",
  },
];

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";

export default function MembershipSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');

        .tier-card {
          transition: transform 0.4s cubic-bezier(.2,0,0,1), border-color 0.3s ease;
          cursor: pointer;
          position: relative;
        }
        .tier-card:hover {
          transform: translateY(-8px);
        }
        .tier-card.highlighted {
          transform: translateY(-16px);
        }
        .tier-card.highlighted:hover {
          transform: translateY(-20px);
        }

        .feature-item {
          transition: color 0.2s ease;
        }

        .tier-cta {
          transition: all 0.25s ease;
        }
        .tier-cta:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        .tier-cta-outline {
          transition: all 0.25s ease;
        }
        .tier-cta-outline:hover {
          background: rgba(208,182,106,0.08) !important;
          border-color: rgba(208,182,106,0.5) !important;
          color: ${GOLD} !important;
        }
      `}</style>

      <section className="w-full bg-[#202151] py-24 px-6 md:px-14" dir="rtl">

        {/* ── HEADER ── */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-6 h-px bg-[#D61214]" />
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: GOLD,
              opacity: 0.8,
            }}>
              Membership · عضوية
            </span>
            <div className="w-6 h-px bg-[#D61214]" />
          </div>

          <h2 style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px, 4vw, 56px)",
            color: CREAM,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}>
            اختر عضويتك
          </h2>

          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "14px",
            color: CREAM,
            opacity: 0.4,
            letterSpacing: "0.15em",
          }}>
            Three tiers · three paths · one platform
          </p>

          {/* Gold rule */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16" style={{ background: GOLD, opacity: 0.2 }} />
            <span style={{ color: GOLD, fontSize: "8px", opacity: 0.4 }}>✦</span>
            <div className="h-px w-16" style={{ background: GOLD, opacity: 0.2 }} />
          </div>
        </div>

        {/* ── TIER CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {TIERS.map((tier) => {
            const isHighlighted = tier.highlight;
            const isHovered = hovered === tier.id;

            return (
              <div
                key={tier.id}
                className={`tier-card ${isHighlighted ? "highlighted" : ""}`}
                style={{
                  border: isHighlighted
                    ? `1px solid ${GOLD}`
                    : `0.5px solid rgba(208,182,106,${isHovered ? "0.35" : "0.12"})`,
                  borderRadius: "2px",
                  background: isHighlighted
                    ? `linear-gradient(160deg, rgba(32,33,81,1) 0%, rgba(32,33,120,0.8) 100%)`
                    : "rgba(32,33,81,0.4)",
                  overflow: "hidden",
                }}
                onMouseEnter={() => setHovered(tier.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Highlighted badge */}
                {isHighlighted && (
                  <div
                    className="w-full py-2 text-center"
                    style={{
                      background: GOLD,
                      fontFamily: "'Noto Kufi Arabic', sans-serif",
                      fontWeight: 700,
                      fontSize: "11px",
                      color: NAVY,
                      letterSpacing: "0.1em",
                    }}
                  >
                    الأكثر اختياراً
                  </div>
                )}

                <div className="p-8">
                  {/* Number + name */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontSize: "11px",
                        color: GOLD,
                        opacity: 0.5,
                        letterSpacing: "0.2em",
                        marginBottom: "6px",
                      }}>
                        {tier.number} · {tier.nameEn}
                      </p>
                      <h3 style={{
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        fontWeight: 900,
                        fontSize: "22px",
                        color: CREAM,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.2,
                      }}>
                        {tier.nameAr}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="text-left flex-shrink-0">
                      <div style={{ direction: "ltr" }}>
                        <span style={{
                          fontFamily: "'Noto Kufi Arabic', sans-serif",
                          fontWeight: 900,
                          fontSize: tier.price === "مجاني" ? "20px" : "32px",
                          color: isHighlighted ? GOLD : CREAM,
                          lineHeight: 1,
                        }}>
                          {tier.price}
                        </span>
                        {tier.price !== "مجاني" && (
                          <span style={{
                            fontFamily: "'Playfair Display', serif",
                            fontStyle: "italic",
                            fontSize: "10px",
                            color: CREAM,
                            opacity: 0.35,
                            display: "block",
                            letterSpacing: "0.1em",
                            marginTop: "2px",
                          }}>
                            ريال / شهر
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desc */}
                  <p style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 300,
                    fontSize: "13px",
                    color: CREAM,
                    opacity: 0.5,
                    lineHeight: 1.7,
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: `0.5px solid rgba(208,182,106,0.1)`,
                  }}>
                    {tier.desc}
                  </p>

                  {/* Features */}
                  <div className="flex flex-col gap-3 mb-8">
                    {tier.features.map((f, i) => (
                      <div key={i} className="feature-item flex items-center gap-3">
                        <span style={{
                          color: isHighlighted ? GOLD : "#4CAF50",
                          fontSize: "12px",
                          flexShrink: 0,
                        }}>
                          ✓
                        </span>
                        <span style={{
                          fontFamily: "'Noto Kufi Arabic', sans-serif",
                          fontSize: "13px",
                          color: CREAM,
                          opacity: 0.7,
                          lineHeight: 1.4,
                        }}>
                          {f}
                        </span>
                      </div>
                    ))}

                    {tier.locked.map((f, i) => (
                      <div key={i} className="feature-item flex items-center gap-3">
                        <span style={{
                          color: "rgba(245,241,232,0.15)",
                          fontSize: "12px",
                          flexShrink: 0,
                        }}>
                          ✕
                        </span>
                        <span style={{
                          fontFamily: "'Noto Kufi Arabic', sans-serif",
                          fontSize: "13px",
                          color: CREAM,
                          opacity: 0.2,
                          lineHeight: 1.4,
                          textDecoration: "line-through",
                          textDecorationColor: "rgba(245,241,232,0.15)",
                        }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  {isHighlighted ? (
                    <button
                      className="tier-cta w-full py-3"
                      style={{
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: NAVY,
                        background: GOLD,
                        border: "none",
                        borderRadius: "2px",
                        cursor: "pointer",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {tier.cta}
                    </button>
                  ) : (
                    <button
                      className="tier-cta-outline w-full py-3"
                      style={{
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: `rgba(245,241,232,0.5)`,
                        background: "transparent",
                        border: `0.5px solid rgba(245,241,232,0.15)`,
                        borderRadius: "2px",
                        cursor: "pointer",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {tier.cta}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM NOTE ── */}
        <div
          className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: `0.5px solid rgba(208,182,106,0.12)`, paddingTop: "24px" }}
        >
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "12px",
            color: CREAM,
            opacity: 0.3,
            letterSpacing: "0.15em",
            textAlign: "center",
          }}>
            جميع العضويات تشمل دعماً مباشراً من فريق المنصة · All memberships include direct platform support
          </span>
          <span style={{
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            fontWeight: 300,
            fontSize: "11px",
            color: GOLD,
            opacity: 0.5,
            whiteSpace: "nowrap",
          }}>
            يمكن الإلغاء في أي وقت
          </span>
        </div>

      </section>
    </>
  );
}