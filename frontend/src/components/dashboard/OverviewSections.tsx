import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../../data/mockData";
import { Avatar, AvatarGroup, Panel, Progress } from "../common/UI";

export function ActiveProjects() {
  return (
    <Panel
      title="Active projects"
      subtitle="Moving forward, together"
      action={
        <Link className="text-link" to="/projects">
          View all
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
                {project.tasks} tasks · Due {project.end.slice(0, 6)}
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
    <Panel title="Coming up" subtitle="A little room to plan ahead">
      <div className="deadline-list">
        {[
          {
            day: "09",
            title: "Project overview design",
            project: "Website redesign",
            note: "Monday",
          },
          {
            day: "10",
            title: "Onboarding journey",
            project: "Website redesign",
            note: "Tuesday",
          },
          {
            day: "12",
            title: "Component library",
            project: "Website redesign",
            note: "Thursday",
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
    <Panel title="Recent activity" subtitle="The latest from your team">
      <div className="activity-list">
        {[
          {
            initials: "LK",
            name: "Luka",
            action: "added feedback to",
            subject: "Component library",
            time: "25 minutes ago",
          },
          {
            initials: "NP",
            name: "Neža",
            action: "completed",
            subject: "Collect team feedback",
            time: "1 hour ago",
          },
          {
            initials: "MS",
            name: "Maja",
            action: "joined",
            subject: "Website redesign",
            time: "2 hours ago",
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
      <div className="panel-footnote">
        <CalendarDays size={13} />
        Showing sample activity for this workspace
      </div>
    </Panel>
  );
}
