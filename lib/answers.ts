import { randomUUID } from "node:crypto";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { AdviseResponse } from "./schema";

// Keep runtime data outside the project so Next's file watcher does not reload
// the page every time an answer is saved. Override with PHILOS_FRIEND_DATA_DIR.
const dataDir =
  process.env.PHILOS_FRIEND_DATA_DIR?.trim() || path.join(os.homedir(), ".philos-friend");
const answersDir = path.join(dataDir, "answers");
const feedbackFile = path.join(dataDir, "feedback.jsonl");

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isAnswerId(value: string): boolean {
  return UUID_RE.test(value);
}

export function newAnswerId(): string {
  return randomUUID();
}

export async function saveAnswer(response: AdviseResponse): Promise<void> {
  if (!isAnswerId(response.id)) throw new Error("Refusing to save an answer with an invalid id.");
  await mkdir(answersDir, { recursive: true });
  await writeFile(path.join(answersDir, `${response.id}.json`), JSON.stringify(response), "utf8");
}

export async function getAnswer(id: string): Promise<AdviseResponse | null> {
  if (!isAnswerId(id)) return null;
  try {
    const raw = await readFile(path.join(answersDir, `${id}.json`), "utf8");
    const parsed = JSON.parse(raw) as AdviseResponse;
    if (!parsed || typeof parsed !== "object" || !parsed.answer || !parsed.packet) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveFeedback(
  id: string,
  value: "up" | "down",
): Promise<void> {
  if (!isAnswerId(id)) throw new Error("Invalid answer id.");
  await mkdir(dataDir, { recursive: true });
  await appendFile(
    feedbackFile,
    `${JSON.stringify({ id, value, createdAt: new Date().toISOString() })}\n`,
    "utf8",
  );
}
