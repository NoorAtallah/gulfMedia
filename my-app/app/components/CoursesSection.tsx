import Link from "next/link";
import type { Course } from "@/lib/types";

type Props = {
  courses: Course[];
};

const LEVEL_CLASSES: Record<string, string> = {
  متقدم: "text-[#D61214] bg-[#D61214]/10",
  متوسط: "text-[#D0B66A] bg-[#D0B66A]/10",
  مبتدئ: "text-[#4CAF50] bg-[#4CAF50]/10",
};

const LEVEL_EN: Record<string, string> = {
  متقدم: "Advanced",
  متوسط: "Intermediate",
  مبتدئ: "Beginner",
};

export default function CoursesSection({ courses }: Props) {
  const featured = courses[0];
  const rest = courses.slice(1, 4);

  if (!featured) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .course-card:hover { border-color: rgba(208,182,106,0.4) !important; }
        .course-card-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .course-card:hover .course-card-img { transform: scale(1.05); }
        .course-card:hover .course-enroll { background: #D0B66A !important; color: #202151 !important; border-color: #D0B66A !important; }
        .featured-course-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .featured-course:hover .featured-course-img { transform: scale(1.03); }
        .courses-view-all { transition: all 0.25s ease; }
        .courses-view-all:hover { background: #D0B66A; color: #202151; border-color: #D0B66A; }
        .enroll-btn:hover { opacity: 0.85; }
        .enroll-btn { transition: opacity 0.2s; }
      `}</style>

      <section className="w-full bg-white py-24 px-6 md:px-14" dir="rtl">

        {/* ── HEADER ── */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#D61214]" />
              <span
                className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Learn · تعلّم
              </span>
            </div>
            <h2
              className="text-[#202151] font-black text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              الدورات التدريبية
            </h2>
            <div className="w-12 h-px mt-4 bg-[#D0B66A] opacity-50" />
          </div>

          <Link
            href="/courses"
            className="courses-view-all text-[#202151] bg-transparent border border-[#202151]/25 text-[13px] font-black tracking-wide px-7 py-2.5 rounded-sm no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            كل الدورات
          </Link>
        </div>

        {/* ── FEATURED ── */}
        <Link
          href={`/courses/${featured.id}`}
          className="featured-course relative overflow-hidden mb-4 block no-underline border border-[#D0B66A]/25 rounded-sm"
          style={{ minHeight: "340px" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={featured.cover_url ?? ""}
              alt={featured.title_ar}
              className="featured-course-img w-full h-full object-cover grayscale-[20%] brightness-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#202151]/98 via-[#202151]/80 to-[#202151]/40" />
          </div>

          <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row gap-10 items-start md:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                {featured.level && (
                  <span
                    className={`text-[9px] italic font-bold tracking-[0.3em] px-2.5 py-1 rounded-[1px] ${LEVEL_CLASSES[featured.level] ?? "text-[#D0B66A] bg-[#D0B66A]/10"}`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {LEVEL_EN[featured.level] ?? featured.level}
                  </span>
                )}
                <span
                  className="text-white bg-[#D61214]/15 border border-[#D61214] text-[10px] font-black px-2.5 py-1 rounded-[1px]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  دورة مميزة
                </span>
              </div>

              <h3
                className="text-white font-black text-[clamp(22px,3vw,36px)] leading-[1.25] tracking-[-0.02em] mb-2"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {featured.title_ar}
              </h3>

              {featured.description_ar && (
                <p
                  className="text-white/60 text-[13px] font-bold leading-[1.8] mb-6 max-w-xl"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {featured.description_ar}
                </p>
              )}

              {featured.instructor && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D0B66A]/30 flex-shrink-0">
                    <img
                      src={featured.instructor.avatar_url ?? ""}
                      alt={featured.instructor.full_name_ar}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="text-white text-[13px] font-black leading-none mb-1"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {featured.instructor.full_name_ar}
                    </p>
                    <p
                      className="text-[#D0B66A] text-[11px] italic font-bold opacity-60"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {featured.instructor.specialty} · {featured.instructor.experience_years} سنة خبرة
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-5 flex-wrap">
                {featured.duration_hours && (
                  <span
                    className="text-white/55 text-[12px] font-bold"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {featured.duration_hours} ساعة
                  </span>
                )}
                {featured.level && (
                  <>
                    <span className="w-px h-3 inline-block bg-[#D0B66A]/30" />
                    <span
                      className="text-white/55 text-[12px] font-bold"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {featured.level}
                    </span>
                  </>
                )}
                <span className="w-px h-3 inline-block bg-[#D0B66A]/30" />
                <span
                  className="text-[#D0B66A] text-[12px] font-black"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {featured.price === 0 ? "مجاني" : `${featured.price} ر.س`}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-2 items-start md:items-end">
              <div
                className="enroll-btn text-[#202151] bg-[#D0B66A] text-[14px] font-black px-9 py-3.5 rounded-sm tracking-wide"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                سجّل في الدورة
              </div>
              <span
                className="text-white/30 text-[11px] italic font-bold tracking-[0.1em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {featured.price === 0 ? "التسجيل مجاني" : "سجّل الآن"}
              </span>
            </div>
          </div>
        </Link>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {rest.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="course-card flex flex-col overflow-hidden border border-[#D0B66A]/20 rounded-sm no-underline"
            >
              <div className="relative overflow-hidden h-44">
                <img
                  src={course.cover_url ?? ""}
                  alt={course.title_ar}
                  className="course-card-img w-full h-full object-cover grayscale-[20%] brightness-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/90 to-transparent" />
                {course.level && (
                  <div
                    className={`absolute top-3 right-3 text-[9px] font-black px-2 py-1 rounded-[1px] ${LEVEL_CLASSES[course.level] ?? "text-[#D0B66A] bg-[#D0B66A]/10"}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {course.level}
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 p-5 gap-3">
                <h3
                  className="text-[#202151] text-[15px] font-black leading-[1.4] tracking-[-0.01em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {course.title_ar}
                </h3>

                {course.instructor && (
                  <p
                    className="text-[#D0B66A] text-[11px] italic font-bold opacity-70"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {course.instructor.full_name_ar} · {course.instructor.experience_years} سنة خبرة
                  </p>
                )}

                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[#202151]/8 flex-wrap">
                  {course.duration_hours && (
                    <span
                      className="text-[#202151]/50 text-[11px] font-black"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {course.duration_hours} ساعة
                    </span>
                  )}
                  <span className="w-px h-2.5 inline-block bg-[#D0B66A]/30" />
                  <span
                    className="text-[#D0B66A] text-[11px] font-black"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {course.price === 0 ? "مجاني" : `${course.price} ر.س`}
                  </span>
                </div>

                <div
                  className="course-enroll w-full text-center text-[#202151] bg-transparent border border-[#202151]/20 text-[12px] font-black py-2.5 rounded-sm tracking-wide transition-all duration-200"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  سجّل الآن
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── BOTTOM RULE ── */}
        <div className="mt-16 flex items-center gap-4 border-t border-[#D0B66A]/25 pt-6">
          <span
            className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · الدورات
          </span>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/60 text-[11px] font-black"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ٣٠+ دورة تدريبية
          </span>
        </div>

      </section>
    </>
  );
}