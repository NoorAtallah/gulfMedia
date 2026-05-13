import { getLibraryResourceById, getAllLibraryResources } from "@/lib/queries/library";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function LibraryResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [resource, all] = await Promise.all([
    getLibraryResourceById(id),
    getAllLibraryResources(),
  ]);

  if (!resource) notFound();

  const related = all.filter((r) => r.id !== id && r.type === resource.type).slice(0, 3);

  const TYPE_EN: Record<string, string> = {
    كتاب: "Book",
    تقرير: "Report",
    دليل: "Guide",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .related-card:hover .rel-img { transform: scale(1.05); }
        .rel-img { transition: transform 0.6s cubic-bezier(.2,0,0,1); }
        .back-link:hover { color: #D0B66A; }
        .back-link { transition: color 0.2s; }
        .download-btn:hover { opacity: 0.85; transform: translateY(-2px); }
        .download-btn { transition: all 0.2s ease; }
      `}</style>

      <main className="w-full min-h-screen bg-white" dir="rtl">

        {/* ── HERO ── */}
        <div className="w-full bg-[#202151] px-6 md:px-14 pt-20 pb-16">
          <div className="flex flex-col md:flex-row gap-10 items-start max-w-5xl">

            {/* Cover */}
            <div className="flex-shrink-0 w-44 h-56 md:w-52 md:h-64 overflow-hidden border border-[#D0B66A]/30">
              <img
                src={resource.cover_url ?? ""}
                alt={resource.title_ar}
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
                  {TYPE_EN[resource.type] ?? resource.type} · {resource.type}
                </span>
                {resource.tag && (
                  <span
                    className="text-[#D0B66A] bg-[#D0B66A]/15 text-[10px] font-black px-2.5 py-1 rounded-[1px]"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {resource.tag}
                  </span>
                )}
              </div>

              <h1
                className="text-white font-black text-[clamp(24px,4vw,48px)] leading-[1.15] tracking-[-0.02em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {resource.title_ar}
              </h1>

              {resource.description_ar && (
                <p
                  className="text-white/65 text-[14px] font-bold leading-[1.9] max-w-2xl"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {resource.description_ar}
                </p>
              )}

              {/* Meta pills */}
              <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-[#D0B66A]/15">
                {resource.author_name_ar && (
                  <span
                    className="text-[#D0B66A] bg-[#D0B66A]/10 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide italic"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {resource.author_name_ar}
                  </span>
                )}
                {resource.year && (
                  <span
                    className="text-white/50 bg-white/5 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {resource.year}
                  </span>
                )}
                {resource.pages && (
                  <span
                    className="text-white/50 bg-white/5 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {resource.pages} صفحة
                  </span>
                )}
                {resource.category && (
                  <span
                    className="text-white/50 bg-white/5 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {resource.category.name_ar}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="w-full bg-[#202151] border-t border-[#D0B66A]/10 px-6 md:px-14 py-6">
          <div className="flex items-center gap-10 flex-wrap">
            {[
              { n: resource.type, l: "نوع المرجع" },
              { n: resource.year ?? "—", l: "سنة الإصدار" },
              { n: resource.pages ? `${resource.pages}` : "—", l: "عدد الصفحات" },
              { n: resource.author_name_ar ?? "—", l: "المؤلف" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className="text-[#D0B66A] font-black text-[clamp(14px,2vw,20px)] leading-none tracking-[-0.01em]"
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

        {/* ── DESCRIPTION + DOWNLOAD ── */}
        <div className="px-6 md:px-14 py-16 border-b border-[#D0B66A]/15">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl">

            {/* Left — full description */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#D61214]" />
                <h2
                  className="text-[#202151] font-black text-[20px] tracking-[-0.01em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  عن هذا المرجع
                </h2>
              </div>

              <p
                className="text-[#202151]/70 text-[15px] font-bold leading-[2.2]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {resource.description_ar ?? "لا يوجد وصف متاح لهذا المرجع."}
              </p>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { label: "النوع", value: resource.type },
                  { label: "السنة", value: resource.year ?? "—" },
                  { label: "الصفحات", value: resource.pages ? `${resource.pages} صفحة` : "—" },
                  { label: "التصنيف", value: resource.category?.name_ar ?? "—" },
                ].map((s, i) => (
                  <div key={i} className="border border-[#D0B66A]/20 p-4 flex flex-col gap-1">
                    <span
                      className="text-[#202151]/40 text-[10px] font-black tracking-widest"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="text-[#202151] text-[14px] font-black"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — download CTA */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#D61214]" />
                <h2
                  className="text-[#202151] font-black text-[20px] tracking-[-0.01em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  تحميل المرجع
                </h2>
              </div>

              {/* Cover preview */}
              <div className="relative overflow-hidden h-64 border border-[#D0B66A]/20">
                <img
                  src={resource.cover_url ?? ""}
                  alt={resource.title_ar}
                  className="w-full h-full object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/60 to-transparent" />
                <div className="absolute bottom-4 right-4">
                  <span
                    className="text-[#D0B66A] bg-[#202151]/80 text-[9px] italic font-bold tracking-[0.25em] px-3 py-1.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {TYPE_EN[resource.type] ?? resource.type}
                  </span>
                </div>
              </div>

              {resource.file_url ? (
                <a
                  href={resource.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn w-full text-center text-[#202151] bg-[#D0B66A] text-[14px] font-black py-4 rounded-sm tracking-wide no-underline block"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  تحميل المرجع ↓
                </a>
              ) : (
                <div className="w-full border border-[#D0B66A]/20 p-8 flex flex-col items-center gap-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#D0B66A]/10 border border-[#D0B66A]/25 flex items-center justify-center">
                    <span className="text-[#D0B66A] text-[16px]">📄</span>
                  </div>
                  <p
                    className="text-[#202151]/40 text-[13px] font-black"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    ملف التحميل غير متاح حالياً
                  </p>
                  <p
                    className="text-[#202151]/25 text-[11px] font-bold italic"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    سيتم إضافته قريباً
                  </p>
                </div>
              )}

              <p
                className="text-[#202151]/30 text-[11px] italic font-bold text-center"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                جميع المراجع متاحة مجاناً لأعضاء المنصة
              </p>
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
                مراجع مشابهة
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D0B66A]/15">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/library/${r.id}`}
                  className="bg-white flex flex-col no-underline group"
                >
                  <div className="relative overflow-hidden h-44">
                    <img
                      src={r.cover_url ?? ""}
                      alt={r.title_ar}
                      className="rel-img w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/90 to-transparent" />
                    <span
                      className="absolute top-3 right-3 text-[#D0B66A] bg-[#202151]/80 text-[8px] italic font-bold tracking-[0.25em] px-2.5 py-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {TYPE_EN[r.type] ?? r.type}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1 border-b border-[#D0B66A]/15 group-hover:border-[#D0B66A]/50 transition-colors duration-300">
                    <h3
                      className="text-[#202151] text-[14px] font-black leading-[1.6]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {r.title_ar}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#D0B66A]/10">
                      <span
                        className="text-[#D0B66A] text-[11px] italic font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {r.author_name_ar}
                      </span>
                      <span
                        className="text-[#202151]/40 text-[10px] font-black"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {r.year}
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
            href="/library"
            className="back-link text-[#202151]/40 text-[12px] font-black tracking-wide no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ← العودة إلى المكتبة
          </Link>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/50 text-[11px] italic font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · المكتبة
          </span>
        </div>

      </main>
    </>
  );
}