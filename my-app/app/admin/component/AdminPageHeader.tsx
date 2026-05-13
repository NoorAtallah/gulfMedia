import Link from "next/link";

type Props = {
  title: string;
  titleEn: string;
  count?: number;
  newHref?: string;
  newLabel?: string;
};

export default function AdminPageHeader({ title, titleEn, count, newHref, newLabel }: Props) {
  return (
    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-5 h-px bg-[#D61214]" />
          <span
            className="text-[#D0B66A] text-[10px] italic font-bold tracking-[0.3em] opacity-70"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {titleEn}
          </span>
          {count !== undefined && (
            <span
              className="text-[#202151]/30 text-[11px] font-black"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              ({count})
            </span>
          )}
        </div>
        <h1
          className="text-[#202151] font-black text-[28px] tracking-[-0.02em]"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          {title}
        </h1>
      </div>

      {newHref && (
        <Link
          href={newHref}
          className="text-[#202151] bg-[#D0B66A] text-[13px] font-black px-6 py-2.5 rounded-sm no-underline hover:opacity-85 transition-opacity duration-200"
          style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
        >
          + {newLabel ?? "جديد"}
        </Link>
      )}
    </div>
  );
}