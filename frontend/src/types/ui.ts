export interface Person {
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
}
