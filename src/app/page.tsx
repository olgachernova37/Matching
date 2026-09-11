/**
 * PLACEHOLDER — owned by T6 (see PLAN.md §5).
 * T1 ships this only so the scaffold builds. T6 replaces it wholesale with the
 * landing page: pitch, the 6-step flow diagram, and the "Open Console" CTA.
 */
export default function Home() {
  return (
    <main className="flex-1 grid place-items-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Human-Gated AI Copilot
        </h1>
        <p className="mt-3 text-sm text-muted">
          An on-chain copilot that cannot spend without a Selfie Check proof
          bound to the exact action it proposed.
        </p>
        <p className="mt-6 font-mono text-xs text-warn">
          Scaffold only — T6 owns this page.
        </p>
      </div>
    </main>
  );
}
