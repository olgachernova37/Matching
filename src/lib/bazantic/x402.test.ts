import assert from "node:assert/strict";
import test from "node:test";
import { createPaidFetch } from "./x402.ts";

test("x402 wrapper fails loudly when no burner key is configured", () => {
  const original = process.env.X402_PRIVATE_KEY;
  delete process.env.X402_PRIVATE_KEY;
  assert.throws(() => createPaidFetch(), /Missing X402_PRIVATE_KEY/);
  if (original) process.env.X402_PRIVATE_KEY = original;
});

test("x402 wrapper passes successful responses through", async () => {
  const original = process.env.X402_PRIVATE_KEY;
  process.env.X402_PRIVATE_KEY = `0x${"11".repeat(32)}`;
  const fakeFetch: typeof globalThis.fetch = async () => new Response("ok", { status: 200 });
  const response = await createPaidFetch(fakeFetch)("https://example.test/paid");
  assert.equal(response.status, 200);
  if (original) process.env.X402_PRIVATE_KEY = original; else delete process.env.X402_PRIVATE_KEY;
});