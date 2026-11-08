import { useState } from "react";
import { Button, FilterBar, PageHeading } from "../components/common/UI";
import PageTabs from "../components/common/PageTabs";
import ProjectCard from "../components/projects/ProjectCard";
import { useAppData } from "../context/DataContext";

export default function ProjectsPage() {
  const { data, loading, error } = useAppData();
  const projects = data.projects;
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
          { value: "all", label: "Vsi projekti", count: projects.length },
          { value: "active", label: "Aktivni", count: projects.filter((item) => item.status !== "Zaključeno").length },
          { value: "completed", label: "Zaključeni", count: projects.filter((item) => item.status === "Zaključeno").length },
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
      {loading && <p className="empty-preview">Nalaganje projektov …</p>}
      {error && <p className="empty-preview" role="alert">{error}</p>}
      {!visible.length && (
        <p className="empty-preview">
          Noben projekt ne ustreza izbranemu pogledu.
        </p>
      )}
    </>
  );
}
