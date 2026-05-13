import { supabase } from "../supabase";
import type { LibraryResource } from "../types";

export async function getAllLibraryResources(type?: string): Promise<LibraryResource[]> {
  let query = supabase
    .from("library_resources")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false });

  if (type) query = query.eq("type", type);

  const { data, error } = await query;
  if (error) return [];
  return data;
}

export async function getLibraryResourceById(id: string): Promise<LibraryResource | null> {
  const { data, error } = await supabase
    .from("library_resources")
    .select("*, category:categories(*)")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}