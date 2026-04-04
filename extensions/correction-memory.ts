import type { ExtensionAPI, ExtensionContext } from "@mariozechner/pi-coding-agent";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

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
const WIDGET_KEY = "correction-memory";
const MAX_PROMPT_RULES = 5;

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

function getRelevantRules(store: MemoryStore, cwd: string): MemoryRule[] {
	const repoPath = normalizePath(cwd);
	return store.rules.filter((rule) => {
		if (rule.scope === "global") return true;
		if (rule.scope === "repo" && rule.repoPath) {
			return normalizePath(rule.repoPath) === repoPath;
		}
		return false;
	});
}

function renderWidgetLines(rules: MemoryRule[]): string[] {
	if (rules.length === 0) {
		return ["memory: no active rules"];
	}

	return [
		`memory: ${rules.length} active rule${rules.length === 1 ? "" : "s"}`,
		...rules.slice(0, 3).map((rule, index) => `${index + 1}. ${rule.text}`),
		...(rules.length > 3 ? [`+ ${rules.length - 3} more`] : []),
	];
}

function refreshWidget(ctx: ExtensionContext, store: MemoryStore) {
	ctx.ui.setWidget(WIDGET_KEY, renderWidgetLines(getRelevantRules(store, ctx.cwd)));
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

export default function (pi: ExtensionAPI) {
	let store = loadStore();

	pi.on("session_start", async (_event, ctx) => {
		store = loadStore();
		refreshWidget(ctx, store);
	});

	pi.on("session_tree", async (_event, ctx) => {
		store = loadStore();
		refreshWidget(ctx, store);
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
		description: "Store a repo-scoped workflow rule (usage: /remember <rule>)",
		handler: async (args, ctx) => {
			const text = args.trim();
			if (!text) {
				ctx.ui.notify("Usage: /remember <rule>", "warning");
				return;
			}

			store = loadStore();
			store.rules.push({
				id: makeId(),
				scope: "repo",
				text,
				repoPath: normalizePath(ctx.cwd),
				createdAt: new Date().toISOString(),
			});
			saveStore(store);
			refreshWidget(ctx, store);
			ctx.ui.notify(`Remembered repo rule: ${text}`, "success");
		},
	});

	pi.registerCommand("remember-global", {
		description: "Store a global workflow rule (usage: /remember-global <rule>)",
		handler: async (args, ctx) => {
			const text = args.trim();
			if (!text) {
				ctx.ui.notify("Usage: /remember-global <rule>", "warning");
				return;
			}

			store = loadStore();
			store.rules.push({
				id: makeId(),
				scope: "global",
				text,
				createdAt: new Date().toISOString(),
			});
			saveStore(store);
			refreshWidget(ctx, store);
			ctx.ui.notify(`Remembered global rule: ${text}`, "success");
		},
	});

	pi.registerCommand("memories", {
		description: "List stored workflow rules",
		handler: async (_args, ctx) => {
			store = loadStore();
			const relevant = getRelevantRules(store, ctx.cwd);
			const globalRules = store.rules.filter((rule) => rule.scope === "global");
			const repoRules = store.rules.filter(
				(rule) => rule.scope === "repo" && rule.repoPath && normalizePath(rule.repoPath) === normalizePath(ctx.cwd),
			);
			const otherRepoCount = store.rules.filter(
				(rule) => rule.scope === "repo" && rule.repoPath && normalizePath(rule.repoPath) !== normalizePath(ctx.cwd),
			).length;

			const content = [
				"# Correction memory",
				"",
				"## Active in this repo",
				formatRules(relevant),
				"",
				"## Global rules",
				formatRules(globalRules),
				"",
				"## Repo rules for this cwd",
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
			refreshWidget(ctx, store);
			ctx.ui.notify(`Forgot rule: ${id}`, "success");
		},
	});
}
