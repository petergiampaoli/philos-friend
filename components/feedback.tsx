"use client";

import { useState } from "react";

export function Feedback({ answerId }: { answerId?: string }) {
  const [sent, setSent] = useState<"up" | "down" | null>(null);
  const [error, setError] = useState(false);

  if (!answerId) return null;

  async function send(value: "up" | "down") {
    if (sent) return;
    setError(false);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: answerId, value }),
      });
      if (!response.ok) throw new Error("feedback failed");
      setSent(value);
    } catch {
      setError(true);
    }
  }

  return (
    <div className="feedback" aria-live="polite">
      <span className="feedback-label">{sent ? "Noted." : "Was this useful?"}</span>
      {sent ? (
        <span className="feedback-thanks">
          {sent === "up" ? "Good. Keep asking." : "Thanks — that helps tune the library."}
        </span>
      ) : (
        <div className="feedback-buttons">
          <button type="button" onClick={() => void send("up")}>
            Yes
          </button>
          <button type="button" onClick={() => void send("down")}>
            Not quite
          </button>
        </div>
      )}
      {error ? <span className="feedback-error">Could not save that.</span> : null}
    </div>
  );
}
