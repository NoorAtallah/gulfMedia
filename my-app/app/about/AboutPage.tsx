import Link from "next/link";

const TEAM = [
  {
    name: "د. محمد الزهراني",
    role: "المدير التنفيذي",
    roleEn: "CEO & Founder",
    country: "السعودية",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop",
  },
  {
    name: "سارة المنصوري",
    role: "رئيسة التحرير",
    roleEn: "Editor in Chief",
    country: "الإمارات",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fit=crop",
  },
  {
    name: "خالد البلوشي",
    role: "مدير المحتوى",
    roleEn: "Content Director",
    country: "عُمان",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop",
  },
  {
    name: "نورة القحطاني",
    role: "مديرة التواصل",
    roleEn: "Communications Director",
    country: "السعودية",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fit=crop",
  },
];

const VALUES = [
  {
    n: "٠١",
    title: "المهنية",
    titleEn: "Professionalism",
    desc: "نلتزم بأعلى معايير الدقة والنزاهة في كل ما ننتجه وننشره على المنصة.",
  },
  {
    n: "٠٢",
    title: "الاستقلالية",
    titleEn: "Independence",
    desc: "نعمل باستقلالية تامة بعيداً عن أي توجهات سياسية أو تجارية تؤثر على مصداقيتنا.",
  },
  {
    n: "٠٣",
    title: "التضامن",
    titleEn: "Solidarity",
    desc: "نؤمن بقوة المجتمع الإعلامي الموحد الذي يدعم أعضاءه ويعزز نموهم المهني.",
  },
  {
    n: "٠٤",
    title: "الابتكار",
    titleEn: "Innovation",
    desc: "نتبنى التقنيات والأساليب الحديثة لتطوير الإعلام الخليجي ومواكبة التحولات الرقمية.",
  },
];

const STATS = [
  { n: "٣٢٠٠+", l: "إعلامي مسجل" },
  { n: "٦", l: "دول خليجية" },
  { n: "٢٠٢٢", l: "سنة التأسيس" },
  { n: "٨٥٠+", l: "مركز إعلامي" },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .team-card:hover .team-img { transform: scale(1.05); }
        .team-img { transition: transform 0.7s cubic-bezier(.2,0,0,1); }
        .team-card:hover .team-border { opacity: 1; }
        .team-border { opacity: 0; transition: opacity 0.35s ease; }
      `}</style>

      <main className="w-full min-h-screen bg-white" dir="rtl">

        {/* ── HERO ── */}
        <div className="w-full bg-[#202151] px-6 md:px-14 pt-20 pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#D61214]" />
              <span
                className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                About · عن المنصة
              </span>
            </div>

            <h1
              className="text-white font-black text-[clamp(36px,5vw,72px)] leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              منصة إعلاميو
              <br />
              <span className="text-[#D0B66A]">الخليج</span>
            </h1>

            <p
              className="text-white/65 text-[16px] font-bold leading-[2] max-w-2xl mb-10"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              أكبر تجمع إعلامي في دول مجلس التعاون الخليجي — منصة تجمع الصحفيين والمراسلين والإعلاميين المحترفين لبناء مجتمع إعلامي متماسك يُعلي من قيم الصحافة الرصينة والمحتوى الهادف.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <div key={i} className="flex flex-col gap-1 border-r border-[#D0B66A]/15 pr-6 first:border-none first:pr-0">
                  <span
                    className="text-[#D0B66A] font-black text-[clamp(24px,3vw,40px)] leading-none tracking-[-0.02em]"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {s.n}
                  </span>
                  <span
                    className="text-white/40 text-[12px] italic font-bold tracking-[0.1em]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── VISION & MISSION ── */}
        <div id="vision" className="px-6 md:px-14 py-20 border-b border-[#D0B66A]/15">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl">

            {/* Vision */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#D61214]" />
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Vision · الرؤية
                </span>
              </div>
              <h2
                className="text-[#202151] font-black text-[clamp(28px,3vw,42px)] leading-[1.2] tracking-[-0.02em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                رؤيتنا
              </h2>
              <div className="w-12 h-px bg-[#D0B66A] opacity-50" />
              <p
                className="text-[#202151]/70 text-[15px] font-bold leading-[2.2]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                أن نكون المرجع الأول والوجهة الموثوقة لكل إعلامي في منطقة الخليج العربي، ونبني جيلاً من الصحفيين المحترفين القادرين على مواجهة تحديات الإعلام الرقمي بكفاءة ونزاهة.
              </p>
            </div>

            {/* Mission */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#D61214]" />
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Mission · الرسالة
                </span>
              </div>
              <h2
                className="text-[#202151] font-black text-[clamp(28px,3vw,42px)] leading-[1.2] tracking-[-0.02em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                رسالتنا
              </h2>
              <div className="w-12 h-px bg-[#D0B66A] opacity-50" />
              <p
                className="text-[#202151]/70 text-[15px] font-bold leading-[2.2]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                توفير بيئة احترافية متكاملة تُمكّن الإعلاميين الخليجيين من التواصل والتعاون وتطوير قدراتهم، من خلال المحتوى والتدريب والفعاليات والشبكة المهنية الموسعة.
              </p>
            </div>
          </div>
        </div>

        {/* ── GOALS ── */}
        <div className="px-6 md:px-14 py-20 bg-[#202151]/3 border-b border-[#D0B66A]/15">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-6 h-px bg-[#D61214]" />
            <h2
              className="text-[#202151] font-black text-[clamp(24px,3vw,36px)] tracking-[-0.01em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              أهدافنا
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D0B66A]/15">
            {VALUES.map((v) => (
              <div key={v.n} className="bg-white p-8 flex flex-col gap-4">
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold opacity-60 tracking-[0.2em]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {v.n} · {v.titleEn}
                </span>
                <h3
                  className="text-[#202151] font-black text-[22px] tracking-[-0.01em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {v.title}
                </h3>
                <div className="w-8 h-px bg-[#D0B66A] opacity-40" />
                <p
                  className="text-[#202151]/60 text-[13px] font-bold leading-[1.9]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TEAM ── */}
        <div id="team" className="px-6 md:px-14 py-20 border-b border-[#D0B66A]/15">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#D61214]" />
              <h2
                className="text-[#202151] font-black text-[clamp(24px,3vw,36px)] tracking-[-0.01em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                الفريق
              </h2>
            </div>
            <span
              className="text-[#202151]/35 text-[12px] italic font-bold tracking-[0.15em]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Team · فريقنا
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TEAM.map((member) => (
              <div key={member.name} className="team-card relative cursor-pointer">
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <div className="team-border absolute inset-0 z-20 pointer-events-none border border-[#D0B66A]" />
                  <img
                    src={member.img}
                    alt={member.name}
                    className="team-img w-full h-full object-cover brightness-[0.85] grayscale-[20%]"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#202151]/95 via-[#202151]/40 to-transparent" />

                  <div
                    className="absolute top-3 right-3 z-20 text-[#202151] bg-[#D0B66A] text-[9px] font-black px-2 py-1 rounded-[1px] tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {member.country}
                  </div>
                </div>

                <div className="pt-4 pb-2 border-b border-[#D0B66A]/30">
                  <p
                    className="text-[#202151] font-black text-[15px] mb-1 tracking-[-0.01em]"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="text-[#D0B66A] text-[11px] italic font-bold opacity-80"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {member.roleEn}
                  </p>
                  <p
                    className="text-[#202151]/50 text-[11px] font-bold mt-0.5"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CONTACT ── */}
        <div id="contact" className="px-6 md:px-14 py-20 border-b border-[#D0B66A]/15">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#D61214]" />
                <h2
                  className="text-[#202151] font-black text-[clamp(24px,3vw,36px)] tracking-[-0.01em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  اتصل بنا
                </h2>
              </div>

              <p
                className="text-[#202151]/65 text-[15px] font-bold leading-[2]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                نرحب بتواصلكم سواء للشراكات أو الاستفسارات أو الانضمام إلى المنصة. فريقنا جاهز للرد على جميع استفساراتكم.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                {[
                  { label: "البريد الإلكتروني", value: "info@gulfmedia.com", href: "mailto:info@gulfmedia.com" },
                  { label: "الشراكات", value: "partners@gulfmedia.com", href: "mailto:partners@gulfmedia.com" },
                  { label: "الدعم الفني", value: "support@gulfmedia.com", href: "mailto:support@gulfmedia.com" },
                ].map((c, i) => (
                  <div key={i} className="border border-[#D0B66A]/20 p-4 flex items-center justify-between">
                    <span
                      className="text-[#202151]/40 text-[11px] font-black tracking-wide"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {c.label}
                    </span>
                    <a
                      href={c.href}
                      className="text-[#202151] text-[13px] font-black no-underline hover:text-[#D0B66A] transition-colors duration-200"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif", direction: "ltr" }}
                    >
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Join CTA */}
            <div className="bg-[#202151] p-10 flex flex-col gap-6 justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-[#D61214]" />
                  <span
                    className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Join Us · انضم إلينا
                  </span>
                </div>
                <h3
                  className="text-white font-black text-[clamp(22px,3vw,34px)] leading-[1.2] tracking-[-0.02em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  كن جزءاً من أكبر تجمع إعلامي خليجي
                </h3>
                <p
                  className="text-white/55 text-[14px] font-bold leading-[1.9]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  سواء كنت صحفياً أو إعلامياً أو مؤسسة إعلامية — هناك مكان لك في منصة إعلاميو الخليج.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/#membership"
                  className="w-full text-center text-[#202151] bg-[#D0B66A] text-[14px] font-black py-3.5 rounded-sm tracking-wide no-underline hover:opacity-85 transition-opacity duration-200"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  انضم الآن
                </Link>
                <Link
                  href="/#volunteer"
                  className="w-full text-center text-[#D0B66A] bg-transparent border border-[#D0B66A]/30 text-[13px] font-black py-3 rounded-sm tracking-wide no-underline hover:border-[#D0B66A]/60 transition-colors duration-200"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  تطوع معنا
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM RULE ── */}
        <div className="px-6 md:px-14 py-10 flex items-center gap-4">
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
            Gulf Media Platform · عن المنصة
          </span>
        </div>

      </main>
    </>
  );
}