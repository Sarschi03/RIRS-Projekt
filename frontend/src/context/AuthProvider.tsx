import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AuthUser, RoleId } from "../types/auth";
import { apiRequest, getToken, setToken } from "../services/api";
import { AuthContext } from "./AuthContext";

type AuthResponse = { token: string; user: AuthUser };

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(Boolean(getToken()));

  useEffect(() => {
    if (!getToken()) return;
    apiRequest<{ user: AuthUser }>("/auth/me")
      .then(({ user }) => setUser(user))
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  async function authenticate(path: string, body: object) {
    const result = await apiRequest<AuthResponse>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
    setToken(result.token);
    setUser(result.user);
  }

  const value = useMemo(() => ({
    user,
    loading,
    login: (email: string, password: string) => authenticate("/auth/login", { email, password }),
    register: (input: { name: string; email: string; password: string; role: RoleId }) => authenticate("/auth/register", {
      ...input,
      role: {
        employee: "EMPLOYEE",
        "project-manager": "PROJECT_MANAGER",
        "company-manager": "COMPANY_MANAGER",
      }[input.role],
    }),
    logout: () => {
      setToken(null);
      setUser(null);
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
