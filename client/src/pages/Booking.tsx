import * as React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Booking() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-[var(--nx-fg)]">
          Schedule a Consultation
        </h1>
        <p className="mb-8 text-lg text-[var(--nx-fg)]/90">
          Book a personalized consultation with our medical team to discuss your
          health goals, review lab results, and determine the optimal peptide
          protocol for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="https://calendly.com/chiya/consult"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[var(--nx-accent)] text-[var(--nx-bg)] px-6 py-4 rounded-lg font-medium hover:bg-[var(--nx-accent)/0.9] transition-colors"
          >
            Book via Calendly
          </Link>
          <Link
            href="https://calendar.google.com/calendar/u/0/r?cid=your_calendar_id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[var(--nx-muted)] text-[var(--nx-fg)] px-6 py-4 rounded-lg font-medium hover:bg-[var(--nx-muted)/0.8] transition-colors"
          >
            Or add to Google Calendar
          </Link>
        </div>
      </div>
    </section>
  );
}
