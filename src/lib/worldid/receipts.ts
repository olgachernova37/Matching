import type { HumanGateReceipt } from "../types.ts";

const receipts = new Map<string, HumanGateReceipt>();

export function storeReceipt(receipt: HumanGateReceipt): void {
  receipts.set(receipt.actionId, receipt);
}

export function getReceipt(actionId: string): HumanGateReceipt | undefined {
  return receipts.get(actionId);
}