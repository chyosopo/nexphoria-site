import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import {
  insertWaitlistSchema,
  insertIntakeClickSchema,
  insertContactSchema,
  insertCheckoutSchema,
} from "@shared/schema";

export function registerRoutes(httpServer: Server, app: Express) {
  // Health
  app.get("/api/health", (_req, res) => res.json({ ok: true, brand: "nexphoria" }));

  // Waitlist
  app.post("/api/waitlist", async (req, res) => {
    const parsed = insertWaitlistSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const entry = await storage.addToWaitlist(parsed.data);
    res.json(entry);
  });

  // Intake click tracking (lightweight analytics)
  app.post("/api/intake-click", async (req, res) => {
    const parsed = insertIntakeClickSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const click = await storage.trackIntakeClick(parsed.data);
    res.json({ ok: true, id: click.id });
  });

  // Contact form
  app.post("/api/contact", async (req, res) => {
    const parsed = insertContactSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const entry = await storage.submitContact(parsed.data);
    res.json({ ok: true, id: entry.id });
  });

  // Checkout intake — order submission with health flags + cart
  app.post("/api/checkout", async (req, res) => {
    const parsed = insertCheckoutSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const entry = await storage.submitCheckout(parsed.data);
    res.json({ ok: true, id: entry.id, message: "Submitted for physician review" });
  });
}
