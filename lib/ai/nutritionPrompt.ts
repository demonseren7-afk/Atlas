import type { UserProfile } from "../types/user";
import type { NutritionPlan } from "../types/nutrition";

export function generateNutrition(userProfile: UserProfile): NutritionPlan {
  void userProfile;

  return {
    calories: 2600,
    protein: 150,
    carbs: 280,
    fat: 60
  };
}
