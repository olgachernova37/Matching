import { randomUUID } from "node:crypto";
import { computeRequiresHuman, type AgentAction, type ChatMessage } from "@/lib/types";
import { bazanticDeps, graphDeps } from "./deps";
import { savePendingAction } from "./store";

export const toolDefinitions = [
  { name: "search_subgraphs", description: "Find live Graph deployments by keyword.", input_schema: { type: "object", properties: { keyword: { type: "string" } }, required: ["keyword"] } },
  { name: "query_subgraph", description: "Run a read-only GraphQL query against a deployment.", input_schema: { type: "object", properties: { deploymentId: { type: "string" }, query: { type: "string" }, vars: { type: "object" } }, required: ["deploymentId", "query"] } },
  { name: "get_wallet_activity", description: "Read live wallet activity from The Graph.", input_schema: { type: "object", properties: { address: { type: "string" } }, required: ["address"] } },
  { name: "assess_risk", description: "Score wallet activity with the risk engine.", input_schema: { type: "object", properties: { activity: { type: "object" } }, required: ["activity"] } },
  { name: "list_recipes", description: "List available Bazantic recipes without running one.", input_schema: { type: "object", properties: {} } },
  { name: "propose_action", description: "Prepare an action for human approval. This never executes anything.", input_schema: { type: "object", properties: { kind: { type: "string", enum: ["read_only", "paid_call", "recipe_run"] }, summary: { type: "string" }, payload: { type: "object" }, riskScore: { type: "number" }, riskReasons: { type: "array", items: { type: "string" } }, costUsd: { type: "number" } }, required: ["kind", "summary", "payload", "riskScore", "riskReasons", "costUsd"] } },
] as const;

type ToolInput = Record<string, unknown>;

export async function runTool(name: string, input: ToolInput, _messages: ChatMessage[]): Promise<unknown> {
  const graph = await graphDeps();
  switch (name) {
    case "search_subgraphs": return graph.searchSubgraphs(String(input.keyword));
    case "query_subgraph": return graph.runGraphQL(String(input.deploymentId), String(input.query), input.vars as object | undefined);
    case "get_wallet_activity": return graph.getWalletActivity(String(input.address));
    case "assess_risk": return graph.assessRisk(input.activity as never);
    case "list_recipes": return (await bazanticDeps()).listRecipes();
    case "propose_action": {
      const riskScore = Number(input.riskScore);
      const costUsd = Number(input.costUsd);
      const action: AgentAction = { id: randomUUID(), kind: input.kind as AgentAction["kind"], summary: String(input.summary), payload: input.payload as Record<string, unknown>, riskScore, riskReasons: (input.riskReasons as string[]).map(String), costUsd, requiresHuman: computeRequiresHuman(riskScore, costUsd), createdAt: Date.now() };
      savePendingAction(action);
      return action;
    }
    default: throw new Error(`Unknown agent tool: ${name}`);
  }
}