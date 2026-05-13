import { supabase } from "../supabase";
import type { MembershipPlan } from "../types";

export async function getMembershipPlans(): Promise<MembershipPlan[]> {
  const { data, error } = await supabase
    .from("membership_plans")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) return [];
  return data;
}