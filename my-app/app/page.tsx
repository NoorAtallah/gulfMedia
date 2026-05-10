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
import Footer from "./components/footer";
export default function Home() {

  return (
    <div >
      <HeroSection />
      <div className="w-full h-px bg-[#D0B66A] opacity-20" />
      <FeaturedJournalists />
      <div className="w-full h-px bg-[#D0B66A] opacity-20" />
      <LatestArticles />
      <div className="w-full h-px bg-[#D0B66A] opacity-20" />
      <PodcastSection />
      <div className="w-full h-px bg-[#D0B66A] opacity-20" />
      <CoursesSection />
      <div className="w-full h-px bg-[#D0B66A] opacity-20" />
      <EventsSection />
      <div className="w-full h-px bg-[#D0B66A] opacity-20" />
      <MediaCentersSection />
      <div className="w-full h-px bg-[#D0B66A] opacity-20" />
      <PartnersSection />
      <div className="w-full h-px bg-[#D0B66A] opacity-20" />
      <MembershipSection />
      <div className="w-full h-px bg-[#D0B66A] opacity-20" />
      <VolunteerSection />
      <Footer />
    </div>
  );
}
