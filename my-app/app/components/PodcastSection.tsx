"use client";

import { useState } from "react";
import Link from "next/link";
import type { Podcast } from "@/lib/types";

type Props = {
  featured: Podcast | null;
  podcasts: Podcast[];
};

const WAVEFORM_DEFAULT = [30,55,40,70,45,80,35,65,50,75,40,60,55,85,45,70,35,60,50,75,40,65,55,80,45,70,30,55,65,85,45,60,40,75,55,70,35,65,50,80];

function formatDuration(seconds: number | null): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function Waveform({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-9">
      {WAVEFORM_DEFAULT.map((h, i) => (
        <div
          key={i}
          className="rounded-[1px] transition-all duration-300"
          style={{
            width: "2px",
            height: `${h}%`,
            background: playing ? "#D0B66A" : "rgba(32,33,81,0.2)",
            transitionDelay: `${i * 0.01}s`,
            animation: playing ? `wavePulse 0.8s ease-in-out ${i * 0.04}s infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function PodcastSection({ featured, podcasts }: Props) {
  const [playing, setPlaying] = useState<string | null>(null);
  const rest = podcasts.filter((p) => p.id !== featured?.id).slice(0, 3);

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
        .episode-row { transition: background 0.25s ease; cursor: pointer; }
        .episode-row:hover { background: rgba(208,182,106,0.06); }
        .podcast-view-all { transition: all 0.25s ease; }
        .podcast-view-all:hover { background: #D0B66A; color: #202151; border-color: #D0B66A; }
        .featured-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .featured-podcast:hover .featured-img { transform: scale(1.04); }
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
                Audio · بودكاست
              </span>
            </div>
            <h2
              className="text-[#202151] font-black text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-0.02em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              البودكاست
            </h2>
            <div className="w-12 h-px mt-4 bg-[#D0B66A] opacity-50" />
          </div>

          <Link
            href="/podcasts"
            className="podcast-view-all text-[#202151] bg-transparent border border-[#202151]/25 text-[13px] font-black tracking-wide px-7 py-2.5 rounded-sm no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            كل الحلقات
          </Link>
        </div>

        {/* ── FEATURED EPISODE ── */}
        {featured && (
          <div className="featured-podcast relative overflow-hidden mb-4 border border-[#D0B66A]/25 rounded-sm">
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

                {/* Episode badge */}
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

                {/* Title */}
                <h3
                  className="text-white font-black text-[clamp(22px,3vw,36px)] leading-[1.25] tracking-[-0.02em] mb-2"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {featured.title_ar}
                </h3>

                {/* Description */}
                {featured.description_ar && (
                  <p
                    className="text-white/60 text-[13px] font-bold leading-[1.8] mb-6 max-w-xl"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {featured.description_ar}
                  </p>
                )}

                {/* Host */}
                {featured.host && (
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full bg-[#D0B66A]/15 border border-[#D0B66A]/30 overflow-hidden flex-shrink-0">
                      {featured.host.avatar_url ? (
                        <img
                          src={featured.host.avatar_url}
                          alt={featured.host.full_name_ar}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[#D0B66A] text-[10px]">◈</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p
                        className="text-white text-[13px] font-black leading-[1.2]"
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

                {/* Waveform + play */}
                <div className="flex items-center gap-6">
                  <Link
                    href={`/podcasts/${featured.id}`}
                    className="play-btn flex-shrink-0 w-[52px] h-[52px] rounded-full flex items-center justify-center border border-[#D0B66A] no-underline"
                    style={{
                      background: playing === featured.id ? "#D0B66A" : "rgba(208,182,106,0.12)",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setPlaying(playing === featured.id ? null : featured.id);
                    }}
                  >
                    <span
                      className="play-icon text-[16px]"
                      style={{
                        color: playing === featured.id ? "#202151" : "#D0B66A",
                        marginRight: playing === featured.id ? "0" : "-2px",
                      }}
                    >
                      {playing === featured.id ? "⏸" : "▶"}
                    </span>
                  </Link>

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

              {/* Date */}
              <div className="flex-shrink-0" dir="ltr">
                {featured.published_at && (
                  <span
                    className="text-white/30 text-[11px] italic font-bold tracking-[0.15em]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {new Date(featured.published_at).toLocaleDateString("ar-SA")}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── EPISODE LIST ── */}
        {rest.length > 0 && (
          <div className="border border-[#D0B66A]/20 rounded-sm overflow-hidden">
            {rest.map((ep, i) => (
              <div
                key={ep.id}
                className="episode-row flex items-center gap-5 px-6 py-5"
                style={{
                  borderBottom: i < rest.length - 1 ? "0.5px solid rgba(208,182,106,0.15)" : "none",
                }}
                onClick={() => setPlaying(playing === ep.id ? null : ep.id)}
              >
                {/* Episode number */}
                <span
                  className="text-[#D0B66A] text-[13px] italic font-bold opacity-50 tracking-[0.1em] flex-shrink-0 w-7"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {String(ep.episode_number ?? i + 2).padStart(2, "0")}
                </span>

                {/* Thumbnail */}
                <div className="flex-shrink-0 w-14 h-14 rounded-[1px] overflow-hidden">
                  <img
                    src={ep.cover_url ?? ""}
                    alt={ep.title_ar}
                    className="w-full h-full object-cover grayscale-[30%] brightness-[0.7]"
                  />
                </div>

                {/* Info */}
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

                {/* Waveform mini */}
                <div className="hidden md:block flex-shrink-0 w-20">
                  <Waveform playing={playing === ep.id} />
                </div>

                {/* Duration */}
                <span
                  className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.1em] flex-shrink-0"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {formatDuration(ep.duration_seconds)}
                </span>

                {/* Play button */}
                <button
                  className="play-btn flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-[#D0B66A]/35"
                  style={{
                    background: playing === ep.id ? "#D0B66A" : "rgba(208,182,106,0.1)",
                  }}
                >
                  <span
                    className="play-icon text-[11px]"
                    style={{
                      color: playing === ep.id ? "#202151" : "#D0B66A",
                      marginRight: playing === ep.id ? "0" : "-1px",
                    }}
                  >
                    {playing === ep.id ? "⏸" : "▶"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── BOTTOM RULE ── */}
        <div className="mt-16 flex items-center gap-4 border-t border-[#D0B66A]/25 pt-6">
          <span
            className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · البودكاست
          </span>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/60 text-[11px] font-black"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ٤٠+ حلقة متاحة
          </span>
        </div>

      </section>
    </>
  );
}