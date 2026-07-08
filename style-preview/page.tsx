import Link from "next/link";

const critiqueItems = [
  {
    title: "它们仍然是主题换皮",
    text: "三套稿只是替换了颜色、按钮和卡片边框，但页面结构仍然是模块并列。用户看到的是组件集合，不是一个正在判断的智能系统。"
  },
  {
    title: "视觉中心不够明确",
    text: "旧稿没有回答“Atlas 此刻最关注什么”。每个区域权重接近，导致页面像 SaaS 后台，而不是 AI OS 的今日工作空间。"
  },
  {
    title: "卡片语言过重",
    text: "大量独立容器会把信息切碎。高级 AI 产品应该让内容像一个完整空间自然流动，而不是把每件事装进盒子。"
  }
];

export default function StylePreviewPage() {
  return (
    <main className="workspace style-analysis">
      <section className="os-hero">
        <div className="os-hero-copy">
          <span className="eyebrow">Design Reset</span>
          <h1>Atlas 不应该只是更好看的 Dashboard。</h1>
          <p>
            旧视觉稿的问题不是颜色不够高级，而是信息架构仍然停留在 SaaS 模块思维。新的方向会把 Atlas
            重新定义为一个理解用户状态、给出判断并安排下一步的智能工作空间。
          </p>
          <div className="primary-actions">
            <Link href="/">查看新首页</Link>
            <Link href="/today">查看今日训练</Link>
          </div>
        </div>

        <div className="atlas-core" aria-label="新设计方向">
          <div className="system-pulse" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p>新方向</p>
          <strong>Apple × Future Intelligence + Human Companion</strong>
          <small>视觉走未来 AI OS，语气保留可靠陪伴感。</small>
        </div>
      </section>

      <section className="os-focus">
        <div>
          <span className="eyebrow">Why The First Draft Failed</span>
          <h2>普通 SaaS 的问题，是它平均展示所有东西。</h2>
        </div>
        <p>
          Atlas 需要先建立“系统正在理解我”的感觉，再展示行动。信息不是越多越好，而是先给判断，再给下一步。
        </p>
      </section>

      <section className="signal-row" aria-label="旧稿问题分析">
        {critiqueItems.map((item) => (
          <div key={item.title}>
            <span>{item.title}</span>
            <strong>{item.text}</strong>
          </div>
        ))}
      </section>

      <section className="decision-line">
        <p>
          <strong>执行结果：</strong>
          我已经把首页、身体档案、今日训练改为 Premium AI OS 方向。现在的核心不再是卡片堆叠，而是状态中心、系统判断和下一步行动。
        </p>
      </section>
    </main>
  );
}
