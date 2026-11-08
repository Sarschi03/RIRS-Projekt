import { Check, Clock3, Flag } from "lucide-react";
import { dailyTasks } from "../../data/mockData";

export default function DailyChecklist({
  compact = false,
  simple = false,
}: {
  compact?: boolean;
  simple?: boolean;
}) {
  const items = compact ? dailyTasks.slice(0, 4) : dailyTasks;
  return (
    <div className={`daily-list ${compact ? "compact" : ""} ${simple ? "simple" : ""}`}>
      {items.map((task) => (
        <article
          className={`daily-task ${task.done ? "is-done" : ""}`}
          key={task.title}
        >
          {!simple && <span className="task-time">{task.time}</span>}
          <span
            className={`visual-checkbox ${task.done ? "checked" : ""}`}
            role="img"
            aria-label={task.done ? "Zaključeno" : "Čaka na izvedbo"}
          >
            {task.done && <Check size={13} />}
          </span>
          <div className="daily-task-title">
            <h3>{task.title}</h3>
            <p>{task.project}</p>
          </div>
          {!simple && <div className="daily-task-meta">
            <span>
              <Clock3 size={13} />
              {task.duration}
            </span>
            {!compact && (
              <span>
                <Flag size={12} />
                {task.priority}
              </span>
            )}
          </div>}
        </article>
      ))}
    </div>
  );
}
