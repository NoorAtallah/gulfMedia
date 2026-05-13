"use client";

import { useState } from "react";
import Link from "next/link";
import type { Article, Category } from "@/lib/types";

type Props = {
  articles: Article[];
  categories: Category[];
};

export default function ArticlesPage({ articles, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    const matchCategory =
      activeCategory === "الكل" || a.category?.name_ar === activeCategory;
    const matchSearch =
      search === "" ||
      a.title_ar.includes(search) ||
      a.excerpt_ar?.includes(search);
    return matchCategory && matchSearch;
  });

  const featured = filtered.find((a) => a.is_featured);
  const rest = filtered.filter((a) => !a.is_featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .article-card-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .article-card:hover .article-card-img { transform: scale(1.05); }
        .article-card:hover .article-card-border { opacity: 1; }
        .article-card-border { opacity: 0; transition: opacity 0.35s ease; }
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
              Articles · المقالات
            </span>
          </div>
          <h1
            className="text-white font-black text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            المقالات
          </h1>
          <p
            className="text-white/60 text-[14px] font-bold leading-[1.8] max-w-xl"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            تحقيقات ومقالات معمقة من نخبة الإعلاميين الخليجيين
          </p>
        </div>

        <div className="px-6 md:px-14 py-12">

          {/* ── SEARCH + FILTERS ── */}
          <div className="flex flex-col gap-5 mb-14">
            <input
              type="text"
              placeholder="ابحث في المقالات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 bg-transparent border border-[#202151]/20 text-[#202151] text-[13px] font-bold px-4 py-3 rounded-sm outline-none focus:border-[#D0B66A] transition-colors duration-200 placeholder:text-[#202151]/30 placeholder:font-normal"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            />

            <div className="flex items-center gap-2 flex-wrap">
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
              {filtered.length} مقال
            </p>
          </div>

          {/* ── FEATURED ── */}
          {featured && (
            <Link
              href={`/articles/${featured.id}`}
              className="article-card relative block w-full no-underline mb-px overflow-hidden"
              style={{ minHeight: "420px" }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={featured.cover_url ?? ""}
                  alt={featured.title_ar}
                  className="article-card-img w-full h-full object-cover brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/98 via-[#202151]/50 to-transparent" />
                <div className="article-card-border absolute inset-0 border border-[#D0B66A]" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
                <div className="flex items-center gap-3 mb-4">
                  {featured.category && (
                    <span
                      className="text-[#D0B66A] bg-[#D0B66A]/12 text-[9px] italic font-bold tracking-[0.3em] px-2.5 py-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {featured.category.name_en}
                    </span>
                  )}
                  <span
                    className="text-[#D61214] bg-[#D61214]/12 text-[10px] font-black px-2.5 py-1"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    مقال مميز
                  </span>
                </div>

                <h2
                  className="text-white font-black text-[clamp(22px,3.5vw,42px)] leading-[1.2] tracking-[-0.02em] mb-3 max-w-3xl"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {featured.title_ar}
                </h2>

                <p
                  className="text-white/70 text-[14px] font-bold leading-[1.8] max-w-2xl mb-6"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {featured.excerpt_ar}
                </p>

                <div className="flex items-center gap-4">
                  <span
                    className="text-[#D0B66A] text-[12px] italic font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {featured.journalist?.full_name_ar}
                  </span>
                  <span className="w-px h-3 inline-block bg-[#D0B66A]/30" />
                  <span
                    className="text-white/60 text-[12px] font-bold"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {featured.read_time_minutes} دقائق قراءة
                  </span>
                  {featured.published_at && (
                    <>
                      <span className="w-px h-3 inline-block bg-[#D0B66A]/30" />
                      <span
                        className="text-white/40 text-[12px] font-bold"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {new Date(featured.published_at).toLocaleDateString("ar-SA")}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          )}

          {/* ── GRID ── */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D0B66A]/15 mt-px">
              {rest.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="article-card bg-white flex flex-col no-underline group"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={article.cover_url ?? ""}
                      alt={article.title_ar}
                      className="article-card-img w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/90 to-transparent" />
                    <div className="article-card-border absolute inset-0 border border-[#D0B66A]" />
                    {article.category && (
                      <span
                        className="absolute bottom-3 right-3 text-[#D0B66A] bg-[#202151]/85 text-[8px] italic font-bold tracking-[0.25em] px-2 py-0.5"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {article.category.name_en}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col gap-3 flex-1 border-b border-[#D0B66A]/15 group-hover:border-[#D0B66A]/50 transition-colors duration-300">
                    <h3
                      className="text-[#202151] text-[15px] font-black leading-[1.6] tracking-[-0.01em]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {article.title_ar}
                    </h3>

                    {article.excerpt_ar && (
                      <p
                        className="text-[#202151]/60 text-[12px] font-bold leading-[1.8] line-clamp-2"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {article.excerpt_ar}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#D0B66A]/10">
                      <span
                        className="text-[#D0B66A] text-[11px] italic font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {article.journalist?.full_name_ar}
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          className="text-[#202151]/40 text-[10px] font-black"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {article.read_time_minutes} د قراءة
                        </span>
                        {article.published_at && (
                          <>
                            <span className="w-px h-3 inline-block bg-[#D0B66A]/20" />
                            <span
                              className="text-[#202151]/40 text-[10px] font-black"
                              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                            >
                              {new Date(article.published_at).toLocaleDateString("ar-SA")}
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

          {/* ── EMPTY STATE ── */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-3 border border-[#D0B66A]/15">
              <p
                className="text-[#202151]/30 text-[18px] font-black"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                لا توجد مقالات
              </p>
              <p
                className="text-[#202151]/20 text-[13px] font-bold"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                حاول تغيير الفلتر أو كلمة البحث
              </p>
            </div>
          )}
        </div>

        {/* ── BOTTOM RULE ── */}
        <div className="px-6 md:px-14 pb-16 flex items-center gap-4 border-t border-[#D0B66A]/20 pt-8">
          <span
            className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · المقالات
          </span>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/60 text-[11px] font-black"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            {articles.length}+ مقال منشور
          </span>
        </div>

      </main>
    </>
  );
}