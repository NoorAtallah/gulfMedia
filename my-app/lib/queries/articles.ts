import { supabase } from "../supabase";
import type { Article } from "../types";

export async function getFeaturedArticle(): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*, journalist:journalists(*), category:categories(*)")
    .eq("status", "published")
    .eq("is_featured", true)
    .single();

  if (error) return null;
  return data;
}

export async function getLatestArticles(limit = 3): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*, journalist:journalists(*), category:categories(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data;
}

export async function getAllArticles(category?: string): Promise<Article[]> {
  let query = supabase
    .from("articles")
    .select("*, journalist:journalists(*), category:categories(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (category) query = query.eq("category_id", category);

  const { data, error } = await query;
  if (error) return [];
  return data;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*, journalist:journalists(*), category:categories(*)")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}