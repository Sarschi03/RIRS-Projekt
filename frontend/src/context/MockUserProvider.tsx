import { useState } from "react";
import type { ReactNode } from "react";
import type { MockRole } from "../types/mockUser";
import { mockUsers } from "../data/mockUsers";
import { MockUserContext } from "./MockUserContext";

export default function MockUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [role, setRole] = useState<MockRole>("employee");
  const [profileImages, setProfileImages] = useState<Record<string, string>>({});
  const user =
    mockUsers.find((profile) => profile.roleId === role) || mockUsers[0];
  return (
    <MockUserContext.Provider value={{ user, setRole, profileImage: profileImages[user.id], setProfileImage: (image) => setProfileImages((previous) => ({ ...previous, [user.id]: image })) }}>
      {children}
    </MockUserContext.Provider>
  );
}
