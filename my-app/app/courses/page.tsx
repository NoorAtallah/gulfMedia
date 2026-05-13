import { getAllCourses } from "@/lib/queries/courses";
import CoursesPage from "./CoursesPage";

export default async function Page() {
  const courses = await getAllCourses();
  return <CoursesPage courses={courses} />;
}