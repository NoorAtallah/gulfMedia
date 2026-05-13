import Link from "next/link";
import type { Event } from "@/lib/types";

type Props = { events: Event[] };

function formatDate(dateStr: string | null) {
  if (!dateStr) return { day: "—", month: "—", year: "—", weekday: "—" };
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("ar-SA", { day: "numeric" }),
    month: d.toLocaleDateString("ar-SA", { month: "long" }),
    year: d.toLocaleDateString("ar-SA", { year: "numeric" }),
    weekday: d.toLocaleDateString("ar-SA", { weekday: "long" }),
  };
}

export default function EventsSection({ events }: Props) {
  const featured = events[0];
  const rest = events.slice(1, 4);
  if (!featured) return null;
  const fd = formatDate(featured.starts_at);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .featured-event-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .featured-event:hover .featured-event-img { transform: scale(1.03); }
        .event-row { transition: background 0.25s ease; }
        .event-row:hover { background: rgba(208,182,106,0.05); }
        .event-row:hover .event-register { background: #D0B66A !important; color: #202151 !important; border-color: #D0B66A !important; }
        .event-img { transition: transform 0.6s cubic-bezier(.2,0,0,1); }
        .event-row:hover .event-img { transform: scale(1.06); }
        .events-view-all:hover { background: #D0B66A; color: #202151; border-color: #D0B66A; }
        .events-view-all { transition: all 0.25s ease; }
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
                Events · فعاليات
              </span>
            </div>
            <h2
              className="text-[#202151] font-black text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              الفعاليات
            </h2>
            <div className="w-12 h-px mt-4 bg-[#D0B66A] opacity-50" />
          </div>
          <Link
            href="/events"
            className="events-view-all text-[#202151] bg-transparent border border-[#202151]/25 text-[13px] font-black tracking-wide px-7 py-2.5 rounded-sm no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            كل الفعاليات
          </Link>
        </div>

        {/* ── FEATURED ── */}
        <Link
          href={`/events/${featured.id}`}
          className="featured-event relative overflow-hidden mb-4 block no-underline border border-[#D0B66A]/25 rounded-sm"
          style={{ minHeight: "380px" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={featured.cover_url ?? ""}
              alt={featured.title_ar}
              className="featured-event-img w-full h-full object-cover grayscale-[15%] brightness-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#202151]/98 via-[#202151]/82 to-[#202151]/45" />
          </div>

          <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row gap-8 items-start md:items-center">

            {/* Date block */}
            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center border border-[#D0B66A]/30 bg-[#D0B66A]/6 rounded-sm">
              <span
                className="text-[#D0B66A] font-black text-[28px] md:text-[36px] leading-none"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {fd.day}
              </span>
              <span
                className="text-white/50 text-[10px] italic font-bold tracking-[0.1em] mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {fd.month}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {featured.location_type && (
                  <span
                    className="text-[#D0B66A] bg-[#D0B66A]/12 text-[9px] italic font-bold tracking-[0.3em] px-2.5 py-1 rounded-[1px]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {featured.location_type === "online" ? "Online" : featured.location_type === "in-person" ? "In-Person" : "Hybrid"}
                  </span>
                )}
                <span
                  className="text-[#D61214] bg-[#D61214]/12 border border-[#D61214]/40 text-[10px] font-black px-2.5 py-1 rounded-[1px]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  فعالية مميزة
                </span>
              </div>

              <h3
                className="text-white font-black text-[clamp(20px,3vw,34px)] leading-[1.25] tracking-[-0.02em] mb-3"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {featured.title_ar}
              </h3>

              {featured.description_ar && (
                <p
                  className="text-white/65 text-[13px] font-bold leading-[1.8] mb-5 max-w-xl"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {featured.description_ar}
                </p>
              )}

              <div className="flex items-center gap-4 flex-wrap">
                {featured.location_ar && (
                  <span
                    className="text-white/55 text-[12px] font-bold"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    📍 {featured.location_ar}
                  </span>
                )}
                <span className="w-px h-3 inline-block bg-[#D0B66A]/25" />
                <span
                  className="text-white/55 text-[12px] font-bold"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {fd.weekday} · {fd.day} {fd.month} {fd.year}
                </span>
                {featured.capacity && (
                  <>
                    <span className="w-px h-3 inline-block bg-[#D0B66A]/25" />
                    <span
                      className="text-[#D0B66A] text-[12px] font-black"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {featured.capacity} مقعد
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <div
                className="text-[#202151] bg-[#D0B66A] text-[14px] font-black px-8 py-3.5 rounded-sm tracking-wide whitespace-nowrap"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                سجّل الآن
              </div>
            </div>
          </div>
        </Link>

        {/* ── EVENT LIST ── */}
        <div className="border border-[#D0B66A]/20 rounded-sm overflow-hidden">
          {rest.map((event, i) => {
            const d = formatDate(event.starts_at);
            return (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="event-row flex items-center gap-4 md:gap-6 px-5 md:px-6 py-4 md:py-5 no-underline"
                style={{ borderBottom: i < rest.length - 1 ? "0.5px solid rgba(208,182,106,0.15)" : "none" }}
              >
                {/* Date block */}
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center border border-[#D0B66A]/25 bg-[#D0B66A]/5 rounded-sm">
                  <span
                    className="text-[#D0B66A] font-black text-[18px] md:text-[20px] leading-none"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {d.day}
                  </span>
                  <span
                    className="text-[#202151]/40 text-[8px] italic font-bold mt-0.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {d.month}
                  </span>
                </div>

                {/* Thumbnail */}
                <div className="flex-shrink-0 w-14 h-12 md:w-16 md:h-14 overflow-hidden rounded-[1px]">
                  <img
                    src={event.cover_url ?? ""}
                    alt={event.title_ar}
                    className="event-img w-full h-full object-cover grayscale-[30%] brightness-[0.65]"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {event.location_type && (
                    <span
                      className="text-[#D0B66A] text-[9px] italic font-bold tracking-[0.2em] opacity-70 block mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {event.location_type === "online" ? "Online" : event.location_type === "in-person" ? "In-Person" : "Hybrid"}
                    </span>
                  )}
                  <p
                    className="text-[#202151] text-[13px] md:text-[14px] font-black leading-[1.4] truncate"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {event.title_ar}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {event.location_ar && (
                      <span
                        className="text-[#202151]/45 text-[11px] font-bold"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {event.location_ar}
                      </span>
                    )}
                    {event.capacity && (
                      <>
                        <span className="w-px h-2.5 inline-block bg-[#D0B66A]/25" />
                        <span
                          className="text-[#D0B66A] text-[11px] font-black"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {event.capacity} مقعد
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Weekday — desktop only */}
                <div className="hidden md:flex flex-col items-center gap-0.5 flex-shrink-0">
                  <span
                    className="text-[#202151]/30 text-[11px] italic font-bold tracking-[0.1em]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {d.weekday}
                  </span>
                  <span
                    className="text-[#202151]/25 text-[10px] font-bold"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {d.year}
                  </span>
                </div>

                {/* Register */}
                <div
                  className="event-register flex-shrink-0 text-[#202151] bg-transparent border border-[#202151]/20 text-[11px] md:text-[12px] font-black px-4 md:px-5 py-2 rounded-sm tracking-wide whitespace-nowrap transition-all duration-200"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  سجّل
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── BOTTOM RULE ── */}
        <div className="mt-16 flex items-center gap-4 border-t border-[#D0B66A]/25 pt-6">
          <span
            className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · الفعاليات
          </span>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/60 text-[11px] font-black"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ١٥+ فعالية قادمة
          </span>
        </div>

      </section>
    </>
  );
}