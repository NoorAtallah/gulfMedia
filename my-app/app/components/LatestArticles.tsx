"use client";

const ARTICLES = [
  {
    category: "صحافة رقمية",
    categoryEn: "Digital Journalism",
    title: "كيف غيّر الذكاء الاصطناعي غرف الأخبار الخليجية في ٢٠٢٥؟",
    excerpt: "تحقيق معمق في التحولات التقنية التي تعيد رسم ملامح العمل الصحفي في المنطقة",
    author: "أحمد الرشيدي",
    date: "١٢ مايو ٢٠٢٥",
    readTime: "٨ دقائق",
    featured: true,
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=85&fit=crop",
  },
  {
    category: "إعلام مرئي",
    categoryEn: "Broadcast",
    title: "مستقبل التلفزيون الخليجي في عصر البث المباشر",
    excerpt: "دراسة تحليلية حول تأثير منصات البث على الإعلام المرئي التقليدي",
    author: "سارة المنصوري",
    date: "٨ مايو ٢٠٢٥",
    readTime: "٥ دقائق",
    featured: false,
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=85&fit=crop",
  },
  {
    category: "صحافة استقصائية",
    categoryEn: "Investigative",
    title: "الصحافة الاستقصائية في الخليج: تحديات وآفاق",
    excerpt: "نظرة معمقة على واقع الصحافة الاستقصائية ومستقبلها في دول المنطقة",
    author: "خالد البلوشي",
    date: "٥ مايو ٢٠٢٥",
    readTime: "١١ دقيقة",
    featured: false,
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=85&fit=crop",
  },
  {
    category: "إعلام رقمي",
    categoryEn: "Digital Media",
    title: "وسائل التواصل الاجتماعي وأثرها على الرأي العام الخليجي",
    excerpt: "تحليل شامل لدور منصات التواصل في تشكيل المشهد الإعلامي",
    author: "نورة القحطاني",
    date: "٢ مايو ٢٠٢٥",
    readTime: "٦ دقائق",
    featured: false,
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=85&fit=crop",
  },
];

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";

export default function LatestArticles() {
  const featured = ARTICLES.find((a) => a.featured)!;
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');

        .article-card-img {
          transition: transform 0.7s cubic-bezier(.2,0,0,1);
        }
        .article-card:hover .article-card-img {
          transform: scale(1.05);
        }
        .article-card:hover .article-card-border {
          opacity: 1;
        }
        .article-card-border {
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .read-more {
          transition: gap 0.25s ease, opacity 0.25s ease;
        }
        .article-card:hover .read-more {
          gap: 10px;
        }
        .articles-view-all {
          transition: all 0.25s ease;
        }
        .articles-view-all:hover {
          background: ${GOLD};
          color: ${NAVY};
          border-color: ${GOLD};
        }
      `}</style>

      <section className="w-full bg-[#202151] py-24 px-6 md:px-14" dir="rtl">

        {/* ── SECTION HEADER ── */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#D61214]" />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: GOLD,
                  opacity: 0.8,
                }}
              >
                Latest · أحدث
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: CREAM,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              أحدث المقالات
            </h2>
            <div className="w-12 h-px mt-4" style={{ background: GOLD, opacity: 0.5 }} />
          </div>

          <button
            className="articles-view-all"
            style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: CREAM,
              background: "transparent",
              border: `0.5px solid rgba(245,241,232,0.2)`,
              padding: "10px 28px",
              borderRadius: "2px",
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}
          >
            عرض الكل
          </button>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(208,182,106,0.1)" }}>

          {/* FEATURED — takes 2 cols */}
          <div
            className="article-card relative cursor-pointer md:col-span-2 bg-[#202151]"
            style={{ minHeight: "520px" }}
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={featured.img}
                alt={featured.title}
                className="article-card-img w-full h-full object-cover"
                style={{ filter: "grayscale(15%) brightness(0.5)" }}
              />
              {/* Gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                    to top,
                    rgba(32,33,81,0.98) 0%,
                    rgba(32,33,81,0.6) 45%,
                    transparent 100%
                  )`,
                }}
              />
              {/* Gold border on hover */}
              <div
                className="article-card-border absolute inset-0"
                style={{ border: `1px solid ${GOLD}` }}
              />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              {/* Category */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    color: GOLD,
                    background: "rgba(208,182,106,0.12)",
                    padding: "4px 10px",
                    borderRadius: "1px",
                  }}
                >
                  {featured.categoryEn}
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 700,
                    fontSize: "10px",
                    color: RED,
                    background: "rgba(214,18,20,0.12)",
                    padding: "4px 10px",
                    borderRadius: "1px",
                  }}
                >
                  مقال مميز
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(20px, 2.5vw, 30px)",
                  color: CREAM,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  marginBottom: "12px",
                }}
              >
                {featured.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 300,
                  fontSize: "13px",
                  color: CREAM,
                  opacity: 0.55,
                  lineHeight: 1.8,
                  marginBottom: "20px",
                  maxWidth: "480px",
                }}
              >
                {featured.excerpt}
              </p>

              {/* Meta + read more */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "11px",
                      color: GOLD,
                      opacity: 0.7,
                    }}
                  >
                    {featured.author}
                  </span>
                  <span
                    style={{
                      width: "1px",
                      height: "12px",
                      background: GOLD,
                      opacity: 0.3,
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Noto Kufi Arabic', sans-serif",
                      fontSize: "11px",
                      color: CREAM,
                      opacity: 0.35,
                    }}
                  >
                    {featured.readTime} قراءة
                  </span>
                </div>

                <div
                  className="read-more flex items-center"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "12px",
                    color: GOLD,
                    gap: "6px",
                    letterSpacing: "0.1em",
                  }}
                >
                  اقرأ المزيد
                  <span style={{ fontSize: "14px" }}>←</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — 3 small articles */}
          <div className="flex flex-col gap-px bg-[#202151]">
            {rest.map((article, i) => (
              <div
                key={i}
                className="article-card relative cursor-pointer bg-[#202151] flex flex-col"
                style={{
                  flex: 1,
                  borderBottom: i < rest.length - 1 ? `0.5px solid rgba(208,182,106,0.1)` : "none",
                  padding: "20px 24px",
                  gap: "10px",
                }}
              >
                {/* Image thumbnail */}
                <div className="relative overflow-hidden" style={{ height: "90px" }}>
                  <img
                    src={article.img}
                    alt={article.title}
                    className="article-card-img w-full h-full object-cover"
                    style={{ filter: "grayscale(20%) brightness(0.65)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(32,33,81,0.4)" }}
                  />
                  <div
                    className="article-card-border absolute inset-0"
                    style={{ border: `1px solid ${GOLD}` }}
                  />
                  {/* Category on image */}
                  <span
                    className="absolute bottom-2 right-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "8px",
                      letterSpacing: "0.25em",
                      color: GOLD,
                      background: "rgba(32,33,81,0.85)",
                      padding: "3px 8px",
                    }}
                  >
                    {article.categoryEn}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: CREAM,
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {article.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center justify-between mt-auto">
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "10px",
                      color: GOLD,
                      opacity: 0.65,
                    }}
                  >
                    {article.author}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Noto Kufi Arabic', sans-serif",
                      fontSize: "10px",
                      color: CREAM,
                      opacity: 0.3,
                    }}
                  >
                    {article.readTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM RULE ── */}
        <div
          className="mt-16 flex items-center gap-4"
          style={{ borderTop: `0.5px solid rgba(208,182,106,0.12)`, paddingTop: "24px" }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "12px",
              color: CREAM,
              opacity: 0.35,
              letterSpacing: "0.15em",
            }}
          >
            Gulf Media Platform · المقالات
          </span>
          <div className="flex-1 h-px" style={{ background: GOLD, opacity: 0.1 }} />
          <span
            style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontWeight: 300,
              fontSize: "11px",
              color: GOLD,
              opacity: 0.5,
            }}
          >
            ١٢٠+ مقال منشور
          </span>
        </div>

      </section>
    </>
  );
}