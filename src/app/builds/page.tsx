import { ProjectCollection } from "@/components/ProjectCollection";
import { projects } from "@/data/portfolio";

export default function BuildsPage() {
  return (
    <ProjectCollection
      title="Builds"
      description="Independent and professional projects, with notes on the systems, decisions, and lessons behind them."
      items={projects.filter((project) => project.category === "Work & Builds")}
    />
  );
}
