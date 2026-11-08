import DashboardHero from '../components/dashboard/DashboardHero';
import {
  ActiveProjects,
  Deadlines,
} from "../components/dashboard/OverviewSections";

export default function DashboardPage() {
  return (
    <>
      <DashboardHero />
      <div className="dashboard-grid">
        <ActiveProjects />
        <Deadlines />
      </div>
    </>
  );
}
