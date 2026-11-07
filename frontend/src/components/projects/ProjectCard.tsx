import { ArrowUpRight, CalendarDays, Folder, ListTodo } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../../types/ui";
import { AvatarGroup, Badge, Progress } from "../common/UI";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="project-symbol">
          <Folder size={22} />
        </span>
        <Badge>{project.status}</Badge>
      </div>
      <Link className="project-title" to={`/projects/${project.id}`}>
        <h2>{project.name}</h2>
        <ArrowUpRight size={18} />
      </Link>
      <p>{project.description}</p>
      <div className="progress-label">
        <span>Project progress</span>
        <strong>{project.progress}%</strong>
      </div>
      <Progress value={project.progress} label={`${project.name} progress`} />
      <div className="project-dates">
        <span>
          <CalendarDays size={14} />
          {project.start}
        </span>
        <span>{project.end}</span>
      </div>
      <footer>
        <AvatarGroup members={project.members} />
        <span>
          <ListTodo size={15} />
          {project.tasks} tasks
        </span>
      </footer>
    </article>
  );
}
