import { supabase } from "../supabase";
import type { Partner } from "../types";

export async function getAllPartners(): Promise<Partner[]> {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) return [];
  return data;
}

export async function getPartnersByType(type: "partner" | "supporter"): Promise<Partner[]> {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("type", type)
    .order("display_order", { ascending: true });

  if (error) return [];
  return data;
}