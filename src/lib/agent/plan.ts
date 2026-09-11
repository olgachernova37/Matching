import Anthropic from "@anthropic-ai/sdk";
import { serverEnv } from "@/lib/env";
import type { ChatMessage } from "@/lib/types";
import { runTool, toolDefinitions } from "./tools";

const systemPrompt = `You are a cautious on-chain operations copilot.

Use The Graph tools to inspect live evidence before making risk claims. Every risk claim must cite the concrete number and the exact source.subgraphId. Never call a wallet safe or risky without evidence.

You may propose actions, but you must never claim to have executed, sent, settled, or completed an action until a separate human approval receipt exists and the execution endpoint confirms success. Say "proposed" or "awaiting human approval" when appropriate. The propose_action tool only prepares a payload; it never executes it.

Selfie Check raises the cost of automated and repeated abuse. Do not claim it is sybil-proof or guarantees one person per account.`;

type TextBlock = { type: "text"; text: string };
type ToolUseBlock = { type: "tool_use"; id: string; name: string; input: unknown };

function textFrom(content: Array<TextBlock | ToolUseBlock>): string {
  return content.filter((block): block is TextBlock => block.type === "text").map((block) => block.text).join("\n");
}

export async function plan(messages: ChatMessage[]): Promise<{ reply: string; action?: ChatMessage["action"] }> {
  const environment = serverEnv();
  const client = new Anthropic({ apiKey: environment.ANTHROPIC_API_KEY });
  let current: Anthropic.MessageParam[] = messages.map((message) => ({ role: message.role === "user" ? "user" : "assistant", content: message.content }));

  for (let turn = 0; turn < 8; turn += 1) {
    const response = await client.messages.create({ model: "claude-opus-5", max_tokens: 1200, system: systemPrompt, tools: toolDefinitions as unknown as Anthropic.Tool[], messages: current });
    const blocks = response.content as Array<TextBlock | ToolUseBlock>;
    if (response.stop_reason !== "tool_use") return { reply: textFrom(blocks) || "I could not produce a response." };

    current = [...current, { role: "assistant", content: response.content }];
    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const block of blocks) {
      if (block.type !== "tool_use") continue;
      try {
        const result = await runTool(block.name, (block.input ?? {}) as Record<string, unknown>, messages);
        results.push({ type: "tool_result", tool_use_id: block.id, content: JSON.stringify(result) });
      } catch (error) {
        const detail = error instanceof Error ? error.message : "Unknown tool error";
        results.push({ type: "tool_result", tool_use_id: block.id, is_error: true, content: detail });
      }
    }
    current = [...current, { role: "user", content: results }];
  }

  throw new Error("Agent tool loop exceeded its maximum of 8 turns");
}