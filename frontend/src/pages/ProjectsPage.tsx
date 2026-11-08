import { useState } from "react";
import { Button, FilterBar, PageHeading } from "../components/common/UI";
import PageTabs from "../components/common/PageTabs";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../data/mockData";

export default function ProjectsPage() {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Vsa stanja");
  const visible = projects.filter(
    (project) =>
      (tab === "all" ||
        (tab === "completed"
          ? project.status === "Zaključeno"
          : project.status !== "Zaključeno")) &&
      (status === "Vsa stanja" || project.status === status) &&
      `${project.name} ${project.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        title="Projekti"
        description="Prostor za projekte, ki jih ustvarjate skupaj."
        action={
          <Button primary icon action="project">
            Ustvari projekt
          </Button>
        }
      />
      <PageTabs
        label="Pogledi projektov"
        value={tab}
        onChange={setTab}
        options={[
          { value: "all", label: "Vsi projekti", count: 4 },
          { value: "active", label: "Aktivni", count: 3 },
          { value: "completed", label: "Zaključeni", count: 1 },
        ]}
      />
      <FilterBar
        query={query}
        onSearch={setQuery}
        status={status}
        onStatusChange={setStatus}
      />
      <div className="projects-grid">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {!visible.length && (
        <p className="empty-preview">
          Noben projekt ne ustreza izbranemu pogledu.
        </p>
      )}
    </>
  );
}
