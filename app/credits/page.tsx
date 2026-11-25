import Link from "next/link";
import type { Metadata } from "next";
import { THINKER_BY_ID } from "@/data/thinkers";
import { PORTRAITS } from "@/lib/portraits";

export const metadata: Metadata = {
  title: "Credits — Philos-Friend",
  description: "Portrait sources and licenses for Philos-Friend.",
};

function cleanAuthor(author: string): string {
  return author
    .replace(/_/g, " ")
    .replace(/(?:Unknown author\s*)+/gi, "Unknown author")
    .replace(/\s+/g, " ")
    .trim();
}

export default function CreditsPage() {
  const entries = Object.entries(PORTRAITS)
    .map(([id, portrait]) => ({ id, portrait }))
    .sort((a, b) => {
      const aName = THINKER_BY_ID.get(a.id)?.name ?? a.id;
      const bName = THINKER_BY_ID.get(b.id)?.name ?? b.id;
      return aName.localeCompare(bName);
    });

  return (
    <div className="legal-page credits-page">
      <p className="eyebrow">Credits</p>
      <h1>Sources</h1>
      <p className="legal-updated">
        Portrait images come from Wikipedia, Wikimedia Commons, university pages, and other web
        sources. Each entry lists its source and the license where one is known. A few thinkers have
        no surviving portrait, so a representative historical image is used and marked below.
      </p>

      {entries.length === 0 ? (
        <p>Portrait credits will appear here once the portrait set is generated.</p>
      ) : (
        <ul className="credits-list">
          {entries.map(({ id, portrait }) => {
            const thinker = THINKER_BY_ID.get(id);
            const articleUrl = portrait.pageTitle
              ? `https://en.wikipedia.org/wiki/${encodeURIComponent(
                  portrait.pageTitle.replace(/ /g, "_"),
                )}`
              : undefined;
            return (
              <li key={id}>
                <strong>{thinker?.name ?? id}</strong>
                {portrait.author ? <span> · {cleanAuthor(portrait.author)}</span> : null}
                {portrait.license ? (
                  <span>
                    {" "}
                    ·{" "}
                    {portrait.licenseUrl ? (
                      <a href={portrait.licenseUrl} target="_blank" rel="noopener noreferrer">
                        {portrait.license}
                      </a>
                    ) : (
                      portrait.license
                    )}
                  </span>
                ) : null}
                {portrait.sourceUrl ? (
                  <>
                    {" "}
                    ·{" "}
                    <a href={portrait.sourceUrl} target="_blank" rel="noopener noreferrer">
                      source
                    </a>
                  </>
                ) : articleUrl ? (
                  <>
                    {" "}
                    ·{" "}
                    <a href={articleUrl} target="_blank" rel="noopener noreferrer">
                      wikipedia
                    </a>
                  </>
                ) : null}
                {portrait.note ? <span className="credit-note"> · {portrait.note}</span> : null}
              </li>
            );
          })}
        </ul>
      )}

      <Link className="legal-back" href="/">
        ← Back to Philos-Friend
      </Link>
    </div>
  );
}
