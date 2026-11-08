import "dotenv/config";
import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import { Role } from "../generated/prisma/client.js";
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

function publicUser(user: { id: number; name: string; email: string; role: Role }) {
  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
    roleId: roleId[user.role],
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
