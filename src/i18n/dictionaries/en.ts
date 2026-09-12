import type { Plural } from "../format.ts";

/**
 * The reference dictionary. Its shape *is* the `Dictionary` type, so `cs.ts`
 * and `uk.ts` fail to compile the moment a key is missing, renamed or extra.
 *
 * Values are plain strings (with `{name}` placeholders) or `Plural` objects —
 * never functions, so a Server Component can pass a whole dictionary to the
 * client tree as a prop.
 */
export const en = {
  meta: {
    title: "Human-Gated AI Copilot",
    description:
      "An on-chain AI copilot that cannot spend without a Selfie Check proof bound to the exact action it proposed.",
  },

  language: {
    label: "Language",
    switchTo: "Switch language to {name}",
  },

  landing: {
    brand: "Human-Gated",
    credit: "Created by Olga Demianyk",
    eyebrow: "A pause before consequence",
    headlineTop: "Intelligence,",
    headlineBottom: "with a human in the loop.",
    lead: "Live evidence informs every proposal. A verified person remains the final authority when an AI agent is ready to act.",
    openConsole: "Open Console",
    builtFor: "Built for consequential actions",
    markLabel: "Continuity / trust",
    markAlt: "Gold infinity mark representing continuous human oversight",
    markNoteTop: "No action",
    markNoteBottom: "without proof",
    flowLabel: "Six-step action flow",
    steps: {
      graph: {
        title: "Graph",
        detail: "We look up the wallet and pull its real, live history on chain.",
      },
      risk: {
        title: "Risk",
        detail: "That history becomes a score, so you can see how safe the action is.",
      },
      plan: {
        title: "Plan",
        detail: "The agent writes down exactly what it wants to do, down to the last detail.",
      },
      selfie: {
        title: "Selfie Check",
        detail: "A real person takes a selfie to prove they are here and they agree.",
      },
      x402: {
        title: "x402",
        detail: "Only then does the payment go out, and the gateway checks the receipt.",
      },
      audit: {
        title: "Audit",
        detail: "Every step above is saved, so anyone can go back and see what happened.",
      },
    },
  },

  dashboard: {
    mockBanner: "MOCK DATA · FALLBACK FIXTURE ACTIVE",
    linkNotFound: "Action link not found. Ask the agent to create a new proposal.",
    product: "Human-Gated AI Copilot",
    console: "Operator Console",
    session: "/ live session",
    status: "agent online · chain: mainnet",
    planFailed: "PLAN_FAILED: Agent planning failed",
    executionFailed: "EXECUTION_FAILED: Agent execution failed",
  },

  evidence: {
    heading: "Evidence panel",
    awaiting: "Awaiting wallet evidence",
    live: "Live",
    secondsAgo: "{n}s ago",
    riskAria: "Risk score {score} out of 100",
    riskHigh: "HIGH RISK",
    riskElevated: "ELEVATED RISK",
    riskLow: "LOW RISK",
    sourceSubgraph: "Source subgraph",
    transactions: "Transactions",
    counterparties: "Counterparties",
    firstSeen: "First seen",
    volumeUsd: "Volume USD",
    noneObserved: "None observed",
    reasonsHeading: "Risk reasons / citations",
    noReasons: "No risk rules triggered by the observed on-chain evidence.",
    empty: "Live wallet evidence appears here after the agent plans a request.",
    pendingAction: "Pending action",
    riskScore: "risk score:",
    actionHash: "action hash:",
    attemptWithoutApproval: "Attempt execution without approval",
    execute: "Execute through x402 Gateway",
    blocked: "Blocked: awaiting human approval",
  },

  chat: {
    heading: "Chat thread",
    thinking: "Thinking",
    ready: "Ready",
    empty:
      "Ask the copilot to inspect a wallet. The agent will cite live Graph evidence before proposing an action.",
    roleUser: "user",
    roleAssistant: "assistant",
    roleSystem: "system",
    planning: "Agent is querying evidence and planning...",
    inputLabel: "Message the agent",
    placeholder: "Ask about a wallet or action...",
    send: "Send",
  },

  gate: {
    approve: "Approve with Selfie Check",
    preparing: "Preparing secure World ID context...",
    actionToApprove: "Action to approve",
    cost: "cost:",
    riskScore: "risk score:",
    actionHash: "action hash:",
    note: "Selfie Check raises the cost of automated and repeated abuse.",
    contextFailed: "Could not create World ID request context",
    startFailed: "Could not start World ID verification",
    signalMismatch: "World ID signal mismatch: this proof is not for the pending action",
    verifyFailed: "World ID verification failed",
    selfieUnavailable:
      "Selfie Check is not enabled for this app; standard World ID verification is available.",
  },

  trail: {
    heading: "Receipt trail",
    appendOnly: "Append only",
    empty: "No approval or execution events in this session.",
    approved: "approved",
    executed: "executed",
    rejected: "rejected",
    newHuman: "new human",
    returningHuman: {
      one: "returning human · first approved {n} day ago",
      other: "returning human · first approved {n} days ago",
    } as Plural,
    steps: { one: "{n} step", other: "{n} steps" } as Plural,
    policyHeading: "Receipt policy",
    policy:
      "Receipts are single-action, short-lived, and bound to the proposed payload. The server decides whether execution is allowed.",
  },
};

export type Dictionary = typeof en;
