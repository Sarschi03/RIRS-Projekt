import { Button, PageHeading } from "../components/common/UI";
import DailyChecklist from "../components/my-day/DailyChecklist";
import DayCalendar from "../components/my-day/DayCalendar";
import DayHighlights from "../components/my-day/DayHighlights";

export default function MyDayPage() {
  return (
    <>
      <PageHeading
        title="Moj dan"
        description="Načrtujte svoj dan in namenite čas najpomembnejšim nalogam."
        action={
          <Button primary icon action="daily-task">
            Dodaj nalogo
          </Button>
        }
      />
      <div className="my-day-overview">
        <DayCalendar />
        <DayHighlights />
      </div>
      <section className="my-day-tasks" aria-labelledby="my-day-tasks-title">
        <header className="my-day-tasks-heading">
          <h2 id="my-day-tasks-title">Današnje naloge</h2>
          <p>Naloge, ki ste jih načrtovali za danes</p>
        </header>
        <DailyChecklist simple />
      </section>
    </>
  );
}
