import { QueryClient } from "@tanstack/react-query";

// API base — VITE_API_BASE when a backend is deployed, else same-origin relative.
// On the static production host there is no /api server: requests 404 fast and
// every caller degrades gracefully. (The old "__PORT_5000__" dev-proxy literal
// produced invalid URLs in production and broke all form capture.)
const API_BASE = ((import.meta.env.VITE_API_BASE as string) || "").replace(/\/$/, "");

export async function apiRequest<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [path, ...rest] = queryKey as [string, ...unknown[]];
        const query = rest.length ? `?${rest.map((v) => encodeURIComponent(String(v))).join("&")}` : "";
        return apiRequest(`${path}${query}`);
      },
      staleTime: 60_000,
      retry: 1,
    },
  },
});
