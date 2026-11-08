import { projects } from "../../data/mockData";
import { Panel } from "../common/UI";
import ProjectCard from "../projects/ProjectCard";

export function ActiveProjects() {
  return (
    <Panel title="Aktivni projekti" subtitle="Skupaj naprej">
      <div className="dashboard-project-grid">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </Panel>
  );
}

export function Deadlines() {
  return (
    <Panel title="Prihaja" subtitle="Načrtujte pravočasno">
      <div className="deadline-list">
        {[
          {
            day: "09",
            title: "Oblikovanje pregleda projekta",
            project: "Prenova spletne strani",
          },
          {
            day: "10",
            title: "Načrt uvajanja",
            project: "Prenova spletne strani",
          },
          {
            day: "12",
            title: "Knjižnica komponent",
            project: "Prenova spletne strani",
          },
        ].map((item) => (
          <div className="deadline-row" key={item.day}>
            <div className="date-tile">
              <span>NOV</span>
              <strong>{item.day}</strong>
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
