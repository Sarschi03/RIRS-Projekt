import { CalendarDays, Flag, Info } from "lucide-react";
import { tasks } from "../../data/mockData";
import type { Task } from "../../types/ui";
import { Avatar, Badge, Panel } from "../common/UI";

export default function TaskDetails({ task = tasks[3] }: { task?: Task }) {
  return (
    <Panel
      title="Podrobnosti naloge"
      subtitle="Podrobnejši pregled dela"
      action={<Info size={17} />}
      className="task-details"
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <dl className="detail-list">
        <div>
          <dt>Dodeljeno</dt>
          <dd>
            <Avatar initials={task.assignee} />
            {task.name}
          </dd>
        </div>
        <div>
          <dt>Stanje</dt>
          <dd>
            <Badge>{task.status}</Badge>
          </dd>
        </div>
        <div>
          <dt>Prioriteta</dt>
          <dd>
            <Flag size={14} />
            {task.priority}
          </dd>
        </div>
        <div>
          <dt>Rok</dt>
          <dd>
            <CalendarDays size={14} />
            {task.deadline} 2026
          </dd>
        </div>
      </dl>
      <div className="instruction-note">
        <h4>Navodila za delo</h4>
        <p>
          Upoštevajte potrjena projektna izhodišča in skupna referenčna gradiva.
          Prvi osnutek delite z vodjo projekta, zberite povratne informacije
          ekipe in pripravite jasna navodila za naslednji pregled.
        </p>
      </div>
    </Panel>
  );
}
