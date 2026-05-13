"use client";

type Column<T> = {
  label: string;
  key: keyof T | string;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onStatusChange?: (row: T, status: string) => void;
  statusOptions?: string[];
  statusKey?: keyof T;
};

export default function AdminTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  onStatusChange,
  statusOptions,
  statusKey,
}: Props<T>) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
      `}</style>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#D0B66A]/20">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-right text-[#202151]/40 text-[11px] font-black tracking-widest px-4 py-3 whitespace-nowrap"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete || onStatusChange) && (
                <th className="text-right text-[#202151]/40 text-[11px] font-black tracking-widest px-4 py-3">
                  إجراءات
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-16 text-[#202151]/25 text-[14px] font-black"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  لا توجد بيانات
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-b border-[#D0B66A]/10 hover:bg-[#D0B66A]/3 transition-colors duration-150 ${
                    i % 2 === 0 ? "bg-white" : "bg-[#202151]/2"
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-4 py-3 text-[#202151] text-[13px] font-bold"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[String(col.key)] ?? "—")}
                    </td>
                  ))}

                  {(onEdit || onDelete || onStatusChange) && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {onStatusChange && statusOptions && statusKey && (
                          <select
                            value={String((row as Record<string, unknown>)[String(statusKey)] ?? "")}
                            onChange={(e) => onStatusChange(row, e.target.value)}
                            className="text-[11px] font-black text-[#202151] bg-transparent border border-[#202151]/20 px-2 py-1 rounded-sm outline-none focus:border-[#D0B66A] cursor-pointer"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="text-[#202151]/40 text-[11px] font-black hover:text-[#D0B66A] transition-colors duration-200 bg-transparent border-none cursor-pointer px-2 py-1"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            تعديل
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="text-[#D61214]/40 text-[11px] font-black hover:text-[#D61214] transition-colors duration-200 bg-transparent border-none cursor-pointer px-2 py-1"
                            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                          >
                            حذف
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}