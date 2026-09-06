/** One read-only Skill contact discovered from a configured Skill root. */
export interface WorkBuddySkillContact {
  /** Stable source-qualified identifier. */
  readonly id: string
  /** Skill invocation name declared in YAML frontmatter. */
  readonly name: string
  /** Short routing description declared by the Skill. */
  readonly description: string
  /** Optional guidance extracted from the Skill body. */
  readonly whenToUse?: string
  /** Fixed catalog source label. */
  readonly source: 'workbuddy'
  /** Identifier of the configured Skill root the entry was discovered in. */
  readonly originId: string
  /** Human label for that root, shown as the contact's provenance. */
  readonly originLabel: string
  /** Top-level directory under the root that owns the Skill. */
  readonly plugin: string
  /** Directory holding this Skill's `SKILL.md`, so it can be linked. */
  readonly path?: string
  /** Version directory, when the root's layout carries one. */
  readonly version?: string
  /** Filesystem catalog entries are not mounted into the Harness runtime. */
  readonly invocable: false
}

/** Result returned by the WorkBuddy contact catalog Remote. */
export interface WorkBuddySkillContactList {
  readonly contacts: readonly WorkBuddySkillContact[]
}

/** One public marketplace result returned by skills.sh search. */
export interface SkillsShContact {
  readonly id: string
  readonly skillId: string
  readonly name: string
  readonly source: string
  readonly installs: number
  readonly description?: string
  readonly homepage?: string
  readonly repository?: string
}

/** Bounded skills.sh search response. */
export interface SkillsShSearchValue {
  readonly contacts: readonly SkillsShContact[]
}

/** Install one skills.sh result into one registered Workspace. */
export interface SkillsShInstallRequest {
  readonly workspaceId: string
  readonly id: string
  readonly skillId: string
  readonly source: string
}

/** Durable project-local Skill produced by a successful marketplace install. */
export interface SkillsShInstallValue {
  readonly contact: {
    readonly id: string
    readonly name: string
    readonly description: string
    readonly whenToUse?: string
    readonly source: 'skills-sh'
    readonly sourceLabel: string
    readonly repository: string
    readonly homepage: string
    readonly invocable: true
    readonly modelInvocable: true
  }
  readonly path: string
}

export interface SkillChatProjectBrowseRequest {
  readonly workspaceId: string
  readonly path?: string
}

export interface SkillChatProjectEntry {
  readonly name: string
  readonly path: string
  readonly kind: 'directory' | 'file'
  readonly hidden: boolean
}

export interface SkillChatProjectBrowseValue {
  readonly path: string
  readonly root: string
  readonly parent?: string
  readonly entries: readonly SkillChatProjectEntry[]
}

/** Read one bounded file inside a registered Workspace. */
export interface SkillChatProjectFileRequest {
  readonly workspaceId: string
  readonly path: string
}

/** Browser-safe file preview returned by the Host. */
export interface SkillChatProjectFileValue {
  readonly path: string
  readonly name: string
  readonly content?: string
  readonly size: number
  readonly language: string
  readonly binary: boolean
  readonly truncated: boolean
}

/** Open one persistent terminal owned by the active Harness Session. */
export interface SkillChatTerminalOpenRequest {
  readonly sessionId: string
  readonly workspaceId: string
}

/** Execute one command in an existing persistent terminal. */
export interface SkillChatTerminalSendRequest {
  readonly sessionId: string
  readonly terminalId: string
  readonly command: string
}

/** Close one persistent terminal owned by the active Harness Session. */
export interface SkillChatTerminalCloseRequest {
  readonly sessionId: string
  readonly terminalId: string
}

/**
 * Read one backward scrollback page.
 *
 * The panel polls this while a command runs, so it carries the same paging
 * vocabulary the backend uses rather than a fixed tail: `offset` is what lets
 * a long build log be walked upward instead of silently truncated.
 */
export interface SkillChatTerminalReadRequest {
  readonly sessionId: string
  readonly terminalId: string
  /** Offset from the newest retained line; omitted reads the newest page. */
  readonly offset?: number
  /** Requested line count; the backend's own bound still applies. */
  readonly count?: number
}

/** Deliver one interruption signal to a terminal's foreground process group. */
export interface SkillChatTerminalSignalRequest {
  readonly sessionId: string
  readonly terminalId: string
  readonly signal: 'SIGINT' | 'SIGTERM'
}

/** Current terminal identity and bounded scrollback. */
export interface SkillChatTerminalValue {
  readonly terminalId: string
  readonly text: string
  readonly status: 'running' | 'exited'
  readonly truncated: boolean
  /**
   * True while a command this panel started has not settled.
   *
   * The shell session's own `status` stays `running` between commands, so it
   * cannot answer "is it still working"; this flag is tracked per send.
   */
  readonly busy: boolean
  /** Lines the backend currently retains. */
  readonly totalLines: number
  /** Inclusive newest-relative offset of the first returned line. */
  readonly lineBegin: number
  /** Exclusive newest-relative offset after the returned page. */
  readonly lineEnd: number
}

/** Ask what a Room's sessions actually produced. */
export interface SkillChatArtifactRequest {
  readonly workspaceId: string
  /** Harness sessions belonging to the Room, in any order. */
  readonly sessionIds: readonly string[]
}

/**
 * One file a Room produced, together with the call that produced it.
 *
 * The panel used to list whatever changed on disk while a Room was open, which
 * catches files you edited yourself in another window and misses nothing it
 * should. These come from the session log's own mutation calls, so the link
 * between a file and the turn that wrote it is causal rather than coincidental.
 */
export interface SkillChatArtifact {
  readonly path: string
  readonly name: string
  readonly size: number
  readonly modifiedAt: number
  /** Session whose log recorded the producing call. */
  readonly sessionId: string
  /** Sequence number of that call, for pointing back at the conversation. */
  readonly seq: number
  /** When the call was made, which can predate the file's own mtime. */
  readonly producedAt: number
  /**
   * Opening of the assistant message that owns the call.
   *
   * The coordinator opens a relayed member result with `@name`, so this is what
   * lets the client name the member without the Host knowing about personas.
   */
  readonly speaker: string
  /** How many times these sessions wrote this same path. */
  readonly revisions: number
}

/** Produced files for one Room, newest first. */
export interface SkillChatArtifactValue {
  readonly files: readonly SkillChatArtifact[]
  /**
   * True when no session log could be read at all.
   *
   * The client then falls back to the modification-time scan rather than
   * claiming a Room produced nothing.
   */
  readonly unavailable: boolean
}

/** Start a temporary side conversation from the visible Room context. */
export interface SkillChatSidecarStartRequest {
  readonly sourceSessionId: string
  readonly workspaceId: string
  readonly roomTitle: string
  readonly roomSystemPrompt?: string
  readonly memberNames: readonly string[]
  readonly message: string
}

/** Continue one temporary side conversation. */
export interface SkillChatSidecarSendRequest {
  readonly sidecarId: string
  readonly message: string
}

/** One answer returned by a temporary side conversation. */
export interface SkillChatSidecarValue {
  readonly sidecarId: string
  readonly answer: string
}

export interface SkillChatPersonaDocument {
  readonly skillId: string
  readonly displayName: string
  readonly avatarId: string
  readonly originalName: string
  readonly roleLabel: string
  readonly bio: string
  readonly capabilities: readonly string[]
  readonly source: string
  readonly homepage?: string
  readonly repository?: string
  readonly customizedName: boolean
  readonly customizedAvatar: boolean
  readonly updatedAt: number
}

export interface SkillChatRoomDocument {
  readonly roomId: string
  readonly type: 'general' | 'direct' | 'group'
  readonly workspaceId: string
  readonly workspaceIds?: readonly string[]
  readonly avatarId?: string
  readonly title: string
  readonly memberIds: readonly string[]
  readonly coordinatorId: string
  readonly systemPrompt?: string
  /** Standing note prepended to every session started in this room. */
  readonly notice?: string
  readonly sessionIds: readonly string[]
  readonly activeSessionId?: string
  readonly createdAt: number
  readonly updatedAt: number
  readonly archivedAt?: number
  readonly pinnedAt?: number
  readonly order?: number
}

export interface SkillChatRoomSessionDocument {
  readonly roomSessionId: string
  readonly roomId: string
  readonly harnessSessionId: string
  readonly title: string
  readonly memberSnapshot: readonly {
    readonly skillId: string
    readonly displayName: string
    readonly avatarId: string
    readonly originalName: string
  }[]
  readonly createdAt: number
  readonly updatedAt: number
  readonly archivedAt?: number
}

export interface SkillChatAutomationDocument {
  readonly automationId: string
  readonly name: string
  readonly workspaceId: string
  readonly roomId: string
  readonly intent: 'research' | 'create' | 'review' | 'operate' | 'custom'
  readonly prompt: string
  readonly memberIds: readonly string[]
  readonly coordinatorId: string
  readonly schedule: { readonly kind: 'once'; readonly runAt: string }
    | { readonly kind: 'recurring'; readonly rule: string; readonly timezone: string }
  readonly lifecycle: 'run-once' | 'continuous'
  readonly status: 'active' | 'paused' | 'completed' | 'failed'
  readonly createdAt: number
  readonly updatedAt: number
  readonly lastRunAt?: number
  readonly nextRunAt?: number
}

/**
 * One recorded execution of an automation.
 *
 * Without these an automation that fired at 09:00 left nothing behind but a
 * session somewhere in the list: no way to see that it ran, that it failed, or
 * that its result has not been read. A schedule you cannot audit is a schedule
 * you stop trusting.
 */
export interface SkillChatAutomationRunDocument {
  readonly runId: string
  readonly automationId: string
  /** Copied at run time, so a renamed or deleted automation keeps its history readable. */
  readonly automationName: string
  readonly roomId: string
  readonly sessionId: string
  readonly startedAt: number
  readonly finishedAt?: number
  /**
   * `running` until the session settles. The Host cannot observe that itself —
   * the turn outlives the dispatch call — so the client closes the record out
   * from the session list it already watches.
   */
  readonly status: 'running' | 'done' | 'failed'
  /** Why the run never started, for a failure the Host caught before dispatch. */
  readonly error?: string
  /** Cleared when someone opens the run's session. */
  readonly unread: boolean
}

/** Versioned Skill Chat state persisted by the Host for all browser clients. */
export interface SkillChatStateDocument {
  /**
   * 3 keys members and personas by Skill name; 2 keyed them by contact id.
   *
   * The client migrates a version-2 document on load and writes 3 back, so the
   * Host stores whichever version the connected client last saved.
   */
  readonly version: 2 | 3
  readonly rooms: readonly SkillChatRoomDocument[]
  readonly roomSessions: readonly SkillChatRoomSessionDocument[]
  readonly personas: Readonly<Record<string, SkillChatPersonaDocument>>
  readonly automations: readonly SkillChatAutomationDocument[]
  /** Newest first; the Host trims this to a bound on every write. */
  readonly automationRuns?: readonly SkillChatAutomationRunDocument[]
  readonly migratedAt?: number
}

export interface SkillChatAutomationRunValue {
  readonly sessionId: string
  readonly state: SkillChatStateDocument
}

/** One Skill root, as reported to the settings panel. */
export interface SkillRootStatus {
  readonly id: string
  readonly label: string
  readonly path: string
  readonly layout: 'flat' | 'plugin-version'
  /** Whether the catalog is currently scanning this root for contacts. */
  readonly configured: boolean
  /** Skills found on this scan; 0 means the tool is absent or empty. */
  readonly count: number
  readonly exists: boolean
}

export interface SkillRootReport {
  readonly roots: readonly SkillRootStatus[]
  /** `$DSH_HOME/skills` — where linking makes a Skill runnable. */
  readonly linkDir: string
  /** Skill names already linked there. */
  readonly linked: readonly string[]
}

export interface SkillLinkRequest {
  /** Directory holding the Skill's `SKILL.md`. */
  readonly path: string
  /** Name to expose it under; also the link's filename. */
  readonly name: string
}

export interface SkillLinkValue {
  readonly name: string
  readonly source: string
  readonly target: string
}
