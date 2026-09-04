import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initAnalytics } from "@/lib/analytics";

initAnalytics(); // no-op unless VITE_GA4_ID is configured at build time

/* A second token sheet for review: ?sheet=agency paints the agency's R3
   direction over every page for this session; ?sheet=house returns to
   Graphite & Ice. Nothing about the default changes (CLAUDE.md law 1). */
try {
  const q = new URLSearchParams(window.location.search).get("sheet");
  if (q === "agency" || q === "house") window.sessionStorage.setItem("nx-sheet", q);
  const sheet = window.sessionStorage.getItem("nx-sheet") ?? "agency";
  if (sheet === "agency") document.documentElement.dataset.sheet = "agency";
} catch { /* storage unavailable: the default sheet renders */ }
createRoot(document.getElementById("root")!).render(<App />);
