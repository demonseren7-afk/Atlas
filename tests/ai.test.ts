import test from "node:test";
import assert from "node:assert/strict";

import { buildWorkoutPrompt } from "../lib/ai/buildWorkoutPrompt.ts";
import { callLLM } from "../lib/ai/llmClient.ts";
import { generateNutrition } from "../lib/ai/nutritionPrompt.ts";
import { runAtlasWorkoutEngine } from "../lib/ai/atlasEngine.ts";
import { generateWorkout } from "../lib/ai/workoutPrompt.ts";
import { atlasCoachSystemPrompt } from "../lib/ai/prompts/atlasCoachPrompt.ts";
import { parseLLMResponse } from "../lib/ai/safeParse.ts";
import { mockUserProfile } from "../lib/mockUserProfile.ts";
import type { AtlasCoachResponse } from "../lib/ai/types.ts";

const validLLMResponse: AtlasCoachResponse = {
  decision: {
    fatigue_level: "medium",
    recovery_quality: "medium",
    training_strategy: "maintain"
  },
  workout: {
    day_type: "push",
    exercises: [
      {
        name: "Bench Press",
        sets: 3,
        reps: "6-8",
        rest_seconds: 120
      }
    ],
    coach_note: "Maintain push volume and monitor fatigue."
  }
};

test("atlasCoachSystemPrompt enforces JSON-only coach output", () => {
  assert.match(atlasCoachSystemPrompt, /AI body growth companion/);
  assert.match(atlasCoachSystemPrompt, /Always prioritize safety/);
  assert.match(atlasCoachSystemPrompt, /Never output non-JSON text/);
  assert.match(atlasCoachSystemPrompt, /Simplified Chinese/);
  assert.match(atlasCoachSystemPrompt, /STRICT JSON/);
});

test("buildWorkoutPrompt includes user profile and optional history inputs", () => {
  const prompt = buildWorkoutPrompt(mockUserProfile, [
    { performance_delta: 0.1, fatigue: 0.4 }
  ]);

  assert.match(prompt, /AI body growth companion/);
  assert.match(prompt, /lean muscle/);
  assert.match(prompt, /L2/);
  assert.match(prompt, /medium/);
  assert.match(prompt, /45min/);
  assert.match(prompt, /performance_delta/);
  assert.match(prompt, /decision/);
  assert.match(prompt, /workout/);
  assert.match(prompt, /Simplified Chinese/);
});

test("parseLLMResponse returns valid strict JSON responses", () => {
  const parsed = parseLLMResponse(JSON.stringify(validLLMResponse));

  assert.deepEqual(parsed, validLLMResponse);
});

test("parseLLMResponse extracts JSON when model wraps it in extra text", () => {
  const parsed = parseLLMResponse(`Here is the plan:\n${JSON.stringify(validLLMResponse)}\nDone.`);

  assert.deepEqual(parsed, validLLMResponse);
});

test("parseLLMResponse falls back to a safe workout for invalid JSON", () => {
  const parsed = parseLLMResponse("not-json");

  assert.equal(parsed.decision.training_strategy, "deload");
  assert.equal(parsed.workout.day_type, "恢复训练");
  assert.ok(parsed.workout.exercises.length > 0);
});

test("callLLM parses Responses API output_text content", async () => {
  const parsed = await callLLM("prompt", {
    apiKey: "test-key",
    fetchFn: async () =>
      new Response(
        JSON.stringify({
          output_text: JSON.stringify(validLLMResponse)
        }),
        { status: 200 }
      )
  });

  assert.deepEqual(parsed, validLLMResponse);
});

test("callLLM returns safe fallback when API request fails", async () => {
  const parsed = await callLLM("prompt", {
    apiKey: "test-key",
    fetchFn: async () => new Response("bad gateway", { status: 502 })
  });

  assert.equal(parsed.decision.training_strategy, "deload");
  assert.equal(parsed.workout.day_type, "恢复训练");
});

test("runAtlasWorkoutEngine returns LLM decision and workout contract", async () => {
  const result = await runAtlasWorkoutEngine(mockUserProfile, [], async () => validLLMResponse);

  assert.equal(result.decision.training_strategy, "maintain");
  assert.equal(result.workout.day_type, "push");
  assert.equal(result.workout.exercises[0]?.name, "Bench Press");
  assert.equal(typeof result.workout.coach_note, "string");
});

test("generateWorkout delegates to the LLM-powered Atlas engine", async () => {
  const result = await generateWorkout(mockUserProfile, [], async () => validLLMResponse);

  assert.equal(result.decision.recovery_quality, "medium");
  assert.equal(result.workout.day_type, "push");
});

test("generateNutrition returns the static MVP nutrition target", () => {
  const nutrition = generateNutrition(mockUserProfile);

  assert.deepEqual(nutrition, {
    calories: 2600,
    protein: 150,
    carbs: 280,
    fat: 60
  });
});
