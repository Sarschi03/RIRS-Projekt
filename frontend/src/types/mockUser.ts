export type MockRole = "employee" | "project-manager" | "company-manager";

export interface MockUser {
  id: string;
  roleId: MockRole;
  roleLabel: string;
  name: string;
  firstName: string;
  initials: string;
  email: string;
  jobTitle: string;
  dashboard: {
    assigned: string;
    inProgress: string;
    completed: string;
    hoursToday: string;
    hoursWeek: string;
  };
}
