import { CompanionStyleNote } from "../../components/CompanionPreferences";
import { DailyStatusGreeting } from "../../components/DailyStatus";
import { NutritionTracker } from "../../components/NutritionTracker";
import { generateNutrition } from "../../lib/ai/nutritionPrompt";
import { mockUserProfile } from "../../lib/mockUserProfile";

export default function NutritionPage() {
  const nutrition = generateNutrition(mockUserProfile);

  return (
    <main>
      <h1 className="page-title">饮食计划</h1>
      <p className="page-copy">这是 Atlas 基于当前身体档案给出的今日饮食目标。</p>
      <DailyStatusGreeting />
      <CompanionStyleNote context="nutrition" />
      <section className="metric-grid" aria-label="每日饮食目标">
        <div className="metric">
          <span>热量</span>
          <strong>{nutrition.calories} 千卡</strong>
        </div>
        <div className="metric">
          <span>蛋白质</span>
          <strong>{nutrition.protein}g</strong>
        </div>
        <div className="metric">
          <span>碳水</span>
          <strong>{nutrition.carbs}g</strong>
        </div>
        <div className="metric">
          <span>脂肪</span>
          <strong>{nutrition.fat}g</strong>
        </div>
      </section>
      <NutritionTracker target={nutrition} />
    </main>
  );
}
