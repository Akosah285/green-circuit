import { ProjectCollection } from "@/components/ProjectCollection";
import { projects } from "@/data/portfolio";

export default function WorkPage() {
  return (
    <ProjectCollection
      title="Work & Schoolwork"
      description="This archive keeps earlier project links available. Builds and Schoolwork now have their own destinations."
      items={projects}
      legacy
    />
  );
}
