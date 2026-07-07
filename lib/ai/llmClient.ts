import { atlasCoachSystemPrompt } from "./prompts/atlasCoachPrompt.ts";
import { getSafeDefaultWorkout, parseLLMResponse } from "./safeParse.ts";
import type { AtlasCoachResponse } from "./types";

type FetchLike = (input: string, init: RequestInit) => Promise<Response>;

type LLMClientOptions = {
  apiKey?: string;
  model?: string;
  apiBaseUrl?: string;
  fetchFn?: FetchLike;
};

const atlasCoachJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["decision", "workout"],
  properties: {
    decision: {
      type: "object",
      additionalProperties: false,
      required: ["fatigue_level", "recovery_quality", "training_strategy"],
      properties: {
        fatigue_level: {
          type: "string",
          enum: ["low", "medium", "high"]
        },
        recovery_quality: {
          type: "string",
          enum: ["low", "medium", "high"]
        },
        training_strategy: {
          type: "string",
          enum: ["push", "maintain", "deload"]
        }
      }
    },
    workout: {
      type: "object",
      additionalProperties: false,
      required: ["day_type", "exercises", "coach_note"],
      properties: {
        day_type: {
          type: "string"
        },
        exercises: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name", "sets", "reps", "rest_seconds"],
            properties: {
              name: {
                type: "string"
              },
              sets: {
                type: "number"
              },
              reps: {
                type: "string"
              },
              rest_seconds: {
                type: "number"
              }
            }
          }
        },
        coach_note: {
          type: "string"
        }
      }
    }
  }
};

export async function callLLM(
  prompt: string,
  options: LLMClientOptions = {}
): Promise<AtlasCoachResponse> {
  const apiKey = options.apiKey ?? process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return getSafeDefaultWorkout();
  }

  try {
    const response = await (options.fetchFn ?? fetch)(
      `${options.apiBaseUrl ?? process.env.OPENAI_API_BASE_URL ?? "https://api.openai.com/v1"}/responses`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: options.model ?? process.env.OPENAI_MODEL ?? "gpt-5.5",
          instructions: `${atlasCoachSystemPrompt}\nReturn only valid JSON. Do not include non-JSON text.`,
          input: prompt,
          text: {
            format: {
              type: "json_schema",
              name: "atlas_coach_response",
              schema: atlasCoachJsonSchema,
              strict: true
            }
          }
        })
      }
    );

    if (!response.ok) {
      return getSafeDefaultWorkout();
    }

    return parseLLMResponse(extractText(await response.json()));
  } catch {
    return getSafeDefaultWorkout();
  }
}

function extractText(payload: unknown): string {
  if (isRecord(payload) && typeof payload.output_text === "string") {
    return payload.output_text;
  }

  if (!isRecord(payload) || !Array.isArray(payload.output)) {
    return "";
  }

  for (const outputItem of payload.output) {
    if (!isRecord(outputItem) || !Array.isArray(outputItem.content)) {
      continue;
    }

    for (const contentItem of outputItem.content) {
      if (isRecord(contentItem) && typeof contentItem.text === "string") {
        return contentItem.text;
      }
    }
  }

  return "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
