import { answerSchema, type Answer, type PacketThinker } from "./schema";
import { THINKERS } from "@/data/thinkers";
import { normalizePrompt } from "./compose";

export type ValidationResult = {
  ok: boolean;
  errors: string[];
  chosenIds: string[];
  families: string[];
};

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function familyOf(tradition: string): string {
  return tradition.split("/")[0].trim().toLowerCase();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsName(text: string, name: string): boolean {
  if (name.length < 4) return false;
  if (name.includes(" ")) {
    return new RegExp(`\\b${escapeRegExp(name)}\\b`, "i").test(text);
  }
  // For single words, require a capital letter so lowercase common words like
  // "hooks" or "held" are not mistaken for a philosopher's surname. The
  // lookahead avoids compounds such as "Buddha-nature" or "Kantian".
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return new RegExp(`\\b${escapeRegExp(capitalized)}(?![\\w-])`).test(text);
}

const SHORT_NAMES = new Set([
  "kant",
  "hume",
  "marx",
  "zeno",
  "mozi",
  "laozi",
  "dogen",
  "camus",
  "sartre",
  "rawls",
  "weil",
]);

function knownAliases(): Map<string, string> {
  const aliases = new Map<string, string>();
  for (const thinker of THINKERS) {
    const full = thinker.name.toLowerCase();
    aliases.set(full, thinker.id);
    const cleaned = full.replace(/\([^)]*\)/g, " ").trim();
    const parts = cleaned.split(/[^a-z0-9'-]+/).filter(Boolean);
    const last = parts[parts.length - 1];
    if (last && last.length >= 5) aliases.set(last, thinker.id);
    if (SHORT_NAMES.has(last)) aliases.set(last, thinker.id);
  }
  return aliases;
}

const ALL_ALIASES = knownAliases();

export function validateAnswer(
  answer: Answer,
  packet: PacketThinker[],
  prompt = "",
): ValidationResult {
  const errors: string[] = [];
  const parsed = answerSchema.safeParse(answer);

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      errors.push(`${issue.path.join(".")}: ${issue.message}`);
    }
    return { ok: false, errors, chosenIds: [], families: [] };
  }

  const thinkerIds = new Set(packet.map((thinker) => thinker.id));
  const families = new Set<string>();
  const chosenIds: string[] = [];
  const seen = new Set<string>();
  const quoteOwner = new Map<string, string>();

  for (const thinker of packet) {
    families.add(familyOf(thinker.tradition));
    for (const quote of thinker.quotes) quoteOwner.set(quote.id, thinker.id);
  }

  for (const lens of answer.lenses) {
    if (!thinkerIds.has(lens.thinkerId)) {
      errors.push(`unknown thinkerId "${lens.thinkerId}"`);
      continue;
    }
    if (seen.has(lens.thinkerId)) errors.push(`duplicate thinker "${lens.thinkerId}"`);
    seen.add(lens.thinkerId);
    chosenIds.push(lens.thinkerId);

    if (lens.quoteId) {
      const owner = quoteOwner.get(lens.quoteId);
      if (!owner) errors.push(`unknown quoteId "${lens.quoteId}"`);
      else if (owner !== lens.thinkerId) {
        errors.push(`quote "${lens.quoteId}" does not belong to "${lens.thinkerId}"`);
      }
    }

    if (wordCount(lens.claim) > 18) errors.push(`claim too long: ${wordCount(lens.claim)} words`);
    if (wordCount(lens.theory) > 140) errors.push(`theory too long: ${wordCount(lens.theory)} words`);
    if (wordCount(lens.application) > 95) {
      errors.push(`application too long: ${wordCount(lens.application)} words`);
    }
    if (wordCount(lens.affirmation) > 55) {
      errors.push(`affirmation too long: ${wordCount(lens.affirmation)} words`);
    }
  }

  if (answer.lenses.length !== 3) errors.push("answer must have exactly three lenses");
  if (families.size < 2) errors.push("packet needs at least two traditions");

  const selectedFamilies = answer.lenses
    .map((lens) => packet.find((thinker) => thinker.id === lens.thinkerId))
    .filter(Boolean)
    .map((thinker) => familyOf(thinker!.tradition));
  if (new Set(selectedFamilies).size < 2) {
    errors.push("the three lenses must come from at least two traditions");
  }

  if (wordCount(answer.thesis) > 80) errors.push("thesis too long");
  if (wordCount(answer.synthesis) > 190) errors.push("synthesis too long");
  if (wordCount(answer.practice) > 80) errors.push("practice too long");
  if (wordCount(answer.question) > 45) errors.push("question too long");

  const packetIds = new Set(packet.map((thinker) => thinker.id));
  const promptText = normalizePrompt(prompt);
  const answerText = [
    answer.thesis,
    ...answer.lenses.flatMap((lens) => [lens.claim, lens.theory, lens.application]),
    answer.synthesis,
    answer.practice,
    answer.question,
  ].join(" ");

  for (const [alias, id] of ALL_ALIASES) {
    if (packetIds.has(id)) continue;
    if (promptText.includes(alias)) continue;
    if (containsName(answerText, alias)) {
      errors.push(`unsupported thinker mentioned: "${alias}"`);
    }
  }

  return { ok: errors.length === 0, errors, chosenIds, families: [...families] };
}
