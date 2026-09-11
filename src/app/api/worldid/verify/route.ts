import { serverEnv } from "@/lib/env";
import { RECEIPT_TTL_MS, type HumanGateReceipt } from "@/lib/types";
import { getPendingAction } from "@/lib/worldid/pending";
import { recordApproval } from "@/lib/worldid/continuity";
import { hashAction } from "@/lib/worldid/hash";
import { storeReceipt } from "@/lib/worldid/receipts";

type VerifyBody = { rp_id: string; idkitResponse: unknown; actionId: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request): Promise<Response> {
  let body: VerifyBody;
  try {
    const candidate: unknown = await request.json();
    if (!isRecord(candidate) || typeof candidate.rp_id !== "string" || typeof candidate.actionId !== "string" || !("idkitResponse" in candidate)) {
      return Response.json({ error: "Invalid verification request" }, { status: 400 });
    }
    body = { rp_id: candidate.rp_id, actionId: candidate.actionId, idkitResponse: candidate.idkitResponse };
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const action = getPendingAction(body.actionId);
  if (!action) return Response.json({ error: "Pending action not found" }, { status: 404 });

  const expectedHash = hashAction(action.payload);
  if (!isRecord(body.idkitResponse) || !Array.isArray(body.idkitResponse.responses) || body.idkitResponse.responses.length === 0) {
    return Response.json({ error: "IDKit response has no credential response" }, { status: 400 });
  }
  const responseItem = body.idkitResponse.responses[0];
  if (!isRecord(responseItem) || responseItem.signal_hash !== expectedHash) {
    return Response.json({ error: "World ID signal does not match pending action" }, { status: 400 });
  }

  try {
    const environment = serverEnv();
    const verification = await fetch(`https://developer.world.org/api/v4/verify/${encodeURIComponent(body.rp_id)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${environment.WLD_API_KEY}` },
      body: JSON.stringify(body.idkitResponse),
    });
    if (!verification.ok) {
      const detail = await verification.text();
      return Response.json({ error: `World ID verification failed: ${detail}` }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown verification error";
    return Response.json({ error: `World ID verification unavailable: ${message}` }, { status: 502 });
  }

  if (typeof responseItem.nullifier !== "string" || responseItem.nullifier.length === 0) {
    return Response.json({ error: "World ID response has no nullifier" }, { status: 400 });
  }
  const now = Date.now();
  const receipt: HumanGateReceipt = {
    actionId: action.id,
    actionHash: expectedHash,
    nullifierHash: responseItem.nullifier,
    credentialType: responseItem.identifier === "selfie" ? "selfie_check" : "device",
    verifiedAt: now,
    expiresAt: now + RECEIPT_TTL_MS,
    continuity: recordApproval(responseItem.nullifier),
  };
  storeReceipt(receipt);
  return Response.json(receipt);
}