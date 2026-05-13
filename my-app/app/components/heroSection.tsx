"use client";

import { useState, useEffect, useRef } from "react";

const SLIDES = [
  {
    ar: "صحافة",
    en: "Journalism",
    sub: "الصحافة التي تُحدث فرقاً",
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1800&q=90",
  },
  {
    ar: "تدريب",
    en: "Training",
    sub: "طوِّر مهاراتك مع خبراء الإعلام",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1800&q=90",
  },
  {
    ar: "بودكاست",
    en: "Podcast",
    sub: "أصوات تصنع الرأي الخليجي",
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1800&q=90",
  },
  {
    ar: "فعاليات",
    en: "Events",
    sub: "ملتقيات تجمع إعلاميي الخليج",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=90",
  },
  {
    ar: "مراكز",
    en: "Media Centers",
    sub: "شبكة من المراكز الإعلامية الخليجية",
    img: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1800&q=90",
  },
  {
    ar: "مقالات",
    en: "Editorial",
    sub: "تحليل عميق للمشهد الإعلامي",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1800&q=90",
  },
];

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";
const AUTO  = 6000;

export default function HeroSection() {
  const [idx, setIdx]         = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [textKey, setTextKey] = useState(0);
  const [progress, setProg]   = useState(0);
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progRef               = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitioning         = useRef(false);

  const clearAll = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progRef.current) clearInterval(progRef.current);
  };

  const goTo = (target: number) => {
    if (transitioning.current || target === idx) return;
    clearAll();
    transitioning.current = true;
    setPrevIdx(idx);
    setIdx(target);
    setTextKey((k) => k + 1);
    setProg(0);
    setTimeout(() => {
      setPrevIdx(null);
      transitioning.current = false;
    }, 1100);
  };

  const next = () => goTo((idx + 1) % SLIDES.length);
  const prev = () => goTo((idx - 1 + SLIDES.length) % SLIDES.length);

  const startProg = () => {
    clearAll();
    setProg(0);
    let p = 0;
    progRef.current = setInterval(() => {
      p += (100 / AUTO) * 60;
      setProg(Math.min(p, 100));
    }, 60);
    timerRef.current = setTimeout(() => next(), AUTO);
  };

  useEffect(() => {
    startProg();
    return clearAll;
  }, [idx]);

  const slide = SLIDES[idx];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,300;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');

        @keyframes kenburns {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
        .img-active {
          animation: kenburns 8s ease-out both;
          opacity: 1 !important;
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        .img-prev { animation: fadeOut 1.1s ease forwards; }

        @keyframes charIn {
          from { opacity: 0; transform: translateY(16px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }
        .char {
          display: inline-block;
          animation: charIn 0.8s cubic-bezier(.2,0,.0,1) both;
        }

        @keyframes lineIn {
          from { opacity: 0; letter-spacing: 0.6em; }
          to   { opacity: 1; letter-spacing: 0.22em; }
        }
        .sub-in {
          animation: lineIn 1s cubic-bezier(.2,0,0,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.9s cubic-bezier(.2,0,0,1) both;
        }

        @keyframes barIn {
          from { height: 0; }
          to   { height: var(--bar-h); }
        }
        .bar-anim {
          --bar-h: clamp(72px, 10vh, 110px);
          animation: barIn 1.2s cubic-bezier(.7,0,.3,1) both;
          height: clamp(72px, 10vh, 110px);
        }

        .arrow-btn {
          width: 44px; height: 44px;
          border: 0.5px solid rgba(245,241,232,0.2);
          background: transparent;
          color: ${CREAM};
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 15px;
          font-family: 'Playfair Display', serif;
          transition: background .25s, border-color .25s;
        }
        .arrow-btn:hover {
          background: rgba(245,241,232,0.08);
          border-color: rgba(245,241,232,0.45);
        }

        .prog-dot {
          border: none;
          background: none;
          cursor: pointer;
          padding: 10px 0;
          width: 44px;
          display: flex;
          flex-direction: column;
        }
        .prog-track {
          width: 100%;
          height: 0.5px;
          background: rgba(245,241,232,0.15);
          overflow: hidden;
        }
        .prog-fill {
          height: 100%;
          background: ${GOLD};
          transition: width .06s linear;
        }
      `}</style>

      <div
        className="relative w-full h-screen overflow-hidden"
        style={{ background: NAVY, direction: "rtl", color: CREAM }}
      >
        {/* ── IMAGES ── */}
        <div className="absolute inset-0">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 ${
                i === idx ? "img-active" : i === prevIdx ? "img-prev" : ""
              }`}
              style={{
                backgroundImage: `url(${s.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: i === idx ? 0 : i === prevIdx ? 1 : 0,
                transformOrigin: "center",
              }}
            />
          ))}
        </div>

        {/* ── CINEMATIC WASH ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 75% 65% at 50% 50%, rgba(32,33,81,0.1) 0%, rgba(32,33,81,0.72) 100%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${NAVY} 0%, transparent 100%)`,
            opacity: 0.6,
          }}
        />

        {/* ── BOTTOM LETTERBOX BAR ── */}
        <div
          className="bar-anim absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between overflow-hidden"
          style={{
            background: NAVY,
            padding: "0 clamp(24px, 5vw, 72px)",
            borderTop: `1px solid rgba(208,182,106,0.12)`,
          }}
        >
          {/* Progress bars */}
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button key={i} className="prog-dot" onClick={() => goTo(i)}>
                <div className="prog-track">
                  <div
                    className="prog-fill"
                    style={{
                      width: i === idx ? `${progress}%` : i < idx ? "100%" : "0%",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Subtitle */}
          <span
            key={`foot-${textKey}`}
            className="sub-in"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "13px",
              fontStyle: "italic",
              fontWeight: 300,
              opacity: 0.45,
              letterSpacing: "0.22em",
              color: CREAM,
              animationDelay: "0.5s",
            }}
          >
            {slide.en} · ٢٠٢٥
          </span>

          {/* Slide counter + Arrows */}
          <div className="flex items-center gap-4" dir="ltr">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px",
                letterSpacing: "0.2em",
                opacity: 0.3,
                color: CREAM,
              }}
            >
              {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
            <button className="arrow-btn" onClick={prev}>←</button>
            <button className="arrow-btn" onClick={next}>→</button>
          </div>
        </div>

        {/* ── CENTER TITLE CARD ── */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
          <div
            key={`rule-t-${textKey}`}
            className="fade-up"
            style={{
              width: "1px",
              height: "48px",
              background: `rgba(208,182,106,0.5)`,
              marginBottom: "32px",
              animationDelay: "0.1s",
            }}
          />

          <span
            key={`eyebrow-${textKey}`}
            className="sub-in"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(10px, 1vw, 12px)",
              fontStyle: "italic",
              letterSpacing: "0.35em",
              color: GOLD,
              opacity: 0.8,
              marginBottom: "20px",
              animationDelay: "0.2s",
            }}
          >
            Gulf Media Platform · منصة إعلاميو الخليج
          </span>

          <h1
            key={`ar-${textKey}`}
            style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: "clamp(80px, 16vw, 210px)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: CREAM,
              margin: 0,
              textAlign: "center",
              textShadow: `0 4px 60px rgba(32,33,81,0.6)`,
            }}
          >
            <span className="char" style={{ animationDelay: "0.18s" }}>
              {slide.ar}
            </span>
          </h1>

          <div
            key={`sep-${textKey}`}
            className="sub-in"
            style={{
              width: "48px",
              height: "0.5px",
              background: GOLD,
              margin: "28px auto",
              animationDelay: "0.4s",
            }}
          />

          <span
            key={`en-${textKey}`}
            className="sub-in"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(13px, 1.8vw, 20px)",
              fontStyle: "italic",
              fontWeight: 300,
              color: GOLD,
              letterSpacing: "0.25em",
              animationDelay: "0.5s",
            }}
          >
            {slide.en}
          </span>

          <span
            key={`sub-${textKey}`}
            className="fade-up"
            style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: "clamp(12px, 1.2vw, 15px)",
              fontWeight: 300,
              color: CREAM,
              opacity: 0.45,
              letterSpacing: "0.04em",
              marginTop: "12px",
              animationDelay: "0.65s",
            }}
          >
            {slide.sub}
          </span>

          <div
            key={`rule-b-${textKey}`}
            className="fade-up"
            style={{
              width: "1px",
              height: "48px",
              background: `rgba(208,182,106,0.5)`,
              marginTop: "36px",
              animationDelay: "0.7s",
            }}
          />
        </div>
      </div>
    </>
  );
}