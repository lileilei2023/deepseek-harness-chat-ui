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

/** Current terminal identity and bounded scrollback. */
export interface SkillChatTerminalValue {
  readonly terminalId: string
  readonly text: string
  readonly status: 'running' | 'exited'
  readonly truncated: boolean
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
  readonly sessionIds: readonly string[]
  readonly activeSessionId?: string
  readonly createdAt: number
  readonly updatedAt: number
  readonly archivedAt?: number
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

/** Versioned Skill Chat state persisted by the Host for all browser clients. */
export interface SkillChatStateDocument {
  readonly version: 2
  readonly rooms: readonly SkillChatRoomDocument[]
  readonly roomSessions: readonly SkillChatRoomSessionDocument[]
  readonly personas: Readonly<Record<string, SkillChatPersonaDocument>>
  readonly automations: readonly SkillChatAutomationDocument[]
  readonly migratedAt?: number
}

export interface SkillChatAutomationRunValue {
  readonly sessionId: string
  readonly state: SkillChatStateDocument
}
