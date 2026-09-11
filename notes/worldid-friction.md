# World ID / Selfie Check friction log

Append as it happens (T3 owns this). T7 turns it into the graded FEEDBACK.md.
Format per entry: what I tried -> what I expected -> what happened -> exact error text.

## Sandbox state: Hot

## Sandbox state: Cold

## Sandbox state: Semi-cold

## Docs / Developer Portal

- Tried `node --test src/lib/worldid/*.test.ts` with Next path aliases -> expected the built-in runner to resolve the same imports as Next -> Node does not understand `@/lib` aliases and fails before running those tests -> exact error: `Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@/lib' imported from /workspaces/matching-t3/src/lib/worldid/continuity.ts`.
- Tried to use the IDKit proof result as a top-level signal/nullifier -> expected the response shape to mirror the request -> the installed SDK declarations put both values inside `responses[]` as `signal_hash` and `nullifier`; the Selfie Check preset is documented as preview-only and says to contact World for enablement -> exact SDK note: `Preview: Selfie Check is currently in preview. Contact us if you need it enabled.`
