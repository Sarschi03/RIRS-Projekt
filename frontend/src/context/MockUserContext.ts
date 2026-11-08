import { createContext, useContext } from "react";
import type { MockRole, MockUser } from "../types/mockUser";

export const MockUserContext = createContext<{
  user: MockUser;
  setRole: (role: MockRole) => void;
  profileImage: string | undefined;
  setProfileImage: (image: string) => void;
} | null>(null);

export function useMockUser() {
  const value = useContext(MockUserContext);
  if (!value) throw new Error("Mock user controls require MockUserProvider");
  return value;
}
