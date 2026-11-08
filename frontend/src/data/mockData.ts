import type { Person, Project, Task } from "../types/ui";

// Presentation fixtures only. No requests, persistence, or business calculations.
export const projects: Project[] = [
  {
    id: "website",
    name: "Prenova spletne strani",
    description:
      "Jasnejša predstavitev naše blagovne znamke. Prenova spletne strani od prvega vtisa do zadnje podrobnosti.",
    status: "V teku",
    progress: 68,
    members: ["AN", "LK", "MS"],
    start: "12. 10. 2026",
    end: "20. 11. 2026",
    tasks: 24,
  },
  {
    id: "onboarding",
    name: "Uvajanje zaposlenih",
    description:
      "Za dober začetek vsakega novega sodelavca. Preprosto uvajanje v našo rastočo ekipo.",
    status: "V teku",
    progress: 42,
    members: ["NP", "AN"],
    start: "19. 10. 2026",
    end: "27. 11. 2026",
    tasks: 18,
  },
  {
    id: "mobile",
    name: "Mobilni delovni prostor",
    description:
      "Ključne vsebine delovnega prostora na manjšem zaslonu. Zasnovano za delo na poti.",
    status: "Načrtovanje",
    progress: 16,
    members: ["LK", "MS", "TJ"],
    start: "2. 11. 2026",
    end: "18. 12. 2026",
    tasks: 32,
  },
  {
    id: "guidelines",
    name: "Smernice blagovne znamke",
    description:
      "Enotna podoba vsega, kar ustvarjamo. Dokumentacija naše identitete, načina komuniciranja in vizualnih smernic.",
    status: "Zaključeno",
    progress: 100,
    members: ["NP", "TJ"],
    start: "14. 9. 2026",
    end: "5. 11. 2026",
    tasks: 16,
  },
];

export const tasks: Task[] = [
  {
    id: "WIT-024",
    title: "Načrtovanje uvajanja zaposlenih",
    description:
      "Opredelite ključne korake za novega člana ekipe, od povabila do prvega projekta.",
    project: "Prenova spletne strani",
    status: "Za opraviti",
    priority: "Visoka",
    assignee: "AN",
    name: "Ana Novak",
    deadline: "10. 11.",
    duration: "1 h 30 min",
    comments: 3,
  },
  {
    id: "WIT-025",
    title: "Pregled strukture navigacije",
    description:
      "Preglejte predlagano strukturo strani in poenostavite dostop do najpomembnejših vsebin.",
    project: "Prenova spletne strani",
    status: "Za opraviti",
    priority: "Srednja",
    assignee: "LK",
    name: "Luka Kovač",
    deadline: "11. 11.",
    duration: "45 min",
    comments: 2,
  },
  {
    id: "WIT-026",
    title: "Priprava pregleda vsebin",
    description:
      "Pred naslednjim pregledom oblikovanja zberite vse obstoječe vsebine strani na enem mestu.",
    project: "Prenova spletne strani",
    status: "Za opraviti",
    priority: "Nizka",
    assignee: "MS",
    name: "Maja Sever",
    deadline: "13. 11.",
    duration: "2 h",
    comments: 0,
  },
  {
    id: "WIT-018",
    title: "Oblikovanje pregleda projekta",
    description:
      "Pripravite preprosto postavitev, ki ekipi omogoča jasen pregled aktivnih projektov.",
    project: "Prenova spletne strani",
    status: "V teku",
    priority: "Visoka",
    assignee: "AN",
    name: "Ana Novak",
    deadline: "9. 11.",
    duration: "2 h",
    comments: 5,
  },
  {
    id: "WIT-020",
    title: "Priprava knjižnice komponent",
    description:
      "Določite enotne gumbe, vnosna polja, kartice in razmike za novo spletno stran.",
    project: "Prenova spletne strani",
    status: "V teku",
    priority: "Srednja",
    assignee: "LK",
    name: "Luka Kovač",
    deadline: "12. 11.",
    duration: "3 h",
    comments: 4,
  },
  {
    id: "WIT-011",
    title: "Zbiranje povratnih informacij ekipe",
    description:
      "Zberite opažanja ekipe in povzemite glavne možnosti za izboljšave.",
    project: "Prenova spletne strani",
    status: "Opravljeno",
    priority: "Srednja",
    assignee: "NP",
    name: "Neža Pirc",
    deadline: "5. 11.",
    duration: "1 h",
    comments: 6,
  },
  {
    id: "WIT-014",
    title: "Določitev vizualnih smernic",
    description:
      "Dogovorite se o tipografiji, razmikih in jasnih vizualnih smernicah projekta.",
    project: "Prenova spletne strani",
    status: "Opravljeno",
    priority: "Nizka",
    assignee: "TJ",
    name: "Tim Jereb",
    deadline: "6. 11.",
    duration: "1 h 30 min",
    comments: 2,
  },
];

export const projectTasks: Record<string, Task[]> = {
  website: tasks,
  onboarding: [
    {
      ...tasks[0],
      id: "ONB-012",
      title: "Priprava vodnika za prvi teden",
      project: "Uvajanje zaposlenih",
      description:
        "V vodniku za nove sodelavce zberite ključne povezave, predstavitve in dejavnosti prvega tedna.",
    },
    {
      ...tasks[3],
      id: "ONB-009",
      title: "Pregled gradiv za nove sodelavce",
      project: "Uvajanje zaposlenih",
      description:
        "Z ekipo preglejte gradiva za nove sodelavce in poskrbite za jasna navodila za prvi dan.",
    },
    {
      ...tasks[5],
      id: "ONB-004",
      title: "Zbiranje predstavitev vodij",
      project: "Uvajanje zaposlenih",
      description:
        "Za gradivo dobrodošlice zberite kratko predstavitev vsakega vodje ekipe.",
    },
  ],
  mobile: [
    {
      ...tasks[0],
      id: "MOB-008",
      title: "Pregled mobilne navigacije",
      project: "Mobilni delovni prostor",
      description:
        "Preglejte ključne povezave in pripravite preprost načrt navigacije za manjše zaslone.",
    },
    {
      ...tasks[3],
      id: "MOB-005",
      title: "Skica mobilnega delovnega prostora",
      project: "Mobilni delovni prostor",
      description:
        "Pripravite prve žične modele mobilnega vmesnika za pogovor z ekipo.",
    },
    {
      ...tasks[5],
      id: "MOB-002",
      title: "Dokumentiranje zahtev za mobilni vmesnik",
      project: "Mobilni delovni prostor",
      description:
        "Povzemite ključne zaslone in zahteve glede dostopnosti mobilnega vmesnika.",
    },
  ],
  guidelines: [
    {
      ...tasks[5],
      id: "BRD-010",
      title: "Dokumentiranje vizualnega sistema",
      project: "Smernice blagovne znamke",
      description:
        "V skupnem dokumentu zberite potrjeno tipografijo, razmike in vizualna načela.",
    },
    {
      ...tasks[6],
      id: "BRD-016",
      title: "Deljenje priročnika blagovne znamke",
      project: "Smernice blagovne znamke",
      description:
        "Pripravite končni priročnik in z ekipo delite referenčna gradiva.",
    },
  ],
};

export const people: Person[] = [
  {
    name: "Ana Novak",
    initials: "AN",
    email: "ana.novak@workit.example",
    role: "Zaposleni",
    projects: "Prenova spletne strani, uvajanje zaposlenih",
    assigned: 12,
    completed: 8,
    hours: "32 h 15 min",
    status: "Aktiven",
  },
  {
    name: "Luka Kovač",
    initials: "LK",
    email: "luka.kovac@workit.example",
    role: "Vodja projekta",
    projects: "Prenova spletne strani, mobilni delovni prostor",
    assigned: 10,
    completed: 7,
    hours: "35 h 30 min",
    status: "Aktiven",
  },
  {
    name: "Maja Sever",
    initials: "MS",
    email: "maja.sever@workit.example",
    role: "Zaposleni",
    projects: "Prenova spletne strani, mobilni delovni prostor",
    assigned: 9,
    completed: 5,
    hours: "30 h 45 min",
    status: "Aktiven",
  },
  {
    name: "Neža Pirc",
    initials: "NP",
    email: "neza.pirc@workit.example",
    role: "Vodja podjetja",
    projects: "Uvajanje zaposlenih, smernice blagovne znamke",
    assigned: 8,
    completed: 6,
    hours: "34 h 00 min",
    status: "Aktiven",
  },
  {
    name: "Tim Jereb",
    initials: "TJ",
    email: "tim.jereb@workit.example",
    role: "Zaposleni",
    projects: "Mobilni delovni prostor, smernice blagovne znamke",
    assigned: 7,
    completed: 4,
    hours: "28 h 30 min",
    status: "Aktiven",
  },
  {
    name: "Eva Zupan",
    initials: "EZ",
    email: "eva.zupan@workit.example",
    role: "Zaposleni",
    projects: "Uvajanje zaposlenih",
    assigned: 0,
    completed: 0,
    hours: "0 h 00 min",
    status: "Povabljen",
  },
];

export const timeEntries = [
  {
    date: "7. 11. 2026",
    project: "Prenova spletne strani",
    task: "Oblikovanje pregleda projekta",
    start: "09:00",
    end: "11:15",
    duration: "2 h 15 min",
  },
  {
    date: "7. 11. 2026",
    project: "Uvajanje zaposlenih",
    task: "Pregled gradiv za nove sodelavce",
    start: "11:30",
    end: "12:45",
    duration: "1 h 15 min",
  },
  {
    date: "6. 11. 2026",
    project: "Prenova spletne strani",
    task: "Določitev vizualnih smernic",
    start: "09:00",
    end: "12:00",
    duration: "3 h 00 min",
  },
  {
    date: "6. 11. 2026",
    project: "Prenova spletne strani",
    task: "Zbiranje povratnih informacij ekipe",
    start: "13:00",
    end: "15:30",
    duration: "2 h 30 min",
  },
  {
    date: "5. 11. 2026",
    project: "Uvajanje zaposlenih",
    task: "Priprava seznama za uvajanje",
    start: "09:30",
    end: "12:00",
    duration: "2 h 30 min",
  },
];

export const dailyTasks = [
  {
    title: "Pregled včerajšnjih pripomb k oblikovanju",
    project: "Prenova spletne strani",
    time: "09:00",
    duration: "30 min",
    priority: "Srednja",
    done: true,
  },
  {
    title: "Oblikovanje pregleda projekta",
    project: "Prenova spletne strani",
    time: "09:30",
    duration: "2 h",
    priority: "Visoka",
    done: true,
  },
  {
    title: "Pregled gradiv za nove sodelavce",
    project: "Uvajanje zaposlenih",
    time: "11:30",
    duration: "1 h 15 min",
    priority: "Srednja",
    done: false,
  },
  {
    title: "Načrtovanje uvajanja zaposlenih",
    project: "Prenova spletne strani",
    time: "14:00",
    duration: "1 h 30 min",
    priority: "Visoka",
    done: false,
  },
  {
    title: "Branje poglavja knjige Creative Confidence",
    project: "Neopredeljeno",
    time: "16:00",
    duration: "30 min",
    priority: "Nizka",
    done: false,
  },
];
