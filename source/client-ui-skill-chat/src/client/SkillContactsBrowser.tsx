/* oxlint-disable @stylistic/max-len, @stylistic/arrow-parens, @stylistic/indent */
import { useDeferredValue, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { WorkspaceId } from '@deepseek-ai/dsh-api-workspace-controller/client'
import type { PropsLocale, PropsRenderSlots, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import {
  HoverCard,
  IconBranchOutline16,
  IconCodeOutline16,
  IconFolderOpenOutline16,
  IconGlobeOutline14,
  IconNewChatOutline16,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import { randomUUID } from '@deepseek-ai/dsh-util-crypto'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-workspace/client'
import {
  ANIMAL_AVATARS, EMPTY_SKILL_CHAT_STATE, activeHarnessSession, defaultPersona, ensurePersonas,
  migrateLegacyState, roomForSession, type AutomationDefinition, type ChatRoom, type RoomSession,
  type SkillChatState, type SkillPersona,
} from './model.ts'
import type {} from './shell/slots.ts'
import { Avatar, AvatarStack, Button, ChatBubble, Dialog, Drawer, EmptyState, IconButton, RoomRow, WorkbenchPanel } from './ui/index.tsx'
// Token layer first: every module stylesheet below resolves its colours, type
// steps and radii from it, and the dark scheme is a token swap alone.
import './theme.css'
import css from './SkillContactsBrowser.module.css'

type View = 'chats' | 'contacts' | 'automations'
type ContactList = 'frequent' | 'all'
type ContactMode = 'persona' | 'raw'
type ProjectToolKind = 'files' | 'terminal' | 'diff' | 'browser'

interface ProjectDirectoryListing {
  readonly path: string
  readonly root: string
  readonly parent?: string
  readonly entries: readonly { readonly name: string; readonly path: string; readonly kind: 'directory' | 'file'; readonly hidden: boolean }[]
}

interface ProjectFilePreview {
  readonly path: string
  readonly name: string
  readonly content?: string
  readonly size: number
  readonly language: string
  readonly binary: boolean
  readonly truncated: boolean
}

interface TerminalSnapshot {
  readonly terminalId: string
  readonly text: string
  readonly status: 'running' | 'exited'
  readonly truncated: boolean
}

interface SidecarMessage {
  readonly id: string
  readonly role: 'user' | 'assistant'
  readonly text: string
}

export interface SkillContact {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly whenToUse?: string
  readonly source: 'harness' | 'workbuddy' | 'skills-sh'
  readonly sourceLabel: string
  /** Short provenance badge; falls back to the source discriminator. */
  readonly sourceShort?: string
  readonly invocable: boolean
  readonly modelInvocable: boolean
  readonly plugin?: string
  readonly version?: string
  readonly installs?: number
  readonly homepage?: string
  readonly repository?: string
}

export interface ExternalSkillContact {
  readonly id: string
  readonly skillId: string
  readonly name: string
  readonly source: string
  readonly installs: number
  readonly description?: string
  readonly homepage?: string
  readonly repository?: string
}

export interface ContactGroup {
  readonly id: string
  readonly name: string
  readonly members: readonly SkillContact[]
  readonly leaderId: string
  readonly systemPrompt?: string
  readonly workspaceId?: WorkspaceId
  readonly createdAt: number
}

export interface ChatBinding {
  readonly name: string
  readonly avatar: string
  readonly kind: 'contact' | 'group'
  readonly members: readonly SkillContact[]
  readonly groupId?: string
  readonly roomId?: string
}

interface SkillContactsInjected {
  loadContacts: (sessionId: SessionId | undefined, signal: AbortSignal) => Promise<readonly SkillContact[]>
  searchExternal: (query: string, signal: AbortSignal) => Promise<readonly ExternalSkillContact[]>
  installExternal: (workspaceId: WorkspaceId, contact: ExternalSkillContact, signal: AbortSignal) => Promise<SkillContact>
  openSession: (sessionId: SessionId) => void
  renameSession: (sessionId: SessionId, name: string) => Promise<void>
  startSession: (workspaceId: WorkspaceId) => Promise<SessionId>
  addWorkspace: () => Promise<WorkspaceId | null>
  chooseContact: (sessionId: SessionId, contact: SkillContact, displayName: string) => Promise<void>
  chooseGroup: (sessionId: SessionId, group: ContactGroup, displayNames: readonly string[]) => Promise<void>
  loadState: (signal: AbortSignal) => Promise<SkillChatState>
  saveState: (state: SkillChatState, signal: AbortSignal) => Promise<void>
  runAutomation: (automationId: string, signal: AbortSignal) => Promise<{ readonly sessionId: SessionId; readonly state: SkillChatState }>
  browseProject: (workspaceId: WorkspaceId, path: string | undefined, signal: AbortSignal) => Promise<ProjectDirectoryListing>
  readProjectFile: (workspaceId: WorkspaceId, path: string, signal: AbortSignal) => Promise<ProjectFilePreview>
  openTerminal: (sessionId: SessionId, workspaceId: WorkspaceId, signal: AbortSignal) => Promise<TerminalSnapshot>
  sendTerminal: (sessionId: SessionId, terminalId: string, command: string, signal: AbortSignal) => Promise<TerminalSnapshot>
  closeTerminal: (sessionId: SessionId, terminalId: string) => Promise<void>
  startSidecar: (request: {
    readonly sourceSessionId: SessionId
    readonly workspaceId: WorkspaceId
    readonly roomTitle: string
    readonly roomSystemPrompt?: string
    readonly memberNames: readonly string[]
    readonly message: string
  }, signal: AbortSignal) => Promise<{ readonly sidecarId: string; readonly answer: string }>
  sendSidecar: (sidecarId: string, message: string, signal: AbortSignal) => Promise<{ readonly sidecarId: string; readonly answer: string }>
  closeSidecar: (sidecarId: string) => Promise<void>
}

type SkillContactsBrowserProps = PropsRuntime<'sidebar.workspaces'>
  & PropsRenderSlots<
    | 'ds-chat.sidebar.before-rooms'
    | 'ds-chat.sidebar.after-rooms'
    | 'ds-chat.room.header.actions'
    | 'ds-chat.room.drawer'
    | 'ds-chat.composer.before'
    | 'ds-chat.composer.actions'
    | 'ds-chat.message.artifact'
    | 'ds-chat.settings.section'
  >
  & SkillContactsInjected & PropsLocale<'skillChat'>

export const FAVORITES_KEY = 'dsh.skill-chat.favorites.v1'
export const GROUPS_KEY = 'dsh.skill-chat.groups.v1'
export const EXTERNAL_KEY = 'dsh.skill-chat.external.v1'
export const MODE_KEY = 'dsh.skill-chat.mode.v1'
export const CHAT_BINDINGS_KEY = 'dsh.skill-chat.bindings.v1'
export const STATE_KEY = 'dsh.skill-chat.state.v2'
const LEGACY_CHAT_IDENTITIES_KEY = 'dsh.skill-chat.identities.v1'
const WORKSPACE_KEY = 'dsh.skill-chat.workspace.v1'

export function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : JSON.parse(value) as T
  } catch {
    return fallback
  }
}

function store(key: string, value: unknown): void {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

/**
 * Compact list timestamp, the way a message list shows one: a time for today,
 * a weekday inside the last week, a date beyond that. Formatting goes through
 * `Intl` so it follows the viewer's locale instead of a hardcoded pattern.
 * @param value - epoch milliseconds.
 * @returns the shortest label that still disambiguates.
 */
function roomTime(value: number): string {
  const then = new Date(value)
  const now = new Date()
  const sameDay = then.toDateString() === now.toDateString()
  if (sameDay) return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(then)
  if (now.getTime() - value < 6 * 24 * 60 * 60 * 1000) {
    return new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(then)
  }
  return new Intl.DateTimeFormat(undefined, { month: 'numeric', day: 'numeric' }).format(then)
}

function hashOf(value: string): number {
  let hash = 0
  for (const char of value) hash = ((hash * 31) + (char.codePointAt(0) ?? 0)) >>> 0
  return hash
}

function AnimalAvatar({ avatarId, label, seed, small = false }: { readonly avatarId: string; readonly label: string; readonly seed?: string; readonly small?: boolean }): React.JSX.Element {
  return <Avatar avatarId={avatarId} label={label} {...seed === undefined ? {} : { seed }} size={small ? 30 : 40}/>
}

export function persona(contact: SkillContact): { name: string; avatar: string } {
  const identity = defaultPersona(contact, 0)
  return { name: identity.displayName, avatar: identity.avatarId }
}

export function displayOf(
  contact: SkillContact,
  mode: ContactMode,
  personas: Readonly<Record<string, SkillPersona>> = {},
): { name: string; avatar: string } {
  const identity = personas[contact.id] ?? defaultPersona(contact, 0)
  return { name: mode === 'persona' ? identity.displayName : contact.name, avatar: identity.avatarId }
}

function matches(skill: SkillContact, query: string, personas: Readonly<Record<string, SkillPersona>>): boolean {
  if (query.length === 0) return true
  const human = personas[skill.id]?.displayName ?? persona(skill).name
  return query.split(/\s+/u).every(token => `${skill.name}\n${human}\n${skill.description}\n${skill.whenToUse ?? ''}\n${skill.sourceLabel}`.toLocaleLowerCase().includes(token))
}

function storedGroups(): readonly ContactGroup[] {
  return readStored<readonly ContactGroup[]>(GROUPS_KEY, []).flatMap((group) => {
    const first = group.members[0]
    return first === undefined ? [] : [{ ...group, leaderId: group.leaderId || first.id }]
  })
}

function storedBindings(): Readonly<Record<string, ChatBinding>> {
  const current = readStored<Readonly<Record<string, ChatBinding>>>(CHAT_BINDINGS_KEY, {})
  if (Object.keys(current).length > 0) return current
  const legacy = readStored<Readonly<Record<string, { name: string; avatar: string }>>>(LEGACY_CHAT_IDENTITIES_KEY, {})
  return Object.fromEntries(Object.entries(legacy).map(([sessionId, identity]) => [sessionId, { ...identity, kind: 'contact' as const, members: [] }]))
}

export function responderForMessage(members: readonly SkillContact[], leaderId: string | undefined, text: string, mode: ContactMode): SkillContact | undefined {
  const mentioned = members.filter((member) => {
    const display = displayOf(member, mode)
    return text.includes(`@${display.name}`) || text.includes(`@${member.name}`)
  })
  return mentioned.length === 1 ? mentioned[0] : members.find(member => member.id === leaderId) ?? members[0]
}

export function bindLegacyGroups(groups: readonly ContactGroup[], workspaceId: WorkspaceId): readonly ContactGroup[] {
  return groups.some(group => group.workspaceId === undefined)
    ? groups.map(group => group.workspaceId === undefined ? { ...group, workspaceId } : group)
    : groups
}

export function groupsForWorkspace(groups: readonly ContactGroup[], workspaceId: WorkspaceId | undefined): readonly ContactGroup[] {
  return groups.filter(group => group.workspaceId === workspaceId)
}

function roomGroup(room: ChatRoom, contacts: readonly SkillContact[]): ContactGroup {
  const members = room.memberIds.flatMap(id => contacts.find(contact => contact.id === id) ?? [])
  return { id: room.roomId.replace('room:group:', ''), name: room.title, members, leaderId: room.coordinatorId, ...(room.systemPrompt === undefined ? {} : { systemPrompt: room.systemPrompt }), workspaceId: room.workspaceId, createdAt: room.createdAt }
}

function generatedGroupPrompt(name: string, members: readonly SkillContact[]): string {
  const roster = members.map(member => `- ${member.name}：${member.description}`).join('\n')
  return `你是「${name || '协作群组'}」的协调者。根据用户目标组织以下 Skill 协作，优先给出明确、可执行且可验证的结果。\n\n成员能力：\n${roster}\n\n工作规则：没有明确 @ 时由协调者拆解任务并选择合适成员；有 @ 时优先由指定成员处理；不要声称发生了真实并行执行。`
}

function GroupAvatar({ avatarId, label, small = false }: { readonly avatarId: string; readonly label: string; readonly small?: boolean }): React.JSX.Element {
  return <span className={css.groupAvatar} data-small={small || undefined}>
    <Avatar avatarId={avatarId} label={label} size={small ? 32 : 46}/>
    <span className={css.groupMark} aria-hidden="true">●●</span>
  </span>
}

interface HeaderBridgeValue {
  readonly sessionId: SessionId
  readonly room: ChatRoom
  readonly roomSessions: readonly RoomSession[]
  readonly workspaceTitle: string
  readonly coordinatorName?: string
  readonly memberPersonas: readonly { readonly id: string; readonly name: string; readonly avatarId: string }[]
  readonly headerActions: React.ReactNode
  readonly onHistory: (session: RoomSession) => void
  readonly onNewSession: () => void
  readonly onSettings: () => void
  readonly onProjectTool: (tool: ProjectToolKind) => void
  readonly onTemporaryChat: () => void
}

let headerBridgeValue: HeaderBridgeValue | null = null
const headerBridgeListeners = new Set<() => void>()

function publishHeaderBridge(value: HeaderBridgeValue | null): void {
  headerBridgeValue = value
  for (const listener of headerBridgeListeners) listener()
}

function useHeaderBridge(): HeaderBridgeValue | null {
  return useSyncExternalStore(
    listener => { headerBridgeListeners.add(listener); return () => { headerBridgeListeners.delete(listener) } },
    () => headerBridgeValue,
    () => null,
  )
}

/**
 * Who this room is, for the conversation header.
 *
 * Registered on the shell's `conversation.session.header.lineage` slot, which
 * the shell renders in place of the plain text title. A chat client answers
 * "who am I talking to" at the top of the room — the members' faces and how
 * many there are — and the plugin already knows all of it.
 * @param props - the session being displayed.
 * @returns the identity block, or null when this session is not a DS Chat room.
 */
export function SkillChatHeaderTools({ sessionId }: { readonly sessionId: SessionId }): React.JSX.Element | null {
  const bridge = useHeaderBridge()
  const [historyOpen, setHistoryOpen] = useState(false)
  const [workbenchOpen, setWorkbenchOpen] = useState(false)
  if (bridge === null || bridge.sessionId !== sessionId) return null
  const room = bridge.room
  const history = room.sessionIds.toReversed().flatMap(id => bridge.roomSessions.find(item => item.roomSessionId === id) ?? [])
  // Files, terminal, diff and browser are a workbench, not chat actions. Four
  // unlabelled glyphs competing with three text buttons made the room header
  // read as a toolbar; behind one labelled entry they read as what they are.
  const workbenchItems: readonly { readonly tool: ProjectToolKind, readonly label: string, readonly icon: React.JSX.Element }[] = [
    { tool: 'files', label: '项目文件', icon: <IconFolderOpenOutline16/> },
    { tool: 'terminal', label: '终端', icon: <IconCodeOutline16/> },
    { tool: 'diff', label: '查看 Diff', icon: <IconBranchOutline16/> },
    { tool: 'browser', label: '浏览器', icon: <IconGlobeOutline14/> },
  ]
  const detail = room.type === 'group'
    ? `${room.memberIds.length} 名成员 · ${bridge.coordinatorName ?? '协调者'} 协调`
    : `${bridge.workspaceTitle} · 直接对话`
  return <div className={css.headerTools}>
    <span className={css.headerIdentity}>
      <AvatarStack className={css.headerAvatarStack} overlap={9}>{bridge.memberPersonas.slice(0, 4).map((member, index) => <span key={member.id} style={{ zIndex: 5 - index }}><Avatar avatarId={member.avatarId} label={member.name} seed={member.id} size={24}/></span>)}</AvatarStack>
      <span className={css.headerIdentityCopy}><strong>{room.title}</strong><small>{detail}</small></span>
    </span>
      <span className={css.headerActionsCluster}>
      <span className={css.headerMenuWrap}>
        <button className={css.headerTextButton} type="button" aria-expanded={workbenchOpen} onClick={() => { setWorkbenchOpen(open => !open) }}>工作台</button>
        {workbenchOpen ? <span className={css.headerMenu}>{workbenchItems.map(item => <button type="button" key={item.tool} onClick={() => { setWorkbenchOpen(false); bridge.onProjectTool(item.tool) }}>{item.icon}<span>{item.label}</span></button>)}<span className={css.headerMenuSep}/><button type="button" onClick={() => { setWorkbenchOpen(false); bridge.onTemporaryChat() }}><IconNewChatOutline16/><span>临时对话</span></button></span> : null}
      </span>
        <span className={css.headerDivider}/>
        {bridge.headerActions}
        {room.type === 'group' ? <button className={css.headerTextButton} type="button" onClick={bridge.onSettings}>成员与职能</button> : null}
      <span className={css.headerMenuWrap}>
        <button className={css.headerTextButton} type="button" aria-expanded={historyOpen} onClick={() => { setHistoryOpen(open => !open) }}>历史 {history.length}</button>
        {historyOpen ? <span className={css.headerMenu}>{history.map(item => { const current = item.harnessSessionId === sessionId; return <button type="button" data-active={current} disabled={current} key={item.roomSessionId} onClick={() => { bridge.onHistory(item); setHistoryOpen(false) }}><span>{item.title}</span><small>{current ? '当前对话' : new Date(item.updatedAt).toLocaleString()}</small></button> })}{history.length <= 1 ? <span className={css.headerMenuHint}>这个房间还只有一段对话。用「＋ 新对话」开始新的一段，旧的会留在这里。</span> : null}</span> : null}
      </span>
      <Button className={css.headerNewButton} variant="primary" size="small" onClick={bridge.onNewSession}>＋ 新对话</Button>
    </span>
  </div>
}

interface WorkbenchDrawerProps {
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
  readonly browserDraft: string
  readonly canGoBack: boolean
  readonly canGoForward: boolean
  readonly browserKey: number
  readonly onClose: () => void
  readonly onBrowse: (path: string | undefined) => void
  readonly onPreviewFile: (path: string) => void
  readonly onTerminalCommand: (value: string) => void
  readonly onTerminalSubmit: () => void
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
export function parseDiff(text: string): readonly DiffLine[] {
  const lines = text.replace(/\r/gu, '').split('\n')
  const start = lines.findIndex(line => line.startsWith('diff --git') || line.startsWith('@@'))
  const body = start < 0 ? [] : lines.slice(start)
  const preamble = (start < 0 ? lines : lines.slice(0, start)).filter(line => line.trim() !== '')
  return [
    ...preamble.map((line): DiffLine => ({ kind: 'meta', text: line })),
    ...body.flatMap((line): readonly DiffLine[] => {
      if (line.startsWith('diff --git')) return [{ kind: 'file', text: line.replace(/^diff --git a\/(\S+) b\/\S+$/u, '$1') }]
      if (line.startsWith('@@')) return [{ kind: 'hunk', text: line }]
      if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('index ')
        || line.startsWith('new file') || line.startsWith('deleted file')
        || line.startsWith('similarity ') || line.startsWith('rename ')) return []
      if (line.startsWith('+')) return [{ kind: 'add', text: line.slice(1) }]
      if (line.startsWith('-')) return [{ kind: 'remove', text: line.slice(1) }]
      return [{ kind: 'context', text: line.startsWith(' ') ? line.slice(1) : line }]
    }),
  ]
}

/**
 * Render a unified diff.
 * @param props - the raw diff text.
 * @returns the coloured patch, or an empty state when there is nothing to show.
 */
function DiffView({ text }: { readonly text: string }): React.JSX.Element {
  const lines = useMemo(() => parseDiff(text), [text])
  const changes = lines.filter(line => line.kind === 'add' || line.kind === 'remove').length
  const patched = lines.some(line => line.kind === 'file' || line.kind === 'hunk')
  if (text.includes('__DSCHAT_NO_REPO__')) {
    return <EmptyState className={css.drawerEmpty} title="这个项目不在 Git 仓库里">「查看 Diff」比较的是工作区里未提交的改动，需要项目本身是一个 Git 仓库。</EmptyState>
  }
  // Without a patch there is nothing to colour, and dumping the raw preamble —
  // a prompt echo, or git's own usage text — is worse than saying so plainly.
  if (!patched) return <EmptyState className={css.drawerEmpty} title="没有未提交的改动">当前工作区是干净的。</EmptyState>
  return <div className={css.diffView}>
    <div className={css.diffSummary}>{changes} 行改动</div>
    <div className={css.diffBody}>
      {lines.map((line, index) => <div className={css.diffLine} data-kind={line.kind} key={index}>
        <span className={css.diffGutter}>{line.kind === 'add' ? '+' : line.kind === 'remove' ? '−' : ''}</span>
        <span className={css.diffText}>{line.text || '\u00a0'}</span>
      </div>)}
    </div>
  </div>
}

/** Human-readable byte size for a directory listing. */
function fileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function WorkbenchDrawer(props: WorkbenchDrawerProps): React.JSX.Element {
  const title = props.tool === 'files' ? '项目文件' : props.tool === 'terminal' ? '终端' : props.tool === 'diff' ? '代码变更' : '浏览器'
  return <Drawer className={css.workbenchDrawer} label={title} onClose={props.onClose}>
    <WorkbenchPanel>
      <header className={css.workbenchHeader}>
        <span className={css.projectPanelIcon}>{props.tool === 'files' ? <IconFolderOpenOutline16/> : props.tool === 'terminal' ? <IconCodeOutline16/> : props.tool === 'diff' ? <IconBranchOutline16/> : <IconGlobeOutline14/>}</span>
        <span><strong>{title}</strong><small>{props.workspaceTitle}</small></span>
        <IconButton className={css.close} variant="ghost" aria-label="关闭" onClick={props.onClose}>×</IconButton>
      </header>
      {props.tool === 'files' ? <div className={css.fileWorkbench}>
        <div className={css.fileBrowser}>
          <nav className={css.pathBar} aria-label="路径">{(() => {
            const current = props.listing?.path ?? props.workspacePath
            const relative = current.startsWith(props.workspacePath) ? current.slice(props.workspacePath.length).replace(/^\//u, '') : current
            const parts = relative === '' ? [] : relative.split('/')
            return <>
              <button type="button" onClick={() => { props.onBrowse(undefined) }}>{props.workspaceTitle}</button>
              {parts.map((part, index) => <span key={`${part}-${index}`}>
                <b>/</b>
                <button type="button" onClick={() => { props.onBrowse(`${props.workspacePath}/${parts.slice(0, index + 1).join('/')}`) }}>{part}</button>
              </span>)}
            </>
          })()}</nav>
          <div className={css.projectFileList}>
            {props.error !== null ? <div className={css.status}>{props.error}</div> : props.listing === null ? <div className={css.status}>正在读取目录…</div> : <>
              {props.listing.parent === undefined ? null : <button type="button" onClick={() => { props.onBrowse(props.listing?.parent) }}><IconFolderOpenOutline16/><span>.. 返回上级</span></button>}
              {props.listing.entries.filter(entry => !entry.hidden).toSorted((left, right) => left.kind === right.kind ? left.name.localeCompare(right.name) : left.kind === 'directory' ? -1 : 1).map(entry => <button type="button" data-selected={props.file?.path === entry.path || undefined} key={entry.path} onClick={() => { if (entry.kind === 'directory') props.onBrowse(entry.path); else props.onPreviewFile(entry.path) }}>{entry.kind === 'directory' ? <IconFolderOpenOutline16/> : <IconCodeOutline16/>}<span>{entry.name}</span></button>)}
            </>}
          </div>
        </div>
        <div className={css.filePreview}>
          {props.file === null ? <div className={css.drawerEmpty}>选择文件即可在这里预览</div> : <><div className={css.filePreviewMeta}><strong>{props.file.name}</strong><small>{props.file.language} · {fileSize(props.file.size)}{props.file.truncated ? ' · 已截断' : ''}</small></div>{props.file.binary ? <div className={css.drawerEmpty}>这是二进制文件，无法直接预览。</div> : <div className={css.filePreviewBody}>{(props.file.content ?? '').split('\n').map((line, index) => <div className={css.codeLine} key={index}><span className={css.codeLineNo}>{index + 1}</span><span className={css.codeLineText}>{line || '\u00a0'}</span></div>)}</div>}</>}
        </div>
      </div> : null}
      {props.tool === 'diff' ? <div className={css.diffWorkbench}>
        {props.error !== null ? <div className={css.status}>{props.error}</div>
          : props.terminalBusy && props.terminal === null ? <div className={css.status}>正在读取改动…</div>
          : <DiffView text={props.terminal?.text ?? ''}/>}
      </div> : null}
      {props.tool === 'terminal' ? <div className={css.terminalWorkbench}>
        <pre className={css.terminalOutput} ref={element => { if (element !== null) element.scrollTop = element.scrollHeight }}>{props.error ?? props.terminal?.text ?? (props.terminalBusy ? '正在启动终端…' : '终端尚未启动')}</pre>
        {props.tool === 'terminal' ? <form className={css.terminalComposer} onSubmit={event => { event.preventDefault(); props.onTerminalSubmit() }}><span>$</span><input value={props.terminalCommand} onChange={event => { props.onTerminalCommand(event.target.value) }} placeholder="输入命令，例如 pnpm test…" aria-label="终端命令" autoComplete="off" spellCheck={false} autoFocus/><button type="submit" disabled={props.terminalBusy || props.terminal === null}>运行</button></form> : <div className={css.workbenchFootnote}>显示当前项目的真实 `git diff` 输出。</div>}
      </div> : null}
      {props.tool === 'browser' ? <div className={css.browserWorkbench}>
        <form className={css.browserBar} onSubmit={event => { event.preventDefault(); props.onBrowserNavigate(props.browserDraft) }}>
          <button type="button" disabled={!props.canGoBack} onClick={props.onBrowserBack}>←</button>
          <button type="button" disabled={!props.canGoForward} onClick={props.onBrowserForward}>→</button>
          <button type="button" onClick={props.onBrowserRefresh}>↻</button>
          <input value={props.browserDraft} onChange={event => { props.onBrowserDraft(event.target.value) }} aria-label="浏览器地址"/>
          <button type="submit">打开</button>
        </form>
        <iframe key={props.browserKey} className={css.browserFrame} src={props.browserUrl} title="项目浏览器预览" sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"/>
        <div className={css.workbenchFootnote}>若目标页面禁止嵌入，可在新窗口打开：<a href={props.browserUrl} target="_blank" rel="noreferrer">{props.browserUrl}</a></div>
      </div> : null}
    </WorkbenchPanel>
  </Drawer>
}

interface SidecarDrawerProps {
  readonly roomTitle: string
  readonly messages: readonly SidecarMessage[]
  readonly draft: string
  readonly busy: boolean
  readonly error: string | null
  readonly onDraft: (value: string) => void
  readonly onSubmit: () => void
  readonly onClose: () => void
}

function SidecarDrawer(props: SidecarDrawerProps): React.JSX.Element {
  return <Drawer className={css.sidecarDrawer} label="临时对话" onClose={props.onClose}>
    <header className={css.sidecarHeader}><span><strong>临时对话</strong><small>基于「{props.roomTitle}」当前上下文，不影响主会话</small></span><IconButton className={css.close} variant="ghost" aria-label="关闭" onClick={props.onClose}>×</IconButton></header>
    <div className={css.sidecarMessages}>{props.messages.length === 0 ? <EmptyState className={css.sidecarWelcome} title="开一条旁路思路">可以追问、比较方案或验证细节；主对话会保持原位。</EmptyState> : props.messages.map(message => <ChatBubble className={css.sidecarMessage} role={message.role} key={message.id}>{message.text}</ChatBubble>)}{props.busy ? <div className={css.sidecarThinking}>正在思考…</div> : null}{props.error === null ? null : <div className={css.sidecarError}>{props.error}</div>}</div>
    <form className={css.sidecarComposer} onSubmit={event => { event.preventDefault(); props.onSubmit() }}><textarea value={props.draft} onChange={event => { props.onDraft(event.target.value) }} placeholder="在当前上下文旁边继续问…" aria-label="旁路提问" autoComplete="off"/><Button variant="primary" type="submit" disabled={props.busy || props.draft.trim() === ''}>发送</Button></form>
  </Drawer>
}

export function SkillContactsBrowser(props: SkillContactsBrowserProps): React.JSX.Element {
  const {
    wide, expandSidebar, useSessions, useWorkspaces, loadContacts, searchExternal, openSession, renameSession,
    startSession, addWorkspace, chooseContact, chooseGroup, loadState, saveState, runAutomation: runAutomationRemote,
    browseProject, readProjectFile, openTerminal, sendTerminal, closeTerminal, startSidecar, sendSidecar, closeSidecar, renderSlot, t,
  } = props
  const sessions = useSessions(value => value)
  const workspaces = useWorkspaces(value => value)
  const [view, setView] = useState<View>('chats')
  const [contactList, setContactList] = useState<ContactList>('frequent')
  const [mode, setMode] = useState<ContactMode>(() => readStored<ContactMode>(MODE_KEY, 'persona'))
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase())
  const [contacts, setContacts] = useState<readonly SkillContact[]>([])
  const [externalJoined, setExternalJoined] = useState<readonly SkillContact[]>(() => readStored(EXTERNAL_KEY, []))
  const [externalResults, setExternalResults] = useState<readonly ExternalSkillContact[]>([])
  const [favorites, setFavorites] = useState<readonly string[]>(() => readStored(FAVORITES_KEY, []))
  const [groups, setGroups] = useState<readonly ContactGroup[]>(storedGroups)
  const [chatBindings, setChatBindings] = useState<Readonly<Record<string, ChatBinding>>>(storedBindings)
  const [state, setState] = useState<SkillChatState>(() => readStored(STATE_KEY, EMPTY_SKILL_CHAT_STATE))
  const stateRef = useRef(state)
  const [workspaceId, setWorkspaceId] = useState<WorkspaceId | undefined>(() => {
    return readStored<WorkspaceId | null>(WORKSPACE_KEY, null) ?? undefined
  })
  const [selected, setSelected] = useState<SkillContact | null>(null)
  const [editingPersona, setEditingPersona] = useState(false)
  const [personaName, setPersonaName] = useState('')
  const [personaAvatar, setPersonaAvatar] = useState('fox-coral')
  const [groupOpen, setGroupOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [groupMoreOpen, setGroupMoreOpen] = useState(false)
  const [archiveConfirm, setArchiveConfirm] = useState<string | null>(null)
  const [groupName, setGroupName] = useState('')
  const [groupPrompt, setGroupPrompt] = useState('')
  const [groupAvatar, setGroupAvatar] = useState('bear-honey')
  const [groupMembers, setGroupMembers] = useState<readonly string[]>([])
  const [groupWorkspaceIds, setGroupWorkspaceIds] = useState<readonly WorkspaceId[]>([])
  const [memberQuery, setMemberQuery] = useState('')
  const deferredMemberQuery = useDeferredValue(memberQuery.trim().toLocaleLowerCase())
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [roomSettingsOpen, setRoomSettingsOpen] = useState(false)
  const [roomTitleDraft, setRoomTitleDraft] = useState('')
  const [roomPromptDraft, setRoomPromptDraft] = useState('')
  const [roomAvatarDraft, setRoomAvatarDraft] = useState('bear-honey')
  const [roomWorkspaceIds, setRoomWorkspaceIds] = useState<readonly WorkspaceId[]>([])
  const [projectTool, setProjectTool] = useState<ProjectToolKind | null>(null)
  const [projectListing, setProjectListing] = useState<ProjectDirectoryListing | null>(null)
  const [projectListingError, setProjectListingError] = useState<string | null>(null)
  const [projectFile, setProjectFile] = useState<ProjectFilePreview | null>(null)
  const [terminal, setTerminal] = useState<TerminalSnapshot | null>(null)
  const [terminalCommand, setTerminalCommand] = useState('')
  const [terminalBusy, setTerminalBusy] = useState(false)
  const [browserUrl, setBrowserUrl] = useState('http://127.0.0.1:56517/')
  const [browserDraft, setBrowserDraft] = useState('http://127.0.0.1:56517/')
  const [browserHistory, setBrowserHistory] = useState<readonly string[]>(['http://127.0.0.1:56517/'])
  const [browserHistoryIndex, setBrowserHistoryIndex] = useState(0)
  const [browserKey, setBrowserKey] = useState(0)
  const [sidecarOpen, setSidecarOpen] = useState(false)
  const [sidecarId, setSidecarId] = useState<string | null>(null)
  const [sidecarDraft, setSidecarDraft] = useState('')
  const [sidecarMessages, setSidecarMessages] = useState<readonly SidecarMessage[]>([])
  const [sidecarBusy, setSidecarBusy] = useState(false)
  const [sidecarError, setSidecarError] = useState<string | null>(null)
  const [automationOpen, setAutomationOpen] = useState(false)
  const [automationName, setAutomationName] = useState('')
  const [automationPrompt, setAutomationPrompt] = useState('')
  const [automationWhen, setAutomationWhen] = useState('')
  const [automationSchedule, setAutomationSchedule] = useState<'once' | 'recurring'>('once')
  const [automationInterval, setAutomationInterval] = useState('1')
  const [automationUnit, setAutomationUnit] = useState<'h' | 'd'>('d')
  const [phase, setPhase] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [externalPhase, setExternalPhase] = useState<'idle' | 'loading' | 'ready'>('idle')
  const [installingId, setInstallingId] = useState<string | null>(null)
  const [contactsRevision, setContactsRevision] = useState(0)
  const [notice, setNotice] = useState<string | null>(null)
  const [stateReady, setStateReady] = useState(false)

  const currentSessionId = sessions.current
  const allContacts = useMemo(() => [
    ...externalJoined,
    ...contacts.filter(contact => !externalJoined.some(item => item.id === contact.id || item.name === contact.name)),
  ], [contacts, externalJoined])
  const currentWorkspaceId = useMemo(() => workspaces.items.find(workspace => currentSessionId !== undefined && workspace.sessionIds.includes(currentSessionId))?.workspaceId, [currentSessionId, workspaces.items])
  const currentWorkspace = useMemo(() => workspaces.items.find(workspace => workspace.workspaceId === workspaceId), [workspaceId, workspaces.items])
  const activeRoom = useMemo(() => roomForSession(state.rooms, state.roomSessions, currentSessionId), [currentSessionId, state.roomSessions, state.rooms])
  const activeWorkspace = useMemo(() => activeRoom === undefined
    ? currentWorkspace
    : workspaces.items.find(workspace => workspace.workspaceId === activeRoom.workspaceId) ?? currentWorkspace,
  [activeRoom, currentWorkspace, workspaces.items])
  const visibleRooms = useMemo(() => state.rooms.filter(room => room.workspaceId === workspaceId && room.archivedAt === undefined).sort((a, b) => b.updatedAt - a.updatedAt), [state.rooms, workspaceId])
  const filtered = useMemo(() => allContacts.filter(skill => matches(skill, deferredQuery, state.personas)), [allContacts, deferredQuery, state.personas])
  const frequent = useMemo(() => { const pinned = filtered.filter(contact => favorites.includes(contact.id)); return pinned.length > 0 ? pinned : filtered.slice(0, 8) }, [favorites, filtered])
  const visibleContacts = contactList === 'frequent' && deferredQuery.length === 0 ? frequent : filtered
  // The Messages view searches rooms with the same box the Contacts view uses
  // for Skills, so one field serves whichever list is on screen.
  const roomResults = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase()
    if (needle === '') return visibleRooms
    return visibleRooms.filter(room => room.title.toLowerCase().includes(needle)
      || state.roomSessions.some(session => session.roomId === room.roomId && session.title.toLowerCase().includes(needle)))
  }, [deferredQuery, state.roomSessions, visibleRooms])
  const visibleMemberContacts = useMemo(() => allContacts.filter(contact => matches(contact, deferredMemberQuery, state.personas)), [allContacts, deferredMemberQuery, state.personas])
  const activeMembers = activeRoom?.memberIds.flatMap(id => allContacts.find(contact => contact.id === id) ?? []) ?? []
  const activeCoordinator = activeMembers.find(member => member.id === activeRoom?.coordinatorId) ?? activeMembers[0]
  const currentSessionBlank = currentSessionId === undefined ? false : sessions.byId[currentSessionId]?.blank === true

  const replaceState = (next: SkillChatState): SkillChatState => {
    stateRef.current = next
    setState(next)
    store(STATE_KEY, next)
    return next
  }

  const updateState = (recipe: (current: SkillChatState) => SkillChatState): SkillChatState => {
    return replaceState(recipe(stateRef.current))
  }

  useEffect(() => {
    const abort = new AbortController()
    void loadState(abort.signal).then(remoteState => {
      if (abort.signal.aborted) return
      const localHasData = state.rooms.length > 0 || Object.keys(state.personas).length > 0 || state.automations.length > 0
      replaceState(remoteState.rooms.length === 0 && localHasData ? stateRef.current : remoteState)
      setStateReady(true)
    }, () => { if (!abort.signal.aborted) setStateReady(true) })
    return () => { abort.abort() }
  }, [loadState])

  useEffect(() => {
    if (!stateReady) return
    const abort = new AbortController()
    const timer = window.setTimeout(() => {
      void saveState(state, abort.signal).catch((error: unknown) => {
        if (!abort.signal.aborted) setNotice(`状态保存失败：${error instanceof Error ? error.message : String(error)}`)
      })
    }, 180)
    return () => { window.clearTimeout(timer); abort.abort() }
  }, [saveState, state, stateReady])

  useEffect(() => {
    const abort = new AbortController()
    setPhase('loading')
    void loadContacts(currentSessionId, abort.signal).then(next => { if (!abort.signal.aborted) { setContacts(next); setPhase('ready') } }, () => { if (!abort.signal.aborted) setPhase('error') })
    return () => { abort.abort() }
  }, [contactsRevision, currentSessionId, groupOpen, loadContacts, view])

  useEffect(() => {
    const next = ensurePersonas(allContacts, state.personas)
    if (next !== state.personas) updateState(current => ({ ...current, personas: next }))
  }, [allContacts, state.personas])

  useEffect(() => {
    if (state.migratedAt !== undefined || sessions.ids.length === 0) return
    const sessionWorkspace = Object.fromEntries(sessions.ids.map(sessionId => [sessionId, workspaces.items.find(workspace => workspace.sessionIds.includes(sessionId))?.workspaceId]))
    const sessionUpdatedAt = Object.fromEntries(sessions.ids.map(sessionId => [sessionId, sessions.byId[sessionId]?.updatedAt ?? 0]))
    const migrated = migrateLegacyState(groups, chatBindings, sessionWorkspace, sessionUpdatedAt)
    updateState(current => ({ ...current, ...migrated }))
  }, [chatBindings, groups, sessions.byId, sessions.ids, state.migratedAt, workspaces.items])

  useEffect(() => {
    const catalogQuery = view === 'contacts' ? deferredQuery : groupOpen || roomSettingsOpen ? deferredMemberQuery : ''
    if (catalogQuery.length < 2) { setExternalResults([]); setExternalPhase('idle'); return }
    const abort = new AbortController()
    const timer = window.setTimeout(() => {
      setExternalPhase('loading')
      void searchExternal(catalogQuery, abort.signal).then(value => { if (!abort.signal.aborted) { setExternalResults(value); setExternalPhase('ready') } }, () => { if (!abort.signal.aborted) { setExternalResults([]); setExternalPhase('ready') } })
    }, 220)
    return () => { window.clearTimeout(timer); abort.abort() }
  }, [deferredMemberQuery, deferredQuery, groupOpen, roomSettingsOpen, searchExternal, view])

  useEffect(() => { store(MODE_KEY, mode) }, [mode])
  useEffect(() => { store(FAVORITES_KEY, favorites) }, [favorites])
  useEffect(() => { store(GROUPS_KEY, groups) }, [groups])
  useEffect(() => { store(EXTERNAL_KEY, externalJoined) }, [externalJoined])
  useEffect(() => { store(CHAT_BINDINGS_KEY, chatBindings) }, [chatBindings])
  useEffect(() => { if (workspaceId !== undefined) store(WORKSPACE_KEY, workspaceId) }, [workspaceId])
  useEffect(() => {
    if (currentWorkspaceId !== undefined) { setWorkspaceId(currentWorkspaceId); return }
    setWorkspaceId(current => current !== undefined && workspaces.items.some(workspace => workspace.workspaceId === current) ? current : workspaces.items[0]?.workspaceId)
  }, [currentWorkspaceId, workspaces.items])

  useEffect(() => {
    if (activeRoom === undefined || activeMembers.length === 0) return
    const binding: ChatBinding = {
      name: activeRoom.title,
      avatar: state.personas[activeRoom.coordinatorId]?.avatarId ?? 'fox-coral',
      kind: activeRoom.type === 'group' ? 'group' : 'contact',
      members: activeMembers,
      roomId: activeRoom.roomId,
      ...(activeRoom.type === 'group' ? { groupId: activeRoom.roomId.replace('room:group:', '') } : {}),
    }
    if (currentSessionId !== undefined && chatBindings[currentSessionId]?.roomId !== activeRoom.roomId) {
      setChatBindings(current => ({ ...current, [currentSessionId]: binding }))
    }
  }, [activeMembers, activeRoom, chatBindings, currentSessionId, state.personas])

  useEffect(() => {
    if (activeRoom === undefined) return
    const assign = (): void => {
      for (const reply of document.querySelectorAll<HTMLElement>('[data-chat-flow-kind="assistant-step"]:has([data-assistant-reply])')) {
        const turn = reply.dataset.chatTurn
        const user = turn === undefined ? undefined : [...document.querySelectorAll<HTMLElement>('[data-chat-flow-kind="user"]')].find(node => node.dataset.chatTurn === turn)
        const responder = responderForMessage(activeMembers, activeRoom.coordinatorId, user?.textContent ?? '', mode)
        if (responder === undefined) continue
        const display = displayOf(responder, mode, state.personas)
        reply.dataset.skillResponder = display.name
        reply.style.setProperty('--skill-message-avatar', `'${display.name.slice(0, 1)}'`)
      }
    }
    assign()
    const observer = new MutationObserver(assign)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => { observer.disconnect() }
  }, [activeMembers, activeRoom, mode, state.personas])

  useEffect(() => {
    if (activeRoom === undefined) return
    const candidates = [...document.querySelectorAll<HTMLElement>('span')]
    const headline = candidates.find(node => ['Into the Unknown', '探索未至之境'].includes(node.textContent.trim()))
    if (headline === undefined) return
    const welcome = headline.parentElement?.parentElement
    if (welcome === null || welcome === undefined) return
    const original = headline.textContent
    headline.textContent = activeRoom.type === 'general' ? '开始一段新对话' : `和「${activeRoom.title}」一起开始`
    welcome.dataset.skillChatWelcome = activeRoom.type
    welcome.dataset.skillChatHint = activeRoom.type === 'general' ? '直接输入问题，不调用任何 Skill' : activeRoom.type === 'group' ? '输入消息，或用 @ 指定群组成员' : '输入消息，当前 Skill 会协助处理'
    return () => {
      headline.textContent = original
      delete welcome.dataset.skillChatWelcome
      delete welcome.dataset.skillChatHint
    }
  }, [activeRoom])

  const bindChat = (sessionId: SessionId, binding: ChatBinding): void => {
    setChatBindings(current => ({ ...current, [sessionId]: binding }))
  }

  const createRoomSession = async (room: ChatRoom, draft = true): Promise<SessionId> => {
    const sessionId = await startSession(room.workspaceId)
    if (room.type === 'general') await renameSession(sessionId, room.title)
    const members = room.memberIds.flatMap(id => allContacts.find(contact => contact.id === id) ?? [])
    const group = roomGroup(room, allContacts)
    const coordinator = members.find(member => member.id === room.coordinatorId) ?? members[0]
    const now = Date.now()
    const roomSessionId = `room-session:${sessionId}`
    const roomSession: RoomSession = {
      roomSessionId, roomId: room.roomId, harnessSessionId: sessionId, title: room.title,
      memberSnapshot: members.map(member => ({ skillId: member.id, displayName: displayOf(member, 'persona', state.personas).name, avatarId: displayOf(member, 'persona', state.personas).avatar, originalName: member.name })),
      createdAt: now, updatedAt: now,
    }
    const next = updateState((current) => {
      const storedRoom = current.rooms.find(item => item.roomId === room.roomId) ?? room
      const updatedRoom = { ...storedRoom, sessionIds: [...storedRoom.sessionIds, roomSessionId], activeSessionId: roomSessionId, updatedAt: now }
      return {
        ...current,
        roomSessions: [...current.roomSessions, roomSession],
        rooms: current.rooms.some(item => item.roomId === room.roomId)
          ? current.rooms.map(item => item.roomId === room.roomId ? updatedRoom : item)
          : [...current.rooms, updatedRoom],
      }
    })
    await saveState(next, new AbortController().signal)
    bindChat(sessionId, {
      name: room.title,
      avatar: coordinator === undefined ? 'fox-coral' : displayOf(coordinator, 'persona', state.personas).avatar,
      kind: room.type === 'group' ? 'group' : 'contact', members, roomId: room.roomId,
      ...(room.type === 'group' ? { groupId: group.id } : {}),
    })
    openSession(sessionId)
    if (draft && room.type === 'direct' && members[0] !== undefined) await chooseContact(sessionId, members[0], displayOf(members[0], mode, state.personas).name)
    if (draft && room.type === 'group') await chooseGroup(sessionId, group, members.map(member => displayOf(member, mode, state.personas).name))
    return sessionId
  }

  const openRoom = async (room: ChatRoom): Promise<void> => {
    const sessionId = activeHarnessSession(room, stateRef.current.roomSessions)
    if (sessionId !== undefined && sessions.byId[sessionId] !== undefined) { openSession(sessionId); return }
    await createRoomSession(room)
  }

  const beginContactChat = async (contact: SkillContact): Promise<void> => {
    if (workspaceId === undefined) { setNotice(t('workspaceRequired')); return }
    const existing = state.rooms.find(room => room.type === 'direct' && room.workspaceId === workspaceId && room.memberIds[0] === contact.id && room.archivedAt === undefined)
    const display = displayOf(contact, 'persona', state.personas)
    const room: ChatRoom = existing ?? { roomId: `room:direct:${workspaceId}:${contact.id}`, type: 'direct', workspaceId, workspaceIds: [workspaceId], title: display.name, memberIds: [contact.id], coordinatorId: contact.id, sessionIds: [], createdAt: Date.now(), updatedAt: Date.now() }
    if (existing === undefined) updateState(current => ({ ...current, rooms: [...current.rooms, room] }))
    await openRoom(room)
    setSelected(null); setNotice(null)
  }

  const beginGeneralChat = async (): Promise<void> => {
    if (workspaceId === undefined) { setNotice(t('workspaceRequired')); return }
    const now = Date.now()
    const room: ChatRoom = {
      roomId: `room:general:${randomUUID()}`, type: 'general', workspaceId, workspaceIds: [workspaceId], title: '普通对话',
      memberIds: [], coordinatorId: '', sessionIds: [], createdAt: now, updatedAt: now,
    }
    updateState(current => ({ ...current, rooms: [room, ...current.rooms] }))
    await createRoomSession(room, false)
    setView('chats')
    setNotice(null)
  }

  const createGroup = (): void => {
    if (workspaceId === undefined) { setNotice(t('workspaceRequired')); return }
    const members = allContacts.filter(contact => groupMembers.includes(contact.id))
    if (members.length < 2) return
    const now = Date.now()
    const roomId = `room:group:${randomUUID()}`
    const coordinator = members[0]
    if (coordinator === undefined) return
    const title = groupName.trim() || members.map(member => displayOf(member, 'persona', state.personas).name).join('、')
    const linkedWorkspaces = groupWorkspaceIds.length === 0 ? [workspaceId] : groupWorkspaceIds
    const room: ChatRoom = { roomId, type: 'group', workspaceId: linkedWorkspaces[0] ?? workspaceId, workspaceIds: linkedWorkspaces, avatarId: groupAvatar, title, memberIds: members.map(member => member.id), coordinatorId: coordinator.id, systemPrompt: groupPrompt.trim() || generatedGroupPrompt(title, members), sessionIds: [], createdAt: now, updatedAt: now }
    updateState(current => ({ ...current, rooms: [...current.rooms, room] }))
    setGroups(current => [...current, roomGroup(room, allContacts)])
    setGroupOpen(false); setGroupMembers([]); setGroupName(''); setGroupPrompt(''); setGroupAvatar('bear-honey'); setGroupWorkspaceIds([]); setMemberQuery(''); setView('chats')
    void openRoom(room)
  }

  const savePersona = (): void => {
    if (selected === null) return
    const base = state.personas[selected.id] ?? defaultPersona(selected)
    const displayName = personaName.trim() || base.displayName
    updateState(current => ({
      ...current,
      personas: { ...current.personas, [selected.id]: { ...base, displayName, avatarId: personaAvatar, customizedName: displayName !== defaultPersona(selected, 0).displayName, customizedAvatar: personaAvatar !== defaultPersona(selected, 0).avatarId, updatedAt: Date.now() } },
      rooms: current.rooms.map(room => room.type === 'direct' && room.memberIds[0] === selected.id ? { ...room, title: displayName, updatedAt: Date.now() } : room),
    }))
    setEditingPersona(false)
  }

  const resetPersona = (): void => {
    if (selected === null) return
    const reset = defaultPersona(selected)
    updateState(current => ({
      ...current,
      personas: { ...current.personas, [selected.id]: reset },
      rooms: current.rooms.map(room => room.type === 'direct' && room.memberIds[0] === selected.id ? { ...room, title: reset.displayName, updatedAt: Date.now() } : room),
    }))
    setEditingPersona(false)
  }

  const updateRoom = (roomId: string, patch: Partial<Pick<ChatRoom, 'title' | 'memberIds' | 'coordinatorId' | 'systemPrompt' | 'avatarId' | 'workspaceId' | 'workspaceIds' | 'archivedAt'>>): void => {
    updateState(current => ({ ...current, rooms: current.rooms.map(room => room.roomId === roomId ? { ...room, ...patch, updatedAt: Date.now() } : room) }))
  }

  const toggleActiveRoomMember = (skillId: string): void => {
    if (activeRoom === undefined || activeRoom.type !== 'group') return
    const included = activeRoom.memberIds.includes(skillId)
    const memberIds = included ? activeRoom.memberIds.filter(id => id !== skillId) : [...activeRoom.memberIds, skillId]
    if (memberIds.length < 2) { setNotice(t('groupNeedsMember')); return }
    updateRoom(activeRoom.roomId, {
      memberIds,
      coordinatorId: memberIds.includes(activeRoom.coordinatorId) ? activeRoom.coordinatorId : memberIds[0] ?? activeRoom.coordinatorId,
    })
  }

  const createAutomation = async (): Promise<void> => {
    if (workspaceId === undefined || activeRoom === undefined || automationPrompt.trim() === '') return
    const timestamp = automationWhen === '' ? Date.now() : Date.parse(automationWhen)
    const interval = Math.max(1, Number.parseInt(automationInterval, 10) || 1)
    const automation: AutomationDefinition = {
      automationId: `automation:${randomUUID()}`, name: automationName.trim() || '新自动化', workspaceId,
      roomId: activeRoom.roomId, intent: 'custom', prompt: automationPrompt.trim(), memberIds: activeRoom.memberIds,
      coordinatorId: activeRoom.coordinatorId,
      schedule: automationSchedule === 'once'
        ? { kind: 'once', runAt: new Date(timestamp).toISOString() }
        : { kind: 'recurring', rule: `every:${interval}${automationUnit}`, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
      lifecycle: automationSchedule === 'once' ? 'run-once' : 'continuous',
      status: 'active', createdAt: Date.now(), updatedAt: Date.now(), nextRunAt: timestamp,
    }
    const next = updateState(current => ({ ...current, automations: [...current.automations, automation] }))
    try {
      await saveState(next, new AbortController().signal)
      setAutomationOpen(false); setAutomationName(''); setAutomationPrompt(''); setAutomationWhen(''); setAutomationSchedule('once'); setAutomationInterval('1'); setAutomationUnit('d')
      setNotice('自动化已创建，可立即运行')
    } catch (error) {
      setNotice(`自动化保存失败：${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const runAutomation = async (automation: AutomationDefinition): Promise<void> => {
    const abort = new AbortController()
    try {
      await saveState(stateRef.current, abort.signal)
      const result = await runAutomationRemote(automation.automationId, abort.signal)
      replaceState(result.state)
      openSession(result.sessionId)
      setNotice('自动化已在后台创建并启动独立会话')
    } catch (error) {
      setNotice(`自动化运行失败：${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const joinExternal = async (contact: ExternalSkillContact, target?: 'draft-group' | 'active-group'): Promise<void> => {
    if (workspaceId === undefined) { setNotice(t('workspaceRequired')); return }
    const abort = new AbortController(); setInstallingId(contact.id)
    try {
      const installed = await props.installExternal(workspaceId, contact, abort.signal)
      setExternalJoined(current => [...current.filter(item => item.id !== installed.id), installed])
      setContactsRevision(value => value + 1)
      if (target === 'draft-group') setGroupMembers(current => current.includes(installed.id) ? current : [...current, installed.id])
      else if (target === 'active-group' && activeRoom?.type === 'group') updateRoom(activeRoom.roomId, { memberIds: activeRoom.memberIds.includes(installed.id) ? activeRoom.memberIds : [...activeRoom.memberIds, installed.id] })
      else selectContact(installed)
      setNotice(`${t('skillInstalled').replace('{name}', installed.name)}${target === undefined ? '，已加入智能体列表' : '，已加入群组'}`)
    } catch (error) {
      setNotice(`${t('skillInstallFailed').replace('{name}', contact.name)}：${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setInstallingId(null)
    }
  }

  const createWorkspace = async (): Promise<void> => { try { const created = await addWorkspace(); if (created !== null) setWorkspaceId(created) } catch { setNotice(t('workspaceAddFailed')) } }
  const addLinkedWorkspace = async (target: 'create' | 'settings'): Promise<void> => {
    try {
      const created = await addWorkspace()
      if (created === null) return
      if (target === 'create') setGroupWorkspaceIds(current => current.includes(created) ? current : [...current, created])
      else setRoomWorkspaceIds(current => current.includes(created) ? current : [...current, created])
    } catch {
      setNotice(t('workspaceAddFailed'))
    }
  }
  const toggleWorkspaceBinding = (target: 'create' | 'settings', id: WorkspaceId): void => {
    const update = (current: readonly WorkspaceId[]): readonly WorkspaceId[] => current.includes(id)
      ? current.length > 1 ? current.filter(item => item !== id) : current
      : [...current, id]
    if (target === 'create') setGroupWorkspaceIds(update)
    else setRoomWorkspaceIds(update)
  }
  const toggleFavorite = (id: string): void => {
    setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }
  const selectContact = (contact: SkillContact): void => { const identity = state.personas[contact.id] ?? defaultPersona(contact); setSelected(contact); setPersonaName(identity.displayName); setPersonaAvatar(identity.avatarId); setEditingPersona(false) }

  const roomAvatar = (room: ChatRoom, compact = false): React.JSX.Element => {
    if (room.type === 'general') return <span className={css.generalAvatar} data-compact={compact || undefined}>✦</span>
    if (room.type === 'group') {
      const members = room.memberIds.slice(0, 4).flatMap(id => {
        const contact = allContacts.find(item => item.id === id)
        if (contact === undefined) return []
        const identity = displayOf(contact, 'persona', state.personas)
        return [{ id, ...identity }]
      })
      if (members.length === 0) return <GroupAvatar avatarId={room.avatarId ?? ANIMAL_AVATARS[hashOf(room.roomId) % ANIMAL_AVATARS.length] ?? 'bear-honey'} label={room.title} small={compact}/>
      return <AvatarStack className={`${css.roomAvatarStack} ${compact ? css.roomAvatarStackCompact : ''}`} overlap={compact ? 7 : 10}>{members.map(member => <Avatar key={member.id} avatarId={member.avatar} label={member.name} size={compact ? 20 : 28}/>)}</AvatarStack>
    }
    const contact = allContacts.find(item => item.id === room.memberIds[0])
    const identity = contact === undefined ? { name: room.title, avatar: 'fox-coral' } : displayOf(contact, 'persona', state.personas)
    return <AnimalAvatar avatarId={identity.avatar} label={identity.name} small={compact}/>
  }

  const openHistorySession = (room: ChatRoom, item: RoomSession): void => {
    updateState(current => ({ ...current, rooms: current.rooms.map(candidate => candidate.roomId === room.roomId ? { ...candidate, activeSessionId: item.roomSessionId, updatedAt: Date.now() } : candidate) }))
    openSession(item.harnessSessionId)
  }

  const openGroupCreator = (): void => {
    setGroupName('')
    setGroupPrompt('')
    setGroupMembers([])
    setGroupAvatar(ANIMAL_AVATARS[hashOf(`${workspaceId ?? ''}:${Date.now()}`) % ANIMAL_AVATARS.length] ?? 'bear-honey')
    setGroupWorkspaceIds(workspaceId === undefined ? [] : [workspaceId])
    setMemberQuery('')
    setGroupOpen(true)
  }

  const openRoomSettings = (room: ChatRoom): void => {
    setRoomTitleDraft(room.title)
    setRoomPromptDraft(room.systemPrompt ?? generatedGroupPrompt(room.title, room.memberIds.flatMap(id => allContacts.find(contact => contact.id === id) ?? [])))
    setRoomAvatarDraft(room.avatarId ?? ANIMAL_AVATARS[hashOf(room.roomId) % ANIMAL_AVATARS.length] ?? 'bear-honey')
    setRoomWorkspaceIds(room.workspaceIds ?? [room.workspaceId])
    setMemberQuery('')
    setRoomSettingsOpen(true)
  }

  const openProjectTool = (tool: ProjectToolKind): void => {
    setProjectTool(tool)
    setProjectListing(null)
    setProjectListingError(null)
    setProjectFile(null)
    if (activeWorkspace === undefined || currentSessionId === undefined) return
    const abort = new AbortController()
    if (tool === 'files') {
      void browseProject(activeWorkspace.workspaceId, undefined, abort.signal).then(setProjectListing, (error: unknown) => {
        if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error))
      })
      return
    }
    if (tool === 'terminal' || tool === 'diff') {
      setTerminalBusy(true)
      void openTerminal(currentSessionId, activeWorkspace.workspaceId, abort.signal).then(async opened => {
        if (tool !== 'diff') return opened
        // Ask git whether this is a work tree first: run bare, a non-repository
        // answers with its whole usage text, which the panel then had to render.
        const command = 'if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then '
          + 'git --no-pager diff --stat -- . && git --no-pager diff -- .; '
          + 'else echo "__DSCHAT_NO_REPO__"; fi'
        return await sendTerminal(currentSessionId, opened.terminalId, command, abort.signal)
      }).then(setTerminal, (error: unknown) => {
        if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error))
      }).finally(() => { if (!abort.signal.aborted) setTerminalBusy(false) })
    }
  }

  const browseCurrentProject = (path: string | undefined): void => {
    if (activeWorkspace === undefined) {
      setProjectListingError('请先选择项目目录')
      return
    }
    const abort = new AbortController()
    void browseProject(activeWorkspace.workspaceId, path, abort.signal).then(setProjectListing, (error: unknown) => {
      if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error))
    })
  }

  const previewProjectFile = (path: string): void => {
    if (activeWorkspace === undefined) return
    setProjectListingError(null)
    const abort = new AbortController()
    void readProjectFile(activeWorkspace.workspaceId, path, abort.signal).then(setProjectFile, (error: unknown) => {
      if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error))
    })
  }

  const closeWorkbench = (): void => {
    const terminalToClose = terminal
    setProjectTool(null)
    setProjectFile(null)
    setProjectListingError(null)
    setTerminal(null)
    setTerminalCommand('')
    if (terminalToClose !== null && currentSessionId !== undefined) void closeTerminal(currentSessionId, terminalToClose.terminalId)
  }

  const submitTerminal = (): void => {
    if (terminal === null || currentSessionId === undefined || terminalCommand.trim() === '') return
    const command = terminalCommand
    setTerminalCommand('')
    setTerminalBusy(true)
    const abort = new AbortController()
    void sendTerminal(currentSessionId, terminal.terminalId, command, abort.signal).then(setTerminal, (error: unknown) => {
      if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error))
    }).finally(() => { if (!abort.signal.aborted) setTerminalBusy(false) })
  }

  const navigateBrowser = (url: string): void => {
    const trimmed = url.trim()
    if (trimmed === '') return
    const normalized = /^https?:\/\//iu.test(trimmed) ? trimmed : `http://${trimmed}`
    setBrowserUrl(normalized)
    setBrowserDraft(normalized)
    setBrowserHistory(current => [...current.slice(0, browserHistoryIndex + 1), normalized])
    setBrowserHistoryIndex(index => index + 1)
  }

  const closeTemporaryChat = (): void => {
    const current = sidecarId
    setSidecarOpen(false)
    setSidecarId(null)
    setSidecarMessages([])
    setSidecarDraft('')
    setSidecarError(null)
    if (current !== null) void closeSidecar(current)
  }

  const submitSidecar = (): void => {
    const message = sidecarDraft.trim()
    if (message === '' || currentSessionId === undefined || activeWorkspace === undefined || activeRoom === undefined) return
    setSidecarDraft('')
    setSidecarBusy(true)
    setSidecarError(null)
    setSidecarMessages(current => [...current, { id: randomUUID(), role: 'user', text: message }])
    const abort = new AbortController()
    const request = sidecarId === null
      ? startSidecar({
        sourceSessionId: currentSessionId,
        workspaceId: activeWorkspace.workspaceId,
        roomTitle: activeRoom.title,
        ...(activeRoom.systemPrompt === undefined ? {} : { roomSystemPrompt: activeRoom.systemPrompt }),
        memberNames: activeMembers.map(member => displayOf(member, 'persona', state.personas).name),
        message,
      }, abort.signal)
      : sendSidecar(sidecarId, message, abort.signal)
    void request.then((result) => {
      setSidecarId(result.sidecarId)
      setSidecarMessages(current => [...current, { id: randomUUID(), role: 'assistant', text: result.answer }])
    }, (error: unknown) => {
      if (!abort.signal.aborted) setSidecarError(error instanceof Error ? error.message : String(error))
    }).finally(() => { if (!abort.signal.aborted) setSidecarBusy(false) })
  }

  useEffect(() => {
    if (activeRoom === undefined || currentSessionId === undefined) {
      publishHeaderBridge(null)
      return
    }
    publishHeaderBridge({
      sessionId: currentSessionId,
      room: activeRoom,
      roomSessions: state.roomSessions,
      workspaceTitle: activeWorkspace?.title ?? '当前项目',
      ...(activeCoordinator === undefined ? {} : { coordinatorName: displayOf(activeCoordinator, 'persona', state.personas).name }),
      memberPersonas: activeMembers.map(member => {
        const display = displayOf(member, 'persona', state.personas)
        return { id: member.id, name: display.name, avatarId: display.avatar }
      }),
      headerActions: renderSlot('ds-chat.room.header.actions', { roomId: activeRoom.roomId, sessionId: currentSessionId }),
      onHistory: item => { openHistorySession(activeRoom, item) },
      onNewSession: () => { void createRoomSession(activeRoom, activeRoom.type !== 'general') },
      onSettings: () => { openRoomSettings(activeRoom) },
      onProjectTool: openProjectTool,
      onTemporaryChat: () => { setSidecarOpen(true) },
    })
    return () => {
      if (headerBridgeValue?.sessionId === currentSessionId) publishHeaderBridge(null)
    }
  }, [activeCoordinator, activeMembers, activeRoom, activeWorkspace?.title, currentSessionId, renderSlot, state.personas, state.roomSessions])

  useEffect(() => {
    if (activeRoom === undefined || currentSessionId === undefined) return
    document.documentElement.dataset.skillChatRoomHeader = 'true'
    return () => { delete document.documentElement.dataset.skillChatRoomHeader }
  }, [activeRoom, currentSessionId])

  useEffect(() => {
    const root = document.documentElement
    delete root.dataset.skillChatGroupPanel
    if (sidecarOpen) root.dataset.skillChatSidecar = 'true'
    else delete root.dataset.skillChatSidecar
    return () => { delete root.dataset.skillChatSidecar }
  }, [sidecarOpen])

  const marketplaceRow = (result: ExternalSkillContact, target?: 'draft-group' | 'active-group'): React.JSX.Element => {
    const installed = externalJoined.find(item => item.id === `skills-sh:${result.id}`)
    const included = target === 'draft-group'
      ? installed !== undefined && groupMembers.includes(installed.id)
      : target === 'active-group'
        ? installed !== undefined && activeRoom?.memberIds.includes(installed.id) === true
        : false
    const installAndJoin = (): void => {
      if (installed === undefined) {
        void joinExternal(result, target)
      } else if (target === 'draft-group') {
        setGroupMembers(current => current.includes(installed.id) ? current : [...current, installed.id])
      } else if (target === 'active-group' && activeRoom?.type === 'group') {
        updateRoom(activeRoom.roomId, { memberIds: activeRoom.memberIds.includes(installed.id) ? activeRoom.memberIds : [...activeRoom.memberIds, installed.id] })
      }
    }
    const homepage = result.homepage ?? `https://skills.sh/${result.id}`
    const card = <div className={css.hoverProfile}><strong>{result.name}</strong><span>{result.description ?? '来自 skills.sh 的社区 Skill，可安装到当前项目。'}</span><small>{result.source} · {result.installs.toLocaleString()} 次安装</small><a href={homepage} target="_blank" rel="noreferrer">查看 skills.sh 主页 ↗</a></div>
    return <HoverCard key={result.id} anchor={<div className={css.marketResult}><span className={css.marketAvatar}>↗</span><span className={css.copy}><strong>{result.name}</strong><small>{result.description ?? `${result.source} · ${result.installs.toLocaleString()} 次安装`}</small></span><div className={css.marketActions}><button type="button" disabled={installed !== undefined || installingId === result.id} onClick={() => { void joinExternal(result) }}>{installed !== undefined ? '已安装' : installingId === result.id ? '安装中' : '安装'}</button>{target !== undefined ? <button className={css.installJoin} type="button" disabled={included || installingId === result.id} onClick={installAndJoin}>{included ? '已加入' : installed === undefined ? '安装并加入' : '加入'}</button> : null}</div></div>} content={card} copyLabel="复制 Skill 链接" copiedLabel="已复制" copyText={homepage}/>
  }

  const roomRow = (room: ChatRoom): React.JSX.Element => {
    const summaries = room.sessionIds.flatMap(id => {
      const item = state.roomSessions.find(session => session.roomSessionId === id)
      return item === undefined ? [] : sessions.byId[item.harnessSessionId] ?? []
    })
    const running = summaries.some(summary => summary.running)
    const unread = activeRoom?.roomId === room.roomId ? 0 : summaries.filter(summary => summary.completed === true).length
    const coordinator = allContacts.find(contact => contact.id === room.coordinatorId)
    const linked = (room.workspaceIds ?? [room.workspaceId]).flatMap(id => workspaces.items.find(item => item.workspaceId === id)?.title ?? [])
    // One row shape serves every room type. A group is not a separate section:
    // it is a room whose avatar stacks and whose meta line counts members, the
    // way a group thread differs from a direct one in any messaging client.
    const latest = state.roomSessions
      .filter(session => session.roomId === room.roomId && session.archivedAt === undefined)
      .sort((left, right) => right.updatedAt - left.updatedAt)[0]
    // The avatar already says what kind of room this is, so the meta slot only
    // carries what the avatar cannot: how many people are in a group.
    const meta = room.type === 'group' ? `${room.memberIds.length} 人` : ''
    // A fresh session is named after its room, so echoing it under the title
    // would print the same string twice; fall back to something the title does
    // not already say.
    const sessionTitle = latest?.title === room.title ? undefined : latest?.title
    const preview = running
      ? '正在输入中…'
      : sessionTitle ?? (room.type === 'group'
        ? (coordinator === undefined ? '未设置协调者' : `${displayOf(coordinator, 'persona', state.personas).name} 协调`)
        : room.sessionIds.length > 1 ? `${room.sessionIds.length} 个会话` : '还没有消息')
    const hover = <div className={css.hoverProfile}><strong>{room.title}</strong><span>{room.systemPrompt?.trim() || (room.type === 'group' ? '固定 Skill 团队协作空间；未指定 @ 时由协调者处理。' : '直接对话，不启用群组职能。')}</span><small>{room.sessionIds.length} 个会话{room.type === 'group' ? ` · ${room.memberIds.length} 名成员` : ''}</small><small>项目：{linked.join('、') || '未绑定'}</small></div>
    return <HoverCard key={room.roomId} anchor={<RoomRow className={css.roomRow} selected={activeRoom?.roomId === room.roomId} onClick={() => { void openRoom(room) }}><span className={css.avatarStatusWrap}>{roomAvatar(room)}{unread > 0 ? <span className={css.unreadBadge}>{unread > 99 ? '99+' : unread}</span> : null}</span><span className={css.copy}><span className={css.nameLine}><span className={css.name}>{room.title}</span><span className={css.source}>{meta}</span></span><span className={css.description} data-running={running || undefined}>{preview}</span></span><span className={css.time}>{roomTime(room.updatedAt)}</span></RoomRow>} content={hover} copyLabel="复制会话信息" copiedLabel="已复制"/>
  }

  if (!wide) return <div className={css.rail}><button className={css.railButton} type="button" onClick={expandSidebar}>●</button></div>

  const contactRow = (contact: SkillContact): React.JSX.Element => {
    const display = displayOf(contact, mode, state.personas)
    const homepage = contact.homepage ?? contact.repository
    return <HoverCard key={contact.id} anchor={<button className={css.row} type="button" onClick={() => { selectContact(contact) }}><AnimalAvatar avatarId={display.avatar} label={display.name} seed={contact.id}/><span className={css.copy}><span className={css.nameLine}><span className={css.name}>{display.name}</span><span className={css.source} data-source={contact.source}>{contact.sourceShort ?? (contact.source === 'harness' ? t('sourceHarnessShort') : contact.source === 'workbuddy' ? t('sourceWorkBuddyShort') : 'skills.sh')}</span></span><span className={css.description}>{mode === 'persona' ? contact.name : contact.description}</span></span>{favorites.includes(contact.id) ? <span className={css.favoriteMark}>★</span> : null}</button>} content={<div className={css.hoverProfile}><strong>{display.name}</strong><span>{contact.description}</span><small>原始 Skill：{contact.name} · {contact.sourceLabel}</small>{homepage === undefined ? null : <a href={homepage} target="_blank" rel="noreferrer">查看主页 ↗</a>}</div>} copyLabel="复制 Skill 信息" copiedLabel="已复制" copyText={homepage}/>
  }

  return <div className={css.root} data-skill-chat-root>
    <div className={css.workspaceSection}><div className={css.workspacePicker}><button className={css.workspaceTrigger} type="button" aria-expanded={workspaceOpen} onClick={() => { setWorkspaceOpen(current => !current) }}><span className={css.workspaceIcon}>⌂</span><span>{currentWorkspace?.title ?? t('noWorkspace')}</span><span className={css.chevron}>⌄</span></button>{workspaceOpen ? <div className={css.workspaceMenu}>{workspaces.items.map(workspace => <button type="button" data-active={workspace.workspaceId === workspaceId} key={workspace.workspaceId} onClick={() => { setWorkspaceId(workspace.workspaceId); setWorkspaceOpen(false) }}><span>⌂</span><strong>{workspace.title}</strong>{workspace.workspaceId === workspaceId ? <b>✓</b> : null}</button>)}<span className={css.workspaceMenuSep}/><button type="button" onClick={() => { setWorkspaceOpen(false); void createWorkspace() }}><span>＋</span><strong>{t('addWorkspace')}</strong></button></div> : null}</div></div>
    <div className={css.topbar}><div className={css.tabs} role="tablist">{(['chats', 'contacts', 'automations'] as const).map(item => <button className={css.tab} data-active={view === item} type="button" role="tab" aria-selected={view === item} onClick={() => { setView(item) }} key={item}>{item === 'automations' ? '自动化' : t(item)}</button>)}</div><span className={css.createWrap}><button className={css.addGroup} type="button" aria-label="新建" aria-expanded={createOpen} onClick={() => { setCreateOpen(open => !open) }}>＋</button>{createOpen ? <div className={css.createMenu}>{[{ id: 'chat', label: '普通对话', hint: '不启用 Skill，直接与模型交流', run: () => { void beginGeneralChat() } }, { id: 'group', label: '群聊', hint: '把常用 Skill 组织成固定协作空间', run: openGroupCreator }, { id: 'workspace', label: '项目目录', hint: '添加一个新的工作区', run: () => { void createWorkspace() } }].map(entry => <button type="button" key={entry.id} onClick={() => { setCreateOpen(false); entry.run() }}><strong>{entry.label}</strong><small>{entry.hint}</small></button>)}</div> : null}</span></div>
    <div className={css.searchWrap}><input className={css.search} value={query} onChange={event => { setQuery(event.target.value) }} placeholder={view === 'contacts' ? t('searchAll') : '搜索对话…'} aria-label={view === 'contacts' ? t('searchAll') : '搜索对话'} autoComplete="off" spellCheck={false} type="search"/></div>
    {renderSlot('ds-chat.sidebar.before-rooms', { view, ...(workspaceId === undefined ? {} : { workspaceId }) })}
    {notice !== null ? <button className={css.notice} type="button" onClick={() => { setNotice(null) }}>{notice} ×</button> : null}

    {view === 'contacts' ? <><div className={css.subtabs}><button data-active={contactList === 'frequent'} onClick={() => { setContactList('frequent') }}>{t('frequentContacts')}</button><button data-active={contactList === 'all'} onClick={() => { setContactList('all') }}>{t('allContacts')}</button></div><div className={css.modeBar}><span>{t('displayMode')}</span><button type="button" data-active={mode === 'persona'} onClick={() => { setMode('persona') }}>{t('personaMode')}</button><button type="button" data-active={mode === 'raw'} onClick={() => { setMode('raw') }}>{t('rawMode')}</button></div><div className={css.list}>{phase === 'loading' ? <div className={css.status}>{t('loading')}</div> : phase === 'error' ? <div className={css.status}>{t('loadFailed')}</div> : visibleContacts.length === 0 ? <div className={css.status}>{t('searchEmpty')}</div> : visibleContacts.map(contactRow)}{deferredQuery.length >= 2 && externalPhase === 'loading' ? <div className={css.status}>{t('searchingExternal')}</div> : null}{externalResults.map(result => marketplaceRow(result))}</div></>
      : view === 'automations' ? <><div className={css.sectionHeading}><div><strong>自动化</strong><small>按计划在目标对话中创建独立会话</small></div><button type="button" disabled={activeRoom === undefined} onClick={() => { setAutomationOpen(true) }}>＋ 新建</button></div><div className={css.list}>{state.automations.filter(item => item.workspaceId === workspaceId).length === 0 ? <div className={css.emptyCard}>{activeRoom === undefined ? '先打开一个普通对话、Skill 对话或群组，再为它创建自动化。' : `当前没有自动化，点击“新建”即可绑定到「${activeRoom.title}」。`}</div> : state.automations.filter(item => item.workspaceId === workspaceId).map(automation => <article className={css.automationCard} key={automation.automationId}><div><strong>{automation.name}</strong><small>{state.rooms.find(room => room.roomId === automation.roomId)?.title ?? '已归档 Room'} · {automation.schedule.kind === 'once' ? '单次' : `每 ${automation.schedule.rule.slice(6)}`}</small></div><p>{automation.prompt}</p><footer><span data-status={automation.status}>{automation.status === 'active' ? '等待运行' : automation.status === 'paused' ? '已暂停' : automation.status === 'completed' ? '已完成' : '失败'}</span><button type="button" onClick={() => { void runAutomation(automation) }}>立即运行</button><button type="button" onClick={() => { updateState(current => ({ ...current, automations: current.automations.map(item => item.automationId === automation.automationId ? { ...item, status: item.status === 'paused' ? 'active' : 'paused', updatedAt: Date.now() } : item) })) }}>{automation.status === 'paused' ? '恢复' : '暂停'}</button></footer></article>)}</div></>
      : <><div className={css.roomList}>{roomResults.length === 0
        ? (query.trim() === ''
          ? <EmptyState className={css.emptyCard} title="还没有对话">用右上角的 ＋ 开始一段普通对话，或建一个 Skill 群组。</EmptyState>
          : <EmptyState className={css.emptyCard} title="没有匹配的对话">换个关键词，或到「联系人」里找 Skill。</EmptyState>)
        : roomResults.map(roomRow)}</div></>}
    {renderSlot('ds-chat.sidebar.after-rooms', { view, ...(workspaceId === undefined ? {} : { workspaceId }) })}
    {renderSlot('ds-chat.settings.section', { view, ...(workspaceId === undefined ? {} : { workspaceId }) })}

    {activeRoom !== undefined && currentSessionId !== undefined && currentSessionBlank ? <aside className={css.blankRoomDock}><SkillChatHeaderTools sessionId={currentSessionId}/></aside> : null}
    {activeRoom === undefined ? null : renderSlot('ds-chat.room.drawer', { roomId: activeRoom.roomId, ...(currentSessionId === undefined ? {} : { sessionId: currentSessionId }) })}

    {selected !== null ? <Dialog className={`${css.panel} ${css.skillProfileDialog}`} label="Skill 资料" onClose={() => { setSelected(null) }}><div className={css.panelTop}><AnimalAvatar avatarId={personaAvatar} label={personaName}/><IconButton className={css.close} variant="ghost" aria-label="关闭" onClick={() => { setSelected(null) }}>×</IconButton></div>{editingPersona ? <><label className={css.field}><span>昵称</span><input value={personaName} maxLength={24} onChange={event => { setPersonaName(event.target.value) }}/></label><div className={css.avatarLibrary}>{ANIMAL_AVATARS.map(avatarId => <button type="button" data-selected={personaAvatar === avatarId} key={avatarId} onClick={() => { setPersonaAvatar(avatarId) }}><AnimalAvatar avatarId={avatarId} label={avatarId}/></button>)}</div><div className={css.profileActions}><Button className={css.primary} variant="primary" onClick={savePersona}>保存身份</Button><Button className={css.secondaryAction} onClick={resetPersona}>恢复默认</Button></div></> : <><h2 className={css.panelTitle}>{displayOf(selected, mode, state.personas).name}</h2><div className={css.role}>{state.personas[selected.id]?.roleLabel}</div><p className={css.bio}>{selected.description}</p><div className={css.originCard}><span>原始 Skill</span><strong>{selected.name}</strong><small>{selected.sourceLabel}</small></div><div className={css.profileActions}><Button className={css.primary} variant="primary" onClick={() => { void beginContactChat(selected) }}>继续对话</Button><Button className={css.secondaryAction} onClick={() => { setEditingPersona(true) }}>编辑昵称与头像</Button><Button className={css.secondaryAction} onClick={() => { toggleFavorite(selected.id) }}>{favorites.includes(selected.id) ? `★ ${t('frequentContact')}` : `☆ ${t('addFrequent')}`}</Button></div></>}</Dialog> : null}

    {groupOpen ? <Dialog className={css.groupDialog} label={t('newGroup')} onClose={() => { setGroupOpen(false) }}>
        <div className={css.groupHeader}><div><h2>{t('newGroup')}</h2><p>{t('groupWorkspace').replace('{workspace}', currentWorkspace?.title ?? t('noWorkspace'))}</p></div><IconButton className={css.close} variant="ghost" aria-label="关闭" onClick={() => { setGroupOpen(false) }}>×</IconButton></div>
        <div className={css.groupBody}><div className={css.groupFormGrid}><div className={css.groupIdentityEditor}><GroupAvatar avatarId={groupAvatar} label={groupName || '新群组'}/><div><strong>群组头像</strong><small>独立圆形标识，与成员 Skill 清晰区分</small></div></div>
          <label className={css.field}><span>{t('groupName')}</span><input value={groupName} onChange={event => { setGroupName(event.target.value) }} placeholder={t('groupNamePlaceholder')}/></label></div><button className={css.groupMore} type="button" aria-expanded={groupMoreOpen} onClick={() => { setGroupMoreOpen(open => !open) }}><span>更多设置</span><small>头像、群组职能与项目目录</small><b>{groupMoreOpen ? '⌃' : '⌄'}</b></button>{groupMoreOpen ? <div className={css.groupMorePanel}><div className={css.groupAvatarLibrary}>{ANIMAL_AVATARS.map(avatarId => <button type="button" data-selected={groupAvatar === avatarId} key={avatarId} onClick={() => { setGroupAvatar(avatarId) }}><GroupAvatar avatarId={avatarId} label={avatarId} small/></button>)}</div>
          <label className={css.field}><span>群组职能</span><textarea value={groupPrompt} onChange={event => { setGroupPrompt(event.target.value) }} placeholder="描述这个群组负责什么、如何协作以及输出标准。它会作为每次对话的系统提示词…"/></label>
          <button className={css.generatePrompt} type="button" disabled={groupMembers.length === 0} onClick={() => { const members = allContacts.filter(contact => groupMembers.includes(contact.id)); setGroupPrompt(generatedGroupPrompt(groupName.trim() || '协作群组', members)) }}>✦ 根据成员辅助生成</button>
          <div className={css.workspaceBindings}><div className={css.bindingHeader}><span><strong>绑定项目目录</strong><small>默认绑定当前项目；新对话使用第一个项目作为主目录</small></span><button type="button" onClick={() => { void addLinkedWorkspace('create') }}>＋ 添加目录</button></div>{workspaces.items.map(workspace => <button type="button" data-selected={groupWorkspaceIds.includes(workspace.workspaceId)} key={workspace.workspaceId} onClick={() => { toggleWorkspaceBinding('create', workspace.workspaceId) }}><IconFolderOpenOutline16/><span><strong>{workspace.title}</strong><small>{workspace.path}</small></span><b>{groupWorkspaceIds.includes(workspace.workspaceId) ? '✓' : '＋'}</b></button>)}</div>
        </div> : null}<div className={css.memberToolbar}><div><strong>选择成员</strong><small>已选 {groupMembers.length} 个，点击成员可加入或剔出</small></div><input value={memberQuery} onChange={event => { setMemberQuery(event.target.value) }} placeholder="搜索昵称、原始 Skill、能力或 skills.sh…" aria-label="搜索成员" autoComplete="off" spellCheck={false} type="search"/></div>
        <div className={css.groupCandidates}>{visibleMemberContacts.map(contact => { const display = displayOf(contact, 'persona', state.personas); const included = groupMembers.includes(contact.id); return <button className={css.pickRow} data-included={included || undefined} type="button" key={contact.id} onClick={() => { setGroupMembers(current => included ? current.filter(id => id !== contact.id) : [...current, contact.id]) }}><AnimalAvatar avatarId={display.avatar} label={display.name}/><span className={css.pickCopy}><strong>{display.name}</strong><small>{contact.name} · {contact.description}</small></span><b>{included ? '−' : '＋'}</b></button> })}{deferredMemberQuery.length >= 2 && externalPhase === 'loading' ? <div className={css.status}>{t('searchingExternal')}</div> : null}{externalResults.map(result => marketplaceRow(result, 'draft-group'))}</div>
        </div><div className={css.groupFooter}><Button className={css.secondary} onClick={() => { setGroupOpen(false) }}>{t('cancel')}</Button><Button className={css.create} variant="primary" disabled={groupMembers.length < 2 || workspaceId === undefined} onClick={createGroup}>{t('create')}</Button></div>
    </Dialog> : null}

    {automationOpen && activeRoom !== undefined ? <div className={css.groupBackdrop} onMouseDown={event => { if (event.target === event.currentTarget) setAutomationOpen(false) }}><section className={css.automationDialog} role="dialog"><div className={css.groupHeader}><div><h2>新建自动化</h2><p>目标对话：{activeRoom.title}</p></div><button className={css.close} onClick={() => { setAutomationOpen(false) }}>×</button></div><label className={css.field}><span>名称</span><input value={automationName} onChange={event => { setAutomationName(event.target.value) }} placeholder="例如：每周研究简报…"/></label><label className={css.field}><span>任务提示词</span><textarea value={automationPrompt} onChange={event => { setAutomationPrompt(event.target.value) }} placeholder="描述需要团队完成的任务…"/></label><div className={css.scheduleChoice}><button type="button" data-active={automationSchedule === 'once'} onClick={() => { setAutomationSchedule('once') }}>单次运行</button><button type="button" data-active={automationSchedule === 'recurring'} onClick={() => { setAutomationSchedule('recurring') }}>周期运行</button></div><label className={css.field}><span>{automationSchedule === 'once' ? '运行时间' : '首次运行时间'}</span><input type="datetime-local" value={automationWhen} onChange={event => { setAutomationWhen(event.target.value) }}/></label>{automationSchedule === 'recurring' ? <div className={css.repeatFields}><label className={css.field}><span>间隔</span><input inputMode="numeric" min="1" type="number" value={automationInterval} onChange={event => { setAutomationInterval(event.target.value) }}/></label><label className={css.field}><span>单位</span><select value={automationUnit} onChange={event => { setAutomationUnit(event.target.value === 'h' ? 'h' : 'd') }}><option value="h">小时</option><option value="d">天</option></select></label></div> : null}<div className={css.automationSummary}><span>团队</span><strong>{activeRoom.memberIds.length === 0 ? '普通对话（不启用 Skill）' : activeRoom.memberIds.map(id => state.personas[id]?.displayName ?? id).join('、')}</strong><small>{activeRoom.memberIds.length === 0 ? '按普通用户提示词执行' : '未指定 @ 时由协调者处理'}</small></div><div className={css.groupFooter}><button className={css.secondary} onClick={() => { setAutomationOpen(false) }}>取消</button><button className={css.create} disabled={automationPrompt.trim() === ''} onClick={() => { void createAutomation() }}>创建自动化</button></div></section></div> : null}

    {projectTool !== null && activeWorkspace !== undefined ? <WorkbenchDrawer
      tool={projectTool}
      workspaceTitle={activeWorkspace.title}
      workspacePath={activeWorkspace.path}
      listing={projectListing}
      file={projectFile}
      error={projectListingError}
      terminal={terminal}
      terminalCommand={terminalCommand}
      terminalBusy={terminalBusy}
      browserUrl={browserUrl}
      browserDraft={browserDraft}
      canGoBack={browserHistoryIndex > 0}
      canGoForward={browserHistoryIndex < browserHistory.length - 1}
      browserKey={browserKey}
      onClose={closeWorkbench}
      onBrowse={browseCurrentProject}
      onPreviewFile={previewProjectFile}
      onTerminalCommand={setTerminalCommand}
      onTerminalSubmit={submitTerminal}
      onBrowserDraft={setBrowserDraft}
      onBrowserNavigate={navigateBrowser}
      onBrowserBack={() => { const next = Math.max(0, browserHistoryIndex - 1); setBrowserHistoryIndex(next); setBrowserUrl(browserHistory[next] ?? browserUrl); setBrowserDraft(browserHistory[next] ?? browserUrl) }}
      onBrowserForward={() => { const next = Math.min(browserHistory.length - 1, browserHistoryIndex + 1); setBrowserHistoryIndex(next); setBrowserUrl(browserHistory[next] ?? browserUrl); setBrowserDraft(browserHistory[next] ?? browserUrl) }}
      onBrowserRefresh={() => { setBrowserKey(value => value + 1) }}
    /> : null}

    {sidecarOpen && activeRoom !== undefined ? <SidecarDrawer roomTitle={activeRoom.title} messages={sidecarMessages} draft={sidecarDraft} busy={sidecarBusy} error={sidecarError} onDraft={setSidecarDraft} onSubmit={submitSidecar} onClose={closeTemporaryChat}/> : null}

    {archiveConfirm !== null ? <Dialog className={css.confirmDialog} label="归档群组" onClose={() => { setArchiveConfirm(null) }}><h2>归档这个群组？</h2><p>群组会从列表中移除，历史会话仍保留在项目里。此操作没有撤销入口。</p><div className={css.confirmActions}><Button onClick={() => { setArchiveConfirm(null) }}>取消</Button><Button variant="danger" onClick={() => { updateRoom(archiveConfirm, { archivedAt: Date.now() }); setArchiveConfirm(null); setRoomSettingsOpen(false) }}>归档</Button></div></Dialog> : null}

    {roomSettingsOpen && activeRoom?.type === 'group' ? <Drawer className={`${css.panel} ${css.groupSettingsPanel}`} label="群组设置" onClose={() => { setRoomSettingsOpen(false) }}><div className={css.panelTop}><GroupAvatar avatarId={roomAvatarDraft} label={activeRoom.title}/><IconButton className={css.close} variant="ghost" aria-label="关闭" onClick={() => { setRoomSettingsOpen(false) }}>×</IconButton></div><div className={css.groupAvatarLibrary}>{ANIMAL_AVATARS.map(avatarId => <button type="button" data-selected={roomAvatarDraft === avatarId} key={avatarId} onClick={() => { setRoomAvatarDraft(avatarId) }}><GroupAvatar avatarId={avatarId} label={avatarId} small/></button>)}</div><label className={css.field}><span>群组名称</span><input value={roomTitleDraft} onChange={event => { setRoomTitleDraft(event.target.value) }}/></label><label className={css.field}><span>群组职能 · System Prompt</span><textarea value={roomPromptDraft} onChange={event => { setRoomPromptDraft(event.target.value) }} placeholder="定义群组目标、协作方式和输出标准…"/></label><button className={css.generatePrompt} type="button" onClick={() => { setRoomPromptDraft(generatedGroupPrompt(roomTitleDraft.trim() || activeRoom.title, activeMembers)) }}>✦ 根据当前成员重新生成</button><div className={css.workspaceBindings}><div className={css.bindingHeader}><span><strong>绑定项目目录</strong><small>可新增、移除并调整新会话使用的主项目</small></span><button type="button" onClick={() => { void addLinkedWorkspace('settings') }}>＋ 添加目录</button></div>{workspaces.items.map(workspace => <button type="button" data-selected={roomWorkspaceIds.includes(workspace.workspaceId)} key={workspace.workspaceId} onClick={() => { toggleWorkspaceBinding('settings', workspace.workspaceId) }}><IconFolderOpenOutline16/><span><strong>{workspace.title}</strong><small>{workspace.path}</small></span><b>{roomWorkspaceIds.includes(workspace.workspaceId) ? '✓' : '＋'}</b></button>)}</div><div className={css.panelHint}>点击已加入成员可设为协调者；＋ 加入，− 剔出。新对话与历史对话都会读取当前群组职能。</div><div className={css.memberToolbar}><div><strong>全部成员</strong><small>{activeRoom.memberIds.length} 个已加入</small></div><input value={memberQuery} onChange={event => { setMemberQuery(event.target.value) }} placeholder="搜索昵称、Skill 或能力…" aria-label="搜索成员" autoComplete="off" spellCheck={false} type="search"/></div><div className={css.roomMemberGrid}>{visibleMemberContacts.map(contact => { const included = activeRoom.memberIds.includes(contact.id); const coordinator = activeRoom.coordinatorId === contact.id; const display = displayOf(contact, 'persona', state.personas); return <div className={css.roomMemberItem} data-included={included || undefined} key={contact.id}><button type="button" className={css.memberPersona} disabled={!included} onClick={() => { updateRoom(activeRoom.roomId, { coordinatorId: contact.id }) }}><AnimalAvatar avatarId={display.avatar} label={display.name} seed={contact.id}/><span><strong>{display.name}</strong><small>{coordinator ? '协调者' : contact.name}</small></span></button><button type="button" className={css.memberToggle} onClick={() => { toggleActiveRoomMember(contact.id) }}>{included ? '−' : '＋'}</button></div> })}{deferredMemberQuery.length >= 2 && externalPhase === 'loading' ? <div className={css.status}>{t('searchingExternal')}</div> : null}{externalResults.map(result => marketplaceRow(result, 'active-group'))}</div><div className={css.profileActions}><Button className={css.primary} variant="primary" onClick={() => { const linked = roomWorkspaceIds.length === 0 ? [activeRoom.workspaceId] : roomWorkspaceIds; if (roomTitleDraft.trim() !== '') updateRoom(activeRoom.roomId, { title: roomTitleDraft.trim(), systemPrompt: roomPromptDraft.trim(), avatarId: roomAvatarDraft, workspaceId: linked[0] ?? activeRoom.workspaceId, workspaceIds: linked }); setRoomSettingsOpen(false) }}>保存群组</Button><Button className={css.danger} variant="danger" onClick={() => { setArchiveConfirm(activeRoom.roomId) }}>归档群组</Button></div></Drawer> : null}
  </div>
}

export function DSChatBrand(): React.JSX.Element {
  return <span className={css.dsChatBrand}>DS Chat</span>
}
