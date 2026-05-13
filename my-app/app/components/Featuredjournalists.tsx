import Link from "next/link";
import type { Journalist } from "@/lib/types";

type Props = {
  journalists: Journalist[];
};

export default function FeaturedJournalists({ journalists }: Props) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');

        .journalist-card:hover .card-img { transform: scale(1.05); }
        .journalist-card:hover .card-overlay { opacity: 1; }
        .journalist-card:hover .card-border { opacity: 1; }
        .card-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .card-overlay { opacity: 0; transition: opacity 0.4s ease; }
        .card-border { opacity: 0; transition: opacity 0.4s ease; }
        .view-all-btn:hover { background: #D0B66A; color: #202151; border-color: #D0B66A; }
        .view-all-btn { transition: all 0.25s ease; }
        .join-btn:hover { opacity: 0.85; }
        .join-btn { transition: opacity 0.2s; }
      `}</style>

      <section className="w-full bg-white py-24 px-6 md:px-14" dir="rtl">

        {/* ── HEADER ── */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#D61214]" />
              <span
                className="text-[#D0B66A] text-[11px] tracking-[0.3em] opacity-80 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Featured · مميزون
              </span>
            </div>
            <h2
              className="text-[#202151] font-black text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              إعلاميون مميزون
            </h2>
            <div className="w-12 h-px mt-4 bg-[#D0B66A] opacity-50" />
          </div>

          <Link
            href="/journalists"
            className="view-all-btn text-[13px] font-bold text-[#202151] bg-transparent border border-[#202151]/25 px-7 py-2.5 rounded-sm no-underline tracking-wide"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            عرض الكل
          </Link>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {journalists.map((j, i) => (
            <Link
              key={j.id}
              href={`/journalists/${j.id}`}
              className="journalist-card relative cursor-pointer no-underline"
              style={{ animationDelay: `${i * 0.12}s` }}
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
                      className="text-[#D0B66A] text-[12px] italic tracking-[0.15em] mb-2 font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {j.specialty}
                    </p>
                    <p
                      className="text-[#F5F1E8] text-[11px] font-light tracking-wide opacity-60"
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
                  className="text-[#202151] font-black text-[15px] mb-1 tracking-[-0.01em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {j.full_name_ar}
                </p>
                <p
                  className="text-[#D0B66A] text-[12px] italic font-bold opacity-80 tracking-[0.08em]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {j.specialty}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── STATS STRIP ── */}
        <div className="mt-20 pt-8 flex items-center justify-between flex-wrap gap-6 border-t border-[#D0B66A]/30">
          {[
            { n: "٣٢٠٠+", l: "صحفي ومراسل مسجل" },
            { n: "٦", l: "دول خليجية" },
            { n: "٢٤", l: "تخصص إعلامي" },
            { n: "٨٥٠+", l: "مركز إعلامي" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span
                className="text-[#D0B66A] font-black text-[clamp(28px,3vw,40px)] leading-none tracking-[-0.02em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {s.n}
              </span>
              <span
                className="text-[#202151] text-[12px] italic font-bold opacity-40 tracking-[0.1em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.l}
              </span>
            </div>
          ))}

          <Link
            href="/membership"
            className="join-btn text-white bg-[#202151] text-[13px] font-black px-8 py-3 rounded-sm no-underline tracking-wide"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            انضم كإعلامي
          </Link>
        </div>
      </section>
    </>
  );
}