import type { RiskAssessment, WalletActivity } from "@/lib/types";

function subgraphLabel(activity: WalletActivity): string {
  return `subgraph ${activity.source.subgraphId}`;
}

export function assessRisk(activity: WalletActivity): RiskAssessment {
  let score = 0;
  const reasons: string[] = [];
  const source = subgraphLabel(activity);

  if (activity.txCount === 0) {
    score += 40;
    reasons.push(`No Uniswap V3 swap history found on Ethereum mainnet — ${source}`);
  }
  if (activity.firstSeen !== null) {
    const ageDays = Math.max(0, Math.floor((Date.now() - activity.firstSeen) / 86_400_000));
    if (ageDays < 7) {
      score += 30;
      reasons.push(`First Uniswap V3 swap ${ageDays} days ago (${new Date(activity.firstSeen).toISOString().slice(0, 10)}) — ${source}`);
    }
  }
  if (activity.txCount < 5) {
    score += 20;
    reasons.push(`Only ${activity.txCount} Uniswap V3 swaps observed (fewer than 5; sample is capped at 1000) — ${source}`);
  }
  const top = activity.topCounterparties[0];
  if (top && activity.txCount > 0 && top.count / activity.txCount > 0.8) {
    score += 25;
    reasons.push(`Top non-router counterparty accounts for ${top.count}/${activity.txCount} observed swaps — ${source}`);
  }
  return { score: Math.min(100, score), reasons, evidence: activity };
}