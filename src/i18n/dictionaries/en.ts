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
    brand: "Human",
    brandSuffix: "-Gated",
    homeAria: "Human-Gated home",
    credit: "Created by Olga Demianyk",
    navLabel: "Primary",
    nav: {
      howItWorks: "How It Works",
      sponsors: "Sponsors",
      security: "Security",
      gatewayApi: "Gateway API",
    },
    openConsole: "Open Console",
    viewSource: "View on GitHub",
    badge: "Selfie Check · The Graph · x402",
    headline: {
      before: "Your",
      em: "AI agent",
      after: "can't spend",
      bottom: "until a human approves.",
    },
    lead: "Live on-chain evidence scores the risk. Every risky action waits for a World ID Selfie Check bound to that exact payload.",
    statsLabel: "Key facts",
    stats: {
      binding: "1 proof per exact action",
      receipt: "Single-use, 5-minute receipts",
      sponsors: "Built on The Graph, World & Bazantic",
    },
    menuOpen: "Open menu",
    menuClose: "Close menu",
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
    credential: { selfie_check: "Selfie Check", device: "Device", orb: "Orb" },
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
