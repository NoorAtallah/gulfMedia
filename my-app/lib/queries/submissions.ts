import { supabase } from "../supabase";

export async function submitMembership(payload: {
  full_name: string;
  email: string;
  phone?: string;
  country?: string;
  plan_id?: string;
  specialty?: string;
  notes?: string;
}) {
  const { error } = await supabase
    .from("membership_submissions")
    .insert(payload);

  return { error };
}

export async function submitCourseEnrollment(payload: {
  course_id: string;
  full_name: string;
  email: string;
  phone?: string;
  notes?: string;
}) {
  const { error } = await supabase
    .from("course_enrollments")
    .insert(payload);

  return { error };
}

export async function submitEventRegistration(payload: {
  event_id: string;
  full_name: string;
  email: string;
  phone?: string;
  notes?: string;
}) {
  const { error } = await supabase
    .from("event_registrations")
    .insert(payload);

  return { error };
}

export async function submitVolunteer(payload: {
  full_name: string;
  email: string;
  phone?: string;
  country?: string;
  specialty?: string;
  skills?: string[];
  domain?: string;
  experience_years?: number;
  notes?: string;
}) {
  const { error } = await supabase
    .from("volunteer_submissions")
    .insert(payload);

  return { error };
}

export async function submitMediaCenter(payload: {
  center_name: string;
  email: string;
  phone?: string;
  country?: string;
  website_url?: string;
  description_ar?: string;
}) {
  const { error } = await supabase
    .from("media_center_submissions")
    .insert(payload);
  return { error };
}

export async function submitPartner(payload: {
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  notes?: string;
  type: "partner" | "supporter";
}) {
  const { error } = await supabase
    .from("partner_submissions")
    .insert(payload);
  return { error };
}