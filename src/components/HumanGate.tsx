"use client";

import type { AgentAction } from "@/lib/types";

type HumanGateProps = { action: AgentAction };

/** Temporary T6 stub. T3 replaces this file with the real IDKit Selfie Check gate. */
export default function HumanGate({ action }: HumanGateProps) {
  return (
    <button
      type="button"
      className="w-full border border-brand bg-brand px-4 py-3 text-sm font-semibold text-background hover:bg-transparent hover:text-brand"
      onClick={() => window.dispatchEvent(new CustomEvent("human-gate:approved", { detail: action.id }))}
    >
      Approve with Selfie Check
    </button>
  );
}