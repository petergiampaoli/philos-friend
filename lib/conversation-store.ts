import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { getAnswer, isAnswerId } from "./answers";
import {
  conversationFromAnswer,
  type Conversation,
} from "./conversation";

const dataDir =
  process.env.PHILOS_FRIEND_DATA_DIR?.trim() || path.join(os.homedir(), ".philos-friend");
const conversationsDir = path.join(dataDir, "conversations");

function conversationPath(id: string): string {
  return path.join(conversationsDir, `${id}.json`);
}

export function isConversationId(value: string): boolean {
  return isAnswerId(value);
}

export async function saveConversation(conversation: Conversation): Promise<void> {
  if (!isConversationId(conversation.id)) {
    throw new Error("Refusing to save a conversation with an invalid id.");
  }

  await mkdir(conversationsDir, { recursive: true });
  const target = conversationPath(conversation.id);
  const temporary = `${target}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporary, JSON.stringify(conversation), "utf8");
  await rename(temporary, target);
}

export async function getStoredConversation(id: string): Promise<Conversation | null> {
  if (!isConversationId(id)) return null;

  try {
    const raw = await readFile(conversationPath(id), "utf8");
    const parsed = JSON.parse(raw) as Conversation;
    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.question !== "string" ||
      !Array.isArray(parsed.packet) ||
      !Array.isArray(parsed.pairs)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function loadConversation(id: string): Promise<Conversation | null> {
  const stored = await getStoredConversation(id);
  if (stored) return stored;

  const legacy = await getAnswer(id);
  return legacy ? conversationFromAnswer(legacy) : null;
}
