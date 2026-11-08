import { createContext, useContext } from "react";
import type { PreviewAction, PreviewKind } from "../types/preview";

export const PreviewContext = createContext<{
  open: (action: PreviewAction | PreviewKind) => void;
} | null>(null);

export function usePreview() {
  const context = useContext(PreviewContext);
  if (!context) throw new Error("Preview controls require PreviewProvider");
  return context;
}
