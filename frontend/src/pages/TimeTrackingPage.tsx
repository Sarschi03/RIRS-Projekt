import {
  Clock3,
  CalendarDays,
  Pause,
  Play,
  Square,
} from "lucide-react";
import { Button, PageHeading, Panel, StatCard } from "../components/common/UI";
import TimeEntriesTable from "../components/time-tracking/TimeEntriesTable";
import { useState } from "react";
import useToday from "../hooks/useToday";

export default function TimeTrackingPage() {
  const [timerPreview, setTimerPreview] = useState("Pripravljen");
  const today = useToday();
  return (
    <>
      <PageHeading
        title="Evidenca časa"
        description="Jasen pregled porabljenega časa."
      />
      <div className="time-top-grid">
        <div className="section-stack time-summary-list">
          <div className="time-summary-item">
            <span className="time-summary-icon" aria-hidden="true"><Clock3 size={19} /></span>
            <StatCard
              label="Skupaj danes"
              value="3 h 30 min"
              detail="Današnji delovni čas"
            />
          </div>
          <div className="time-summary-item">
            <span className="time-summary-icon" aria-hidden="true"><CalendarDays size={19} /></span>
            <StatCard
              label="Ta teden"
              value="32 h 15 min"
              detail={today.label}
            />
          </div>
        </div>
        <Panel
          title="Časovnik za delo"
          subtitle="Ena naloga. Čas za zbrano delo."
          className="timer-panel"
        >
          <label className="timer-select">
            Trenutna naloga
            <select defaultValue="overview">
              <option value="overview">Oblikovanje pregleda projekta</option>
              <option>Načrtovanje uvajanja zaposlenih</option>
              <option>Pregled gradiv za nove sodelavce</option>
            </select>
          </label>
          <div
            className="timer-display"
            aria-label="Časovnik: nič ur, nič minut, nič sekund"
          >
            00<span>:</span>00<span>:</span>00
          </div>
          <div className="timer-buttons">
            <Button
              primary
              aria-pressed={timerPreview === "V teku"}
              onClick={() => setTimerPreview("V teku")}
            >
              <Play size={14} />
              Zaženi
            </Button>
            <Button
              aria-pressed={timerPreview === "Začasno ustavljen"}
              onClick={() => setTimerPreview("Začasno ustavljen")}
            >
              <Pause size={14} />
              Premor
            </Button>
            <Button
              aria-pressed={timerPreview === "Ustavljen"}
              onClick={() => setTimerPreview("Ustavljen")}
            >
              <Square size={13} />
              Ustavi
            </Button>
          </div>
          <span className="timer-note" role="status">
            {timerPreview}
          </span>
        </Panel>
      </div>
      <Panel
        title="Časovni zapisi"
        subtitle="Pregled opravljenega dela"
        action={<span className="muted small">5 zapisov</span>}
      >
        <TimeEntriesTable />
      </Panel>
    </>
  );
}
