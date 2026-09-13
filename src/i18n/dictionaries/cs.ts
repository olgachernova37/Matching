import type { Dictionary } from "./en.ts";

/** Czech. Typed as `Dictionary`, so a missing or stray key is a compile error. */
export const cs: Dictionary = {
  meta: {
    title: "AI kopilot s lidskou pojistkou",
    description:
      "On-chain AI kopilot, který nemůže nic utratit bez důkazu Selfie Check svázaného přesně s akcí, kterou navrhl.",
  },

  language: {
    label: "Jazyk",
    switchTo: "Přepnout jazyk na {name}",
  },

  landing: {
    brand: "Human",
    brandSuffix: "-Gated",
    homeAria: "Human-Gated – domů",
    credit: "Created by Olga Demianyk",
    navLabel: "Hlavní navigace",
    nav: {
      howItWorks: "Jak to funguje",
      sponsors: "Partneři",
      security: "Bezpečnost",
      gatewayApi: "Gateway API",
    },
    openConsole: "Otevřít konzoli",
    viewSource: "Zobrazit na GitHubu",
    badge: "Selfie Check · The Graph · x402",
    headline: {
      before: "Váš",
      em: "AI agent",
      after: "nic neutratí,",
      bottom: "dokud to neschválí člověk.",
    },
    lead: "Živá on-chain data určí riziko. Každá riziková akce čeká na World ID Selfie Check navázaný přesně na ni.",
    statsLabel: "Klíčová fakta",
    stats: {
      binding: "1 důkaz na 1 konkrétní akci",
      receipt: "Jednorázová potvrzení na 5 minut",
      sponsors: "Postaveno na The Graph, World a Bazantic",
    },
    menuOpen: "Otevřít menu",
    menuClose: "Zavřít menu",
  },

  dashboard: {
    mockBanner: "TESTOVACÍ DATA · AKTIVNÍ NÁHRADNÍ SADA",
    linkNotFound: "Odkaz na akci nebyl nalezen. Požádejte agenta o nový návrh.",
    product: "Human-Gated AI kopilot",
    console: "Konzole operátora",
    session: "/ živá relace",
    status: "agent online · síť: mainnet",
    planFailed: "PLAN_FAILED: Plánování agenta selhalo",
    executionFailed: "EXECUTION_FAILED: Provedení agentem selhalo",
  },

  evidence: {
    heading: "Panel důkazů",
    awaiting: "Čeká se na důkazy o peněžence",
    live: "Živě",
    secondsAgo: "před {n} s",
    riskAria: "Skóre rizika {score} ze 100",
    riskHigh: "VYSOKÉ RIZIKO",
    riskElevated: "ZVÝŠENÉ RIZIKO",
    riskLow: "NÍZKÉ RIZIKO",
    sourceSubgraph: "Zdrojový subgraf",
    transactions: "Transakce",
    counterparties: "Protistrany",
    firstSeen: "První výskyt",
    volumeUsd: "Objem USD",
    noneObserved: "Nic nezjištěno",
    reasonsHeading: "Důvody rizika / citace",
    noReasons: "Zjištěné on-chain důkazy nespustily žádné rizikové pravidlo.",
    empty: "Živé důkazy o peněžence se zde objeví poté, co agent naplánuje požadavek.",
    pendingAction: "Čekající akce",
    riskScore: "skóre rizika:",
    actionHash: "hash akce:",
    attemptWithoutApproval: "Zkusit provedení bez schválení",
    execute: "Provést přes bránu x402",
    blocked: "Blokováno: čeká se na schválení člověkem",
  },

  chat: {
    heading: "Vlákno konverzace",
    thinking: "Přemýšlí",
    ready: "Připraven",
    empty:
      "Požádejte kopilota o prověření peněženky. Agent před návrhem akce doloží živé důkazy z The Graph.",
    roleUser: "uživatel",
    roleAssistant: "asistent",
    roleSystem: "systém",
    planning: "Agent načítá důkazy a plánuje...",
    inputLabel: "Napsat agentovi",
    placeholder: "Zeptejte se na peněženku nebo akci...",
    send: "Odeslat",
  },

  gate: {
    approve: "Schválit pomocí Selfie Check",
    preparing: "Připravuje se zabezpečený kontext World ID...",
    actionToApprove: "Akce ke schválení",
    cost: "cena:",
    riskScore: "skóre rizika:",
    actionHash: "hash akce:",
    note: "Selfie Check zdražuje automatizované a opakované zneužití.",
    contextFailed: "Nepodařilo se vytvořit kontext požadavku World ID",
    startFailed: "Nepodařilo se spustit ověření World ID",
    signalMismatch: "Neshoda signálu World ID: tento důkaz nepatří k čekající akci",
    verifyFailed: "Ověření World ID selhalo",
    selfieUnavailable:
      "Selfie Check není pro tuto aplikaci povolen; k dispozici je standardní ověření World ID.",
  },

  trail: {
    heading: "Stopa potvrzení",
    appendOnly: "Pouze přidávání",
    empty: "V této relaci nejsou žádná schválení ani provedení.",
    approved: "schváleno",
    executed: "provedeno",
    rejected: "zamítnuto",
    credential: { selfie_check: "Selfie Check", device: "Zařízení", orb: "Orb" },
    newHuman: "nový člověk",
    returningHuman: {
      one: "vracející se člověk · poprvé schválil před {n} dnem",
      few: "vracející se člověk · poprvé schválil před {n} dny",
      other: "vracející se člověk · poprvé schválil před {n} dny",
    },
    steps: { one: "{n} krok", few: "{n} kroky", many: "{n} kroku", other: "{n} kroků" },
    policyHeading: "Zásady potvrzení",
    policy:
      "Potvrzení platí pro jedinou akci, mají krátkou platnost a jsou svázána s navrženými daty. O tom, zda se akce provede, rozhoduje server.",
  },
};
