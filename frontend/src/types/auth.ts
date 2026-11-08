export type RoleId = "employee" | "project-manager" | "company-manager";

export interface AuthUser {
  id: string;
  name: string;
  firstName: string;
  initials: string;
  email: string;
  roleId: RoleId;
  roleLabel: string;
  jobTitle: string;
}
