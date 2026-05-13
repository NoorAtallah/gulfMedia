"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();

  async function handleLogin() {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("بيانات الدخول غير صحيحة");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
      `}</style>

      <main className="min-h-screen bg-[#202151] flex items-center justify-center p-6" dir="rtl">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-white font-black text-[28px] tracking-[-0.02em] mb-2"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              منصة إعلاميو الخليج
            </h1>
            <p
              className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-70"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Admin Dashboard
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-12 bg-[#D0B66A]/20" />
              <span className="text-[#D0B66A]/30 text-[8px]">✦</span>
              <div className="h-px w-12 bg-[#D0B66A]/20" />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/5 border border-[#D0B66A]/15 p-8 flex flex-col gap-5 rounded-sm">
            <div className="flex flex-col gap-2">
              <label
                className="text-white/60 text-[11px] font-black tracking-wide"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="admin@gulfmedia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-white/5 border border-white/10 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-white text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-white/20 placeholder:font-normal rounded-sm"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                dir="ltr"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-white/60 text-[11px] font-black tracking-wide"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                كلمة المرور
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-white/5 border border-white/10 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-white text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-white/20 placeholder:font-normal rounded-sm"
                dir="ltr"
              />
            </div>

            {error && (
              <p
                className="text-[#D61214] text-[12px] font-black"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              className="w-full text-[#202151] bg-[#D0B66A] text-[14px] font-black py-3.5 rounded-sm tracking-wide transition-opacity duration-200 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {loading ? "جارٍ الدخول..." : "دخول"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}