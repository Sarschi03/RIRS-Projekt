import { Check, Clock3, Flag } from "lucide-react";
import { useAppData } from "../../context/DataContext";

function TaskCheckbox({ done }: { done: boolean }) {
  return (
    <span
      className={`visual-checkbox ${done ? "checked" : ""}`}
      role="img"
      aria-label={done ? "Zaključeno" : "Čaka na izvedbo"}
    >
      {done && <Check size={13} />}
    </span>
  );
}

export default function DailyChecklist({
  compact = false,
  simple = false,
}: {
  compact?: boolean;
  simple?: boolean;
}) {
  const { data, toggleDailyTask } = useAppData();
  const items = compact ? data.dailyTasks.slice(0, 4) : data.dailyTasks;
  return (
    <div className={`daily-list ${compact ? "compact" : ""} ${simple ? "simple" : ""}`}>
      {items.map((task) => {
        const isDone = task.done;
        return (
        <article
          className={`daily-task ${isDone ? "is-done" : ""}`}
          key={task.title}
        >
          {!simple && <span className="task-time">{task.time}</span>}
          {!simple && <TaskCheckbox done={isDone} />}
          <div className="daily-task-title">
            <h3>{task.title}</h3>
            <p>{task.project}</p>
          </div>
          {simple && (
            <input
              className="daily-task-radio"
              type="checkbox"
              checked={isDone}
              aria-label={`${isDone ? "Odznači" : "Označi"} nalogo ${task.title}`}
              onChange={() => void toggleDailyTask(task.id, !isDone)}
            />
          )}
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
        );
      })}
    </div>
  );
}
