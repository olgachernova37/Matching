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
    brand: "Human-Gated",
    credit: "Created by Olga Demianyk",
    eyebrow: "Pauza před následkem",
    headlineTop: "Inteligence,",
    headlineBottom: "s člověkem v každém rozhodnutí.",
    lead: "Každý návrh vychází ze živých důkazů. Když je AI agent připraven jednat, poslední slovo má ověřený člověk.",
    openConsole: "Otevřít konzoli",
    builtFor: "Vytvořeno pro akce s následky",
    markLabel: "Kontinuita / důvěra",
    markAlt: "Zlatý symbol nekonečna představující nepřetržitý lidský dohled",
    markNoteTop: "Žádná akce",
    markNoteBottom: "bez důkazu",
    flowLabel: "Šestikrokový průběh akce",
    steps: {
      graph: {
        title: "Graph",
        detail: "Vyhledáme peněženku a načteme její skutečnou, živou historii na blockchainu.",
      },
      risk: {
        title: "Riziko",
        detail: "Z této historie vznikne skóre, takže vidíte, jak bezpečná daná akce je.",
      },
      plan: {
        title: "Plán",
        detail: "Agent přesně sepíše, co chce udělat, do posledního detailu.",
      },
      selfie: {
        title: "Selfie Check",
        detail: "Skutečný člověk pořídí selfie a tím doloží, že tu je a že souhlasí.",
      },
      x402: {
        title: "x402",
        detail: "Teprve pak platba odejde a brána zkontroluje potvrzení.",
      },
      audit: {
        title: "Audit",
        detail: "Každý krok výše se ukládá, takže se kdokoli může vrátit a zjistit, co se stalo.",
      },
    },
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
