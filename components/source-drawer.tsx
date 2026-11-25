"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { PacketThinker } from "@/lib/schema";
import { Monogram } from "./monogram";
import { QuoteBlock } from "./quote-block";

export function SourceDrawer({
  open,
  packet,
  chosenIds,
  onClose,
}: {
  open: boolean;
  packet: PacketThinker[];
  chosenIds: string[];
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  const ordered = [...packet].sort(
    (a, b) => Number(chosenIds.includes(b.id)) - Number(chosenIds.includes(a.id)),
  );

  return (
    <div className="drawer-layer">
      <button className="drawer-backdrop" aria-label="Close sources" onClick={onClose} />
      <aside className="source-drawer" role="dialog" aria-modal="true" aria-label="Sources and packet">
        <div className="drawer-head">
          <div>
            <p className="eyebrow">The packet</p>
            <h2>Sources & candidates</h2>
            <p className="drawer-sub">
              Ten retrieved thinkers. The three marked in oxblood are the ones this answer used.
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close sources">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="drawer-body">
          {ordered.map((thinker) => {
            const chosen = chosenIds.includes(thinker.id);
            return (
              <article className={`source-item${chosen ? " is-chosen" : ""}`} key={thinker.id}>
                <div className="source-item-head">
                  <Monogram name={thinker.name} id={thinker.id} size="sm" />
                  <div>
                    <h3>
                      <Link href={`/thinker/${thinker.id}`} onClick={onClose}>
                        {thinker.name}
                      </Link>
                    </h3>
                    <p>
                      {thinker.dates} · {thinker.tradition}
                    </p>
                  </div>
                  {chosen ? <span className="source-badge">used</span> : null}
                </div>
                <p className="source-line">{thinker.oneLine}</p>
                {thinker.quotes.length > 0 ? (
                  thinker.quotes.map((quote) => <QuoteBlock quote={quote} key={quote.id} />)
                ) : (
                  <p className="source-noquote">
                    No verified quotation in the library; the profile uses sourced paraphrases.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
