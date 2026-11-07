const days = [
  { day: "Mon", hours: "6h", height: 60 },
  { day: "Tue", hours: "7h", height: 70 },
  { day: "Wed", hours: "5h", height: 50 },
  { day: "Thu", hours: "5h 15m", height: 52.5 },
  { day: "Fri", hours: "5h 30m", height: 55 },
  { day: "Sat", hours: "3h 30m", height: 35 },
  { day: "Sun", hours: "0h", height: 0 },
];

export default function HoursChart() {
  return (
    <div
      className="hours-chart"
      role="img"
      aria-label="Weekly hours: Monday 6, Tuesday 7, Wednesday 5, Thursday 5 hours 15 minutes, Friday 5 hours 30 minutes, Saturday 3 hours 30 minutes, Sunday 0."
    >
      <div className="chart-grid">
        <span>10h</span>
        <span>5h</span>
        <span>0h</span>
      </div>
      <div className="chart-bars">
        {days.map((day) => (
          <div className="chart-day" key={day.day}>
            <div className="bar-space">
              <div
                className={`chart-bar ${day.day === "Sat" ? "current" : ""}`}
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
