import { ArrowUpRight, ChevronRight, LogOut, Workflow } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "../common/UI";

const names: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  "time-tracking": "Time tracking",
  "my-day": "My day",
  management: "Management",
  users: "Team members",
  kanban: "Task board",
  statistics: "Statistics",
};

export default function WorkspaceHeader() {
  const section = useLocation().pathname.split("/")[1];
  return (
    <header className="workspace-topbar">
      <div className="workspace-breadcrumb">
        <Workflow size={16} />
        <span>Workspace</span>
        <ChevronRight size={13} />
        <strong>{names[section] || "Overview"}</strong>
      </div>
      <div className="workspace-profile">
        <span className="preview-label">UI preview</span>
        <Link className="workspace-account-link" to="/login">
          Account
          <ArrowUpRight size={13} />
        </Link>
        <Avatar initials="AN" name="Ana Novak" />
        <Link
          to="/login"
          className="workspace-signout"
          aria-label="Go to login"
          title="Go to login"
        >
          <LogOut size={16} />
        </Link>
      </div>
    </header>
  );
}
