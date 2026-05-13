import { getArticleById, getLatestArticles } from "@/lib/queries/articles";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [article, related] = await Promise.all([
    getArticleById(id),
    getLatestArticles(3),
  ]);

  if (!article) notFound();

  const relatedArticles = related.filter((a) => a.id !== id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .article-body h2 { font-size: 22px; font-weight: 900; color: #202151; margin: 2rem 0 1rem; }
        .article-body h3 { font-size: 18px; font-weight: 900; color: #202151; margin: 1.5rem 0 0.75rem; }
        .article-body p { font-size: 16px; font-weight: 700; color: #202151; opacity: 0.75; line-height: 2.2; margin-bottom: 1.5rem; }
        .article-body strong { font-weight: 900; color: #202151; opacity: 1; }
        .article-body blockquote { border-right: 3px solid #D0B66A; padding-right: 1.5rem; margin: 2rem 0; }
        .article-body blockquote p { color: #202151; opacity: 0.6; font-style: italic; }
        .related-card:hover .related-img { transform: scale(1.05); }
        .related-img { transition: transform 0.6s cubic-bezier(.2,0,0,1); }
        .back-link:hover { color: #D0B66A; }
        .back-link { transition: color 0.2s; }
      `}</style>

      <main className="w-full min-h-screen bg-white" dir="rtl">

        {/* ── HERO ── */}
        <div className="relative w-full overflow-hidden" style={{ minHeight: "500px" }}>
          <img
            src={article.cover_url ?? ""}
            alt={article.title_ar}
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/98 via-[#202151]/60 to-transparent" />

          <div className="relative z-10 px-6 md:px-14 pt-20 pb-16 flex flex-col justify-end h-full" style={{ minHeight: "500px" }}>
            <div className="max-w-4xl">
              {/* Category + badge */}
              <div className="flex items-center gap-3 mb-5">
                {article.category && (
                  <span
                    className="text-[#D0B66A] bg-[#D0B66A]/15 text-[9px] italic font-bold tracking-[0.3em] px-3 py-1.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {article.category.name_en}
                  </span>
                )}
                {article.is_featured && (
                  <span
                    className="text-[#D61214] bg-[#D61214]/15 text-[10px] font-black px-3 py-1.5"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    مقال مميز
                  </span>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-white font-black text-[clamp(28px,4.5vw,56px)] leading-[1.15] tracking-[-0.02em] mb-5"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {article.title_ar}
              </h1>

              {/* Excerpt */}
              {article.excerpt_ar && (
                <p
                  className="text-white/70 text-[15px] font-bold leading-[1.9] mb-8 max-w-2xl"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {article.excerpt_ar}
                </p>
              )}

              {/* Meta */}
              <div className="flex items-center gap-5 flex-wrap border-t border-[#D0B66A]/20 pt-6">
                {article.journalist && (
                  <Link
                    href={`/journalists/${article.journalist.id}`}
                    className="flex items-center gap-3 no-underline group"
                  >
                    <div className="w-9 h-9 overflow-hidden border border-[#D0B66A]/30">
                      <img
                        src={article.journalist.avatar_url ?? ""}
                        alt={article.journalist.full_name_ar}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className="text-[#D0B66A] text-[13px] italic font-bold group-hover:opacity-100 opacity-80 transition-opacity"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {article.journalist.full_name_ar}
                    </span>
                  </Link>
                )}
                <span className="w-px h-4 inline-block bg-[#D0B66A]/25" />
                <span
                  className="text-white/60 text-[12px] font-black"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {article.read_time_minutes} دقائق قراءة
                </span>
                {article.published_at && (
                  <>
                    <span className="w-px h-4 inline-block bg-[#D0B66A]/25" />
                    <span
                      className="text-white/50 text-[12px] font-black"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {new Date(article.published_at).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── ARTICLE BODY ── */}
        <div className="px-6 md:px-14 py-16">
          <div className="max-w-3xl mx-auto">
            <div
              className="article-body"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: article.content_ar ?? "" }}
            />
          </div>
        </div>

        {/* ── RELATED ARTICLES ── */}
        {relatedArticles.length > 0 && (
          <div className="px-6 md:px-14 py-16 border-t border-[#D0B66A]/20">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-[#D61214]" />
              <h2
                className="text-[#202151] font-black text-[clamp(20px,3vw,32px)] tracking-[-0.01em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                مقالات ذات صلة
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D0B66A]/15">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/articles/${rel.id}`}
                  className="related-card bg-white flex flex-col no-underline group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={rel.cover_url ?? ""}
                      alt={rel.title_ar}
                      className="related-img w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/90 to-transparent" />
                    {rel.category && (
                      <span
                        className="absolute bottom-3 right-3 text-[#D0B66A] bg-[#202151]/85 text-[8px] italic font-bold tracking-[0.25em] px-2 py-0.5"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {rel.category.name_en}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1 border-b border-[#D0B66A]/15 group-hover:border-[#D0B66A]/50 transition-colors duration-300">
                    <h3
                      className="text-[#202151] text-[14px] font-black leading-[1.6]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {rel.title_ar}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#D0B66A]/10">
                      <span
                        className="text-[#D0B66A] text-[11px] italic font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {rel.journalist?.full_name_ar}
                      </span>
                      <span
                        className="text-[#202151]/40 text-[10px] font-black"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {rel.read_time_minutes} د
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
            href="/articles"
            className="back-link text-[#202151]/40 text-[12px] font-black tracking-wide no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ← العودة إلى المقالات
          </Link>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/50 text-[11px] italic font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · المقالات
          </span>
        </div>

      </main>
    </>
  );
}