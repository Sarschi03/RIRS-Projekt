import { Button, FilterBar, PageHeading } from "../components/common/UI";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../data/mockData";

export default function ProjectsPage() {
  return (
    <>
      <PageHeading
        eyebrow="WORK, WITH A SHARED PURPOSE"
        title="Projects"
        description="A home for the things you’re building together."
        action={
          <Button primary icon>
            Create project
          </Button>
        }
      />
      <div className="page-tabs">
        <span className="selected">
          All projects <b>4</b>
        </span>
        <span>
          Active <b>3</b>
        </span>
        <span>
          Completed <b>1</b>
        </span>
      </div>
      <FilterBar />
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <p className="page-endnote">
        All caught up. A little focus goes a long way.
      </p>
    </>
  );
}
