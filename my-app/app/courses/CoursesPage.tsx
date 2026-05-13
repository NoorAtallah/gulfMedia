"use client";

import { useState } from "react";
import Link from "next/link";
import type { Course } from "@/lib/types";

type Props = { courses: Course[] };

const LEVELS = ["الكل", "مبتدئ", "متوسط", "متقدم"];

const LEVEL_CLASSES: Record<string, string> = {
  متقدم: "text-[#D61214] bg-[#D61214]/10",
  متوسط: "text-[#D0B66A] bg-[#D0B66A]/10",
  مبتدئ: "text-[#4CAF50] bg-[#4CAF50]/10",
};

export default function CoursesPage({ courses }: Props) {
  const [level, setLevel] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    const matchLevel = level === "الكل" || c.level === level;
    const matchSearch = search === "" || c.title_ar.includes(search);
    return matchLevel && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .course-card { transition: border-color 0.3s ease; }
        .course-card:hover { border-color: rgba(208,182,106,0.5) !important; }
        .course-card-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .course-card:hover .course-card-img { transform: scale(1.05); }
        .enroll-btn:hover { background: #D0B66A !important; color: #202151 !important; border-color: #D0B66A !important; }
        .enroll-btn { transition: all 0.25s ease; }
      `}</style>

      <main className="w-full min-h-screen bg-white" dir="rtl">

        {/* ── PAGE HEADER ── */}
        <div className="w-full bg-[#202151] px-6 md:px-14 pt-20 pb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#D61214]" />
            <span
              className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Learn · تعلّم
            </span>
          </div>
          <h1
            className="text-white font-black text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            الدورات التدريبية
          </h1>
          <p
            className="text-white/60 text-[14px] font-bold leading-[1.8] max-w-xl"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            دورات احترافية من نخبة الإعلاميين الخليجيين لتطوير مهاراتك في الصحافة والإعلام
          </p>
        </div>

        <div className="px-6 md:px-14 py-12">

          {/* ── FILTERS ── */}
          <div className="flex flex-col gap-5 mb-12">
            <input
              type="text"
              placeholder="ابحث في الدورات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 bg-transparent border border-[#202151]/20 text-[#202151] text-[13px] font-bold px-4 py-3 rounded-sm outline-none focus:border-[#D0B66A] transition-colors duration-200 placeholder:text-[#202151]/30 placeholder:font-normal"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            />

            <div className="flex items-center gap-2 flex-wrap">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`text-[12px] font-black px-5 py-2 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
                    level === l
                      ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                      : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
                  }`}
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {l}
                </button>
              ))}
            </div>

            <p
              className="text-[#202151]/40 text-[12px] font-bold"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {filtered.length} دورة
            </p>
          </div>

          {/* ── GRID ── */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3 border border-[#D0B66A]/15">
              <p
                className="text-[#202151]/30 text-[18px] font-black"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                لا توجد دورات
              </p>
              <p
                className="text-[#202151]/20 text-[13px] font-bold"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                حاول تغيير الفلتر
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="course-card flex flex-col overflow-hidden border border-[#D0B66A]/20 rounded-sm no-underline"
                >
                  <div className="relative overflow-hidden h-48">
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
                    <span
                      className="absolute bottom-3 right-3 text-[#D0B66A] bg-[#202151]/85 text-[8px] italic font-bold tracking-[0.25em] px-2 py-0.5"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {course.price === 0 ? "Free" : "Paid"}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <h3
                      className="text-[#202151] text-[15px] font-black leading-[1.4] tracking-[-0.01em]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {course.title_ar}
                    </h3>

                    {course.description_ar && (
                      <p
                        className="text-[#202151]/55 text-[12px] font-bold leading-[1.8] line-clamp-2"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {course.description_ar}
                      </p>
                    )}

                    {course.instructor && (
                      <p
                        className="text-[#D0B66A] text-[11px] italic font-bold opacity-70"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {course.instructor.full_name_ar} · {course.instructor.experience_years} سنة خبرة
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[#202151]/8">
                      {course.duration_hours && (
                        <>
                          <span
                            className="text-[#202151]/50 text-[11px] font-black"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            {course.duration_hours} ساعة
                          </span>
                          <span className="w-px h-2.5 inline-block bg-[#D0B66A]/30" />
                        </>
                      )}
                      {course.level && (
                        <>
                          <span
                            className="text-[#202151]/50 text-[11px] font-black"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            {course.level}
                          </span>
                          <span className="w-px h-2.5 inline-block bg-[#D0B66A]/30" />
                        </>
                      )}
                      <span
                        className="text-[#D0B66A] text-[12px] font-black"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {course.price === 0 ? "مجاني" : `${course.price} ر.س`}
                      </span>
                    </div>

                    <div
                      className="enroll-btn w-full text-center text-[#202151] bg-transparent border border-[#202151]/20 text-[12px] font-black py-2.5 rounded-sm tracking-wide"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      سجّل الآن
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── BOTTOM RULE ── */}
          <div className="mt-16 flex items-center gap-4 border-t border-[#D0B66A]/20 pt-8">
            <Link
              href="/"
              className="text-[#202151]/40 text-[12px] font-black tracking-wide no-underline hover:text-[#D0B66A] transition-colors duration-200"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              ← العودة للرئيسية
            </Link>
            <div className="flex-1 h-px bg-[#D0B66A]/15" />
            <span
              className="text-[#D0B66A]/50 text-[11px] italic font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Gulf Media Platform · الدورات
            </span>
          </div>
        </div>
      </main>
    </>
  );
}