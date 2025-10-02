// lib/scoring.ts
import { Axis, AxisVector, ChoiceDelta, CafeKey, ItemProfile, Question, AnswerMap } from "./types";

export const AXES: Axis[] = ["energy","trendy","bitter","social","chaos"];

export function clampVector(v: AxisVector): AxisVector {
  const out = { ...v };
  for (const a of AXES) out[a] = Math.max(0, Math.min(10, out[a] ?? 0));
  return out;
}

export function addDelta(v: AxisVector, d: ChoiceDelta): AxisVector {
  const out = { ...v };
  for (const a of Object.keys(d) as Axis[]) {
    out[a] = (out[a] ?? 0) + (d[a] ?? 0);
  }
  return clampVector(out);
}

export function l2(a: AxisVector, b: AxisVector, w: Partial<Record<Axis, number>> = {}): number {
  let sum = 0;
  for (const ax of AXES) {
    const weight = w[ax] ?? 1;
    const diff = (a[ax] ?? 0) - (b[ax] ?? 0);
    sum += weight * diff * diff;
  }
  return sum;
}

// Secret Chair rule – tweakable without UI changes
export function isSecretChair(v: AxisVector): boolean {
  const chaosHigh = (v.chaos ?? 0) >= 8;
  const conflict =
    ((v.energy ?? 0) >= 8 && (v.social ?? 0) <= 2) ||
    ((v.bitter ?? 0) >= 8 && (v.trendy ?? 0) >= 8) ||
    ((v.energy ?? 0) <= 2 && (v.trendy ?? 0) >= 8);
  return chaosHigh && conflict;
}

/** Build user vector from AnswerMap + Questions */
export function buildVector(answers: AnswerMap, questions: Question[]): AxisVector {
  let v: AxisVector = { energy:0, trendy:0, bitter:0, social:0, chaos:0 };
  for (const q of questions) {
    const optId = answers[q.id];
    if (!optId) continue;
    const opt = q.options.find(o => o.id === optId);
    if (opt?.delta) v = addDelta(v, opt.delta);
  }
  return clampVector(v);
}

/** Pick result key from vector + item profiles */
export function pickResult(
  v: AxisVector,
  items: ItemProfile[],
  opts?: { weights?: Partial<Record<Axis, number>>; secretKey?: CafeKey }
): CafeKey {
  const secretKey = opts?.secretKey ?? "secret_chair";
  if (isSecretChair(v)) return secretKey;

  const weights = opts?.weights ?? { energy: 1.2, bitter: 1.1, trendy: 1.0, social: 1.0, chaos: 0.6 };

  let bestKey: CafeKey | null = null;
  let best = Number.POSITIVE_INFINITY;

  for (const it of items) {
    if (it.key === secretKey) continue;
    const score = l2(v, it.target, weights);
    if (score < best) { best = score; bestKey = it.key; }
  }
  // deterministic fallback to first non-secret profile
  return (bestKey ?? items.find(i => i.key !== secretKey)!.key);
}

/** Base64 compact serialization for URL params */
export function serializeAnswers(answers: AnswerMap): string {
  const json = JSON.stringify(answers);
  return typeof window === "undefined"
    ? Buffer.from(json).toString("base64url")
    : btoa(unescape(encodeURIComponent(json)));
}
export function deserializeAnswers(s: string | null): AnswerMap {
  if (!s) return {};
  try {
    const json = typeof window === "undefined"
      ? Buffer.from(s, "base64url").toString("utf8")
      : decodeURIComponent(escape(atob(s)));
    return JSON.parse(json) as AnswerMap;
  } catch {
    return {};
  }
}
