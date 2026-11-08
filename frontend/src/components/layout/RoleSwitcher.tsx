import { useLocation, useNavigate } from "react-router-dom";
import { useMockUser } from "../../context/MockUserContext";
import { mockUsers } from "../../data/mockUsers";
import type { MockRole } from "../../types/mockUser";

export default function RoleSwitcher() {
  const { user, setRole } = useMockUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <label className="role-switcher">
      <span>Vloga</span>
      <select
        aria-label="Izberi uporabniško vlogo"
        value={user.roleId}
        onChange={(event) => {
          const role = event.target.value as MockRole;
          setRole(role);
          // Return to a shared screen when changing the navigation preview.
          // Direct URLs remain available; this is not an authorization boundary.
          if (
            (pathname === "/users" && role !== "company-manager") ||
            (["/management", "/statistics"].includes(pathname) &&
              role === "employee")
          )
            navigate("/dashboard");
        }}
      >
        {mockUsers.map((profile) => (
          <option key={profile.id} value={profile.roleId}>
            {profile.roleLabel} — {profile.name}
          </option>
        ))}
      </select>
    </label>
  );
}
