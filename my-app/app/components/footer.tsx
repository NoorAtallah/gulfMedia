"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = {
  المنصة: [
    { label: "عن المنصة", href: "/about" },
    { label: "الرؤية والرسالة", href: "/about#vision" },
    { label: "الفريق", href: "/about#team" },
    { label: "اتصل بنا", href: "/about#contact" },
  ],
  المحتوى: [
    { label: "المقالات", href: "/articles" },
    { label: "البودكاست", href: "/podcasts" },
    { label: "الدورات التدريبية", href: "/courses" },
    { label: "الفعاليات", href: "/events" },
  ],
  المجتمع: [
    { label: "دليل الإعلاميين", href: "/journalists" },
    { label: "المراكز الإعلامية", href: "/#media-centers" },
    { label: "الشركاء", href: "/#partners" },
    { label: "التطوع", href: "/#volunteer" },
  ],
  العضوية: [
    { label: "عضو عادي", href: "/#membership" },
    { label: "عضو إعلامي", href: "/#membership" },
    { label: "عضو داعم", href: "/#membership" },
    { label: "المكتبة", href: "/library" },
  ],
};

const SOCIALS = [
  { label: "X", href: "#" },
  { label: "In", href: "#" },
  { label: "Yt", href: "#" },
  { label: "Ig", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .footer-link:hover { color: #D0B66A !important; padding-right: 6px; }
        .footer-link { transition: color 0.2s ease, padding-right 0.2s ease; }
        .social-btn:hover { background: rgba(208,182,106,0.12) !important; border-color: rgba(208,182,106,0.5) !important; color: #D0B66A !important; }
        .social-btn { transition: all 0.25s ease; }
        .sub-btn:hover { opacity: 0.85; }
        .sub-btn { transition: opacity 0.2s; }
        .bottom-link:hover { opacity: 0.5 !important; }
        .bottom-link { transition: opacity 0.2s; }
        .email-link:hover { opacity: 0.7 !important; }
        .email-link { transition: opacity 0.2s; }
      `}</style>

      <footer className="w-full bg-[#202151]" dir="rtl">

        {/* ── TOP RULE ── */}
        <div className="flex">
          <div className="flex-1 h-[2px] bg-[#202151]" />
          <div className="w-32 h-[2px] bg-[#D0B66A]" />
          <div className="flex-1 h-[2px] bg-[#D61214]" />
        </div>

        {/* ── MAIN BODY ── */}
        <div className="px-6 md:px-14 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* ── BRAND ── */}
            <div className="md:col-span-4">
              <Link href="/" className="no-underline block mb-6">
                <h3
                  className="text-[#F5F1E8] font-black text-[24px] leading-[1.1] tracking-[-0.02em] mb-1"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  منصة إعلاميو الخليج
                </h3>
                <p
                  className="text-[#D0B66A] text-[11px] italic font-bold opacity-60 tracking-[0.2em]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Gulf Media Platform
                </p>
              </Link>

              <div className="w-10 h-px bg-[#D0B66A] opacity-40 mb-6" />

              <p
                className="text-[#F5F1E8]/40 text-[13px] font-bold leading-[1.9] mb-7 max-w-[300px]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                أكبر تجمع إعلامي في دول الخليج — يربط الصحفيين والمراسلين ومراكز الإعلام لصناعة المحتوى الأثير
              </p>

              {/* Socials */}
              <div className="flex items-center gap-2" dir="ltr">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn w-9 h-9 border border-[#D0B66A]/15 rounded-sm flex items-center justify-center text-[#F5F1E8]/40 text-[11px] italic font-bold no-underline"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* ── LINKS ── */}
            <div className="md:col-span-5 grid grid-cols-2 gap-8">
              {Object.entries(LINKS).map(([category, links]) => (
                <div key={category}>
                  <p
                    className="text-[#D0B66A] text-[10px] italic font-bold opacity-60 tracking-[0.25em] mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {category}
                  </p>
                  <div className="flex flex-col gap-3">
                    {links.map(({ label, href }) => (
                      <Link
                        key={label}
                        href={href}
                        className="footer-link text-[#F5F1E8]/40 text-[13px] font-bold no-underline block"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── NEWSLETTER + CONTACT ── */}
            <div className="md:col-span-3">
              

              {/* Contact */}
              <div className="mt-8 pt-6 border-t border-[#D0B66A]/10">
                <p
                  className="text-[#D0B66A] text-[10px] italic font-bold opacity-50 tracking-[0.2em] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Contact
                </p>
                <a
                  href="mailto:info@gulfmedia.com"
                  className="email-link text-[#F5F1E8]/35 text-[12px] font-bold no-underline block"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", direction: "ltr" }}
                >
                  info@gulfmedia.com
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="px-6 md:px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#D0B66A]/8">
          <div className="flex items-center gap-5 flex-wrap">
            <span
              className="text-[#F5F1E8]/20 text-[11px] italic font-bold tracking-[0.1em]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              © 2025 Gulf Media Platform
            </span>
            <span className="text-[#D0B66A]/30 text-[7px]">✦</span>
            <Link
              href="/privacy"
              className="bottom-link text-[#F5F1E8]/20 text-[11px] font-bold no-underline"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              سياسة الخصوصية
            </Link>
            <Link
              href="/terms"
              className="bottom-link text-[#F5F1E8]/20 text-[11px] font-bold no-underline"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              الشروط والأحكام
            </Link>
          </div>

          <span
            className="text-[#D0B66A]/25 text-[11px] italic font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Voice of Gulf Journalism
          </span>
        </div>

      </footer>
    </>
  );
}