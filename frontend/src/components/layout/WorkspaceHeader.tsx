import { ChevronRight, UserRound, Workflow } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import RoleSwitcher from "./RoleSwitcher";
import { useMockUser } from "../../context/MockUserContext";

const names: Record<string, string> = {
  dashboard: "Nadzorna plošča",
  projects: "Projekti",
  "time-tracking": "Evidenca časa",
  "my-day": "Moj dan",
  management: "Vodstvo",
  users: "Člani ekipe",
  kanban: "Kanban",
  statistics: "Statistika",
  settings: "Nastavitve",
  profile: "Profil",
};

export default function WorkspaceHeader() {
  const { profileImage, user } = useMockUser();
  const section = useLocation().pathname.split("/")[1];
  return (
    <header className="workspace-topbar">
      <div className="workspace-breadcrumb">
        <Workflow size={16} />
        <span>Delovni prostor</span>
        <ChevronRight size={13} />
        <strong>{names[section] || "Pregled"}</strong>
      </div>
      <div className="workspace-role-controls">
        <RoleSwitcher />
        {section !== "profile" && (
          <div className="workspace-profile">
            <Link
              to="/profile"
              className="workspace-profile-link"
              aria-label="Odpri svoj profil"
              title="Odpri svoj profil"
            >
              {profileImage ? <img className="workspace-profile-photo" src={profileImage} alt={`Profilna slika: ${user.name}`} /> : <UserRound size={21} />}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
