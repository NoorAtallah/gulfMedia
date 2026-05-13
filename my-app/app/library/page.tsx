import { getAllLibraryResources } from "@/lib/queries/library";
import { getAllCategories } from "@/lib/queries/categories";
import LibraryPage from "./LibraryPage";

export default async function Page() {
  const [resources, categories] = await Promise.all([
    getAllLibraryResources(),
    getAllCategories(),
  ]);
  return <LibraryPage resources={resources} categories={categories} />;
}