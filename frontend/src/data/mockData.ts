import type { Person, Project, Task } from "../types/ui";

// Presentation fixtures only. No requests, persistence, or business calculations.
export const projects: Project[] = [
  {
    id: "website",
    name: "Website redesign",
    description:
      "A clearer, more thoughtful home for our brand. Refreshing the website from first impression to final detail.",
    status: "In progress",
    progress: 68,
    members: ["AN", "LK", "MS"],
    start: "Oct 12, 2026",
    end: "Nov 20, 2026",
    tasks: 24,
  },
  {
    id: "onboarding",
    name: "Employee onboarding",
    description:
      "Making every first day a good one. A simple onboarding experience for our growing team.",
    status: "In progress",
    progress: 42,
    members: ["NP", "AN"],
    start: "Oct 19, 2026",
    end: "Nov 27, 2026",
    tasks: 18,
  },
  {
    id: "mobile",
    name: "Mobile workspace",
    description:
      "Bringing the essentials of our workspace to a smaller screen. Designed for work on the move.",
    status: "Planning",
    progress: 16,
    members: ["LK", "MS", "TJ"],
    start: "Nov 2, 2026",
    end: "Dec 18, 2026",
    tasks: 32,
  },
  {
    id: "guidelines",
    name: "Brand guidelines",
    description:
      "One shared language for everything we create. Documenting our identity, voice, and visual system.",
    status: "Completed",
    progress: 100,
    members: ["NP", "TJ"],
    start: "Sep 14, 2026",
    end: "Nov 5, 2026",
    tasks: 16,
  },
];

export const tasks: Task[] = [
  {
    id: "WIT-024",
    title: "Map the onboarding journey",
    description:
      "Outline the key touchpoints for a new team member, from invitation to their first project.",
    project: "Website redesign",
    status: "To Do",
    priority: "High",
    assignee: "AN",
    name: "Ana Novak",
    deadline: "Nov 10",
    duration: "1h 30m",
    comments: 3,
  },
  {
    id: "WIT-025",
    title: "Review navigation structure",
    description:
      "Review the proposed sitemap and simplify the paths to our most important content.",
    project: "Website redesign",
    status: "To Do",
    priority: "Medium",
    assignee: "LK",
    name: "Luka Kovač",
    deadline: "Nov 11",
    duration: "45m",
    comments: 2,
  },
  {
    id: "WIT-026",
    title: "Prepare content inventory",
    description:
      "Bring all existing page content together in one place before the next design review.",
    project: "Website redesign",
    status: "To Do",
    priority: "Low",
    assignee: "MS",
    name: "Maja Sever",
    deadline: "Nov 13",
    duration: "2h",
    comments: 0,
  },
  {
    id: "WIT-018",
    title: "Design the project overview",
    description:
      "Explore a simple layout that gives the team a clear picture of their active projects.",
    project: "Website redesign",
    status: "In Progress",
    priority: "High",
    assignee: "AN",
    name: "Ana Novak",
    deadline: "Nov 9",
    duration: "2h",
    comments: 5,
  },
  {
    id: "WIT-020",
    title: "Build the component library",
    description:
      "Define consistent buttons, inputs, cards, and spacing for the new website.",
    project: "Website redesign",
    status: "In Progress",
    priority: "Medium",
    assignee: "LK",
    name: "Luka Kovač",
    deadline: "Nov 12",
    duration: "3h",
    comments: 4,
  },
  {
    id: "WIT-011",
    title: "Collect team feedback",
    description:
      "Gather observations from the team and summarize the main opportunities.",
    project: "Website redesign",
    status: "Done",
    priority: "Medium",
    assignee: "NP",
    name: "Neža Pirc",
    deadline: "Nov 5",
    duration: "1h",
    comments: 6,
  },
  {
    id: "WIT-014",
    title: "Define the visual direction",
    description:
      "Agree on typography, spacing, and a focused visual language for the project.",
    project: "Website redesign",
    status: "Done",
    priority: "Low",
    assignee: "TJ",
    name: "Tim Jereb",
    deadline: "Nov 6",
    duration: "1h 30m",
    comments: 2,
  },
];

export const projectTasks: Record<string, Task[]> = {
  website: tasks,
  onboarding: [
    {
      ...tasks[0],
      id: "ONB-012",
      title: "Prepare the first-week guide",
      project: "Employee onboarding",
      description:
        "Bring essential links, introductions, and first-week activities into a welcoming guide.",
    },
    {
      ...tasks[3],
      id: "ONB-009",
      title: "Review welcome materials",
      project: "Employee onboarding",
      description:
        "Review the welcome pack with the team and make the first-day instructions clear.",
    },
    {
      ...tasks[5],
      id: "ONB-004",
      title: "Collect manager introductions",
      project: "Employee onboarding",
      description:
        "Gather a short introduction from every team lead for the welcome pack.",
    },
  ],
  mobile: [
    {
      ...tasks[0],
      id: "MOB-008",
      title: "Review mobile navigation",
      project: "Mobile workspace",
      description:
        "Explore the essential routes and make a simple navigation map for smaller screens.",
    },
    {
      ...tasks[3],
      id: "MOB-005",
      title: "Sketch the mobile workspace",
      project: "Mobile workspace",
      description:
        "Prepare a first set of mobile wireframes for the team to discuss.",
    },
    {
      ...tasks[5],
      id: "MOB-002",
      title: "Document mobile requirements",
      project: "Mobile workspace",
      description:
        "Summarize the essential screens and accessibility requirements for the mobile experience.",
    },
  ],
  guidelines: [
    {
      ...tasks[5],
      id: "BRD-010",
      title: "Document the visual system",
      project: "Brand guidelines",
      description:
        "Collect the approved typography, spacing, and visual principles in one shared document.",
    },
    {
      ...tasks[6],
      id: "BRD-016",
      title: "Share the brand handbook",
      project: "Brand guidelines",
      description:
        "Prepare the final handbook and share the reference materials with the team.",
    },
  ],
};

export const people: Person[] = [
  {
    name: "Ana Novak",
    initials: "AN",
    email: "ana.novak@workit.example",
    role: "Employee",
    projects: "Website redesign, Onboarding",
    assigned: 12,
    completed: 8,
    hours: "32h 15m",
    status: "Active",
  },
  {
    name: "Luka Kovač",
    initials: "LK",
    email: "luka.kovac@workit.example",
    role: "Project Manager",
    projects: "Website redesign, Mobile",
    assigned: 10,
    completed: 7,
    hours: "35h 30m",
    status: "Active",
  },
  {
    name: "Maja Sever",
    initials: "MS",
    email: "maja.sever@workit.example",
    role: "Employee",
    projects: "Website redesign, Mobile",
    assigned: 9,
    completed: 5,
    hours: "30h 45m",
    status: "Active",
  },
  {
    name: "Neža Pirc",
    initials: "NP",
    email: "neza.pirc@workit.example",
    role: "Company Manager",
    projects: "Onboarding, Brand guidelines",
    assigned: 8,
    completed: 6,
    hours: "34h 00m",
    status: "Active",
  },
  {
    name: "Tim Jereb",
    initials: "TJ",
    email: "tim.jereb@workit.example",
    role: "Employee",
    projects: "Mobile, Brand guidelines",
    assigned: 7,
    completed: 4,
    hours: "28h 30m",
    status: "Active",
  },
  {
    name: "Eva Zupan",
    initials: "EZ",
    email: "eva.zupan@workit.example",
    role: "Employee",
    projects: "Employee onboarding",
    assigned: 0,
    completed: 0,
    hours: "0h 00m",
    status: "Invited",
  },
];

export const timeEntries = [
  {
    date: "Nov 7, 2026",
    project: "Website redesign",
    task: "Design the project overview",
    start: "09:00",
    end: "11:15",
    duration: "2h 15m",
  },
  {
    date: "Nov 7, 2026",
    project: "Employee onboarding",
    task: "Review welcome materials",
    start: "11:30",
    end: "12:45",
    duration: "1h 15m",
  },
  {
    date: "Nov 6, 2026",
    project: "Website redesign",
    task: "Define the visual direction",
    start: "09:00",
    end: "12:00",
    duration: "3h 00m",
  },
  {
    date: "Nov 6, 2026",
    project: "Website redesign",
    task: "Collect team feedback",
    start: "13:00",
    end: "15:30",
    duration: "2h 30m",
  },
  {
    date: "Nov 5, 2026",
    project: "Employee onboarding",
    task: "Prepare onboarding checklist",
    start: "09:30",
    end: "12:00",
    duration: "2h 30m",
  },
];

export const dailyTasks = [
  {
    title: "Review yesterday’s design feedback",
    project: "Website redesign",
    time: "09:00",
    duration: "30m",
    priority: "Medium",
    done: true,
  },
  {
    title: "Design the project overview",
    project: "Website redesign",
    time: "09:30",
    duration: "2h",
    priority: "High",
    done: true,
  },
  {
    title: "Review welcome materials",
    project: "Employee onboarding",
    time: "11:30",
    duration: "1h 15m",
    priority: "Medium",
    done: false,
  },
  {
    title: "Map the onboarding journey",
    project: "Website redesign",
    time: "14:00",
    duration: "1h 30m",
    priority: "High",
    done: false,
  },
  {
    title: "Read a chapter of Creative Confidence",
    project: "Personal",
    time: "16:00",
    duration: "30m",
    priority: "Low",
    done: false,
  },
];
