"use client";

import Link from "next/link";
import { useState } from "react";
import type { LibraryResource } from "@/lib/types";

type Props = { resources: LibraryResource[] };

const CATEGORIES = ["الكل", "صحافة رقمية", "إعلام مرئي", "استقصائية", "بودكاست", "تقارير"];

const TYPE_EN: Record<string, string> = {
  كتاب: "Book",
  تقرير: "Report",
  دليل: "Guide",
};

const TAG_CLASSES: Record<string, string> = {
  gold: "bg-[#D0B66A]/20 text-[#D0B66A]",
  red: "bg-[#D61214]/20 text-[#D61214]",
  navy: "bg-[#202151]/15 text-[#202151]",
};

export default function LibrarySection({ resources }: Props) {
  const [active, setActive] = useState("الكل");

  const filtered = active === "الكل"
    ? resources
    : resources.filter((r) => r.category?.name_ar === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .lib-card:hover .lib-img { transform: scale(1.05); }
        .lib-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .lib-card:hover .lib-border { opacity: 1; }
        .lib-border { opacity: 0; transition: opacity 0.35s ease; }
        .lib-view-all { transition: all 0.25s ease; }
        .lib-view-all:hover { background: #D0B66A; color: #202151; border-color: #D0B66A; }
      `}</style>

      <section className="w-full bg-white py-24 px-6 md:px-14" dir="rtl">

        {/* ── HEADER ── */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#D61214]" />
              <span
                className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Library · المكتبة
              </span>
            </div>
            <h2
              className="text-[#202151] font-black text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              المكتبة الإعلامية
            </h2>
            <div className="w-12 h-px mt-4 bg-[#D0B66A] opacity-50" />
          </div>

          <Link
            href="/library"
            className="lib-view-all text-[#202151] text-[13px] font-black tracking-wide px-7 py-2.5 rounded-sm border border-[#202151]/25 no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            عرض الكل
          </Link>
        </div>

        {/* ── FILTER TABS ── */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[12px] font-black tracking-wide px-5 py-2 rounded-sm border transition-all duration-200 cursor-pointer ${
                active === cat
                  ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                  : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
              }`}
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── GRID ── */}
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center py-24 border border-[#D0B66A]/15">
            <p
              className="text-[#202151]/25 text-[15px] font-black"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              لا توجد موارد في هذه الفئة
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D0B66A]/15">
            {filtered.map((resource) => (
              <Link
                key={resource.id}
                href={resource.file_url ?? "#"}
                target={resource.file_url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="lib-card group bg-white flex flex-col no-underline"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-44">
                  <img
                    src={resource.cover_url ?? ""}
                    alt={resource.title_ar}
                    className="lib-img w-full h-full object-cover brightness-75 grayscale-[20%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/90 to-transparent" />
                  <div className="lib-border absolute inset-0 border border-[#D0B66A]" />

                  {/* Type badge */}
                  <span
                    className="absolute top-3 right-3 text-[#D0B66A] bg-[#202151]/80 text-[8px] italic font-bold tracking-[0.25em] px-2.5 py-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {TYPE_EN[resource.type] ?? resource.type}
                  </span>

                  {/* Tag badge */}
                  {resource.tag && (
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-[1px] ${TAG_CLASSES["gold"]}`}
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {resource.tag}
                    </span>
                  )}

                  {/* Arabic type bottom */}
                  <span
                    className="absolute bottom-3 right-3 text-white/60 text-[11px] font-bold"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {resource.type}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3 border-b border-[#D0B66A]/15 group-hover:border-[#D0B66A]/50 transition-colors duration-300">
                  <h3
                    className="text-[#202151] text-[14px] font-black leading-[1.5] tracking-[-0.01em]"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {resource.title_ar}
                  </h3>

                  {resource.description_ar && (
                    <p
                      className="text-[#202151]/55 text-[12px] font-bold leading-[1.8] line-clamp-2"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {resource.description_ar}
                    </p>
                  )}

                  {/* Meta row */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#D0B66A]/10">
                    <span
                      className="text-[#D0B66A] text-[10px] italic font-bold opacity-80"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {resource.author_name_ar}
                    </span>
                    <div className="flex items-center gap-3">
                      {resource.pages && (
                        <>
                          <span
                            className="text-[#202151]/40 text-[10px] font-black"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            {resource.pages} صفحة
                          </span>
                          <span className="w-px h-3 bg-[#D0B66A]/30 inline-block" />
                        </>
                      )}
                      {resource.year && (
                        <span
                          className="text-[#202151]/40 text-[10px] font-black"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {resource.year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ── BOTTOM RULE ── */}
        <div className="mt-16 flex items-center gap-4 border-t border-[#D0B66A]/30 pt-6">
          <span
            className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · المكتبة
          </span>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/60 text-[11px] font-black"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ٢٠٠+ مرجع متاح
          </span>
        </div>

      </section>
    </>
  );
}