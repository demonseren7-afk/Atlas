import Link from "next/link";
import { DailyStatusGreeting } from "../components/DailyStatus";

export default function HomePage() {
  return (
    <main className="workspace home-workspace">
      <section className="agent-home">
        <div className="os-hero-copy">
          <span className="eyebrow">Atlas Intelligence Workspace</span>
          <h1>我注意到你今天适合稳定推进。</h1>
          <p>睡眠和精神状态没有明显风险，训练可以继续，但不需要把强度推到极限。</p>
          <div className="primary-actions">
            <Link href="/today">开始今日行动</Link>
            <Link href="/onboarding">更新身体档案</Link>
          </div>
        </div>

        <div className="atlas-core" aria-label="Atlas 当前状态">
          <div className="core-field" aria-hidden="true">
            <span className="core-ring core-ring-outer" />
            <span className="core-ring core-ring-mid" />
            <span className="core-ring core-ring-inner" />
            <span className="core-center" />
          </div>
          <p>Atlas Core</p>
          <strong>已完成今日状态整合</strong>
          <small>恢复中等 / 精神稳定 / 训练策略：维持</small>
        </div>
      </section>

      <DailyStatusGreeting />

      <section className="intelligence-flow" aria-label="Atlas 感知理解响应链路">
        <div className="flow-stage">
          <span>感知</span>
          <h2>发现今日状态没有明显下滑。</h2>
          <p>Atlas 读取了你今天的睡眠、精神状态和恢复信号，当前没有触发降载风险。</p>
        </div>
        <div className="flow-connector" aria-hidden="true" />
        <div className="flow-stage">
          <span>理解</span>
          <h2>身体可以训练，但更适合控制强度。</h2>
          <p>今天的策略不是冲击新高度，而是保持动作质量，让身体继续适应。</p>
        </div>
        <div className="flow-connector" aria-hidden="true" />
        <div className="flow-stage response-stage">
          <span>响应</span>
          <h2>完成今日训练，并补足晚餐蛋白质。</h2>
          <p>Atlas 已把下一步收敛为一个行动：先执行可控强度训练，再处理饮食恢复。</p>
        </div>
      </section>
    </main>
  );
}
