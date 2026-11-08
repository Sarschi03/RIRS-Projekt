import { useAppData } from "../../context/DataContext";
import { Panel } from "../common/UI";
import ProjectCard from "../projects/ProjectCard";

export function ActiveProjects() {
  const { data } = useAppData();
  return (
    <Panel title="Aktivni projekti" subtitle="Skupaj naprej">
      <div className="dashboard-project-grid">
        {data.projects.slice(0, 3).map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </Panel>
  );
}

export function Deadlines() {
  const { data } = useAppData();
  return (
    <Panel title="Prihaja" subtitle="Načrtujte pravočasno">
      <div className="deadline-list">
        {data.tasks.filter((task) => task.status !== "Opravljeno").slice(0, 3).map((item) => (
          <div className="deadline-row" key={item.id}>
            <div className="date-tile">
              <span>ROK</span>
              <strong>{item.deadline.split(". ")[0]}</strong>
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.project}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
