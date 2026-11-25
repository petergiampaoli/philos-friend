"use client";

import type { PacketThinker, Trace } from "@/lib/schema";
import { getLineage } from "@/lib/taxonomy";
import { THEME_LABELS } from "@/lib/themes";

function compactNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return String(value);
}

export function TracePanel({
  trace,
  packet,
}: {
  trace: Trace;
  packet: PacketThinker[];
}) {
  const nameFor = (id: string) => packet.find((thinker) => thinker.id === id)?.name ?? id;

  return (
    <details className="trace-panel">
      <summary>
        <span>How this answer was made</span>
        <span className={`trace-status ${trace.valid ? "is-valid" : "is-invalid"}`}>
          {trace.valid ? "source check passed" : "source check flagged"}
        </span>
      </summary>
      <div className="trace-body">
        <div className="trace-row">
          <span className="trace-label">Matched themes</span>
          <div className="trace-chips">
            {trace.themes.map((theme) => (
              <span className="trace-chip" key={theme}>
                {THEME_LABELS[theme]}
              </span>
            ))}
          </div>
        </div>
        <div className="trace-row">
          <span className="trace-label">Lineages consulted</span>
          <div className="trace-chips">
            {trace.lineageIds.map((id) => (
              <span className="trace-chip" key={id}>
                {getLineage(id)?.name ?? id}
              </span>
            ))}
          </div>
        </div>
        <div className="trace-row">
          <span className="trace-label">Candidates</span>
          <div className="trace-chips">
            {trace.candidateIds.map((id) => (
              <span
                className={`trace-chip${trace.chosenIds.includes(id) ? " is-chosen" : ""}`}
                key={id}
              >
                {nameFor(id)}
                {trace.chosenIds.includes(id) ? " ·" : ""}
              </span>
            ))}
          </div>
        </div>
        <div className="trace-meta">
          <span>
            {trace.mode === "llm" ? "Live synthesis" : "Library composition"}
            {trace.provider ? ` · ${trace.provider}` : ""}
            {trace.model ? ` / ${trace.model}` : ""}
          </span>
          <span>{trace.latencyMs} ms</span>
          {trace.inputTokens !== undefined ? (
            <span>
              {compactNumber(trace.inputTokens)} in / {compactNumber(trace.outputTokens ?? 0)} out
            </span>
          ) : null}
          {trace.estimatedCostUsd !== undefined ? (
            <span>~${trace.estimatedCostUsd.toFixed(4)}</span>
          ) : null}
          <span>{trace.notes.join(" · ")}</span>
        </div>
      </div>
    </details>
  );
}
