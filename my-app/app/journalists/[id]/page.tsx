import { getJournalistById, getJournalistArticles } from "@/lib/queries/journalists";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function JournalistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [journalist, articles] = await Promise.all([
    getJournalistById(id),
    getJournalistArticles(id),
  ]);

  if (!journalist) notFound();

  const socials = journalist.social_links as Record<string, string>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .article-card:hover .article-img { transform: scale(1.04); }
        .article-img { transition: transform 0.6s cubic-bezier(.2,0,0,1); }
        .social-link:hover { color: #202151; }
        .social-link { transition: color 0.2s; }
        .back-link:hover { color: #D0B66A; }
        .back-link { transition: color 0.2s; }
      `}</style>

      <main className="w-full min-h-screen bg-white" dir="rtl">

        {/* ── HERO ── */}
        <div className="w-full bg-white border-b border-[#D0B66A]/20 px-6 md:px-14 pt-16 pb-16">
          <div className="max-w-5xl flex flex-col md:flex-row items-start gap-10">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-44 h-44 md:w-56 md:h-56 overflow-hidden border border-[#D0B66A]/40">
                <img
                  src={journalist.avatar_url ?? ""}
                  alt={journalist.full_name_ar}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute bottom-0 right-0 text-[#202151] bg-[#D0B66A] text-[10px] font-black px-3 py-1 tracking-wide"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {journalist.country}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 flex-1 pt-2">

              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#D61214]" />
                <span
                  className="text-[#D0B66A] text-[11px] italic tracking-[0.3em] font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {journalist.specialty}
                </span>
              </div>

              {/* Name */}
              <h1
                className="text-[#202151] font-black text-[clamp(32px,5vw,58px)] leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {journalist.full_name_ar}
              </h1>

              {/* Bio */}
              <p
                className="text-[#202151]/70 text-[14px] font-bold leading-[2] max-w-2xl"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {journalist.bio_ar}
              </p>

              {/* Pills */}
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="text-[#202151] bg-[#D0B66A]/15 border border-[#D0B66A]/30 text-[11px] font-black px-4 py-1.5 rounded-sm tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {journalist.experience_years} سنوات خبرة
                </span>
                <span
                  className="text-[#202151] bg-[#202151]/5 border border-[#202151]/10 text-[11px] font-black px-4 py-1.5 rounded-sm tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {journalist.specialty}
                </span>
                <span
                  className="text-[#202151] bg-[#202151]/5 border border-[#202151]/10 text-[11px] font-black px-4 py-1.5 rounded-sm tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {journalist.country}
                </span>
              </div>

              {/* Socials */}
              {Object.keys(socials).length > 0 && (
                <div className="flex items-center gap-6 pt-2 border-t border-[#D0B66A]/20">
                  {socials.twitter && (
                    <a
                      href={socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link text-[#202151]/40 text-[12px] font-black italic no-underline tracking-wide"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Twitter
                    </a>
                  )}
                  {socials.linkedin && (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link text-[#202151]/40 text-[12px] font-black italic no-underline tracking-wide"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      LinkedIn
                    </a>
                  )}
                  {socials.instagram && (
                    <a
                      href={socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link text-[#202151]/40 text-[12px] font-black italic no-underline tracking-wide"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Instagram
                    </a>
                  )}
                  {socials.youtube && (
                    <a
                      href={socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link text-[#202151]/40 text-[12px] font-black italic no-underline tracking-wide"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      YouTube
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── DIVIDER WITH STATS ── */}
        <div className="w-full bg-[#202151] px-6 md:px-14 py-8">
          <div className="flex items-center gap-12 flex-wrap">
            {[
              { n: journalist.experience_years + "+", l: "سنوات خبرة" },
              { n: articles.length + "+", l: "مقال منشور" },
              { n: journalist.country ?? "—", l: "الدولة" },
              { n: journalist.specialty ?? "—", l: "التخصص" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className="text-[#D0B66A] font-black text-[clamp(20px,2.5vw,32px)] leading-none tracking-[-0.02em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {s.n}
                </span>
                <span
                  className="text-white/50 text-[11px] font-bold italic tracking-[0.1em]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ARTICLES ── */}
        <div className="px-6 md:px-14 py-20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#D61214]" />
              <h2
                className="text-[#202151] font-black text-[clamp(20px,3vw,32px)] tracking-[-0.01em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                مقالات {journalist.full_name_ar}
              </h2>
            </div>
            <span
              className="text-[#202151]/30 text-[12px] font-bold"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {articles.length} مقال
            </span>
          </div>

          {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 border border-[#D0B66A]/15">
              <p
                className="text-[#202151]/30 text-[16px] font-black"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                لا توجد مقالات منشورة بعد
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D0B66A]/15">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="article-card bg-white flex flex-col no-underline group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={article.cover_url ?? ""}
                      alt={article.title_ar}
                      className="article-img w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/90 to-transparent" />
                    {article.category && (
                      <span
                        className="absolute bottom-3 right-3 text-[#D0B66A] bg-[#202151]/80 text-[8px] italic font-bold tracking-[0.25em] px-2 py-0.5"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {article.category.name_en}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-1 border-b border-[#D0B66A]/15 group-hover:border-[#D0B66A]/50 transition-colors duration-300">
                    <h3
                      className="text-[#202151] text-[14px] font-black leading-[1.6] tracking-[-0.01em]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {article.title_ar}
                    </h3>
                    {article.excerpt_ar && (
                      <p
                        className="text-[#202151]/50 text-[12px] font-bold leading-[1.8] line-clamp-2"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {article.excerpt_ar}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#D0B66A]/10">
                      <span
                        className="text-[#202151]/40 text-[10px] font-black"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {article.published_at
                          ? new Date(article.published_at).toLocaleDateString("ar-SA")
                          : ""}
                      </span>
                      <span
                        className="text-[#D0B66A] text-[10px] font-black"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {article.read_time_minutes} دقائق قراءة
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── BOTTOM RULE + BACK ── */}
        <div className="px-6 md:px-14 pb-16 flex items-center gap-4 border-t border-[#D0B66A]/20 pt-8">
          <Link
            href="/journalists"
            className="back-link text-[#202151]/40 text-[12px] font-black tracking-wide no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ← العودة إلى الإعلاميين
          </Link>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/50 text-[11px] italic font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · الإعلاميون
          </span>
        </div>

      </main>
    </>
  );
}