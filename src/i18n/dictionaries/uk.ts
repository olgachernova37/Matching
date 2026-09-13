import type { Dictionary } from "./en.ts";

/** Ukrainian. Typed as `Dictionary`, so a missing or stray key is a compile error. */
export const uk: Dictionary = {
  meta: {
    title: "AI-копілот під людським контролем",
    description:
      "Ончейн AI-копілот, який не може витратити кошти без доказу Selfie Check, прив'язаного саме до тієї дії, яку він запропонував.",
  },

  language: {
    label: "Мова",
    switchTo: "Перемкнути мову на {name}",
  },

  landing: {
    brand: "Human",
    brandSuffix: "-Gated",
    homeAria: "Human-Gated — на головну",
    credit: "Created by Olga Demianyk",
    navLabel: "Основна навігація",
    nav: {
      howItWorks: "Як це працює",
      sponsors: "Партнери",
      security: "Безпека",
      gatewayApi: "Gateway API",
    },
    openConsole: "Відкрити консоль",
    viewSource: "Переглянути на GitHub",
    badge: "Selfie Check · The Graph · x402",
    headline: {
      before: "Ваш",
      em: "AI-агент",
      after: "нічого не витратить,",
      bottom: "доки людина не схвалить.",
    },
    lead: "Живі on-chain дані визначають ризик. Кожна ризикована дія чекає на World ID Selfie Check, прив'язаний саме до неї.",
    statsLabel: "Ключові факти",
    stats: {
      binding: "1 доказ — 1 конкретна дія",
      receipt: "Одноразові квитанції на 5 хвилин",
      sponsors: "Працює на The Graph, World і Bazantic",
    },
    menuOpen: "Відкрити меню",
    menuClose: "Закрити меню",
  },

  dashboard: {
    mockBanner: "ТЕСТОВІ ДАНІ · УВІМКНЕНО ЗАПАСНИЙ НАБІР",
    linkNotFound: "Посилання на дію не знайдено. Попросіть агента створити нову пропозицію.",
    product: "Human-Gated AI-копілот",
    console: "Консоль оператора",
    session: "/ жива сесія",
    status: "агент онлайн · мережа: mainnet",
    planFailed: "PLAN_FAILED: Планування агента не вдалося",
    executionFailed: "EXECUTION_FAILED: Виконання агентом не вдалося",
  },

  evidence: {
    heading: "Панель доказів",
    awaiting: "Очікування доказів щодо гаманця",
    live: "Наживо",
    secondsAgo: "{n} с тому",
    riskAria: "Оцінка ризику {score} зі 100",
    riskHigh: "ВИСОКИЙ РИЗИК",
    riskElevated: "ПІДВИЩЕНИЙ РИЗИК",
    riskLow: "НИЗЬКИЙ РИЗИК",
    sourceSubgraph: "Субграф-джерело",
    transactions: "Транзакції",
    counterparties: "Контрагенти",
    firstSeen: "Перша активність",
    volumeUsd: "Обсяг USD",
    noneObserved: "Не виявлено",
    reasonsHeading: "Причини ризику / посилання",
    noReasons: "Виявлені ончейн-докази не спрацювали на жодне правило ризику.",
    empty: "Живі докази щодо гаманця з'являться тут після того, як агент спланує запит.",
    pendingAction: "Дія в очікуванні",
    riskScore: "оцінка ризику:",
    actionHash: "хеш дії:",
    attemptWithoutApproval: "Спробувати виконати без схвалення",
    execute: "Виконати через шлюз x402",
    blocked: "Заблоковано: очікується схвалення людиною",
  },

  chat: {
    heading: "Гілка чату",
    thinking: "Думає",
    ready: "Готовий",
    empty:
      "Попросіть копілота перевірити гаманець. Перш ніж запропонувати дію, агент наведе живі докази з The Graph.",
    roleUser: "користувач",
    roleAssistant: "асистент",
    roleSystem: "система",
    planning: "Агент запитує докази й планує...",
    inputLabel: "Написати агентові",
    placeholder: "Запитайте про гаманець або дію...",
    send: "Надіслати",
  },

  gate: {
    approve: "Схвалити через Selfie Check",
    preparing: "Готуємо захищений контекст World ID...",
    actionToApprove: "Дія до схвалення",
    cost: "вартість:",
    riskScore: "оцінка ризику:",
    actionHash: "хеш дії:",
    note: "Selfie Check підвищує вартість автоматизованих і повторюваних зловживань.",
    contextFailed: "Не вдалося створити контекст запиту World ID",
    startFailed: "Не вдалося розпочати перевірку World ID",
    signalMismatch: "Невідповідність сигналу World ID: цей доказ не для дії в очікуванні",
    verifyFailed: "Перевірка World ID не вдалася",
    selfieUnavailable:
      "Selfie Check не увімкнено для цього застосунку; доступна стандартна перевірка World ID.",
  },

  trail: {
    heading: "Слід квитанцій",
    appendOnly: "Лише додавання",
    empty: "У цій сесії немає подій схвалення чи виконання.",
    approved: "схвалено",
    executed: "виконано",
    rejected: "відхилено",
    credential: { selfie_check: "Selfie Check", device: "Пристрій", orb: "Orb" },
    newHuman: "нова людина",
    returningHuman: {
      one: "людина повернулася · вперше схвалила {n} день тому",
      few: "людина повернулася · вперше схвалила {n} дні тому",
      many: "людина повернулася · вперше схвалила {n} днів тому",
      other: "людина повернулася · вперше схвалила {n} дня тому",
    },
    steps: { one: "{n} крок", few: "{n} кроки", many: "{n} кроків", other: "{n} кроку" },
    policyHeading: "Політика квитанцій",
    policy:
      "Квитанція діє для однієї дії, має короткий строк і прив'язана до запропонованих даних. Чи дозволено виконання, вирішує сервер.",
  },
};
