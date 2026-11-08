import type { MockUser } from "../types/mockUser";

// Presentation-only identities. These do not represent authenticated sessions.
export const mockUsers: MockUser[] = [
  {
    id: "ana",
    roleId: "employee",
    roleLabel: "Zaposleni",
    name: "Ana Novak",
    firstName: "Ana",
    initials: "AN",
    email: "ana.novak@workit.example",
    jobTitle: "Oblikovalka uporabniške izkušnje",
    dashboard: {
      assigned: "12",
      inProgress: "4",
      completed: "8",
      hoursToday: "3 h 30 min",
      hoursWeek: "32 h 15 min",
    },
  },
  {
    id: "luka",
    roleId: "project-manager",
    roleLabel: "Vodja projekta",
    name: "Luka Kovač",
    firstName: "Luka",
    initials: "LK",
    email: "luka.kovac@workit.example",
    jobTitle: "Vodja projekta",
    dashboard: {
      assigned: "10",
      inProgress: "3",
      completed: "7",
      hoursToday: "4 h",
      hoursWeek: "35 h 30 min",
    },
  },
  {
    id: "neza",
    roleId: "company-manager",
    roleLabel: "Vodja podjetja",
    name: "Neža Pirc",
    firstName: "Neža",
    initials: "NP",
    email: "neza.pirc@workit.example",
    jobTitle: "Vodja podjetja",
    dashboard: {
      assigned: "8",
      inProgress: "2",
      completed: "6",
      hoursToday: "4 h 30 min",
      hoursWeek: "34 h",
    },
  },
];
