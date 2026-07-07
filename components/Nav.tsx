import Link from "next/link";

export function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" aria-label="Atlas home">
          <strong>Atlas</strong>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/onboarding">Onboarding</Link>
          <Link href="/today">Today</Link>
          <Link href="/nutrition">Nutrition</Link>
        </nav>
      </div>
    </header>
  );
}
