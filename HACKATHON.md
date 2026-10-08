# From Dusk Till Dawn #01 — what is base and what is new

Track: **Agentic Economy** — agent discovery, payments, wallets and dispute resolution.

The event's rule is "the project itself starts at kick-off" (building started
**Thu 8 Oct, 21:00**). This repository is older than that. The mentors told us
that reusing our own work from earlier hackathons is fine, so we reuse it as a
base and list below, honestly, what existed before kick-off and what was built
during the night. Every claim can be checked against the commit times on `main`.

## Before kick-off (reused base)

**1. Human-Gated AI Copilot** — built for ETHOnline, September 2026: the agent
(`src/lib/agent`), live wallet risk from The Graph (`src/lib/graph`), World ID
Selfie Check bound to the exact action payload (`src/lib/worldid`), the x402
gateway (`src/lib/bazantic`) and the dashboard. See [README.md](README.md).

**2. The agent marketplace module** (`src/lib/market`, `/market`) — built on
7–8 October, *before* kick-off, while preparing for this event:

| Part | Where | What it does |
|---|---|---|
| Discovery | `discovery.ts`, `catalog.ts` | A buyer agent names a skill; a provider is chosen by price ceiling, rating and strategy. Deterministic — the model never chooses who gets paid. |
| Escrow state machine | `escrow.ts` | Funds lock before work starts, release only after delivery. |
| Judge | `judge.ts` | One OpenAI call compares order and delivery; fixed rules turn the verdict into release, refund or escalation. |
| Provider check | `provider-risk.ts` | The provider's payout wallet is read from the live Uniswap V3 subgraph before funding. |
| Human gate | `policy.ts`, `deals.ts` | Deals above $1 and uncertain verdicts wait for the Selfie Check. |
| Buyer and provider agents | `buyer.ts`, `worker.ts` | Plain-language orders (EN/UK/CS); providers do the job through model calls. |
| Apify Scout | `apify.ts` | A `web_research` provider that runs an Apify Actor and cites the pages it returns. |
| Spoken alerts | `voice.ts` | ElevenLabs (or browser speech) says each key moment of a deal. |
| Deal console | `MarketConsole.tsx` | One screen for the whole deal, with a one-click demo. |

**3. Ideas from SingIt** by [bubon-ik](https://github.com/bubon-ik) —
[github.com/bubon-ik/SingItAI](https://github.com/bubon-ik/SingItAI), MIT
licence, © 2026 SingIt. Three **ideas** were re-implemented in TypeScript; no
SingIt source code was copied: a spending limit below which an agent pays
alone; each provider bound to one payout address; "paid" and "delivered" as
separate facts.

## Built during the hackathon (from 21:00, 8 Oct)

Before kick-off, the escrow was only a ledger record — which this track counts
as SIMULATED. The night's work makes the money move for real:

| Part | Where | What it does |
|---|---|---|
| Real settlement on Base Sepolia | `settlement.ts`, `deals.ts` | Funding sends testnet **USDC** from the buyer agent's wallet to the escrow agent's wallet; settling sends it on to the provider (release) or back to the buyer (refund). Transaction hashes are stored on the deal and linked to BaseScan. |
| Hard spending caps in code | `spend.ts` | Checked before any lock: per payment (default $5) and per UTC day (default $10). Never in a prompt. |
| Nothing pays twice | `deals.ts` | Atomic once-only claims on funding and payout. A transfer is dry-run first: if it cannot succeed it is refused before sending and may be retried; if it may have been sent, it is never retried automatically. |
| Approval kept across retries | `deals.ts` | A consumed Selfie Check is remembered on the deal, so a payment that failed before sending is retried without a second approval. |
| Testnet-friendly provider check | `policy.ts` | `MARKET_GRAPH_GATE=advisory` shows Graph evidence without gating on it (testnet wallets have no mainnet history). |
| Console | `MarketConsole.tsx` | Real-money banner with caps and today's spend, BaseScan links for every transfer, payment errors with a retry button, SIMULATED labels when no keys are set. |
| Tests | `settlement.test.ts` | Lock-and-release and refund flows, per-payment and daily caps, double funding refused, safe retry vs. never-retry, approval kept across a failed send, advisory mode. |

## What is real and what is simulated

| Real | Simulated or limited |
|---|---|
| **Payments**, when `MARKET_BUYER_PRIVATE_KEY` and `MARKET_ESCROW_PRIVATE_KEY` are set: USDC transfers on Base Sepolia, visible on BaseScan. Testnet money counts as real for this track. | Without those keys nothing moves, and the console and every deal say **SIMULATED**. |
| Hard caps and once-only payment rules — code with tests. | The escrow is **custodial**: an agent-held wallet, not a smart contract. Whoever holds the escrow key could move the funds. |
| Buyer agent, provider agents and judge are real OpenAI calls when `OPENAI_API_KEY` is set. | The provider catalog is demo data, and the provider agents run on our own server. Payouts go to the addresses in `MARKET_PROVIDER_ADDRESSES` (wallets we control); the built-in placeholder addresses are controlled by no one. |
| Selfie Check is the real World ID flow from the base project. | Without `OPENAI_API_KEY` the judge does not guess: verdicts are "uncertain" and go to a human. |
| Apify Scout's sources come from a real Apify run when `APIFY_TOKEN` is set. | Apify is paid with our Apify token, not through the marketplace's escrow. |

## Known limits

- The daily cap is a read-then-write on the key-value store: two payments in the
  same instant could both pass it. Each single payment is still capped.
- The escrow is custodial; the next step is a small escrow contract or
  Masumi's escrow.
- The catalog is a fixed list, not a live registry (e.g. Sokosumi / Masumi).
- A Selfie Check receipt lives 5 minutes; funding must follow within that window.
