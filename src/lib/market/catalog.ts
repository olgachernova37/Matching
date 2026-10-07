import type { Provider } from "./types.ts";

/**
 * Seed catalog of provider agents.
 *
 * These are DEMO providers: their names, prices and ratings are invented for
 * the hackathon and their payout addresses are placeholders that no one
 * controls. A real deployment would read this list from an agent registry.
 */
export const SEED_PROVIDERS: readonly Provider[] = Object.freeze([
  {
    id: "lingo-fast",
    name: "Lingo Fast",
    skills: ["translate"],
    priceUsd: 0.02,
    payTo: "0x1111111111111111111111111111111111111111",
    rating: 4.2,
    jobs: 310,
  },
  {
    id: "lingo-pro",
    name: "Lingo Pro",
    skills: ["translate", "summarize"],
    priceUsd: 0.05,
    payTo: "0x2222222222222222222222222222222222222222",
    rating: 4.9,
    jobs: 128,
  },
  {
    id: "brief-bot",
    name: "Brief Bot",
    skills: ["summarize"],
    priceUsd: 0.03,
    payTo: "0x3333333333333333333333333333333333333333",
    rating: 4.5,
    jobs: 77,
  },
  {
    id: "audit-hawk",
    name: "Audit Hawk",
    skills: ["contract_audit"],
    priceUsd: 25,
    payTo: "0x4444444444444444444444444444444444444444",
    rating: 4.7,
    jobs: 19,
  },
]);

export function listProviders(): Provider[] {
  return SEED_PROVIDERS.map((provider) => ({ ...provider, skills: [...provider.skills] }));
}

export function getProvider(id: string): Provider | undefined {
  const found = SEED_PROVIDERS.find((provider) => provider.id === id);
  return found ? { ...found, skills: [...found.skills] } : undefined;
}

export function listSkills(): string[] {
  return [...new Set(SEED_PROVIDERS.flatMap((provider) => provider.skills))].sort();
}
