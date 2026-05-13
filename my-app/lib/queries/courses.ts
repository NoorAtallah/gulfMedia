import { supabase } from "../supabase";
import type { Course } from "../types";

export async function getAllCourses(level?: string): Promise<Course[]> {
  let query = supabase
    .from("courses")
    .select("*, instructor:journalists(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (level) query = query.eq("level", level);

  const { data, error } = await query;
  if (error) return [];
  return data;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from("courses")
    .select("*, instructor:journalists(*)")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}