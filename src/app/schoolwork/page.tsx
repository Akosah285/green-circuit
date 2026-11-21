import { ProjectCollection } from "@/components/ProjectCollection";
import { projects } from "@/data/portfolio";

export default function SchoolworkPage() {
  return (
    <ProjectCollection
      title="Schoolwork"
      description="Projects and research from school, connecting classroom ideas with hands-on engineering."
      items={projects.filter((project) => project.category === "Schoolwork")}
    />
  );
}
