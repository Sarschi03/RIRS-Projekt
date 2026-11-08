import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Panel } from "../components/common/UI";
import DashboardHero from '../components/dashboard/DashboardHero';
import {
  ActiveProjects,
  Deadlines,
  RecentActivity,
} from "../components/dashboard/OverviewSections";
import DailyChecklist from "../components/my-day/DailyChecklist";

export default function DashboardPage() {
  return (
    <>
      <DashboardHero />
      <div className="dashboard-grid">
        <div className="section-stack">
          <ActiveProjects />
          <Panel
            title="Današnji načrt"
            subtitle="Vaše prednostne naloge na enem mestu"
            action={
              <Link className="text-link" to="/my-day">
                Moj dan
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
