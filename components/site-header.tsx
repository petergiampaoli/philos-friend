import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="wordmark" aria-label="Philos-Friend, home">
          <span className="wordmark-text">Philos-Friend</span>
        </Link>
      </div>
    </header>
  );
}
