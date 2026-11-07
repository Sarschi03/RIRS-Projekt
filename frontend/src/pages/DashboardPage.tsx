import {
  CheckCheck,
  Clock3,
  ListTodo,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeading, Panel, StatCard } from "../components/common/UI";
import {
  ActiveProjects,
  Deadlines,
  RecentActivity,
} from "../components/dashboard/OverviewSections";
import DailyChecklist from "../components/my-day/DailyChecklist";

export default function DashboardPage() {
  return (
    <>
      <PageHeading
        eyebrow="YOUR WORKSPACE, AT A GLANCE"
        title="A little clarity for your day."
        description="Good morning, Ana. Here’s what’s happening with your work."
        action={<span className="date-label">Saturday, November 7</span>}
      />
      <div className="stats-grid">
        <StatCard
          label="Assigned tasks"
          value="12"
          detail="Across 2 active projects"
          icon={<ListTodo size={18} />}
        />
        <StatCard
          label="In progress"
          value="4"
          detail="One thing at a time"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="Completed tasks"
          value="8"
          detail="3 completed this week"
          icon={<CheckCheck size={18} />}
        />
        <StatCard
          label="Hours today"
          value="3h 30m"
          detail="32h 15m this week"
          icon={<Clock3 size={18} />}
        />
      </div>
      <div className="dashboard-grid">
        <div className="section-stack">
          <ActiveProjects />
          <Panel
            title="Today’s plan"
            subtitle="Your priorities, in one place"
            action={
              <Link className="text-link" to="/my-day">
                My day
                <ArrowUpRight size={14} />
              </Link>
            }
          >
            <DailyChecklist compact />
          </Panel>
        </div>
        <div className="section-stack">
          <Deadlines />
          <RecentActivity />
        </div>
      </div>
    </>
  );
}
