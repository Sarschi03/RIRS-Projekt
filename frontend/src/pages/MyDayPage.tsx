import { CalendarDays, CheckCheck, Clock3, Sun } from "lucide-react";
import {
  Button,
  PageHeading,
  Panel,
  Progress,
  StatCard,
} from "../components/common/UI";
import DailyChecklist from "../components/my-day/DailyChecklist";

export default function MyDayPage() {
  return (
    <>
      <PageHeading
        eyebrow="SATURDAY, NOVEMBER 7, 2026"
        title="My day"
        description="A small plan for a meaningful day. Let’s make some room for what matters."
        action={
          <Button primary icon>
            Add task
          </Button>
        }
      />
      <div className="day-banner">
        <span className="day-symbol">
          <Sun size={27} />
        </span>
        <div>
          <h2>A little progress is still progress.</h2>
          <p>You’ve completed 2 of your 5 planned tasks. Keep your own pace.</p>
        </div>
        <div className="day-progress">
          <strong>40%</strong>
          <Progress value={40} label="Daily progress" />
        </div>
      </div>
      <div className="stats-grid three">
        <StatCard
          label="Planned tasks"
          value="5"
          detail="4 project tasks · 1 personal"
          icon={<CalendarDays size={18} />}
        />
        <StatCard
          label="Completed"
          value="2 / 5"
          detail="3 tasks still ahead"
          icon={<CheckCheck size={18} />}
        />
        <StatCard
          label="Planned focus time"
          value="5h 45m"
          detail="With room for a break"
          icon={<Clock3 size={18} />}
        />
      </div>
      <Panel
        title="Your daily plan"
        subtitle="From the first idea to the last little detail"
        action={<span className="muted small">Morning → Afternoon</span>}
      >
        <DailyChecklist />
      </Panel>
      <div className="day-footer">
        <span>Make a little room for yourself, too.</span>
        <span className="muted">
          Your plan doesn’t have to be perfect to be useful.
        </span>
      </div>
    </>
  );
}
