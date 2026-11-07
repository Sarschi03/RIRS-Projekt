import {
  Clock3,
  CalendarDays,
  Pause,
  Play,
  Square,
  ChevronDown,
} from "lucide-react";
import { Button, PageHeading, Panel, StatCard } from "../components/common/UI";
import HoursChart from "../components/common/HoursChart";
import TimeEntriesTable from "../components/time-tracking/TimeEntriesTable";

export default function TimeTrackingPage() {
  return (
    <>
      <PageHeading
        eyebrow="MAKE ROOM FOR FOCUSED WORK"
        title="Time tracking"
        description="A clearer picture of where your time goes."
        action={<Button icon>Manual entry</Button>}
      />
      <div className="time-top-grid">
        <div className="section-stack">
          <StatCard
            label="Today’s total"
            value="3h 30m"
            detail="Saturday, November 7"
            icon={<Clock3 size={18} />}
          />
          <StatCard
            label="This week"
            value="32h 15m"
            detail="November 2 – 8, 2026"
            icon={<CalendarDays size={18} />}
          />
        </div>
        <Panel
          title="Focus timer"
          subtitle="One task. A little space to focus."
          className="timer-panel"
        >
          <label className="timer-select">
            Working on
            <select defaultValue="overview">
              <option value="overview">Design the project overview</option>
              <option>Map the onboarding journey</option>
              <option>Review welcome materials</option>
            </select>
          </label>
          <div
            className="timer-display"
            aria-label="Timer: zero hours, zero minutes, zero seconds"
          >
            00<span>:</span>00<span>:</span>00
          </div>
          <div className="timer-buttons">
            <Button primary>
              <Play size={14} />
              Start
            </Button>
            <Button>
              <Pause size={14} />
              Pause
            </Button>
            <Button>
              <Square size={13} />
              Stop
            </Button>
          </div>
          <span className="timer-note">
            Timer preview · controls are visual only
          </span>
        </Panel>
      </div>
      <Panel
        title="Weekly overview"
        subtitle="A steady rhythm, day by day"
        action={
          <Button>
            This week
            <ChevronDown size={14} />
          </Button>
        }
      >
        <HoursChart />
      </Panel>
      <Panel
        title="Time entries"
        subtitle="A record of focused moments"
        action={<span className="muted small">5 entries</span>}
      >
        <TimeEntriesTable />
      </Panel>
    </>
  );
}
