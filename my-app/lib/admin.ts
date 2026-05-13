"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function adminInsert(table: string, payload: Record<string, unknown>) {
  const { error } = await supabaseAdmin.from(table).insert(payload);
  return { error: error?.message ?? null };
}

export async function adminUpdate(table: string, id: string, payload: Record<string, unknown>) {
  const { error } = await supabaseAdmin.from(table).update(payload).eq("id", id);
  return { error: error?.message ?? null };
}

export async function adminDelete(table: string, id: string) {
  const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
  return { error: error?.message ?? null };
}

export async function adminSelect(table: string, options?: {
  filter?: { column: string; value: string };
  orderBy?: string;
  ascending?: boolean;
}) {
  let query = supabaseAdmin.from(table).select("*");
  if (options?.filter) query = query.eq(options.filter.column, options.filter.value);
  if (options?.orderBy) query = query.order(options.orderBy, { ascending: options.ascending ?? false });
  const { data, error } = await query;
  return { data: data ?? [], error: error?.message ?? null };
}