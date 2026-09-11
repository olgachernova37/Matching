import type { RiskAssessment } from "@/lib/types";
import { highRiskAssessment } from "./_mocks";

export type ApiResult<T> = { data: T; mocked: boolean };

export async function getWalletAssessment(address: string): Promise<ApiResult<RiskAssessment>> {
  try {
    const response = await fetch(`/api/graph/activity?address=${encodeURIComponent(address)}`);
    if (!response.ok) throw new Error("activity request failed");
    return { data: (await response.json()) as RiskAssessment, mocked: false };
  } catch {
    return { data: { ...highRiskAssessment, evidence: { ...highRiskAssessment.evidence, address } }, mocked: true };
  }
}