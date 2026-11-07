import {
  CalendarDays,
  ChevronLeft,
  FileText,
  MoreHorizontal,
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

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);
  const items = projectTasks[id || ""] || [];
  if (!project)
    return (
      <>
        <PageHeading
          eyebrow="PROJECTS"
          title="Project not found"
          description="This project isn’t part of the preview workspace."
        />
        <Link className="text-link" to="/projects">
          Back to projects
        </Link>
      </>
    );
  return (
    <>
      <Link className="back-link" to="/projects">
        <ChevronLeft size={14} />
        All projects
      </Link>
      <PageHeading
        eyebrow="PROJECT WORKSPACE"
        title={project.name}
        description={project.description}
        action={
          <div className="heading-actions">
            <Button>
              <MoreHorizontal size={17} />
            </Button>
            <Button primary icon>
              Add task
            </Button>
          </div>
        }
      />
      <div className="project-summary">
        <Badge>{project.status}</Badge>
        <span>
          <CalendarDays size={15} />
          Due {project.end}
        </span>
        <AvatarGroup members={project.members} />
        <div className="summary-progress">
          <span>{project.progress}% complete</span>
          <Progress value={project.progress} />
        </div>
      </div>
      <div className="instruction-banner">
        <FileText size={19} />
        <div>
          <strong>A note from your project manager</strong>
          <p>
            Keep things simple and accessible. Share your explorations before
            polishing the details, and use our agreed visual direction as a
            starting point.
          </p>
        </div>
      </div>
      <div className="page-tabs">
        <span className="selected">Board</span>
        <span>Overview</span>
        <span>Files</span>
      </div>
      <KanbanBoard items={items} />
      <div className="task-detail-section">
        <TaskDetails
          task={items.find((task) => task.status === "In Progress") || items[0]}
        />
      </div>
    </>
  );
}
