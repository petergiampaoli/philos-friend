"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { AdviseResponse, Lens, PacketThinker, Quote } from "@/lib/schema";
import { Portrait } from "./portrait";
import { ReadingNotes } from "./reading-notes";

type QuoteMessage = {
  id: string;
  kind: "quote";
  lens: Lens;
  thinker: PacketThinker;
  quote: Quote;
  shareUrl?: string;
};

type GreenMessage = {
  id: string;
  kind: "green";
  text: string;
};

type TextMessage = {
  id: string;
  kind: "text";
  role: "simone" | "user";
  text: string;
};

type Message = QuoteMessage | GreenMessage | TextMessage;

type NotesState = {
  lens: Lens;
  thinker: PacketThinker;
  quote: Quote;
  shareUrl?: string;
};

const GREETING = "What's up?";
const REJECT_LABEL = "That's not it.";
const ASK_ELSE_LABEL = "Let me ask you something else.";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function quotePair(
  response: AdviseResponse,
  index: number,
  shareUrl?: string,
): { quote: QuoteMessage; green: GreenMessage } | null {
  const lens = response.answer.lenses[index];
  if (!lens) return null;
  const thinker = response.packet.find((item) => item.id === lens.thinkerId);
  const quote = thinker?.quotes.find((item) => item.id === lens.quoteId) ?? thinker?.quotes[0];
  if (!thinker || !quote) return null;

  return {
    quote: {
      id: `${response.id}-quote-${index}`,
      kind: "quote",
      lens,
      thinker,
      quote,
      shareUrl: shareUrl ?? response.shareUrl,
    },
    green: {
      id: `${response.id}-green-${index}`,
      kind: "green",
      text: lens.affirmation,
    },
  };
}

function initialShareMessages(response: AdviseResponse, shareUrl?: string): Message[] {
  const messages: Message[] = [
    { id: "shared-greeting", kind: "text", role: "simone", text: GREETING },
    { id: "shared-question", kind: "text", role: "user", text: response.question },
  ];

  response.answer.lenses.forEach((_, index) => {
    const pair = quotePair(response, index, shareUrl);
    if (pair) messages.push(pair.quote, pair.green);
  });

  return messages;
}

export function PhoneChat({
  initialPrompt = "",
  initialResponse,
  shareUrl,
  readOnly = false,
}: {
  initialPrompt?: string;
  initialResponse?: AdviseResponse;
  shareUrl?: string;
  readOnly?: boolean;
}) {
  const [messages, setMessages] = useState<Message[]>(() =>
    initialResponse
      ? initialShareMessages(initialResponse, shareUrl)
      : [{ id: "greeting", kind: "text", role: "simone", text: GREETING }],
  );
  const [answer, setAnswer] = useState<AdviseResponse | null>(initialResponse ?? null);
  const [activeLens, setActiveLens] = useState(0);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [notes, setNotes] = useState<NotesState | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const nextId = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);
  const initialSent = useRef(false);

  function makeId(prefix: string): string {
    nextId.current += 1;
    return `${prefix}-${nextId.current}`;
  }

  function append(message: Message) {
    setMessages((current) => [...current, message]);
  }

  function appendText(role: "simone" | "user", text: string) {
    append({ id: makeId(role), kind: "text", role, text });
  }

  function onChatScroll() {
    const element = chatRef.current;
    if (!element) return;
    stickToBottom.current =
      element.scrollHeight - element.scrollTop - element.clientHeight < 90;
  }

  useEffect(() => {
    if (!stickToBottom.current) return;
    const frame = window.requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages.length, typing]);

  async function revealAnswer(response: AdviseResponse, index: number) {
    const pair = quotePair(response, index, shareUrl);
    if (!pair) {
      setPending(false);
      setTyping(false);
      return;
    }

    pair.quote.id = makeId("quote");
    pair.green.id = makeId("green");

    setTyping(true);
    await delay(700);

    setMessages((current) => [...current, pair.quote]);
    setTyping(true);
    await delay(900);

    setMessages((current) => [...current, pair.green]);
    setTyping(false);
    setPending(false);
    setSuggestionsVisible(true);
  }

  function blurInput() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  async function ask(raw: string) {
    const question = raw.trim();
    if (!question || pending || readOnly) return;

    blurInput();
    stickToBottom.current = true;
    setInput("");
    setSuggestionsVisible(false);
    appendText("user", question);
    setPending(true);
    setTyping(true);

    const history = questions.slice(-4);
    const excludeThinkerIds = answer?.trace.chosenIds ?? [];
    setQuestions((current) => [...current, question]);

    try {
      const response = await fetch("/api/advise", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: question, history, excludeThinkerIds }),
      });
      const payload = (await response.json()) as AdviseResponse | { error?: string };

      if (!response.ok) {
        throw new Error(
          payload && typeof payload === "object" && "error" in payload && payload.error
            ? payload.error
            : "Something went wrong. Try again.",
        );
      }

      const result = payload as AdviseResponse;
      setAnswer(result);
      setActiveLens(0);
      await revealAnswer(result, 0);
    } catch (caught) {
      setTyping(false);
      setPending(false);
      const message =
        caught instanceof Error ? caught.message : "Something went wrong. Try again.";
      appendText("simone", message);
    }
  }

  async function reject() {
    if (!answer || pending || activeLens >= answer.answer.lenses.length - 1) return;

    const next = activeLens + 1;
    stickToBottom.current = true;
    appendText("user", REJECT_LABEL);
    setActiveLens(next);
    setPending(true);
    setSuggestionsVisible(false);
    setTyping(true);
    await revealAnswer(answer, next);
  }

  async function askElse() {
    if (!answer || pending) return;

    stickToBottom.current = true;
    appendText("user", ASK_ELSE_LABEL);
    setSuggestionsVisible(false);
    setPending(true);
    setTyping(true);
    await delay(700);
    appendText("simone", "Okay, what's up?");
    setTyping(false);
    setPending(false);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void ask(input);
    }
  }

  useEffect(() => {
    if (readOnly || !initialPrompt.trim() || initialSent.current) return;
    initialSent.current = true;
    const timer = window.setTimeout(() => void ask(initialPrompt), 450);
    return () => window.clearTimeout(timer);
    // The initial prompt is intentionally consumed once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt, readOnly]);

  async function copyLink(url: string | undefined) {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      setLinkCopied(false);
    }
  }

  const canReject =
    !readOnly &&
    Boolean(answer) &&
    !pending &&
    activeLens < (answer?.answer.lenses.length ?? 0) - 1;
  const canAskElse = !readOnly && Boolean(answer) && !pending && suggestionsVisible;
  const showSuggestions = !readOnly && suggestionsVisible && (canReject || canAskElse);

  return (
    <div className={`phone-page${readOnly ? " is-readonly" : ""}`}>
      <div className="phone-frame">
        <div className="phone-island" aria-hidden="true" />
        <div className="phone-status" aria-hidden="true">
          <span>9:41</span>
          <span className="phone-status-icons">
            <span className="signal-bars">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="wifi-mark">⌁</span>
            <span className="battery-mark">
              <i />
            </span>
          </span>
        </div>

        <header className="phone-header">
          <Portrait name="Simone" id="beauvoir" size="sm" />
          <div className="phone-contact">
            <p className="phone-title">Simone</p>
            <p className="phone-subtitle">
              {readOnly ? "shared conversation" : "philosophy friend"}
            </p>
          </div>
          <button
            className="phone-info"
            type="button"
            aria-label="About Simone"
            onClick={() => setInfoOpen(true)}
          >
            i
          </button>
        </header>

        <div className="phone-chat" ref={chatRef} onScroll={onChatScroll}>
          <p className="phone-day">Today</p>
          {messages.map((message) => {
            if (message.kind === "text") {
              return (
                <div
                  className={`msg-row ${message.role === "user" ? "is-user" : "is-simone"}`}
                  key={message.id}
                >
                  <div className="msg-bubble">{message.text}</div>
                </div>
              );
            }

            if (message.kind === "green") {
              return (
                <div className="msg-row is-simone" key={message.id}>
                  <div className="msg-bubble green-bubble">{message.text}</div>
                </div>
              );
            }

            return (
              <div className="msg-row is-simone" key={message.id}>
                <div className="msg-bubble quote-bubble">
                  <p className="quote-preface">
                    <button
                      className="contact-name"
                      type="button"
                      onClick={() =>
                        setNotes({
                          lens: message.lens,
                          thinker: message.thinker,
                          quote: message.quote,
                          shareUrl: message.shareUrl,
                        })
                      }
                    >
                      {message.thinker.name}
                    </button>{" "}
                    once said
                  </p>
                  <p className="quote-text">“{message.quote.text}”</p>
                </div>
              </div>
            );
          })}

          {typing ? (
            <div className="msg-row is-simone" aria-label="Simone is typing">
              <div className="msg-bubble typing-bubble" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : null}

          <div ref={endRef} />
        </div>

        {!readOnly ? (
          <>
            <form className="phone-input-bar" onSubmit={submit}>
              <label className="sr-only" htmlFor="phone-message">
                Message Simone
              </label>
              <input
                id="phone-message"
                className="phone-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onInputKeyDown}
                autoComplete="off"
                autoCapitalize="sentences"
                enterKeyHint="send"
              />
              <button
                className="phone-send"
                type="submit"
                disabled={!input.trim() || pending}
                aria-label="Send message"
              >
                <span aria-hidden="true">↑</span>
              </button>
            </form>

            {showSuggestions ? (
              <div className="suggestions-row" aria-label="Suggested responses">
                {canReject ? (
                  <button className="suggestion-chip" type="button" onClick={() => void reject()}>
                    {REJECT_LABEL}
                  </button>
                ) : null}
                {canAskElse ? (
                  <button className="suggestion-chip" type="button" onClick={() => void askElse()}>
                    {ASK_ELSE_LABEL}
                  </button>
                ) : null}
              </div>
            ) : null}

            <PhoneKeyboard />
          </>
        ) : (
          <div className="phone-readonly-bar">Read-only conversation</div>
        )}

        {notes ? (
          <div className="phone-notes-overlay" onClick={() => setNotes(null)}>
            <div className="phone-notes-sheet" onClick={(event) => event.stopPropagation()}>
              <ReadingNotes
                lens={notes.lens}
                thinker={notes.thinker}
                quote={notes.quote}
                panelId={`phone-reading-notes-${notes.quote.id}`}
                onClose={() => setNotes(null)}
              />
              {notes.shareUrl ? (
                <button
                  className="phone-share-link"
                  type="button"
                  onClick={() => void copyLink(notes.shareUrl)}
                >
                  {linkCopied ? "Link copied" : "Copy link"}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {infoOpen ? (
          <div className="phone-info-overlay" onClick={() => setInfoOpen(false)}>
            <div className="phone-info-sheet" onClick={(event) => event.stopPropagation()}>
              <button
                className="phone-info-close"
                type="button"
                aria-label="Close about"
                onClick={() => setInfoOpen(false)}
              >
                ×
              </button>
              <p className="eyebrow">Simone</p>
              <h2>A philosophy friend.</h2>
              <p>
                Three philosophers, one quote at a time. Reject a quote, ask for another angle,
                or open the philosopher&apos;s name to read the notes behind it.
              </p>
              <div className="phone-info-links">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/credits">Credits</Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {readOnly ? (
        <p className="phone-share-cta">
          <Link className="text-action is-bordered" href="/">
            Ask your own
          </Link>
        </p>
      ) : null}
    </div>
  );
}

function PhoneKeyboard() {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["⇧", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
    ["123", "space", "return"],
  ];

  return (
    <div className="phone-keyboard" aria-hidden="true">
      {rows.map((row, rowIndex) => (
        <div className="key-row" key={rowIndex}>
          {row.map((key) => (
            <span
              className={`key${key.length > 1 ? " key-special" : ""}${
                key === "space" ? " key-space" : ""
              }`}
              key={key}
            >
              {key === "space" ? "" : key}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
