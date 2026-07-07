export type WorkoutExercise = {
  name: string;
  sets: number;
  reps: string;
  rest_seconds: number;
};

export type WorkoutPlan = {
  day_type: string;
  exercises: WorkoutExercise[];
  coach_note: string;
};

export type LLMDecision = {
  fatigue_level: "low" | "medium" | "high";
  recovery_quality: "low" | "medium" | "high";
  training_strategy: "push" | "maintain" | "deload";
};

export type AtlasCoachResponse = {
  decision: LLMDecision;
  workout: WorkoutPlan;
};

export type TrainingHistoryEntry = {
  performance_delta: number;
  fatigue: number;
};
