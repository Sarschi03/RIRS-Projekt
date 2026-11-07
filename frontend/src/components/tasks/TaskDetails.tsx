import { CalendarDays, Flag, Info } from "lucide-react";
import { tasks } from "../../data/mockData";
import type { Task } from "../../types/ui";
import { Avatar, Badge, Panel } from "../common/UI";

export default function TaskDetails({ task = tasks[3] }: { task?: Task }) {
  return (
    <Panel
      title="Task details"
      subtitle="A closer look at the work"
      action={<Info size={17} />}
      className="task-details"
    >
      <span className="eyebrow">{task.id}</span>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <dl className="detail-list">
        <div>
          <dt>Assigned to</dt>
          <dd>
            <Avatar initials={task.assignee} />
            {task.name}
          </dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>
            <Badge>{task.status}</Badge>
          </dd>
        </div>
        <div>
          <dt>Priority</dt>
          <dd>
            <Flag size={14} />
            {task.priority}
          </dd>
        </div>
        <div>
          <dt>Deadline</dt>
          <dd>
            <CalendarDays size={14} />
            {task.deadline}, 2026
          </dd>
        </div>
      </dl>
      <div className="instruction-note">
        <h4>Work instructions</h4>
        <p>
          Follow the approved project brief and shared reference materials.
          Share your first draft with the project manager, gather team feedback,
          and prepare a clear handoff for the next review.
        </p>
      </div>
    </Panel>
  );
}
