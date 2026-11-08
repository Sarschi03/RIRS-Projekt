import { createContext, useContext } from "react";
import type { AuthUser, RoleId } from "../types/auth";

export const AuthContext = createContext<{
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: { name: string; email: string; password: string; role: RoleId }) => Promise<void>;
  logout: () => void;
  profileImage: string | undefined;
  setProfileImage: (image: string) => void;
} | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("AuthProvider manjka v drevesu komponent.");
  return value;
}
