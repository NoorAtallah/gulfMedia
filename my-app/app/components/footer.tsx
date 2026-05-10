"use client";

const LINKS = {
  "المنصة": ["عن المنصة", "الرؤية والرسالة", "الفريق", "اتصل بنا"],
  "المحتوى": ["المقالات", "البودكاست", "الدورات التدريبية", "الفعاليات"],
  "المجتمع": ["دليل الإعلاميين", "المراكز الإعلامية", "الشركاء", "التطوع"],
  "العضوية": ["عضو عادي", "عضو إعلامي", "عضو داعم", "تسجيل الدخول"],
};

const SOCIALS = [
  { label: "X", href: "#" },
  { label: "In", href: "#" },
  { label: "Yt", href: "#" },
  { label: "Ig", href: "#" },
];

const GOLD  = "#D0B66A";
const NAVY  = "#202151";
const CREAM = "#F5F1E8";
const RED   = "#D61214";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;1,300;1,400&display=swap');

        .footer-link {
          transition: color 0.2s ease, padding-right 0.2s ease;
          cursor: pointer;
          display: block;
        }
        .footer-link:hover {
          color: ${GOLD} !important;
          padding-right: 6px;
        }

        .social-btn {
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .social-btn:hover {
          background: rgba(208,182,106,0.12) !important;
          border-color: rgba(208,182,106,0.5) !important;
          color: ${GOLD} !important;
        }

        .newsletter-input {
          background: transparent;
          border: none;
          border-bottom: 0.5px solid rgba(208,182,106,0.2);
          color: #F5F1E8;
          font-family: 'Noto Kufi Arabic', sans-serif;
          font-size: 13px;
          padding: 10px 0;
          width: 100%;
          outline: none;
          direction: rtl;
          caret-color: #D0B66A;
          transition: border-color 0.25s ease;
        }
        .newsletter-input::placeholder {
          color: rgba(245,241,232,0.2);
        }
        .newsletter-input:focus {
          border-bottom-color: rgba(208,182,106,0.5);
        }

        .newsletter-btn {
          transition: all 0.25s ease;
          flex-shrink: 0;
        }
        .newsletter-btn:hover {
          opacity: 0.85;
        }
      `}</style>

      <footer className="w-full bg-[#0e0c1a]" dir="rtl">

        {/* ── TOP GOLD RULE ── */}
        <div className="flex">
          <div className="flex-1 h-[2px]" style={{ background: NAVY }} />
          <div className="w-32 h-[2px]" style={{ background: GOLD }} />
          <div className="flex-1 h-[2px]" style={{ background: RED }} />
        </div>

        {/* ── MAIN FOOTER BODY ── */}
        <div className="px-6 md:px-14 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Brand column */}
            <div className="md:col-span-4">
              {/* Logo */}
              <div className="mb-6">
                <h3 style={{
                  fontFamily: "'Noto Kufi Arabic', sans-serif",
                  fontWeight: 900,
                  fontSize: "24px",
                  color: CREAM,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: "4px",
                }}>
                  منصة إعلاميو الخليج
                </h3>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "11px",
                  color: GOLD,
                  opacity: 0.6,
                  letterSpacing: "0.2em",
                }}>
                  Gulf Media Platform
                </p>
              </div>

              <div className="w-10 h-px mb-6" style={{ background: GOLD, opacity: 0.4 }} />

              <p style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: 300,
                fontSize: "13px",
                color: CREAM,
                opacity: 0.4,
                lineHeight: 1.9,
                marginBottom: "28px",
                maxWidth: "300px",
              }}>
                أكبر تجمع إعلامي في دول الخليج — يربط الصحفيين والمراسلين ومراكز الإعلام لصناعة المحتوى الأثير
              </p>

              {/* Socials */}
              <div className="flex items-center gap-2" style={{ direction: "ltr" }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="social-btn"
                    style={{
                      width: "36px",
                      height: "36px",
                      border: `0.5px solid rgba(208,182,106,0.15)`,
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "11px",
                      fontStyle: "italic",
                      color: `rgba(245,241,232,0.4)`,
                      textDecoration: "none",
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            <div className="md:col-span-5 grid grid-cols-2 gap-8">
              {Object.entries(LINKS).map(([category, links]) => (
                <div key={category}>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    color: GOLD,
                    opacity: 0.6,
                    marginBottom: "16px",
                  }}>
                    {category}
                  </p>
                  <div className="flex flex-col gap-3">
                    {links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="footer-link"
                        style={{
                          fontFamily: "'Noto Kufi Arabic', sans-serif",
                          fontSize: "13px",
                          color: `rgba(245,241,232,0.4)`,
                          textDecoration: "none",
                          fontWeight: 400,
                        }}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter column */}
            <div className="md:col-span-3">
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: GOLD,
                opacity: 0.6,
                marginBottom: "16px",
              }}>
                النشرة الإخبارية
              </p>

              <p style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontWeight: 300,
                fontSize: "13px",
                color: CREAM,
                opacity: 0.4,
                lineHeight: 1.7,
                marginBottom: "20px",
              }}>
                اشترك لتصلك أحدث أخبار الإعلام الخليجي أسبوعياً
              </p>

              <div className="flex flex-col gap-3">
                <input
                  className="newsletter-input"
                  placeholder="بريدك الإلكتروني"
                  style={{ direction: "ltr", textAlign: "right" }}
                />
                <button
                  className="newsletter-btn"
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: NAVY,
                    background: GOLD,
                    border: "none",
                    padding: "10px",
                    borderRadius: "2px",
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    width: "100%",
                  }}
                >
                  اشترك
                </button>
              </div>

              {/* Contact */}
              <div
                className="mt-8 pt-6"
                style={{ borderTop: `0.5px solid rgba(208,182,106,0.1)` }}
              >
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: GOLD,
                  opacity: 0.5,
                  marginBottom: "10px",
                }}>
                  Contact
                </p>
                <a
                  href="mailto:info@gulfmedia.com"
                  style={{
                    fontFamily: "'Noto Kufi Arabic', sans-serif",
                    fontSize: "12px",
                    color: CREAM,
                    opacity: 0.35,
                    textDecoration: "none",
                    display: "block",
                    marginBottom: "6px",
                    direction: "ltr",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.35")}
                >
                  info@gulfmedia.com
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          className="px-6 md:px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: `0.5px solid rgba(208,182,106,0.08)` }}
        >
          <div className="flex items-center gap-6">
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "11px",
              color: CREAM,
              opacity: 0.2,
              letterSpacing: "0.1em",
            }}>
              © 2025 Gulf Media Platform
            </span>
            <span style={{ color: GOLD, fontSize: "7px", opacity: 0.3 }}>✦</span>
            <a
              href="#"
              style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontSize: "11px",
                color: CREAM,
                opacity: 0.2,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.2")}
            >
              سياسة الخصوصية
            </a>
            <a
              href="#"
              style={{
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                fontSize: "11px",
                color: CREAM,
                opacity: 0.2,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.2")}
            >
              الشروط والأحكام
            </a>
          </div>

          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "11px",
            color: GOLD,
            opacity: 0.25,
            letterSpacing: "0.15em",
          }}>
            The Voice of Gulf Journalism
          </span>
        </div>

      </footer>
    </>
  );
}