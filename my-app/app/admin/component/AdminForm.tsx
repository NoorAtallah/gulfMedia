"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { adminInsert, adminUpdate, adminDelete } from "../../../lib/admin";
// Add import at top of AdminForm.tsx:
import AsyncSelect from "./AsyncSelect";
// Add to FieldConfig type:
export type FieldConfig = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "url"
    | "select"
    | "boolean"
    | "image"
    | "richtext"
    | "async-select";   // ← add this
  options?: { value: string; label: string }[];
  asyncConfig?: {        // ← add this
    table: string;
    labelColumn: string;
    valueColumn?: string;
    filter?: { column: string; value: string };
  };
  placeholder?: string;
  required?: boolean;
  span?: "full" | "half";
};

type Props = {
  table: string;
  fields: FieldConfig[];
  initialData?: Record<string, unknown>;
  backHref: string;
  title: string;
  titleEn: string;
};

export default function AdminForm({
  table,
  fields,
  initialData,
  backHref,
  title,
  titleEn,
}: Props) {
  const router = useRouter();
  const isEdit = !!initialData?.id;

  const [form, setForm] = useState<Record<string, unknown>>(
    initialData ?? fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {})
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

async function handleSubmit() {
  setStatus("loading");
  setErrorMsg("");

  const payload = Object.fromEntries(
    Object.entries(form).filter(([, v]) => v !== "" && v !== null && v !== undefined)
  );

  const { error } = isEdit
    ? await adminUpdate(table, String(initialData!.id), payload)
    : await adminInsert(table, payload);

  if (error) {
    setErrorMsg(error);
    setStatus("error");
  } else {
    setStatus("success");
    setTimeout(() => router.push(backHref), 800);
  }
}


 async function handleDelete() {
  if (!confirm("هل أنت متأكد من الحذف؟ هذا الإجراء لا يمكن التراجع عنه.")) return;
  await adminDelete(table, String(initialData!.id));
  router.push(backHref);
}

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
      `}</style>

      <div className="px-8 py-10 max-w-4xl" dir="rtl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-px bg-[#D61214]" />
              <span
                className="text-[#D0B66A] text-[10px] italic font-bold tracking-[0.3em] opacity-70"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {isEdit ? `Edit · تعديل` : `New · جديد`} — {titleEn}
              </span>
            </div>
            <h1
              className="text-[#202151] font-black text-[28px] tracking-[-0.02em]"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {isEdit ? `تعديل ${title}` : `إضافة ${title}`}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {isEdit && (
              <button
                onClick={handleDelete}
                className="text-[#D61214]/60 text-[12px] font-black hover:text-[#D61214] transition-colors duration-200 bg-transparent border border-[#D61214]/20 hover:border-[#D61214]/50 px-4 py-2 rounded-sm cursor-pointer"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                حذف
              </button>
            )}
            <button
              onClick={() => router.push(backHref)}
              className="text-[#202151]/40 text-[12px] font-black hover:text-[#202151] transition-colors duration-200 bg-transparent border border-[#202151]/15 px-4 py-2 rounded-sm cursor-pointer"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              ← رجوع
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-[#D0B66A]/15 rounded-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div
                key={field.key}
                className={field.span === "full" || field.type === "textarea" || field.type === "richtext" ? "md:col-span-2" : ""}
              >
                <label
                  className="block text-[#202151] text-[11px] font-black tracking-wide mb-2"
                  style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                >
                  {field.label}
                  {field.required && <span className="text-[#D61214] mr-1">*</span>}
                </label>

                {/* Text / Email / URL / Number */}
                {(field.type === "text" || field.type === "email" || field.type === "url" || field.type === "number") && (
                  <input
                    type={field.type}
                    placeholder={field.placeholder ?? ""}
                    value={String(form[field.key] ?? "")}
                    onChange={(e) => set(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)}
                    className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal rounded-sm"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    dir={field.type === "email" || field.type === "url" ? "ltr" : "rtl"}
                  />
                )}

                {/* Textarea */}
                {(field.type === "textarea" || field.type === "richtext") && (
                  <textarea
                    placeholder={field.placeholder ?? ""}
                    value={String(form[field.key] ?? "")}
                    onChange={(e) => set(field.key, e.target.value)}
                    rows={field.type === "richtext" ? 10 : 4}
                    className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal resize-y rounded-sm"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  />
                )}

                {/* Select */}
                {field.type === "select" && (
                  <select
                    value={String(form[field.key] ?? "")}
                    onChange={(e) => set(field.key, e.target.value)}
                    className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 rounded-sm cursor-pointer"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    <option value="">اختر...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {/* Boolean */}
                {field.type === "boolean" && (
                  <div className="flex items-center gap-4">
                    {[
                      { value: true, label: "نعم" },
                      { value: false, label: "لا" },
                    ].map((opt) => (
                      <button
                        key={String(opt.value)}
                        onClick={() => set(field.key, opt.value)}
                        className={`text-[12px] font-black px-6 py-2.5 rounded-sm border transition-all duration-200 cursor-pointer ${
                          form[field.key] === opt.value
                            ? "bg-[#202151] text-[#D0B66A] border-[#202151]"
                            : "bg-transparent text-[#202151] border-[#202151]/20 hover:border-[#202151]/50"
                        }`}
                        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Image URL */}
                {field.type === "image" && (
                  <div className="flex flex-col gap-3">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={String(form[field.key] ?? "")}
                      onChange={(e) => set(field.key, e.target.value)}
                      className="w-full bg-[#202151]/3 border border-[#202151]/15 hover:border-[#D0B66A]/40 focus:border-[#D0B66A] text-[#202151] text-[13px] font-bold px-4 py-3 outline-none transition-colors duration-200 placeholder:text-[#202151]/25 placeholder:font-normal rounded-sm"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                      dir="ltr"
                    />
                    {Boolean(form[field.key]) && (
                      <img
                        src={String(form[field.key])}
                        alt="preview"
                        className="w-32 h-24 object-cover rounded-sm border border-[#D0B66A]/20"
                      />
                    )}
                  </div>
                )}

                {/* Async Select */}
                {field.type === "async-select" && (
                  <AsyncSelect
                    table={field.asyncConfig?.table || ""}
                    labelColumn={field.asyncConfig?.labelColumn || ""}
                    valueColumn={field.asyncConfig?.valueColumn}
                    value={String(form[field.key] ?? "")}
                    onChange={(value) => set(field.key, value)}
                    placeholder={field.placeholder}
                    filter={field.asyncConfig?.filter}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Error */}
          {status === "error" && (
            <p
              className="text-[#D61214] text-[12px] font-black mt-6"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              خطأ: {errorMsg}
            </p>
          )}

          {/* Submit */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#D0B66A]/15">
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="text-[#202151] bg-[#D0B66A] text-[14px] font-black px-10 py-3.5 rounded-sm tracking-wide transition-opacity duration-200 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              {status === "loading" ? "جارٍ الحفظ..." : status === "success" ? "تم الحفظ ✓" : isEdit ? "حفظ التعديلات" : "إضافة"}
            </button>
            <button
              onClick={() => router.push(backHref)}
              className="text-[#202151]/40 text-[13px] font-black hover:text-[#202151] transition-colors duration-200 bg-transparent border-none cursor-pointer"
              style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </>
  );
}