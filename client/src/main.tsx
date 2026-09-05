import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
/* After index.css on purpose: fonts.css declares the self-hosted General Sans
   faces; motion.css is the one motion grammar and overrides the per-component
   motion still in index.css (see the header of each). */
import "./styles/fonts.css";
import "./styles/motion.css";
import { initAnalytics } from "@/lib/analytics";

initAnalytics(); // no-op unless VITE_GA4_ID is configured at build time

/* iOS Safari only draws :active (the press in styles/motion.css) once a
   touchstart listener exists somewhere on the page. An empty, passive one
   is the whole fix. */
document.addEventListener("touchstart", () => {}, { passive: true });

/* One sheet: Porcelain & Navy (Chiya, 2026-09-04). The review toggle is retired. */
createRoot(document.getElementById("root")!).render(<App />);
