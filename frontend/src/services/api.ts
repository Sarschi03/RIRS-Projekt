const API_ROOT = "/api";

export function getToken() {
  return localStorage.getItem("workit-token");
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem("workit-token", token);
  else localStorage.removeItem("workit-token");
}

export async function apiRequest<T>(path: string, options: RequestInit = {}) {
  const token = getToken();
  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Zahteve ni bilo mogoče izvesti.");
  return data as T;
}
