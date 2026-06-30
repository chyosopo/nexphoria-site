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

/* ──────────────────────────────────────────────────────────────
   Checkout intake — order submission with health flags + cart payload
   ────────────────────────────────────────────────────────────── */
export const checkoutSubmissions = sqliteTable("checkout_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  cartJson: text("cart_json").notNull(),
  subtotal: real("subtotal").notNull(),
  cardiacHistory: integer("cardiac_history", { mode: "boolean" }).notNull(),
  diabetic: integer("diabetic", { mode: "boolean" }).notNull(),
  hormonalRx: integer("hormonal_rx", { mode: "boolean" }).notNull(),
  allergies: text("allergies"),
  shippingAddress: text("shipping_address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
});

export const insertCheckoutSchema = createInsertSchema(checkoutSubmissions, {
  email: z.string().email("Enter a valid email"),
  name: z.string().min(2, "Enter your full name"),
  age: z.coerce.number().int().min(18, "Must be 18+").max(110),
  shippingAddress: z.string().min(4, "Enter your shipping address"),
  city: z.string().min(1),
  state: z.string().min(2).max(2, "Use 2-letter state code"),
  zip: z.string().min(5).max(10),
}).omit({ id: true, createdAt: true });
export type InsertCheckout = z.infer<typeof insertCheckoutSchema>;
export type Checkout = typeof checkoutSubmissions.$inferSelect;
