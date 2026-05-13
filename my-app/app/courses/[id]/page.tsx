import { getCourseById, getAllCourses } from "@/lib/queries/courses";
import { notFound } from "next/navigation";
import Link from "next/link";
import EnrollForm from "../../components/EnrollForm";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [course, all] = await Promise.all([
    getCourseById(id),
    getAllCourses(),
  ]);

  if (!course) notFound();

  const related = all.filter((c) => c.id !== id).slice(0, 3);

  const LEVEL_CLASSES: Record<string, string> = {
    متقدم: "text-[#D61214] bg-[#D61214]/10",
    متوسط: "text-[#D0B66A] bg-[#D0B66A]/10",
    مبتدئ: "text-[#4CAF50] bg-[#4CAF50]/10",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .related-card:hover .rel-img { transform: scale(1.05); }
        .rel-img { transition: transform 0.6s cubic-bezier(.2,0,0,1); }
        .back-link:hover { color: #D0B66A; }
        .back-link { transition: color 0.2s; }
      `}</style>

      <main className="w-full min-h-screen bg-white" dir="rtl">

        {/* ── HERO ── */}
        <div className="w-full bg-[#202151] px-6 md:px-14 pt-20 pb-16">
          <div className="flex flex-col md:flex-row gap-10 items-start max-w-5xl">

            {/* Cover */}
            <div className="flex-shrink-0 w-full md:w-72 h-48 md:h-52 overflow-hidden border border-[#D0B66A]/30">
              <img
                src={course.cover_url ?? ""}
                alt={course.title_ar}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="w-6 h-px bg-[#D61214]" />
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Learn · تعلّم
                </span>
                {course.level && (
                  <span
                    className={`text-[9px] font-black px-2.5 py-1 rounded-[1px] ${LEVEL_CLASSES[course.level] ?? "text-[#D0B66A] bg-[#D0B66A]/10"}`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {course.level}
                  </span>
                )}
              </div>

              <h1
                className="text-white font-black text-[clamp(24px,4vw,52px)] leading-[1.15] tracking-[-0.02em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {course.title_ar}
              </h1>

              {course.description_ar && (
                <p
                  className="text-white/65 text-[14px] font-bold leading-[1.9] max-w-2xl"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {course.description_ar}
                </p>
              )}

              {course.instructor && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-[#D0B66A]/30 flex-shrink-0">
                    <img
                      src={course.instructor.avatar_url ?? ""}
                      alt={course.instructor.full_name_ar}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="text-white text-[13px] font-black leading-none mb-1"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {course.instructor.full_name_ar}
                    </p>
                    <p
                      className="text-[#D0B66A] text-[11px] italic font-bold opacity-60"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {course.instructor.specialty} · {course.instructor.experience_years} سنة خبرة
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 flex-wrap pt-2 border-t border-[#D0B66A]/15">
                {course.duration_hours && (
                  <span
                    className="text-white/50 bg-white/5 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {course.duration_hours} ساعة تدريبية
                  </span>
                )}
                <span
                  className="text-[#D0B66A] bg-[#D0B66A]/10 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {course.price === 0 ? "مجاني" : `${course.price} ر.س`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="w-full bg-[#202151] border-t border-[#D0B66A]/10 px-6 md:px-14 py-6">
          <div className="flex items-center gap-10 flex-wrap">
            {[
              { n: `${course.duration_hours ?? "—"}`, l: "ساعة تدريبية" },
              { n: course.level ?? "—", l: "المستوى" },
              { n: course.price === 0 ? "مجاني" : `${course.price} ر.س`, l: "رسوم التسجيل" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className="text-[#D0B66A] font-black text-[clamp(18px,2vw,28px)] leading-none tracking-[-0.02em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {s.n}
                </span>
                <span
                  className="text-white/40 text-[11px] italic font-bold tracking-[0.1em]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ENROLL FORM ── */}
        {/* ── ENROLL + DETAILS ── */}
<div className="px-6 md:px-14 py-16 border-b border-[#D0B66A]/15">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

    {/* Left — about the course */}
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="w-6 h-px bg-[#D61214]" />
        <h2
          className="text-[#202151] font-black text-[20px] tracking-[-0.01em]"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          عن الدورة
        </h2>
      </div>

      {course.description_ar && (
        <p
          className="text-[#202151]/70 text-[15px] font-bold leading-[2.2]"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          {course.description_ar}
        </p>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "المستوى", value: course.level ?? "—" },
          { label: "المدة", value: course.duration_hours ? `${course.duration_hours} ساعة` : "—" },
          { label: "رسوم التسجيل", value: course.price === 0 ? "مجاني" : `${course.price} ر.س` },
          { label: "المدرب", value: course.instructor?.full_name_ar ?? "—" },
        ].map((s, i) => (
          <div key={i} className="border border-[#D0B66A]/20 p-4 flex flex-col gap-1">
            <span
              className="text-[#202151]/40 text-[10px] font-black tracking-widest"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {s.label}
            </span>
            <span
              className="text-[#202151] text-[15px] font-black"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* Instructor card */}
      {course.instructor && (
        <div className="flex items-center gap-4 border border-[#D0B66A]/20 p-5">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-[#D0B66A]/30 flex-shrink-0">
            <img
              src={course.instructor.avatar_url ?? ""}
              alt={course.instructor.full_name_ar}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p
              className="text-[#202151] text-[14px] font-black mb-1"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {course.instructor.full_name_ar}
            </p>
            <p
              className="text-[#D0B66A] text-[11px] italic font-bold opacity-70"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {course.instructor.specialty} · {course.instructor.experience_years} سنة خبرة
            </p>
          </div>
        </div>
      )}
    </div>

    {/* Right — form */}
    <div>
      <EnrollForm courseId={course.id} />
    </div>

  </div>
</div>

        {/* ── RELATED ── */}
        {related.length > 0 && (
          <div className="px-6 md:px-14 py-16">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-[#D61214]" />
              <h2
                className="text-[#202151] font-black text-[clamp(18px,2.5vw,28px)] tracking-[-0.01em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                دورات أخرى
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D0B66A]/15">
              {related.map((c) => (
                <Link
                  key={c.id}
                  href={`/courses/${c.id}`}
                  className="bg-white flex flex-col no-underline group"
                >
                  <div className="relative overflow-hidden h-44">
                    <img
                      src={c.cover_url ?? ""}
                      alt={c.title_ar}
                      className="rel-img w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/90 to-transparent" />
                    {c.level && (
                      <span
                        className={`absolute top-3 right-3 text-[9px] font-black px-2 py-1 rounded-[1px] ${LEVEL_CLASSES[c.level] ?? "text-[#D0B66A] bg-[#D0B66A]/10"}`}
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {c.level}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1 border-b border-[#D0B66A]/15 group-hover:border-[#D0B66A]/50 transition-colors duration-300">
                    <h3
                      className="text-[#202151] text-[14px] font-black leading-[1.6]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {c.title_ar}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#D0B66A]/10">
                      {c.instructor && (
                        <span
                          className="text-[#D0B66A] text-[11px] italic font-bold"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {c.instructor.full_name_ar}
                        </span>
                      )}
                      <span
                        className="text-[#202151]/40 text-[10px] font-black"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {c.price === 0 ? "مجاني" : `${c.price} ر.س`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── BACK ── */}
        <div className="px-6 md:px-14 pb-16 flex items-center gap-4 border-t border-[#D0B66A]/20 pt-8">
          <Link
            href="/courses"
            className="back-link text-[#202151]/40 text-[12px] font-black tracking-wide no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ← العودة إلى الدورات
          </Link>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/50 text-[11px] italic font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · الدورات
          </span>
        </div>

      </main>
    </>
  );
}