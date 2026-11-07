import { ArrowUpRight, Clock3, Folder, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Button,
  PageHeading,
  Panel,
  Progress,
  StatCard,
} from "../components/common/UI";
import HoursChart from "../components/common/HoursChart";
import EmployeeTable from "../components/management/EmployeeTable";
import { projects } from "../data/mockData";

export default function ManagementPage() {
  return (
    <>
      <PageHeading
        eyebrow="THE BIGGER PICTURE"
        title="Team overview"
        description="A shared view of your people, projects, and progress."
        action={
          <Link className="ui-button" to="/users">
            <Users size={16} />
            Manage team
            <ArrowUpRight size={14} />
          </Link>
        }
      />
      <div className="stats-grid">
        <StatCard
          label="Active projects"
          value="3"
          detail="1 project completed this month"
          icon={<Folder size={18} />}
        />
        <StatCard
          label="Team members"
          value="6"
          detail="5 active · 1 invitation pending"
          icon={<Users size={18} />}
        />
        <StatCard
          label="Overall progress"
          value="57%"
          detail="Across all active projects"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="Recorded hours"
          value="161h"
          detail="Team total this week"
          icon={<Clock3 size={18} />}
        />
      </div>
      <div className="dashboard-grid">
        <Panel
          title="Project progress"
          subtitle="A little closer to the finish line"
        >
          <div className="management-progress">
            {projects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <div>
                  <strong>{project.name}</strong>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} label={project.name} />
                <span className="muted small">Due {project.end}</span>
              </Link>
            ))}
          </div>
        </Panel>
        <Panel
          title="Hours across the week"
          subtitle="A sample of Ana’s working rhythm"
        >
          <HoursChart />
        </Panel>
      </div>
      <div className="attention-grid">
        <Panel
          title="Needs a little attention"
          subtitle="A few things to keep an eye on"
        >
          <div className="attention-item">
            <span className="attention-mark">!</span>
            <div>
              <strong>Mobile workspace</strong>
              <p>Scope review is waiting for manager feedback.</p>
              <span className="small muted">Overdue · November 6</span>
            </div>
            <Link to="/projects/mobile" aria-label="View Mobile workspace">
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </Panel>
        <Panel title="Next project deadline" subtitle="Coming into focus">
          <div className="attention-item">
            <span className="date-tile">
              <span>NOV</span>
              <strong>20</strong>
            </span>
            <div>
              <strong>Website redesign</strong>
              <p>Final design review and handoff</p>
              <span className="small muted">68% complete · 3 team members</span>
            </div>
            <Link to="/projects/website" aria-label="View Website redesign">
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </Panel>
      </div>
      <Panel
        title="People & progress"
        subtitle="The work behind the numbers"
        action={
          <Link className="text-link" to="/users">
            View team
            <ArrowUpRight size={14} />
          </Link>
        }
      >
        <EmployeeTable />
      </Panel>
      <div className="quick-actions">
        <Button icon>Create project</Button>
        <Button icon>Assign tasks</Button>
        <Button icon>Add project instructions</Button>
      </div>
    </>
  );
}
