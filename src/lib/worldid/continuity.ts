import fs from "node:fs";
import path from "node:path";
import { CREDENTIAL_VALIDITY_DAYS, type ContinuityInfo } from "../types.ts";

type HumanRecord = { firstSeenAt: number; approvalCount: number };
type HumanLedger = Record<string, HumanRecord>;

const ledgerPath = path.join(process.cwd(), ".data", "humans.json");
const dayMs = 24 * 60 * 60 * 1000;

function readLedger(): HumanLedger {
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as HumanLedger;
  } catch {
    return {};
  }
}

function writeLedger(ledger: HumanLedger): void {
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  const temporaryPath = `${ledgerPath}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(ledger, null, 2), "utf8");
  fs.renameSync(temporaryPath, ledgerPath);
}

function toContinuity(record: HumanRecord | undefined, now = Date.now(), isReturning = record ? record.approvalCount > 0 : false): ContinuityInfo {
  if (!record) {
    return { isReturning: false, firstSeenAt: now, approvalCount: 0, daysKnown: 0 };
  }

  const daysKnown = Math.min(CREDENTIAL_VALIDITY_DAYS, Math.max(0, Math.floor((now - record.firstSeenAt) / dayMs)));
  return {
    isReturning,
    firstSeenAt: record.firstSeenAt,
    approvalCount: record.approvalCount,
    daysKnown,
  };
}

export function getContinuity(nullifierHash: string): ContinuityInfo {
  return toContinuity(readLedger()[nullifierHash]);
}

export function recordApproval(nullifierHash: string): ContinuityInfo {
  const ledger = readLedger();
  const existing = ledger[nullifierHash];
  const record = existing
    ? { firstSeenAt: existing.firstSeenAt, approvalCount: existing.approvalCount + 1 }
    : { firstSeenAt: Date.now(), approvalCount: 1 };
  ledger[nullifierHash] = record;
  writeLedger(ledger);
  return toContinuity(record, Date.now(), Boolean(existing && existing.approvalCount > 0));
}