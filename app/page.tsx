import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1 className="page-title">Atlas</h1>
      <p className="page-copy">
        AI Fitness Decision System for daily workout and nutrition guidance.
      </p>
      <section className="panel">
        <p>Start with the mock user profile, then review today&apos;s plan.</p>
        <div className="nav-links">
          <Link href="/onboarding">Onboarding</Link>
          <Link href="/today">Today</Link>
          <Link href="/nutrition">Nutrition</Link>
        </div>
      </section>
    </main>
  );
}
