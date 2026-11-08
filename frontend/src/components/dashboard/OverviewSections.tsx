import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../../data/mockData";
import { Avatar, AvatarGroup, Panel, Progress } from "../common/UI";

export function ActiveProjects() {
  return (
    <Panel
      title="Aktivni projekti"
      subtitle="Skupaj naprej"
      action={
        <Link className="text-link" to="/projects">
          Prikaži vse
          <ArrowUpRight size={14} />
        </Link>
      }
    >
      <div className="project-rows">
        {projects.slice(0, 3).map((project) => (
          <Link
            to={`/projects/${project.id}`}
            className="project-row"
            key={project.id}
          >
            <div className="row-main">
              <strong>{project.name}</strong>
              <span>
                {project.tasks} nalog · Rok {project.end}
              </span>
            </div>
            <AvatarGroup members={project.members} />
            <div className="row-progress">
              <span>{project.progress}%</span>
              <Progress value={project.progress} label={project.name} />
            </div>
            <ArrowUpRight size={16} />
          </Link>
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
            note: "Ponedeljek",
          },
          {
            day: "10",
            title: "Načrt uvajanja",
            project: "Prenova spletne strani",
            note: "Torek",
          },
          {
            day: "12",
            title: "Knjižnica komponent",
            project: "Prenova spletne strani",
            note: "Četrtek",
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
            <span className="muted small">{item.note}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function RecentActivity() {
  return (
    <Panel title="Nedavna dejavnost" subtitle="Novosti v vaši ekipi">
      <div className="activity-list">
        {[
          {
            initials: "LK",
            name: "Luka",
            action: "je dodal pripombe k nalogi",
            subject: "Knjižnica komponent",
            time: "pred 25 minutami",
          },
          {
            initials: "NP",
            name: "Neža",
            action: "je zaključila nalogo",
            subject: "Zbiranje povratnih informacij ekipe",
            time: "pred 1 uro",
          },
          {
            initials: "MS",
            name: "Maja",
            action: "se je pridružila projektu",
            subject: "Prenova spletne strani",
            time: "pred 2 urama",
          },
        ].map((item) => (
          <div className="activity-row" key={item.name}>
            <Avatar initials={item.initials} />
            <div>
              <p>
                <strong>{item.name}</strong> {item.action}{" "}
                <strong>{item.subject}</strong>
              </p>
              <span className="muted small">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
