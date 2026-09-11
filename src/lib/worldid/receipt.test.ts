import assert from "node:assert/strict";
import test from "node:test";
import type { AgentAction, HumanGateReceipt } from "@/lib/types";
import { hashAction } from "./hash.ts";
import { assertValidReceipt } from "./receipt.ts";

function action(id: string): AgentAction {
  return { id, kind: "recipe_run", summary: "test", payload: { amount: 5, destination: "0xabc" }, riskScore: 80, riskReasons: [], costUsd: 0.05, requiresHuman: true, createdAt: Date.now() };
}

function receiptFor(current: AgentAction, overrides: Partial<HumanGateReceipt> = {}): HumanGateReceipt {
  return { actionId: current.id, actionHash: hashAction(current.payload), nullifierHash: "0xnullifier", credentialType: "selfie_check", verifiedAt: Date.now(), expiresAt: Date.now() + 60_000, ...overrides };
}

test("tampering with one payload byte invalidates the receipt", () => {
  const current = action(`tamper-${Date.now()}`);
  const receipt = receiptFor(current);
  current.payload = { amount: 6, destination: "0xabc" };
  assert.throws(() => assertValidReceipt(receipt, current), /actionHash mismatch/);
});

test("receipt validation has distinct expiry, id, hash, and replay errors", () => {
  const expired = action(`expired-${Date.now()}`);
  assert.throws(() => assertValidReceipt(receiptFor(expired, { expiresAt: Date.now() - 1 }), expired), /expired/);

  const wrongId = action(`wrong-id-${Date.now()}`);
  assert.throws(() => assertValidReceipt({ ...receiptFor(wrongId), actionId: "other" }, wrongId), /actionId mismatch/);

  const wrongHash = action(`wrong-hash-${Date.now()}`);
  assert.throws(() => assertValidReceipt({ ...receiptFor(wrongHash), actionHash: "0xwrong" }, wrongHash), /actionHash mismatch/);

  const replay = action(`replay-${Date.now()}`);
  const valid = receiptFor(replay);
  assert.doesNotThrow(() => assertValidReceipt(valid, replay));
  assert.throws(() => assertValidReceipt(valid, replay), /already executed/);
});