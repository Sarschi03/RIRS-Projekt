import {
  CalendarDays,
  ChevronLeft,
  MoreHorizontal,
  Upload,
  UsersRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects, projectTasks } from "../data/mockData";
import {
  AvatarGroup,
  Badge,
  Button,
  PageHeading,
  Progress,
} from "../components/common/UI";
import KanbanBoard from "../components/tasks/KanbanBoard";
import TaskDetails from "../components/tasks/TaskDetails";
import { useState } from "react";
import PageTabs from "../components/common/PageTabs";
import {
  ProjectFiles,
  ProjectOverview,
} from "../components/projects/ProjectViews";

export default function ProjectDetailsPage() {
  const [tab, setTab] = useState("board");
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);
  const items = projectTasks[id || ""] || [];
  if (!project)
    return (
      <>
        <PageHeading
          title="Projekta ni mogoče najti"
          description="Izbranega projekta ni mogoče najti."
        />
        <Link className="text-link" to="/projects">
          Nazaj na projekte
        </Link>
      </>
    );
  return (
    <>
      <Link className="back-link" to="/projects">
        <ChevronLeft size={14} />
        Vsi projekti
      </Link>
      <PageHeading
        title={project.name}
        description={project.description}
        action={
          <div className="heading-actions">
            <Button action={{ kind: "project-members", project }}>
              <UsersRound size={16} />
              Člani
            </Button>
            <Button
              action={{ kind: "project-options", project }}
              aria-label="Možnosti projekta"
            >
              <MoreHorizontal size={17} />
            </Button>
            <Button action={{ kind: "upload", project }}>
              <Upload size={16} />
              Naloži
            </Button>
            <Button primary icon action={{ kind: "task", project }}>
              Dodaj nalogo
            </Button>
          </div>
        }
      />
      <div className="project-summary">
        <Badge>{project.status}</Badge>
        <span>
          <CalendarDays size={15} />
          Rok {project.end}
        </span>
        <AvatarGroup members={project.members} />
        <div className="summary-progress">
          <span>{project.progress}% zaključeno</span>
          <Progress value={project.progress} />
        </div>
      </div>
      <PageTabs
        label="Vsebine projekta"
        value={tab}
        onChange={setTab}
        options={[
          { value: "board", label: "Kanban" },
          { value: "overview", label: "Pregled" },
          { value: "files", label: "Datoteke" },
        ]}
      />
      <div hidden={tab !== "board"}>
        <KanbanBoard key={project.id} items={items} project={project} />
        <div className="task-detail-section">
          <TaskDetails
            task={items.find((task) => task.status === "V teku") || items[0]}
          />
        </div>
      </div>
      {tab === "overview" && (
        <ProjectOverview
          project={project}
          task={items.find((task) => task.status === "V teku") || items[0]}
        />
      )}
      {tab === "files" && <ProjectFiles project={project} />}
    </>
  );
}
