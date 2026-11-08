import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient, Priority, ProjectStatus, Role, TaskStatus } from "../generated/prisma/client.js";

const prisma = new PrismaClient();
const accounts = [
  ["Ana Novak", "ana.novak@workit.si", Role.EMPLOYEE, "Oblikovalka uporabniške izkušnje"],
  ["Maja Sever", "maja.sever@workit.si", Role.EMPLOYEE, "Razvijalka"],
  ["Tim Jereb", "tim.jereb@workit.si", Role.EMPLOYEE, "Vsebinski oblikovalec"],
  ["Eva Zupan", "eva.zupan@workit.si", Role.EMPLOYEE, "Poslovna analitičarka"],
  ["Sara Kralj", "sara.kralj@workit.si", Role.EMPLOYEE, "Razvijalka"],
  ["Marko Kos", "marko.kos@workit.si", Role.EMPLOYEE, "Preizkuševalec"],
  ["Luka Kovač", "luka.kovac@workit.si", Role.PROJECT_MANAGER, "Vodja projekta"],
  ["Neža Pirc", "neza.pirc@workit.si", Role.COMPANY_MANAGER, "Vodja podjetja"],
] as const;

async function main() {
  await prisma.$transaction([
    prisma.timeEntry.deleteMany(), prisma.dailyTodo.deleteMany(),
    prisma.projectInstruction.deleteMany(), prisma.task.deleteMany(),
    prisma.projectMember.deleteMany(), prisma.project.deleteMany(), prisma.user.deleteMany(),
  ]);

  const users = new Map<string, number>();
  for (const [name, email, role, jobTitle] of accounts) {
    const user = await prisma.user.create({ data: { name, email, role, jobTitle, passwordHash: await bcrypt.hash("geslo123", 12) } });
    users.set(email, user.id);
  }
  const userId = (email: string) => users.get(email)!;
  const managerId = userId("luka.kovac@workit.si");

  const definitions = [
    ["Prenova spletne strani", "Jasnejša predstavitev blagovne znamke od prvega vtisa do zadnje podrobnosti.", ProjectStatus.IN_PROGRESS, "2026-10-12", "2026-11-20", ["ana.novak@workit.si", "maja.sever@workit.si", "marko.kos@workit.si"]],
    ["Uvajanje zaposlenih", "Preprosto in prijazno uvajanje vsakega novega sodelavca v ekipo.", ProjectStatus.IN_PROGRESS, "2026-10-19", "2026-11-27", ["ana.novak@workit.si", "eva.zupan@workit.si", "tim.jereb@workit.si"]],
    ["Mobilni delovni prostor", "Ključne vsebine delovnega prostora za delo na manjših zaslonih.", ProjectStatus.PLANNING, "2026-11-02", "2026-12-18", ["maja.sever@workit.si", "sara.kralj@workit.si", "marko.kos@workit.si"]],
    ["Smernice blagovne znamke", "Dokumentacija vizualne identitete in načina komuniciranja podjetja.", ProjectStatus.COMPLETED, "2026-09-14", "2026-11-05", ["tim.jereb@workit.si", "eva.zupan@workit.si", "sara.kralj@workit.si"]],
  ] as const;
  const projects = new Map<string, number>();
  for (const [name, description, status, start, end, members] of definitions) {
    const project = await prisma.project.create({ data: {
      name, description, status, managerId,
      startDate: new Date(`${start}T00:00:00Z`), endDate: new Date(`${end}T00:00:00Z`),
      members: { create: ["luka.kovac@workit.si", ...members].map((email) => ({ userId: userId(email) })) },
    } });
    projects.set(name, project.id);
  }
  const projectId = (name: string) => projects.get(name)!;
  const tasks = [
    ["Prenova spletne strani", "Pregled strukture navigacije", TaskStatus.TODO, Priority.MEDIUM, "maja.sever@workit.si", "2026-11-11"],
    ["Prenova spletne strani", "Oblikovanje pregleda projekta", TaskStatus.IN_PROGRESS, Priority.HIGH, "ana.novak@workit.si", "2026-11-09"],
    ["Prenova spletne strani", "Določitev vizualnih smernic", TaskStatus.DONE, Priority.LOW, "marko.kos@workit.si", "2026-11-06"],
    ["Uvajanje zaposlenih", "Priprava vodnika za prvi teden", TaskStatus.TODO, Priority.HIGH, "eva.zupan@workit.si", "2026-11-14"],
    ["Uvajanje zaposlenih", "Pregled gradiv za nove sodelavce", TaskStatus.IN_PROGRESS, Priority.MEDIUM, "ana.novak@workit.si", "2026-11-12"],
    ["Mobilni delovni prostor", "Pregled mobilne navigacije", TaskStatus.TODO, Priority.HIGH, "sara.kralj@workit.si", "2026-11-18"],
    ["Mobilni delovni prostor", "Skica mobilnega delovnega prostora", TaskStatus.IN_PROGRESS, Priority.MEDIUM, "maja.sever@workit.si", "2026-11-20"],
    ["Smernice blagovne znamke", "Dokumentiranje vizualnega sistema", TaskStatus.DONE, Priority.MEDIUM, "tim.jereb@workit.si", "2026-11-03"],
  ] as const;
  const created = new Map<string, number>();
  for (const [project, title, status, priority, assignee, deadline] of tasks) {
    const task = await prisma.task.create({ data: {
      title, description: `Delo na nalogi: ${title}.`, instructions: "Upoštevajte potrjena projektna izhodišča.",
      status, priority, deadline: new Date(`${deadline}T12:00:00Z`), projectId: projectId(project),
      assignedToId: userId(assignee), createdById: managerId,
    } });
    created.set(title, task.id);
  }
  await prisma.dailyTodo.createMany({ data: [
    { title: "Oblikovanje pregleda projekta", date: new Date("2026-11-08T09:30:00Z"), completed: true, userId: userId("ana.novak@workit.si"), taskId: created.get("Oblikovanje pregleda projekta"), projectId: projectId("Prenova spletne strani") },
    { title: "Pregled gradiv za nove sodelavce", date: new Date("2026-11-08T11:30:00Z"), completed: false, userId: userId("ana.novak@workit.si"), taskId: created.get("Pregled gradiv za nove sodelavce"), projectId: projectId("Uvajanje zaposlenih") },
    { title: "Branje strokovnega gradiva", description: "Osebna naloga brez projekta.", date: new Date("2026-11-08T16:00:00Z"), completed: false, userId: userId("ana.novak@workit.si") },
  ] });
  await prisma.timeEntry.create({ data: { startTime: new Date("2026-11-08T08:00:00Z"), endTime: new Date("2026-11-08T10:15:00Z"), duration: 135, userId: userId("ana.novak@workit.si"), taskId: created.get("Oblikovanje pregleda projekta")! } });
  console.log(`V bazo je shranjenih ${accounts.length} uporabnikov, ${definitions.length} projektov in ${tasks.length} nalog.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
