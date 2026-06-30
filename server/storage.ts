import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import {
  waitlist, intakeClicks, contactSubmissions,
  type Waitlist, type InsertWaitlist,
  type IntakeClick, type InsertIntakeClick,
  type Contact, type InsertContact,
} from "@shared/schema";

const sqlite = new Database("data.db");
const db = drizzle(sqlite);

// Initialize tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    goal TEXT,
    source TEXT,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS intake_clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_slug TEXT,
    source TEXT,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

export interface IStorage {
  addToWaitlist(data: InsertWaitlist): Promise<Waitlist>;
  listWaitlist(): Promise<Waitlist[]>;
  trackIntakeClick(data: InsertIntakeClick): Promise<IntakeClick>;
  submitContact(data: InsertContact): Promise<Contact>;
}

class SqliteStorage implements IStorage {
  async addToWaitlist(data: InsertWaitlist): Promise<Waitlist> {
    // Upsert behavior: if email exists, ignore (don't throw)
    const existing = db.select().from(waitlist).where(eq(waitlist.email, data.email)).get();
    if (existing) return existing;
    return db.insert(waitlist).values(data).returning().get();
  }
  async listWaitlist(): Promise<Waitlist[]> {
    return db.select().from(waitlist).all();
  }
  async trackIntakeClick(data: InsertIntakeClick): Promise<IntakeClick> {
    return db.insert(intakeClicks).values(data).returning().get();
  }
  async submitContact(data: InsertContact): Promise<Contact> {
    return db.insert(contactSubmissions).values(data).returning().get();
  }
}

export const storage: IStorage = new SqliteStorage();
