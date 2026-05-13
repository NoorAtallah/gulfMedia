"use client";

import { useState } from "react";
import Link from "next/link";
import type { Podcast } from "@/lib/types";

type Props = {
  featured: Podcast | null;
  podcasts: Podcast[];
};

const WAVEFORM = [30,55,40,70,45,80,35,65,50,75,40,60,55,85,45,70,35,60,50,75,40,65,55,80,45,70,30,55,65,85,45,60,40,75,55,70,35,65,50,80];

function formatDuration(seconds: number | null): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function Waveform({ playing, short }: { playing: boolean; short?: boolean }) {
  const bars = short ? WAVEFORM.slice(0, 20) : WAVEFORM;
  return (
    <div className="flex items-center gap-[2px] h-9">
      {bars.map((h, i) => (
        <div
          key={i}
          className="rounded-[1px]"
          style={{
            width: "2px",
            height: `${h}%`,
            background: playing ? "#D0B66A" : "rgba(32,33,81,0.2)",
            transition: `height 0.3s ease ${i * 0.01}s, background 0.3s ease`,
            animation: playing ? `wavePulse 0.8s ease-in-out ${i * 0.04}s infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function PodcastsPage({ featured, podcasts }: Props) {
  const [playing, setPlaying] = useState<string | null>(null);
  const rest = podcasts.filter((p) => p.id !== featured?.id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        @keyframes wavePulse {
          from { transform: scaleY(0.6); }
          to { transform: scaleY(1); }
        }
        .play-btn { transition: transform 0.25s ease, background 0.25s ease; }
        .play-btn:hover { transform: scale(1.08); background: #D0B66A !important; }
        .play-btn:hover .play-icon { color: #202151 !important; }
        .episode-row { transition: background 0.25s ease; }
        .episode-row:hover { background: rgba(208,182,106,0.06); }
        .episode-card:hover .ep-img { transform: scale(1.05); }
        .ep-img { transition: transform 0.6s cubic-bezier(.2,0,0,1); }
        .featured-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .featured-podcast:hover .featured-img { transform: scale(1.04); }
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
              Audio · بودكاست
            </span>
          </div>
          <h1
            className="text-white font-black text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            البودكاست
          </h1>
          <p
            className="text-white/60 text-[14px] font-bold leading-[1.8] max-w-xl"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            حلقات صوتية ومرئية مع نخبة من الإعلاميين والمتخصصين في المنطقة
          </p>
        </div>

        <div className="px-6 md:px-14 py-14">

          {/* ── FEATURED ── */}
          {featured && (
            <div className="featured-podcast relative overflow-hidden mb-10 border border-[#D0B66A]/25 rounded-sm">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={featured.cover_url ?? ""}
                  alt={featured.title_ar}
                  className="featured-img w-full h-full object-cover grayscale-[20%] brightness-[0.35]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#202151]/98 via-[#202151]/85 to-[#202151]/50" />
              </div>

              <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-end gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-70"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Episode {featured.episode_number ?? "٠١"}
                    </span>
                    <div className="h-px w-14 bg-[#D0B66A]/20" />
                    <span
                      className="text-[#D61214] bg-[#D61214]/12 text-[10px] font-black px-2.5 py-1 rounded-[1px]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      أحدث حلقة
                    </span>
                  </div>

                  <h2
                    className="text-white font-black text-[clamp(22px,3vw,38px)] leading-[1.25] tracking-[-0.02em] mb-3"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {featured.title_ar}
                  </h2>

                  {featured.description_ar && (
                    <p
                      className="text-white/60 text-[13px] font-bold leading-[1.8] mb-6 max-w-xl"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {featured.description_ar}
                    </p>
                  )}

                  {featured.host && (
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D0B66A]/30 flex-shrink-0">
                        <img
                          src={featured.host.avatar_url ?? ""}
                          alt={featured.host.full_name_ar}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p
                          className="text-white text-[13px] font-black"
                          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                        >
                          {featured.host.full_name_ar}
                        </p>
                        <p
                          className="text-[#D0B66A] text-[11px] italic font-bold opacity-60"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {featured.host.specialty}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-6">
                    <button
                      className="play-btn flex-shrink-0 w-[52px] h-[52px] rounded-full flex items-center justify-center border border-[#D0B66A]"
                      style={{ background: playing === featured.id ? "#D0B66A" : "rgba(208,182,106,0.12)" }}
                      onClick={() => setPlaying(playing === featured.id ? null : featured.id)}
                    >
                      <span
                        className="play-icon text-[16px]"
                        style={{ color: playing === featured.id ? "#202151" : "#D0B66A", marginRight: playing === featured.id ? "0" : "-2px" }}
                      >
                        {playing === featured.id ? "⏸" : "▶"}
                      </span>
                    </button>
                    <div className="flex-1">
                      <Waveform playing={playing === featured.id} />
                    </div>
                    <span
                      className="text-white/40 text-[12px] italic font-bold tracking-[0.1em] flex-shrink-0"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {formatDuration(featured.duration_seconds)}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/podcasts/${featured.id}`}
                  className="flex-shrink-0 text-[#D0B66A] border border-[#D0B66A]/40 text-[12px] font-black italic tracking-wide px-6 py-3 rounded-sm no-underline hover:bg-[#D0B66A] hover:text-[#202151] transition-all duration-200"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  عرض الحلقة ←
                </Link>
              </div>
            </div>
          )}

          {/* ── ALL EPISODES HEADER ── */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-[#D61214]" />
            <h2
              className="text-[#202151] font-black text-[clamp(18px,2.5vw,28px)] tracking-[-0.01em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              جميع الحلقات
            </h2>
            <span
              className="text-[#202151]/30 text-[12px] font-bold"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {podcasts.length} حلقة
            </span>
          </div>

          {/* ── EPISODE LIST ── */}
          <div className="border border-[#D0B66A]/20 rounded-sm overflow-hidden mb-10">
            {rest.map((ep, i) => (
              <div
                key={ep.id}
                className="episode-row flex items-center gap-5 px-6 py-5 cursor-pointer"
                style={{ borderBottom: i < rest.length - 1 ? "0.5px solid rgba(208,182,106,0.15)" : "none" }}
                onClick={() => setPlaying(playing === ep.id ? null : ep.id)}
              >
                <span
                  className="text-[#D0B66A] text-[13px] italic font-bold opacity-50 tracking-[0.1em] flex-shrink-0 w-7"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {String(ep.episode_number ?? i + 2).padStart(2, "0")}
                </span>

                <div className="flex-shrink-0 w-14 h-14 rounded-[1px] overflow-hidden">
                  <img
                    src={ep.cover_url ?? ""}
                    alt={ep.title_ar}
                    className="w-full h-full object-cover grayscale-[30%] brightness-[0.7]"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="text-[#202151] text-[14px] font-black leading-[1.4] mb-1 truncate"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {ep.title_ar}
                  </p>
                  {ep.host && (
                    <p
                      className="text-[#D0B66A] text-[11px] italic font-bold opacity-70"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {ep.host.full_name_ar} · {ep.host.specialty}
                    </p>
                  )}
                </div>

                <div className="hidden md:block flex-shrink-0 w-20">
                  <Waveform playing={playing === ep.id} short />
                </div>

                <span
                  className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.1em] flex-shrink-0"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {formatDuration(ep.duration_seconds)}
                </span>

                <Link
                  href={`/podcasts/${ep.id}`}
                  className="text-[#D0B66A] text-[11px] italic font-bold opacity-60 no-underline hover:opacity-100 transition-opacity flex-shrink-0 hidden md:block"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  عرض ←
                </Link>

                <button
                  className="play-btn flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-[#D0B66A]/35"
                  style={{ background: playing === ep.id ? "#D0B66A" : "rgba(208,182,106,0.1)" }}
                >
                  <span
                    className="play-icon text-[11px]"
                    style={{ color: playing === ep.id ? "#202151" : "#D0B66A", marginRight: playing === ep.id ? "0" : "-1px" }}
                  >
                    {playing === ep.id ? "⏸" : "▶"}
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* ── BOTTOM RULE ── */}
          <div className="flex items-center gap-4 border-t border-[#D0B66A]/20 pt-8">
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
              Gulf Media Platform · البودكاست
            </span>
          </div>
        </div>
      </main>
    </>
  );
}