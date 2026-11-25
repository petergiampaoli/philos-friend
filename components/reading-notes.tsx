import type { Lens, PacketThinker, Quote } from "@/lib/schema";
import { Portrait } from "./portrait";

function splitLastSentence(text: string): { lead: string; emphasis: string } {
  const sentences = text.match(/[^.!?]+[.!?]+["”]?|[^.!?]+$/g) ?? [];
  if (sentences.length <= 1) {
    return { lead: "", emphasis: text.trim() };
  }

  const emphasis = sentences[sentences.length - 1].trim();
  const lead = sentences.slice(0, -1).join("").trim();
  return { lead, emphasis };
}

export function ReadingNotes({
  lens,
  thinker,
  quote,
  panelId,
  onClose,
}: {
  lens: Lens;
  thinker: PacketThinker;
  quote: Quote;
  panelId: string;
  onClose: () => void;
}) {
  const application = splitLastSentence(lens.application);

  return (
    <section className="reading-notes" id={panelId} aria-label="Reading notes">
      <header className="reading-notes-head">
        <p className="eyebrow">Reading notes</p>
        <button className="notes-close" type="button" onClick={onClose}>
          Close
        </button>
      </header>

      <div className="reading-notes-thinker">
        <Portrait name={thinker.name} id={thinker.id} size="md" />
        <div>
          <p className="reading-notes-name">{thinker.name}</p>
          <p className="reading-notes-dates">
            {thinker.dates} · {thinker.tradition}
          </p>
        </div>
      </div>

      <blockquote className="reading-notes-quote">“{quote.text}”</blockquote>
      <p className="reading-notes-source">
        {quote.work}
        <span>·</span>
        {quote.locator}
        {quote.translator ? (
          <>
            <span>·</span>
            trans. {quote.translator}
          </>
        ) : null}
      </p>

      <div className="reading-notes-section">
        <p>
          {quote.work} sits in the {thinker.tradition} tradition. {thinker.oneLine}
        </p>
      </div>

      <div className="reading-notes-section">
        <ol className="breakdown-list">
          <li>
            <strong>{lens.claim}</strong>.
          </li>
          <li>
            <strong>{thinker.ideas[0].title}</strong>: {thinker.ideas[0].summary}
          </li>
          <li>
            {application.lead ? `${application.lead} ` : null}
            <strong>{application.emphasis}</strong>
          </li>
        </ol>
      </div>

      <div className="reading-notes-section">
        <h3>What it means</h3>
        <p>{lens.theory}</p>
      </div>
    </section>
  );
}
