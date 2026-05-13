"use client";

import { useState } from "react";
import Link from "next/link";
import type { Journalist } from "@/lib/types";

const COUNTRIES = ["الكل", "السعودية", "الإمارات", "الكويت", "قطر", "البحرين", "عُمان"];
const SPECIALTIES = ["الكل", "صحافة رقمية", "إعلام مرئي", "استقصائية", "بودكاست", "صحافة سياسية"];
const EXPERIENCE = ["الكل", "١-٥ سنوات", "٥-١٠ سنوات", "١٠+ سنوات"];

type Props = { journalists: Journalist[] };

export default function JournalistsPage({ journalists }: Props) {
  const [country, setCountry] = useState("الكل");
  const [specialty, setSpecialty] = useState("الكل");
  const [experience, setExperience] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = journalists.filter((j) => {
    const matchCountry = country === "الكل" || j.country === country;
    const matchSpecialty = specialty === "الكل" || j.specialty === specialty;
    const matchExperience =
      experience === "الكل" ||
      (experience === "١-٥ سنوات" && (j.experience_years ?? 0) <= 5) ||
      (experience === "٥-١٠ سنوات" && (j.experience_years ?? 0) > 5 && (j.experience_years ?? 0) <= 10) ||
      (experience === "١٠+ سنوات" && (j.experience_years ?? 0) > 10);
    const matchSearch = j.full_name_ar.includes(search);
    return matchCountry && matchSpecialty && matchExperience && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .journalist-card:hover .card-img { transform: scale(1.05); }
        .journalist-card:hover .card-overlay { opacity: 1; }
        .journalist-card:hover .card-border { opacity: 1; }
        .card-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .card-overlay { opacity: 0; transition: opacity 0.4s ease; }
        .card-border { opacity: 0; transition: opacity 0.35s ease; }
      `}</style>

      <main className="w-full min-h-screen bg-white" dir="rtl">

        {/* ── PAGE HEADER ── */}
        <div className="w-full bg-[#202151] px-6 md:px-14 pt-20 pb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#D61214]" />
            <span
              className="text-[#D0B66A] text-[11px] italic tracking-[0.3em] opacity-80 font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Journalists · الإعلاميون
            </span>
          </div>
          <h1
            className="text-white font-black text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            الإعلاميون
          </h1>
          <p
            className="text-white/50 text-[14px] font-bold leading-[1.8] max-w-xl"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            تعرّف على نخبة من الإعلاميين والصحفيين المحترفين في منطقة الخليج العربي
          </p>
        </div>

        <div className="px-6 md:px-14 py-12">

          {/* ── SEARCH + FILTERS ── */}
          <div className="flex flex-col gap-6 mb-12">

            {/* Search */}
            <input
              type="text"
              placeholder="ابحث باسم الإعلامي..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 bg-transparent border border-[#202151]/20 text-[#202151] text-[13px] font-bold px-4 py-3 rounded-sm outline-none focus:border-[#D0B66A] transition-colors duration-200 placeholder:text-[#202151]/30 placeholder:font-normal"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              dir="rtl"
            />

            {/* Filter rows */}
            <div className="flex flex-col gap-3">
              {/* Country */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[#202151]/40 text-[11px] font-black tracking-wide ml-2"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  الدولة
                </span>
                {COUNTRIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCountry(c)}
                    className={`text-[12px] font-bold px-4 py-1.5 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
                      country === c
                        ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                        : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
                    }`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Specialty */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[#202151]/40 text-[11px] font-black tracking-wide ml-2"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  التخصص
                </span>
                {SPECIALTIES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpecialty(s)}
                    className={`text-[12px] font-bold px-4 py-1.5 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
                      specialty === s
                        ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                        : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
                    }`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Experience */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[#202151]/40 text-[11px] font-black tracking-wide ml-2"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  الخبرة
                </span>
                {EXPERIENCE.map((e) => (
                  <button
                    key={e}
                    onClick={() => setExperience(e)}
                    className={`text-[12px] font-bold px-4 py-1.5 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
                      experience === e
                        ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                        : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
                    }`}
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <p
              className="text-[#202151]/40 text-[12px] font-bold"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {filtered.length} إعلامي
            </p>
          </div>

          {/* ── GRID ── */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <p
                className="text-[#202151]/30 text-[18px] font-black"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                لا توجد نتائج
              </p>
              <p
                className="text-[#202151]/20 text-[13px] font-bold"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                حاول تغيير الفلاتر
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((j) => (
                <Link
                  key={j.id}
                  href={`/journalists/${j.id}`}
                  className="journalist-card relative cursor-pointer no-underline"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <div className="card-border absolute inset-0 z-20 pointer-events-none border border-[#D0B66A]" />
                    <img
                      src={j.avatar_url ?? ""}
                      alt={j.full_name_ar}
                      className="card-img w-full h-full object-cover brightness-[0.85] grayscale-[20%]"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#202151]/95 via-[#202151]/40 to-transparent" />
                    <div className="card-overlay absolute inset-0 z-10 flex items-center justify-center bg-[#202151]/75">
                      <div className="text-center px-4">
                        <div className="w-8 h-px bg-[#D0B66A] mx-auto mb-3" />
                        <p
                          className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.15em] mb-2"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {j.specialty}
                        </p>
                        <p
                          className="text-[#F5F1E8] text-[10px] font-bold opacity-60"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {j.experience_years} سنوات خبرة
                        </p>
                        <div className="w-8 h-px bg-[#D0B66A] mx-auto mt-3" />
                      </div>
                    </div>
                    <div
                      className="absolute top-3 right-3 z-20 text-[#202151] bg-[#D0B66A] text-[9px] font-black px-2 py-1 rounded-[1px] tracking-wide"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {j.country}
                    </div>
                  </div>
                  <div className="pt-4 pb-2 border-b border-[#D0B66A]/30">
                    <p
                      className="text-[#202151] font-black text-[14px] mb-1 tracking-[-0.01em]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {j.full_name_ar}
                    </p>
                    <p
                      className="text-[#D0B66A] text-[11px] italic font-bold opacity-80"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {j.specialty}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}