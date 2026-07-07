"use client";

import { useEffect, useState } from "react";

type VoiceStyle = "gentle" | "professional" | "energetic";
type EncouragementStyle = "quiet" | "active";
type InterfaceTone = "soft" | "bright";

type CompanionPreferences = {
  voiceStyle: VoiceStyle;
  encouragementStyle: EncouragementStyle;
  interfaceTone: InterfaceTone;
};

const STORAGE_KEY = "atlas-companion-preferences";

const defaultPreferences: CompanionPreferences = {
  voiceStyle: "gentle",
  encouragementStyle: "quiet",
  interfaceTone: "soft"
};

const voiceOptions: Array<{ value: VoiceStyle; label: string; description: string }> = [
  { value: "gentle", label: "温柔", description: "语气更轻，更像一直在身边陪你。" },
  { value: "professional", label: "专业", description: "表达更清晰，重点放在判断和建议。" },
  { value: "energetic", label: "活力", description: "节奏更积极，适合想被带动起来的时候。" }
];

const encouragementOptions: Array<{
  value: EncouragementStyle;
  label: string;
  description: string;
}> = [
  { value: "quiet", label: "安静陪伴", description: "少一点催促，多一点稳定支持。" },
  { value: "active", label: "积极打气", description: "多一些鼓励，帮你更快进入状态。" }
];

const toneOptions: Array<{ value: InterfaceTone; label: string; description: string }> = [
  { value: "soft", label: "柔和", description: "界面更安静，适合长期陪伴。" },
  { value: "bright", label: "明亮", description: "视觉更清爽，反馈更直接。" }
];

export function CompanionPreferenceForm() {
  const [preferences, setPreferences] = useState<CompanionPreferences>(defaultPreferences);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPreferences(readPreferences());
  }, []);

  function updatePreference(nextPreferences: CompanionPreferences) {
    setPreferences(nextPreferences);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));
    setSaved(true);
  }

  return (
    <section className={`panel companion-panel companion-${preferences.interfaceTone}`}>
      <div className="companion-header">
        <div>
          <h2>个性化伙伴设定</h2>
          <p>你希望 Atlas 以什么风格陪伴你？</p>
        </div>
        <span>{saved ? "已保存" : "可随时调整"}</span>
      </div>

      <PreferenceGroup
        title="语气风格"
        name="voiceStyle"
        value={preferences.voiceStyle}
        options={voiceOptions}
        onChange={(voiceStyle) => updatePreference({ ...preferences, voiceStyle })}
      />

      <PreferenceGroup
        title="鼓励方式"
        name="encouragementStyle"
        value={preferences.encouragementStyle}
        options={encouragementOptions}
        onChange={(encouragementStyle) => updatePreference({ ...preferences, encouragementStyle })}
      />

      <PreferenceGroup
        title="界面色调"
        name="interfaceTone"
        value={preferences.interfaceTone}
        options={toneOptions}
        onChange={(interfaceTone) => updatePreference({ ...preferences, interfaceTone })}
      />

      <p className="companion-note">
        之后想换风格，可以回到「身体档案」重新调整，Atlas 会继续按你的偏好陪伴你。
      </p>
    </section>
  );
}

export function CompanionStyleNote({ context }: { context: "today" | "nutrition" }) {
  const [preferences, setPreferences] = useState<CompanionPreferences>(defaultPreferences);

  useEffect(() => {
    setPreferences(readPreferences());
  }, []);

  return (
    <section className={`companion-style-note companion-${preferences.interfaceTone}`}>
      <strong>{getContextTitle(context)}</strong>
      <p>{getCompanionMessage(preferences, context)}</p>
      <a href="/onboarding">调整伙伴风格</a>
    </section>
  );
}

function PreferenceGroup<T extends string>({
  title,
  name,
  value,
  options,
  onChange
}: {
  title: string;
  name: string;
  value: T;
  options: Array<{ value: T; label: string; description: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="preference-group">
      <legend>{title}</legend>
      <div className="preference-options">
        {options.map((option) => (
          <label key={option.value} className="preference-option">
            <input
              checked={value === option.value}
              name={name}
              type="radio"
              value={option.value}
              onChange={() => onChange(option.value)}
            />
            <span>
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function readPreferences(): CompanionPreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultPreferences;
    }

    const parsed = JSON.parse(stored) as Partial<CompanionPreferences>;

    return {
      voiceStyle: isVoiceStyle(parsed.voiceStyle) ? parsed.voiceStyle : defaultPreferences.voiceStyle,
      encouragementStyle: isEncouragementStyle(parsed.encouragementStyle)
        ? parsed.encouragementStyle
        : defaultPreferences.encouragementStyle,
      interfaceTone: isInterfaceTone(parsed.interfaceTone)
        ? parsed.interfaceTone
        : defaultPreferences.interfaceTone
    };
  } catch {
    return defaultPreferences;
  }
}

function getContextTitle(context: "today" | "nutrition"): string {
  return context === "today" ? "今日陪伴方式" : "饮食陪伴方式";
}

function getCompanionMessage(
  preferences: CompanionPreferences,
  context: "today" | "nutrition"
): string {
  const topic = context === "today" ? "今天的训练" : "今天的饮食";
  const voiceText: Record<VoiceStyle, string> = {
    gentle: `Atlas 会用更温和的方式陪你看 ${topic}，不急着推进，先照顾好你的状态。`,
    professional: `Atlas 会更直接地说明 ${topic} 的重点，帮助你清楚知道下一步怎么做。`,
    energetic: `Atlas 会用更有活力的方式带你进入 ${topic}，让执行变得更有动力。`
  };
  const encouragementText: Record<EncouragementStyle, string> = {
    quiet: "今天会少一点催促，多一点稳定陪伴。",
    active: "今天会多给你一点正向提醒，帮你把节奏带起来。"
  };

  return `${voiceText[preferences.voiceStyle]}${encouragementText[preferences.encouragementStyle]}`;
}

function isVoiceStyle(value: unknown): value is VoiceStyle {
  return value === "gentle" || value === "professional" || value === "energetic";
}

function isEncouragementStyle(value: unknown): value is EncouragementStyle {
  return value === "quiet" || value === "active";
}

function isInterfaceTone(value: unknown): value is InterfaceTone {
  return value === "soft" || value === "bright";
}
