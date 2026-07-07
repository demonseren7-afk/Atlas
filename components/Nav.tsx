import Link from "next/link";

export function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" aria-label="返回 Atlas 首页">
          <strong>Atlas</strong>
        </Link>
        <nav className="nav-links" aria-label="主导航">
          <Link href="/onboarding">身体档案</Link>
          <Link href="/today">今日训练</Link>
          <Link href="/nutrition">饮食计划</Link>
        </nav>
      </div>
    </header>
  );
}
