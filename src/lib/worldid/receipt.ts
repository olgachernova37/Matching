import fs from "node:fs";
import path from "node:path";
import type { AgentAction, HumanGateReceipt } from "../types.ts";
import { hashAction } from "./hash.ts";

const executedPath = path.join(process.cwd(), ".data", "executed-actions.json");

function readExecuted(): Record<string, number> {
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(executedPath, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as Record<string, number>;
  } catch {
    return {};
  }
}

function writeExecuted(executed: Record<string, number>): void {
  fs.mkdirSync(path.dirname(executedPath), { recursive: true });
  const temporaryPath = `${executedPath}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(executed, null, 2), "utf8");
  fs.renameSync(temporaryPath, executedPath);
}

/** Validate once and record the action so a receipt cannot be replayed. */
export function assertValidReceipt(receipt: HumanGateReceipt, action: AgentAction): void {
  if (receipt.expiresAt <= Date.now()) throw new Error("Receipt expired");
  if (receipt.actionId !== action.id) throw new Error("Receipt actionId mismatch");

  const expectedHash = hashAction(action.payload);
  if (receipt.actionHash !== expectedHash) throw new Error("Receipt actionHash mismatch");

  const executed = readExecuted();
  if (executed[action.id]) throw new Error("Action already executed");
  executed[action.id] = Date.now();
  writeExecuted(executed);
}