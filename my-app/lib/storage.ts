import { supabase } from "./supabase";

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export const Buckets = {
  avatars: "avatars",
  articleCovers: "article-covers",
  podcastCovers: "podcast-covers",
  podcastAudio: "podcast-audio",
  podcastVideo: "podcast-video",
  courseCovers: "course-covers",
  eventCovers: "event-covers",
  libraryCovers: "library-covers",
  libraryFiles: "library-files",
  partnerLogos: "partner-logos",
  mediaLogos: "media-logos",
} as const;