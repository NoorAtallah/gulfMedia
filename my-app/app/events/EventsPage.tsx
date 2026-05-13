"use client";

import { useState } from "react";
import Link from "next/link";
import type { Event } from "@/lib/types";

type Props = { events: Event[] };

const TYPES = ["الكل", "online", "in-person", "hybrid"];
const TYPE_AR: Record<string, string> = {
  "الكل": "الكل",
  "online": "أونلاين",
  "in-person": "حضوري",
  "hybrid": "هجين",
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return { day: "—", month: "—", year: "—", weekday: "—", full: "—" };
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("ar-SA", { day: "numeric" }),
    month: d.toLocaleDateString("ar-SA", { month: "long" }),
    year: d.toLocaleDateString("ar-SA", { year: "numeric" }),
    weekday: d.toLocaleDateString("ar-SA", { weekday: "long" }),
    full: d.toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" }),
  };
}

export default function EventsPage({ events }: Props) {
  const [type, setType] = useState("الكل");
  const [search, setSearch] = useState("");

  const filtered = events.filter((e) => {
    const matchType = type === "الكل" || e.location_type === type;
    const matchSearch = search === "" || e.title_ar.includes(search);
    return matchType && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .event-card:hover .event-card-img { transform: scale(1.05); }
        .event-card-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .event-card:hover .event-card-border { opacity: 1; }
        .event-card-border { opacity: 0; transition: opacity 0.35s ease; }
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
              Events · فعاليات
            </span>
          </div>
          <h1
            className="text-white font-black text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            الفعاليات
          </h1>
          <p
            className="text-white/60 text-[14px] font-bold leading-[1.8] max-w-xl"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ملتقيات ومؤتمرات وورش عمل تجمع نخبة الإعلاميين الخليجيين
          </p>
        </div>

        <div className="px-6 md:px-14 py-12">

          {/* ── FILTERS ── */}
          <div className="flex flex-col gap-5 mb-12">
            <input
              type="text"
              placeholder="ابحث في الفعاليات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 bg-transparent border border-[#202151]/20 text-[#202151] text-[13px] font-bold px-4 py-3 rounded-sm outline-none focus:border-[#D0B66A] transition-colors duration-200 placeholder:text-[#202151]/30 placeholder:font-normal"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            />

            <div className="flex items-center gap-2 flex-wrap">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`text-[12px] font-black px-5 py-2 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
                    type === t
                      ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                      : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
                  }`}
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {TYPE_AR[t]}
                </button>
              ))}
            </div>

            <p
              className="text-[#202151]/40 text-[12px] font-bold"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {filtered.length} فعالية
            </p>
          </div>

          {/* ── GRID ── */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3 border border-[#D0B66A]/15">
              <p
                className="text-[#202151]/30 text-[18px] font-black"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                لا توجد فعاليات
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((event) => {
                const d = formatDate(event.starts_at);
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="event-card flex flex-col overflow-hidden border border-[#D0B66A]/20 rounded-sm no-underline group"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={event.cover_url ?? ""}
                        alt={event.title_ar}
                        className="event-card-img w-full h-full object-cover brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/90 to-transparent" />
                      <div className="event-card-border absolute inset-0 border border-[#D0B66A]" />

                      {/* Date overlay */}
                      <div className="absolute top-3 right-3 flex flex-col items-center justify-center w-12 h-12 bg-[#202151]/90 border border-[#D0B66A]/30">
                        <span
                          className="text-[#D0B66A] font-black text-[18px] leading-none"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {d.day}
                        </span>
                        <span
                          className="text-white/50 text-[8px] italic font-bold mt-0.5"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {d.month}
                        </span>
                      </div>

                      {event.location_type && (
                        <span
                          className="absolute bottom-3 right-3 text-[#D0B66A] bg-[#202151]/85 text-[8px] italic font-bold tracking-[0.25em] px-2 py-0.5"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {event.location_type === "online" ? "Online" : event.location_type === "in-person" ? "In-Person" : "Hybrid"}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 gap-3 border-b border-[#D0B66A]/15 group-hover:border-[#D0B66A]/50 transition-colors duration-300">
                      <h3
                        className="text-[#202151] text-[15px] font-black leading-[1.4] tracking-[-0.01em]"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {event.title_ar}
                      </h3>

                      {event.description_ar && (
                        <p
                          className="text-[#202151]/55 text-[12px] font-bold leading-[1.8] line-clamp-2"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {event.description_ar}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#D0B66A]/10 flex-wrap gap-2">
                        {event.location_ar && (
                          <span
                            className="text-[#202151]/50 text-[11px] font-bold"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            📍 {event.location_ar}
                          </span>
                        )}
                        {event.capacity && (
                          <span
                            className="text-[#D0B66A] text-[11px] font-black"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            {event.capacity} مقعد
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
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
              Gulf Media Platform · الفعاليات
            </span>
          </div>
        </div>
      </main>
    </>
  );
}