export interface Person {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: "Zaposleni" | "Vodja projekta" | "Vodja podjetja";
  projects: string;
  assigned: number;
  completed: number;
  hours: string;
  status: "Aktiven" | "Povabljen";
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
  managerId: string;
  managerName: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  status: "Za opraviti" | "V teku" | "Opravljeno";
  priority: "Visoka" | "Srednja" | "Nizka";
  assignee: string;
  name: string;
  deadline: string;
  duration: string;
  comments: number;
  databaseId: number;
  projectId: string;
  instructions?: string;
}

export interface TimeEntry { id: number; date: string; dateTime: string; project: string; task: string; start: string; end: string; duration: string; durationMinutes: number; }
export interface DailyTask { id: number; title: string; description: string; project: string; time: string; duration: string; priority: string; done: boolean; }
