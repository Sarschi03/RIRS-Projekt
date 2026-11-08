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
import { useMockUser } from "../context/MockUserContext";

export default function ManagementPage() {
  const { user } = useMockUser();
  const showUsers = user.roleId === "company-manager";
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
          value="3"
          detail="Ta mesec zaključen 1 projekt"
          icon={<Folder size={18} />}
        />
        <StatCard
          label="Člani ekipe"
          value="6"
          detail="5 aktivnih članov · 1 poslano povabilo"
          icon={<Users size={18} />}
        />
        <StatCard
          label="Skupni napredek"
          value="57%"
          detail="Na vseh aktivnih projektih"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="Zabeležene ure"
          value="161 h"
          detail="Skupaj za ekipo ta teden"
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
          <HoursChart />
        </Panel>
      </div>
      <div className="attention-grid">
        <Panel
          title="Potrebuje pozornost"
          subtitle="Zadeve, ki jih je treba spremljati"
        >
          <div className="attention-item">
            <span className="attention-mark">!</span>
            <div>
              <strong>Mobilni delovni prostor</strong>
              <p>Pregled obsega projekta čaka na pripombe vodje.</p>
              <span className="small muted">Zapadlo · 6. november</span>
            </div>
            <Link
              to="/projects/mobile"
              aria-label="Odpri mobilni delovni prostor"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </Panel>
        <Panel title="Naslednji rok projekta" subtitle="Približuje se rok">
          <div className="attention-item">
            <span className="date-tile">
              <span>NOV</span>
              <strong>20</strong>
            </span>
            <div>
              <strong>Prenova spletne strani</strong>
              <p>Končni pregled oblikovanja in predaja</p>
              <span className="small muted">
                68 % zaključeno · 3 člani ekipe
              </span>
            </div>
            <Link
              to="/projects/website"
              aria-label="Odpri prenovo spletne strani"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
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
        <EmployeeTable />
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
