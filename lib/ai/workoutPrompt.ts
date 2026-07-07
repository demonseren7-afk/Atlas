import type { UserProfile } from "../types/user";
import { runAtlasWorkoutEngine } from "./atlasEngine.ts";
import type { AtlasCoachResponse, TrainingHistoryEntry } from "./types";

export function generateWorkout(
  userProfile: UserProfile,
  history: TrainingHistoryEntry[] = [],
  llmRunner?: (prompt: string) => Promise<AtlasCoachResponse>
): Promise<AtlasCoachResponse> {
  return runAtlasWorkoutEngine(userProfile, history, llmRunner);
}
