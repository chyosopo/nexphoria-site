import { QueryClient } from "@tanstack/react-query";

// API base — handles dev (relative) and deployed (port-prefixed proxy) paths
const API_BASE = ((import.meta.env.VITE_API_BASE as string) || "").replace(/\/$/, "") || "__PORT_5000__";

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
