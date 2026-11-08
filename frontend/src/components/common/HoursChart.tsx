const days = [
  { day: "Pon", hours: "6 h", height: 60 },
  { day: "Tor", hours: "7 h", height: 70 },
  { day: "Sre", hours: "5 h", height: 50 },
  { day: "Čet", hours: "5 h 15 min", height: 52.5 },
  { day: "Pet", hours: "5 h 30 min", height: 55 },
  { day: "Sob", hours: "3 h 30 min", height: 35 },
  { day: "Ned", hours: "0 h", height: 0 },
];

export default function HoursChart() {
  return (
    <div
      className="hours-chart"
      role="img"
      aria-label="Tedenske ure: ponedeljek 6, torek 7, sreda 5, četrtek 5 ur in 15 minut, petek 5 ur in 30 minut, sobota 3 ure in 30 minut, nedelja 0."
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
                className={`chart-bar ${day.day === "Sob" ? "current" : ""}`}
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
