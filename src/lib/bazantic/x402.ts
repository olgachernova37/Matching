import { createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { wrapFetchWithPayment, type Signer } from "x402-fetch";

/** TODO(bazantic): confirm settlement network with the Bazantic account owner. */
const settlementChain = baseSepolia;

export function createPaidFetch(fetchImplementation: typeof globalThis.fetch = globalThis.fetch): typeof globalThis.fetch {
  const privateKey = process.env.X402_PRIVATE_KEY;
  if (!privateKey) throw new Error("Missing X402_PRIVATE_KEY: configure a burner wallet for paid Bazantic requests");
  if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) throw new Error("Invalid X402_PRIVATE_KEY: expected a 32-byte 0x-prefixed private key");
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  const walletClient = createWalletClient({ account, chain: settlementChain, transport: http() });
  // TODO(bazantic): migrate to @x402/fetch when Bazantic confirms v2 support.
  // x402-fetch v1's Signer declaration predates the current viem client types;
  // the runtime API is the documented wallet-client adapter.
  return wrapFetchWithPayment(fetchImplementation, walletClient as unknown as Signer) as typeof globalThis.fetch;
}