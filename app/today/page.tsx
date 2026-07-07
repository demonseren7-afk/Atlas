import { CompanionStyleNote } from "../../components/CompanionPreferences";
import { generateWorkout } from "../../lib/ai/workoutPrompt";
import { mockUserProfile } from "../../lib/mockUserProfile";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const result = await generateWorkout(mockUserProfile);
  const workout = result.workout;
  const decision = result.decision;

  return (
    <main>
      <h1 className="page-title">今日训练</h1>
      <p className="page-copy">Atlas 会先判断你的疲劳和恢复状态，再安排今天更合适的训练。</p>
      <CompanionStyleNote context="today" />
      <section className="panel">
        <h2>训练安排：{formatDayType(workout.day_type)}</h2>
        <ol className="list">
          {workout.exercises.map((exercise) => (
            <li key={exercise.name}>
              <strong>{exercise.name}</strong>：{exercise.sets} 组 x {exercise.reps}，休息{" "}
              {exercise.rest_seconds} 秒
            </li>
          ))}
        </ol>
        <p>
          <strong>Atlas 建议：</strong>
          {workout.coach_note}
        </p>
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
