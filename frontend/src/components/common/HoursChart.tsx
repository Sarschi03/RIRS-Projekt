import type { TimeEntry } from "../../types/ui";

export default function HoursChart({ entries = [] }: { entries?: TimeEntry[] }) {
  const labels = ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"];
  const totals = Array.from({ length: 7 }, () => 0);
  entries.forEach((entry) => { totals[new Date(entry.dateTime).getDay()] += entry.durationMinutes; });
  const maximum = Math.max(480, ...totals);
  const days = [1, 2, 3, 4, 5, 6, 0].map((index) => ({ day: labels[index], hours: `${Math.floor(totals[index] / 60)} h`, height: totals[index] / maximum * 100 }));
  return (
    <div
      className="hours-chart"
      role="img"
      aria-label="Tedenske ure iz evidence časa."
    >
      <div className="chart-grid">
        <span>10 h</span>
        <span>5 h</span>
        <span>0 h</span>
      </div>
      <div className="chart-bars">
        {days.map((day) => (
          <div className="chart-day" key={day.day}>
            <div className="bar-space">
              <div
                className="chart-bar"
                style={{ height: `${day.height}%` }}
              >
                <span>{day.hours}</span>
              </div>
            </div>
            <span>{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
