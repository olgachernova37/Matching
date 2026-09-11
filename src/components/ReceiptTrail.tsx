"use client";

import type { AgentAction, HumanGateReceipt, RecipeRun } from "@/lib/types";
import type { TrailEntry } from "./dashboard-types";

const formatUsd = (amount: number) => `$${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
const shorten = (value: string) => `${value.slice(0, 12)}...${value.slice(-6)}`;

function ReceiptEntry({ action, receipt, status }: { action: AgentAction; receipt: HumanGateReceipt; status: "approved" }) {
  return <article className="border-l-2 border-ok bg-panel-raised p-3"><div className="flex items-center justify-between gap-3"><span className="font-mono text-xs font-semibold uppercase text-ok">{status}</span><time className="font-mono text-[10px] text-muted">{new Date(receipt.verifiedAt).toLocaleTimeString()}</time></div><p className="mt-3 font-mono text-xs text-foreground">{shorten(receipt.nullifierHash)}</p><div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted"><span>{receipt.continuity?.isReturning ? `returning human · first approved ${receipt.continuity.daysKnown} days ago` : "new human"}</span><span>{formatUsd(action.costUsd)}</span></div></article>;
}

function ExecutionEntry({ action, result }: { action: AgentAction; result: RecipeRun }) {
  return <article className="border-l-2 border-ok bg-panel-raised p-3"><div className="flex items-center justify-between gap-3"><span className="font-mono text-xs font-semibold uppercase text-ok">executed</span><span className="font-mono text-xs text-foreground">{formatUsd(result.costUsd)}</span></div><p className="mt-2 text-sm text-foreground">{result.status}</p><p className="mt-2 font-mono text-[10px] text-muted">{action.id} · {result.steps.length} steps{result.txHash ? ` · ${shorten(result.txHash)}` : ""}</p></article>;
}

function RejectionEntry({ action, message }: { action: AgentAction; message: string }) {
  return <article className="border-l-2 border-danger bg-danger/10 p-3"><div className="flex items-center justify-between gap-3"><span className="font-mono text-xs font-semibold uppercase text-danger">rejected</span><span className="font-mono text-xs text-danger">{formatUsd(action.costUsd)}</span></div><p className="mt-2 text-sm text-danger">{message}</p></article>;
}

export default function ReceiptTrail({ entries }: { entries: TrailEntry[] }) {
  return <section className="min-h-[620px] bg-panel p-5" aria-labelledby="trail-heading"><div className="flex items-center justify-between border-b border-border pb-4"><h2 id="trail-heading" className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Receipt trail</h2><span className="font-mono text-[10px] text-muted">APPEND ONLY</span></div><div className="space-y-3 pt-5">{entries.length === 0 && <p className="border border-dashed border-border p-4 text-sm text-muted">No approval or execution events in this session.</p>}{[...entries].reverse().map((entry) => entry.kind === "approval" ? <ReceiptEntry key={entry.id} action={entry.action} receipt={entry.receipt} status="approved" /> : entry.kind === "execution" ? <ExecutionEntry key={entry.id} action={entry.action} result={entry.result} /> : <RejectionEntry key={entry.id} action={entry.action} message={entry.message} />)}</div><div className="mt-8 border-t border-border pt-4"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Receipt policy</p><p className="mt-2 text-xs leading-5 text-muted">Receipts are single-action, short-lived, and bound to the proposed payload. The server decides whether execution is allowed.</p></div></section>;
}