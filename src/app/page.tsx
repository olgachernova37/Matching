export default function Home() {
  const steps = [
    ["01", "Graph", "Read live wallet evidence"],
    ["02", "Risk", "Score the proposed action"],
    ["03", "Plan", "Hash the exact payload"],
    ["04", "Selfie Check", "A human approves"],
    ["05", "x402", "Gateway verifies receipt"],
    ["06", "Audit", "Show the result"],
  ];

  return (
    <main className="min-h-screen bg-background px-5 py-8 sm:px-10 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col justify-between gap-16">
        <header className="flex items-center justify-between border-b border-border pb-5">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-brand">HG / 01</span>
          <span className="font-mono text-xs text-muted">operator safety layer</span>
        </header>
        <section className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ok">Human-gated intelligence</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            An AI copilot that cannot spend without a human.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted">
            Live on-chain evidence drives the risk decision; every consequential action waits for a Selfie Check bound to its exact payload.
          </p>
          <a href="/dashboard" className="mt-9 inline-flex items-center gap-3 border border-brand bg-brand px-5 py-3 font-mono text-sm font-semibold text-background transition hover:bg-transparent hover:text-brand">
            Open Console <span aria-hidden="true">-&gt;</span>
          </a>
        </section>
        <section aria-label="Six-step action flow" className="border-t border-border pt-8">
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map(([number, title, detail], index) => (
              <div key={number} className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs text-brand">{number}</span>
                  {index < steps.length - 1 && <span className="hidden h-px flex-1 bg-border lg:block" />}
                </div>
                <h2 className="font-mono text-sm font-semibold text-foreground">{title}</h2>
                <p className="mt-2 text-sm leading-5 text-muted">{detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
