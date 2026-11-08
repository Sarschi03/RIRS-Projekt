import { Upload } from "lucide-react";
import type { Project, Task } from "../../types/ui";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Panel,
  Progress,
} from "../common/UI";
import { useAppData } from "../../context/DataContext";
import TaskDetails from "../tasks/TaskDetails";

export function ProjectOverview({
  project,
  task,
}: {
  project: Project;
  task?: Task;
}) {
  const { data } = useAppData();
  return (
    <div className="project-overview-grid">
      <Panel
        title="Pregled projekta"
        subtitle="Vse ključne informacije na enem mestu"
      >
        <div className="overview-body">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <Badge>{project.status}</Badge>
          <div className="progress-label">
            <span>Skupni napredek</span>
            <strong>{project.progress}%</strong>
          </div>
          <Progress value={project.progress} />
          <dl className="overview-facts">
            <div>
              <dt>Začetek</dt>
              <dd>{project.start}</dd>
            </div>
            <div>
              <dt>Rok</dt>
              <dd>{project.end}</dd>
            </div>
            <div>
              <dt>Ekipa</dt>
              <dd>
                <AvatarGroup members={project.members} />
              </dd>
            </div>
            <div>
              <dt>Naloge</dt>
              <dd>{project.tasks} načrtovanih nalog</dd>
            </div>
          </dl>
          <div className="project-team-roles">
            <h3>Člani projekta</h3>
            {project.members.map((initials, index) => (
              <div className="project-team-role" key={initials}>
                <Avatar initials={initials} />
                <span>
                  {data.people.find((person) => person.initials === initials)
                    ?.name || initials}
                </span>
                <Badge>{index === 0 ? "Vodja projekta" : "Sodelavec"}</Badge>
              </div>
            ))}
            <Button action={{ kind: "project-members", project }}>
              Uredi člane in vloge
            </Button>
          </div>
          <Button action={{ kind: "instructions", project }}>
            Preglej / dodaj navodila
          </Button>
        </div>
      </Panel>
      <TaskDetails task={task} />
    </div>
  );
}

export function ProjectFiles({ project }: { project: Project }) {
  return (
    <Panel
      title="Datoteke projekta"
      subtitle="Skupna referenčna gradiva ekipe"
      action={
        <Button action={{ kind: "upload", project }}>
          <Upload size={15} />
          Naloži datoteke
        </Button>
      }
    >
      <div className="project-files">
        <p className="empty-preview">Projekt še nima naloženih datotek.</p>
      </div>
    </Panel>
  );
}
