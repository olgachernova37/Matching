import type {
  AgentAction,
  HumanGateReceipt,
  RecipeRef,
  RecipeRun,
  RiskAssessment,
  SubgraphRef,
  WalletActivity,
} from "@/lib/types";
import path from "node:path";
import { pathToFileURL } from "node:url";

type GraphDeps = {
  searchSubgraphs(keyword: string): Promise<SubgraphRef[]>;
  runGraphQL<T>(deploymentId: string, query: string, vars?: object): Promise<T>;
  getWalletActivity(address: string): Promise<WalletActivity>;
  assessRisk(activity: WalletActivity): RiskAssessment;
};
type WorldDeps = { assertValidReceipt(receipt: HumanGateReceipt, action: AgentAction): void };
type BazanticDeps = { listRecipes(): Promise<RecipeRef[]>; runRecipe(recipeId: string, input: object, receipt: HumanGateReceipt): Promise<RecipeRun> };

const unavailable = (moduleName: string): Error => new Error(`Dependency unavailable: ${moduleName} has not been merged`);

const stubGraph: GraphDeps = {
  async searchSubgraphs() { console.warn("[agent] STUB GRAPH: search_subgraphs unavailable; no live data used"); throw unavailable("@/lib/graph"); },
  async runGraphQL() { console.warn("[agent] STUB GRAPH: query_subgraph unavailable; no live data used"); throw unavailable("@/lib/graph"); },
  async getWalletActivity() { console.warn("[agent] STUB GRAPH: get_wallet_activity unavailable; no live data used"); throw unavailable("@/lib/graph"); },
  assessRisk() { console.warn("[agent] STUB GRAPH: assess_risk unavailable; no live data used"); throw unavailable("@/lib/graph"); },
};

const stubWorld: WorldDeps = {
  assertValidReceipt() { console.error("[agent] STUB WORLD ID: receipt validation unavailable; execution blocked"); throw unavailable("@/lib/worldid"); },
};

const stubBazantic: BazanticDeps = {
  async listRecipes() { console.warn("[agent] STUB BAZANTIC: list_recipes unavailable"); throw unavailable("@/lib/bazantic"); },
  async runRecipe() { console.error("[agent] STUB BAZANTIC: execution unavailable; no paid call made"); throw unavailable("@/lib/bazantic"); },
};

let graphPromise: Promise<GraphDeps> | undefined;
let worldPromise: Promise<WorldDeps> | undefined;
let bazanticPromise: Promise<BazanticDeps> | undefined;

type RuntimeImport = (moduleName: string) => Promise<unknown>;

// Keep optional sibling worktrees out of Turbopack's static module graph. The
// alias works in Next's server runtime; the file URL also supports direct Node
// execution and source checkouts before those modules are bundled.
const runtimeImport = new Function("moduleName", "return import(moduleName)") as RuntimeImport;

async function importOptional<T>(moduleName: string): Promise<T> {
  try {
    return await runtimeImport(moduleName) as T;
  } catch (aliasError) {
    try {
      const filePath = path.join(process.cwd(), "src", "lib", moduleName.split("/").pop() ?? "", "index.ts");
      return await runtimeImport(pathToFileURL(filePath).href) as T;
    } catch {
      throw aliasError;
    }
  }
}

export function graphDeps(): Promise<GraphDeps> {
  graphPromise ??= importOptional<GraphDeps>("@/lib/graph").catch(() => stubGraph as GraphDeps);
  return graphPromise;
}

export function worldDeps(): Promise<WorldDeps> {
  worldPromise ??= importOptional<WorldDeps>("@/lib/worldid").catch(() => stubWorld as WorldDeps);
  return worldPromise;
}

export function bazanticDeps(): Promise<BazanticDeps> {
  bazanticPromise ??= importOptional<BazanticDeps>("@/lib/bazantic").catch(() => stubBazantic as BazanticDeps);
  return bazanticPromise;
}