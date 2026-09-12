import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary, getLocale } from "@/i18n";

export default async function Home() {
  const locale = await getLocale();
  const t = await getDictionary();
  const { steps: copy } = t.landing;
  const steps = [
    ["01", copy.graph],
    ["02", copy.risk],
    ["03", copy.plan],
    ["04", copy.selfie],
    ["05", copy.x402],
    ["06", copy.audit],
  ] as const;

  return (
    <main className="min-h-screen bg-background px-5 py-6 sm:px-10 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col gap-16">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <Link href={`/${locale}`} className="text-sm font-semibold tracking-tight text-foreground">{t.landing.brand}</Link>
          <div className="flex items-center gap-5">
            <p className="text-gold text-[13px] font-semibold tracking-[0.16em] uppercase sm:text-sm">
              {t.landing.credit}
            </p>
            <LanguageSwitcher locale={locale} label={t.language.label} switchTo={t.language.switchTo} />
          </div>
        </header>
        <section className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:gap-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ok">{t.landing.eyebrow}</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-7xl lg:text-8xl">
              {t.landing.headlineTop}<br /><span className="text-muted">{t.landing.headlineBottom}</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-muted sm:text-lg">
              {t.landing.lead}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href={`/${locale}/dashboard`} className="inline-flex items-center gap-3 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85">
                {t.landing.openConsole} <span aria-hidden="true">-&gt;</span>
              </Link>
              <span className="text-sm text-muted">{t.landing.builtFor}</span>
            </div>
          </div>
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[2rem] border border-border bg-panel px-6 py-10 lg:min-h-[470px]">
            <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{t.landing.markLabel}</div>
            <Image src="/infinity-mark.svg" alt={t.landing.markAlt} width={720} height={420} priority className="h-auto w-full max-w-[560px]" />
            <div className="absolute bottom-6 right-6 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-brand">{t.landing.markNoteTop}<br />{t.landing.markNoteBottom}</div>
          </div>
        </section>
        <section aria-label={t.landing.flowLabel} className="border-t border-border pt-8 pb-2">
          <div className="relative hidden lg:block" aria-hidden="true">
            <svg viewBox="0 0 1200 42" className="absolute inset-x-0 top-3 h-8 w-full" preserveAspectRatio="none">
              <path d="M20 21H1180" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" />
              {[100, 300, 500, 700, 900, 1100].map((x) => <circle key={x} cx={x} cy="21" r="4" fill="var(--background)" stroke="var(--brand)" strokeWidth="2" />)}
            </svg>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map(([number, step], index) => (
              <div key={number} className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs text-brand">{number}</span>
                  {index < steps.length - 1 && <span className="hidden h-px flex-1 bg-border lg:hidden" />}
                </div>
                <h2 className="text-sm font-semibold text-foreground">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
