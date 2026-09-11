import fs from "node:fs";
import path from "node:path";
import type { AgentAction, HumanGateReceipt } from "@/lib/types";

type PersistedState = { actions: AgentAction[]; receipts: HumanGateReceipt[]; executed: string[] };
const statePath = path.join(process.cwd(), ".data", "agent-state.json");
const actions = new Map<string, AgentAction>();
const receipts = new Map<string, HumanGateReceipt>();
const executed = new Set<string>();
let loaded = false;

function load(): void {
  if (loaded) return;
  loaded = true;
  try {
    const parsed = JSON.parse(fs.readFileSync(statePath, "utf8")) as Partial<PersistedState>;
    for (const action of parsed.actions ?? []) actions.set(action.id, action);
    for (const receipt of parsed.receipts ?? []) receipts.set(receipt.actionId, receipt);
    for (const actionId of parsed.executed ?? []) executed.add(actionId);
  } catch {
    console.warn("[agent] store unavailable or corrupt; starting with an empty session");
  }
}

function persist(): void {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  const temporaryPath = `${statePath}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify({ actions: [...actions.values()], receipts: [...receipts.values()], executed: [...executed] } satisfies PersistedState, null, 2));
  fs.renameSync(temporaryPath, statePath);
}

export function savePendingAction(action: AgentAction): void { load(); actions.set(action.id, action); persist(); }
export function getPendingAction(id: string): AgentAction | undefined { load(); return actions.get(id); }
export function saveReceipt(receipt: HumanGateReceipt): void { load(); receipts.set(receipt.actionId, receipt); persist(); }
export function getReceipt(actionId: string): HumanGateReceipt | undefined { load(); return receipts.get(actionId); }
export function markExecuted(actionId: string): void { load(); executed.add(actionId); persist(); }
export function hasExecuted(actionId: string): boolean { load(); return executed.has(actionId); }