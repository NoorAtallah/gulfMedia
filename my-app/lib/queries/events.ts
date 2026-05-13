import { supabase } from "../supabase";
import type { Event } from "../types";

export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  let query = supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) return [];
  return data;
}

export async function getAllEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .order("starts_at", { ascending: true });

  if (error) return [];
  return data;
}

export async function getEventById(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}