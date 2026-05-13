import { getFeaturedPodcast, getAllPodcasts } from "@/lib/queries/podcasts";
import PodcastsPage from "./PodcastsPage";

export default async function Page() {
  const [featured, podcasts] = await Promise.all([
    getFeaturedPodcast(),
    getAllPodcasts(),
  ]);
  return <PodcastsPage featured={featured} podcasts={podcasts} />;
}