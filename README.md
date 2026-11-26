# Philos-Friend

A philosophy advice bot for the question you would only ask a friend at 1 a.m.

Ask something like **“Why do I need to win to have fun?”** and Philos-Friend is a simulated phone conversation with Simone. The first reply is a verified quote and a green line. Reject it with **“That’s not it.”** and the next philosopher is generated on demand; after three quotes, **“Let me ask you something else.”** invites a new question.

Every quotation is rendered from the library by ID; the model never writes the quote text. Each quote pair carries the source-backed reading notes behind it.

The demo path is fully deterministic. Add an LLM key and the same ranked quote is rewritten by a live model, with the same source checks.

## Quick start

```bash
npm install
npm run dev
```

`npm run dev` finds the first free port, starts Next, waits for the app’s health check, and opens the default browser. If port 3000 is occupied it opens the right port instead of silently opening another app. Set `NO_OPEN=1` to suppress the browser, or use `npm run dev:next` for a raw Next server.

No API key is required. Without one, the app runs in **demo mode**:

- the flagship question gets a deterministic first quote pair;
- other questions use the ranked library quote plus a deterministic lens;
- the phone conversation, library, profiles, and share pages all work.

```bash
npm test            # 60 tests, including a 20-question golden set
npm run typecheck
npm run build
npm run check:corpus
```

## Phase 1: the web MVP

The web app is the first product. Discord is the next delivery surface, not a rewrite.

What is in Phase 1:

- **Dark phone conversation.** A simulated iPhone screen with a Simone contact header, running chat, decorative keyboard, and a generic silhouette avatar.
- **One quote pair per request.** The first call generates one source-backed quote and one green line. **That’s not it.** generates the next unused thinker on demand. After three pairs, the rejection chip disappears.
- **In-phone reading notes.** Every quote byline has the philosopher’s portrait and a blue name. Tapping the name opens a sidebar inside the phone with source, context, breakdown, and “What it means.”
- **Running scrollback.** Every question, quote, green line, and suggested response stays in one scrollable conversation.
- **One-line suggestions.** **That’s not it.** and **Let me ask you something else.** sit between the message bar and the keyboard. “Let me ask you something else.” is matched with Simone’s **“Okay, what’s up?”**
- **Local portraits.** All 187 thinkers have a locally stored, square-cropped WebP portrait under `public/portraits`, with sources listed on `/credits`. Simone uses a neutral silhouette rather than a historical portrait.
- **Share pages.** The link is a read-only phone conversation showing the pairs generated so far.
- **Conversation amalgam.** A new detail is read together with the earlier questions; the previous thinkers are excluded so the next set is new.
- **Rate limiting** on the ask endpoint. The default is 60 ask requests per IP per hour; override with `ADVISE_RATE_LIMIT`.
- **Legal pages** at `/privacy` and `/terms`, linked from the footer.
- **Local persistence** in `~/.philos-friend` by default, outside the repo so Next’s file watcher does not reload the page when a conversation is saved. Override with `PHILOS_FRIEND_DATA_DIR`. Before a public multi-instance deployment, swap `lib/conversation-store.ts` for Postgres or Redis.
- **A health endpoint** at `/api/health` used by the dev launcher.

The engine boundary is still Discord-ready: the older `advise()` function returns a serializable `{ id, question, answer, packet, trace, mode }` object with no React or Next dependencies. The phone uses the on-demand `startConversation` / `addConversationPair` pipeline. A future Discord bot can use either surface; the share page is the link it sends back.

## The library

**187 thinker profiles · 50 subgenres across 9 genres · 295 top-five seats · 123 sourced quotations.**

A “seat” is one of the five places in a lineage’s top-five list. The same thinker can sit in several lists; that is intentional. The library is a set of curated paths, not an objective ranking.

- 9 genres, including Ancient & Medieval, Modern & Enlightenment, Analytic, Africana & Global South, Asian, and Aesthetics & Philosophy of Life.
- 50 subgenres, from Stoicism and Daoism to Philosophy of Play, Competition & Status, Ubuntu, and Indigenous Philosophies.
- Each node has a short blurb, a “why these five” note, and exactly five thinkers.
- Every thinker has dates, tradition, region, themes, two or more ideas, key works, and zero or more verified quotations.

The library is a hidden archive in the current UI: `/library` and `/thinker/[id]` remain available by direct URL but are not linked from the main page. The landing page intentionally has no library entry point.

## How an answer is made

```
conversation history + new detail
  → context for retrieval (history + current question)
  → prompt analysis (real question, stakes, tone, safety)
  → theme extraction (with synonym and negation handling)
  → lineage routing (weighted by themes and direct mentions)
  → candidate scoring (lineage seat, theme tags, quotation, diversity)
  → a 16-thinker packet, preferring quoted candidates
  → quote-first ranking, then choose one unused verified quote
  → one-lens writer (DeepSeek V4 Pro when configured)
  → dedicated green-line affirmation pass
  → validation: known IDs, quote ownership, word limits, non-judgment
  → first phone pair: one quote + one green line
  → "That's not it." → choose the next unused thinker/quote and repeat
```

The first request returns only one quote and one green line. Each tap on **That’s not it** generates the next pair on demand; after three pairs the rejection prompt disappears. The API returns per-stage timings and writes them to the server log and a `Server-Timing` header. The share page shows the pairs generated so far, read-only.

The phone hides the longer thesis, synthesis, and practice fields; the reading-notes panel reveals the quote-specific `claim`, `theory`, and `application`, plus the warm `affirmation`.

When a new question is submitted, the server concatenates the earlier questions with the new detail for retrieval, includes them in the LLM prompt, and excludes the previous thinkers. History is capped at the first question plus the last two follow-ups.

### Quote safety

- A quotation is stored only with a work, a locator, and (where relevant) a translator.
- The phone flow chooses the quote from the ranked, verified catalog before the model sees it. The model never chooses quote text or writes a quotation.
- If the model assigns a quote to the wrong thinker, the validator rejects the pair.
- If a pair fails validation after one repair, the app uses a deterministic library lens and green line rather than breaking.
- If the model selects a thinker without a verified quotation, the ranker skips it. It never invents a quote.
- The phone conversation always uses distinct thinkers and prefers at least two traditions across its three pairs.
- Profiles without a verified quotation say so explicitly in the library. Their ideas are called “ideas,” not quotes.

This is a guardrail, not a proof. The corpus is human-curated and still benefits from corrections.

## Demo mode vs live synthesis

Copy `.env.example` to `.env.local` and set one provider:

```bash
# OpenCode Go — DeepSeek V4 Pro, maximum quality
LLM_PROVIDER=opencode
OPENCODE_API_KEY=...
LLM_BASE_URL=https://opencode.ai/inference/go/openai/v1
LLM_MODEL=deepseek-v4-pro
LLM_ANALYSIS_MODEL=deepseek-v4.1-flash
LLM_CRITIC_MODEL=deepseek-v4.1-flash
LLM_AFFIRMATION_MODEL=deepseek-v4.1-flash
LLM_WRITER_EFFORT=high
LLM_CRITIC_EFFORT=high
LLM_REVISION_MODEL=deepseek-v4.1-flash
LLM_REVISION_EFFORT=high
LLM_SESSION_ID=philos-friend

# Direct DeepSeek — maximum quality
LLM_PROVIDER=deepseek
DEEPSEEK_API_KEY=...
LLM_BASE_URL=https://api.deepseek.com
LLM_MODEL=deepseek-v4-pro
LLM_ANALYSIS_MODEL=deepseek-v4.1-flash
LLM_CRITIC_MODEL=deepseek-v4.1-flash
LLM_AFFIRMATION_MODEL=deepseek-v4.1-flash
LLM_WRITER_EFFORT=high
LLM_CRITIC_EFFORT=high
LLM_REVISION_MODEL=deepseek-v4.1-flash
LLM_REVISION_EFFORT=high

# Anthropic
LLM_PROVIDER=anthropic
LLM_API_KEY=sk-ant-...
LLM_MODEL=claude-sonnet-4-5

# OpenAI-compatible (OpenAI, OpenRouter, LM Studio, etc.)
LLM_PROVIDER=openai
LLM_API_KEY=sk-...
LLM_MODEL=gpt-4.1-mini
LLM_BASE_URL=https://api.openai.com/v1

# Local Ollama
LLM_PROVIDER=ollama
LLM_MODEL=llama3.3
LLM_BASE_URL=http://127.0.0.1:11434
```

The recommended path is **OpenCode Go** pointed at `deepseek-v4-pro`. It uses the OpenAI-compatible endpoint at `https://opencode.ai/inference/go/openai/v1`, sends the required `x-opencode-session` header, runs the pair writer at `reasoning_effort: high`, and uses V4.1 Flash for analysis and the green-line pass so the request stays responsive. The older three-lens writer/critic/revision path remains available for tests and future surfaces.

The direct DeepSeek path behaves the same way. DeepSeek's legacy `deepseek-chat` and `deepseek-reasoner` names were retired in July 2026.

The API key is server-only. The client never sees it. If the provider is missing, slow, or returns invalid JSON, the app falls back gracefully rather than breaking.

The first phone pair takes roughly 35–60 seconds on OpenCode Go; each additional pair requested with **That’s not it** takes roughly 25–50 seconds. The older three-lens `advise()` path remains available for tests and future surfaces and is cached for 30 minutes in memory.

## Adding to the library

### A thinker

Add a profile to the relevant file in `data/thinkers/`:

```ts
{
  id: "your-thinker",
  name: "Your Thinker",
  dates: "1900–1970",
  tradition: "Tradition / School",
  era: "20th century",
  region: "Country",
  tags: ["meaning", "freedom", "care"],       // must be ThemeId values
  oneLine: "One sentence that makes someone want to read more.",
  ideas: [
    { title: "Idea one", summary: "Two or three sentences of plain-English theory." },
    { title: "Idea two", summary: "Another load-bearing concept." },
  ],
  quotes: [],                                  // or verified Quote objects
  keyWorks: ["Book"],
}
```

Then run `npm run check:corpus`. The checker validates the schema, quote IDs, five-per-list rule, and orphaned profiles.

### A quotation

Put verified excerpts in `data/quotes.ts` under the thinker’s ID. A quote needs:

- a unique `id`
- exact `text`
- `work`
- `locator` (book/chapter/verse)
- `translator` when relevant
- a human-checked `status: "verified"`

Keep excerpts short. Prefer public-domain translations. If you cannot verify the wording, leave the quote out; the profile’s ideas already carry the theory.

### A lineage

Edit `lib/taxonomy.ts`. A subgenre needs a parent genre, a blurb, a “why these five” sentence, and exactly five thinker IDs. Add its themes to `lib/themes.ts` so retrieval can route to it.

## Project map

```
app/
  page.tsx                 Ask
  a/[id]/page.tsx          Shareable answer permalink
  credits/page.tsx         Portrait sources, authors, and licenses
  library/page.tsx         Hidden library index, genre pages, subgenre pages, search
  thinker/[id]/page.tsx    Hidden profile, ideas, quotations, lineages
  privacy/page.tsx         Privacy policy
  terms/page.tsx           Terms
  api/advise/route.ts      POST endpoint with history and exclusions
  api/feedback/route.ts    Optional feedback endpoint for future surfaces
  api/health/route.ts      Launcher health check
components/
  ask-client.tsx           Conversation thread, history, pending state
  quote-cycle.tsx          One quote at a time, back control, inline reading notes, ask-again
  reading-notes.tsx        Context, quick breakdown, and explanation; the green line lives above the quote
  portrait.tsx             Local WebP portrait with silhouette fallback
  feedback.tsx             Retained for a future non-quote surface
  monogram.tsx             Legacy typographic portrait used by the retained source drawer
lib/
  advise.ts                Legacy three-lens pipeline retained for tests and future surfaces
  pair.ts                  On-demand one-quote + one-green-line phone pipeline
  conversation.ts          Conversation types, pair views, legacy conversion
  conversation-store.ts    Atomic local conversation and legacy share loading
  retrieve.ts              Theme extraction, lineage routing, exclusions, candidate scoring
  analysis.ts              Structured analysis of the real question
  quote-search.ts          Quote-first ranking and catalog construction
  packet.ts                Build the sixteen-thinker packet
  compose.ts               Curated fixture + deterministic template composer
  validate.ts              Source, diversity, and name checks
  affirmations.ts          Theme-based fallback affirmations for demo/legacy answers
  portraits.ts             Loads the local portrait manifest
  answers.ts               Legacy answer/feedback persistence
  rate-limit.ts            In-memory hourly limits
  llm/                     DeepSeek/OpenAI/Anthropic/Ollama adapters, writer, critic, affirmation
  taxonomy.ts              Genres, subgenres, top-five lists, rationales
  themes.ts                Theme vocabulary, triggers, practices, questions
  schema.ts                Zod schemas and shared types
data/
  thinkers/                Profiles by tradition
  portraits.json           Portrait source manifest and license metadata
  quotes.ts                Extra verified quotations merged into profiles
  quotes-expanded.ts       Second-pass verified quote expansion
public/
  portraits/               Local 256x256 WebP portraits and fallback.svg
scripts/
  dev.mjs                  Port-finding, health-checking browser launcher
  fetch-portraits.ts       Resumable Wikipedia portrait fetch
  fetch-web-portraits.ts   Curated web portraits for the remaining thinkers
  enrich-portraits.ts      Batched author/license/source enrichment
  check-corpus.ts          Human-readable corpus audit
tests/                     Corpus, engine, golden set, conversation, cost, rate-limit, portraits
```

## Known limits

- This is a curated MVP, not a complete canon. “Top five” is an editorial choice.
- Some traditions are represented by foundational theorists as well as strict philosophers (for example Huizinga, Zeami, and Leopold).
- The Indigenous Philosophies node names specific thinkers rather than claiming to speak for “Indigenous thought” as a whole.
- 123 quotations is a start, not a complete quote bank. Ninety-two profiles still have no verified quotation, so the quote-first packet prefers the 95 thinkers that do.
- The deterministic composer is deliberately plainer than live synthesis. It exists so the app never depends on a key.
- The phone path makes two model calls per pair — one lens writer and one green-line pass — plus a prompt analysis on the first pair. A first pair takes roughly 35–60 seconds on OpenCode Go; additional pairs take roughly 25–50 seconds. A missing key falls back to library content.
- In demo mode, the quote picked from a thinker can be less targeted than a live model’s selection; the full theory is still in the library profile.
- Answers are stored in `~/.philos-friend` by default. For a public multi-instance deployment, swap in Postgres or Redis before scaling.
- Rate limiting is in-memory and per process. A multi-instance deployment needs a shared Redis limiter.
- Shared answer pages are `noindex` by default so personal questions do not get indexed.
- The quote flow has no feedback UI; **That’s not it** is the signal. The feedback endpoint remains for a future surface.
- Conversation history is capped at the first question plus the last two follow-ups.
- The phone conversation stores the generated pairs and their source data; the share page shows those pairs read-only. The legacy full-answer format is still readable.
- All 187 thinkers have a local portrait. Twenty come from web-search or representative historical images where Wikipedia has no free portrait; these are marked on `/credits`, and some licenses are unknown.
- Affirmations are theme-based fallbacks in demo mode; live synthesis writes a quote-specific line.
- There are no accounts and no payment system yet.
- The bot is not a therapist and should not be used as a crisis service.

## Next: Discord

When the web MVP is proven, the Discord bot is a second renderer around `advise()`:

- `apps/bot` with discord.js and `/ask`, `/library`, `/thinker`, `/about`.
- Slash commands only; no Message Content intent.
- One quote per embed, a **That’s not it →** button, a progress marker, and a copy/share link to `/a/[id]`.
- Threads for follow-ups; ephemeral replies for private questions; the same quote-cycle state.
- Launch unverified up to 100 servers; verify the app; then enable Discovery.
- Add Premium Apps only after retention is proven. Discord takes 6% payment processing plus 15% platform fee on the Growth Tier (then 30% after $1M in cumulative sales), with payouts via Stripe.

## The flagship question

> **Why do I need to win to have fun?**
>
> **Bernard Suits** once said<br>
> “Playing a game is the voluntary attempt to overcome unnecessary obstacles.”
>
> The unnecessary obstacle is the whole point — the score tells you how the game is going, not how you are.
>
> **That’s not it.**          **Let me ask you something else.**

The first pair is Bernard Suits on play. Tapping **That’s not it.** asks the server for the next unused thinker and generates one new quote and green line. After three pairs, only **Let me ask you something else.** remains; a new question is read together with the earlier ones, and the previous thinkers are excluded.

The demo path uses the same ranked quote selection with a deterministic lens and fallback green line.
