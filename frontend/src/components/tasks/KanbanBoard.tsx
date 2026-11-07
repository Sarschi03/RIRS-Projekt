import {
  CalendarDays,
  Flag,
  MessageCircle,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { tasks } from "../../data/mockData";
import type { Task } from "../../types/ui";
import { Avatar } from "../common/UI";

export default function KanbanBoard({ items = tasks }: { items?: Task[] }) {
  return (
    <div className="kanban-board">
      {(["To Do", "In Progress", "Done"] as const).map((status) => (
        <section className="kanban-column" key={status}>
          <header>
            <div>
              <span
                className={`column-dot ${status === "Done" ? "filled" : ""}`}
              />
              <h2>{status}</h2>
              <span className="count">
                {items.filter((task) => task.status === status).length}
              </span>
            </div>
            <div>
              <button
                type="button"
                className="icon-button"
                aria-label={`${status} options`}
              >
                <MoreHorizontal size={16} />
              </button>
              <button
                type="button"
                className="icon-button"
                aria-label={`Add task to ${status}`}
              >
                <Plus size={16} />
              </button>
            </div>
          </header>
          <div className="kanban-cards">
            {items
              .filter((task) => task.status === status)
              .map((task) => (
                <article className="task-card" key={task.id}>
                  <div className="task-card-id">
                    <span>{task.id}</span>
                    <span className="task-priority">
                      <Flag size={11} />
                      {task.priority}
                    </span>
                  </div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <footer>
                    <span>
                      <CalendarDays size={13} />
                      {task.deadline}
                    </span>
                    <span>
                      <MessageCircle size={13} />
                      {task.comments}
                    </span>
                    <Avatar initials={task.assignee} name={task.name} />
                  </footer>
                </article>
              ))}
          </div>
          <button type="button" className="add-card">
            <Plus size={15} />
            Add task
          </button>
        </section>
      ))}
    </div>
  );
}
