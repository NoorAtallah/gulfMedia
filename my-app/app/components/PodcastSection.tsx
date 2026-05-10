"use client";

import { useState, useRef, useEffect } from "react";

const EPISODES = [
  {
    number: "٠١",
    title: "مستقبل الصحافة في عصر الذكاء الاصطناعي",
    titleEn: "Journalism in the Age of AI",
    guest: "د. محمد الزهراني",
    guestTitle: "خبير إعلام رقمي",
    duration: "٤٨:٢٢",
    date: "١٢ مايو ٢٠٢٥",
    featured: true,
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&q=85&fit=crop",
    waveform: [30,55,40,70,45,80,35,65,50,75,40,60,55,85,45,70,35,60,50,75,40,65,55,80,45,70,30,55,65,85,45,60,40,75,55,70,35,65,50,80],
  },
  {
    number: "٠٢",
    title: "الصحفي الخليجي بين التقليد والحداثة",
    titleEn: "Gulf Journalists: Tradition & Modernity",
    guest: "سارة المنصوري",
    guestTitle: "مذيعة ومحررة",
    duration: "٣٥:١٠",
    date: "٥ مايو ٢٠٢٥",
    featured: false,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85&fit=crop",
    waveform: [45,65,35,75,50,60,40,70,55,80,35,65,45,75,55,60,40,70,50,85,35,65,45,75,50,60,40,70,55,80,35,65],
  },
  {
    number: "٠٣",
    title: "إعلام الأزمات: كيف تُغطي الكارثة؟",
    titleEn: "Crisis Journalism: Covering Catastrophe",
    guest: "خالد البلوشي",
    guestTitle: "محقق صحفي",
    duration: "٥٢:٠٥",
    date: "٢٨ أبريل ٢٠٢٥",
    featured: false,
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=85&fit=crop",
    waveform: [55,75,40,65,50,80,35,70,45,85,40,65,55,75,45,60,35,70,50,80,40,65,55,75,45,60,35,70,50,85,40,65],
  },
];

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";

function Waveform({ bars, playing }: { bars: number[]; playing: boolean }) {
  return (
    <div className="flex items-center gap-[2px]" style={{ height: "36px" }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: "2px",
            height: `${h}%`,
            background: playing ? GOLD : `rgba(208,182,106,0.3)`,
            borderRadius: "1px",
            transition: `height 0.3s ease ${i * 0.01}s, background 0.3s ease`,
            animation: playing ? `wavePulse 0.8s ease-in-out ${i * 0.04}s infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function PodcastSection() {
  const [playing, setPlaying] = useState<number | null>(null);
  const featured = EPISODES[0];
  const rest = EPISODES.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');

        @keyframes wavePulse {
          from { transform: scaleY(0.6); }
          to   { transform: scaleY(1); }
        }

        .play-btn {
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .play-btn:hover {
          transform: scale(1.08);
          background: ${GOLD} !important;
        }
        .play-btn:hover .play-icon {
          color: ${NAVY} !important;
        }

        .episode-row {
          transition: background 0.25s ease;
          cursor: pointer;
        }
        .episode-row:hover {
          background: rgba(208,182,106,0.05);
        }

        .podcast-view-all {
          transition: all 0.25s ease;
        }
        .podcast-view-all:hover {
          background: ${GOLD};
          color: ${NAVY};
          border-color: ${GOLD};
        }

        .featured-img {
          transition: transform 0.7s cubic-bezier(.2,0,0,1);
        }
        .featured-podcast:hover .featured-img {
          transform: scale(1.04);
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
                Audio · بودكاست
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
              البودكاست
            </h2>
            <div className="w-12 h-px mt-4" style={{ background: GOLD, opacity: 0.5 }} />
          </div>

          <button
            className="podcast-view-all"
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
            كل الحلقات
          </button>
        </div>

        {/* ── FEATURED EPISODE ── */}
        <div
          className="featured-podcast relative overflow-hidden mb-4"
          style={{
            border: `0.5px solid rgba(208,182,106,0.15)`,
            borderRadius: "2px",
          }}
        >
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={featured.img}
              alt={featured.title}
              className="featured-img w-full h-full object-cover"
              style={{ filter: "grayscale(20%) brightness(0.35)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  105deg,
                  rgba(32,33,81,0.98) 0%,
                  rgba(32,33,81,0.85) 50%,
                  rgba(32,33,81,0.5) 100%
                )`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-end gap-10">

            {/* Left — info */}
            <div className="flex-1">
              {/* Episode number */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    color: GOLD,
                    opacity: 0.7,
                  }}
                >
                  Episode {featured.number}
                </span>
                <div className="h-px flex-1" style={{ background: GOLD, opacity: 0.2, maxWidth: "60px" }} />
                <span
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "10px",
                    color: RED,
                    background: "rgba(214,18,20,0.12)",
                    padding: "3px 10px",
                    borderRadius: "1px",
                    fontWeight: 700,
                  }}
                >
                  أحدث حلقة
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(22px, 3vw, 36px)",
                  color: CREAM,
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                {featured.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: GOLD,
                  opacity: 0.7,
                  letterSpacing: "0.1em",
                  marginBottom: "24px",
                }}
              >
                {featured.titleEn}
              </p>

              {/* Guest */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: `rgba(208,182,106,0.15)`,
                    border: `0.5px solid rgba(208,182,106,0.3)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "12px", color: GOLD }}>◈</span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Noto Kufi Arabic', sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      color: CREAM,
                      lineHeight: 1.2,
                    }}
                  >
                    {featured.guest}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "11px",
                      color: GOLD,
                      opacity: 0.6,
                    }}
                  >
                    {featured.guestTitle}
                  </p>
                </div>
              </div>

              {/* Waveform + play */}
              <div className="flex items-center gap-6">
                <button
                  className="play-btn"
                  onClick={() => setPlaying(playing === 0 ? null : 0)}
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: playing === 0 ? GOLD : "rgba(208,182,106,0.12)",
                    border: `1px solid ${GOLD}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="play-icon"
                    style={{
                      fontSize: "16px",
                      color: playing === 0 ? NAVY : GOLD,
                      marginRight: playing === 0 ? "0" : "-2px",
                    }}
                  >
                    {playing === 0 ? "⏸" : "▶"}
                  </span>
                </button>

                <div className="flex-1">
                  <Waveform bars={featured.waveform} playing={playing === 0} />
                </div>

                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "12px",
                    color: CREAM,
                    opacity: 0.4,
                    letterSpacing: "0.1em",
                    flexShrink: 0,
                  }}
                >
                  {featured.duration}
                </span>
              </div>
            </div>

            {/* Right — date */}
            <div
              className="flex-shrink-0 text-left"
              style={{ direction: "ltr" }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "11px",
                  color: CREAM,
                  opacity: 0.3,
                  letterSpacing: "0.15em",
                }}
              >
                {featured.date}
              </span>
            </div>
          </div>
        </div>

        {/* ── EPISODE LIST ── */}
        <div
          style={{
            border: `0.5px solid rgba(208,182,106,0.12)`,
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          {rest.map((ep, i) => (
            <div
              key={i}
              className="episode-row flex items-center gap-5 px-6 py-5"
              style={{
                borderBottom: i < rest.length - 1 ? `0.5px solid rgba(208,182,106,0.1)` : "none",
              }}
              onClick={() => setPlaying(playing === i + 1 ? null : i + 1)}
            >
              {/* Episode number */}
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: GOLD,
                  opacity: 0.5,
                  letterSpacing: "0.1em",
                  flexShrink: 0,
                  width: "28px",
                }}
              >
                {ep.number}
              </span>

              {/* Thumbnail */}
              <div
                className="flex-shrink-0 overflow-hidden"
                style={{ width: "56px", height: "56px", borderRadius: "1px" }}
              >
                <img
                  src={ep.img}
                  alt={ep.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(30%) brightness(0.7)" }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: CREAM,
                    lineHeight: 1.4,
                    marginBottom: "3px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {ep.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "11px",
                    color: GOLD,
                    opacity: 0.6,
                  }}
                >
                  {ep.guest} · {ep.guestTitle}
                </p>
              </div>

              {/* Waveform mini */}
              <div className="hidden md:block flex-shrink-0" style={{ width: "80px" }}>
                <Waveform bars={ep.waveform.slice(0, 20)} playing={playing === i + 1} />
              </div>

              {/* Duration */}
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "12px",
                  color: CREAM,
                  opacity: 0.3,
                  letterSpacing: "0.1em",
                  flexShrink: 0,
                }}
              >
                {ep.duration}
              </span>

              {/* Play button */}
              <button
                className="play-btn flex-shrink-0"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: playing === i + 1 ? GOLD : "rgba(208,182,106,0.1)",
                  border: `0.5px solid rgba(208,182,106,0.3)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <span
                  className="play-icon"
                  style={{
                    fontSize: "11px",
                    color: playing === i + 1 ? NAVY : GOLD,
                    marginRight: playing === i + 1 ? "0" : "-1px",
                  }}
                >
                  {playing === i + 1 ? "⏸" : "▶"}
                </span>
              </button>
            </div>
          ))}
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
            Gulf Media Platform · البودكاست
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
            ٤٠+ حلقة متاحة
          </span>
        </div>

      </section>
    </>
  );
}