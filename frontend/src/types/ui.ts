export interface Person {
  name: string;
  initials: string;
  email: string;
  role: "Employee" | "Project Manager" | "Company Manager";
  projects: string;
  assigned: number;
  completed: number;
  hours: string;
  status: "Active" | "Invited";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  members: string[];
  start: string;
  end: string;
  tasks: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  assignee: string;
  name: string;
  deadline: string;
  duration: string;
  comments: number;
}
