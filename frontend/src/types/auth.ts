export type RoleId = "employee" | "project-manager" | "company-manager";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roleId: RoleId;
}
