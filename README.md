# Philos-Friend

A philosophy advice bot for the question you would only ask a friend at 1 a.m.

Ask something like **“Why do I need to win to have fun?”** and Philos-Friend answers with **three philosophers, one quote at a time**. Reject a quote with **“That’s not it”**; after all three, add the detail the quotes missed and the next set is selected from the old question plus the new detail.

Every quotation is rendered from the library by ID; the model never writes the quote text.

The demo path is fully deterministic. Add an LLM key and the same retrieved packet is rewritten by a live model, with the same source checks.

## Quick start

```bash
npm install
npm run dev
```

`npm run dev` finds the first free port, starts Next, waits for the app’s health check, and opens the default browser. If port 3000 is occupied it opens the right port instead of silently opening another app. Set `NO_OPEN=1` to suppress the browser, or use `npm run dev:next` for a raw Next server.

No API key is required. Without one, the app runs in **demo mode**:

- the flagship question gets a hand-authored set of three quotes;
- other questions use a template composition assembled from the retrieved packet;
- the quote cycle, library, profiles, and share pages all work.

```bash
npm test            # 44 tests, including a 20-question golden set
npm run typecheck
npm run build
npm run check:corpus
```

## Phase 1: the web MVP

The web app is the first product. Discord is the next delivery surface, not a rewrite.

What is in Phase 1:

- **Dark, minimal interface.** Near-black paper, light serif quotes, one warm accent, no stats or navigation chrome.
- **Quote-only conversation UI.** One quote at a time, **That’s not it →**, and an inline **Elaborate** form after the third quote.
- **Previous-quote back button.** “← Maybe it was what you said earlier” returns to the previous quote; it is hidden on quote 1 and returns from the final prompt to quote 3.
- **Inline reading notes.** Selecting the quote or the philosopher opens a panel beneath the quote with context, a quick breakdown, and the tailored explanation. It scrolls into view and closes back to the quote.
- **Collapsible history.** Completed answer cards collapse when a new question is submitted; click the matching question bubble to reopen one.
- **Local portraits.** All 187 thinkers have a locally stored, square-cropped WebP portrait under `public/portraits`, with sources listed on `/credits`. Twenty use web-search or representative images where Wikipedia has no free portrait; those are marked on the credits page.
- **Copy link on every quote bubble.** The link is a shareable `/a/[id]` page with the same quote cycle.
- **Conversation amalgam.** A new detail is read together with the earlier questions; the previous three philosophers are excluded so the next set is new.
- **Rate limiting** on the ask endpoint. The default is 60 ask requests per IP per hour; override with `ADVISE_RATE_LIMIT`.
- **Legal pages** at `/privacy` and `/terms`, linked from the footer.
- **Local persistence** in `~/.philos-friend` by default, outside the repo so Next’s file watcher does not reload the page when an answer is saved. Override with `PHILOS_FRIEND_DATA_DIR`. Before a public multi-instance deployment, swap `lib/answers.ts` for Postgres or Redis.
- **A health endpoint** at `/api/health` used by the dev launcher.

The engine boundary is already Discord-ready: `advise()` returns a serializable `{ id, question, answer, packet, trace, mode }` object with no React or Next dependencies. A future Discord bot imports the same engine and renders the quote cycle as embeds/buttons; the share page is the link it sends back. The full structured answer is still stored and returned for that future surface, even though the web quote view hides it.

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
  → quote-first ranking within each thinker
  → live writer (DeepSeek V4 Pro when configured)
  → critic → revise if any score is weak
  → dedicated green-line affirmation pass
  → validation: known IDs, quote ownership, two traditions, no stray name-drops, non-judgment
  → quote guarantee: three lenses with real verified quotations
  → quote cycle
```

The API returns a trace for debugging and future surfaces. The web quote view deliberately hides the thesis, theory, synthesis, practice, and trace; the share page shows the same three quotes. The reading-notes panel reveals the quote-specific `claim`, `theory`, and `application`, plus a warm `affirmation`.

When a follow-up is submitted, the server concatenates the earlier questions with the new detail for retrieval, includes them in the LLM prompt, and excludes the previous three thinkers. History is capped at the first question plus the last two follow-ups.

### Quote safety

- A quotation is stored only with a work, a locator, and (where relevant) a translator.
- The model returns a `quoteId`, never quote text. The browser looks the text up in the packet.
- If the model assigns a quote to the wrong thinker, the validator rejects the answer.
- If the model mentions a philosopher who is not in the packet, the validator rejects the answer.
- If validation fails once, the app asks for a repair; if it still fails, it falls back to the deterministic composer.
- If the model selects a thinker without a verified quotation, the server swaps in the next-best quoted candidate. It never invents a quote.
- The quote-only surface is guaranteed three quoted lenses when the packet has three quoted candidates.
- Profiles without a verified quotation say so explicitly in the library. Their ideas are called “ideas,” not quotes.

This is a guardrail, not a proof. The corpus is human-curated and still benefits from corrections.

## Demo mode vs live synthesis

Copy `.env.example` to `.env.local` and set one provider:

```bash
# DeepSeek — maximum quality
LLM_PROVIDER=deepseek
DEEPSEEK_API_KEY=...
LLM_BASE_URL=https://api.deepseek.com
LLM_MODEL=deepseek-v4-pro
LLM_ANALYSIS_MODEL=deepseek-v4-pro
LLM_CRITIC_MODEL=deepseek-v4-pro
LLM_AFFIRMATION_MODEL=deepseek-v4-pro
LLM_WRITER_EFFORT=max
LLM_CRITIC_EFFORT=max

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

The DeepSeek path uses `deepseek-v4-pro` with thinking enabled and `reasoning_effort: max` for the writer and critic. Analysis and the green-line pass run at high reasoning by default. DeepSeek's legacy `deepseek-chat` and `deepseek-reasoner` names were retired in July 2026.

The API key is server-only. The client never sees it. If the provider is missing, slow, or returns invalid JSON, the app falls back gracefully rather than breaking.

Answers are cached for 30 minutes in memory by prompt context, packet, provider, model, and exclusions.

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
  advise.ts                History, exclusions, prompt analysis, synthesis, validation, quote guarantee
  retrieve.ts              Theme extraction, lineage routing, exclusions, candidate scoring
  analysis.ts              Structured analysis of the real question
  quote-search.ts          Quote-first ranking and catalog construction
  packet.ts                Build the sixteen-thinker packet
  compose.ts               Curated fixture + deterministic template composer
  validate.ts              Source, diversity, and name checks
  affirmations.ts          Theme-based fallback affirmations for demo/legacy answers
  portraits.ts             Loads the local portrait manifest
  answers.ts               Local answer/feedback persistence
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
- The max-quality DeepSeek path makes several calls — analysis, writer, critic/revise, and a dedicated green-line pass — and can take roughly 20–45 seconds. A missing key falls back to demo mode.
- In demo mode, the quote picked from a thinker can be less targeted than a live model’s selection; the full theory is still in the library profile.
- Answers are stored in `~/.philos-friend` by default. For a public multi-instance deployment, swap in Postgres or Redis before scaling.
- Rate limiting is in-memory and per process. A multi-instance deployment needs a shared Redis limiter.
- Shared answer pages are `noindex` by default so personal questions do not get indexed.
- The quote flow has no feedback UI; **That’s not it** is the signal. The feedback endpoint remains for a future surface.
- Conversation history is capped at the first question plus the last two follow-ups.
- The full structured answer is stored but hidden; the web view shows only the quote cycle and the optional reading notes reveal the tailored claim, theory, application, and affirmation.
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
> “Playing a game is the voluntary attempt to overcome unnecessary obstacles.”
> — Bernard Suits, *The Grasshopper*, ch. 3
>
> **That’s not it →**          **Copy link**

The three quotes are Bernard Suits on play, Simone de Beauvoir on recognition, and Epicurus on desire. After the third rejection, the card asks what the quotes missed. A new detail is read together with the original question, and the next three philosophers are selected from that amalgam while excluding the first three.

That set is a curated demo fixture, validated against the same packet and source rules as a live answer.
