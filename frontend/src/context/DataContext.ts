import { createContext, useContext } from "react";
import type { DailyTask, Person, Project, Task, TimeEntry } from "../types/ui";

export interface AppData { projects: Project[]; tasks: Task[]; people: Person[]; timeEntries: TimeEntry[]; dailyTasks: DailyTask[]; }
export const emptyData: AppData = { projects: [], tasks: [], people: [], timeEntries: [], dailyTasks: [] };
export const DataContext = createContext<{ data: AppData; loading: boolean; error: string; refresh: () => Promise<void>; toggleDailyTask: (id: number, done: boolean) => Promise<void> } | null>(null);
export function useAppData() { const value = useContext(DataContext); if (!value) throw new Error("DataProvider manjka."); return value; }
