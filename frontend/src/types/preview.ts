import type { Person, Project, Task } from "./ui";

export type PreviewKind =
  | "task"
  | "daily-task"
  | "project"
  | "project-members"
  | "manual-time"
  | "employee"
  | "assign"
  | "instructions"
  | "upload"
  | "filter"
  | "week"
  | "project-options"
  | "column-options"
  | "task-details"
  | "file-preview";
export interface PreviewAction {
  kind: PreviewKind;
  project?: Project;
  task?: Task;
  person?: Person;
  status?: Task["status"];
  title?: string;
}
