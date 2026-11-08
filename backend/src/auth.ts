import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "../generated/prisma/client.js";

export interface AuthRequest extends Request {
  auth?: { id: number; role: Role };
}

const secret = process.env.JWT_SECRET || "workit-development-secret-change-before-production";

export function createToken(user: { id: number; role: Role }) {
  return jwt.sign(user, secret, { expiresIn: "7d" });
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) {
    res.status(401).json({ message: "Za dostop se morate prijaviti." });
    return;
  }
  try {
    const payload = jwt.verify(token, secret) as { id: number; role: Role };
    req.auth = { id: Number(payload.id), role: payload.role };
    next();
  } catch {
    res.status(401).json({ message: "Prijava je potekla. Prijavite se znova." });
  }
}
