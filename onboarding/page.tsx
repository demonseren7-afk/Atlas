import { CompanionPreferenceForm } from "../../components/CompanionPreferences";
import { BodyProfileQuestions } from "../../components/DailyStatus";
import { mockUserProfile } from "../../lib/mockUserProfile";

const profileRows = [
  ["年龄", `${mockUserProfile.age} 岁`],
  ["性别", formatGender(mockUserProfile.gender)],
  ["身高", `${mockUserProfile.height} cm`],
  ["体重", `${mockUserProfile.weight} kg`],
  ["目标", formatGoal(mockUserProfile.goal)],
  ["训练阶段", formatExperience(mockUserProfile.experience_level)],
  ["单次训练时间", formatTrainingTime(mockUserProfile.training_time)],
  ["恢复状态", formatRecovery(mockUserProfile.recovery_status)]
];

export default function OnboardingPage() {
  return (
    <main className="workspace profile-workspace">
      <section className="profile-hero">
        <span className="eyebrow">Personal Intelligence Profile</span>
        <h1>Atlas 对你的理解，不是一张资料表。</h1>
        <p>
          这些信息会被 Atlas 用来判断你的训练阶段、恢复能力和今天最合适的行动强度。
        </p>
      </section>

      <section className="profile-insight">
        <div>
          <span className="eyebrow">当前画像</span>
          <h2>稳定增肌阶段，恢复质量中等。</h2>
        </div>
        <p>
          Atlas 会优先安排可持续的训练刺激，并在睡眠或精神状态下降时主动降低压力。
        </p>
      </section>

      <section className="profile-signals">
        <div className="grid">
          {profileRows.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>
      <BodyProfileQuestions />
      <CompanionPreferenceForm />
    </main>
  );
}

function formatGender(gender: string): string {
  const labels: Record<string, string> = {
    male: "男性",
    female: "女性",
    other: "其他"
  };

  return labels[gender] ?? gender;
}

function formatGoal(goal: string): string {
  const labels: Record<string, string> = {
    "lean muscle": "精瘦增肌"
  };

  return labels[goal] ?? goal;
}

function formatExperience(level: string): string {
  const labels: Record<string, string> = {
    L1: "刚开始训练",
    L2: "有一定基础",
    L3: "训练经验较丰富"
  };

  return labels[level] ?? level;
}

function formatTrainingTime(time: string): string {
  return time.replace("min", " 分钟");
}

function formatRecovery(recovery: string): string {
  const labels: Record<string, string> = {
    low: "偏低",
    medium: "一般",
    high: "良好"
  };

  return labels[recovery] ?? recovery;
}
