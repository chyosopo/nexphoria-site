#!/usr/bin/env node
/* ═══ v0-bridge — drive v0.app's Platform API from this repo ═══
   The design-exploration loop: send v0 a task WITH the design-system brief
   attached, pull back the generated files + live preview URL, and land them
   in a local folder for review — never directly into the site source.

   Auth: set V0_API_KEY in the environment (create one at v0.app → settings
   → API keys). Never commit the key.

   Usage:
     node scripts/v0-bridge.mjs create "Explore 3 hero directions for the home page"
     node scripts/v0-bridge.mjs create --raw "…"        # without the brief attached
     node scripts/v0-bridge.mjs refine <chatId> "Make direction 2 warmer"
     node scripts/v0-bridge.mjs pull <chatId>            # re-fetch latest files
   Output: .v0-out/<chatId>/ (gitignored) + demo URL on stdout. */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.v0.dev/v1";
const KEY = process.env.V0_API_KEY;
const OUT = join(ROOT, ".v0-out");

if (!KEY) {
  console.error(
    "V0_API_KEY is not set.\n" +
    "Create a key at v0.app → account settings → API keys, then add it to\n" +
    "this environment's variables (or `export V0_API_KEY=…` for one shell).",
  );
  process.exit(1);
}

async function api(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = null; }
  if (!res.ok) {
    console.error(`v0 API ${method} ${path} → HTTP ${res.status}`);
    console.error(text.slice(0, 2000));
    process.exit(1);
  }
  return json;
}

function saveVersion(chatId, version) {
  if (!version) { console.log("(no version payload on this response yet)"); return; }
  const dir = join(OUT, chatId);
  mkdirSync(dir, { recursive: true });
  for (const f of version.files ?? []) {
    const p = join(dir, f.name);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, f.content ?? "");
  }
  console.log(`files:   ${version.files?.length ?? 0} → ${dir.replace(ROOT + "/", "")}/`);
  if (version.demoUrl) console.log(`preview: ${version.demoUrl}`);
}

const brief = () => {
  const p = join(ROOT, "DESIGN-SYSTEM.md");
  return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const [cmd, ...rest] = process.argv.slice(2);

if (cmd === "create") {
  const raw = rest[0] === "--raw";
  const task = (raw ? rest.slice(1) : rest).join(" ").trim();
  if (!task) { console.error("usage: create [--raw] \"<task>\""); process.exit(1); }
  const message = raw
    ? task
    : `${task}\n\n--- DESIGN SYSTEM BRIEF (follow Exploration Mode when exploring; Integration rules when implementing) ---\n\n${brief()}`;
  const chat = await api("POST", "/chats", { message });
  console.log(`chat:    ${chat.id}`);
  if (chat.url || chat.webUrl) console.log(`open:    ${chat.url ?? chat.webUrl}`);
  saveVersion(chat.id, chat.latestVersion);
} else if (cmd === "refine") {
  const [chatId, ...msg] = rest;
  if (!chatId || !msg.length) { console.error("usage: refine <chatId> \"<message>\""); process.exit(1); }
  const r = await api("POST", `/chats/${chatId}/messages`, { message: msg.join(" ") });
  console.log(`chat:    ${chatId}`);
  saveVersion(chatId, r.latestVersion ?? r.chat?.latestVersion);
} else if (cmd === "pull") {
  const [chatId] = rest;
  if (!chatId) { console.error("usage: pull <chatId>"); process.exit(1); }
  const chat = await api("GET", `/chats/${chatId}`);
  saveVersion(chatId, chat.latestVersion);
} else {
  console.error("commands: create [--raw] \"<task>\" | refine <chatId> \"<msg>\" | pull <chatId>");
  process.exit(1);
}
