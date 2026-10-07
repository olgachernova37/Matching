/**
 * When a human is pulled into a marketplace deal.
 *
 * Small deals run agent-to-agent with no human; anything above the limit, and
 * any judgement the judge is unsure of, waits for a World ID Selfie Check.
 * A per-job spending limit like this follows SingIt's per-purchase limit
 * (github.com/bubon-ik/SingItAI, MIT) — credited in HACKATHON.md.
 */

/** Deals at or below this amount are approved by the agents alone. */
export const AUTO_APPROVE_LIMIT_USD = 1;

/** Below this confidence the judge's verdict is treated as uncertain. */
export const JUDGE_MIN_CONFIDENCE = 0.7;

export function fundingRequiresHuman(amountUsd: number): boolean {
  if (!Number.isFinite(amountUsd) || amountUsd < 0) throw new RangeError("amountUsd must be a non-negative number");
  return amountUsd > AUTO_APPROVE_LIMIT_USD;
}
