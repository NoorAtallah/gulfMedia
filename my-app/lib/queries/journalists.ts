import { supabase } from "../supabase";
import type { Journalist } from "../types";

export async function getFeaturedJournalists(): Promise<Journalist[]> {
  const { data, error } = await supabase
    .from("journalists")
    .select("*")
    .eq("is_featured", true)
    .order("display_order", { ascending: true });

  if (error) return [];
  return data;
}

export async function getAllJournalists(filters?: {
  country?: string;
  specialty?: string;
  experience_years?: number;
}): Promise<Journalist[]> {
  let query = supabase
    .from("journalists")
    .select("*")
    .order("display_order", { ascending: true });

  if (filters?.country) query = query.eq("country", filters.country);
  if (filters?.specialty) query = query.eq("specialty", filters.specialty);
  if (filters?.experience_years) query = query.gte("experience_years", filters.experience_years);

  const { data, error } = await query;
  if (error) return [];
  return data;
}

export async function getJournalistById(id: string): Promise<Journalist | null> {
  const { data, error } = await supabase
    .from("journalists")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getJournalistArticles(journalistId: string) {
  const { data, error } = await supabase
    .from("articles")
    .select("*, category:categories(*)")
    .eq("journalist_id", journalistId)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) return [];
  return data;
}