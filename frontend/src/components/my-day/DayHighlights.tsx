import { BriefcaseBusiness, ListTodo } from "lucide-react";

export default function DayHighlights() {
  return (
    <div className="day-highlights">
      <article className="day-highlight is-blue">
        <span className="day-highlight-icon"><ListTodo size={18} /></span>
        <div><span>Današnji načrt</span><strong>5 nalog</strong></div>
      </article>
      <article className="day-highlight is-pink">
        <span className="day-highlight-icon"><BriefcaseBusiness size={18} /></span>
        <div><span>Projekti</span><strong>Službeni projekti</strong></div>
      </article>
    </div>
  );
}
