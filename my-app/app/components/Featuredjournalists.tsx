"use client";

const JOURNALISTS = [
  {
    name: "أحمد الرشيدي",
    title: "مراسل سياسي",
    country: "الكويت",
    specialty: "صحافة سياسية",
    years: "١٢ سنة خبرة",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop",
  },
  {
    name: "سارة المنصوري",
    title: "مذيعة ومحررة",
    country: "الإمارات",
    specialty: "إعلام مرئي",
    years: "٨ سنوات خبرة",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fit=crop",
  },
  {
    name: "خالد البلوشي",
    title: "محقق صحفي",
    country: "عُمان",
    specialty: "صحافة استقصائية",
    years: "١٥ سنة خبرة",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop",
  },
  {
    name: "نورة القحطاني",
    title: "صحفية رقمية",
    country: "السعودية",
    specialty: "إعلام رقمي",
    years: "٦ سنوات خبرة",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fit=crop",
  },
];

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";

export default function FeaturedJournalists() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');

        @keyframes fadeUpCard {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .journalist-card {
          animation: fadeUpCard 0.7s cubic-bezier(.2,0,0,1) both;
        }

        .journalist-card:hover .card-img {
          transform: scale(1.05);
        }

        .journalist-card:hover .card-overlay {
          opacity: 1;
        }

        .journalist-card:hover .card-border {
          opacity: 1;
        }

        .card-img {
          transition: transform 0.7s cubic-bezier(.2,0,0,1);
        }

        .card-overlay {
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .card-border {
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .view-all-btn {
          transition: all 0.25s ease;
        }
        .view-all-btn:hover {
          background: ${GOLD};
          color: ${NAVY};
          border-color: ${GOLD};
        }

        .country-badge {
          transition: background 0.2s ease;
        }
      `}</style>

      <section
        className="w-full bg-[#202151] py-24 px-6 md:px-14"
        dir="rtl"
      >
        {/* ── SECTION HEADER ── */}
        <div className="flex items-end justify-between mb-16">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#D61214]" />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: GOLD,
                  opacity: 0.8,
                }}
              >
                Featured · مميزون
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: CREAM,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              إعلاميون مميزون
            </h2>

            {/* Gold rule */}
            <div className="w-12 h-px mt-4" style={{ background: GOLD, opacity: 0.5 }} />
          </div>

          {/* View all */}
          <button
            className="view-all-btn"
            style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: CREAM,
              background: "transparent",
              border: `0.5px solid rgba(245,241,232,0.2)`,
              padding: "10px 28px",
              borderRadius: "2px",
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}
          >
            عرض الكل
          </button>
        </div>

        {/* ── CARDS GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {JOURNALISTS.map((j, i) => (
            <div
              key={j.name}
              className="journalist-card relative cursor-pointer"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Image container */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                {/* Border on hover */}
                <div
                  className="card-border absolute inset-0 z-20 pointer-events-none"
                  style={{ border: `1px solid ${GOLD}`, opacity: 0 }}
                />

                {/* Image */}
                <img
                  src={j.img}
                  alt={j.name}
                  className="card-img w-full h-full object-cover"
                  style={{ filter: "grayscale(20%) brightness(0.85)" }}
                />

                {/* Always-on gradient */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: `linear-gradient(
                      to top,
                      rgba(32,33,81,0.95) 0%,
                      rgba(32,33,81,0.4) 50%,
                      transparent 100%
                    )`,
                  }}
                />

                {/* Hover overlay — specialty */}
                <div
                  className="card-overlay absolute inset-0 z-10 flex items-center justify-center"
                  style={{ background: `rgba(32,33,81,0.75)` }}
                >
                  <div className="text-center px-4">
                    <div
                      style={{
                        width: "32px",
                        height: "0.5px",
                        background: GOLD,
                        margin: "0 auto 12px",
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontStyle: "italic",
                        fontSize: "12px",
                        color: GOLD,
                        letterSpacing: "0.15em",
                        marginBottom: "8px",
                      }}
                    >
                      {j.specialty}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Noto Kufi Arabic', sans-serif",
                        fontWeight: 300,
                        fontSize: "11px",
                        color: CREAM,
                        opacity: 0.6,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {j.years}
                    </p>
                    <div
                      style={{
                        width: "32px",
                        height: "0.5px",
                        background: GOLD,
                        margin: "12px auto 0",
                      }}
                    />
                  </div>
                </div>

                {/* Country badge */}
                <div
                  className="country-badge absolute top-3 right-3 z-20"
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: NAVY,
                    background: GOLD,
                    padding: "3px 8px",
                    borderRadius: "1px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {j.country}
                </div>
              </div>

              {/* Card footer */}
              <div
                className="pt-4 pb-2"
                style={{ borderBottom: `0.5px solid rgba(208,182,106,0.15)` }}
              >
                <p
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: CREAM,
                    marginBottom: "4px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {j.name}
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "12px",
                    color: GOLD,
                    opacity: 0.8,
                    letterSpacing: "0.08em",
                  }}
                >
                  {j.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM STATS STRIP ── */}
        <div
          className="mt-20 pt-8 flex items-center justify-between flex-wrap gap-6"
          style={{ borderTop: `0.5px solid rgba(208,182,106,0.12)` }}
        >
          {[
            { n: "٣٢٠٠+", l: "صحفي ومراسل مسجل" },
            { n: "٦", l: "دول خليجية" },
            { n: "٢٤", l: "تخصص إعلامي" },
            { n: "٨٥٠+", l: "مركز إعلامي" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(28px, 3vw, 40px)",
                  color: GOLD,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.n}
              </span>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "12px",
                  color: CREAM,
                  opacity: 0.4,
                  letterSpacing: "0.1em",
                }}
              >
                {s.l}
              </span>
            </div>
          ))}

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
              letterSpacing: "0.04em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
          >
            انضم كإعلامي
          </button>
        </div>
      </section>
    </>
  );
}