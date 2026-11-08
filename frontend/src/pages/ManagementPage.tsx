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
import { useAppData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

export default function ManagementPage() {
  const { user } = useAuth();
  const { data } = useAppData();
  const projects = data.projects;
  const showUsers = user?.roleId === "company-manager";
  return (
    <>
      <PageHeading
        title="Pregled ekipe"
        description="Skupen pregled zaposlenih, projektov in napredka."
        action={
          showUsers && (
            <Link className="ui-button" to="/users">
              <Users size={16} />
              Uredi ekipo
              <ArrowUpRight size={14} />
            </Link>
          )
        }
      />
      <div className="stats-grid">
        <StatCard
          label="Aktivni projekti"
          value={String(projects.filter((item) => item.status !== "Zaključeno").length)}
          detail="Projekti, ki so trenutno v delu"
          icon={<Folder size={18} />}
        />
        <StatCard
          label="Člani ekipe"
          value={String(data.people.length)}
          detail="Aktivni člani projektnih ekip"
          icon={<Users size={18} />}
        />
        <StatCard
          label="Skupni napredek"
          value={`${projects.length ? Math.round(projects.reduce((sum, item) => sum + item.progress, 0) / projects.length) : 0}%`}
          detail="Na vseh aktivnih projektih"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="Zabeležene ure"
          value={`${Math.floor(data.timeEntries.reduce((sum, item) => sum + item.durationMinutes, 0) / 60)} h`}
          detail="Vaši zabeleženi vnosi"
          icon={<Clock3 size={18} />}
        />
      </div>
      <div className="dashboard-grid">
        <Panel title="Napredek projekta" subtitle="Korak bližje cilju">
          <div className="management-progress">
            {projects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <div>
                  <strong>{project.name}</strong>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} label={project.name} />
                <span className="muted small">Rok {project.end}</span>
              </Link>
            ))}
          </div>
        </Panel>
        <Panel
          title="Ure po dnevih v tednu"
          subtitle="Vzorec Aninega delovnega ritma"
        >
          <HoursChart entries={data.timeEntries} />
        </Panel>
      </div>
      <Panel
        title="Ekipa in napredek"
        subtitle="Delo, ki stoji za številkami"
        action={
          showUsers && (
            <Link className="text-link" to="/users">
              Prikaži ekipo
              <ArrowUpRight size={14} />
            </Link>
          )
        }
      >
        <EmployeeTable members={data.people} />
      </Panel>
      <div className="quick-actions">
        <Button icon action="project">
          Ustvari projekt
        </Button>
        <Button icon action="assign">
          Dodeli naloge
        </Button>
        <Button icon action="instructions">
          Dodaj navodila za projekt
        </Button>
      </div>
    </>
  );
}
