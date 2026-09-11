import { z } from "zod";

/**
 * Environment access — see PLAN.md T1.
 *
 * Split deliberately:
 *   - clientEnv  : NEXT_PUBLIC_* only, safe in browser bundles.
 *   - serverEnv(): secrets. Lazy, so importing this module from a client
 *                  component never throws on a missing server secret.
 *
 * Next inlines `process.env.NEXT_PUBLIC_X` only when written as a literal
 * member expression, so the client keys below must stay spelled out.
 */

const required = (name: string) =>
  z.string().min(1, `Missing required env var: ${name}`);

// ------------------------------------------------------------------ client

const clientSchema = z.object({
  NEXT_PUBLIC_WLD_APP_ID: required("NEXT_PUBLIC_WLD_APP_ID"),
  NEXT_PUBLIC_WLD_ACTION: required("NEXT_PUBLIC_WLD_ACTION"),
  NEXT_PUBLIC_WLD_ENV: z.enum(["sandbox", "production"]).default("sandbox"),
});

const clientParsed = clientSchema.safeParse({
  NEXT_PUBLIC_WLD_APP_ID: process.env.NEXT_PUBLIC_WLD_APP_ID,
  NEXT_PUBLIC_WLD_ACTION: process.env.NEXT_PUBLIC_WLD_ACTION,
  NEXT_PUBLIC_WLD_ENV: process.env.NEXT_PUBLIC_WLD_ENV,
});

if (!clientParsed.success) {
  // Warn rather than throw: T6 must stay able to develop the UI against mocks
  // before World ID credentials land (T0.1 is async).
  console.warn(
    "[env] client env incomplete — World ID widget will not work:\n" +
      clientParsed.error.issues.map((i) => `  - ${i.message}`).join("\n"),
  );
}

export const clientEnv = clientParsed.success
  ? clientParsed.data
  : {
      NEXT_PUBLIC_WLD_APP_ID: "",
      NEXT_PUBLIC_WLD_ACTION: "",
      NEXT_PUBLIC_WLD_ENV: "sandbox" as const,
    };

// ------------------------------------------------------------------ server

const serverSchema = z.object({
  WLD_RP_ID: required("WLD_RP_ID"),
  WLD_RP_PRIVATE_KEY: required("WLD_RP_PRIVATE_KEY"),
  WLD_API_KEY: required("WLD_API_KEY"),
  GRAPH_API_KEY: required("GRAPH_API_KEY"),
  BAZANTIC_API_KEY: required("BAZANTIC_API_KEY"),
  BAZANTIC_GATEWAY_URL: z.url("BAZANTIC_GATEWAY_URL must be a valid URL"),
  ANTHROPIC_API_KEY: required("ANTHROPIC_API_KEY"),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | null = null;

/**
 * Validates on first call and fails loudly, naming every missing variable at
 * once — never a silent `undefined` surfacing three layers deep at 3am.
 */
export function serverEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    const missing = parsed.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid server environment. Fix .env.local (see .env.example):\n${missing}`,
    );
  }

  cached = parsed.data;
  return cached;
}

// ------------------------------------------------------------------- mocks

/**
 * Offline dev switches. MUST be off by default and MUST make the UI show a
 * visible "MOCK DATA" badge — The Graph prize disqualifies mocked data, so a
 * mock path that ships unnoticed costs us the track (PLAN.md T2).
 */
export const mocks = {
  graph: process.env.MOCK_GRAPH === "1",
  worldid: process.env.MOCK_WORLDID === "1",
  bazantic: process.env.MOCK_BAZANTIC === "1",
};

export const anyMockEnabled = Object.values(mocks).some(Boolean);
