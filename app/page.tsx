import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1 className="page-title">Atlas</h1>
      <p className="page-copy">你的 AI 身体成长伙伴，每天陪你做更适合自己的训练和饮食选择。</p>
      <section className="panel">
        <p>先查看当前身体档案，再让 Atlas 为你生成今天的训练建议。</p>
        <div className="nav-links">
          <Link href="/onboarding">身体档案</Link>
          <Link href="/today">今日训练</Link>
          <Link href="/nutrition">饮食计划</Link>
        </div>
      </section>
    </main>
  );
}
