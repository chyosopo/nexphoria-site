import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* ──────────────────────────────────────────────────────────────
   Waitlist — secondary CTA fallback for non-converters
   ────────────────────────────────────────────────────────────── */
export const waitlist = sqliteTable("waitlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  goal: text("goal"), // recover | skin | longevity | sleep | weight
  source: text("source"), // homepage | wolverine | glow | goals | etc
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
});

export const insertWaitlistSchema = createInsertSchema(waitlist).omit({ id: true, createdAt: true });
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;

/* ──────────────────────────────────────────────────────────────
   Intake intent tracking — when users click "Start Assessment"
   ────────────────────────────────────────────────────────────── */
export const intakeClicks = sqliteTable("intake_clicks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productSlug: text("product_slug"), // wolverine | glow | sermorelin | etc
  source: text("source"), // homepage_hero | wolverine_commit | etc
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
});

export const insertIntakeClickSchema = createInsertSchema(intakeClicks).omit({ id: true, createdAt: true });
export type InsertIntakeClick = z.infer<typeof insertIntakeClickSchema>;
export type IntakeClick = typeof intakeClicks.$inferSelect;

/* ──────────────────────────────────────────────────────────────
   Contact form — physician questions
   ────────────────────────────────────────────────────────────── */
export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactSubmissions.$inferSelect;
