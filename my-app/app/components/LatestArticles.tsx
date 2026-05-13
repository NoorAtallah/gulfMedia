import Link from "next/link";
import type { Article } from "@/lib/types";

type Props = {
  featured: Article | null;
  articles: Article[];
};

export default function LatestArticles({ featured, articles }: Props) {
  if (!featured) return null;

  const rest = articles.filter((a) => a.id !== featured.id).slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .article-card-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .article-card:hover .article-card-img { transform: scale(1.05); }
        .article-card:hover .article-card-border { opacity: 1; }
        .article-card-border { opacity: 0; transition: opacity 0.35s ease; }
        .read-more { transition: gap 0.25s ease; }
        .article-card:hover .read-more { gap: 10px; }
        .articles-view-all { transition: all 0.25s ease; }
        .articles-view-all:hover { background: #D0B66A; color: #202151; border-color: #D0B66A; }
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
                Latest · أحدث
              </span>
            </div>
            <h2
              className="text-[#202151] font-black text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              أحدث المقالات
            </h2>
            <div className="w-12 h-px mt-4 bg-[#D0B66A] opacity-50" />
          </div>

          <Link
            href="/articles"
            className="articles-view-all text-[#202151] bg-transparent border border-[#202151]/25 text-[13px] font-black tracking-wide px-7 py-2.5 rounded-sm no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            عرض الكل
          </Link>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#D0B66A]/15">

          {/* FEATURED */}
          <Link
            href={`/articles/${featured.id}`}
            className="article-card relative cursor-pointer md:col-span-2 bg-white no-underline block"
            style={{ minHeight: "520px" }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={featured.cover_url ?? ""}
                alt={featured.title_ar}
                className="article-card-img w-full h-full object-cover brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/98 via-[#202151]/60 to-transparent" />
              <div className="article-card-border absolute inset-0 border border-[#D0B66A]" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <div className="flex items-center gap-3 mb-4">
                {featured.category && (
                  <span
                    className="text-[#D0B66A] bg-[#D0B66A]/12 text-[9px] italic font-bold tracking-[0.3em] px-2.5 py-1 rounded-[1px]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {featured.category.name_en}
                  </span>
                )}
                <span
                  className="text-[#D61214] bg-[#D61214]/12 text-[10px] font-black px-2.5 py-1 rounded-[1px]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  مقال مميز
                </span>
              </div>

              <h3
                className="text-white font-black leading-[1.3] tracking-[-0.01em] mb-3 text-[clamp(20px,2.5vw,30px)]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {featured.title_ar}
              </h3>

              <p
                className="text-white/70 text-[13px] font-bold leading-[1.8] mb-5 max-w-[480px]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {featured.excerpt_ar}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span
                    className="text-[#D0B66A] text-[11px] italic font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {featured.journalist?.full_name_ar}
                  </span>
                  <span className="inline-block w-px h-3 bg-[#D0B66A]/30" />
                  <span
                    className="text-white/60 text-[11px] font-bold"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {featured.read_time_minutes} دقائق قراءة
                  </span>
                </div>
                <div
                  className="read-more flex items-center text-[#D0B66A] text-[12px] italic font-bold tracking-[0.1em]"
                  style={{ fontFamily: "'Playfair Display', serif", gap: "6px" }}
                >
                  اقرأ المزيد
                  <span className="text-[14px]">←</span>
                </div>
              </div>
            </div>
          </Link>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-px bg-white">
            {rest.map((article, i) => (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="article-card relative cursor-pointer bg-white flex flex-col no-underline p-5 gap-3"
                style={{
                  flex: 1,
                  borderBottom: i < rest.length - 1 ? "0.5px solid rgba(208,182,106,0.2)" : "none",
                }}
              >
                <div className="relative overflow-hidden aspect-square md:aspect-auto md:h-[90px]">
                  <img
                    src={article.cover_url ?? ""}
                    alt={article.title_ar}
                    className="article-card-img w-full h-full object-cover brightness-[0.65]"
                  />
                  <div className="absolute inset-0 bg-[#202151]/40" />
                  <div className="article-card-border absolute inset-0 border border-[#D0B66A]" />
                  {article.category && (
                    <span
                      className="absolute bottom-2 right-2 text-[#D0B66A] bg-[#202151]/85 text-[8px] italic font-bold tracking-[0.25em] px-2 py-0.5"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {article.category.name_en}
                    </span>
                  )}
                </div>

                <h3
                  className="text-[#202151] text-[13px] font-black leading-[1.5] tracking-[-0.01em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {article.title_ar}
                </h3>

                <div className="flex items-center justify-between mt-auto">
                  <span
                    className="text-[#D0B66A] text-[10px] italic font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {article.journalist?.full_name_ar}
                  </span>
                  <span
                    className="text-[#202151]/50 text-[10px] font-black"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {article.read_time_minutes} د
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── BOTTOM RULE ── */}
        <div className="mt-16 flex items-center gap-4 border-t border-[#D0B66A]/30 pt-6">
          <span
            className="text-[#202151]/40 text-[12px] italic font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · المقالات
          </span>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/70 text-[11px] font-black"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ١٢٠+ مقال منشور
          </span>
        </div>

      </section>
    </>
  );
}