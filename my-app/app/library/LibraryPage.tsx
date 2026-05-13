"use client";

import { useState } from "react";
import Link from "next/link";
import type { LibraryResource, Category } from "@/lib/types";

type Props = {
  resources: LibraryResource[];
  categories: Category[];
};

const TYPE_EN: Record<string, string> = {
  كتاب: "Book",
  تقرير: "Report",
  دليل: "Guide",
};

const TYPES = ["الكل", "كتاب", "تقرير", "دليل"];

export default function LibraryPage({ resources, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [activeType, setActiveType] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = resources.filter((r) => {
    const matchCategory = activeCategory === "الكل" || r.category?.name_ar === activeCategory;
    const matchType = activeType === "الكل" || r.type === activeType;
    const matchSearch = search === "" || r.title_ar.includes(search) || r.author_name_ar?.includes(search);
    return matchCategory && matchType && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .lib-card:hover .lib-img { transform: scale(1.05); }
        .lib-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .lib-card:hover .lib-border { opacity: 1; }
        .lib-border { opacity: 0; transition: opacity 0.35s ease; }
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
              Library · المكتبة
            </span>
          </div>
          <h1
            className="text-white font-black text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            المكتبة الإعلامية
          </h1>
          <p
            className="text-white/60 text-[14px] font-bold leading-[1.8] max-w-xl"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            مراجع وكتب وتقارير وأدلة متخصصة في مجال الإعلام الخليجي
          </p>

          {/* Stats */}
          <div className="flex items-center gap-10 mt-10 flex-wrap">
            {[
              { n: `${resources.length}+`, l: "مرجع متاح" },
              { n: "٣", l: "أنواع موارد" },
              { n: `${categories.length}`, l: "تصنيف" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className="text-[#D0B66A] font-black text-[clamp(20px,2.5vw,32px)] leading-none tracking-[-0.02em]"
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

        <div className="px-6 md:px-14 py-12">

          {/* ── SEARCH ── */}
          <div className="flex flex-col gap-5 mb-12">
            <input
              type="text"
              placeholder="ابحث في المكتبة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 bg-transparent border border-[#202151]/20 text-[#202151] text-[13px] font-bold px-4 py-3 rounded-sm outline-none focus:border-[#D0B66A] transition-colors duration-200 placeholder:text-[#202151]/30 placeholder:font-normal"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            />

            {/* Type filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[#202151]/40 text-[11px] font-black tracking-wide ml-1"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                النوع
              </span>
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`text-[12px] font-black px-5 py-2 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
                    activeType === t
                      ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                      : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
                  }`}
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[#202151]/40 text-[11px] font-black tracking-wide ml-1"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                التصنيف
              </span>
              <button
                onClick={() => setActiveCategory("الكل")}
                className={`text-[12px] font-black px-5 py-2 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
                  activeCategory === "الكل"
                    ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                    : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
                }`}
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                الكل
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name_ar)}
                  className={`text-[12px] font-black px-5 py-2 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
                    activeCategory === cat.name_ar
                      ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                      : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
                  }`}
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {cat.name_ar}
                </button>
              ))}
            </div>

            <p
              className="text-[#202151]/40 text-[12px] font-bold"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {filtered.length} مرجع
            </p>
          </div>

          {/* ── GRID ── */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3 border border-[#D0B66A]/15">
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
                حاول تغيير الفلتر أو كلمة البحث
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#D0B66A]/15">
              {filtered.map((resource) => (
                <Link
  key={resource.id}
  href={`/library/${resource.id}`}
  className="lib-card group bg-white flex flex-col no-underline"
>
                  {/* Image */}
                  <div className="relative overflow-hidden h-52">
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

                    {/* Tag */}
                    {resource.tag && (
                      <span
                        className="absolute top-3 left-3 text-[#D0B66A] bg-[#D0B66A]/15 text-[10px] font-black px-2.5 py-1 rounded-[1px]"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {resource.tag}
                      </span>
                    )}

                    {/* Arabic type */}
                    <span
                      className="absolute bottom-3 right-3 text-white/60 text-[11px] font-bold"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {resource.type}
                    </span>

                    {/* Download hint */}
                    {resource.file_url && (
                      <span
                        className="absolute bottom-3 left-3 text-white/40 text-[9px] italic font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Download ↓
                      </span>
                    )}
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

                    {resource.category && (
                      <span
                        className="text-[#202151] bg-[#202151]/6 text-[9px] font-black px-2 py-1 rounded-[1px] tracking-wide self-start"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {resource.category.name_ar}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#D0B66A]/10">
                      <span
                        className="text-[#D0B66A] text-[10px] italic font-bold opacity-80"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {resource.author_name_ar}
                      </span>
                      <div className="flex items-center gap-2">
                        {resource.pages && (
                          <span
                            className="text-[#202151]/40 text-[10px] font-black"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            {resource.pages} ص
                          </span>
                        )}
                        {resource.year && (
                          <>
                            <span className="w-px h-2.5 inline-block bg-[#D0B66A]/30" />
                            <span
                              className="text-[#202151]/40 text-[10px] font-black"
                              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                            >
                              {resource.year}
                            </span>
                          </>
                        )}
                      </div>
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
              Gulf Media Platform · المكتبة
            </span>
          </div>
        </div>
      </main>
    </>
  );
}