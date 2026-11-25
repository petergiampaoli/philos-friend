import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ThinkerCard } from "@/components/thinker-card";
import { Portrait } from "@/components/portrait";
import { QuoteBlock } from "@/components/quote-block";
import { THINKERS, THINKER_BY_ID } from "@/data/thinkers";
import { lineagesForThinker } from "@/lib/taxonomy";
import { THEME_LABELS } from "@/lib/themes";

export function generateStaticParams() {
  return THINKERS.map((thinker) => ({ id: thinker.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const thinker = THINKER_BY_ID.get(id);
  if (!thinker) return { title: "Thinker not found — Philos-Friend" };
  return {
    title: `${thinker.name} — Philos-Friend`,
    description: thinker.oneLine,
  };
}

export default async function ThinkerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thinker = THINKER_BY_ID.get(id);
  if (!thinker) notFound();

  const lineages = lineagesForThinker(thinker.id);
  const related = THINKERS.filter(
    (candidate) =>
      candidate.id !== thinker.id &&
      lineages.some((lineage) => lineage.five.includes(candidate.id)),
  ).slice(0, 4);

  const askHref = `/?prompt=${encodeURIComponent(`What would ${thinker.name} say about `)}`;

  return (
    <div className="thinker-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/library">Library</Link>
        <span>/</span>
        {lineages[0] ? (
          <>
            <Link href={`/library?node=${lineages[0].id}`}>{lineages[0].name}</Link>
            <span>/</span>
          </>
        ) : null}
        <span>{thinker.name}</span>
      </nav>

      <header className="thinker-hero">
        <Portrait name={thinker.name} id={thinker.id} size="lg" />
        <div className="thinker-hero-copy">
          <p className="eyebrow">
            {thinker.tradition} · {thinker.era}
          </p>
          <h1>{thinker.name}</h1>
          <p className="thinker-dates-line">
            {thinker.dates} <span>·</span> {thinker.region}
          </p>
          <p className="thinker-hero-line">{thinker.oneLine}</p>
          <div className="tag-row">
            {thinker.tags.map((tag) => (
              <span className="tag" key={tag}>
                {THEME_LABELS[tag]}
              </span>
            ))}
          </div>
          <Link className="ask-button" href={askHref}>
            Ask about {thinker.name} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      <div className="thinker-body">
        <section className="ideas-section">
          <div className="section-head">
            <h2>The ideas</h2>
            <span className="section-meta">{thinker.ideas.length} load-bearing concepts</span>
          </div>
          <div className="idea-list">
            {thinker.ideas.map((idea, index) => (
              <article className="idea-card" key={idea.title}>
                <span className="idea-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{idea.title}</h3>
                  <p>{idea.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="thinker-aside">
          <section className="aside-section">
            <div className="section-head">
              <h2>In their words</h2>
              <span className="section-meta">
                {thinker.quotes.length} {thinker.quotes.length === 1 ? "quote" : "quotes"}
              </span>
            </div>
            {thinker.quotes.length > 0 ? (
              <div className="aside-quotes">
                {thinker.quotes.map((quote) => (
                  <QuoteBlock quote={quote} key={quote.id} />
                ))}
              </div>
            ) : (
              <p className="empty-note">
                No verified quotation is in the library for this profile yet. The ideas above are
                sourced paraphrases, not direct quotations.
              </p>
            )}
          </section>

          <section className="aside-section">
            <div className="section-head">
              <h2>Key works</h2>
            </div>
            <ul className="works-list">
              {thinker.keyWorks.map((work) => (
                <li key={work}>{work}</li>
              ))}
            </ul>
          </section>

          <section className="aside-section">
            <div className="section-head">
              <h2>Where they sit</h2>
            </div>
            <div className="lineage-list">
              {lineages.map((lineage) => (
                <Link href={`/library?node=${lineage.id}`} key={lineage.id}>
                  <span>{lineage.name}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="related-section">
          <div className="section-head">
            <h2>Nearby in the library</h2>
            <span className="section-meta">Shared lineages</span>
          </div>
          <div className="thinker-grid">
            {related.map((candidate) => (
              <ThinkerCard thinker={candidate} key={candidate.id} compact />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
