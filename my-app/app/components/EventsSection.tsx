"use client";

const EVENTS = [
  {
    number: "٠١",
    title: "ملتقى الإعلام الخليجي ٢٠٢٥",
    titleEn: "Gulf Media Summit 2025",
    description: "أكبر تجمع سنوي للإعلاميين الخليجيين — نقاشات، ورش عمل، وجلسات تواصل مع نخبة من قادة الإعلام في المنطقة",
    date: "١٥",
    month: "يونيو",
    year: "٢٠٢٥",
    day: "الأحد",
    location: "الرياض، المملكة العربية السعودية",
    locationEn: "Riyadh, Saudi Arabia",
    type: "ملتقى",
    typeEn: "Summit",
    seats: "٢٠٠ مقعد متبقي",
    featured: true,
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85&fit=crop",
  },
  {
    number: "٠٢",
    title: "ورشة الصحافة الاستقصائية",
    titleEn: "Investigative Journalism Workshop",
    description: "ورشة عمل مكثفة مع خبراء الصحافة الاستقصائية",
    date: "٢٢",
    month: "يونيو",
    year: "٢٠٢٥",
    day: "الأحد",
    location: "دبي، الإمارات",
    locationEn: "Dubai, UAE",
    type: "ورشة",
    typeEn: "Workshop",
    seats: "٤٠ مقعد متبقي",
    featured: false,
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=85&fit=crop",
  },
  {
    number: "٠٣",
    title: "مؤتمر الإعلام الرقمي",
    titleEn: "Digital Media Conference",
    description: "مؤتمر متخصص في تحولات الإعلام الرقمي وأدوات الذكاء الاصطناعي",
    date: "٥",
    month: "يوليو",
    year: "٢٠٢٥",
    day: "السبت",
    location: "الكويت",
    locationEn: "Kuwait City",
    type: "مؤتمر",
    typeEn: "Conference",
    seats: "١٢٠ مقعد متبقي",
    featured: false,
    img: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?w=600&q=85&fit=crop",
  },
  {
    number: "٠٤",
    title: "جلسة نقاش: مستقبل الصحافة",
    titleEn: "Panel: Future of Journalism",
    description: "جلسة نقاش مفتوحة مع صحفيين من مختلف دول الخليج",
    date: "١٢",
    month: "يوليو",
    year: "٢٠٢٥",
    day: "السبت",
    location: "مسقط، عُمان",
    locationEn: "Muscat, Oman",
    type: "نقاش",
    typeEn: "Panel",
    seats: "٦٠ مقعد متبقي",
    featured: false,
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=85&fit=crop",
  },
];

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";

export default function EventsSection() {
  const featured = EVENTS[0];
  const rest = EVENTS.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');

        .event-row {
          transition: background 0.25s ease, border-color 0.25s ease;
          cursor: pointer;
        }
        .event-row:hover {
          background: rgba(208,182,106,0.04);
          border-color: rgba(208,182,106,0.25) !important;
        }
        .event-row:hover .event-register {
          background: ${GOLD} !important;
          color: ${NAVY} !important;
          border-color: ${GOLD} !important;
        }
        .event-row:hover .event-img {
          transform: scale(1.06);
        }
        .event-img {
          transition: transform 0.7s cubic-bezier(.2,0,0,1);
        }

        .featured-event-img {
          transition: transform 0.7s cubic-bezier(.2,0,0,1);
        }
        .featured-event:hover .featured-event-img {
          transform: scale(1.03);
        }

        .events-view-all {
          transition: all 0.25s ease;
        }
        .events-view-all:hover {
          background: ${GOLD};
          color: ${NAVY};
          border-color: ${GOLD};
        }

        .register-featured {
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .register-featured:hover {
          opacity: 0.85 !important;
          transform: translateY(-2px);
        }
      `}</style>

      <section className="w-full bg-[#202151] py-24 px-6 md:px-14" dir="rtl">

        {/* ── SECTION HEADER ── */}
        <div className="flex items-end justify-between mb-16">
          <div>
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
                Events · فعاليات
              </span>
            </div>
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
              الفعاليات
            </h2>
            <div className="w-12 h-px mt-4" style={{ background: GOLD, opacity: 0.5 }} />
          </div>

          <button
            className="events-view-all"
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
            كل الفعاليات
          </button>
        </div>

        {/* ── FEATURED EVENT ── */}
        <div
          className="featured-event relative overflow-hidden mb-4"
          style={{
            border: `0.5px solid rgba(208,182,106,0.15)`,
            borderRadius: "2px",
            minHeight: "380px",
            cursor: "pointer",
          }}
        >
          {/* Bg image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={featured.img}
              alt={featured.title}
              className="featured-event-img w-full h-full object-cover"
              style={{ filter: "grayscale(15%) brightness(0.3)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(105deg, rgba(32,33,81,0.98) 0%, rgba(32,33,81,0.82) 55%, rgba(32,33,81,0.45) 100%)`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row gap-10 items-start md:items-center">

            {/* Date block */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center"
              style={{
                width: "90px",
                height: "90px",
                border: `1px solid rgba(208,182,106,0.3)`,
                borderRadius: "2px",
                background: "rgba(208,182,106,0.06)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 900,
                  fontSize: "36px",
                  color: GOLD,
                  lineHeight: 1,
                }}
              >
                {featured.date}
              </span>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "11px",
                  color: CREAM,
                  opacity: 0.5,
                  letterSpacing: "0.1em",
                  marginTop: "4px",
                }}
              >
                {featured.month}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    color: GOLD,
                    background: "rgba(208,182,106,0.1)",
                    padding: "4px 10px",
                    borderRadius: "1px",
                  }}
                >
                  {featured.typeEn}
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: RED,
                    background: "rgba(214,18,20,0.12)",
                    padding: "4px 10px",
                    borderRadius: "1px",
                    border: `0.5px solid ${RED}`,
                  }}
                >
                  فعالية مميزة
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(22px, 3vw, 34px)",
                  color: CREAM,
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  marginBottom: "10px",
                }}
              >
                {featured.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 300,
                  fontSize: "13px",
                  color: CREAM,
                  opacity: 0.5,
                  lineHeight: 1.8,
                  marginBottom: "20px",
                  maxWidth: "500px",
                }}
              >
                {featured.description}
              </p>

              {/* Location + day */}
              <div className="flex items-center gap-5 flex-wrap">
                <div className="flex items-center gap-2">
                  <span style={{ color: GOLD, fontSize: "12px", opacity: 0.6 }}>◎</span>
                  <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: "12px", color: CREAM, opacity: 0.5 }}>
                    {featured.location}
                  </span>
                </div>
                <div style={{ width: "1px", height: "12px", background: GOLD, opacity: 0.2 }} />
                <div className="flex items-center gap-2">
                  <span style={{ color: GOLD, fontSize: "12px", opacity: 0.6 }}>◷</span>
                  <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: "12px", color: CREAM, opacity: 0.5 }}>
                    {featured.day} · {featured.date} {featured.month} {featured.year}
                  </span>
                </div>
                <div style={{ width: "1px", height: "12px", background: GOLD, opacity: 0.2 }} />
                <span
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "11px",
                    color: GOLD,
                    opacity: 0.7,
                  }}
                >
                  {featured.seats}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <button
                className="register-featured"
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: NAVY,
                  background: GOLD,
                  border: "none",
                  padding: "13px 36px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                سجّل الآن
              </button>
            </div>
          </div>
        </div>

        {/* ── EVENT LIST ── */}
        <div
          style={{
            border: `0.5px solid rgba(208,182,106,0.12)`,
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          {rest.map((event, i) => (
            <div
              key={i}
              className="event-row flex items-center gap-5 px-6 py-5"
              style={{
                borderBottom: i < rest.length - 1 ? `0.5px solid rgba(208,182,106,0.1)` : "none",
                border: `0.5px solid transparent`,
              }}
            >
              {/* Date block */}
              <div
                className="flex-shrink-0 flex flex-col items-center justify-center"
                style={{
                  width: "56px",
                  height: "56px",
                  border: `0.5px solid rgba(208,182,106,0.2)`,
                  borderRadius: "2px",
                  background: "rgba(208,182,106,0.05)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 900,
                    fontSize: "20px",
                    color: GOLD,
                    lineHeight: 1,
                  }}
                >
                  {event.date}
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "9px",
                    color: CREAM,
                    opacity: 0.4,
                    marginTop: "2px",
                  }}
                >
                  {event.month}
                </span>
              </div>

              {/* Thumbnail */}
              <div
                className="flex-shrink-0 overflow-hidden"
                style={{ width: "72px", height: "56px", borderRadius: "1px" }}
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="event-img w-full h-full object-cover"
                  style={{ filter: "grayscale(30%) brightness(0.65)" }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: GOLD,
                      opacity: 0.6,
                    }}
                  >
                    {event.typeEn}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: CREAM,
                    lineHeight: 1.4,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {event.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: "11px", color: CREAM, opacity: 0.35 }}>
                    ◎ {event.location}
                  </span>
                  <span style={{ width: "1px", height: "10px", background: GOLD, opacity: 0.2, display: "inline-block" }} />
                  <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: "11px", color: GOLD, opacity: 0.55 }}>
                    {event.seats}
                  </span>
                </div>
              </div>

              {/* Day label */}
              <div className="hidden md:flex flex-col items-center gap-1 flex-shrink-0">
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "11px",
                    color: CREAM,
                    opacity: 0.3,
                    letterSpacing: "0.1em",
                  }}
                >
                  {event.day}
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "11px",
                    color: CREAM,
                    opacity: 0.25,
                  }}
                >
                  {event.year}
                </span>
              </div>

              {/* Register btn */}
              <button
                className="event-register flex-shrink-0"
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: GOLD,
                  background: "transparent",
                  border: `0.5px solid rgba(208,182,106,0.25)`,
                  padding: "8px 20px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                  transition: "all 0.25s ease",
                }}
              >
                سجّل
              </button>
            </div>
          ))}
        </div>

        {/* ── BOTTOM RULE ── */}
        <div
          className="mt-16 flex items-center gap-4"
          style={{ borderTop: `0.5px solid rgba(208,182,106,0.12)`, paddingTop: "24px" }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "12px",
              color: CREAM,
              opacity: 0.35,
              letterSpacing: "0.15em",
            }}
          >
            Gulf Media Platform · الفعاليات
          </span>
          <div className="flex-1 h-px" style={{ background: GOLD, opacity: 0.1 }} />
          <span
            style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontWeight: 300,
              fontSize: "11px",
              color: GOLD,
              opacity: 0.5,
            }}
          >
            ١٥+ فعالية قادمة
          </span>
        </div>

      </section>
    </>
  );
}