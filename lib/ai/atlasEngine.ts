import { buildWorkoutPrompt } from "./buildWorkoutPrompt.ts";
import { callLLM } from "./llmClient.ts";
import type { AtlasCoachResponse, TrainingHistoryEntry } from "./types";
import type { UserProfile } from "../types/user";

type AtlasLLMRunner = (prompt: string) => Promise<AtlasCoachResponse>;

export function runAtlasWorkoutEngine(
  userProfile: UserProfile,
  history: TrainingHistoryEntry[] = [],
  llmRunner: AtlasLLMRunner = callLLM
): Promise<AtlasCoachResponse> {
  const prompt = buildWorkoutPrompt(userProfile, history);

  return llmRunner(prompt);
}
