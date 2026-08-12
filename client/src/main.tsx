import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initAnalytics } from "@/lib/analytics";

initAnalytics(); // no-op unless VITE_GA4_ID is configured at build time
createRoot(document.getElementById("root")!).render(<App />);
