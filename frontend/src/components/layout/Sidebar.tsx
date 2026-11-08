import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Settings, LogOut } from "lucide-react";
import { roleNavigation } from "../../data/roleNavigation";
import { useMockUser } from "../../context/MockUserContext";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const { user } = useMockUser();
  const navItems = roleNavigation.filter((item) =>
    item.roles.includes(user.roleId),
  );

  return (
    <aside className={`sidebar ${expanded ? "expanded" : ""}`}>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setExpanded((value) => !value)}
        aria-label={expanded ? "Skrči navigacijo" : "Razširi navigacijo"}
        aria-expanded={expanded}
        aria-controls="sidebar-navigation"
      >
        <Menu size={20} />
      </button>

      <nav
        id="sidebar-navigation"
        className="sidebar-nav"
        aria-label="Glavna navigacija"
      >
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
            <span className="sidebar-icon">
              <Icon size={19} />
            </span>
            {expanded && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          title="Nastavitve"
          aria-label="Nastavitve"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">
            <Settings size={19} />
          </span>
          {expanded && <span>Nastavitve</span>}
        </NavLink>
        <NavLink
          to="/login"
          title="Odjava"
          aria-label="Odjava"
          className="sidebar-link"
        >
          <span className="sidebar-icon">
            <LogOut size={19} />
          </span>
          {expanded && <span>Odjava</span>}
        </NavLink>
      </div>
    </aside>
  );
}
