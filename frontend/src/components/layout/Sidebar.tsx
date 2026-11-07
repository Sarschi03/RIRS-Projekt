
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Workflow,
  Menu,
  LayoutDashboard,
  FolderKanban,
  Clock3,
  ListTodo,
  ChartNoAxesCombined,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Nadzorna plošča", path: "/dashboard", icon: LayoutDashboard },
  { label: "Projekti", path: "/projects", icon: FolderKanban },
  { label: "Evidenca časa", path: "/time-tracking", icon: Clock3 },
  { label: "Moj dan", path: "/my-day", icon: ListTodo },
  { label: "Vodstvo", path: "/management", icon: ChartNoAxesCombined },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className={`sidebar ${expanded ? "expanded" : ""}`}>
      <div className="sidebar-logo">
        <Workflow size={24} />
      </div>

      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setExpanded((value) => !value)}
        aria-label={expanded ? "Skrči navigacijo" : "Razširi navigacijo"}
        aria-expanded={expanded}
        aria-controls="sidebar-navigation"
      >
        <Menu size={22} />
      </button>

      <nav id="sidebar-navigation" className="sidebar-nav" aria-label="Glavna navigacija">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            title={label}
            aria-label={label}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={21} />
            {expanded && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <Settings size={21} />
      </div>
    </aside>
  );
}
