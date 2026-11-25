"use client";

import { useEffect, useRef, useState } from "react";
import type { AdviseResponse } from "@/lib/schema";
import { QuoteCycle } from "./quote-cycle";

type UserTurn = {
  id: string;
  role: "user";
  text: string;
};

type AssistantTurn = {
  id: string;
  role: "assistant";
  response: AdviseResponse;
};

type Turn = UserTurn | AssistantTurn;

type LastRequest = {
  question: string;
  history: string[];
  excludeThinkerIds: string[];
};

const MAX_HISTORY = 3;
const EXAMPLE = "Why do I need to win to have fun?";

function historyFromTurns(turns: Turn[]): string[] {
  const questions = turns.filter((turn) => turn.role === "user").map((turn) => turn.text);
  if (questions.length <= MAX_HISTORY) return questions;
  return [questions[0], ...questions.slice(-(MAX_HISTORY - 1))];
}

export function AskClient({ initialPrompt }: { initialPrompt: string }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState(initialPrompt);
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<LastRequest | null>(null);
  const [collapsedAnswers, setCollapsedAnswers] = useState<Record<string, boolean>>({});

  const nextId = useRef(0);
  const requestSeq = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!initialPrompt) return;
    setInput(initialPrompt);
    const frame = window.requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialPrompt]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 220)}px`;
  }, [input]);

  const latestAssistantId = [...turns]
    .reverse()
    .find((turn) => turn.role === "assistant")?.id;
  const latestUserId = [...turns].reverse().find((turn) => turn.role === "user")?.id;

  const answerIdByUserTurn = new Map<string, string>();
  for (let index = 0; index < turns.length - 1; index += 1) {
    const turn = turns[index];
    const next = turns[index + 1];
    if (turn.role === "user" && next.role === "assistant") {
      answerIdByUserTurn.set(turn.id, next.id);
    }
  }

  useEffect(() => {
    const targetId = pending
      ? "latest-question"
      : latestAssistantId
        ? `answer-${latestAssistantId}`
        : latestUserId
          ? "latest-question"
          : null;
    if (!targetId) return;
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [turns.length, pending, latestUserId, latestAssistantId]);

  useEffect(() => {
    if (!error) return;
    document.getElementById("error-banner")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [error]);

  function makeId(): string {
    nextId.current += 1;
    return `turn-${nextId.current}`;
  }

  function toggleAnswer(answerId: string) {
    const willOpen = Boolean(collapsedAnswers[answerId]);

    setCollapsedAnswers((current) => {
      const next: Record<string, boolean> = {};
      for (const turn of turns) {
        if (turn.role === "assistant") next[turn.id] = true;
      }
      next[answerId] = !willOpen;
      return next;
    });

    if (willOpen) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(`answer-${answerId}`)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      });
    }
  }

  async function send(
    question: string,
    history: string[],
    excludeThinkerIds: string[],
  ): Promise<void> {
    const seq = requestSeq.current + 1;
    requestSeq.current = seq;
    setError(null);
    setLastRequest({ question, history, excludeThinkerIds });
    setPending(question);
    setCollapsedAnswers((current) => {
      const next = { ...current };
      for (const turn of turns) {
        if (turn.role === "assistant") next[turn.id] = true;
      }
      return next;
    });

    try {
      const response = await fetch("/api/advise", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          prompt: question,
          history,
          excludeThinkerIds,
        }),
      });

      const payload = (await response.json()) as AdviseResponse | { error?: string };

      if (!response.ok) {
        throw new Error(
          payload && typeof payload === "object" && "error" in payload && payload.error
            ? payload.error
            : "Something went wrong. Try again.",
        );
      }

      if (seq !== requestSeq.current) return;

      const assistantId = makeId();
      setCollapsedAnswers((current) => {
        const next = { ...current };
        for (const turn of turns) {
          if (turn.role === "assistant") next[turn.id] = true;
        }
        next[assistantId] = false;
        return next;
      });

      setTurns((current) => [
        ...current,
        {
          id: assistantId,
          role: "assistant",
          response: payload as AdviseResponse,
        },
      ]);
    } catch (caught) {
      if (seq !== requestSeq.current) return;
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      if (seq === requestSeq.current) setPending(null);
    }
  }

  function ask(raw: string, options?: { excludeThinkerIds?: string[] }) {
    const question = raw.trim();
    if (!question || pending) return;

    const history = historyFromTurns(turns);
    const lastAssistant = [...turns]
      .reverse()
      .find((turn): turn is AssistantTurn => turn.role === "assistant");
    const excludeThinkerIds =
      options?.excludeThinkerIds ?? lastAssistant?.response.trace.chosenIds ?? [];

    setInput("");
    setTurns((current) => [
      ...current,
      { id: makeId(), role: "user", text: question },
    ]);
    void send(question, history, excludeThinkerIds);
  }

  function retry() {
    if (!lastRequest || pending) return;
    void send(lastRequest.question, lastRequest.history, lastRequest.excludeThinkerIds);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      ask(input);
    }
  }

  function reset() {
    requestSeq.current += 1;
    setTurns([]);
    setCollapsedAnswers({});
    setInput("");
    setError(null);
    setLastRequest(null);
    setPending(null);
    textareaRef.current?.focus();
  }

  const hasConversation = turns.length > 0 || Boolean(pending);

  return (
    <div className="ask-page">
      {!hasConversation ? (
        <section className="hero">
          <h1>What troubles you, friend?</h1>
          <div className="composer-wrap">
            <Composer
              input={input}
              setInput={setInput}
              pending={pending}
              onSubmit={onSubmit}
              onKeyDown={onKeyDown}
              textareaRef={textareaRef}
            />
            <button className="example-prompt" type="button" onClick={() => ask(EXAMPLE)}>
              {EXAMPLE}
            </button>
          </div>
        </section>
      ) : (
        <section className="conversation">
          <div className="thread-toolbar">
            <button className="text-action" onClick={reset}>
              New question
            </button>
          </div>

          <div className="turns">
            {turns.map((turn) => {
              if (turn.role === "user") {
                const answerId = answerIdByUserTurn.get(turn.id);

                if (answerId) {
                  const isOpen = !collapsedAnswers[answerId];
                  return (
                    <button
                      className="user-bubble user-bubble-toggle"
                      id={turn.id === latestUserId ? "latest-question" : undefined}
                      key={turn.id}
                      type="button"
                      onClick={() => toggleAnswer(answerId)}
                      aria-expanded={isOpen}
                      aria-controls={`answer-${answerId}`}
                      title={isOpen ? "Hide answer" : "Show answer"}
                    >
                      <p>{turn.text}</p>
                    </button>
                  );
                }

                return (
                  <div
                    className="user-bubble"
                    id={turn.id === latestUserId ? "latest-question" : undefined}
                    key={turn.id}
                  >
                    <p>{turn.text}</p>
                  </div>
                );
              }

              const isCollapsed = Boolean(collapsedAnswers[turn.id]);
              return (
                <div
                  id={`answer-${turn.id}`}
                  key={turn.id}
                  className="assistant-turn"
                  hidden={isCollapsed}
                >
                  {isCollapsed ? null : (
                    <QuoteCycle
                      response={turn.response}
                      shareUrl={turn.response.shareUrl}
                      onAskAgain={(detail) =>
                        ask(detail, { excludeThinkerIds: turn.response.trace.chosenIds })
                      }
                    />
                  )}
                </div>
              );
            })}

            {pending ? (
              <div className="thinking-card" id="thinking-card" aria-live="polite">
                <div className="skeleton-quote-line" />
                <div className="skeleton-quote-line is-short" />
              </div>
            ) : null}

            {error ? (
              <div className="error-banner" id="error-banner" role="alert">
                <p>{error}</p>
                {lastRequest ? (
                  <button className="text-action" onClick={retry}>
                    Try again
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="composer-dock">
            <Composer
              input={input}
              setInput={setInput}
              pending={pending}
              onSubmit={onSubmit}
              onKeyDown={onKeyDown}
              textareaRef={textareaRef}
              compact
            />
          </div>
        </section>
      )}
    </div>
  );
}

function Composer({
  input,
  setInput,
  pending,
  onSubmit,
  onKeyDown,
  textareaRef,
  compact = false,
}: {
  input: string;
  setInput: (value: string) => void;
  pending: string | null;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  compact?: boolean;
}) {
  return (
    <form className={`composer${compact ? " is-compact" : ""}`} onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={compact ? "follow-up" : "question"}>
        Ask me anything
      </label>
      <textarea
        id={compact ? "follow-up" : "question"}
        ref={textareaRef}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={onKeyDown}
        rows={compact ? 1 : 2}
        placeholder="Ask me anything"
        disabled={Boolean(pending)}
      />
      <div className="composer-foot">
        <button
          className="arrow-button"
          type="submit"
          disabled={Boolean(pending) || !input.trim()}
          aria-label="Ask"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
