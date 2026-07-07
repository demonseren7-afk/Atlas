import type { AtlasCoachResponse } from "./types";

export function parseLLMResponse(rawText: string): AtlasCoachResponse {
  const direct = parseJson(rawText);

  if (isAtlasCoachResponse(direct)) {
    return direct;
  }

  const extracted = parseJson(extractJsonObject(rawText));

  if (isAtlasCoachResponse(extracted)) {
    return extracted;
  }

  return getSafeDefaultWorkout();
}

export function getSafeDefaultWorkout(): AtlasCoachResponse {
  return {
    decision: {
      fatigue_level: "high",
      recovery_quality: "low",
      training_strategy: "deload"
    },
    workout: {
      day_type: "recovery",
      exercises: [
        {
          name: "Mobility Flow",
          sets: 2,
          reps: "8-10 minutes",
          rest_seconds: 60
        },
        {
          name: "Easy Zone 2 Walk",
          sets: 1,
          reps: "20 minutes",
          rest_seconds: 0
        }
      ],
      coach_note: "Fallback plan: use a conservative recovery session because AI output was unavailable or invalid."
    }
  };
}

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

function extractJsonObject(value: string): string {
  const start = value.indexOf("{");
  const end = value.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return "";
  }

  return value.slice(start, end + 1);
}

function isAtlasCoachResponse(value: unknown): value is AtlasCoachResponse {
  if (!isRecord(value) || !isRecord(value.decision) || !isRecord(value.workout)) {
    return false;
  }

  const decision = value.decision;
  const workout = value.workout;

  return (
    isFatigueLevel(decision.fatigue_level) &&
    isRecoveryQuality(decision.recovery_quality) &&
    isTrainingStrategy(decision.training_strategy) &&
    typeof workout.day_type === "string" &&
    Array.isArray(workout.exercises) &&
    workout.exercises.every(isWorkoutExercise) &&
    typeof workout.coach_note === "string"
  );
}

function isWorkoutExercise(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    typeof value.sets === "number" &&
    typeof value.reps === "string" &&
    typeof value.rest_seconds === "number"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFatigueLevel(value: unknown): boolean {
  return value === "low" || value === "medium" || value === "high";
}

function isRecoveryQuality(value: unknown): boolean {
  return value === "low" || value === "medium" || value === "high";
}

function isTrainingStrategy(value: unknown): boolean {
  return value === "push" || value === "maintain" || value === "deload";
}
