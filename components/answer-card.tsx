"use client";

import Link from "next/link";
import { useState } from "react";
import type { AdviseResponse, PacketThinker } from "@/lib/schema";
import { Feedback } from "./feedback";
import { QuoteBlock } from "./quote-block";
import { TracePanel } from "./trace-panel";

const ROMAN = ["I", "II", "III"];

function modeLabel(response: AdviseResponse): string {
  if (response.trace.mode === "llm") {
    return `Live synthesis${response.trace.model ? ` · ${response.trace.model}` : ""}`;
  }
  if (response.trace.notes.includes("curated demo answer")) return "Curated demo";
  return "Library composition";
}

function answerMarkdown(question: string, response: AdviseResponse): string {
  const lines: string[] = [];
  lines.push(`**Q:** ${question}`, "", response.answer.thesis, "");

  response.answer.lenses.forEach((lens, index) => {
    const thinker = response.packet.find((item) => item.id === lens.thinkerId);
    const quote = thinker?.quotes.find((item) => item.id === lens.quoteId);
    lines.push(`### ${ROMAN[index]}. ${lens.claim}`);
    lines.push(`*${thinker?.name ?? lens.thinkerId}*`);
    if (quote) {
      lines.push("", `> “${quote.text}”`, `> — ${quote.work}, ${quote.locator}`);
    }
    lines.push("", lens.theory, "", `**What this asks of you:** ${lens.application}`, "");
  });

  lines.push("### Synthesis", "", response.answer.synthesis, "");
  lines.push(`**Try this:** ${response.answer.practice}`, "");
  lines.push(`**Ask yourself:** ${response.answer.question}`, "");
  lines.push("— Philos-Friend");
  return lines.join("\n");
}

export function AnswerCard({
  question,
  response,
  onOpenSources,
  shareUrl,
}: {
  question: string;
  response: AdviseResponse;
  onOpenSources: (packet: PacketThinker[], chosenIds: string[]) => void;
  shareUrl?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const answerUrl = shareUrl ?? response.shareUrl;

  async function copy() {
    try {
      await navigator.clipboard.writeText(answerMarkdown(question, response));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function copyLink() {
    if (!answerUrl) return;
    try {
      await navigator.clipboard.writeText(answerUrl);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      setLinkCopied(false);
    }
  }

  return (
    <article className="answer-card">
      {!response.trace.valid ? (
        <div className="answer-warning">
          This answer did not pass every source check. Treat the citations with extra care.
        </div>
      ) : null}

      <header className="answer-head">
        <p className="answer-thesis">{response.answer.thesis}</p>
      </header>

      <div className="lens-grid">
        {response.answer.lenses.map((lens, index) => {
          const thinker = response.packet.find((item) => item.id === lens.thinkerId);
          const quote = thinker?.quotes.find((item) => item.id === lens.quoteId);

          return (
            <section className="lens-card" key={`${lens.thinkerId}-${index}`}>
              <div className="lens-top">
                <span className="lens-number">{ROMAN[index]}</span>
                <span className="lens-thinker">
                  {thinker ? (
                    <Link href={`/thinker/${thinker.id}`}>{thinker.name}</Link>
                  ) : (
                    lens.thinkerId
                  )}
                  {thinker ? <small>{thinker.dates}</small> : null}
                </span>
              </div>
              <h3>{lens.claim}</h3>
              {quote ? <QuoteBlock quote={quote} /> : null}
              <div className="lens-copy">
                <p className="lens-label">The idea</p>
                <p>{lens.theory}</p>
                <p className="lens-label">What this asks of you</p>
                <p>{lens.application}</p>
              </div>
              {thinker ? (
                <Link className="text-link" href={`/thinker/${thinker.id}`}>
                  Read the profile <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </section>
          );
        })}
      </div>

      <section className="synthesis-panel">
        <p className="eyebrow">Synthesis</p>
        <p>{response.answer.synthesis}</p>
      </section>

      <div className="answer-actions">
        <div className="practice-box">
          <p className="eyebrow">Try this</p>
          <p>{response.answer.practice}</p>
        </div>
        <div className="question-back">
          <p className="eyebrow">Ask yourself</p>
          <p>{response.answer.question}</p>
        </div>
      </div>

      <footer className="answer-foot">
        <div className="answer-foot-left">
          <span className="trace-note">
            {response.answer.lenses.length} lenses · {new Set(response.trace.traditions.map((item) => item.split("/")[0].trim())).size} traditions
          </span>
          <button
            className="ghost-button"
            onClick={() => onOpenSources(response.packet, response.trace.chosenIds)}
          >
            Sources & packet ({response.packet.length})
          </button>
        </div>
        <div className="answer-foot-right">
          {answerUrl ? (
            <button className="ghost-button" onClick={copyLink}>
              {linkCopied ? "Link copied" : "Copy link"}
            </button>
          ) : null}
          <button className="ghost-button" onClick={copy}>
            {copied ? "Copied" : "Copy as markdown"}
          </button>
        </div>
      </footer>

      <Feedback answerId={response.id} />

      <TracePanel trace={response.trace} packet={response.packet} />
    </article>
  );
}
