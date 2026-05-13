import { getPodcastById, getAllPodcasts } from "@/lib/queries/podcasts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PodcastPlayerClient } from "../../components/PodcastPlayer";

export default async function PodcastEpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [podcast, all] = await Promise.all([
    getPodcastById(id),
    getAllPodcasts(6),
  ]);

  if (!podcast) notFound();

  const related = all.filter((p) => p.id !== id).slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
        .related-card:hover .rel-img { transform: scale(1.05); }
        .rel-img { transition: transform 0.6s cubic-bezier(.2,0,0,1); }
        .back-link:hover { color: #D0B66A; }
        .back-link { transition: color 0.2s; }
      `}</style>

      <main className="w-full min-h-screen bg-white" dir="rtl">

        {/* ── HERO ── */}
        <div className="w-full bg-[#202151] px-6 md:px-14 pt-20 pb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start max-w-5xl">

            {/* Cover */}
            <div className="flex-shrink-0 w-40 h-40 md:w-52 md:h-52 overflow-hidden border border-[#D0B66A]/30">
              <img
                src={podcast.cover_url ?? ""}
                alt={podcast.title_ar}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#D61214]" />
                <span
                  className="text-[#D0B66A] text-[11px] italic font-bold tracking-[0.3em] opacity-80"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Episode {podcast.episode_number ?? "—"} · الموسم {podcast.season_number ?? 1}
                </span>
              </div>

              <h1
                className="text-white font-black text-[clamp(24px,4vw,52px)] leading-[1.15] tracking-[-0.02em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                {podcast.title_ar}
              </h1>

              {podcast.description_ar && (
                <p
                  className="text-white/65 text-[14px] font-bold leading-[1.9] max-w-2xl"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {podcast.description_ar}
                </p>
              )}

              {/* Host */}
              {podcast.host && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-[#D0B66A]/30 flex-shrink-0">
                    <img
                      src={podcast.host.avatar_url ?? ""}
                      alt={podcast.host.full_name_ar}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="text-white text-[13px] font-black leading-none mb-1"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {podcast.host.full_name_ar}
                    </p>
                    <p
                      className="text-[#D0B66A] text-[11px] italic font-bold opacity-60"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {podcast.host.specialty}
                    </p>
                  </div>
                </div>
              )}

              {/* Pills */}
              <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-[#D0B66A]/15">
                {podcast.published_at && (
                  <span
                    className="text-white/50 bg-white/5 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {new Date(podcast.published_at).toLocaleDateString("ar-SA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
                {podcast.duration_seconds && (
                  <span
                    className="text-[#D0B66A] bg-[#D0B66A]/10 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {Math.floor(podcast.duration_seconds / 60)} دقيقة
                  </span>
                )}
                {podcast.audio_url && (
                  <span
                    className="text-white/50 bg-white/5 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    صوت متاح
                  </span>
                )}
                {podcast.video_url && (
                  <span
                    className="text-white/50 bg-white/5 text-[11px] font-black px-3 py-1.5 rounded-sm tracking-wide"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    فيديو متاح
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── PLAYER ── */}
        <div className="px-6 md:px-14 py-16 border-b border-[#D0B66A]/15">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-[#D61214]" />
              <h2
                className="text-[#202151] font-black text-[20px] tracking-[-0.01em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                استمع أو شاهد الحلقة
              </h2>
            </div>

            <PodcastPlayerClient
              audioUrl={podcast.audio_url}
              videoUrl={podcast.video_url}
            />
          </div>
        </div>

        {/* ── RELATED ── */}
        {related.length > 0 && (
          <div className="px-6 md:px-14 py-16">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-[#D61214]" />
              <h2
                className="text-[#202151] font-black text-[clamp(18px,2.5vw,28px)] tracking-[-0.01em]"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                حلقات أخرى
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D0B66A]/15">
              {related.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/podcasts/${ep.id}`}
                  className="related-card bg-white flex flex-col no-underline group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={ep.cover_url ?? ""}
                      alt={ep.title_ar}
                      className="rel-img w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202151]/90 to-transparent" />
                    <span
                      className="absolute bottom-3 right-3 text-[#D0B66A] bg-[#202151]/85 text-[8px] italic font-bold tracking-[0.25em] px-2 py-0.5"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Episode {ep.episode_number ?? "—"}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1 border-b border-[#D0B66A]/15 group-hover:border-[#D0B66A]/50 transition-colors duration-300">
                    <h3
                      className="text-[#202151] text-[14px] font-black leading-[1.6]"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {ep.title_ar}
                    </h3>
                    {ep.description_ar && (
                      <p
                        className="text-[#202151]/50 text-[12px] font-bold leading-[1.8] line-clamp-2"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {ep.description_ar}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#D0B66A]/10">
                      {ep.host && (
                        <span
                          className="text-[#D0B66A] text-[11px] italic font-bold"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {ep.host.full_name_ar}
                        </span>
                      )}
                      <span
                        className="text-[#202151]/40 text-[10px] font-black"
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {ep.duration_seconds
                          ? `${Math.floor(ep.duration_seconds / 60)} د`
                          : "—"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── BACK ── */}
        <div className="px-6 md:px-14 pb-16 flex items-center gap-4 border-t border-[#D0B66A]/20 pt-8">
          <Link
            href="/podcasts"
            className="back-link text-[#202151]/40 text-[12px] font-black tracking-wide no-underline"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            ← العودة إلى البودكاست
          </Link>
          <div className="flex-1 h-px bg-[#D0B66A]/15" />
          <span
            className="text-[#D0B66A]/50 text-[11px] italic font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Gulf Media Platform · البودكاست
          </span>
        </div>

      </main>
    </>
  );
}