# From Dusk Till Dawn #01 — what is base and what is new

Track: **Agentic Economy** — agent discovery, payments, wallets and dispute resolution.

This file separates the existing foundation from the work done for this
hackathon, and what is real from what is simulated, so the jury can judge the
new work on its own.

## The base (existed before this hackathon)

- **Human-Gated AI Copilot** — this repository, built for ETHOnline 2026 in
  September 2026: the agent (`src/lib/agent`), live wallet risk from The Graph
  (`src/lib/graph`), World ID Selfie Check bound to the exact action payload
  (`src/lib/worldid`), the x402 gateway (`src/lib/bazantic`), the dashboard
  and its 32 tests. See [README.md](README.md) and [PLAN.md](PLAN.md).
- **SingIt** by [bubon-ik](https://github.com/bubon-ik) —
  [github.com/bubon-ik/SingItAI](https://github.com/bubon-ik/SingItAI), MIT
  licence, © 2026 SingIt. An agent that pays sellers over x402 inside spending
  limits. We reused three of its **ideas**, re-implemented in TypeScript here;
  no SingIt source code was copied:
  1. a per-job spending limit, below which the agent may pay alone;
  2. each provider is bound to the one address it is paid at;
  3. "paid" and "delivered" are separate facts — money is released only after
     the work is delivered.

## New for this hackathon: the agent marketplace

Started on 7 October 2026, the evening before the event, and continued during
it. Commit history on `main` shows each step.

| Part | Where | What it does |
|---|---|---|
| Discovery | `src/lib/market/discovery.ts`, `catalog.ts` | A buyer agent names a skill; a provider is chosen by price ceiling, rating and strategy. Deterministic — the model never chooses who gets paid. |
| Escrow | `src/lib/market/escrow.ts`, `deals.ts` | Deal state machine. Funds lock before work starts, release only after delivery, and pay out at most once (atomic claim). |
| Judge | `src/lib/market/judge.ts` | One OpenAI call compares the order with the delivery: accepted / rejected / uncertain. Fixed rules turn the verdict into release, refund or escalation. |
| Human gate | `src/lib/market/deals.ts`, `policy.ts` | Deals above $1, and any verdict that is uncertain or low-confidence, wait for the existing Selfie Check, bound to the exact deal payload. |
| API | `src/app/api/market/` | providers, deals, fund, deliver, judge, resolve, cancel |
| Demo | `scripts/market-demo.ts` | Story A: $0.02, agents only. Story B: $25, Selfie Check on funding and payout. |
| Tests | `src/lib/market/*.test.ts` | 27 tests: discovery choice, escrow transitions, judge parsing and rules, both stories, forged and expired receipts. |

## What is real and what is simulated

| Real | Simulated |
|---|---|
| Discovery, escrow state machine and payout rules — running code with tests | **Settlement.** Escrow is a ledger record in the key-value store, not on-chain funds. Every deal says `settlement: "simulated"`. |
| The judge is a real OpenAI call when `OPENAI_API_KEY` is set | **Provider agents.** The catalog is demo data; payout addresses are placeholders nobody controls; deliveries in the demo script are fixed text. |
| The Selfie Check is the real World ID flow from the base project | Without `OPENAI_API_KEY` the judge does not guess: every verdict is "uncertain" and goes to a human. |

## Known limits

- No on-chain escrow contract yet; the next step is locking USDC on a testnet
  (or Masumi's escrow) instead of a ledger record.
- The catalog is a fixed list, not a live agent registry.
- The dashboard shows marketplace approvals as ordinary pending actions; it has
  no dedicated marketplace view.
- A human approval receipt lives 5 minutes, so funding or resolving must
  follow the Selfie Check within that window.
