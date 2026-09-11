"use client";

import { useEffect, useMemo, useState } from "react";
import { IDKitInviteCodeRequestWidget, deviceLegacy, selfieCheckLegacy, type IDKitResult } from "@worldcoin/idkit";
import { clientEnv } from "@/lib/env";
import { hashAction } from "@/lib/worldid/hash";
import type { AgentAction, HumanGateReceipt, RpContext } from "@/lib/types";

type HumanGateProps = { action: AgentAction };

function truncate(value: string): string {
  return `${value.slice(0, 14)}...${value.slice(-8)}`;
}

function signalFromResult(result: IDKitResult): string | undefined {
  if (!("responses" in result) || result.responses.length === 0) return undefined;
  return result.responses[0].signal_hash;
}

export default function HumanGate({ action }: HumanGateProps) {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [rpContext, setRpContext] = useState<RpContext | null>(null);
  const [fallback, setFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signal = useMemo(() => hashAction(action.payload), [action.payload]);
  const preset = fallback ? deviceLegacy({ signal }) : selfieCheckLegacy({ signal });

  useEffect(() => {
    if (!confirmed) return;
    let active = true;
    void fetch("/api/worldid/rp-context").then(async (response) => {
      if (!response.ok) throw new Error("Could not create World ID request context");
      return (await response.json()) as RpContext;
    }).then((context) => {
      if (!active) return;
      setRpContext(context);
      setOpen(true);
    }).catch((requestError: unknown) => {
      if (active) setError(requestError instanceof Error ? requestError.message : "Could not start World ID verification");
    });
    return () => { active = false; };
  }, [confirmed]);

  async function handleSuccess(result: IDKitResult): Promise<void> {
    if (signalFromResult(result) !== signal) {
      setError("World ID signal mismatch: this proof is not for the pending action");
      return;
    }
    const response = await fetch("/api/worldid/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rp_id: rpContext?.rp_id, idkitResponse: result, actionId: action.id }) });
    const payload: unknown = await response.json();
    if (!response.ok) {
      setError(payload && typeof payload === "object" && "error" in payload ? String(payload.error) : "World ID verification failed");
      return;
    }
    const receipt = payload as HumanGateReceipt;
    window.dispatchEvent(new CustomEvent("human-gate:approved", { detail: { actionId: action.id, receipt } }));
    setOpen(false);
  }

  return (
    <div>
      {!confirmed ? (
        <button type="button" className="w-full border border-brand bg-brand px-4 py-3 text-sm font-semibold text-background hover:bg-transparent hover:text-brand" onClick={() => { setError(null); setConfirmed(true); }}>
          Approve with Selfie Check
        </button>
      ) : rpContext ? (
        <IDKitInviteCodeRequestWidget open={open} onOpenChange={setOpen} app_id={clientEnv.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`} action={clientEnv.NEXT_PUBLIC_WLD_ACTION} rp_context={rpContext} allow_legacy_proofs={true} environment={clientEnv.NEXT_PUBLIC_WLD_ENV} preset={preset} onSuccess={handleSuccess} onError={() => { console.warn("[World ID] Selfie Check is unavailable; falling back to standard device verification."); setFallback(true); setError("Selfie Check is not enabled for this app; standard World ID verification is available."); }} />
      ) : (
        <p className="border border-border bg-panel-raised px-4 py-3 text-center font-mono text-xs text-muted">Preparing secure World ID context...</p>
      )}
      {confirmed && <div className="mt-3 border border-border bg-panel p-4 text-sm"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">Action to approve</p><p className="mt-2 text-foreground">{action.summary}</p><div className="mt-3 grid gap-2 font-mono text-xs text-muted"><span>cost: ${action.costUsd.toFixed(2)}</span><span>risk score: {action.riskScore}/100</span><span>action hash: {truncate(signal)}</span></div><p className="mt-3 text-xs text-muted">Selfie Check raises the cost of automated and repeated abuse.</p></div>}
      {error && <p className="mt-3 border border-danger bg-danger/10 px-3 py-2 text-xs text-danger">{error}</p>}
    </div>
  );
}