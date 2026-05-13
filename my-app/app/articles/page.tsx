import { getAllArticles } from "@/lib/queries/articles";
import { getAllCategories } from "@/lib/queries/categories";
import ArticlesPage from "./ArticlesPage";

export default async function Page() {
  const [articles, categories] = await Promise.all([
    getAllArticles(),
    getAllCategories(),
  ]);
  return <ArticlesPage articles={articles} categories={categories} />;
}