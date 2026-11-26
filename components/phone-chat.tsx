"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ConversationPairView, PairResponse } from "@/lib/conversation";
import type { Lens, PacketThinker, Quote } from "@/lib/schema";
import { Portrait } from "./portrait";
import { ReadingNotes } from "./reading-notes";

type QuoteMessage = {
  id: string;
  kind: "quote";
  pair: ConversationPairView;
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

type SessionState = {
  id: string;
  pairs: number;
  remaining: number;
  shareUrl?: string;
  thinkerIds: string[];
};

const GREETING = "What's up?";
const REJECT_LABEL = "That's not it.";
const ASK_ELSE_LABEL = "Let me ask you something else.";
const MAX_PAIRS = 3;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pairMessages(
  pair: ConversationPairView,
  shareUrl: string | undefined,
  prefix: string,
): { quote: QuoteMessage; green: GreenMessage } {
  return {
    quote: {
      id: `${prefix}-quote`,
      kind: "quote",
      pair,
      shareUrl,
    },
    green: {
      id: `${prefix}-green`,
      kind: "green",
      text: pair.lens.affirmation,
    },
  };
}

function initialShareMessages(
  question: string | undefined,
  pairs: ConversationPairView[] | undefined,
  shareUrl: string | undefined,
): Message[] {
  const messages: Message[] = [
    { id: "shared-greeting", kind: "text", role: "simone", text: GREETING },
  ];

  if (question) {
    messages.push({ id: "shared-question", kind: "text", role: "user", text: question });
  }

  (pairs ?? []).forEach((pair, index) => {
    const { quote, green } = pairMessages(pair, shareUrl, `shared-${index}`);
    messages.push(quote, green);
  });

  return messages;
}

function errorMessage(payload: unknown): string {
  if (
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    typeof payload.error === "string" &&
    payload.error
  ) {
    return payload.error;
  }
  return "Something went wrong. Try again.";
}

export function PhoneChat({
  initialPrompt = "",
  initialQuestion,
  initialPairs,
  shareUrl,
  readOnly = false,
}: {
  initialPrompt?: string;
  initialQuestion?: string;
  initialPairs?: ConversationPairView[];
  shareUrl?: string;
  readOnly?: boolean;
}) {
  const [messages, setMessages] = useState<Message[]>(() =>
    initialPairs?.length
      ? initialShareMessages(initialQuestion, initialPairs, shareUrl)
      : [{ id: "greeting", kind: "text", role: "simone", text: GREETING }],
  );
  const [session, setSession] = useState<SessionState | null>(() =>
    initialPairs?.length
      ? {
          id: "",
          pairs: initialPairs.length,
          remaining: Math.max(0, MAX_PAIRS - initialPairs.length),
          shareUrl,
          thinkerIds: initialPairs.map((pair) => pair.thinker.id),
        }
      : null,
  );
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

  function blurInput() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  async function revealPair(pair: ConversationPairView, nextShareUrl: string | undefined) {
    const { quote, green } = pairMessages(pair, nextShareUrl, makeId("pair"));
    setTyping(true);
    await delay(700);

    append(quote);
    setTyping(true);
    await delay(900);

    append(green);
    setTyping(false);
    setPending(false);
    setSuggestionsVisible(true);
  }

  async function ask(raw: string) {
    const question = raw.trim();
    if (!question || pending || readOnly) return;

    const previousSession = session;
    blurInput();
    stickToBottom.current = true;
    setInput("");
    setSuggestionsVisible(false);
    appendText("user", question);
    setPending(true);
    setTyping(true);

    const history = questions.slice(-4);
    const excludeThinkerIds = previousSession?.thinkerIds ?? [];
    setQuestions((current) => [...current, question]);

    try {
      const response = await fetch("/api/advise", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: question, history, excludeThinkerIds }),
      });
      const payload: unknown = await response.json();

      if (!response.ok) throw new Error(errorMessage(payload));

      const result = payload as PairResponse;
      setSession({
        id: result.conversationId,
        pairs: result.pairIndex + 1,
        remaining: result.remaining,
        shareUrl: result.shareUrl,
        thinkerIds: [result.pair.thinker.id],
      });
      await revealPair(result.pair, result.shareUrl);
    } catch (caught) {
      setTyping(false);
      setPending(false);
      appendText(
        "simone",
        caught instanceof Error ? caught.message : "Something went wrong. Try again.",
      );
    }
  }

  async function reject() {
    const current = session;
    if (!current || current.pairs >= MAX_PAIRS || pending || readOnly) return;

    blurInput();
    stickToBottom.current = true;
    appendText("user", REJECT_LABEL);
    setPending(true);
    setSuggestionsVisible(false);
    setTyping(true);

    try {
      const response = await fetch("/api/advise", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          conversationId: current.id,
          pairIndex: current.pairs,
        }),
      });
      const payload: unknown = await response.json();

      if (!response.ok) throw new Error(errorMessage(payload));

      const result = payload as PairResponse;
      setSession({
        id: result.conversationId,
        pairs: result.pairIndex + 1,
        remaining: result.remaining,
        shareUrl: result.shareUrl ?? current.shareUrl,
        thinkerIds: [...current.thinkerIds, result.pair.thinker.id],
      });
      await revealPair(result.pair, result.shareUrl ?? current.shareUrl);
    } catch (caught) {
      setTyping(false);
      setPending(false);
      appendText(
        "simone",
        caught instanceof Error ? caught.message : "Something went wrong. Try again.",
      );
      setSuggestionsVisible(true);
    }
  }

  async function askElse() {
    if (!session || pending || readOnly) return;

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
    Boolean(session) &&
    !pending &&
    (session?.remaining ?? 0) > 0;
  const canAskElse = !readOnly && Boolean(session) && !pending && suggestionsVisible;
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
          <Portrait name="Simone" id="simone" size="sm" src="/simone-avatar.svg" />
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
                  <div className="quote-preface">
                    <Portrait
                      name={message.pair.thinker.name}
                      id={message.pair.thinker.id}
                      size="xs"
                    />
                    <p className="quote-name-line">
                      <button
                        className="contact-name"
                        type="button"
                        onClick={() =>
                          setNotes({
                            lens: message.pair.lens,
                            thinker: message.pair.thinker,
                            quote: message.pair.quote,
                            shareUrl: message.shareUrl,
                          })
                        }
                      >
                        {message.pair.thinker.name}
                      </button>{" "}once said
                    </p>
                  </div>
                  <p className="quote-text">“{message.pair.quote.text}”</p>
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
