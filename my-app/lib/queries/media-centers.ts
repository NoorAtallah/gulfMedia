import { supabase } from "../supabase";
import type { MediaCenter } from "../types";

export async function getAllMediaCenters(): Promise<MediaCenter[]> {
  const { data, error } = await supabase
    .from("media_centers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}

export async function getMediaCenterById(id: string): Promise<MediaCenter | null> {
  const { data, error } = await supabase
    .from("media_centers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}