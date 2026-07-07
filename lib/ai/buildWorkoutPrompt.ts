import type { UserProfile } from "../types/user";
import type { TrainingHistoryEntry } from "./types";

export function buildWorkoutPrompt(
  userProfile: UserProfile,
  history: TrainingHistoryEntry[] = []
): string {
  return [
    "You are Atlas Coach, an AI fitness decision system.",
    "Analyze the user profile and optional history, decide training strategy, then generate the workout.",
    `UserProfile: ${JSON.stringify(userProfile)}.`,
    `History: ${JSON.stringify(history)}.`,
    "Return strict JSON with decision and workout keys."
  ].join(" ");
}
