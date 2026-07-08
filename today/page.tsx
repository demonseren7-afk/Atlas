import { CompanionStyleNote } from "../../components/CompanionPreferences";
import { DailyStatusGreeting } from "../../components/DailyStatus";
import { WorkoutAdjustment } from "../../components/WorkoutAdjustment";
import { generateWorkout } from "../../lib/ai/workoutPrompt";
import { mockUserProfile } from "../../lib/mockUserProfile";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const result = await generateWorkout(mockUserProfile);
  const workout = result.workout;
  const decision = result.decision;

  return (
    <main className="workspace today-workspace">
      <section className="training-hero">
        <div>
          <span className="eyebrow">AI Action Plan</span>
          <h1>今天的训练不是清单，是一次被调整过的行动。</h1>
          <p>Atlas 已根据疲劳、恢复和目标生成今日计划。执行中可以随时反馈强度。</p>
        </div>
        <div className="readiness-panel">
          <span>{formatStrategy(decision.training_strategy)}</span>
          <strong>{formatDayType(workout.day_type)}</strong>
          <small>
            疲劳{formatFatigue(decision.fatigue_level)} / 恢复{formatRecovery(decision.recovery_quality)}
          </small>
        </div>
      </section>

      <DailyStatusGreeting />
      <CompanionStyleNote context="today" />

      <section className="global-plan">
        <div className="section-heading">
          <div>
            <h2>全局计划</h2>
            <p>这是本周的初步安排。Atlas 会根据你每天的睡眠、精神和训练反馈继续调整。</p>
          </div>
          <span>动态计划</span>
        </div>
        <div className="plan-flow">
          {weeklyPlan.map((item) => (
            <div key={item.day}>
              <strong>{item.day}</strong>
              <span>{item.focus}</span>
            </div>
          ))}
        </div>
      </section>

      <WorkoutAdjustment workout={workout} />

      <section className="decision-line">
        <p>
          <strong>状态判断：</strong>
          疲劳{formatFatigue(decision.fatigue_level)}，恢复{formatRecovery(
            decision.recovery_quality
          )}，训练策略{formatStrategy(decision.training_strategy)}
        </p>
      </section>
    </main>
  );
}

function formatDayType(dayType: string): string {
  const labels: Record<string, string> = {
    push: "推力训练",
    pull: "拉力训练",
    legs: "下肢训练",
    recovery: "恢复训练",
    accessory: "轻量辅助训练"
  };

  return labels[dayType] ?? dayType;
}

const weeklyPlan = [
  { day: "周一", focus: "力量主训练" },
  { day: "周二", focus: "轻量恢复" },
  { day: "周三", focus: "上肢或推力" },
  { day: "周四", focus: "休息或拉伸" },
  { day: "周五", focus: "下肢训练" },
  { day: "周六", focus: "状态补强" },
  { day: "周日", focus: "复盘和恢复" }
];

function formatFatigue(level: string): string {
  const labels: Record<string, string> = {
    low: "较低",
    medium: "中等",
    high: "偏高"
  };

  return labels[level] ?? level;
}

function formatRecovery(level: string): string {
  const labels: Record<string, string> = {
    low: "偏低",
    medium: "一般",
    high: "良好"
  };

  return labels[level] ?? level;
}

function formatStrategy(strategy: string): string {
  const labels: Record<string, string> = {
    push: "适度推进",
    maintain: "稳定维持",
    deload: "降低强度"
  };

  return labels[strategy] ?? strategy;
}
