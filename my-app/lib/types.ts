export type Status = "draft" | "published";
export type SubmissionStatus = "pending" | "contacted" | "approved" | "rejected";
export type LocationType = "online" | "in-person" | "hybrid";
export type PartnerType = "partner" | "supporter";
export type ResourceType = "كتاب" | "تقرير" | "دليل";
export type CourseLevel = "مبتدئ" | "متوسط" | "متقدم";

export type Category = {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
};

export type Journalist = {
  id: string;
  full_name_ar: string;
  bio_ar: string | null;
  avatar_url: string | null;
  country: string | null;
  specialty: string | null;
  experience_years: number | null;
  social_links: Record<string, string>;
  is_featured: boolean;
  display_order: number;
};

export type Article = {
  id: string;
  journalist_id: string | null;
  category_id: string | null;
  title_ar: string;
  excerpt_ar: string | null;
  content_ar: string | null;
  cover_url: string | null;
  read_time_minutes: number | null;
  is_featured: boolean;
  status: Status;
  published_at: string | null;
  journalist?: Journalist;
  category?: Category;
};

export type Podcast = {
  id: string;
  title_ar: string;
  description_ar: string | null;
  cover_url: string | null;
  audio_url: string | null;
  video_url: string | null;
  host_id: string | null;
  duration_seconds: number | null;
  episode_number: number | null;
  season_number: number;
  is_featured: boolean;
  status: Status;
  published_at: string | null;
  host?: Journalist;
};

export type Course = {
  id: string;
  instructor_id: string | null;
  title_ar: string;
  description_ar: string | null;
  cover_url: string | null;
  price: number;
  duration_hours: number | null;
  level: CourseLevel | null;
  status: Status;
  instructor?: Journalist;
};

export type Event = {
  id: string;
  title_ar: string;
  description_ar: string | null;
  cover_url: string | null;
  location_ar: string | null;
  location_type: LocationType | null;
  starts_at: string | null;
  ends_at: string | null;
  capacity: number | null;
  status: Status;
};

export type LibraryResource = {
  id: string;
  title_ar: string;
  description_ar: string | null;
  author_name_ar: string | null;
  cover_url: string | null;
  file_url: string | null;
  type: ResourceType;
  category_id: string | null;
  pages: number | null;
  year: string | null;
  tag: string | null;
  category?: Category;
};

export type MembershipPlan = {
  id: string;
  name_ar: string;
  description_ar: string | null;
  price: number;
  features: string[];
  display_order: number;
};

export type Partner = {
  id: string;
  name_ar: string;
  logo_url: string | null;
  website_url: string | null;
  type: PartnerType;
  display_order: number;
};

export type MediaCenter = {
  id: string;
  name_ar: string;
  description_ar: string | null;
  logo_url: string | null;
  country: string | null;
  website_url: string | null;
};