import { supabase } from "../supabase";
import type { Category } from "../types";

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name_ar", { ascending: true });

  if (error) return [];
  return data;
}