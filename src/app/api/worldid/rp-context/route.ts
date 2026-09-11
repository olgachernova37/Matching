import { randomUUID } from "node:crypto";
import { privateKeyToAccount } from "viem/accounts";
import { serverEnv } from "@/lib/env";
import type { RpContext } from "@/lib/types";

export async function GET(): Promise<Response> {
  const environment = serverEnv();
  const createdAt = Math.floor(Date.now() / 1000);
  const context: Omit<RpContext, "signature"> = {
    rp_id: environment.WLD_RP_ID,
    nonce: randomUUID(),
    created_at: createdAt,
    expires_at: createdAt + 300,
  };
  const account = privateKeyToAccount(environment.WLD_RP_PRIVATE_KEY as `0x${string}`);
  const signature = await account.signMessage({ message: JSON.stringify(context) });
  return Response.json({ ...context, signature } satisfies RpContext);
}