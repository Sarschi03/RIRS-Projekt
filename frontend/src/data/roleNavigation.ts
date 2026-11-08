import {
  ChartNoAxesCombined,
  Clock3,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { RoleId } from "../types/auth";

const allRoles: RoleId[] = ["employee", "project-manager", "company-manager"];

export const roleNavigation: {
  label: string;
  path: string;
  icon: LucideIcon;
  roles: RoleId[];
}[] = [
  {
    label: "Nadzorna plošča",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: allRoles,
  },
  { label: "Projekti", path: "/projects", icon: FolderKanban, roles: allRoles },
  {
    label: "Evidenca časa",
    path: "/time-tracking",
    icon: Clock3,
    roles: allRoles,
  },
  { label: "Moj dan", path: "/my-day", icon: ListTodo, roles: allRoles },
  {
    label: "Vodstvo",
    path: "/management",
    icon: ChartNoAxesCombined,
    roles: ["project-manager", "company-manager"],
  },
  {
    label: "Uporabniki",
    path: "/users",
    icon: UsersRound,
    roles: ["company-manager"],
  },
];
