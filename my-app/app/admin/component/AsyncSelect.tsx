"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Option = { value: string; label: string };

type Props = {
  table: string;
  labelColumn: string;
  valueColumn?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  filter?: { column: string; value: string };
};

export default function AsyncSelect({
  table,
  labelColumn,
  valueColumn = "id",
  value,
  onChange,
  placeholder = "اختر...",
  filter,
}: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      let query = supabase
        .from(table)
        .select(`${valueColumn}, ${labelColumn}`)
        .order(labelColumn);

      if (filter) {
        query = query.eq(filter.column, filter.value);
      }

      const { data } = await query;
      setOptions(
  ((data as unknown as Record<string, unknown>[]) ?? []).map((row: Record<string, unknown>) => ({
    value: String(row[valueColumn]),
    label: String(row[labelColumn]),
  }))
);
      setLoading(false);
    }
    load();
  }, [table, labelColumn, valueColumn]);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
      className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 rounded-sm cursor-pointer disabled:opacity-40"
      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
    >
      <option value="">{loading ? "جارٍ التحميل..." : placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}