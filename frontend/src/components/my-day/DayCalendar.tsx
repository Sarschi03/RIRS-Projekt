import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weekdays = ["P", "T", "S", "Č", "P", "S", "N"];
const monthFormatter = new Intl.DateTimeFormat("sl-SI", {
  month: "long",
  year: "numeric",
});
const selectedFormatter = new Intl.DateTimeFormat("sl-SI", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const dayFormatter = new Intl.DateTimeFormat("sl-SI", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function sameDate(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function capitalize(value: string) {
  return value.charAt(0).toLocaleUpperCase("sl-SI") + value.slice(1);
}

export default function DayCalendar() {
  const [today] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const { days, leadingDays } = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    return {
      days: Array.from(
        { length: new Date(year, month + 1, 0).getDate() },
        (_, index) => new Date(year, month, index + 1),
      ),
      leadingDays: (new Date(year, month, 1).getDay() + 6) % 7,
    };
  }, [visibleMonth]);

  function moveMonth(offset: number) {
    setVisibleMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + offset, 1),
    );
  }

  const monthLabel = capitalize(monthFormatter.format(visibleMonth));
  const selectedLabel = capitalize(selectedFormatter.format(selectedDate));

  return (
    <section className="day-calendar" aria-labelledby="day-calendar-title">
      <div className="day-calendar-heading">
        <div>
          <h2 id="day-calendar-title">{monthLabel}</h2>
          <p aria-live="polite">Izbrano: {selectedLabel}</p>
        </div>
        <div className="calendar-controls">
          <button
            type="button"
            onClick={() => moveMonth(-1)}
            aria-label="Prejšnji mesec"
            title="Prejšnji mesec"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={() => moveMonth(1)}
            aria-label="Naslednji mesec"
            title="Naslednji mesec"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
      <div className="calendar-grid" aria-label={`Koledar za ${monthLabel}`}>
        {weekdays.map((weekday, index) => (
          <span className="calendar-weekday" key={`${weekday}-${index}`}>
            {weekday}
          </span>
        ))}
        {Array.from({ length: leadingDays }, (_, index) => (
          <span aria-hidden="true" key={`empty-${index}`} />
        ))}
        {days.map((date) => {
          const isToday = sameDate(date, today);
          const isSelected = sameDate(date, selectedDate);
          return (
            <button
              type="button"
              className={`calendar-day${isToday ? " is-today" : ""}${isSelected ? " is-selected" : ""}`}
              aria-current={isToday ? "date" : undefined}
              aria-pressed={isSelected}
              aria-label={capitalize(dayFormatter.format(date))}
              onClick={() => setSelectedDate(date)}
              key={date.toISOString()}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </section>
  );
}
