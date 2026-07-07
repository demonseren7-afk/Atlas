import { CompanionPreferenceForm } from "../../components/CompanionPreferences";
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
    <main>
      <h1 className="page-title">身体档案</h1>
      <p className="page-copy">Atlas 会根据这些基础信息，给出更贴近你状态的训练和饮食建议。</p>
      <section className="panel">
        <div className="grid">
          {profileRows.map(([label, value]) => (
            <div key={label}>
              <strong>{label}:</strong> {value}
            </div>
          ))}
        </div>
      </section>
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
