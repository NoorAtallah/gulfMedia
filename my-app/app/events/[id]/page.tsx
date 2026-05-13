import { getEventById, getAllEvents } from "@/lib/queries/events";
import { notFound } from "next/navigation";
import Link from "next/link";
import EventRegisterForm from "../../components/EventRegisterForm";

function formatDate(dateStr: string | null) {
  if (!dateStr) return { day: "—", month: "—", year: "—", weekday: "—", full: "—", time: "—" };
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("ar-SA", { day: "numeric" }),
    month: d.toLocaleDateString("ar-SA", { month: "long" }),
    year: d.toLocaleDateString("ar-SA", { year: "numeric" }),
    weekday: d.toLocaleDateString("ar-SA", { weekday: "long" }),
    full: d.toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" }),
    time: d.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [event, all] = await Promise.all([
    getEventById(id),
    getAllEvents(),
  ]);

  if (!event) notFound();

  const related = all.filter((e) => e.id !== id).slice(0, 3);
  const start = formatDate(event.starts_at);
  const end = formatDate(event.ends_at);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .related-card:hover .rel-img { transform: scale(1.05); }
        .rel-img { transition: transform 0.6s cubic-bezier(.2,0,0,1); }
        .back-link:hover { color: #D0B66A; }
        .back-link { transition: color 0.2s; }
      `}</style>

      <main className="w-full min-h-screen bg-white" dir="rtl">

        {/* ── HERO ── */}
        <div className="w-full bg-[#202151] px-6 md:px-14 pt-20 pb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl">

            {/* Date block */}
            <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 flex flex-col items-center justify-center border border-[#D0B66A]/30 bg-[#D0B66A]/6 rounded-sm">
              <span
                className="text-[#D0B66A] font-black text-[40px] md:text-[52px] leading-none"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {start.day}
              </span>
              <span
                className="text-white/60 text-[12px] italic font-bold tracking-[0.1em] mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {start.month}
              </span>
              <span
                className="text-white/30 text-[10px] font-bold mt-0.5"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {start.year}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="w-6 h-px bg-[#D61214]" />
                {event.location_type && (
                  <span
                    className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {event.location_type === "online" ? "Online" : event.location_type === "in-person" ? "In-Person" : "Hybrid"}
                  </span>
                )}
              </div>

              <h1
                className="text-white font-black text-[clamp(26px,4vw,52px)] leading-[1.15] tracking-[-0.02em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {event.title_ar}
              </h1>

              {event.description_ar && (
                <p
                  className="text-white/65 text-[14px] font-bold leading-[1.9] max-w-2xl"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {event.description_ar}
                </p>
              )}

              <div className="flex items-center gap-4 flex-wrap pt-2 border-t border-[#D0B66A]/15">
                {event.location_ar && (
                  <span
                    className="text-white/55 bg-white/5 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    📍 {event.location_ar}
                  </span>
                )}
                <span
                  className="text-white/55 bg-white/5 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {start.weekday} · {start.full}
                </span>
                {event.capacity && (
                  <span
                    className="text-[#D0B66A] bg-[#D0B66A]/10 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {event.capacity} مقعد متاح
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
              { n: start.full, l: "تاريخ البداية" },
              { n: event.ends_at ? end.full : "—", l: "تاريخ النهاية" },
              { n: event.capacity ? `${event.capacity}` : "—", l: "عدد المقاعد" },
              { n: event.location_type === "online" ? "أونلاين" : event.location_type === "in-person" ? "حضوري" : "هجين", l: "نوع الفعالية" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span
                  className="text-[#D0B66A] font-black text-[clamp(14px,2vw,22px)] leading-none tracking-[-0.01em]"
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

        {/* ── DETAILS + FORM ── */}
        <div className="px-6 md:px-14 py-16 border-b border-[#D0B66A]/15">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left — details */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#D61214]" />
                <h2
                  className="text-[#202151] font-black text-[20px] tracking-[-0.01em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  عن الفعالية
                </h2>
              </div>

              {event.description_ar && (
                <p
                  className="text-[#202151]/70 text-[15px] font-bold leading-[2.2]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {event.description_ar}
                </p>
              )}

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "تاريخ البداية", value: start.full },
                  { label: "تاريخ النهاية", value: event.ends_at ? end.full : "—" },
                  { label: "المكان", value: event.location_ar ?? "—" },
                  { label: "عدد المقاعد", value: event.capacity ? `${event.capacity} مقعد` : "—" },
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

              {/* Cover image */}
              {event.cover_url && (
                <div className="overflow-hidden border border-[#D0B66A]/20 h-52">
                  <img
                    src={event.cover_url}
                    alt={event.title_ar}
                    className="w-full h-full object-cover brightness-90"
                  />
                </div>
              )}
            </div>

            {/* Right — form */}
            <div>
              <EventRegisterForm eventId={event.id} />
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
                فعاليات أخرى
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D0B66A]/15">
              {related.map((e) => {
                const rd = formatDate(e.starts_at);
                return (
                  <Link
                    key={e.id}
                    href={`/events/${e.id}`}
                    className="bg-white flex flex-col no-underline group"
                  >
                    <div className="relative overflow-hidden h-44">
                      <img
                        src={e.cover_url ?? ""}
                        alt={e.title_ar}
                        className="rel-img w-full h-full object-cover brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/90 to-transparent" />
                      <div className="absolute top-3 right-3 flex flex-col items-center w-10 h-10 bg-[#202151]/90 border border-[#D0B66A]/30 justify-center">
                        <span
                          className="text-[#D0B66A] font-black text-[14px] leading-none"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {rd.day}
                        </span>
                        <span
                          className="text-white/40 text-[7px] italic font-bold"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {rd.month}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1 border-b border-[#D0B66A]/15 group-hover:border-[#D0B66A]/50 transition-colors duration-300">
                      <h3
                        className="text-[#202151] text-[14px] font-black leading-[1.6]"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {e.title_ar}
                      </h3>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#D0B66A]/10">
                        {e.location_ar && (
                          <span
                            className="text-[#202151]/45 text-[11px] font-bold"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            {e.location_ar}
                          </span>
                        )}
                        {e.capacity && (
                          <span
                            className="text-[#D0B66A] text-[10px] font-black"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            {e.capacity} مقعد
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── BACK ── */}
        <div className="px-6 md:px-14 pb-16 flex items-center gap-4 border-t border-[#D0B66A]/20 pt-8">
          <Link
            href="/events"
            className="back-link text-[#202151]/40 text-[12px] font-black tracking-wide no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ← العودة إلى الفعاليات
          </Link>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/50 text-[11px] italic font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · الفعاليات
          </span>
        </div>

      </main>
    </>
  );
}