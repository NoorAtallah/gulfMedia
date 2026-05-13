"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "الصحفيون", href: "/journalists" },
  { label: "المقالات", href: "/articles" },
  { label: "البودكاست", href: "/podcasts" },
  { label: "الدورات", href: "/courses" },
  { label: "الفعاليات", href: "/events" },
  {label: "المكتبة", href: "/library"},
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; right: 0;
          width: 0; height: 0.5px;
          background: #F5F1E8;
          transition: width .35s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { opacity: 1 !important; }

        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .live-dot { animation: pulse 1.2s ease-in-out infinite; }
      `}</style>

      <header className="w-full relative z-50 bg-[#202151]" dir="rtl">

        {/* ── MAIN BAR ── */}
        <div className="flex items-center justify-between px-6 md:px-14 h-16 md:h-24 border-b border-[#D0B66A]/10">

          {/* ── LOGO ── */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <img
              src="/1.png"
              alt="منصة إعلاميو الخليج"
              className="h-9 w-auto object-contain"
            />
            <div className="flex flex-col gap-0">
              <span
                className="text-[#F5F1E8] text-sm font-bold tracking-wide"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                منصة إعلاميو الخليج
              </span>
              <span
                className="text-[#D0B66A] text-[9px] italic tracking-[0.2em] opacity-80"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Gulf Media Platform
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center gap-8" dir="rtl">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="nav-link relative text-[#F5F1E8] text-xs tracking-widest opacity-45 no-underline transition-opacity duration-300 hover:opacity-100"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── RIGHT SIDE ── */}
          <div className="flex items-center gap-4 md:gap-6" dir="ltr">

            {/* Live — desktop only */}
            <div className="hidden md:flex items-center gap-1.5">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-[#D61214]" />
              <span
                className="text-[#D61214] text-[9px] tracking-[0.3em]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Live
              </span>
            </div>

            {/* Desktop CTA */}
            {/* <Link
              href="/join"
              className="hidden md:block text-[#202151] bg-[#D0B66A] text-xs font-bold tracking-wide px-6 py-2.5 rounded-sm cursor-pointer transition-opacity duration-200 hover:opacity-85 whitespace-nowrap no-underline"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              انضم إلى المنصة
            </Link> */}

            {/* Hamburger — mobile only */}
            <button
              className="flex md:hidden flex-col gap-1.5 items-center justify-center p-1 bg-transparent border-none cursor-pointer"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="القائمة"
            >
              <span
                className={`block w-[22px] h-px bg-[#F5F1E8] transition-all duration-300 origin-center ${
                  menuOpen ? "translate-y-[6.5px] rotate-45 opacity-90" : "opacity-60"
                }`}
              />
              <span
                className={`block w-[22px] h-px bg-[#F5F1E8] transition-all duration-300 origin-center ${
                  menuOpen ? "opacity-0 scale-x-0" : "opacity-60"
                }`}
              />
              <span
                className={`block w-[22px] h-px bg-[#F5F1E8] transition-all duration-300 origin-center ${
                  menuOpen ? "-translate-y-[6.5px] -rotate-45 opacity-90" : "opacity-60"
                }`}
              />
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#202151] ${
            menuOpen ? "max-h-96 opacity-100 border-b border-[#D0B66A]/10" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-6 pb-6 pt-2">
            {NAV_LINKS.map(({ label, href }, i) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-right text-[#F5F1E8] text-[15px] tracking-widest opacity-50 no-underline ${
                  i < NAV_LINKS.length - 1 ? "border-b border-[#D0B66A]/10" : ""
                }`}
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {label}
              </Link>
            ))}

            {/* <Link
              href="/join"
              onClick={() => setMenuOpen(false)}
              className="w-full mt-4 py-3 rounded-sm text-center text-[#202151] bg-[#D0B66A] font-bold text-[13px] tracking-wide no-underline"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              انضم إلى المنصة
            </Link> */}
          </div>
        </div>

      </header>
    </>
  );
}