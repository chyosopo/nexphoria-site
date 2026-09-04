import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initAnalytics } from "@/lib/analytics";

initAnalytics(); // no-op unless VITE_GA4_ID is configured at build time

/* One sheet: Porcelain & Navy (Chiya, 2026-09-04). The review toggle is retired. */
createRoot(document.getElementById("root")!).render(<App />);
