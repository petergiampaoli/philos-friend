import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="eyebrow">404</p>
      <h1>Nothing here.</h1>
      <p>The page you asked for does not exist. The question might still be worth asking.</p>
      <div className="not-found-actions">
        <Link className="ask-button" href="/">
          Ask Philos-Friend <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
