import Link from "next/link";
import { notFound } from "next/navigation";
import { ThinkerCard } from "@/components/thinker-card";
import { THINKERS, THINKER_BY_ID } from "@/data/thinkers";
import { getLineage, GENRES, SUBGENRES, subgenresOf, LINEAGES } from "@/lib/taxonomy";
import { THEME_LABELS } from "@/lib/themes";

type SearchParams = Promise<{ q?: string; genre?: string; node?: string }>;

function fiveNames(ids: string[]): string {
  return ids
    .map((id) => THINKER_BY_ID.get(id)?.name ?? id)
    .join(" · ");
}

export default async function LibraryPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const nodeId = typeof params.node === "string" ? params.node : "";
  const genreId = typeof params.genre === "string" ? params.genre : "";
  const quoteCount = THINKERS.reduce((total, thinker) => total + thinker.quotes.length, 0);

  const activeNode = nodeId ? getLineage(nodeId) : undefined;
  const activeGenre =
    activeNode?.kind === "genre"
      ? activeNode
      : activeNode?.parent
        ? getLineage(activeNode.parent)
        : genreId
          ? getLineage(genreId)
          : undefined;

  if ((nodeId && !activeNode) || (genreId && !activeGenre)) notFound();

  const results = query
    ? THINKERS.filter((thinker) => {
        const haystack = [
          thinker.name,
          thinker.dates,
          thinker.tradition,
          thinker.region,
          thinker.era,
          thinker.oneLine,
          ...thinker.keyWorks,
          ...thinker.tags.map((tag) => THEME_LABELS[tag]),
          ...thinker.ideas.flatMap((idea) => [idea.title, idea.summary]),
        ]
          .join(" ")
          .toLowerCase();
        return query
          .toLowerCase()
          .split(/\s+/)
          .filter(Boolean)
          .every((token) => haystack.includes(token));
      }).slice(0, 80)
    : [];

  const isIndex = !query && !activeNode;

  return (
    <div className="library-page">
      {isIndex ? (
        <>
          <header className="library-head">
            <div>
              <p className="eyebrow">The Library</p>
              <h1>A canon you can actually argue with.</h1>
              <p className="library-sub">
                {THINKERS.length} thinkers. {SUBGENRES.length} lineages. {LINEAGES.length * 5}{" "}
                top-five seats. Every list is a curated path, not an objective ranking.
              </p>
            </div>
            <div className="library-stats">
              <span>
                <strong>{SUBGENRES.length}</strong>
                lineages
              </span>
              <span>
                <strong>{quoteCount}</strong>
                sourced quotes
              </span>
              <span>
                <strong>{THINKERS.length}</strong>
                profiles
              </span>
            </div>
          </header>
          <SearchForm query={query} />
        </>
      ) : (
        <div className="library-toolbar">
          <Link className="text-link" href="/library">
            <span aria-hidden="true">←</span> All genres
          </Link>
          <SearchForm query={query} compact />
        </div>
      )}

      {query ? (
        <section className="search-results">
          <div className="section-head">
            <h2>
              {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
            </h2>
            <Link className="text-link" href="/library">
              Clear search
            </Link>
          </div>
          {results.length === 0 ? (
            <p className="empty-note">
              Nothing in the library matches that yet. Try a thinker, a tradition, or a theme like
              “status” or “impermanence.”
            </p>
          ) : (
            <div className="thinker-grid">
              {results.map((thinker) => (
                <ThinkerCard thinker={thinker} key={thinker.id} />
              ))}
            </div>
          )}
        </section>
      ) : activeNode ? (
        <section className="library-node">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/library">Library</Link>
            <span>/</span>
            {activeNode.kind === "subgenre" && activeGenre ? (
              <>
                <Link href={`/library?genre=${activeGenre.id}`}>{activeGenre.name}</Link>
                <span>/</span>
              </>
            ) : null}
            <span>{activeNode.name}</span>
          </nav>

          <div className="node-head">
            <div>
              <p className="eyebrow">
                {activeNode.kind === "genre" ? "Genre" : "Subgenre"}
              </p>
              <h2>{activeNode.name}</h2>
              <p className="node-blurb">{activeNode.blurb}</p>
            </div>
            <div className="why-five">
              <p className="eyebrow">Why these five</p>
              <p>{activeNode.whyTheseFive}</p>
            </div>
          </div>

          <div className="top-five">
            <div className="section-head">
              <h3>Top five</h3>
              <span className="section-meta">The short shelf</span>
            </div>
            <div className="thinker-grid">
              {activeNode.five.map((id) => {
                const thinker = THINKER_BY_ID.get(id);
                return thinker ? <ThinkerCard thinker={thinker} key={id} /> : null;
              })}
            </div>
          </div>

          {activeNode.kind === "genre" ? (
            <div className="subgenre-section">
              <div className="section-head">
                <h3>Subgenres</h3>
                <span className="section-meta">{subgenresOf(activeNode.id).length} paths</span>
              </div>
              <div className="subgenre-grid">
                {subgenresOf(activeNode.id).map((subgenre) => (
                  <Link
                    className="subgenre-card"
                    href={`/library?node=${subgenre.id}`}
                    key={subgenre.id}
                  >
                    <h4>{subgenre.name}</h4>
                    <p>{subgenre.blurb}</p>
                    <span className="subgenre-five">{fiveNames(subgenre.five)}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : activeGenre ? (
            <div className="subgenre-section">
              <div className="section-head">
                <h3>More in {activeGenre.name}</h3>
                <Link className="text-link" href={`/library?genre=${activeGenre.id}`}>
                  All {subgenresOf(activeGenre.id).length} paths
                </Link>
              </div>
              <div className="sibling-row">
                {subgenresOf(activeGenre.id)
                  .filter((subgenre) => subgenre.id !== activeNode.id)
                  .map((subgenre) => (
                    <Link
                      className="sibling-chip"
                      href={`/library?node=${subgenre.id}`}
                      key={subgenre.id}
                    >
                      {subgenre.name}
                    </Link>
                  ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : (
        <section className="genre-index">
          <div className="section-head">
            <h2>Browse by genre</h2>
            <span className="section-meta">
              {GENRES.length} genres · {SUBGENRES.length} subgenres
            </span>
          </div>
          <div className="genre-grid">
            {GENRES.map((genre, index) => (
              <Link className="genre-card" href={`/library?genre=${genre.id}`} key={genre.id}>
                <div className="genre-card-top">
                  <span className="genre-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{genre.name}</h3>
                </div>
                <p>{genre.blurb}</p>
                <div className="genre-five">
                  {genre.five.map((id) => (
                    <span key={id}>{THINKER_BY_ID.get(id)?.name ?? id}</span>
                  ))}
                </div>
                <div className="genre-card-foot">
                  <span>{subgenresOf(genre.id).length} subgenres</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="library-cta">
            <div>
              <p className="eyebrow">Don&apos;t know where to start?</p>
              <h2>Ask the question first.</h2>
            </div>
            <Link className="ask-button" href="/">
              Ask Philos-Friend <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function SearchForm({ query, compact = false }: { query: string; compact?: boolean }) {
  return (
    <form
      className={`library-search${compact ? " is-compact" : ""}`}
      action="/library"
      method="get"
      role="search"
    >
      <label className="sr-only" htmlFor={compact ? "library-search-compact" : "library-search"}>
        Search the library
      </label>
      <input
        id={compact ? "library-search-compact" : "library-search"}
        name="q"
        defaultValue={query}
        placeholder="Search thinkers, ideas, themes, works…"
      />
      <button className="ask-button" type="submit">
        Search
      </button>
    </form>
  );
}
