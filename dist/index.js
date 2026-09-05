import { randomUUID } from "node:crypto";
import { lstat, mkdir, mkdtemp, open, readFile, readdir, realpath, rename, rm, stat, symlink, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, dirname, extname, isAbsolute, join, posix, relative, resolve, sep } from "node:path";
import { gunzipSync } from "node:zlib";
import Schema from "@deepseek-ai/schemastery";
import { createUserMessage } from "@deepseek-ai/dsh-llm";
import { SessionId } from "@deepseek-ai/dsh-session";
import { TerminalSessionId } from "@deepseek-ai/dsh-terminal";
import { load } from "js-yaml";
import { Remote, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";
import { WorkspaceId } from "@deepseek-ai/dsh-workspace";
//#region lib/types/index.js
/** Read-only WorkBuddy Skill metadata catalog and Remote namespace. */
var __runInitializers = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};
const DEFAULT_RELATIVE_ROOT = ".workbuddy/plugins/cache/workbuddy-builtin";
/**
* Skill roots scanned when the composition names none. Every entry is a
* read-only metadata scan of a directory the user already owns: nothing is
* downloaded, executed, or mounted into the runtime.
*/
const DEFAULT_ROOTS = [
	{
		id: "workbuddy",
		label: "WorkBuddy",
		path: `~/${DEFAULT_RELATIVE_ROOT}`,
		layout: "plugin-version"
	},
	{
		id: "workbuddy-user",
		label: "WorkBuddy",
		path: "~/.workbuddy/skills",
		layout: "flat"
	},
	{
		id: "claude",
		label: "Claude",
		path: "~/.claude/skills",
		layout: "flat"
	},
	{
		id: "claude-plugin",
		label: "Claude 插件",
		path: "~/.claude/plugins/marketplaces",
		layout: "flat"
	},
	{
		id: "codex",
		label: "Codex",
		path: "~/.codex/skills",
		layout: "flat"
	},
	{
		id: "hermes",
		label: "Hermes",
		path: "~/.hermes/skills",
		layout: "flat"
	},
	{
		id: "doubao",
		label: "豆包",
		path: "~/DoubaoWork/skills",
		layout: "flat"
	},
	{
		id: "trae",
		label: "Trae",
		path: "~/.trae/builtin/global/skills",
		layout: "flat"
	},
	{
		id: "openclaw",
		label: "OpenClaw",
		path: "~/.openclaw/skills",
		layout: "flat"
	},
	{
		id: "agents",
		label: ".agents",
		path: "~/.agents/skills",
		layout: "flat"
	}
];
/** A directory whose name is a release, so it is a version rather than a Skill. */
const VERSION_DIRECTORY = /^v?\d+(?:\.\d+)*(?:[-+][0-9A-Za-z.-]+)?$/u;
const MAX_METADATA_BYTES = 64 * 1024;
const MAX_CONTACTS = 2e3;
const MAX_DEPTH = 6;
const MAX_INSTALL_FILES = 160;
const MAX_INSTALL_BYTES = 12 * 1024 * 1024;
const MAX_ARCHIVE_BYTES = 24 * 1024 * 1024;
const MAX_PREVIEW_BYTES = 512 * 1024;
const GITHUB_SOURCE = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u;
const SKILL_NAME = /^[A-Za-z0-9][A-Za-z0-9_-]{0,95}$/u;
const Config = Schema.object({
	root: Schema.string(),
	roots: Schema.array(Schema.any()),
	skillsShOrigin: Schema.string().default("https://skills.sh"),
	stateFile: Schema.string()
});
/** Host service exposing installed WorkBuddy Skill metadata without Skill bodies. */
let WorkBuddySkillCatalog = (() => {
	let _classSuper = TypertRemoteService;
	let _instanceExtraInitializers = [];
	let _list_decorators;
	let _searchExternal_decorators;
	let _installExternal_decorators;
	let _linkSkill_decorators;
	let _unlinkSkill_decorators;
	let _browseProject_decorators;
	let _readProjectFile_decorators;
	let _openSkillChatTerminal_decorators;
	let _sendSkillChatTerminal_decorators;
	let _closeSkillChatTerminal_decorators;
	let _startSkillChatSidecar_decorators;
	let _sendSkillChatSidecar_decorators;
	let _closeSkillChatSidecar_decorators;
	let _getSkillChatState_decorators;
	let _putSkillChatState_decorators;
	let _runSkillChatAutomation_decorators;
	return class WorkBuddySkillCatalog extends _classSuper {
		static {
			const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
			_list_decorators = [Remote];
			_searchExternal_decorators = [Remote];
			_installExternal_decorators = [Remote];
			_linkSkill_decorators = [Remote];
			_unlinkSkill_decorators = [Remote];
			_browseProject_decorators = [Remote];
			_readProjectFile_decorators = [Remote];
			_openSkillChatTerminal_decorators = [Remote];
			_sendSkillChatTerminal_decorators = [Remote];
			_closeSkillChatTerminal_decorators = [Remote];
			_startSkillChatSidecar_decorators = [Remote];
			_sendSkillChatSidecar_decorators = [Remote];
			_closeSkillChatSidecar_decorators = [Remote];
			_getSkillChatState_decorators = [Remote];
			_putSkillChatState_decorators = [Remote];
			_runSkillChatAutomation_decorators = [Remote];
			__esDecorate(this, null, _list_decorators, {
				kind: "method",
				name: "list",
				static: false,
				private: false,
				access: {
					has: (obj) => "list" in obj,
					get: (obj) => obj.list
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _searchExternal_decorators, {
				kind: "method",
				name: "searchExternal",
				static: false,
				private: false,
				access: {
					has: (obj) => "searchExternal" in obj,
					get: (obj) => obj.searchExternal
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _installExternal_decorators, {
				kind: "method",
				name: "installExternal",
				static: false,
				private: false,
				access: {
					has: (obj) => "installExternal" in obj,
					get: (obj) => obj.installExternal
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _linkSkill_decorators, {
				kind: "method",
				name: "linkSkill",
				static: false,
				private: false,
				access: {
					has: (obj) => "linkSkill" in obj,
					get: (obj) => obj.linkSkill
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _unlinkSkill_decorators, {
				kind: "method",
				name: "unlinkSkill",
				static: false,
				private: false,
				access: {
					has: (obj) => "unlinkSkill" in obj,
					get: (obj) => obj.unlinkSkill
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _browseProject_decorators, {
				kind: "method",
				name: "browseProject",
				static: false,
				private: false,
				access: {
					has: (obj) => "browseProject" in obj,
					get: (obj) => obj.browseProject
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _readProjectFile_decorators, {
				kind: "method",
				name: "readProjectFile",
				static: false,
				private: false,
				access: {
					has: (obj) => "readProjectFile" in obj,
					get: (obj) => obj.readProjectFile
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _openSkillChatTerminal_decorators, {
				kind: "method",
				name: "openSkillChatTerminal",
				static: false,
				private: false,
				access: {
					has: (obj) => "openSkillChatTerminal" in obj,
					get: (obj) => obj.openSkillChatTerminal
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _sendSkillChatTerminal_decorators, {
				kind: "method",
				name: "sendSkillChatTerminal",
				static: false,
				private: false,
				access: {
					has: (obj) => "sendSkillChatTerminal" in obj,
					get: (obj) => obj.sendSkillChatTerminal
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _closeSkillChatTerminal_decorators, {
				kind: "method",
				name: "closeSkillChatTerminal",
				static: false,
				private: false,
				access: {
					has: (obj) => "closeSkillChatTerminal" in obj,
					get: (obj) => obj.closeSkillChatTerminal
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _startSkillChatSidecar_decorators, {
				kind: "method",
				name: "startSkillChatSidecar",
				static: false,
				private: false,
				access: {
					has: (obj) => "startSkillChatSidecar" in obj,
					get: (obj) => obj.startSkillChatSidecar
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _sendSkillChatSidecar_decorators, {
				kind: "method",
				name: "sendSkillChatSidecar",
				static: false,
				private: false,
				access: {
					has: (obj) => "sendSkillChatSidecar" in obj,
					get: (obj) => obj.sendSkillChatSidecar
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _closeSkillChatSidecar_decorators, {
				kind: "method",
				name: "closeSkillChatSidecar",
				static: false,
				private: false,
				access: {
					has: (obj) => "closeSkillChatSidecar" in obj,
					get: (obj) => obj.closeSkillChatSidecar
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _getSkillChatState_decorators, {
				kind: "method",
				name: "getSkillChatState",
				static: false,
				private: false,
				access: {
					has: (obj) => "getSkillChatState" in obj,
					get: (obj) => obj.getSkillChatState
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _putSkillChatState_decorators, {
				kind: "method",
				name: "putSkillChatState",
				static: false,
				private: false,
				access: {
					has: (obj) => "putSkillChatState" in obj,
					get: (obj) => obj.putSkillChatState
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			__esDecorate(this, null, _runSkillChatAutomation_decorators, {
				kind: "method",
				name: "runSkillChatAutomation",
				static: false,
				private: false,
				access: {
					has: (obj) => "runSkillChatAutomation" in obj,
					get: (obj) => obj.runSkillChatAutomation
				},
				metadata: _metadata
			}, null, _instanceExtraInitializers);
			if (_metadata) Object.defineProperty(this, Symbol.metadata, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: _metadata
			});
		}
		static inject = [
			"typert",
			"workspaceRegistry",
			"agents",
			"agentDefaultModel",
			"sessionTitle",
			"systemPrompt"
		];
		roots = __runInitializers(this, _instanceExtraInitializers);
		skillsShOrigin;
		stateFile;
		stateWrite = Promise.resolve();
		cachedState = emptySkillChatState();
		inheritLegacyState;
		activeAutomationRuns = /* @__PURE__ */ new Set();
		sidecars = /* @__PURE__ */ new Map();
		constructor(ctx, config = {}) {
			super(ctx, "workBuddySkillCatalog", { namespace: "workbuddySkills" });
			this.roots = resolveRoots(config);
			this.skillsShOrigin = config.skillsShOrigin ?? "https://skills.sh";
			this.inheritLegacyState = config.stateFile === void 0;
			this.stateFile = config.stateFile === void 0 ? defaultStateFile() : resolve(config.stateFile);
			this.getSkillChatState().catch(() => {});
			ctx.effect(() => ctx.systemPrompt.section({
				name: "skill-chat:room-role",
				order: ctx.systemPrompt.getSectionOrder("TEAM_POLICY"),
				text: ({ scope }) => {
					const sessionId = stringId(scope);
					if (sessionId === void 0) return "";
					const roomSession = this.cachedState.roomSessions.find((item) => item.harnessSessionId === sessionId);
					const room = roomSession === void 0 ? void 0 : this.cachedState.rooms.find((item) => item.roomId === roomSession.roomId);
					if (room?.type !== "group") return "";
					const configuredPrompt = room.systemPrompt?.trim();
					if (configuredPrompt !== void 0 && configuredPrompt !== "") return configuredPrompt;
					const members = room.memberIds.map((id) => `@${this.memberSkillName(room.roomId, id)}`).join("、");
					return `你是「${room.title}」的协调者。根据用户目标组织群组成员（${members}）协作。没有明确 @ 时你先拆解任务再决定交给谁，有 @ 时优先尊重指定成员。一次需要多个成员时，用 subagent 工具为每个成员各起一个后台子代理并发进行，并在提示里写明「先加载 <成员名> 这个 Skill，再按它的方法完成以下任务」；单个成员能完成时直接自己加载对应 Skill 处理。转述成员结果时该段以「@成员名」开头再换行写内容，界面据此标注发言人。只陈述真实发生的事。`;
				}
			}), "workBuddySkillCatalog.roomSystemPrompt()");
			ctx.effect(() => ctx.systemPrompt.section({
				name: "skill-chat:imported-skill-runtime",
				order: ctx.systemPrompt.getSectionOrder("TEAM_POLICY"),
				text: ({ scope }) => {
					const sessionId = stringId(scope);
					if (sessionId === void 0) return "";
					if (this.cachedState.roomSessions.find((item) => item.harnessSessionId === sessionId) === void 0) return "";
					return "本会话里的 Skill 多数是从 Claude Code、WorkBuddy、Codex 等其它 agent 工具导入的，它们的说明按各自的运行时写成，与这里的契约不一致。冲突时以下面为准：\n- 只有 `run_code` 可以直接调用。Skill 说明里的「调用 glob / read / bash 工具」，在这里的写法是在程序内 `await tools.glob({...})`。\n- 程序是 ESM，没有 `require`。需要 Node 内置模块时用 `import`；能用 `tools.*` 完成的优先用 `tools.*`。\n- Skill 里的命令行示例仍然有效，但要经 `await tools.bash({ command, description })` 执行。\nSkill 的方法论照常执行，只把工具的调用方式换成上面这套。";
				}
			}), "workBuddySkillCatalog.importedSkillRuntime()");
			const timer = setInterval(() => {
				this.dispatchDueAutomations().catch((error) => {
					this.ctx.logger.warn(`skill-chat automation scan failed: ${String(error)}`);
				});
			}, 3e4);
			timer.unref();
			ctx.effect(() => () => {
				clearInterval(timer);
			}, "workBuddySkillCatalog.automationTimer()");
			ctx.effect(() => async () => {
				const handles = [...this.sidecars.values()];
				this.sidecars.clear();
				await Promise.all(handles.map((handle) => handle.dispose().catch(() => {})));
			}, "workBuddySkillCatalog.sidecars()");
		}
		/** List bounded, source-qualified contacts from every configured Skill root. */
		async list(signal) {
			return { contacts: await scanSkillRoots(this.roots, signal) };
		}
		/** Search the public skills.sh catalog without installing or executing results. */
		async searchExternal(query, signal) {
			const normalized = query.trim();
			if (normalized.length < 2 || normalized.length > 100) return { contacts: [] };
			signal?.throwIfAborted();
			const response = await fetch(`${this.skillsShOrigin}/api/search?q=${encodeURIComponent(normalized)}&limit=20`, {
				headers: { accept: "application/json" },
				...signal === void 0 ? {} : { signal }
			});
			if (!response.ok) return { contacts: [] };
			const payload = await response.json();
			if (!Array.isArray(payload.skills)) return { contacts: [] };
			return { contacts: payload.skills.slice(0, 20).flatMap((candidate) => {
				if (typeof candidate !== "object" || candidate === null) return [];
				const value = candidate;
				if (typeof value.id !== "string" || typeof value.name !== "string" || typeof value.source !== "string") return [];
				return [{
					id: value.id,
					skillId: typeof value.skillId === "string" ? value.skillId : value.name,
					name: value.name,
					source: value.source,
					installs: typeof value.installs === "number" && Number.isFinite(value.installs) ? value.installs : 0,
					...typeof value.description === "string" ? { description: value.description } : {},
					...typeof value.homepage === "string" ? { homepage: value.homepage } : {},
					repository: `https://github.com/${value.source}`
				}];
			}) };
		}
		/** Download one public GitHub-backed skills.sh result into a Workspace-local Skill root. */
		async installExternal(request, signal) {
			signal?.throwIfAborted();
			const workspace = this.ctx.workspaceRegistry.get(WorkspaceId(request.workspaceId));
			if (workspace === void 0) throw new Error("skill-chat: unknown Workspace");
			if (await workspace.status() !== "ok") throw new Error("skill-chat: Workspace directory is unavailable");
			return await installGithubSkill(workspace.path, request, signal);
		}
		/**
		* Make one scanned Skill genuinely runnable by linking it into the Harness's
		* own user root, `$DSH_HOME/skills`.
		*
		* A symbolic link rather than a copy: the tool that owns the Skill stays the
		* source of truth, so editing it there is visible here immediately and there
		* is no second copy to go stale. The Harness watches that root, so the Skill
		* becomes invocable without a restart. Linking is per Skill and on demand —
		* mirroring nine hundred Skills from every installed tool would bury the
		* model's catalog in entries nobody asked for.
		* @param request - the Skill directory to link and the name to expose.
		* @param signal - abort signal.
		* @returns where the link was created.
		*/
		async linkSkill(request, signal) {
			signal?.throwIfAborted();
			if (!SKILL_NAME.test(request.name)) throw new Error("skill-chat: invalid Skill name");
			const source = await realpath(request.path);
			if ((await stat(join(source, "SKILL.md")).catch(() => void 0))?.isFile() !== true) throw new Error(`skill-chat: no SKILL.md under ${request.path}`);
			const target = join(this.linkDir(), request.name);
			await mkdir(dirname(target), { recursive: true });
			await rm(target, {
				recursive: true,
				force: true
			});
			await symlink(source, target, "dir");
			return {
				name: request.name,
				source,
				target
			};
		}
		/** Drop a link previously made by {@link linkSkill}. Only links are removed:
		* a real directory under the root was put there by someone else. */
		async unlinkSkill(name, signal) {
			signal?.throwIfAborted();
			if (!SKILL_NAME.test(name)) throw new Error("skill-chat: invalid Skill name");
			const target = join(this.linkDir(), name);
			const entry = await lstat(target).catch(() => void 0);
			if (entry === void 0) return;
			if (!entry.isSymbolicLink()) throw new Error(`skill-chat: ${name} is not a link this plugin made`);
			await rm(target);
		}
		/** `$DSH_HOME/skills`: the Harness's own user-level Skill root. */
		linkDir() {
			return join(process.env.DSH_HOME ?? join(homedir(), ".dsh"), "skills");
		}
		/** List one directory inside a registered Workspace for the project-tools drawer. */
		async browseProject(request, signal) {
			signal?.throwIfAborted();
			const workspace = this.ctx.workspaceRegistry.get(WorkspaceId(request.workspaceId));
			if (workspace === void 0) throw new Error("skill-chat: unknown Workspace");
			if (await workspace.status() !== "ok") throw new Error("skill-chat: Workspace directory is unavailable");
			const root = await realpath(workspace.path);
			const target = await realpath(request.path ?? root);
			if (!isWithin(root, target)) throw new Error("skill-chat: project path escapes Workspace");
			const entries = await readdir(target, { withFileTypes: true });
			return {
				path: target,
				root,
				...target === root ? {} : { parent: dirname(target) },
				entries: entries.filter((entry) => !entry.isSymbolicLink()).slice(0, 500).map((entry) => ({
					name: entry.name,
					path: join(target, entry.name),
					kind: entry.isDirectory() ? "directory" : "file",
					hidden: entry.name.startsWith(".")
				})).toSorted((left, right) => Number(right.kind === "directory") - Number(left.kind === "directory") || left.name.localeCompare(right.name))
			};
		}
		/** Read a bounded text preview for one file inside a registered Workspace. */
		async readProjectFile(request, signal) {
			signal?.throwIfAborted();
			const workspace = this.ctx.workspaceRegistry.get(WorkspaceId(request.workspaceId));
			if (workspace === void 0) throw new Error("skill-chat: unknown Workspace");
			if (await workspace.status() !== "ok") throw new Error("skill-chat: Workspace directory is unavailable");
			const root = await realpath(workspace.path);
			const target = await realpath(request.path);
			if (!isWithin(root, target)) throw new Error("skill-chat: project path escapes Workspace");
			const handle = await open(target, "r");
			try {
				const stat = await handle.stat();
				if (!stat.isFile()) throw new Error("skill-chat: project path is not a file");
				const byteCount = Math.min(stat.size, MAX_PREVIEW_BYTES);
				const buffer = Buffer.alloc(byteCount);
				const { bytesRead } = await handle.read(buffer, 0, byteCount, 0);
				const value = buffer.subarray(0, bytesRead);
				const binary = value.includes(0);
				return {
					path: target,
					name: basename(target),
					...binary ? {} : { content: value.toString("utf8") },
					size: stat.size,
					language: languageForPath(target),
					binary,
					truncated: stat.size > MAX_PREVIEW_BYTES
				};
			} finally {
				await handle.close();
			}
		}
		/** Open a real persistent shell owned by the selected Harness Session. */
		async openSkillChatTerminal(request, signal) {
			signal?.throwIfAborted();
			const { agent, workspace } = await this.sessionWorkspace(request.sessionId, request.workspaceId);
			const terminals = agent.ctx.get("terminals");
			if (terminals === void 0) {
				if (this.ctx.get("subprocess") === void 0) throw new Error("skill-chat: this Session has no terminal service");
				return {
					terminalId: `oneshot:${request.workspaceId}`,
					text: "",
					status: "running",
					truncated: false
				};
			}
			const backend = terminals.listBackends()[0];
			if (backend === void 0) throw new Error("skill-chat: this Session has no terminal backend");
			const opened = await terminals.spawn(agent, {
				type: backend,
				cwd: workspace.path
			}, signal);
			const output = terminals.read(agent, opened.sessionId, { count: 2e3 });
			return {
				terminalId: opened.sessionId,
				text: [opened.motd, output.text].filter(Boolean).join("\n"),
				status: opened.status.kind,
				truncated: output.truncated
			};
		}
		/** Execute one command in a real persistent shell and return bounded scrollback. */
		async sendSkillChatTerminal(request, signal) {
			signal?.throwIfAborted();
			const agent = this.ctx.agents.get(SessionId(request.sessionId));
			if (agent === void 0) throw new Error("skill-chat: Session is not active");
			const terminals = agent.ctx.get("terminals");
			if (terminals === void 0 && request.terminalId.startsWith("oneshot:")) {
				const workspaceId = request.terminalId.slice(8);
				const { workspace } = await this.sessionWorkspace(request.sessionId, workspaceId);
				const subprocess = this.ctx.get("subprocess");
				if (subprocess === void 0) throw new Error("skill-chat: this Session has no shell service");
				const shell = process.platform === "win32" ? [
					"pwsh",
					"-NoLogo",
					"-NoProfile",
					"-Command",
					request.command
				] : [
					"bash",
					"-lc",
					request.command
				];
				const handle = subprocess.spawn({
					argv: shell,
					cwd: workspace.path,
					stdio: {
						stdin: "ignore",
						stdout: { maxBytes: 1024 * 1024 },
						stderr: { maxBytes: 1024 * 1024 }
					},
					graceMs: 1e3,
					...signal === void 0 ? {} : { signal }
				});
				const outcome = await handle.done;
				const stdout = handle.collected.stdout?.readFrom(0);
				const stderr = handle.collected.stderr?.readFrom(0);
				const text = [
					stdout?.text,
					stderr?.text,
					`\n[exit ${String(outcome.exitCode ?? outcome.signal ?? "unknown")}]`
				].filter(Boolean).join("");
				return {
					terminalId: request.terminalId,
					text,
					status: "running",
					truncated: stdout?.lossy === true || stderr?.lossy === true
				};
			}
			if (terminals === void 0) throw new Error("skill-chat: this Session has no terminal service");
			const terminalId = TerminalSessionId(request.terminalId);
			await terminals.startSend(agent, terminalId, {
				text: request.command,
				submit: true,
				...signal === void 0 ? {} : { signal }
			}).done;
			const output = terminals.read(agent, terminalId, { count: 2e3 });
			const snapshot = terminals.list(agent).find((item) => item.sessionId === terminalId);
			if (snapshot === void 0) throw new Error("skill-chat: terminal closed unexpectedly");
			return {
				terminalId,
				text: output.text,
				status: snapshot.status.kind,
				truncated: output.truncated
			};
		}
		/** Close one persistent shell owned by the selected Harness Session. */
		async closeSkillChatTerminal(request) {
			const agent = this.ctx.agents.get(SessionId(request.sessionId));
			if (agent === void 0) return;
			if (request.terminalId.startsWith("oneshot:")) return;
			const terminals = agent.ctx.get("terminals");
			if (terminals === void 0) return;
			await terminals.kill(agent, TerminalSessionId(request.terminalId), "Skill Chat terminal drawer closed");
		}
		/** Start a temporary side conversation without changing the active Room. */
		async startSkillChatSidecar(request, signal) {
			signal?.throwIfAborted();
			const source = this.ctx.agents.get(SessionId(request.sourceSessionId));
			if (source === void 0) throw new Error("skill-chat: source Session is not active");
			const workspace = this.ctx.workspaceRegistry.get(WorkspaceId(request.workspaceId));
			if (workspace === void 0 || !workspace.sessionIds.includes(source.id)) throw new Error("skill-chat: Session does not belong to Workspace");
			const selected = this.ctx.agentDefaultModel.currentSelection();
			const sidecarId = `sidecar-${randomUUID()}`;
			const handle = await this.ctx.agents.create({
				sessionId: SessionId(sidecarId),
				meta: { cwd: workspace.path },
				agentOptions: {
					provider: selected.provider,
					model: selected.model
				}
			});
			this.sidecars.set(sidecarId, handle);
			try {
				await handle.agent.whenIdle();
				const context = recentConversationText(source.session);
				const prompt = [
					`你正在进行一个不改变主对话的临时旁路讨论。当前 Room：${request.roomTitle}。`,
					request.roomSystemPrompt?.trim() === "" || request.roomSystemPrompt === void 0 ? "" : `Room 职能：${request.roomSystemPrompt}`,
					request.memberNames.length === 0 ? "" : `当前成员：${request.memberNames.join("、")}。`,
					context === "" ? "" : `主对话最近上下文：\n${context}`,
					`用户在旁路对话中的问题：\n${request.message}`
				].filter(Boolean).join("\n\n");
				return await this.sendSidecar(handle, sidecarId, prompt, signal);
			} catch (error) {
				this.sidecars.delete(sidecarId);
				await handle.dispose().catch(() => {});
				throw error;
			}
		}
		/** Continue an existing temporary side conversation. */
		async sendSkillChatSidecar(request, signal) {
			const handle = this.sidecars.get(request.sidecarId);
			if (handle === void 0) throw new Error("skill-chat: temporary conversation expired");
			return await this.sendSidecar(handle, request.sidecarId, request.message, signal);
		}
		/** Dispose a temporary side conversation and its non-Room Session. */
		async closeSkillChatSidecar(sidecarId) {
			const handle = this.sidecars.get(sidecarId);
			if (handle === void 0) return;
			this.sidecars.delete(sidecarId);
			await handle.dispose();
		}
		/** Read the complete versioned Skill Chat state from Host-owned storage. */
		async getSkillChatState(signal) {
			signal?.throwIfAborted();
			await this.stateWrite;
			try {
				const parsed = JSON.parse(await readFile(this.stateFile, "utf8"));
				this.cachedState = validateSkillChatState(parsed);
				return this.cachedState;
			} catch (error) {
				if (error.code === "ENOENT") {
					this.cachedState = await this.legacyState();
					return this.cachedState;
				}
				throw error;
			}
		}
		/**
		* The loadable Skill name for one room member.
		*
		* A contact id is `<root>:<plugin>:<name>`, and which root owns a duplicated
		* name depends on the roster the catalog scanned. Widening that roster
		* therefore re-keys contacts and leaves every existing room pointing at ids
		* no persona answers to — which is how a group brief came to instruct the
		* model to delegate to `@claude:pa-market-query:pa-market-query`. That is
		* neither a name a person recognises nor a Skill the `skill` tool can load.
		*
		* Three sources, in order of how much they know: the persona map, the member
		* snapshot the Room Session captured when it started, and finally the id's
		* own trailing segment — which is the Skill's name, because that is how the
		* id was built.
		* @param roomId - the room the member belongs to.
		* @param id - the stored contact id.
		* @returns a name the model can pass to the `skill` tool.
		*/
		memberSkillName(roomId, id) {
			const persona = this.cachedState.personas[id]?.originalName;
			if (persona !== void 0 && persona !== "") return persona;
			const snapshot = this.cachedState.roomSessions.filter((item) => item.roomId === roomId).sort((left, right) => right.updatedAt - left.updatedAt).flatMap((item) => item.memberSnapshot.filter((member) => member.skillId === id))[0];
			if (snapshot?.originalName !== void 0 && snapshot.originalName !== "") return snapshot.originalName;
			return id.slice(id.lastIndexOf(":") + 1);
		}
		/**
		* Read the pre-`$DSH_HOME` state document, for a Harness whose scoped file
		* does not exist yet. The legacy file is left in place rather than moved: a
		* machine may still be running an older build that reads only that path, and
		* an upgrade should not empty its sidebar. The first save writes the scoped
		* file, after which this is never consulted again.
		* @returns the inherited state, or an empty one.
		*/
		async legacyState() {
			if (!this.inheritLegacyState || this.stateFile === LEGACY_STATE_FILE) return emptySkillChatState();
			try {
				return validateSkillChatState(JSON.parse(await readFile(LEGACY_STATE_FILE, "utf8")));
			} catch {
				return emptySkillChatState();
			}
		}
		/** Atomically replace the complete Skill Chat state after validating its bounded JSON shape. */
		async putSkillChatState(state, signal) {
			signal?.throwIfAborted();
			const validated = validateSkillChatState(state);
			const encoded = `${JSON.stringify(validated, null, 2)}\n`;
			if (Buffer.byteLength(encoded) > 2 * 1024 * 1024) throw new Error("skill-chat: state exceeds 2 MiB");
			this.stateWrite = this.stateWrite.then(async () => {
				signal?.throwIfAborted();
				await mkdir(dirname(this.stateFile), { recursive: true });
				const temporary = `${this.stateFile}.${process.pid}.${Date.now()}.tmp`;
				await writeFile(temporary, encoded, {
					encoding: "utf8",
					mode: 384
				});
				await rename(temporary, this.stateFile);
			});
			await this.stateWrite;
			this.cachedState = validated;
			return validated;
		}
		/** Create and prompt one independent Session for an automation definition. */
		async runSkillChatAutomation(automationId, signal) {
			if (this.activeAutomationRuns.has(automationId)) throw new Error("skill-chat: automation is already running");
			this.activeAutomationRuns.add(automationId);
			try {
				signal?.throwIfAborted();
				const state = await this.getSkillChatState(signal);
				const automation = state.automations.find((item) => item.automationId === automationId);
				if (automation === void 0) throw new Error("skill-chat: unknown automation");
				if (automation.status === "paused") throw new Error("skill-chat: automation is paused");
				const room = state.rooms.find((item) => item.roomId === automation.roomId && item.archivedAt === void 0);
				if (room === void 0) throw new Error("skill-chat: automation Room is unavailable");
				const workspace = this.ctx.workspaceRegistry.get(WorkspaceId(automation.workspaceId));
				if (workspace === void 0 || await workspace.status() !== "ok") throw new Error("skill-chat: automation Workspace is unavailable");
				const sessionId = SessionId(`session-${randomUUID()}`);
				const selected = this.ctx.agentDefaultModel.currentSelection();
				const handle = await this.ctx.agents.create({
					sessionId,
					meta: { cwd: workspace.path },
					agentOptions: {
						provider: selected.provider,
						model: selected.model
					}
				});
				await workspace.attachSession(sessionId);
				this.ctx.sessionTitle.rename(handle.agent.session, `${automation.name} · ${room.title}`);
				const now = Date.now();
				const roomSessionId = `room-session:${sessionId}`;
				const memberSnapshot = room.memberIds.map((skillId) => {
					const persona = state.personas[skillId];
					return {
						skillId,
						displayName: persona?.displayName ?? skillId,
						avatarId: persona?.avatarId ?? "fox-coral",
						originalName: persona?.originalName ?? skillId
					};
				});
				const next = {
					...state,
					roomSessions: [...state.roomSessions, {
						roomSessionId,
						roomId: room.roomId,
						harnessSessionId: sessionId,
						title: `${automation.name} · ${room.title}`,
						memberSnapshot,
						createdAt: now,
						updatedAt: now
					}],
					rooms: state.rooms.map((item) => item.roomId === room.roomId ? {
						...item,
						sessionIds: [...item.sessionIds, roomSessionId],
						activeSessionId: roomSessionId,
						updatedAt: now
					} : item),
					automations: state.automations.map((item) => {
						if (item.automationId !== automationId) return item;
						const { nextRunAt: _nextRunAt, ...withoutNextRun } = item;
						return item.lifecycle === "run-once" ? {
							...withoutNextRun,
							status: "completed",
							lastRunAt: now,
							updatedAt: now
						} : {
							...item,
							lastRunAt: now,
							nextRunAt: nextRecurringAt(item.schedule, now),
							updatedAt: now
						};
					})
				};
				await this.putSkillChatState(next, signal);
				handle.agent.followup(createUserMessage({
					content: [{
						type: "text",
						text: automation.prompt
					}],
					source: {
						kind: "plugin",
						plugin: "skill-chat-automation"
					}
				}));
				return {
					sessionId,
					state: next
				};
			} finally {
				this.activeAutomationRuns.delete(automationId);
			}
		}
		async dispatchDueAutomations() {
			const state = await this.getSkillChatState();
			const now = Date.now();
			for (const automation of state.automations) {
				if (automation.status !== "active" || automation.nextRunAt === void 0 || automation.nextRunAt > now) continue;
				await this.runSkillChatAutomation(automation.automationId).catch((error) => {
					this.ctx.logger.warn(`skill-chat automation "${automation.automationId}" failed: ${String(error)}`);
				});
			}
		}
		async sessionWorkspace(sessionId, workspaceId) {
			const agent = this.ctx.agents.get(SessionId(sessionId));
			if (agent === void 0) throw new Error("skill-chat: Session is not active");
			const workspace = this.ctx.workspaceRegistry.get(WorkspaceId(workspaceId));
			if (workspace === void 0 || !workspace.sessionIds.includes(agent.id)) throw new Error("skill-chat: Session does not belong to Workspace");
			if (await workspace.status() !== "ok") throw new Error("skill-chat: Workspace directory is unavailable");
			return {
				agent,
				workspace
			};
		}
		async sendSidecar(handle, sidecarId, message, signal) {
			signal?.throwIfAborted();
			await handle.agent.whenIdle();
			const startSeq = handle.agent.session.seq;
			handle.agent.followup(createUserMessage({
				content: [{
					type: "text",
					text: message
				}],
				source: {
					kind: "plugin",
					plugin: "skill-chat-sidecar"
				}
			}));
			await handle.agent.whenIdle();
			signal?.throwIfAborted();
			const answer = assistantTextAfter(handle.agent.session, Number(startSeq));
			if (answer === "") throw new Error("skill-chat: temporary conversation returned no visible answer");
			return {
				sidecarId,
				answer
			};
		}
	};
})();
function assistantTextAfter(session, startSeq) {
	return session.snapshotEvents().flatMap((event) => {
		if (event.seq < startSeq || event.type !== "assistant/message") return [];
		return event.data.message.content.flatMap((block) => block.type === "text" ? [block.text] : []);
	}).join("\n").trim();
}
function recentConversationText(session) {
	return session.snapshotEvents().flatMap((event) => {
		if (event.type !== "user/message" && event.type !== "assistant/message") return [];
		const text = (event.type === "user/message" ? event.data : event.data.message).content.flatMap((block) => block.type === "text" ? [block.text] : []).join("\n").trim();
		if (text === "") return [];
		return [`${event.type === "user/message" ? "用户" : "助手"}：${text}`];
	}).slice(-10).join("\n").slice(-12e3);
}
function languageForPath(path) {
	return {
		ts: "typescript",
		tsx: "tsx",
		js: "javascript",
		jsx: "jsx",
		json: "json",
		md: "markdown",
		css: "css",
		scss: "scss",
		html: "html",
		yml: "yaml",
		yaml: "yaml",
		sh: "shell",
		zsh: "shell",
		py: "python",
		go: "go",
		rs: "rust",
		java: "java",
		kt: "kotlin",
		swift: "swift",
		sql: "sql"
	}[extname(path).slice(1).toLocaleLowerCase()] ?? "text";
}
function nextRecurringAt(schedule, after) {
	if (schedule.kind === "once") return after;
	const match = /^every:(\d+)(m|h|d)$/u.exec(schedule.rule.trim());
	if (match === null) return after + 1440 * 60 * 1e3;
	const amount = Number(match[1]);
	const unit = match[2] === "m" ? 6e4 : match[2] === "h" ? 36e5 : 864e5;
	return after + Math.max(1, amount) * unit;
}
/**
* Where the room graph lives.
*
* This used to be one file under `~/.workbuddy` shared by every Harness on the
* machine, which is incoherent: `roomSessions` point at Harness session ids,
* and those are scoped to a `$DSH_HOME`. Two Harnesses sharing the file also
* clobber each other — the document is written whole, so the second one to
* save replaces the first one's rooms with its own. Scoping the file to
* `$DSH_HOME` gives the rooms the same lifetime as the sessions they name.
* @returns the absolute path of the state document.
*/
function defaultStateFile() {
	return join(process.env.DSH_HOME ?? join(homedir(), ".dsh"), "skill-chat", "state.v2.json");
}
/** The pre-`$DSH_HOME` location, read once if the scoped file does not exist. */
const LEGACY_STATE_FILE = join(homedir(), ".workbuddy", "skill-chat", "state.v2.json");
function emptySkillChatState() {
	return {
		version: 2,
		rooms: [],
		roomSessions: [],
		personas: {},
		automations: []
	};
}
function validateSkillChatState(value) {
	if (typeof value !== "object" || value === null) throw new Error("skill-chat: state must be an object");
	const record = value;
	if (record.version !== 2 || !Array.isArray(record.rooms) || !Array.isArray(record.roomSessions) || !Array.isArray(record.automations) || typeof record.personas !== "object" || record.personas === null) throw new Error("skill-chat: unsupported or malformed state");
	return value;
}
function stringId(value) {
	if (value === void 0 || !("id" in value)) return void 0;
	return typeof value.id === "string" ? value.id : void 0;
}
async function installGithubSkill(workspaceRoot, request, signal) {
	if (!GITHUB_SOURCE.test(request.source)) throw new Error("skill-chat: unsupported Skill source");
	if (!SKILL_NAME.test(request.skillId)) throw new Error("skill-chat: invalid Skill name");
	if (request.id !== `${request.source}/${request.skillId}`) throw new Error("skill-chat: mismatched Skill identity");
	let archiveFiles;
	let tree;
	try {
		tree = await githubTree(request.source, signal);
	} catch (error) {
		if (!(error instanceof GithubTreeRequestError) || error.status !== 403 && error.status !== 429) throw error;
		archiveFiles = await githubArchiveFiles(request.source, signal);
		tree = [...archiveFiles].map(([path, content]) => ({
			path,
			type: "blob",
			mode: "100644",
			size: content.byteLength
		}));
	}
	const skillFile = await resolveSkillFile(request.source, request.skillId, tree, signal, archiveFiles);
	if (skillFile === void 0) throw new Error(`skill-chat: Skill '${request.skillId}' was not found in ${request.source}`);
	const bundleRoot = posix.dirname(skillFile);
	const files = tree.filter((entry) => isBundleFile(entry, bundleRoot));
	if (files.length === 0 || files.length > MAX_INSTALL_FILES) throw new Error("skill-chat: Skill bundle exceeds file-count limit");
	if (files.reduce((total, entry) => total + fileSize(entry), 0) > MAX_INSTALL_BYTES) throw new Error("skill-chat: Skill bundle exceeds size limit");
	const skillContent = archiveFiles?.get(skillFile) ?? await githubFile(request.source, skillFile, signal);
	const metadata = metadataFromContent(skillContent.toString("utf8"));
	if (metadata === void 0) throw new Error("skill-chat: downloaded SKILL.md has invalid frontmatter");
	const installName = SKILL_NAME.test(metadata.name) ? metadata.name : request.skillId;
	const skillsRoot = join(await realpath(workspaceRoot), ".dsh", "skills");
	await mkdir(skillsRoot, { recursive: true });
	const staging = await mkdtemp(join(skillsRoot, ".install-"));
	let committed = false;
	try {
		let downloadedBytes = 0;
		for (const entry of files) {
			signal?.throwIfAborted();
			const path = stringField(entry.path);
			if (path === void 0) continue;
			const relativePath = bundleRoot === "." ? path : path.slice(bundleRoot.length + 1);
			if (!safeRelativePath(relativePath)) throw new Error("skill-chat: unsafe Skill bundle path");
			const content = path === skillFile ? skillContent : archiveFiles?.get(path) ?? await githubFile(request.source, path, signal);
			downloadedBytes += content.byteLength;
			if (downloadedBytes > MAX_INSTALL_BYTES) throw new Error("skill-chat: Skill bundle exceeds size limit");
			const destination = join(staging, ...relativePath.split("/"));
			await mkdir(dirname(destination), { recursive: true });
			await writeFile(destination, content, { mode: 384 });
		}
		const destination = join(skillsRoot, installName);
		await rm(destination, {
			recursive: true,
			force: true
		});
		await rename(staging, destination);
		committed = true;
		return {
			contact: {
				id: `skills-sh:${request.id}`,
				name: metadata.name,
				description: metadata.description,
				...metadata.whenToUse === void 0 ? {} : { whenToUse: metadata.whenToUse },
				source: "skills-sh",
				sourceLabel: `skills.sh · ${request.source}`,
				repository: `https://github.com/${request.source}`,
				homepage: `https://skills.sh/${request.id}`,
				invocable: true,
				modelInvocable: true
			},
			path: destination
		};
	} finally {
		if (!committed) await rm(staging, {
			recursive: true,
			force: true
		});
	}
}
var GithubTreeRequestError = class extends Error {
	status;
	constructor(status) {
		super(`skill-chat: GitHub tree request failed (${status})`);
		this.status = status;
	}
};
async function githubTree(source, signal) {
	const response = await fetch(`https://api.github.com/repos/${source}/git/trees/HEAD?recursive=1`, {
		headers: {
			accept: "application/vnd.github+json",
			"user-agent": "deepseek-harness-skill-chat"
		},
		...signal === void 0 ? {} : { signal }
	});
	if (!response.ok) throw new GithubTreeRequestError(response.status);
	const payload = await response.json();
	if (payload.truncated === true) throw new Error("skill-chat: repository tree is too large to install safely");
	return Array.isArray(payload.tree) ? payload.tree : [];
}
async function resolveSkillFile(source, skillId, tree, signal, archiveFiles) {
	const candidates = tree.flatMap((entry) => {
		const path = stringField(entry.path);
		return entry.type === "blob" && entry.mode !== "120000" && (path === "SKILL.md" || path?.endsWith("/SKILL.md") === true) ? [path] : [];
	});
	const exact = candidates.filter((path) => posix.basename(posix.dirname(path)) === skillId).toSorted((left, right) => left.length - right.length)[0];
	if (exact !== void 0) return exact;
	if (candidates.length === 1) return candidates[0];
	for (const path of candidates.slice(0, 100)) {
		signal?.throwIfAborted();
		if (metadataFromContent((archiveFiles?.get(path) ?? await githubFile(source, path, signal)).toString("utf8"))?.name === skillId) return path;
	}
}
async function githubArchiveFiles(source, signal) {
	const response = await fetch(`https://codeload.github.com/${source}/tar.gz/HEAD`, {
		headers: {
			accept: "application/gzip",
			"user-agent": "deepseek-harness-skill-chat"
		},
		...signal === void 0 ? {} : { signal }
	});
	if (!response.ok) throw new Error(`skill-chat: GitHub archive request failed (${response.status})`);
	const compressed = Buffer.from(await response.arrayBuffer());
	if (compressed.byteLength > MAX_ARCHIVE_BYTES) throw new Error("skill-chat: repository archive exceeds download limit");
	return parseTarFiles(gunzipSync(compressed, { maxOutputLength: MAX_ARCHIVE_BYTES }));
}
function parseTarFiles(archive) {
	const files = /* @__PURE__ */ new Map();
	let offset = 0;
	let totalBytes = 0;
	let pendingPath;
	while (offset + 512 <= archive.byteLength) {
		const header = archive.subarray(offset, offset + 512);
		if (header.every((byte) => byte === 0)) break;
		const name = tarText(header.subarray(0, 100));
		const prefix = tarText(header.subarray(345, 500));
		const rawPath = pendingPath ?? [prefix, name].filter(Boolean).join("/");
		pendingPath = void 0;
		const sizeText = tarText(header.subarray(124, 136)).replace(/\0.*$/u, "").trim();
		const size = sizeText === "" ? 0 : Number.parseInt(sizeText, 8);
		if (!Number.isSafeInteger(size) || size < 0 || size > MAX_ARCHIVE_BYTES) throw new Error("skill-chat: invalid GitHub archive entry");
		const dataStart = offset + 512;
		const dataEnd = dataStart + size;
		if (dataEnd > archive.byteLength) throw new Error("skill-chat: truncated GitHub archive");
		const type = String.fromCharCode(header[156] ?? 0);
		const data = archive.subarray(dataStart, dataEnd);
		if (type === "L") pendingPath = tarText(data);
		else if (type === "0" || type === "\0" || type === "") {
			const normalized = stripArchiveRoot(rawPath);
			if (normalized !== void 0) {
				if (!safeRelativePath(normalized)) throw new Error("skill-chat: unsafe GitHub archive path");
				totalBytes += data.byteLength;
				if (files.size >= MAX_INSTALL_FILES * 8 || totalBytes > MAX_ARCHIVE_BYTES) throw new Error("skill-chat: repository archive is too large to inspect safely");
				files.set(normalized, Buffer.from(data));
			}
		}
		offset = dataStart + Math.ceil(size / 512) * 512;
	}
	return files;
}
function tarText(buffer) {
	const end = buffer.indexOf(0);
	return buffer.subarray(0, end < 0 ? buffer.byteLength : end).toString("utf8").trim();
}
function stripArchiveRoot(path) {
	const slash = path.indexOf("/");
	if (slash < 0 || slash === path.length - 1) return void 0;
	return path.slice(slash + 1);
}
function isBundleFile(entry, bundleRoot) {
	const path = stringField(entry.path);
	if (entry.type !== "blob" || entry.mode === "120000" || path === void 0) return false;
	return bundleRoot === "." || path.startsWith(`${bundleRoot}/`);
}
function fileSize(entry) {
	return typeof entry.size === "number" && Number.isFinite(entry.size) ? Math.max(0, entry.size) : 0;
}
async function githubFile(source, path, signal) {
	const encodedPath = path.split("/").map(encodeURIComponent).join("/");
	const response = await fetch(`https://raw.githubusercontent.com/${source}/HEAD/${encodedPath}`, {
		headers: {
			accept: "text/plain",
			"user-agent": "deepseek-harness-skill-chat"
		},
		...signal === void 0 ? {} : { signal }
	});
	if (!response.ok) throw new Error(`skill-chat: GitHub file request failed (${response.status})`);
	return Buffer.from(await response.arrayBuffer());
}
function metadataFromContent(content) {
	const frontmatter = parseFrontmatter(content);
	if (frontmatter === void 0) return void 0;
	const name = stringField(frontmatter.name);
	const description = stringField(frontmatter.description);
	if (name === void 0 || description === void 0) return void 0;
	const whenToUse = extractWhenToUse(content);
	return {
		name,
		description,
		...whenToUse === void 0 ? {} : { whenToUse }
	};
}
function safeRelativePath(path) {
	const segments = path.split("/");
	return path.length > 0 && !path.startsWith("/") && segments.every((segment) => segment !== "" && segment !== "." && segment !== "..");
}
function resolveRoot(configured) {
	if (configured === void 0) return join(homedir(), DEFAULT_RELATIVE_ROOT);
	if (configured === "~") return homedir();
	if (configured.startsWith("~/") || configured.startsWith(`~${sep}`)) return join(homedir(), configured.slice(2));
	return resolve(configured);
}
/**
* The roots to scan: the configured list, or the defaults with `config.root`
* still able to relocate the WorkBuddy cache on its own. Duplicate ids would
* make two roots mint the same contact ids, so the first one wins.
* @param config - the plugin's configuration.
* @returns each root with its path expanded and its layout defaulted.
*/
function resolveRoots(config) {
	const configured = config.roots ?? DEFAULT_ROOTS.map((root) => root.id === "workbuddy" && config.root !== void 0 ? {
		...root,
		path: config.root
	} : root);
	const seen = /* @__PURE__ */ new Set();
	const resolved = [];
	for (const root of configured) {
		const { id, label, path, layout } = root;
		if (typeof id !== "string" || typeof label !== "string" || typeof path !== "string") throw new Error("skill-chat: each configured Skill root needs a string id, label and path");
		if (layout !== void 0 && layout !== "plugin-version" && layout !== "flat") throw new Error(`skill-chat: Skill root ${id} has an unknown layout ${String(layout)}`);
		if (seen.has(id)) continue;
		seen.add(id);
		resolved.push({
			id,
			label,
			path: resolveRoot(path),
			layout: layout ?? "flat"
		});
	}
	return resolved;
}
/**
* Scan every root in order and merge the results. A Skill name discovered in
* more than one root keeps the first root's entry, so the roster order is the
* precedence order.
* @param roots - resolved roots to scan.
* @param signal - abort signal propagated into each scan.
* @returns bounded, name-sorted contacts across all roots.
*/
async function scanSkillRoots(roots, signal) {
	const byName = /* @__PURE__ */ new Map();
	for (const root of roots) {
		signal?.throwIfAborted();
		for (const contact of await scanSkillRoot(root, signal)) {
			if (byName.has(contact.name) || byName.size >= MAX_CONTACTS) continue;
			byName.set(contact.name, contact);
		}
	}
	return [...byName.values()].toSorted((left, right) => left.name.localeCompare(right.name));
}
/**
* Scan one root for `SKILL.md` files and read each one's frontmatter.
* @param root - the resolved root to scan.
* @param signal - abort signal checked between entries.
* @returns contacts discovered under that root, newest version per id.
*/
async function scanSkillRoot(root, signal) {
	signal?.throwIfAborted();
	let canonicalRoot;
	try {
		canonicalRoot = await realpath(root.path);
	} catch {
		return [];
	}
	const skillFiles = [];
	await collectSkillFiles(canonicalRoot, canonicalRoot, 0, skillFiles, signal);
	const byId = /* @__PURE__ */ new Map();
	for (const path of skillFiles.toSorted()) {
		signal?.throwIfAborted();
		const contact = await readContact(canonicalRoot, path, root);
		if (contact === void 0) continue;
		const previous = byId.get(contact.id);
		if (previous === void 0 || compareVersions(previous.version, contact.version) < 0) byId.set(contact.id, contact);
		if (byId.size >= MAX_CONTACTS) break;
	}
	return [...byId.values()].toSorted((left, right) => left.name.localeCompare(right.name));
}
async function collectSkillFiles(root, directory, depth, output, signal) {
	signal?.throwIfAborted();
	if (depth > MAX_DEPTH || output.length >= MAX_CONTACTS) return;
	let entries;
	try {
		entries = await readdir(directory, { withFileTypes: true });
	} catch {
		return;
	}
	for (const entry of entries.toSorted((left, right) => left.name.localeCompare(right.name))) {
		signal?.throwIfAborted();
		if (entry.isSymbolicLink()) continue;
		const path = join(directory, entry.name);
		if (!isWithin(root, path)) continue;
		if (entry.isFile() && entry.name === "SKILL.md") output.push(path);
		else if (entry.isDirectory()) await collectSkillFiles(root, path, depth + 1, output, signal);
		if (output.length >= MAX_CONTACTS) return;
	}
}
async function readContact(root, path, origin) {
	const pathParts = relative(root, path).split(sep);
	const [plugin] = pathParts;
	if (plugin === void 0 || pathParts.length < 2) return void 0;
	const candidate = pathParts.length > 2 ? pathParts[1] : void 0;
	const version = candidate !== void 0 && VERSION_DIRECTORY.test(candidate) ? candidate : void 0;
	if (origin.layout === "plugin-version" && version === void 0) return void 0;
	const handle = await open(path, "r");
	try {
		const buffer = Buffer.alloc(MAX_METADATA_BYTES);
		const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
		const frontmatter = parseFrontmatter(buffer.subarray(0, bytesRead).toString("utf8"));
		if (frontmatter === void 0) return void 0;
		const name = stringField(frontmatter.name);
		const description = stringField(frontmatter.description);
		if (name === void 0 || description === void 0) return void 0;
		const whenToUse = extractWhenToUse(buffer.subarray(0, bytesRead).toString("utf8"));
		return {
			id: `${origin.id}:${plugin}:${name}`,
			name,
			description,
			...whenToUse === void 0 ? {} : { whenToUse },
			source: "workbuddy",
			originId: origin.id,
			originLabel: origin.label,
			plugin,
			path: dirname(path),
			...version === void 0 ? {} : { version },
			invocable: false
		};
	} finally {
		await handle.close();
	}
}
function parseFrontmatter(content) {
	if (!content.startsWith("---\n")) return void 0;
	const end = content.indexOf("\n---", 4);
	if (end < 0) return void 0;
	let value;
	try {
		value = load(content.slice(4, end));
	} catch {
		return;
	}
	return typeof value === "object" && value !== null ? value : void 0;
}
function stringField(value) {
	if (typeof value !== "string") return void 0;
	const normalized = value.trim();
	return normalized.length === 0 ? void 0 : normalized;
}
function extractWhenToUse(content) {
	const match = /^## When to Use\s*$([\s\S]*?)(?=^##\s|(?![\s\S]))/imu.exec(content);
	if (match?.[1] === void 0) return void 0;
	const text = match[1].replace(/^\s*[-*]\s+/gmu, "").replace(/\s+/gu, " ").trim();
	return text.length === 0 ? void 0 : text.slice(0, 1e3);
}
function isWithin(root, candidate) {
	const path = relative(root, candidate);
	return path === "" || !path.startsWith(`..${sep}`) && path !== ".." && !isAbsolute(path);
}
function compareVersions(left, right) {
	return (left ?? "").localeCompare(right ?? "", void 0, {
		numeric: true,
		sensitivity: "base"
	});
}
/**
* Scan a single WorkBuddy cache root.
* @param root - filesystem path of the cache.
* @param signal - abort signal propagated into the scan.
* @returns contacts discovered under that root.
* @deprecated Prefer {@link scanSkillRoots}, which scans the configured roster.
*/
async function scanWorkBuddySkillContacts(root, signal) {
	return await scanSkillRoot({
		id: "workbuddy",
		label: "WorkBuddy",
		path: root,
		layout: "plugin-version"
	}, signal);
}
//#endregion
export { Config, WorkBuddySkillCatalog, WorkBuddySkillCatalog as default, scanSkillRoot, scanSkillRoots, scanWorkBuddySkillContacts };
