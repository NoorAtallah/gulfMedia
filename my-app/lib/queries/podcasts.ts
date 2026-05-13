import { supabase } from "../supabase";
import type { Podcast } from "../types";

export async function getFeaturedPodcast(): Promise<Podcast | null> {
  const { data, error } = await supabase
    .from("podcasts")
    .select("*, host:journalists(*)")
    .eq("status", "published")
    .eq("is_featured", true)
    .single();

  if (error) return null;
  return data;
}

export async function getAllPodcasts(limit?: number): Promise<Podcast[]> {
  let query = supabase
    .from("podcasts")
    .select("*, host:journalists(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) return [];
  return data;
}

export async function getPodcastById(id: string): Promise<Podcast | null> {
  const { data, error } = await supabase
    .from("podcasts")
    .select("*, host:journalists(*)")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}