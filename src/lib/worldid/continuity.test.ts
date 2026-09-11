import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { getContinuity, recordApproval } from "./continuity.ts";

test("a second approval by the same nullifier reports returning continuity", () => {
  const nullifier = `test-${Date.now()}-${Math.random()}`;
  const first = recordApproval(nullifier);
  const second = recordApproval(nullifier);

  assert.equal(first.isReturning, false);
  assert.equal(first.approvalCount, 1);
  assert.equal(second.isReturning, true);
  assert.equal(second.approvalCount, 2);
  assert.deepEqual(getContinuity(nullifier), second);
});

test("a corrupt continuity ledger is treated as empty", () => {
  const ledgerPath = `${process.cwd()}/.data/humans.json`;
  fs.mkdirSync(`${process.cwd()}/.data`, { recursive: true });
  const original = fs.existsSync(ledgerPath) ? fs.readFileSync(ledgerPath) : undefined;
  fs.writeFileSync(ledgerPath, "not-json");
  assert.equal(getContinuity("missing").approvalCount, 0);
  if (original) fs.writeFileSync(ledgerPath, original); else fs.rmSync(ledgerPath);
});