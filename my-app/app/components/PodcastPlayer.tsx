"use client";

import { useState } from "react";

type Props = {
  audioUrl: string | null;
  videoUrl: string | null;
};

export function PodcastPlayerClient({ audioUrl, videoUrl }: Props) {
  const [mode, setMode] = useState<"audio" | "video">(audioUrl ? "audio" : "video");

  const hasAudio = !!audioUrl;
  const hasVideo = !!videoUrl;
  const hasBoth = hasAudio && hasVideo;
  const hasNeither = !hasAudio && !hasVideo;

  if (hasNeither) {
    return (
      <div className="w-full border border-[#D0B66A]/15 rounded-sm p-16 flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#D0B66A]/10 border border-[#D0B66A]/20 flex items-center justify-center">
          <span className="text-[#D0B66A] text-[22px]">🎙</span>
        </div>
        <p
          className="text-[#202151] text-[16px] font-black opacity-30 text-center"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          الحلقة قيد الإعداد
        </p>
        <p
          className="text-[#202151] text-[12px] font-bold opacity-20 text-center"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          سيتم إضافة الحلقة قريباً
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* Toggle — only show if both exist */}
      {hasBoth && (
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setMode("audio")}
            className={`text-[12px] font-black px-6 py-2.5 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
              mode === "audio"
                ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
            }`}
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            صوت
          </button>
          <button
            onClick={() => setMode("video")}
            className={`text-[12px] font-black px-6 py-2.5 rounded-sm border transition-all duration-200 cursor-pointer tracking-wide ${
              mode === "video"
                ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
            }`}
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            فيديو
          </button>
        </div>
      )}

      {/* Audio Player */}
      {(mode === "audio" || (!hasBoth && hasAudio)) && audioUrl && (
        <div className="w-full border border-[#D0B66A]/20 rounded-sm p-8 bg-[#202151]/2">
          <p
            className="text-[#202151] text-[12px] font-black opacity-40 mb-5 tracking-wide"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            استمع إلى الحلقة
          </p>
          <audio
            controls
            className="w-full"
            style={{ accentColor: "#D0B66A", height: "48px" }}
          >
            <source src={audioUrl} type="audio/mpeg" />
            <source src={audioUrl} type="audio/ogg" />
            متصفحك لا يدعم تشغيل الصوت
          </audio>
        </div>
      )}

      {/* Video Player */}
      {(mode === "video" || (!hasBoth && hasVideo)) && videoUrl && (
        <div className="w-full border border-[#D0B66A]/20 rounded-sm overflow-hidden">
          <p
            className="text-[#202151] text-[12px] font-black opacity-40 px-6 pt-6 pb-4 tracking-wide"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            شاهد الحلقة
          </p>
          {videoUrl.includes("youtube.com/embed") || videoUrl.includes("youtu.be") ? (
            <iframe
              src={videoUrl}
              className="w-full"
              style={{ height: "420px" }}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <video
              controls
              className="w-full"
              style={{ maxHeight: "420px", background: "#202151" }}
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              متصفحك لا يدعم تشغيل الفيديو
            </video>
          )}
        </div>
      )}
    </div>
  );
}