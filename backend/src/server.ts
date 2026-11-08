import "dotenv/config";
import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import { Priority, ProjectStatus, Role, TaskStatus } from "../generated/prisma/client.js";
import { createToken, requireAuth } from "./auth.js";
import type { AuthRequest } from "./auth.js";
import { prisma } from "./db.js";

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

const roleId = {
  [Role.EMPLOYEE]: "employee",
  [Role.PROJECT_MANAGER]: "project-manager",
  [Role.COMPANY_MANAGER]: "company-manager",
} as const;
const roleLabel = { [Role.EMPLOYEE]: "Zaposleni", [Role.PROJECT_MANAGER]: "Vodja projekta", [Role.COMPANY_MANAGER]: "Vodja podjetja" } as const;
const projectStatus = { [ProjectStatus.PLANNING]: "Načrtovanje", [ProjectStatus.IN_PROGRESS]: "V teku", [ProjectStatus.COMPLETED]: "Zaključeno" } as const;
const taskStatus = { [TaskStatus.TODO]: "Za opraviti", [TaskStatus.IN_PROGRESS]: "V teku", [TaskStatus.DONE]: "Opravljeno" } as const;
const priorityLabel = { [Priority.LOW]: "Nizka", [Priority.MEDIUM]: "Srednja", [Priority.HIGH]: "Visoka" } as const;

function initials(name: string) { return name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(); }
function formatDate(value: Date | null) { return value ? new Intl.DateTimeFormat("sl-SI").format(value) : "—"; }
function durationLabel(minutes: number | null) {
  if (!minutes) return "0 min";
  const hours = Math.floor(minutes / 60), rest = minutes % 60;
  return `${hours ? `${hours} h` : ""}${hours && rest ? " " : ""}${rest ? `${rest} min` : ""}`;
}
function projectScope(user: { id: number; role: Role }) {
  if (user.role === Role.COMPANY_MANAGER) return {};
  if (user.role === Role.PROJECT_MANAGER) return { OR: [{ managerId: user.id }, { members: { some: { userId: user.id } } }] };
  return { members: { some: { userId: user.id } } };
}

function publicUser(user: { id: number; name: string; email: string; role: Role }) {
  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
    roleId: roleId[user.role],
    roleLabel: roleLabel[user.role],
    firstName: user.name.split(" ")[0],
    initials: initials(user.name),
    jobTitle: roleLabel[user.role],
  };
}

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body as Record<string, string>;
  const normalizedEmail = email?.trim().toLowerCase();
  const selectedRole = Object.values(Role).includes(role as Role)
    ? (role as Role)
    : Role.EMPLOYEE;

  if (!name?.trim() || !normalizedEmail || !password || password.length < 8) {
    res.status(400).json({ message: "Vnesite ime, veljaven e-naslov in geslo z najmanj 8 znaki." });
    return;
  }
  if (await prisma.user.findUnique({ where: { email: normalizedEmail } })) {
    res.status(409).json({ message: "Račun s tem e-naslovom že obstaja." });
    return;
  }

  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(password, 12),
      role: selectedRole,
    },
  });
  res.status(201).json({
    token: createToken({ id: user.id, role: user.role }),
    user: publicUser(user),
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body as Record<string, string>;
  const user = await prisma.user.findUnique({
    where: { email: email?.trim().toLowerCase() || "" },
  });
  if (!user || !password || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ message: "E-naslov ali geslo ni pravilno." });
    return;
  }
  res.json({
    token: createToken({ id: user.id, role: user.role }),
    user: publicUser(user),
  });
});

app.get("/api/auth/me", requireAuth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.auth!.id } });
  if (!user) {
    res.status(404).json({ message: "Uporabnik ne obstaja." });
    return;
  }
  res.json({ user: publicUser(user) });
});

app.get("/api/bootstrap", requireAuth, async (req: AuthRequest, res) => {
  const auth = req.auth!;
  const [projects, tasks, users, entries, todos] = await Promise.all([
    prisma.project.findMany({ where: projectScope(auth), include: { manager: true, members: { include: { user: true } }, tasks: true }, orderBy: { createdAt: "asc" } }),
    prisma.task.findMany({ where: auth.role === Role.COMPANY_MANAGER ? {} : { project: projectScope(auth) }, include: { project: true, assignedTo: true, timeEntries: true }, orderBy: { deadline: "asc" } }),
    prisma.user.findMany({ where: auth.role === Role.COMPANY_MANAGER ? {} : { memberships: { some: { project: projectScope(auth) } } }, include: { memberships: { include: { project: true } }, assignedTasks: true, timeEntries: true }, orderBy: { name: "asc" } }),
    prisma.timeEntry.findMany({ where: { userId: auth.id }, include: { task: { include: { project: true } } }, orderBy: { startTime: "desc" } }),
    prisma.dailyTodo.findMany({ where: { userId: auth.id }, include: { project: true, task: true }, orderBy: { date: "asc" } }),
  ]);
  res.json({
    projects: projects.map((project) => {
      const done = project.tasks.filter((task) => task.status === TaskStatus.DONE).length;
      return { id: String(project.id), name: project.name, description: project.description || "", status: projectStatus[project.status], progress: project.tasks.length ? Math.round(done / project.tasks.length * 100) : 0, members: project.members.map(({ user }) => initials(user.name)), managerId: String(project.managerId), managerName: project.manager.name, start: formatDate(project.startDate), end: formatDate(project.endDate), tasks: project.tasks.length };
    }),
    tasks: tasks.map((task) => ({ id: `WIT-${String(task.id).padStart(3, "0")}`, databaseId: task.id, projectId: String(task.projectId), title: task.title, description: task.description || "", instructions: task.instructions || "", project: task.project.name, status: taskStatus[task.status], priority: priorityLabel[task.priority], assignee: task.assignedTo ? initials(task.assignedTo.name) : "—", name: task.assignedTo?.name || "Nedodeljeno", deadline: formatDate(task.deadline), duration: durationLabel(task.timeEntries.reduce((sum, item) => sum + (item.duration || 0), 0)), comments: 0 })),
    people: users.map((user) => ({ id: String(user.id), name: user.name, initials: initials(user.name), email: user.email, role: roleLabel[user.role], projects: user.memberships.map(({ project }) => project.name).join(", ") || "Brez projekta", assigned: user.assignedTasks.length, completed: user.assignedTasks.filter((task) => task.status === TaskStatus.DONE).length, hours: durationLabel(user.timeEntries.reduce((sum, item) => sum + (item.duration || 0), 0)), status: "Aktiven" })),
    timeEntries: entries.map((entry) => ({ id: entry.id, date: formatDate(entry.startTime), dateTime: entry.startTime.toISOString(), project: entry.task.project.name, task: entry.task.title, start: entry.startTime.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }), end: entry.endTime?.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }) || "—", duration: durationLabel(entry.duration), durationMinutes: entry.duration || 0 })),
    dailyTasks: todos.map((todo) => ({ id: todo.id, title: todo.title, description: todo.description || "", project: todo.project?.name || todo.task?.title || "Neopredeljeno", time: todo.date.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" }), duration: "", priority: "Srednja", done: todo.completed })),
  });
});

app.patch("/api/daily-todos/:id", requireAuth, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const todo = await prisma.dailyTodo.findFirst({ where: { id, userId: req.auth!.id } });
  if (!todo) { res.status(404).json({ message: "Dnevne naloge ni mogoče najti." }); return; }
  res.json(await prisma.dailyTodo.update({ where: { id }, data: { completed: Boolean(req.body.completed) } }));
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: "Prišlo je do napake na strežniku." });
});

app.listen(port, () => console.log(`workIT auth API posluša na http://localhost:${port}`));

async function shutdown() {
  await prisma.$disconnect();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
