import type { AgentAction, ChatMessage, RecipeRun, RiskAssessment } from "@/lib/types";
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

type ErrorPayload = { error?: { code?: string; message?: string } };

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = await response.json() as T & ErrorPayload;
  if (!response.ok) {
    const error = payload.error;
    throw new Error(`${error?.code ?? "REQUEST_FAILED"}: ${error?.message ?? "Request failed"}`);
  }
  return payload;
}

export async function planMessages(messages: ChatMessage[]): Promise<{ reply: string; action?: AgentAction }> {
  return parseResponse(await fetch("/api/agent/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  }));
}

export async function executeAction(actionId: string): Promise<RecipeRun> {
  return parseResponse(await fetch("/api/agent/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ actionId }),
  }));
}

export async function getLinkedAction(actionId: string): Promise<AgentAction> {
  return parseResponse(await fetch(`/api/gateway/action?id=${encodeURIComponent(actionId)}`));
}