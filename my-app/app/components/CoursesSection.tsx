"use client";

const COURSES = [
  {
    number: "٠١",
    title: "الصحافة الاستقصائية الرقمية",
    titleEn: "Digital Investigative Journalism",
    instructor: "خالد البلوشي",
    instructorTitle: "محقق صحفي · ١٥ سنة خبرة",
    duration: "٨ أسابيع",
    lessons: "٢٤ درس",
    level: "متقدم",
    levelEn: "Advanced",
    enrolled: "٣٢٠+",
    featured: true,
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=85&fit=crop",
  },
  {
    number: "٠٢",
    title: "فن التقديم والإلقاء الإعلامي",
    titleEn: "Broadcast Presenting",
    instructor: "سارة المنصوري",
    instructorTitle: "مذيعة · ٨ سنوات خبرة",
    duration: "٤ أسابيع",
    lessons: "١٢ درس",
    level: "مبتدئ",
    levelEn: "Beginner",
    enrolled: "٥٨٠+",
    featured: false,
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=85&fit=crop",
  },
  {
    number: "٠٣",
    title: "الإعلام الرقمي وأدوات الذكاء الاصطناعي",
    titleEn: "AI Tools for Journalists",
    instructor: "أحمد الرشيدي",
    instructorTitle: "مراسل سياسي · ١٢ سنة خبرة",
    duration: "٦ أسابيع",
    lessons: "١٨ درس",
    level: "متوسط",
    levelEn: "Intermediate",
    enrolled: "٤٤٠+",
    featured: false,
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=85&fit=crop",
  },
  {
    number: "٠٤",
    title: "التصوير الصحفي الاحترافي",
    titleEn: "Photojournalism",
    instructor: "نورة القحطاني",
    instructorTitle: "صحفية رقمية · ٦ سنوات",
    duration: "٣ أسابيع",
    lessons: "٩ دروس",
    level: "مبتدئ",
    levelEn: "Beginner",
    enrolled: "٢٩٠+",
    featured: false,
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=85&fit=crop",
  },
];

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";

const LEVEL_COLORS: Record<string, string> = {
  متقدم: RED,
  متوسط: GOLD,
  مبتدئ: "#4CAF50",
};

export default function CoursesSection() {
  const featured = COURSES[0];
  const rest = COURSES.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');

        .course-card {
          transition: border-color 0.3s ease;
          cursor: pointer;
        }
        .course-card:hover {
          border-color: rgba(208,182,106,0.4) !important;
        }
        .course-card-img {
          transition: transform 0.7s cubic-bezier(.2,0,0,1);
        }
        .course-card:hover .course-card-img {
          transform: scale(1.05);
        }
        .course-card:hover .course-enroll {
          background: ${GOLD} !important;
          color: ${NAVY} !important;
          border-color: ${GOLD} !important;
        }

        .featured-course-img {
          transition: transform 0.7s cubic-bezier(.2,0,0,1);
        }
        .featured-course:hover .featured-course-img {
          transform: scale(1.03);
        }

        .courses-view-all {
          transition: all 0.25s ease;
        }
        .courses-view-all:hover {
          background: ${GOLD};
          color: ${NAVY};
          border-color: ${GOLD};
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
                Learn · تعلّم
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
              الدورات التدريبية
            </h2>
            <div className="w-12 h-px mt-4" style={{ background: GOLD, opacity: 0.5 }} />
          </div>

          <button
            className="courses-view-all"
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
            كل الدورات
          </button>
        </div>

        {/* ── FEATURED COURSE ── */}
        <div
          className="featured-course relative overflow-hidden mb-4"
          style={{
            border: `0.5px solid rgba(208,182,106,0.15)`,
            borderRadius: "2px",
            minHeight: "340px",
            cursor: "pointer",
          }}
        >
          {/* Bg image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={featured.img}
              alt={featured.title}
              className="featured-course-img w-full h-full object-cover"
              style={{ filter: "grayscale(20%) brightness(0.3)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(105deg, rgba(32,33,81,0.98) 0%, rgba(32,33,81,0.8) 55%, rgba(32,33,81,0.4) 100%)`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row gap-10 items-start md:items-center">

            {/* Left */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
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
                  {featured.levelEn}
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: CREAM,
                    background: `rgba(214,18,20,0.15)`,
                    padding: "4px 10px",
                    borderRadius: "1px",
                    border: `0.5px solid ${RED}`,
                  }}
                >
                  دورة مميزة
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(22px, 3vw, 36px)",
                  color: CREAM,
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  marginBottom: "6px",
                }}
              >
                {featured.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: GOLD,
                  opacity: 0.7,
                  letterSpacing: "0.1em",
                  marginBottom: "20px",
                }}
              >
                {featured.titleEn}
              </p>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "rgba(208,182,106,0.12)",
                    border: `0.5px solid rgba(208,182,106,0.3)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "12px", color: GOLD }}>◈</span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontWeight: 700, fontSize: "13px", color: CREAM, lineHeight: 1.2 }}>
                    {featured.instructor}
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "11px", color: GOLD, opacity: 0.6 }}>
                    {featured.instructorTitle}
                  </p>
                </div>
              </div>

              {/* Meta pills */}
              <div className="flex items-center gap-4 flex-wrap">
                {[
                  { icon: "◷", val: featured.duration },
                  { icon: "◈", val: featured.lessons },
                  { icon: "◉", val: `${featured.enrolled} مسجل` },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span style={{ color: GOLD, fontSize: "10px", opacity: 0.6 }}>{m.icon}</span>
                    <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: "12px", color: CREAM, opacity: 0.55 }}>
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — CTA */}
            <div className="flex-shrink-0 flex flex-col gap-3 items-start md:items-end">
              <button
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
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              >
                سجّل في الدورة
              </button>
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
                التسجيل مجاني
              </span>
            </div>
          </div>
        </div>

        {/* ── COURSE CARDS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {rest.map((course, i) => (
            <div
              key={i}
              className="course-card flex flex-col overflow-hidden"
              style={{
                border: `0.5px solid rgba(208,182,106,0.12)`,
                borderRadius: "2px",
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "160px" }}>
                <img
                  src={course.img}
                  alt={course.title}
                  className="course-card-img w-full h-full object-cover"
                  style={{ filter: "grayscale(20%) brightness(0.55)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(32,33,81,0.9) 0%, transparent 60%)" }}
                />
                {/* Level badge */}
                <div
                  className="absolute top-3 right-3"
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: CREAM,
                    background: LEVEL_COLORS[course.level] || GOLD,
                    padding: "3px 8px",
                    borderRadius: "1px",
                    opacity: 0.9,
                  }}
                >
                  {course.level}
                </div>
                {/* Episode number */}
                <span
                  className="absolute bottom-3 left-3"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "11px",
                    color: GOLD,
                    opacity: 0.6,
                    letterSpacing: "0.1em",
                  }}
                >
                  {course.number}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <h3
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: CREAM,
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {course.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "11px",
                    color: GOLD,
                    opacity: 0.6,
                    letterSpacing: "0.08em",
                  }}
                >
                  {course.instructor} · {course.instructorTitle}
                </p>

                {/* Meta */}
                <div
                  className="flex items-center gap-4 mt-auto pt-3"
                  style={{ borderTop: `0.5px solid rgba(208,182,106,0.1)` }}
                >
                  <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: "11px", color: CREAM, opacity: 0.4 }}>
                    {course.duration}
                  </span>
                  <span style={{ width: "1px", height: "10px", background: GOLD, opacity: 0.2, display: "inline-block" }} />
                  <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: "11px", color: CREAM, opacity: 0.4 }}>
                    {course.lessons}
                  </span>
                  <span style={{ width: "1px", height: "10px", background: GOLD, opacity: 0.2, display: "inline-block" }} />
                  <span style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", fontSize: "11px", color: GOLD, opacity: 0.6 }}>
                    {course.enrolled} مسجل
                  </span>
                </div>

                <button
                  className="course-enroll mt-1"
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: GOLD,
                    background: "transparent",
                    border: `0.5px solid rgba(208,182,106,0.3)`,
                    padding: "9px",
                    borderRadius: "2px",
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    transition: "all 0.25s ease",
                    width: "100%",
                  }}
                >
                  سجّل الآن
                </button>
              </div>
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
            Gulf Media Platform · الدورات
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
            ٣٠+ دورة تدريبية
          </span>
        </div>

      </section>
    </>
  );
}