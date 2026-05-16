"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ─── Static fallback slides (used until DB loads, or if fetch fails) ───────────
const DEFAULT_SLIDES = [
  {
    slug: "journalism",
    ar: "صحافة",
    en: "Journalism",
    sub: "الصحافة التي تُحدث فرقاً",
    href: "/journalists",
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1800&q=90",
  },
  {
    slug: "training",
    ar: "تدريب",
    en: "Training",
    sub: "طوِّر مهاراتك مع خبراء الإعلام",
    href: "/courses",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1800&q=90",
  },
  {
    slug: "podcast",
    ar: "بودكاست",
    en: "Podcast",
    sub: "أصوات تصنع الرأي الخليجي",
    href: "/podcasts",
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1800&q=90",
  },
  {
    slug: "events",
    ar: "فعاليات",
    en: "Events",
    sub: "ملتقيات تجمع إعلاميي الخليج",
    href: "/events",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=90",
  },
  {
    slug: "media-centers",
    ar: "مراكز",
    en: "Media Centers",
    sub: "شبكة من المراكز الإعلامية الخليجية",
    href: "/journalists",
    img: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1800&q=90",
  },
  {
    slug: "editorial",
    ar: "مقالات",
    en: "Editorial",
    sub: "تحليل عميق للمشهد الإعلامي",
    href: "/articles",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1800&q=90",
  },
  // ✅ New slide
  {
    slug: "media",
    ar: "إعلام",
    en: "Media",
    sub: "منصة إعلاميو الخليج — صوت المنطقة",
    href: "/media",
    img: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=1800&q=90",
  },
];

type Slide = (typeof DEFAULT_SLIDES)[number];

const AUTO = 6000;

export default function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [textKey, setTextKey] = useState(0);
  const [progress, setProg] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitioning = useRef(false);

  // ─── Fetch live slide data from Supabase (image overrides + ordering) ────────
  useEffect(() => {
    supabase
      .from("hero_slides")
      .select("slug, label_ar, label_en, subtitle_ar, href, img_url, display_order")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .then(({ data, error }: { data: null | Array<{ slug: string; label_ar: string; label_en: string; subtitle_ar: string; href: string; img_url: string; display_order: number }>; error: unknown }) => {
        if (error || !data?.length) return; // silently fall back to defaults
        // Merge DB data into defaults, preserving fallback for any missing slugs
        const merged: Slide[] = data.map((row) => ({
          slug: row.slug,
          ar: row.label_ar,
          en: row.label_en,
          sub: row.subtitle_ar,
          href: row.href,
          img: row.img_url,
        }));
        setSlides(merged);
      });
  }, []);

  // ─── Slider logic ─────────────────────────────────────────────────────────────
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

  const next = () => goTo((idx + 1) % slides.length);
  const prev = () => goTo((idx - 1 + slides.length) % slides.length);

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
  }, [idx, slides.length]);

  const slide = slides[idx];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');

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
          from { opacity: 0; transform: translateY(20px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .char {
          display: inline-block;
          animation: charIn 0.8s cubic-bezier(.2,0,.0,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.9s cubic-bezier(.2,0,0,1) both;
        }

        @keyframes lineIn {
          from { opacity: 0; letter-spacing: 0.6em; }
          to   { opacity: 1; letter-spacing: 0.3em; }
        }
        .sub-in {
          animation: lineIn 1s cubic-bezier(.2,0,0,1) both;
        }

        @keyframes barIn {
          from { height: 0; }
          to   { height: var(--bar-h); }
        }
        .bar-anim {
          --bar-h: clamp(64px, 10vh, 100px);
          animation: barIn 1.2s cubic-bezier(.7,0,.3,1) both;
          height: clamp(64px, 10vh, 100px);
        }

        .arrow-btn {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(245,241,232,0.4);
          background: rgba(0,0,0,0.3);
          color: #F5F1E8;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 16px;
          transition: background .25s, border-color .25s;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .arrow-btn:hover {
          background: rgba(208,182,106,0.25);
          border-color: #D0B66A;
        }

        .prog-dot {
          border: none;
          background: none;
          cursor: pointer;
          padding: 10px 0;
          width: 28px;
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 768px) {
          .prog-dot { width: 40px; }
        }
        .prog-track {
          width: 100%;
          height: 2px;
          background: rgba(245,241,232,0.25);
          overflow: hidden;
          border-radius: 1px;
        }
        .prog-fill {
          height: 100%;
          background: #D0B66A;
          transition: width .06s linear;
        }

        .hero-cta-primary {
          transition: opacity 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .hero-cta-primary:hover {
          opacity: 0.88;
          transform: translateY(-2px);
        }
        .hero-cta-secondary {
          transition: all 0.2s;
          white-space: nowrap;
        }
        .hero-cta-secondary:hover {
          border-color: rgba(208,182,106,0.8);
          color: #D0B66A;
        }

        .hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(20,21,60,0.82) 0%,
            rgba(20,21,60,0.55) 35%,
            rgba(20,21,60,0.70) 65%,
            rgba(20,21,60,0.92) 100%
          );
        }

        .bottom-bar {
          flex-wrap: wrap;
          gap: 8px;
        }

        @media (max-width: 640px) {
          .bottom-bar {
            justify-content: space-between;
            padding: 10px 16px !important;
            height: auto !important;
            min-height: 56px;
          }
          .bar-subtitle { display: none; }
        }
      `}</style>

      <div
        className="relative w-full h-screen overflow-hidden"
        style={{ background: "#202151", direction: "rtl" }}
      >
        {/* ── IMAGES ── */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={s.slug}
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

        {/* ── OVERLAY ── */}
        <div className="hero-overlay absolute inset-0 z-10 pointer-events-none" />

        {/* ── BOTTOM FADE ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: "220px",
            background: "linear-gradient(to top, #202151 0%, transparent 100%)",
          }}
        />

        {/* ── BOTTOM BAR ── */}
        <div
          className="bottom-bar bar-anim absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-14"
          style={{
            background: "#202151",
            borderTop: "1px solid rgba(208,182,106,0.2)",
          }}
        >
          {/* Progress bars */}
          <div className="flex gap-1.5 md:gap-2 items-center">
            {slides.map((_, i) => (
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
            className="bar-subtitle sub-in text-[#D0B66A] text-[12px] italic font-bold tracking-[0.3em]"
            style={{ fontFamily: "'Playfair Display', serif", animationDelay: "0.5s" }}
          >
            {slide.en} · ٢٠٢٥
          </span>

          {/* Counter + Arrows */}
          <div className="flex items-center gap-2 md:gap-3" dir="ltr">
            <span
              className="text-[#F5F1E8]/60 text-[11px] md:text-[12px] font-bold tracking-[0.2em] hidden sm:block"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <button className="arrow-btn" onClick={prev}>←</button>
            <button className="arrow-btn" onClick={next}>→</button>
          </div>
        </div>

        {/* ── CENTER CONTENT ── */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 sm:px-8 pb-24 md:pb-28">

          <div
            key={`rule-t-${textKey}`}
            className="fade-up w-px bg-[#D0B66A]/60 mb-6 md:mb-8 hidden md:block"
            style={{ height: "48px", animationDelay: "0.1s" }}
          />

          <span
            key={`eyebrow-${textKey}`}
            className="sub-in text-[#D0B66A] font-black italic text-[11px] md:text-[13px] tracking-[0.25em] mb-4 md:mb-5 text-center block"
            style={{
              fontFamily: "'Playfair Display', serif",
              animationDelay: "0.2s",
              textShadow: "0 1px 8px rgba(0,0,0,0.9)",
            }}
          >
            Gulf Media Platform · منصة إعلاميو الخليج
          </span>

          <h1
            key={`ar-${textKey}`}
            className="text-white font-black text-center leading-none tracking-[-0.02em]"
            style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontSize: "clamp(72px, 14vw, 210px)",
              textShadow:
                "0 2px 4px rgba(0,0,0,1), 0 4px 24px rgba(0,0,0,0.95), 0 0 80px rgba(20,21,60,0.9)",
            }}
          >
            <span className="char" style={{ animationDelay: "0.18s" }}>
              {slide.ar}
            </span>
          </h1>

          <span
            key={`en-${textKey}`}
            className="sub-in text-[#D0B66A] italic font-black text-[clamp(14px,2.2vw,22px)] tracking-[0.2em] mt-1 mb-2 block text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              animationDelay: "0.5s",
              textShadow: "0 1px 12px rgba(0,0,0,0.95)",
            }}
          >
            {slide.en}
          </span>

          <span
            key={`sub-${textKey}`}
            className="fade-up text-white font-bold text-[clamp(14px,1.5vw,18px)] text-center mb-8 md:mb-10 block max-w-md"
            style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              animationDelay: "0.65s",
              textShadow: "0 1px 6px rgba(0,0,0,1), 0 2px 20px rgba(0,0,0,0.9)",
              lineHeight: 1.7,
            }}
          >
            {slide.sub}
          </span>

          <div
            key={`ctas-${textKey}`}
            className="fade-up flex items-center gap-3 md:gap-4 flex-wrap justify-center"
            style={{ animationDelay: "0.8s" }}
          >
            <Link
              href={slide.href}
              className="hero-cta-primary text-[#202151] bg-[#D0B66A] text-[13px] md:text-[14px] font-black px-7 md:px-8 py-3 md:py-3.5 rounded-sm no-underline tracking-wide"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              استكشف
            </Link>
            <Link
              href="/#membership"
              className="hero-cta-secondary text-[#F5F1E8] bg-transparent border border-[#F5F1E8]/50 text-[13px] md:text-[14px] font-black px-7 md:px-8 py-3 md:py-3.5 rounded-sm no-underline tracking-wide"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              انضم إلينا
            </Link>
          </div>

          <div
            key={`rule-b-${textKey}`}
            className="fade-up w-px bg-[#D0B66A]/60 mt-8 md:mt-10 hidden md:block"
            style={{ height: "48px", animationDelay: "0.9s" }}
          />
        </div>
      </div>
    </>
  );
}