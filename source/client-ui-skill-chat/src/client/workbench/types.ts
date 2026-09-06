/**
 * The vocabulary the workbench and its owner share.
 *
 * Kept apart from both so the drawer can be rendered — and tested — without
 * pulling in the sidebar, and so the owner does not import from a module that
 * imports back.
 */
import type { MemberActivity } from '../SkillContactsBrowser.tsx'

export type ProjectToolKind = 'members' | 'artifacts' | 'files' | 'terminal' | 'diff' | 'browser'

export interface ProjectDirectoryListing {
  readonly path: string
  readonly root: string
  readonly parent?: string
  readonly entries: readonly ProjectEntry[]
}

export interface ProjectEntry {
  readonly name: string
  readonly path: string
  readonly kind: 'directory' | 'file'
  readonly hidden: boolean
}

export interface ProjectFilePreview {
  readonly path: string
  readonly name: string
  readonly content?: string
  readonly size: number
  readonly language: string
  readonly binary: boolean
  readonly truncated: boolean
}

/**
 * One file the room produced, and what produced it.
 *
 * `seq` and `speaker` are absent for a file that only the modification-time
 * scan found: that fallback knows a file changed, not who changed it, and
 * saying otherwise would be a guess dressed as provenance.
 */
export interface RoomArtifact {
  readonly path: string
  readonly name: string
  readonly size: number
  readonly modifiedAt: number
  readonly sessionId?: string
  readonly seq?: number
  readonly producedAt?: number
  readonly speaker?: string
  readonly revisions?: number
}

/** One earlier state of a produced file, from the workspace's git history. */
export interface ArtifactVersion {
  readonly ref: string
  readonly at: number
  readonly subject: string
}

export interface TerminalSnapshot {
  readonly terminalId: string
  readonly text: string
  readonly status: 'running' | 'exited'
  readonly truncated: boolean
  /** True while the command this panel sent has not settled. */
  readonly busy: boolean
  /** Lines the backend currently retains. */
  readonly totalLines: number
  /** Inclusive newest-relative offset of the first returned line. */
  readonly lineBegin: number
  /** Exclusive newest-relative offset after the returned page. */
  readonly lineEnd: number
}

export interface WorkbenchDrawerProps {
  readonly tool: ProjectToolKind
  readonly workspaceTitle: string
  readonly workspacePath: string
  readonly listing: ProjectDirectoryListing | null
  readonly file: ProjectFilePreview | null
  readonly error: string | null
  readonly terminal: TerminalSnapshot | null
  readonly terminalCommand: string
  readonly terminalBusy: boolean
  readonly browserUrl: string
  readonly members: readonly MemberActivity[]
  readonly coordinatorKey: string
  readonly unattributedWork: number
  readonly onMentionMember: (name: string) => void
  readonly onBroadcast: () => void
  readonly artifacts: readonly RoomArtifact[]
  readonly artifactsTraced: boolean
  readonly onArtifactOrigin: (artifact: RoomArtifact) => string | null
  readonly history: { readonly available: boolean; readonly versions: readonly ArtifactVersion[]; readonly dirty: boolean } | null
  readonly diff: string | null
  readonly onArtifactDiff: (from: string, to?: string) => void
  readonly onCloseArtifactDiff: () => void
  readonly artifactsBusy: boolean
  readonly artifactRestOpen: boolean
  readonly fileQuery: string
  readonly onFileQuery: (value: string) => void
  readonly fileHits: readonly { readonly path: string; readonly name: string; readonly line?: string }[]
  readonly terminals: readonly { readonly id: string; readonly label: string }[]
  readonly activeTerminalId: string | null
  readonly onAddTerminal: () => void
  readonly onSelectTerminal: (terminalId: string) => void
  readonly onCloseTerminal: (terminalId: string) => void
  readonly onFileMenu: (menu: { path: string; name: string; kind: 'file' | 'directory'; x: number; y: number }) => void
  readonly openFiles: readonly ProjectFilePreview[]
  readonly onCloseFile: (path: string) => void
  readonly expandedDirs: readonly string[]
  readonly dirListings: Readonly<Record<string, readonly ProjectEntry[]>>
  readonly onToggleDirectory: (path: string) => void
  readonly onToggleArtifactRest: () => void
  readonly renderedFile: boolean
  readonly onToggleRendered: () => void
  readonly onRevealFile: (path: string) => void
  readonly browserDraft: string
  readonly canGoBack: boolean
  readonly canGoForward: boolean
  readonly browserKey: number
  readonly onClose: () => void
  readonly onBrowse: (path: string | undefined) => void
  readonly onPreviewFile: (path: string) => void
  readonly onTerminalCommand: (value: string) => void
  readonly onTerminalSubmit: () => void
  readonly onTerminalInterrupt: () => void
  readonly onTerminalLoadEarlier: () => void
  readonly terminalHistory: readonly string[]
  readonly terminalEarlier: string
  readonly terminalHasEarlier: boolean
  readonly onBrowserDraft: (value: string) => void
  readonly onBrowserNavigate: (value: string) => void
  readonly onBrowserBack: () => void
  readonly onBrowserForward: () => void
  readonly onBrowserRefresh: () => void
}

/** One rendered line of a unified diff. */
export interface DiffLine {
  readonly kind: 'file' | 'hunk' | 'add' | 'remove' | 'context' | 'meta'
  readonly text: string
}

/**
 * Split unified-diff text into typed lines.
 *
 * The diff arrives as raw terminal output — the command that produced it, a
 * shell prompt and `git diff --stat` all sit above the patch — so everything
 * before the first `diff --git` or `@@` is treated as a preamble and kept as
 * meta rather than being mistaken for context.
 * @param text - raw terminal output.
 * @returns the typed lines, in order.
 */
/**
 * Branch actions for one finalized assistant message.
 *
 * The Harness Session log is append-only: there is no truncate and no delete,
 * so "go back to here" cannot mean erasing what followed. It means cutting a
 * fork at that message — the Host's own `fork({ atSeq })`, which copies the
 * prefix into a child Session. The trace follows for free, because the child
 * only ever held those events.
 *
 * Two entries rather than one because the intent differs, and the Host already
 * encodes the difference: reverting continues the same thread from an earlier
 * point and keeps the title, while branching is a deliberate parallel attempt
 * and takes a numbered one (`increaseTitle`). Both leave the original in the
 * room's history, so a fork taken by mistake costs nothing.
 */
/**
 * Who in this room is working, shown above the composer.
 *
 * A group of Skills used to look identical whether three members were running
 * in parallel or nothing was happening at all. This is the one always-visible
 * signal that the room is alive, which is why it is also the only place in the
 * product that animates.
 * @param props - the session this strip belongs to.
 * @returns the strip, or null when nothing is running.
 */

/**
 * Render a unified diff.
 * @param props - the raw diff text.
 * @returns the coloured patch, or an empty state when there is nothing to show.
 */
export interface TerminalPaneProps {
  readonly terminal: TerminalSnapshot | null
  readonly busy: boolean
  readonly error: string | null
  readonly command: string
  readonly earlier: string
  readonly hasEarlier: boolean
  readonly history: readonly string[]
  readonly onCommand: (value: string) => void
  readonly onSubmit: () => void
  readonly onInterrupt: () => void
  readonly onLoadEarlier: () => void
}

/**
 * The live terminal surface: scrollback, run state, and the input line.
 *
 * Three things separate this from the `<pre>` it replaced. Output is polled, so
 * it grows while a command runs instead of appearing once at the end. The tail
 * is followed only while the reader is already at the bottom — otherwise
 * scrolling up to read a stack trace would be yanked back on the next poll.
 * And a running command can be stopped, which previously had no route at all.
 * @param props - the current snapshot and the panel's callbacks.
 * @returns the terminal pane.
 */
