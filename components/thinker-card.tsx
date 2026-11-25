import Link from "next/link";
import type { Thinker } from "@/lib/schema";
import { lineagesForThinker } from "@/lib/taxonomy";
import { THEME_LABELS } from "@/lib/themes";
import { Portrait } from "./portrait";

export function ThinkerCard({
  thinker,
  highlight = false,
  compact = false,
}: {
  thinker: Thinker;
  highlight?: boolean;
  compact?: boolean;
}) {
  const lineages = lineagesForThinker(thinker.id);

  return (
    <Link
      href={`/thinker/${thinker.id}`}
      className={`thinker-card${highlight ? " is-chosen" : ""}${compact ? " is-compact" : ""}`}
    >
      <div className="thinker-card-head">
        <Portrait name={thinker.name} id={thinker.id} size={compact ? "sm" : "md"} />
        <div className="thinker-card-title">
          <h3>{thinker.name}</h3>
          <p className="thinker-dates">{thinker.dates}</p>
        </div>
        {highlight ? <span className="chosen-dot" title="Used in this answer" /> : null}
      </div>
      <p className="thinker-tradition">
        {thinker.tradition} <span>·</span> {thinker.region}
      </p>
      <p className="thinker-line">{thinker.oneLine}</p>
      {!compact ? (
        <>
          <div className="tag-row">
            {thinker.tags.slice(0, 4).map((tag) => (
              <span className="tag" key={tag}>
                {THEME_LABELS[tag]}
              </span>
            ))}
          </div>
          <div className="thinker-card-foot">
            <span>
              {thinker.quotes.length} {thinker.quotes.length === 1 ? "quote" : "quotes"}
            </span>
            <span>
              {lineages.length} {lineages.length === 1 ? "lineage" : "lineages"}
            </span>
          </div>
        </>
      ) : null}
    </Link>
  );
}
