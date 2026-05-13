import { getFeaturedJournalists } from "@/lib/queries/journalists";
import { getFeaturedArticle, getLatestArticles } from "@/lib/queries/articles";
import { getFeaturedPodcast, getAllPodcasts } from "@/lib/queries/podcasts";
import { getAllCourses } from "@/lib/queries/courses";
import { getUpcomingEvents } from "@/lib/queries/events";
import { getAllMediaCenters } from "@/lib/queries/media-centers";
import { getAllPartners } from "@/lib/queries/partners";
import { getMembershipPlans } from "@/lib/queries/memberships";
import { getAllLibraryResources } from "@/lib/queries/library";

import HeroSection from "./components/heroSection";
import FeaturedJournalists from "./components/Featuredjournalists";
import LatestArticles from "./components/LatestArticles";
import PodcastSection from "./components/PodcastSection";
import CoursesSection from "./components/CoursesSection";
import EventsSection from "./components/EventsSection";
import MediaCentersSection from "./components/MediaCentersSection";
import PartnersSection from "./components/PartnersSection";
import MembershipSection from "./components/MembershipSection";
import VolunteerSection from "./components/VolunteerSection";
import LibrarySection from "./components/librarySection";

const DIVIDER = <div className="w-full h-px bg-[#D0B66A] opacity-20" />;

export default async function HomePage() {
  const [
    journalists,
    featuredArticle,
    latestArticles,
    featuredPodcast,
    podcasts,
    courses,
    events,
    mediaCenters,
    partners,
    membershipPlans,
    libraryResources,
  ] = await Promise.all([
    getFeaturedJournalists(),
    getFeaturedArticle(),
    getLatestArticles(3),
    getFeaturedPodcast(),
    getAllPodcasts(5),
    getAllCourses(),
    getUpcomingEvents(4),
    getAllMediaCenters(),
    getAllPartners(),
    getMembershipPlans(),
    getAllLibraryResources(),
  ]);

  return (
    <div>
      <HeroSection />
      {DIVIDER}
      <FeaturedJournalists journalists={journalists} />
      {DIVIDER}
      <LatestArticles featured={featuredArticle} articles={latestArticles} />
      {DIVIDER}
      <PodcastSection featured={featuredPodcast} podcasts={podcasts} />
      {DIVIDER}
      <CoursesSection courses={courses} />
      {DIVIDER}
      <EventsSection events={events} />
      {DIVIDER}
      <MediaCentersSection mediaCenters={mediaCenters} />
      {DIVIDER}
      <PartnersSection partners={partners} />
      {DIVIDER}
      <MembershipSection plans={membershipPlans} />
      {DIVIDER}
      <VolunteerSection />
      {DIVIDER}
      <LibrarySection resources={libraryResources} />
    </div>
  );
}