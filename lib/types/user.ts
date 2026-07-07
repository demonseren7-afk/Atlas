export type ExperienceLevel = "L1" | "L2" | "L3";
export type RecoveryStatus = "low" | "medium" | "high";

export type UserProfile = {
  age: number;
  gender: "male" | "female" | "other";
  height: number;
  weight: number;
  goal: string;
  experience_level: ExperienceLevel;
  training_time: string;
  recovery_status: RecoveryStatus;
};
