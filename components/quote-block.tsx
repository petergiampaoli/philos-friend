import type { Quote } from "@/lib/schema";

export function QuoteBlock({ quote }: { quote: Quote }) {
  return (
    <figure className="quote-block">
      <blockquote>
        <span className="quote-mark" aria-hidden="true">
          “
        </span>
        {quote.text}
      </blockquote>
      <figcaption>
        <span className="quote-source">{quote.work}</span>
        <span className="quote-detail">
          {quote.locator}
          {quote.translator ? ` · trans. ${quote.translator}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}
