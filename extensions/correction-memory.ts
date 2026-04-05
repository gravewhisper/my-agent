import { complete } from "@mariozechner/pi-ai";
import type { ExtensionAPI, ExtensionCommandContext } from "@mariozechner/pi-coding-agent";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type MemoryRule = {
	id: string;
	scope: "global" | "repo";
	text: string;
	repoPath?: string;
	createdAt: string;
};

type MemoryStore = {
	rules: MemoryRule[];
};

const STORE_PATH = path.join(os.homedir(), ".pi", "agent", "correction-memory.json");
const MAX_PROMPT_RULES = 5;
const RULE_REFINER_SYSTEM_PROMPT = [
	"You rewrite workflow rules for a coding agent.",
	"Return exactly one concise rule sentence and nothing else.",
	"Prefer imperative, durable wording.",
	"Keep it short, specific, and broadly reusable.",
	"Do not include bullets, numbering, commentary, or quotes.",
	"Examples:",
	"use python3",
	"use ripgrep or find before reading many files",
	"when the user says pi, interpret it as Pi coding agent unless they say otherwise",
].join("\n");

function ensureStoreDir() {
	fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
}

function loadStore(): MemoryStore {
	try {
		if (!fs.existsSync(STORE_PATH)) {
			return { rules: [] };
		}
		const raw = fs.readFileSync(STORE_PATH, "utf8");
		const parsed = JSON.parse(raw) as Partial<MemoryStore>;
		return { rules: Array.isArray(parsed.rules) ? parsed.rules : [] };
	} catch {
		return { rules: [] };
	}
}

function saveStore(store: MemoryStore) {
	ensureStoreDir();
	fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2) + "\n", "utf8");
}

function makeId(): string {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizePath(input: string): string {
	return path.resolve(input);
}

function normalizeRuleText(text: string): string {
	return text.replace(/\s+/g, " ").trim();
}

function samePath(a?: string, b?: string): boolean {
	if (!a || !b) return false;
	return normalizePath(a) === normalizePath(b);
}

function findRepoRoot(start: string): string {
	let current = normalizePath(start);
	while (true) {
		if (fs.existsSync(path.join(current, ".git"))) {
			return current;
		}
		const parent = path.dirname(current);
		if (parent === current) {
			return normalizePath(start);
		}
		current = parent;
	}
}

function getContextRepoPath(cwd: string): string {
	return findRepoRoot(cwd);
}

function getRelevantRules(store: MemoryStore, cwd: string): MemoryRule[] {
	const repoPath = getContextRepoPath(cwd);
	return store.rules.filter((rule) => {
		if (rule.scope === "global") return true;
		if (rule.scope === "repo" && rule.repoPath) {
			return samePath(rule.repoPath, repoPath);
		}
		return false;
	});
}

function formatRules(rules: MemoryRule[]): string {
	if (rules.length === 0) return "No stored rules.";
	return rules
		.map((rule, index) => {
			const scope = rule.scope === "global" ? "global" : `repo:${rule.repoPath}`;
			return `${index + 1}. [${rule.id}] (${scope}) ${rule.text}`;
		})
		.join("\n");
}

function findDuplicateRule(
	store: MemoryStore,
	scope: MemoryRule["scope"],
	text: string,
	repoPath?: string,
): MemoryRule | undefined {
	const normalizedText = normalizeRuleText(text).toLowerCase();
	return store.rules.find((rule) => {
		if (rule.scope !== scope) return false;
		if (normalizeRuleText(rule.text).toLowerCase() !== normalizedText) return false;
		if (scope === "global") return true;
		return samePath(rule.repoPath, repoPath);
	});
}

async function refineRuleText(rawText: string, ctx: ExtensionCommandContext): Promise<string> {
	const cleaned = normalizeRuleText(rawText);
	if (!cleaned) return cleaned;
	if (!ctx.model) return cleaned;

	const auth = await ctx.modelRegistry.getApiKeyAndHeaders(ctx.model);
	if (!auth.ok || !auth.apiKey) {
		return cleaned;
	}

	const response = await complete(
		ctx.model,
		{
			systemPrompt: RULE_REFINER_SYSTEM_PROMPT,
			messages: [
				{
					role: "user",
					content: [{ type: "text", text: cleaned }],
					timestamp: Date.now(),
				},
			],
		},
		{ apiKey: auth.apiKey, headers: auth.headers },
	);

	const refined = response.content
		.filter((c): c is { type: "text"; text: string } => c.type === "text")
		.map((c) => c.text)
		.join("\n")
		.trim();

	return normalizeRuleText(refined || cleaned);
}

async function prepareRuleText(rawArgs: string, ctx: ExtensionCommandContext, scope: "global" | "repo"): Promise<string | undefined> {
	const rawText = normalizeRuleText(rawArgs);
	if (!rawText) {
		ctx.ui.notify(`Usage: /remember${scope === "global" ? "-global" : ""} <rule>`, "warning");
		return undefined;
	}

	let refined = rawText;
	try {
		refined = await refineRuleText(rawText, ctx);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		ctx.ui.notify(`Rule refinement failed, using original text: ${message}`, "warning");
	}

	if (!ctx.hasUI) {
		return refined;
	}

	const seed = [
		"# Review memory rule",
		"",
		"Edit the rule before saving. Keep it short, durable, and directive.",
		"",
		`Original: ${rawText}`,
		`Suggested: ${refined}`,
		"",
		refined,
	].join("\n");

	const edited = await ctx.ui.editor("Refine memory rule", seed);
	if (edited === undefined) {
		ctx.ui.notify("Cancelled", "info");
		return undefined;
	}

	const lines = edited
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0 && !line.startsWith("# ") && !line.startsWith("Original:") && !line.startsWith("Suggested:"));
	const finalText = normalizeRuleText(lines[lines.length - 1] ?? refined);
	if (!finalText) {
		ctx.ui.notify("Rule cannot be empty", "warning");
		return undefined;
	}
	return finalText;
}

function addRule(store: MemoryStore, rule: Omit<MemoryRule, "id" | "createdAt">): { added: boolean; existing?: MemoryRule; saved: MemoryRule } {
	const existing = findDuplicateRule(store, rule.scope, rule.text, rule.repoPath);
	if (existing) {
		return { added: false, existing, saved: existing };
	}

	const saved: MemoryRule = {
		id: makeId(),
		scope: rule.scope,
		text: normalizeRuleText(rule.text),
		repoPath: rule.repoPath,
		createdAt: new Date().toISOString(),
	};
	store.rules.push(saved);
	return { added: true, saved };
}

export default function (pi: ExtensionAPI) {
	let store = loadStore();

	pi.on("session_start", async () => {
		store = loadStore();
	});

	pi.on("session_tree", async () => {
		store = loadStore();
	});

	pi.on("before_agent_start", async (event, ctx) => {
		store = loadStore();
		const rules = getRelevantRules(store, ctx.cwd).slice(0, MAX_PROMPT_RULES);
		if (rules.length === 0) return undefined;

		const ruleLines = rules.map((rule) => `- ${rule.text}`).join("\n");
		return {
			systemPrompt:
				event.systemPrompt +
				`\n\n## Remembered workflow rules\nThese are durable corrections and conventions for this environment. Follow them unless the user explicitly overrides them.\n\n${ruleLines}\n`,
		};
	});

	pi.registerCommand("remember", {
		description: "Store a repo-scoped workflow rule after refining its wording (usage: /remember <rule>)",
		handler: async (args, ctx) => {
			const text = await prepareRuleText(args, ctx, "repo");
			if (!text) return;

			store = loadStore();
			const repoPath = getContextRepoPath(ctx.cwd);
			const result = addRule(store, {
				scope: "repo",
				text,
				repoPath,
			});
			if (!result.added) {
				ctx.ui.notify(`Matching repo rule already exists: ${result.saved.text}`, "info");
				return;
			}
			saveStore(store);
			ctx.ui.notify(`Remembered repo rule: ${result.saved.text}`, "success");
		},
	});

	pi.registerCommand("remember-global", {
		description: "Store a global workflow rule after refining its wording (usage: /remember-global <rule>)",
		handler: async (args, ctx) => {
			const text = await prepareRuleText(args, ctx, "global");
			if (!text) return;

			store = loadStore();
			const result = addRule(store, {
				scope: "global",
				text,
			});
			if (!result.added) {
				ctx.ui.notify(`Matching global rule already exists: ${result.saved.text}`, "info");
				return;
			}
			saveStore(store);
			ctx.ui.notify(`Remembered global rule: ${result.saved.text}`, "success");
		},
	});

	pi.registerCommand("memories", {
		description: "List stored workflow rules",
		handler: async (_args, ctx) => {
			store = loadStore();
			const currentRepoPath = getContextRepoPath(ctx.cwd);
			const relevant = getRelevantRules(store, ctx.cwd);
			const globalRules = store.rules.filter((rule) => rule.scope === "global");
			const repoRules = store.rules.filter(
				(rule) => rule.scope === "repo" && rule.repoPath && samePath(rule.repoPath, currentRepoPath),
			);
			const otherRepoCount = store.rules.filter(
				(rule) => rule.scope === "repo" && rule.repoPath && !samePath(rule.repoPath, currentRepoPath),
			).length;

			const content = [
				"# Correction memory",
				"",
				`Current repo scope: ${currentRepoPath}`,
				"",
				"## Active in this repo",
				formatRules(relevant),
				"",
				"## Global rules",
				formatRules(globalRules),
				"",
				"## Repo rules for this repo",
				formatRules(repoRules),
				"",
				`Other repo-scoped rules stored: ${otherRepoCount}`,
			].join("\n");

			await ctx.ui.editor("Correction memory", content);
		},
	});

	pi.registerCommand("forget", {
		description: "Remove a stored workflow rule by id (usage: /forget <id>)",
		handler: async (args, ctx) => {
			const id = args.trim();
			if (!id) {
				ctx.ui.notify("Usage: /forget <id>", "warning");
				return;
			}

			store = loadStore();
			const before = store.rules.length;
			store.rules = store.rules.filter((rule) => rule.id !== id);
			if (store.rules.length === before) {
				ctx.ui.notify(`No memory rule found for id: ${id}`, "warning");
				return;
			}

			saveStore(store);
			ctx.ui.notify(`Forgot rule: ${id}`, "success");
		},
	});

}
