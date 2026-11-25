"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { affirmationFor } from "@/lib/affirmations";
import type { AdviseResponse } from "@/lib/schema";
import { Portrait } from "./portrait";
import { ReadingNotes } from "./reading-notes";

export function QuoteCycle({
  response,
  shareUrl,
  onAskAgain,
  askAgainHref = "/",
}: {
  response: AdviseResponse;
  shareUrl?: string;
  onAskAgain?: (detail: string) => void;
  askAgainHref?: string;
}) {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [detail, setDetail] = useState("");
  const [readingOpen, setReadingOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const cardRef = useRef<HTMLElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLTextAreaElement>(null);

  const answerUrl = shareUrl ?? response.shareUrl;
  const lenses = response.answer.lenses;
  const lens = lenses[active];
  const thinker = lens
    ? response.packet.find((candidate) => candidate.id === lens.thinkerId)
    : undefined;
  const quote = thinker?.quotes.find((item) => item.id === lens?.quoteId) ?? thinker?.quotes[0];
  const affirmation =
    lens && thinker
      ? lens.affirmation ?? affirmationFor(thinker.tags, response.trace.themes[0])
      : null;
  const canGoBack = active > 0 || done;
  const panelId = `reading-notes-${response.id}`;

  useEffect(() => {
    if (!done) return;
    const frame = window.requestAnimationFrame(() => detailRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [done]);

  useEffect(() => {
    if (!readingOpen) return;
    const frame = window.requestAnimationFrame(() =>
      notesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [readingOpen]);

  function closeNotes() {
    setReadingOpen(false);
    window.requestAnimationFrame(() =>
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function openNotes() {
    if (!quote || !thinker) return;
    setReadingOpen(true);
  }

  function toggleNotes() {
    if (readingOpen) closeNotes();
    else openNotes();
  }

  function reject() {
    setReadingOpen(false);
    if (active < lenses.length - 1) {
      setActive((current) => current + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    setReadingOpen(false);
    if (done) {
      setDone(false);
      setActive(lenses.length - 1);
    } else if (active > 0) {
      setActive((current) => current - 1);
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

  function submitAgain(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = detail.trim();
    if (!value || submitted || !onAskAgain) return;
    setSubmitted(true);
    onAskAgain(value);
  }

  function onReaskKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <>
      <article className="quote-cycle" ref={cardRef}>
        {!done ? (
          <>
            {affirmation ? <p className="quote-affirmation">{affirmation}</p> : null}

            <div className="quote-cycle-quote-wrap" key={`${active}-${thinker?.id ?? "none"}`}>
              {quote ? (
                <button
                  className="quote-cycle-quote-button"
                  type="button"
                  onClick={toggleNotes}
                  aria-expanded={readingOpen}
                  aria-controls={panelId}
                >
                  <span className="quote-cycle-mark" aria-hidden="true">
                    “
                  </span>
                  {quote.text}
                  <span className="quote-cycle-mark" aria-hidden="true">
                    ”
                  </span>
                </button>
              ) : (
                <p className="quote-cycle-empty">
                  No verified quotation for this thinker is in the library yet.
                </p>
              )}
            </div>

            <div className="quote-byline">
              {quote && thinker ? (
                <button
                  className="reading-notes-trigger"
                  type="button"
                  onClick={toggleNotes}
                  aria-expanded={readingOpen}
                  aria-controls={panelId}
                >
                  Reading notes {readingOpen ? "↑" : "↓"}
                </button>
              ) : (
                <span />
              )}

              {thinker ? (
                <button
                  className="quote-thinker"
                  type="button"
                  onClick={toggleNotes}
                  aria-expanded={readingOpen}
                  aria-controls={panelId}
                  aria-label={`Reading notes for ${thinker.name}`}
                >
                  <Portrait name={thinker.name} id={thinker.id} size="sm" />
                  <span>{thinker.name}</span>
                </button>
              ) : null}
            </div>

            {canGoBack ? (
              <button className="quote-back" type="button" onClick={back}>
                ← Maybe it was what you said earlier
              </button>
            ) : null}

            <footer className="quote-cycle-actions">
              <button className="reject-button" type="button" onClick={reject}>
                That&apos;s not it <span aria-hidden="true">→</span>
              </button>
              {answerUrl ? (
                <button
                  className="text-action is-bordered"
                  type="button"
                  onClick={() => void copyLink()}
                >
                  {linkCopied ? "Link copied" : "Copy link"}
                </button>
              ) : null}
            </footer>
          </>
        ) : (
          <div className="quote-cycle-done">
            {canGoBack ? (
              <button className="quote-back" type="button" onClick={back}>
                ← Maybe it was what you said earlier
              </button>
            ) : null}

            {submitted ? null : (
              <>
                <p className="eyebrow">None of these three?</p>
                <p className="quote-cycle-done-copy">Elaborate</p>

                {onAskAgain ? (
                  <form className="reask-form" onSubmit={submitAgain}>
                    <label className="sr-only" htmlFor={`reask-${response.id}`}>
                      What did the quotes miss?
                    </label>
                    <textarea
                      id={`reask-${response.id}`}
                      ref={detailRef}
                      value={detail}
                      onChange={(event) => setDetail(event.target.value)}
                      onKeyDown={onReaskKeyDown}
                      rows={2}
                      placeholder="Go into some detail"
                    />
                    <button
                      className="arrow-button"
                      type="submit"
                      disabled={!detail.trim()}
                      aria-label="Ask again"
                    >
                      <span aria-hidden="true">→</span>
                    </button>
                  </form>
                ) : (
                  <Link className="text-action is-bordered" href={askAgainHref}>
                    Ask your own question
                  </Link>
                )}
              </>
            )}

            <footer className="quote-cycle-actions is-done-actions">
              {answerUrl ? (
                <button
                  className="text-action is-bordered"
                  type="button"
                  onClick={() => void copyLink()}
                >
                  {linkCopied ? "Link copied" : "Copy link"}
                </button>
              ) : null}
            </footer>
          </div>
        )}
      </article>

      {readingOpen && !done && thinker && quote && lens ? (
        <div className="reading-notes-anchor" ref={notesRef}>
          <ReadingNotes
            lens={lens}
            thinker={thinker}
            quote={quote}
            panelId={panelId}
            onClose={closeNotes}
          />
        </div>
      ) : null}
    </>
  );
}
