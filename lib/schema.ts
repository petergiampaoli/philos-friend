import { z } from "zod";

export const THEME_IDS = [
  "competition",
  "winning",
  "play",
  "fun",
  "recognition",
  "status",
  "desire",
  "attachment",
  "control",
  "effort",
  "comparison",
  "validation",
  "meaning",
  "boredom",
  "anxiety",
  "freedom",
  "authenticity",
  "excellence",
  "community",
  "work",
  "money",
  "love",
  "death",
  "anger",
  "envy",
  "habit",
  "attention",
  "impermanence",
  "self",
  "duty",
  "pleasure",
  "friendship",
  "power",
  "justice",
  "care",
  "courage",
  "wisdom",
  "fate",
  "hope",
  "loneliness",
  "education",
  "nature",
  "technology",
  "language",
  "science",
  "mind",
  "art",
  "joy",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const themeIdSchema = z.enum(THEME_IDS);

export const quoteSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(4).max(420),
  work: z.string().min(1),
  locator: z.string().min(1),
  translator: z.string().optional(),
  year: z.string().optional(),
  sourceUrl: z.string().optional(),
  paraphrase: z.string().min(10).max(300).optional(),
  context: z.string().min(10).max(600).optional(),
  themes: z.array(themeIdSchema).max(8).optional(),
  tone: z.string().max(100).optional(),
  status: z.literal("verified"),
});

export const ideaSchema = z.object({
  title: z.string().min(2).max(90),
  summary: z.string().min(20).max(520),
});

export const thinkerSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(2),
  dates: z.string().min(2),
  tradition: z.string().min(2),
  era: z.string().min(2),
  region: z.string().min(2),
  tags: z.array(themeIdSchema).min(3).max(9),
  oneLine: z.string().min(20).max(260),
  ideas: z.array(ideaSchema).min(2).max(4),
  quotes: z.array(quoteSchema).max(4),
  keyWorks: z.array(z.string()).min(1).max(6),
});

export const lineageSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  kind: z.enum(["genre", "subgenre"]),
  name: z.string().min(2),
  parent: z.string().optional(),
  blurb: z.string().min(20),
  whyTheseFive: z.string().min(20),
  five: z.array(z.string()).length(5),
  alsoConsider: z.array(z.string()).max(4).optional(),
});

export const lensSchema = z.object({
  thinkerId: z.string().min(1),
  quoteId: z.string().min(1).nullable(),
  claim: z.string().min(3).max(160),
  theory: z.string().min(40).max(1000),
  application: z.string().min(20).max(700),
  affirmation: z.string().min(20).max(500),
  quoteReason: z.string().min(3).max(300).optional(),
});

export const answerSchema = z.object({
  thesis: z.string().min(20).max(700),
  lenses: z.array(lensSchema).length(3),
  synthesis: z.string().min(40).max(1400),
  practice: z.string().min(10).max(600),
  question: z.string().min(5).max(320),
});

export type Quote = z.infer<typeof quoteSchema>;
export type Idea = z.infer<typeof ideaSchema>;
export type Thinker = z.infer<typeof thinkerSchema>;
export type Lineage = z.infer<typeof lineageSchema>;
export type Lens = z.infer<typeof lensSchema>;
export type Answer = z.infer<typeof answerSchema>;

export const promptAnalysisSchema = z.object({
  surfaceQuestion: z.string().min(3).max(500),
  realQuestion: z.string().min(3).max(500),
  emotionalTone: z.array(z.string().min(2).max(60)).max(6),
  stakes: z.string().min(3).max(500),
  underlyingBelief: z.string().min(3).max(500),
  avoidedTruth: z.string().min(3).max(500),
  whatWouldHelp: z.enum(["challenge", "consolation", "clarification", "permission", "practice"]),
  themes: z.array(themeIdSchema).max(8),
  quoteSearchTerms: z.array(z.string().min(2).max(80)).max(12),
  tone: z.string().min(3).max(160),
  safety: z.enum(["normal", "care"]),
});

export type PromptAnalysis = z.infer<typeof promptAnalysisSchema>;

export type PublicQuote = Quote & {
  thinkerId: string;
  thinkerName: string;
};

export type PublicThinker = Omit<Thinker, "quotes"> & {
  quotes: Quote[];
  lineageIds: string[];
};

export type PacketThinker = {
  id: string;
  name: string;
  dates: string;
  tradition: string;
  region: string;
  tags: ThemeId[];
  oneLine: string;
  ideas: Idea[];
  quotes: Quote[];
};

export type Trace = {
  themes: ThemeId[];
  lineageIds: string[];
  candidateIds: string[];
  chosenIds: string[];
  traditions: string[];
  mode: "demo" | "llm";
  provider?: string;
  model?: string;
  latencyMs: number;
  valid: boolean;
  notes: string[];
  inputTokens?: number;
  outputTokens?: number;
  estimatedCostUsd?: number;
};

export type AdviseResponse = {
  id: string;
  question: string;
  answer: Answer;
  packet: PacketThinker[];
  trace: Trace;
  mode: "demo" | "llm";
  analysis?: PromptAnalysis;
  shareUrl?: string;
};
