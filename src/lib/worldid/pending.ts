import type { AgentAction } from "../types.ts";

const pendingActions = new Map<string, AgentAction>();

export function registerPendingAction(action: AgentAction): void {
  pendingActions.set(action.id, action);
}

export function getPendingAction(actionId: string): AgentAction | undefined {
  return pendingActions.get(actionId);
}

export function removePendingAction(actionId: string): void {
  pendingActions.delete(actionId);
}