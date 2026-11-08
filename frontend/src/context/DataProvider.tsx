import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { apiRequest } from "../services/api";
import { useAuth } from "./AuthContext";
import { DataContext, emptyData } from "./DataContext";
import type { AppData } from "./DataContext";

export default function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<AppData>(emptyData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    if (!user) { setData(emptyData); return; }
    setLoading(true); setError("");
    try { setData(await apiRequest<AppData>("/bootstrap")); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Podatkov ni mogoče naložiti."); }
    finally { setLoading(false); }
  }, [user]);
  useEffect(() => { queueMicrotask(() => void refresh()); }, [refresh]);
  const value = useMemo(() => ({ data, loading, error, refresh, toggleDailyTask: async (id: number, done: boolean) => {
    setData((current) => ({ ...current, dailyTasks: current.dailyTasks.map((task) => task.id === id ? { ...task, done } : task) }));
    try { await apiRequest(`/daily-todos/${id}`, { method: "PATCH", body: JSON.stringify({ completed: done }) }); }
    catch (reason) { await refresh(); throw reason; }
  } }), [data, loading, error, refresh]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
