import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function AdminDashboard() {
  const [
    { count: articles },
    { count: journalists },
    { count: podcasts },
    { count: courses },
    { count: events },
    { count: membershipSubs },
    { count: courseEnrollments },
    { count: eventRegs },
    { count: volunteers },
  ] = await Promise.all([
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("journalists").select("*", { count: "exact", head: true }),
    supabase.from("podcasts").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("membership_submissions").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("course_enrollments").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("event_registrations").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("volunteer_submissions").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  const CONTENT_STATS = [
    { label: "المقالات", value: articles ?? 0, href: "/admin/articles" },
    { label: "الإعلاميون", value: journalists ?? 0, href: "/admin/journalists" },
    { label: "البودكاست", value: podcasts ?? 0, href: "/admin/podcasts" },
    { label: "الدورات", value: courses ?? 0, href: "/admin/courses" },
    { label: "الفعاليات", value: events ?? 0, href: "/admin/events" },
  ];

  const PENDING_STATS = [
    { label: "طلبات العضوية", value: membershipSubs ?? 0, href: "/admin/submissions?tab=membership" },
    { label: "تسجيلات الدورات", value: courseEnrollments ?? 0, href: "/admin/submissions?tab=courses" },
    { label: "تسجيلات الفعاليات", value: eventRegs ?? 0, href: "/admin/submissions?tab=events" },
    { label: "طلبات التطوع", value: volunteers ?? 0, href: "/admin/submissions?tab=volunteers" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
      `}</style>

      <div className="px-8 py-10" dir="rtl">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-[#D61214]" />
            <span
              className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Dashboard · لوحة التحكم
            </span>
          </div>
          <h1
            className="text-[#202151] font-black text-[32px] tracking-[-0.02em]"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            نظرة عامة
          </h1>
        </div>

        <div className="mb-10">
          <h2
            className="text-[#202151]/50 text-[12px] font-black tracking-widest mb-4 uppercase"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            المحتوى
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CONTENT_STATS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="bg-white border border-[#D0B66A]/15 p-6 flex flex-col gap-2 no-underline hover:border-[#D0B66A]/40 transition-colors duration-200 rounded-sm"
              >
                <span
                  className="text-[#D0B66A] font-black text-[36px] leading-none tracking-[-0.02em]"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[#202151]/50 text-[12px] font-black"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {s.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2
            className="text-[#202151]/50 text-[12px] font-black tracking-widests mb-4 uppercase"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            طلبات معلقة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PENDING_STATS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="bg-white border border-[#D0B66A]/15 p-6 flex flex-col gap-2 no-underline hover:border-[#D0B66A]/40 transition-colors duration-200 rounded-sm"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[#202151] font-black text-[36px] leading-none tracking-[-0.02em]"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {s.value}
                  </span>
                  {(s.value ?? 0) > 0 && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D61214] flex-shrink-0" />
                  )}
                </div>
                <span
                  className="text-[#202151]/50 text-[12px] font-black"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {s.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2
            className="text-[#202151]/50 text-[12px] font-black tracking-widest mb-4 uppercase"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            إجراءات سريعة
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "مقال جديد", href: "/admin/articles/new" },
              { label: "إعلامي جديد", href: "/admin/journalists/new" },
              { label: "حلقة بودكاست جديدة", href: "/admin/podcasts/new" },
              { label: "دورة جديدة", href: "/admin/courses/new" },
              { label: "فعالية جديدة", href: "/admin/events/new" },
            ].map((a) => (
              <a
                key={a.label}
                href={a.href}
                className="text-[#202151] bg-transparent border border-[#202151]/20 text-[12px] font-black px-5 py-2.5 rounded-sm no-underline hover:bg-[#D0B66A] hover:text-[#202151] hover:border-[#D0B66A] transition-all duration-200"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                + {a.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}