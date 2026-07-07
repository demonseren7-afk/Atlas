import { generateNutrition } from "../../lib/ai/nutritionPrompt";
import { mockUserProfile } from "../../lib/mockUserProfile";

export default function NutritionPage() {
  const nutrition = generateNutrition(mockUserProfile);

  return (
    <main>
      <h1 className="page-title">Nutrition</h1>
      <p className="page-copy">Static AI-placeholder nutrition target for the mock profile.</p>
      <section className="metric-grid" aria-label="Daily nutrition targets">
        <div className="metric">
          <span>Calories</span>
          <strong>{nutrition.calories}</strong>
        </div>
        <div className="metric">
          <span>Protein</span>
          <strong>{nutrition.protein}g</strong>
        </div>
        <div className="metric">
          <span>Carbs</span>
          <strong>{nutrition.carbs}g</strong>
        </div>
        <div className="metric">
          <span>Fat</span>
          <strong>{nutrition.fat}g</strong>
        </div>
      </section>
    </main>
  );
}
