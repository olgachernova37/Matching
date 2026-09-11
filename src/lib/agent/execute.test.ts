import assert from "node:assert/strict";
import test from "node:test";
import type { AgentAction } from "@/lib/types";
import { execute } from "./execute.ts";

const action: AgentAction = { id: `execute-test-${Date.now()}`, kind: "recipe_run", summary: "test", payload: {}, riskScore: 80, riskReasons: [], costUsd: 0.05, requiresHuman: true, createdAt: Date.now() };

test("execute refuses a gated action without a receipt", async () => {
  await assert.rejects(execute(action), /human approval receipt required/);
});

test("execute refuses a non-gated action without a receipt", async () => {
  await assert.rejects(execute({ ...action, id: `${action.id}-free`, requiresHuman: false, costUsd: 0 }), /valid human approval receipt/);
});