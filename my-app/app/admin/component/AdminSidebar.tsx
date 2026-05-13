"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";

const NAV = [
  { label: "الرئيسية", href: "/admin", icon: "◈" },
  { label: "المقالات", href: "/admin/articles", icon: "✦" },
  { label: "الإعلاميون", href: "/admin/journalists", icon: "◉" },
  { label: "البودكاست", href: "/admin/podcasts", icon: "◷" },
  { label: "الدورات", href: "/admin/courses", icon: "◎" },
  { label: "الفعاليات", href: "/admin/events", icon: "◆" },
  { label: "المكتبة", href: "/admin/library", icon: "◐" },
  { label: "المراكز الإعلامية", href: "/admin/media-centers", icon: "◑" },
  { label: "الشركاء", href: "/admin/partners", icon: "◒" },
  { label: "العضويات", href: "/admin/memberships", icon: "◓" },
  { label: "الطلبات", href: "/admin/submissions", icon: "◔" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
      `}</style>

      <aside className="w-64 min-h-screen bg-[#202151] flex flex-col flex-shrink-0">

        <div className="px-6 py-8 border-b border-[#D0B66A]/10">
          <p
            className="text-white font-black text-[16px] tracking-[-0.01em] mb-1"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            إعلاميو الخليج
          </p>
          <p
            className="text-[#D0B66A] text-[9px] italic font-bold opacity-60 tracking-[0.2em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Admin Dashboard
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV.map(({ label, href, icon }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-sm no-underline transition-all duration-200 ${
                  active
                    ? "bg-[#D0B66A]/15 text-[#D0B66A]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                <span className="text-[10px] flex-shrink-0">{icon}</span>
                <span
                  className="text-[13px] font-black tracking-wide"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-6 border-t border-[#D0B66A]/10 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-[#D61214]/60 hover:text-[#D61214] hover:bg-[#D61214]/5 transition-all duration-200 bg-transparent border-none cursor-pointer"
          >
            <span className="text-[10px]">✕</span>
            <span
              className="text-[13px] font-black tracking-wide"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              تسجيل الخروج
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}