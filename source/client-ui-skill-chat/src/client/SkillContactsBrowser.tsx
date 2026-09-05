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
  migrateLegacyState, orderRooms, roomForSession, type AutomationDefinition, type ChatRoom, type RoomSession,
  type SkillChatState, type SkillPersona,
} from './model.ts'
import type {} from './shell/slots.ts'
import { Avatar, AvatarStack, Button, ChatBubble, Dialog, Drawer, EmptyState, IconButton, RoomRow, WorkbenchPanel } from './ui/index.tsx'
import { avatarDataUri } from './ui/avatar.tsx'
// Token layer first: every module stylesheet below resolves its colours, type
// steps and radii from it, and the dark scheme is a token swap alone.
import './theme.css'
import { en, zh, type SkillChatKey } from './locales.ts'
import css from './SkillContactsBrowser.module.css'

type View = 'chats' | 'groups' | 'contacts' | 'automations'
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
  readonly path?: string
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
  linkSkill: (path: string, name: string, signal: AbortSignal) => Promise<{ readonly name: string; readonly target: string }>
  forkSession: (sessionId: SessionId, atSeq: number, increaseTitle: boolean) => Promise<SessionId>
  messageSeq: (sessionId: SessionId, messageId: string) => number | undefined
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

/**
 * Starter automations.
 *
 * The tab opened on an empty list and a disabled button, which says what the
 * feature is called but not what it is for. Each entry prefills the dialog so
 * the first automation is one click plus a review, not a blank prompt box.
 */
const AUTOMATION_TEMPLATES: readonly {
  readonly id: string
  readonly name: string
  readonly hint: string
  readonly prompt: string
  readonly schedule: 'once' | 'recurring'
  readonly interval: string
  readonly unit: 'h' | 'd'
}[] = [
  {
    id: 'briefing', name: '每日工作简报', hint: '每天早上汇总进展、待办与风险',
    prompt: '汇总这个项目自昨天以来的进展、今天待办、以及需要我决策的风险。按「进展 / 待办 / 风险」三段输出，每段不超过五条。',
    schedule: 'recurring', interval: '1', unit: 'd',
  },
  {
    id: 'watch', name: '竞品 / 行业监测', hint: '持续跟踪，有变化就提醒',
    prompt: '检索这个领域最近一天的公开动态，只保留与本项目直接相关的变化，给出「发生了什么 / 对我们意味着什么 / 建议动作」。没有实质变化就明确说没有。',
    schedule: 'recurring', interval: '1', unit: 'd',
  },
  {
    id: 'review', name: '代码变更回顾', hint: '每周汇总改动并指出风险',
    prompt: '回顾本周工作区里的代码改动，按模块归纳做了什么，指出其中风险最高的三处并说明理由。',
    schedule: 'recurring', interval: '7', unit: 'd',
  },
  {
    id: 'research', name: '专家团队深研', hint: '组织成员就一个问题做一次深入调研',
    prompt: '就下面这个问题做一次深入调研，先拆解成子问题分工，再合并成一份结论：\n\n（在这里写下你的问题）',
    schedule: 'once', interval: '1', unit: 'd',
  },
  {
    id: 'report', name: '产出报告 / 演示稿', hint: '把已有材料整理成可发布的文档',
    prompt: '把这个房间里已经讨论过的内容整理成一份可直接发布的报告：结论先行，附关键证据与未决问题。',
    schedule: 'once', interval: '1', unit: 'd',
  },
]

/**
 * A first-run time for a template.
 *
 * `createAutomation` falls back to "now" when the field is blank, which turns
 * "每天早上汇总" into "every day at whatever o'clock you clicked the card". A
 * recurring template therefore starts at the next 09:00, and a one-off starts
 * an hour out, both rounded to a whole minute the field can display.
 * @param schedule - whether the template repeats.
 * @returns a local `YYYY-MM-DDTHH:mm` string for `<input type="datetime-local">`.
 */
function templateRunAt(schedule: 'once' | 'recurring'): string {
  const when = new Date()
  if (schedule === 'recurring') {
    if (when.getHours() >= 9) when.setDate(when.getDate() + 1)
    when.setHours(9, 0, 0, 0)
  } else {
    when.setHours(when.getHours() + 1, 0, 0, 0)
  }
  const pad = (value: number): string => String(value).padStart(2, '0')
  return `${when.getFullYear()}-${pad(when.getMonth() + 1)}-${pad(when.getDate())}T${pad(when.getHours())}:${pad(when.getMinutes())}`
}

/**
 * Whether the browser's cached copy should survive a load.
 *
 * `localStorage` is a first-paint cache, not a replica: the Host document is
 * the record. The one case for keeping the local copy is the first run against
 * a Host that has never stored anything, so that state built before the
 * document existed is not thrown away.
 *
 * Anything looser resurrects deleted data. A browser holding an old snapshot
 * used to win whenever the Host had no rooms — so opening a stale tab pushed
 * its rooms back over the Host's, and the newer state was gone.
 * @param remote - the document the Host returned.
 * @param local - what this browser had cached.
 * @returns true when the local copy should be kept.
 */
export function preferLocalState(remote: SkillChatState, local: SkillChatState): boolean {
  const remoteEmpty = remote.rooms.length === 0
    && remote.automations.length === 0
    && Object.keys(remote.personas).length === 0
  const localHasData = local.rooms.length > 0
    || local.automations.length > 0
    || Object.keys(local.personas).length > 0
  return remoteEmpty && localHasData
}

/**
 * Rooms kept across projects.
 *
 * A room belongs to the project it was made in, which is right for a thread but
 * wrong for a team: the roster, the coordinator and the group's brief are worth
 * reusing on the next project. Saving one lists it in every project, and
 * opening it there binds that project in, so the session runs where you are.
 * Stored outside the Host document because it is this person's shortlist, not
 * part of the room graph.
 */
export const SAVED_ROOMS_KEY = 'dsh.skill-chat.saved-rooms.v1'

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
/**
 * Translator for everything outside the browser component.
 *
 * `t` arrives as a prop, which reaches `SkillContactsBrowser` but not the two
 * slot-mounted siblings the Host renders elsewhere, nor the helpers defined at
 * module scope. The Host stamps the chosen locale on `<html lang>`, so reading
 * it there gives the same answer without threading a prop through every one of
 * these call sites.
 * @param key - the message key.
 * @returns the localized string, falling back to Chinese.
 */
function tr(key: SkillChatKey): string {
  const table = document.documentElement.lang.toLowerCase().startsWith('en') ? en : zh
  return table[key] ?? zh[key]
}

/**
 * Close a popover when the pointer goes down outside it, or on Escape.
 *
 * Three menus — create, workbench, project picker — only closed by clicking
 * their own trigger again, which is not how a popover behaves anywhere else:
 * picking nothing left the panel stuck open over the list. One hook rather than
 * three backdrops, because a backdrop also swallows scrolling and the first
 * click that lands on whatever is underneath.
 * @param open - whether the popover is showing.
 * @param close - called once to dismiss it.
 * @returns ref for the popover's own element, so clicks inside are ignored.
 */
function useDismiss(open: boolean, close: () => void): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null)
  const latest = useRef(close)
  latest.current = close
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent): void => {
      const node = ref.current
      if (node !== null && event.target instanceof Node && !node.contains(event.target)) latest.current()
    }
    const onKeyDown = (event: KeyboardEvent): void => { if (event.key === 'Escape') latest.current() }
    // Capture, so a trigger that toggles on click still sees its own event
    // first and a second click on it does not immediately reopen.
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])
  return ref
}

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

/**
 * Who a message belongs to.
 *
 * The reply's own opening line wins: the coordinator is asked to start a
 * relayed result with `@nickname`, and that is a statement about authorship,
 * where the user's `@` is only a request. The request is the fallback, and the
 * coordinator answers for anything neither names.
 * @param members - the room's Skills.
 * @param leaderId - the coordinator's contact id.
 * @param text - the user's message for this turn.
 * @param mode - whether names are shown as personas or raw Skill names.
 * @param reply - the assistant's own text, when it has been rendered.
 * @returns the member to attribute the message to.
 */
export function responderForMessage(
  members: readonly SkillContact[],
  leaderId: string | undefined,
  text: string,
  mode: ContactMode,
  reply = '',
): SkillContact | undefined {
  const named = (source: string): readonly SkillContact[] => members.filter((member) => {
    const display = displayOf(member, mode)
    return source.includes(`@${display.name}`) || source.includes(`@${member.name}`)
  })
  // Only the opening of the reply attributes it; an `@` deeper in the text is
  // the coordinator talking about a member, not speaking as one.
  const declared = named(reply.slice(0, 40))
  if (declared.length === 1) return declared[0]
  const mentioned = named(text)
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

/**
 * The group's brief.
 *
 * This used to end with "do not claim real parallel execution", which was
 * honest while members were personas in a prompt and nothing more. They are
 * now linked into the Harness's own Skill root, and this preset gives the
 * model a `subagent` tool that runs in the background by default and returns
 * immediately — so several members genuinely can work at once, and the
 * instruction to pretend otherwise had become the thing standing in the way.
 *
 * Each relayed result opens with `@nickname` because that line is what the
 * sidebar reads to put the right face on the message.
 * @param name - the room's title.
 * @param members - the Skills in the room.
 * @returns the system prompt.
 */
function generatedGroupPrompt(name: string, members: readonly SkillContact[]): string {
  const roster = members.map(member => `- @${member.name}：${member.description}`).join('\n')
  return `你是「${name || tr('collabGroup')}」的协调者。根据用户目标组织以下成员协作，优先给出明确、可执行且可验证的结果。

成员：
${roster}

工作规则：
1. 用户明确 @ 某个成员时，交给该成员。
2. 没有明确 @ 时，你先拆解任务，再决定交给谁。
3. 一次需要多个成员时，用 subagent 工具为每个成员各起一个后台子代理并发进行；不要串行等待。给每个子代理的提示里写明「先加载 <成员名> 这个 Skill，再按它的方法完成以下任务」。
4. 单个成员就能完成，或任务很小时，直接自己加载对应 Skill 处理，不必起子代理。
5. 转述某个成员的结果时，该段以「@成员名」开头，再换行写内容。这是界面据以标注发言人的依据。
6. 只陈述真实发生的事：并发就说并发，自己做的就说自己做的。`
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
  /** Cut a fork at one message; see {@link SkillChatMessageActions}. */
  readonly onBranch: (atSeq: number, kind: 'revert' | 'fork') => Promise<void>
  readonly messageSeq: (sessionId: SessionId, messageId: string) => number | undefined
  readonly onNotice: (text: string) => void
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
  const historyRef = useDismiss(historyOpen, () => { setHistoryOpen(false) })
  const [workbenchOpen, setWorkbenchOpen] = useState(false)
  const workbenchRef = useDismiss(workbenchOpen, () => { setWorkbenchOpen(false) })
  if (bridge === null || bridge.sessionId !== sessionId) return null
  const room = bridge.room
  const history = room.sessionIds.toReversed().flatMap(id => bridge.roomSessions.find(item => item.roomSessionId === id) ?? [])
  // Files, terminal, diff and browser are a workbench, not chat actions. Four
  // unlabelled glyphs competing with three text buttons made the room header
  // read as a toolbar; behind one labelled entry they read as what they are.
  const workbenchItems: readonly { readonly tool: ProjectToolKind, readonly label: string, readonly icon: React.JSX.Element }[] = [
    { tool: 'files', label: tr('projectFiles'), icon: <IconFolderOpenOutline16/> },
    { tool: 'terminal', label: tr('terminalLabel'), icon: <IconCodeOutline16/> },
    { tool: 'diff', label: tr('viewDiff'), icon: <IconBranchOutline16/> },
    { tool: 'browser', label: tr('browserLabel'), icon: <IconGlobeOutline14/> },
  ]
  const detail = room.type === 'group'
    ? `${room.memberIds.length} 名成员 · ${bridge.coordinatorName ?? tr('coordinator')} 协调`
    : `${bridge.workspaceTitle} · 直接对话`
  return <div className={css.headerTools}>
    <span className={css.headerIdentity}>
      <AvatarStack className={css.headerAvatarStack} overlap={9}>{bridge.memberPersonas.slice(0, 4).map((member, index) => <span key={member.id} style={{ zIndex: 5 - index }}><Avatar avatarId={member.avatarId} label={member.name} seed={member.id} size={24}/></span>)}</AvatarStack>
      <span className={css.headerIdentityCopy}><strong>{room.title}</strong><small>{detail}</small></span>
    </span>
      <span className={css.headerActionsCluster}>
      <span className={css.headerMenuWrap} ref={workbenchRef as React.RefObject<HTMLSpanElement>}>
        <button className={css.headerTextButton} type="button" aria-expanded={workbenchOpen} onClick={() => { setWorkbenchOpen(open => !open) }}>{tr('workbench')}</button>
        {workbenchOpen ? <span className={css.headerMenu}>{workbenchItems.map(item => <button type="button" key={item.tool} onClick={() => { setWorkbenchOpen(false); bridge.onProjectTool(item.tool) }}>{item.icon}<span>{item.label}</span></button>)}<span className={css.headerMenuSep}/><button type="button" onClick={() => { setWorkbenchOpen(false); bridge.onTemporaryChat() }}><IconNewChatOutline16/><span>{tr('tempChat')}</span></button></span> : null}
      </span>
        <span className={css.headerDivider}/>
        {bridge.headerActions}
        {room.type === 'group' ? <button className={css.headerTextButton} type="button" onClick={bridge.onSettings}>{tr('membersAndRoles')}</button> : null}
      <span className={css.headerMenuWrap} ref={historyRef as React.RefObject<HTMLSpanElement>}>
        <button className={css.headerTextButton} type="button" aria-expanded={historyOpen} onClick={() => { setHistoryOpen(open => !open) }}>历史 {history.length}</button>
        {historyOpen ? <span className={css.headerMenu}>{history.map(item => { const current = item.harnessSessionId === sessionId; return <button type="button" data-active={current} disabled={current} key={item.roomSessionId} onClick={() => { bridge.onHistory(item); setHistoryOpen(false) }}><span>{item.title}</span><small>{current ? tr('currentChat') : new Date(item.updatedAt).toLocaleString()}</small></button> })}{history.length <= 1 ? <span className={css.headerMenuHint}>{tr('historySingleHint')}</span> : null}</span> : null}
      </span>
      <Button className={css.headerNewButton} variant="primary" size="small" onClick={bridge.onNewSession}>{tr('newConversation')}</Button>
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
export function SkillChatMessageActions(
  { messageId }: { readonly messageId: string },
): React.JSX.Element | null {
  const bridge = useHeaderBridge()
  const [busy, setBusy] = useState<'revert' | 'fork' | null>(null)
  if (bridge === null) return null
  const branch = (kind: 'revert' | 'fork'): void => {
    const atSeq = bridge.messageSeq(bridge.sessionId, messageId)
    // Outside the loaded window there is no seq to cut at, and forking the
    // whole Session instead would silently do the wrong thing.
    if (atSeq === undefined) { bridge.onNotice(tr('branchOutOfWindow')); return }
    setBusy(kind)
    void bridge.onBranch(atSeq, kind).catch((error: unknown) => {
      bridge.onNotice(`${tr('branchFailed')}：${error instanceof Error ? error.message : String(error)}`)
    }).finally(() => { setBusy(null) })
  }
  return <span className={css.messageActions}>
    <button type="button" disabled={busy !== null} onClick={() => { branch('revert') }} title={tr('revertHereHint')}>
      {busy === 'revert' ? tr('working') : tr('revertHere')}
    </button>
    <button type="button" disabled={busy !== null} onClick={() => { branch('fork') }} title={tr('forkHereHint')}>
      {busy === 'fork' ? tr('working') : tr('forkHere')}
    </button>
  </span>
}

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
    return <EmptyState className={css.drawerEmpty} title="这个项目不在 Git 仓库里">{tr('diffNeedsGit')}</EmptyState>
  }
  // Without a patch there is nothing to colour, and dumping the raw preamble —
  // a prompt echo, or git's own usage text — is worse than saying so plainly.
  if (!patched) return <EmptyState className={css.drawerEmpty} title="没有未提交的改动">{tr('emptyWorkspace')}</EmptyState>
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
  const title = props.tool === 'files' ? tr('projectFiles') : props.tool === 'terminal' ? tr('terminalLabel') : props.tool === 'diff' ? '代码变更' : tr('browserLabel')
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
            {props.error !== null ? <div className={css.status}>{props.error}</div> : props.listing === null ? <div className={css.status}>{tr('readingDir')}</div> : <>
              {props.listing.parent === undefined ? null : <button type="button" onClick={() => { props.onBrowse(props.listing?.parent) }}><IconFolderOpenOutline16/><span>{tr('backParent')}</span></button>}
              {props.listing.entries.filter(entry => !entry.hidden).toSorted((left, right) => left.kind === right.kind ? left.name.localeCompare(right.name) : left.kind === 'directory' ? -1 : 1).map(entry => <button type="button" data-selected={props.file?.path === entry.path || undefined} key={entry.path} onClick={() => { if (entry.kind === 'directory') props.onBrowse(entry.path); else props.onPreviewFile(entry.path) }}>{entry.kind === 'directory' ? <IconFolderOpenOutline16/> : <IconCodeOutline16/>}<span>{entry.name}</span></button>)}
            </>}
          </div>
        </div>
        <div className={css.filePreview}>
          {props.file === null ? <div className={css.drawerEmpty}>{tr('pickFileHint')}</div> : <><div className={css.filePreviewMeta}><strong>{props.file.name}</strong><small>{props.file.language} · {fileSize(props.file.size)}{props.file.truncated ? tr('truncated') : ''}</small></div>{props.file.binary ? <div className={css.drawerEmpty}>{tr('binaryFile')}</div> : <div className={css.filePreviewBody}>{(props.file.content ?? '').split('\n').map((line, index) => <div className={css.codeLine} key={index}><span className={css.codeLineNo}>{index + 1}</span><span className={css.codeLineText}>{line || '\u00a0'}</span></div>)}</div>}</>}
        </div>
      </div> : null}
      {props.tool === 'diff' ? <div className={css.diffWorkbench}>
        {props.error !== null ? <div className={css.status}>{props.error}</div>
          : props.terminalBusy && props.terminal === null ? <div className={css.status}>{tr('readingDiff')}</div>
          : <DiffView text={props.terminal?.text ?? ''}/>}
      </div> : null}
      {props.tool === 'terminal' ? <div className={css.terminalWorkbench}>
        <pre className={css.terminalOutput} ref={element => { if (element !== null) element.scrollTop = element.scrollHeight }}>{props.error ?? props.terminal?.text ?? (props.terminalBusy ? tr('startingTerminal') : tr('terminalIdle'))}</pre>
        {props.tool === 'terminal' ? <form className={css.terminalComposer} onSubmit={event => { event.preventDefault(); props.onTerminalSubmit() }}><span>$</span><input value={props.terminalCommand} onChange={event => { props.onTerminalCommand(event.target.value) }} placeholder="输入命令，例如 pnpm test…" aria-label="终端命令" autoComplete="off" spellCheck={false} autoFocus/><button type="submit" disabled={props.terminalBusy || props.terminal === null}>{tr('runLabel')}</button></form> : <div className={css.workbenchFootnote}>{tr('diffExplainer')}</div>}
      </div> : null}
      {props.tool === 'browser' ? <div className={css.browserWorkbench}>
        <form className={css.browserBar} onSubmit={event => { event.preventDefault(); props.onBrowserNavigate(props.browserDraft) }}>
          <button type="button" disabled={!props.canGoBack} onClick={props.onBrowserBack}>←</button>
          <button type="button" disabled={!props.canGoForward} onClick={props.onBrowserForward}>→</button>
          <button type="button" onClick={props.onBrowserRefresh}>↻</button>
          <input value={props.browserDraft} onChange={event => { props.onBrowserDraft(event.target.value) }} aria-label="浏览器地址"/>
          <button type="submit">{tr('openLabel')}</button>
        </form>
        <iframe key={props.browserKey} className={css.browserFrame} src={props.browserUrl} title="项目浏览器预览" sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"/>
        <div className={css.workbenchFootnote}>{tr('embedBlocked')}<a href={props.browserUrl} target="_blank" rel="noreferrer">{props.browserUrl}</a></div>
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
    <header className={css.sidecarHeader}><span><strong>{tr('tempChat')}</strong><small>基于「{props.roomTitle}」当前上下文，不影响主会话</small></span><IconButton className={css.close} variant="ghost" aria-label="关闭" onClick={props.onClose}>×</IconButton></header>
    <div className={css.sidecarMessages}>{props.messages.length === 0 ? <EmptyState className={css.sidecarWelcome} title="开一条旁路思路">{tr('sideChatHint')}</EmptyState> : props.messages.map(message => <ChatBubble className={css.sidecarMessage} role={message.role} key={message.id}>{message.text}</ChatBubble>)}{props.busy ? <div className={css.sidecarThinking}>{tr('thinking')}</div> : null}{props.error === null ? null : <div className={css.sidecarError}>{props.error}</div>}</div>
    <form className={css.sidecarComposer} onSubmit={event => { event.preventDefault(); props.onSubmit() }}><textarea value={props.draft} onChange={event => { props.onDraft(event.target.value) }} placeholder="在当前上下文旁边继续问…" aria-label="旁路提问" autoComplete="off"/><Button variant="primary" type="submit" disabled={props.busy || props.draft.trim() === ''}>{tr('send')}</Button></form>
  </Drawer>
}

export function SkillContactsBrowser(props: SkillContactsBrowserProps): React.JSX.Element {
  const {
    wide, expandSidebar, useSessions, useWorkspaces, loadContacts, searchExternal, openSession, renameSession,
    startSession, addWorkspace, chooseContact, chooseGroup, loadState, saveState, runAutomation: runAutomationRemote,
    linkSkill, forkSession, messageSeq,
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
  const [savedRooms, setSavedRooms] = useState<readonly string[]>(() => readStored(SAVED_ROOMS_KEY, []))
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
  const createRef = useDismiss(createOpen, () => { setCreateOpen(false) })
  const [groupMoreOpen, setGroupMoreOpen] = useState(false)
  const [archiveConfirm, setArchiveConfirm] = useState<string | null>(null)
  const [dragRoom, setDragRoom] = useState<string | null>(null)
  const [dropRoom, setDropRoom] = useState<string | null>(null)
  const [roomMenu, setRoomMenu] = useState<{ readonly roomId: string; readonly x: number; readonly y: number } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [showArchived, setShowArchived] = useState(false)
  const [rootBusy, setRootBusy] = useState<string | null>(null)
  const [groupName, setGroupName] = useState('')
  const [groupPrompt, setGroupPrompt] = useState('')
  const [groupAvatar, setGroupAvatar] = useState('bear-honey')
  const [groupMembers, setGroupMembers] = useState<readonly string[]>([])
  const [groupWorkspaceIds, setGroupWorkspaceIds] = useState<readonly WorkspaceId[]>([])
  const [memberQuery, setMemberQuery] = useState('')
  const deferredMemberQuery = useDeferredValue(memberQuery.trim().toLocaleLowerCase())
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const workspaceRef = useDismiss(workspaceOpen, () => { setWorkspaceOpen(false) })
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
  const archivedRooms = useMemo(() => state.rooms.filter(room => room.workspaceId === workspaceId && room.archivedAt !== undefined).sort((left, right) => (right.archivedAt ?? 0) - (left.archivedAt ?? 0)), [state.rooms, workspaceId])
  const visibleRooms = useMemo(() => orderRooms(state.rooms.filter(room => room.archivedAt === undefined
    && (room.workspaceId === workspaceId
      || (room.workspaceIds ?? []).includes(workspaceId as WorkspaceId)
      // A saved room is a team, and a team is not the property of one project.
      || savedRooms.includes(room.roomId)))), [savedRooms, state.rooms, workspaceId])
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
  /**
   * Resolve a stored member id to a contact.
   *
   * A contact id is `<root>:<plugin>:<name>`, so widening the catalog's roster
   * re-keys contacts and orphans ids already stored in rooms. The trailing
   * segment is the Skill's name, which is unique after dedup, so it recovers
   * the member without a migration.
   * @param id - the stored contact id.
   * @returns the contact, or undefined when the Skill is gone entirely.
   */
  const memberContact = (id: string): SkillContact | undefined =>
    allContacts.find(contact => contact.id === id)
      ?? allContacts.find(contact => contact.name === id.slice(id.lastIndexOf(':') + 1))

  const activeMembers = activeRoom?.memberIds.flatMap(id => memberContact(id) ?? []) ?? []
  const activeCoordinator = activeRoom === undefined
    ? undefined
    : memberContact(activeRoom.coordinatorId) ?? activeMembers[0]
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
      replaceState(preferLocalState(remoteState, stateRef.current) ? stateRef.current : remoteState)
      setStateReady(true)
    }, (error: unknown) => {
      // Deliberately leaves `stateReady` false, which keeps the save effect from
      // running: a load that failed gives no basis for replacing the stored
      // document, and writing the in-memory copy anyway would delete whatever
      // the Host actually holds.
      if (abort.signal.aborted) return
      setNotice(`会话状态加载失败，本次改动不会保存：${error instanceof Error ? error.message : String(error)}`)
    })
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
    // Merged, never spread over the current state. A one-time import of what
    // this browser kept in `localStorage` may only add: spreading it replaced
    // `rooms` wholesale, so opening a Host document written before `migratedAt`
    // existed in a browser with nothing to import deleted every room it held.
    // Existing entries win on a collision — the Host's copy is the record.
    updateState(current => ({
      ...current,
      ...migrated,
      rooms: [...current.rooms, ...migrated.rooms.filter(room => !current.rooms.some(item => item.roomId === room.roomId))],
      roomSessions: [
        ...current.roomSessions,
        ...migrated.roomSessions.filter(session => !current.roomSessions.some(item => item.roomSessionId === session.roomSessionId)),
      ],
    }))
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
  useEffect(() => { store(SAVED_ROOMS_KEY, savedRooms) }, [savedRooms])
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
        const answer = reply.querySelector('[data-assistant-reply]')?.textContent ?? ''
        const responder = responderForMessage(activeMembers, activeRoom.coordinatorId, user?.textContent ?? '', mode, answer)
        if (responder === undefined) continue
        const display = displayOf(responder, mode, state.personas)
        reply.dataset.skillResponder = display.name
        // Overrides the room-wide portrait for this message only. Every reply
        // wearing the coordinator's face made a group read as one voice.
        reply.style.setProperty('--ds-chat-speaker-avatar', `url("${avatarDataUri(display.avatar, 64)}")`)
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
    headline.textContent = activeRoom.type === 'general' ? t('startNewChat') : `和「${activeRoom.title}」一起开始`
    welcome.dataset.skillChatWelcome = activeRoom.type
    welcome.dataset.skillChatHint = activeRoom.type === 'general' ? t('plainChatHint') : activeRoom.type === 'group' ? t('composerGroup') : t('composerSkill')
    return () => {
      headline.textContent = original
      delete welcome.dataset.skillChatWelcome
      delete welcome.dataset.skillChatHint
    }
  }, [activeRoom])

  const bindChat = (sessionId: SessionId, binding: ChatBinding): void => {
    setChatBindings(current => ({ ...current, [sessionId]: binding }))
  }

  /**
   * Cut a branch of this conversation at one message.
   *
   * The Host copies the prefix into a child Session; recording that child as a
   * Room Session is what keeps it inside the room — same members, same
   * portraits, and reachable from 历史 beside the branch it came from. Nothing
   * is removed: the original stays exactly where it was.
   * @param room - the room the conversation belongs to.
   * @param sessionId - the Session being branched.
   * @param atSeq - log sequence to cut at.
   * @param kind - `revert` keeps the title, `fork` takes a numbered one.
   */
  const branchRoomSession = async (
    room: ChatRoom,
    sessionId: SessionId,
    atSeq: number,
    kind: 'revert' | 'fork',
  ): Promise<void> => {
    const childId = await forkSession(sessionId, atSeq, kind === 'fork')
    const members = room.memberIds.flatMap(id => allContacts.find(contact => contact.id === id) ?? [])
    const now = Date.now()
    const roomSessionId = `room-session:${childId}`
    const source = stateRef.current.roomSessions.find(item => item.harnessSessionId === sessionId)
    const roomSession: RoomSession = {
      roomSessionId,
      roomId: room.roomId,
      harnessSessionId: childId,
      title: kind === 'fork' ? `${source?.title ?? room.title} · ${t('branchSuffix')}` : source?.title ?? room.title,
      // The snapshot is copied rather than rebuilt: a branch should show the
      // roster the original ran with, not whatever the catalog says today.
      memberSnapshot: source?.memberSnapshot ?? members.map((member) => {
        const display = displayOf(member, 'persona', state.personas)
        return { skillId: member.id, displayName: display.name, avatarId: display.avatar, originalName: member.name }
      }),
      createdAt: now,
      updatedAt: now,
    }
    const next = updateState((current) => {
      const stored = current.rooms.find(item => item.roomId === room.roomId) ?? room
      return {
        ...current,
        roomSessions: [...current.roomSessions, roomSession],
        rooms: current.rooms.map(item => item.roomId === room.roomId
          ? { ...stored, sessionIds: [...stored.sessionIds, roomSessionId], activeSessionId: roomSessionId, updatedAt: now }
          : item),
      }
    })
    await saveState(next, new AbortController().signal)
    openSession(childId)
    setNotice(kind === 'fork' ? t('forkedNotice') : t('revertedNotice'))
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
    // A saved room opened under another project has to be bound to it, or the
    // session it starts would run against the directory it was built in.
    if (workspaceId !== undefined && !(room.workspaceIds ?? [room.workspaceId]).includes(workspaceId)) {
      updateRoom(room.roomId, { workspaceIds: [...(room.workspaceIds ?? [room.workspaceId]), workspaceId] })
    }
    // Also on open, not only on creation: rooms built before linking existed
    // hold members the Host's Skill service has never seen, and their brief
    // then tells the model to load Skills it cannot find.
    ensureLinked(room.memberIds)
    const sessionId = activeHarnessSession(room, stateRef.current.roomSessions)
    if (sessionId !== undefined && sessions.byId[sessionId] !== undefined) { openSession(sessionId); return }
    await createRoomSession(room)
  }

  /**
   * Make these Skills loadable by the model.
   *
   * A scanned Skill is only a contact card: the Host's Skill service never saw
   * it, so a model that tries to load one gets `skill "X" is unknown or no
   * longer available` — which is what happened whenever a group of imported
   * Skills was actually put to work. Linking the bundle into the Harness's own
   * Skill root registers it for real, and the Host watches that directory, so
   * the catalog updates without a restart.
   *
   * Linking on membership rather than on a button: a Skill in a room is a Skill
   * the person expects to work. Failures are reported once and do not block the
   * room — an unlinked member still participates as a persona.
   * @param ids - contact ids joining a room.
   */
  const ensureLinked = (ids: readonly string[]): void => {
    const pending = ids.flatMap((id) => {
      // Matching by id alone misses every member of a room built before the
      // catalog's roster changed: a contact id is `<root>:<plugin>:<name>`, so
      // widening the roster re-keys contacts and orphans the stored ids. The
      // trailing segment is the Skill's name, which is unique after dedup.
      const contact = memberContact(id)
      return contact?.source === 'workbuddy' && contact.path !== undefined
        ? [{ path: contact.path, name: contact.name }]
        : []
    })
    if (pending.length === 0) return
    const abort = new AbortController()
    void Promise.allSettled(pending.map(entry => linkSkill(entry.path, entry.name, abort.signal)))
      .then((results) => {
        const failed = results.filter(result => result.status === 'rejected').length
        if (failed > 0) setNotice(`${t('enableSkillFailed')}：${failed}/${pending.length}`)
        setContactsRevision(current => current + 1)
      })
  }

  const beginContactChat = async (contact: SkillContact): Promise<void> => {
    if (workspaceId === undefined) { setNotice(t('workspaceRequired')); return }
    const existing = state.rooms.find(room => room.type === 'direct' && room.workspaceId === workspaceId && room.memberIds[0] === contact.id && room.archivedAt === undefined)
    ensureLinked([contact.id])
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
      roomId: `room:general:${randomUUID()}`, type: 'general', workspaceId, workspaceIds: [workspaceId], title: t('plainChat'),
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
    ensureLinked(members.map(member => member.id))
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

  /** Pin or unpin one room. Pinning clears any manual position: the room is
   * moving to the other band, where its old index means nothing. */
  const togglePin = (room: ChatRoom): void => {
    updateState(current => ({
      ...current,
      rooms: current.rooms.map((item) => {
        if (item.roomId !== room.roomId) return item
        const { pinnedAt: _pinned, order: _order, ...rest } = item
        return room.pinnedAt === undefined ? { ...rest, pinnedAt: Date.now() } : rest
      }),
    }))
  }

  /**
   * Move a dragged room in front of another, writing an explicit position for
   * every room in the band. Numbering the whole band rather than the two rows
   * involved keeps one drag from leaving neighbours to fall back to recency
   * and jump around it.
   * @param draggedId - the room being moved.
   * @param targetId - the room it was dropped on.
   */
  const reorderRooms = (draggedId: string, targetId: string): void => {
    if (draggedId === targetId) return
    const dragged = visibleRooms.find(room => room.roomId === draggedId)
    const target = visibleRooms.find(room => room.roomId === targetId)
    if (dragged === undefined || target === undefined) return
    // Bands are independent lists; dropping across them would need a pin state
    // change the person did not ask for.
    if ((dragged.pinnedAt === undefined) !== (target.pinnedAt === undefined)) return
    const band = visibleRooms.filter(room => (room.pinnedAt === undefined) === (dragged.pinnedAt === undefined))
    const without = band.filter(room => room.roomId !== draggedId)
    const at = without.findIndex(room => room.roomId === targetId)
    const next = [...without.slice(0, at), dragged, ...without.slice(at)]
    const positions = new Map(next.map((room, index) => [room.roomId, index]))
    updateState(current => ({
      ...current,
      rooms: current.rooms.map(item => positions.has(item.roomId) ? { ...item, order: positions.get(item.roomId) ?? 0 } : item),
    }))
  }

  /** Bring an archived room back. The field is dropped rather than set to
   * `undefined`: the stored document is compared by value, and a key holding
   * `undefined` is not the same shape as no key at all. */
  const restoreRoom = (roomId: string): void => {
    updateState(current => ({
      ...current,
      rooms: current.rooms.map((item) => {
        if (item.roomId !== roomId) return item
        const { archivedAt: _archived, ...rest } = item
        return { ...rest, updatedAt: Date.now() }
      }),
    }))
  }

  /** Remove a room and every session record that belonged to it. The Harness
   * Sessions themselves are left alone: they are the project's history, and
   * this only drops the chat-shaped view of them. */
  const deleteRoom = (roomId: string): void => {
    updateState(current => ({
      ...current,
      rooms: current.rooms.filter(item => item.roomId !== roomId),
      roomSessions: current.roomSessions.filter(item => item.roomId !== roomId),
      automations: current.automations.filter(item => item.roomId !== roomId),
    }))
  }

  const updateRoom = (roomId: string, patch: Partial<Pick<ChatRoom, 'title' | 'memberIds' | 'coordinatorId' | 'systemPrompt' | 'avatarId' | 'workspaceId' | 'workspaceIds' | 'archivedAt'>>): void => {
    updateState(current => ({ ...current, rooms: current.rooms.map(room => room.roomId === roomId ? { ...room, ...patch, updatedAt: Date.now() } : room) }))
  }

  const toggleActiveRoomMember = (skillId: string): void => {
    if (activeRoom === undefined || activeRoom.type !== 'group') return
    const included = activeRoom.memberIds.includes(skillId)
    const memberIds = included ? activeRoom.memberIds.filter(id => id !== skillId) : [...activeRoom.memberIds, skillId]
    if (memberIds.length < 2) { setNotice(t('groupNeedsMember')); return }
    if (!included) ensureLinked([skillId])
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
      automationId: `automation:${randomUUID()}`, name: automationName.trim() || t('untitledAutomation'), workspaceId,
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
      setNotice(t('automationCreated'))
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
      setNotice(t('automationStarted'))
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

  // Active automations for this project; the entry carries the count the tab
  // strip used to show by being visible at all.
  const dueAutomations = state.automations
    .filter(item => item.workspaceId === workspaceId && item.status === 'active').length

  // Groups this project can reach, newest first — the same set the room list
  // shows, minus the one-to-one conversations.
  const visibleGroups = useMemo(
    () => visibleRooms.filter(room => room.type === 'group'),
    [visibleRooms],
  )

  const groupResults = useMemo(() => {
    const needle = deferredQuery.trim().toLocaleLowerCase()
    if (needle.length === 0) return visibleGroups
    return visibleGroups.filter(room => room.title.toLocaleLowerCase().includes(needle))
  }, [deferredQuery, visibleGroups])

  const roomAvatar = (room: ChatRoom, compact = false): React.JSX.Element => {
    if (room.type === 'general') return <span className={css.generalAvatar} data-compact={compact || undefined}>✦</span>
    if (room.type === 'group') {
      const members = room.memberIds.slice(0, 4).flatMap((id) => {
        // Same fallback the rest of the room code uses: a stored id whose root
        // prefix went stale still names its Skill in the trailing segment, and
        // without this the tile drops back to the placeholder mark.
        const contact = memberContact(id)
        if (contact === undefined) return []
        const identity = displayOf(contact, 'persona', state.personas)
        return [{ id, ...identity }]
      })
      if (members.length === 0) return <GroupAvatar avatarId={room.avatarId ?? ANIMAL_AVATARS[hashOf(room.roomId) % ANIMAL_AVATARS.length] ?? 'bear-honey'} label={room.title} small={compact}/>
      // A rounded square, not a row of overlapping circles: the shape is what
      // says "group" at 30px, the way it does in every messaging client, and
      // four portraits in a 2x2 read as one object where 1x3 read as clutter.
      return <span className={css.roomTile} data-count={members.length} data-compact={compact || undefined} title={room.title}>
        {members.map(member => <Avatar key={member.id} avatarId={member.avatar} label={member.name} size={compact ? 13 : 17}/>)}
      </span>
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
      setProjectListingError(t('pickProjectFirst'))
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
      workspaceTitle: activeWorkspace?.title ?? t('currentProject'),
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
      onBranch: (atSeq, kind) => branchRoomSession(activeRoom, currentSessionId, atSeq, kind),
      messageSeq,
      onNotice: setNotice,
    })
    return () => {
      if (headerBridgeValue?.sessionId === currentSessionId) publishHeaderBridge(null)
    }
  }, [activeCoordinator, activeMembers, activeRoom, activeWorkspace?.title, currentSessionId, messageSeq, renderSlot, state.personas, state.roomSessions])

  // Publish the speaking Skill's portrait to the document so the transcript can
  // put a face beside the reply. The conversation column is the shell's, drawn
  // outside this component's tree, so a custom property is the only handle the
  // plugin has on it — and it costs nothing when no DS Chat room is open.
  useEffect(() => {
    const speaker = activeCoordinator ?? activeMembers[0]
    const identity = speaker === undefined ? undefined : displayOf(speaker, 'persona', state.personas)
    const root = document.documentElement
    if (activeRoom === undefined || identity === undefined) {
      root.style.removeProperty('--ds-chat-speaker-avatar')
      root.removeAttribute('data-ds-chat-room')
      return
    }
    root.style.setProperty('--ds-chat-speaker-avatar', `url("${avatarDataUri(identity.avatar, 64)}")`)
    root.setAttribute('data-ds-chat-room', activeRoom.type)
    return () => {
      root.style.removeProperty('--ds-chat-speaker-avatar')
      root.removeAttribute('data-ds-chat-room')
    }
  }, [activeCoordinator, activeMembers, activeRoom, state.personas])

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
    const card = <div className={css.hoverProfile}><strong>{result.name}</strong><span>{result.description ?? t('skillsShNote')}</span><small>{result.source} · {result.installs.toLocaleString()} 次安装</small><a href={homepage} target="_blank" rel="noreferrer">{t('skillsShHome')}</a></div>
    return <HoverCard key={result.id} anchor={<div className={css.marketResult}><span className={css.marketAvatar}>↗</span><span className={css.copy}><strong>{result.name}</strong><small>{result.description ?? `${result.source} · ${result.installs.toLocaleString()} 次安装`}</small></span><div className={css.marketActions}><button type="button" disabled={installed !== undefined || installingId === result.id} onClick={() => { void joinExternal(result) }}>{installed !== undefined ? t('installedLabel') : installingId === result.id ? t('installing') : t('installLabel')}</button>{target !== undefined ? <button className={css.installJoin} type="button" disabled={included || installingId === result.id} onClick={installAndJoin}>{included ? t('joinedLabel') : installed === undefined ? t('installAndJoin') : t('joinLabel')}</button> : null}</div></div>} content={card} copyLabel="复制 Skill 链接" copiedLabel="已复制" copyText={homepage}/>
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
    const directContact = room.type === 'direct' ? allContacts.find(item => item.id === room.memberIds[0]) : undefined
    const meta = room.type === 'group' ? `${room.memberIds.length} ${t('peopleCount')}` : ''
    // A fresh session is named after its room, so echoing it under the title
    // would print the same string twice; fall back to something the title does
    // not already say.
    const sessionTitle = latest?.title === room.title ? undefined : latest?.title
    const preview = running
      ? t('typing')
      : sessionTitle ?? (room.type === 'group'
        ? (coordinator === undefined ? t('noCoordinator') : `${displayOf(coordinator, 'persona', state.personas).name} ${t('coordinates')}`)
        : room.sessionIds.length > 1
          ? `${room.sessionIds.length} ${t('sessionCount')}`
          // A room named after a persona says nothing about what the Skill does,
          // so an empty direct chat borrows the Skill's own one-liner rather
          // than reporting that nothing has happened yet.
          : directContact?.description ?? t('noMessages'))
    // A direct room is a conversation with one Skill, so its card is that
    // Skill's card: the persona name alone ("湖心 2") says nothing about what
    // it does, which is the one thing a person hovering wants to know.
    const hover = <div className={css.hoverProfile}>
      <strong>{room.title}</strong>
      <span>{room.type === 'direct'
        ? directContact?.description ?? t('directRoomFallback')
        : room.systemPrompt?.trim() || t('groupRoomFallback')}</span>
      {directContact === undefined ? null : <small translate="no">{t('identifier')}：{directContact.name} · {directContact.sourceLabel}</small>}
      <small>{room.sessionIds.length} {t('sessionCount')}{room.type === 'group' ? ` · ${room.memberIds.length} ${t('memberCount')}` : ''}</small>
      <small>{t('projectLabel')}：{linked.join('、') || t('unbound')}</small>
    </div>
    const pinned = room.pinnedAt !== undefined
    return <div
      className={css.roomRowWrap}
      key={room.roomId}
      data-dragging={dragRoom === room.roomId || undefined}
      data-drop={dropRoom === room.roomId || undefined}
      draggable
      onDragStart={(event) => { setDragRoom(room.roomId); event.dataTransfer.effectAllowed = 'move' }}
      onDragEnd={() => { setDragRoom(null); setDropRoom(null) }}
      onDragOver={(event) => { if (dragRoom !== null && dragRoom !== room.roomId) { event.preventDefault(); setDropRoom(room.roomId) } }}
      onDragLeave={() => { setDropRoom(current => current === room.roomId ? null : current) }}
      onDrop={(event) => { event.preventDefault(); if (dragRoom !== null) reorderRooms(dragRoom, room.roomId); setDragRoom(null); setDropRoom(null) }}
      onContextMenu={(event) => { event.preventDefault(); setRoomMenu({ roomId: room.roomId, x: event.clientX, y: event.clientY }) }}
    >
      <HoverCard anchor={<RoomRow className={css.roomRow} selected={activeRoom?.roomId === room.roomId} onClick={() => { void openRoom(room) }}><span className={css.avatarStatusWrap}>{roomAvatar(room)}{unread > 0 ? <span className={css.unreadBadge}>{unread > 99 ? '99+' : unread}</span> : null}</span><span className={css.copy}><span className={css.nameLine}><span className={css.name}>{room.title}</span><span className={css.source}>{meta}</span></span><span className={css.description} data-running={running || undefined}>{preview}</span></span><span className={css.time}>{pinned ? <span className={css.pinMark} title={t('pinned')}>▴</span> : null}{roomTime(room.updatedAt)}</span></RoomRow>} content={hover} copyLabel={t('copyRoom')} copiedLabel={t('copied')}/>
      {/* Keyboard and touch reach the same actions the right-click menu holds;
        * a drag-only or right-click-only affordance is unreachable for both. */}
      <button
        className={css.roomMenuButton}
        type="button"
        aria-label={t('roomActions')}
        onClick={(event) => { event.stopPropagation(); const box = event.currentTarget.getBoundingClientRect(); setRoomMenu({ roomId: room.roomId, x: box.right, y: box.bottom }) }}
      >⋯</button>
    </div>
  }

  if (!wide) return <div className={css.rail}><button className={css.railButton} type="button" onClick={expandSidebar}>●</button></div>

  const contactRow = (contact: SkillContact): React.JSX.Element => {
    const display = displayOf(contact, mode, state.personas)
    const homepage = contact.homepage ?? contact.repository
    return <HoverCard key={contact.id} anchor={<button className={css.row} type="button" onClick={() => { selectContact(contact) }}><AnimalAvatar avatarId={display.avatar} label={display.name} seed={contact.id}/><span className={css.copy}><span className={css.nameLine}><span className={css.name}>{display.name}</span><span className={css.source} data-source={contact.source}>{contact.sourceShort ?? (contact.source === 'harness' ? t('sourceHarnessShort') : contact.source === 'workbuddy' ? t('sourceWorkBuddyShort') : 'skills.sh')}</span></span><span className={css.description}>{mode === 'persona' ? contact.name : contact.description}</span></span>{favorites.includes(contact.id) ? <span className={css.favoriteMark}>★</span> : null}</button>} content={<div className={css.hoverProfile}><strong>{display.name}</strong><span>{contact.description}</span><small>原始 Skill：{contact.name} · {contact.sourceLabel}</small>{homepage === undefined ? null : <a href={homepage} target="_blank" rel="noreferrer">{t('viewHomepage')}</a>}</div>} copyLabel="复制 Skill 信息" copiedLabel="已复制" copyText={homepage}/>
  }

  return <div className={css.root} data-skill-chat-root>
    {/* Automations sit beside the shell's own 新会话 rather than inside the
      * tab strip: the tabs switch what the list below shows, and automations
      * are a place you go, not a filter over the same rooms. */}
    <button
      className={css.automationEntry}
      type="button"
      data-active={view === 'automations' || undefined}
      onClick={() => { setView(current => current === 'automations' ? 'chats' : 'automations') }}
    ><span className={css.automationEntryMark} aria-hidden="true">◷</span>{t('automations')}{dueAutomations > 0 ? <span className={css.automationEntryCount}>{dueAutomations}</span> : null}</button>
    <div className={css.workspaceSection}><div className={css.workspacePicker} ref={workspaceRef as React.RefObject<HTMLDivElement>}><button className={css.workspaceTrigger} type="button" aria-expanded={workspaceOpen} onClick={() => { setWorkspaceOpen(current => !current) }}><span className={css.workspaceIcon}>⌂</span><span>{currentWorkspace?.title ?? t('noWorkspace')}</span><span className={css.chevron}>⌄</span></button>{workspaceOpen ? <div className={css.workspaceMenu}>{workspaces.items.map(workspace => <button type="button" data-active={workspace.workspaceId === workspaceId} key={workspace.workspaceId} onClick={() => { setWorkspaceId(workspace.workspaceId); setWorkspaceOpen(false) }}><span>⌂</span><strong>{workspace.title}</strong>{workspace.workspaceId === workspaceId ? <b>✓</b> : null}</button>)}<span className={css.workspaceMenuSep}/><button type="button" onClick={() => { setWorkspaceOpen(false); void createWorkspace() }}><span>＋</span><strong>{t('addWorkspace')}</strong></button></div> : null}</div></div>
    <div className={css.topbar}><div className={css.tabs} role="tablist">{(['chats', 'groups', 'contacts'] as const).map(item => <button className={css.tab} data-active={view === item} type="button" role="tab" aria-selected={view === item} onClick={() => { setView(item) }} key={item}>{t(item)}</button>)}</div><span className={css.createWrap} ref={createRef as React.RefObject<HTMLSpanElement>}><button className={css.addGroup} type="button" aria-label="新建" aria-expanded={createOpen} onClick={() => { setCreateOpen(open => !open) }}>＋</button>{createOpen ? <div className={css.createMenu}>{[{ id: 'chat', label: t('plainChat'), hint: t('noSkillMode'), run: () => { void beginGeneralChat() } }, { id: 'group', label: t('groupChat'), hint: t('organizeSkills'), run: openGroupCreator }, { id: 'workspace', label: t('projectDir'), hint: t('addWorkspaceHint'), run: () => { void createWorkspace() } }].map(entry => <button type="button" key={entry.id} onClick={() => { setCreateOpen(false); entry.run() }}><strong>{entry.label}</strong><small>{entry.hint}</small></button>)}</div> : null}</span></div>
    <div className={css.searchWrap}><input className={css.search} value={query} onChange={event => { setQuery(event.target.value) }} placeholder={view === 'contacts' ? t('searchAll') : t('searchRoomsPlaceholder')} aria-label={view === 'contacts' ? t('searchAll') : t('searchRooms')} autoComplete="off" spellCheck={false} type="search"/></div>
    {renderSlot('ds-chat.sidebar.before-rooms', { view, ...(workspaceId === undefined ? {} : { workspaceId }) })}
    {notice !== null ? <button className={css.notice} type="button" onClick={() => { setNotice(null) }}>{notice} ×</button> : null}

    {/* Groups live in the roster, not only in the message list. A group you
      * built is a standing team; Messages ranks by recent activity, so a group
      * you have not spoken to in a while sinks out of sight and there is
      * nowhere to go and look at it. Every messaging client keeps a group
      * section beside its contacts for exactly this reason. */}
    {view === 'groups'
      ? <div className={css.roomList}>{groupResults.length === 0
        ? <EmptyState className={css.emptyCard} title={t('noGroupsTitle')}>{t('noGroupsBody')}</EmptyState>
        : groupResults.map(room => <div
          className={css.groupSectionRowWrap}
          key={room.roomId}
          onContextMenu={(event) => { event.preventDefault(); setRoomMenu({ roomId: room.roomId, x: event.clientX, y: event.clientY }) }}
        >
          <button className={css.groupSectionRow} type="button" onClick={() => { void openRoom(room) }}>
            {roomAvatar(room, true)}
            <span><strong>{room.title}</strong><small>{room.memberIds.length} {t('peopleCount')}{savedRooms.includes(room.roomId) ? ` · ${t('savedRoom')}` : ''}</small></span>
          </button>
          {/* The same actions the message list offers. A group that can be
            * pinned there and not here is two different objects to the person
            * using it. */}
          <button
            className={css.roomMenuButton}
            type="button"
            aria-label={t('roomActions')}
            onClick={(event) => { event.stopPropagation(); const box = event.currentTarget.getBoundingClientRect(); setRoomMenu({ roomId: room.roomId, x: box.right, y: box.bottom }) }}
          >⋯</button>
        </div>)}
      </div>
      : null}
    {view === 'groups' ? null
      : view === 'contacts' ? <><div className={css.subtabs}><button data-active={contactList === 'frequent'} onClick={() => { setContactList('frequent') }}>{t('frequentContacts')}</button><button data-active={contactList === 'all'} onClick={() => { setContactList('all') }}>{t('allContacts')}</button></div><div className={css.modeBar}><span>{t('displayMode')}</span><button type="button" data-active={mode === 'persona'} onClick={() => { setMode('persona') }}>{t('personaMode')}</button><button type="button" data-active={mode === 'raw'} onClick={() => { setMode('raw') }}>{t('rawMode')}</button></div><div className={css.list}>{phase === 'loading' ? <div className={css.status}>{t('loading')}</div> : phase === 'error' ? <div className={css.status}>{t('loadFailed')}</div> : visibleContacts.length === 0 ? <div className={css.status}>{t('searchEmpty')}</div> : visibleContacts.map(contactRow)}{deferredQuery.length >= 2 && externalPhase === 'loading' ? <div className={css.status}>{t('searchingExternal')}</div> : null}{externalResults.map(result => marketplaceRow(result))}</div></>
      : view === 'automations' ? <><div className={css.sectionHeading}><div><strong>自动化</strong><small>{t('automationHint')}</small></div><button type="button" disabled={activeRoom === undefined} onClick={() => { setAutomationOpen(true) }}>{t('newItem')}</button></div><div className={css.list}>{state.automations.filter(item => item.workspaceId === workspaceId).length === 0 ? <div className={css.emptyCard}>{activeRoom === undefined ? '先打开一个普通对话、Skill 对话或群组，再为它创建自动化。' : `还没有自动化。选一个模板，或点「＋ 新建」从空白开始，都会绑定到「${activeRoom.title}」。`}</div> : state.automations.filter(item => item.workspaceId === workspaceId).map(automation => <article className={css.automationCard} key={automation.automationId}><div><strong>{automation.name}</strong><small>{state.rooms.find(room => room.roomId === automation.roomId)?.title ?? '已归档 Room'} · {automation.schedule.kind === 'once' ? t('onceLabel') : `每 ${automation.schedule.rule.slice(6)}`}</small></div><p>{automation.prompt}</p><footer><span data-status={automation.status}>{automation.status === 'active' ? t('waitingRun') : automation.status === 'paused' ? t('pausedLabel') : automation.status === 'completed' ? t('completedLabel') : t('failedLabel')}</span><button type="button" onClick={() => { void runAutomation(automation) }}>{t('runNow')}</button><button type="button" onClick={() => { updateState(current => ({ ...current, automations: current.automations.map(item => item.automationId === automation.automationId ? { ...item, status: item.status === 'paused' ? 'active' : 'paused', updatedAt: Date.now() } : item) })) }}>{automation.status === 'paused' ? t('restoreLabel') : t('pauseLabel')}</button></footer></article>)}<div className={css.templateHeading}>{t('fromTemplate')}</div><div className={css.templateList}>{AUTOMATION_TEMPLATES.map(template => <button className={css.templateCard} type="button" key={template.id} disabled={activeRoom === undefined} onClick={() => { setAutomationName(template.name); setAutomationPrompt(template.prompt); setAutomationSchedule(template.schedule); setAutomationInterval(template.interval); setAutomationUnit(template.unit); setAutomationWhen(templateRunAt(template.schedule)); setAutomationOpen(true) }}><strong>{template.name}</strong><small>{template.hint}</small></button>)}</div></div></>
      : <><div className={css.roomList}>{roomResults.length === 0
        ? (query.trim() === ''
          ? <EmptyState className={css.emptyCard} title="还没有对话">{t('emptyRoomsHint')}</EmptyState>
          : <EmptyState className={css.emptyCard} title="没有匹配的对话">{t('searchEmptyHint')}</EmptyState>)
        : roomResults.map(roomRow)}
      {archivedRooms.length === 0 ? null : <>
        <button className={css.archivedToggle} type="button" onClick={() => { setShowArchived(current => !current) }}>{t('archivedRooms')} · {archivedRooms.length}<span>{showArchived ? '⌃' : '⌄'}</span></button>
        {showArchived ? archivedRooms.map(room => <div className={css.archivedRow} key={room.roomId}>
          <span>{room.title}</span>
          <button type="button" onClick={() => { restoreRoom(room.roomId) }}>{t('restore')}</button>
          <button className={css.menuDanger} type="button" onClick={() => { setDeleteConfirm(room.roomId) }}>{t('delete')}</button>
        </div>) : null}
      </>}</div></>}
    {renderSlot('ds-chat.sidebar.after-rooms', { view, ...(workspaceId === undefined ? {} : { workspaceId }) })}
    {/* Wrapped because the slot renders a bare div: there is no attribute or
      * class on it to hang the pinning and the divider off. */}
    <div className={css.settingsSection}>{renderSlot('ds-chat.settings.section', { view, ...(workspaceId === undefined ? {} : { workspaceId }) })}</div>

    {activeRoom !== undefined && currentSessionId !== undefined && currentSessionBlank ? <aside className={css.blankRoomDock}><SkillChatHeaderTools sessionId={currentSessionId}/></aside> : null}
    {activeRoom === undefined ? null : renderSlot('ds-chat.room.drawer', { roomId: activeRoom.roomId, ...(currentSessionId === undefined ? {} : { sessionId: currentSessionId }) })}

    {selected !== null ? <Dialog className={`${css.panel} ${css.skillProfileDialog}`} label={t('skillProfile')} onClose={() => { setSelected(null) }}><div className={css.panelTop}><AnimalAvatar avatarId={personaAvatar} label={personaName}/><IconButton className={css.close} variant="ghost" aria-label="关闭" onClick={() => { setSelected(null) }}>×</IconButton></div>{editingPersona ? <><label className={css.field}><span>{t('nicknameLabel')}</span><input value={personaName} maxLength={24} onChange={event => { setPersonaName(event.target.value) }}/></label><div className={css.avatarLibrary}>{ANIMAL_AVATARS.map(avatarId => <button type="button" data-selected={personaAvatar === avatarId} key={avatarId} onClick={() => { setPersonaAvatar(avatarId) }}><AnimalAvatar avatarId={avatarId} label={avatarId}/></button>)}</div><div className={css.profileActions}><Button className={css.primary} variant="primary" onClick={savePersona}>{t('saveIdentity')}</Button><Button className={css.secondaryAction} onClick={resetPersona}>{t('resetDefault')}</Button></div></> : <><h2 className={css.panelTitle}>{displayOf(selected, mode, state.personas).name}</h2><div className={css.role}>{state.personas[selected.id]?.roleLabel}</div><p className={css.bio}>{selected.description}</p>
      {(state.personas[selected.id]?.capabilities ?? []).length === 0 ? null : <div className={css.profileSection}><h3>{t('goodAt')}</h3><div className={css.capabilityChips}>{(state.personas[selected.id]?.capabilities ?? []).map(item => <span key={item}>{item}</span>)}</div></div>}
      {selected.whenToUse === undefined ? null : <div className={css.profileSection}><h3>{t('whenToFind')}</h3><p className={css.profileNote}>{selected.whenToUse}</p></div>}
      {(() => {
        const inRooms = visibleRooms.filter(room => room.type === 'group' && room.memberIds.includes(selected.id))
        return inRooms.length === 0 ? null : <div className={css.profileSection}><h3>{t('inTheseGroups')}</h3><div className={css.profileRooms}>{inRooms.map(room => <button type="button" key={room.roomId} onClick={() => { setSelected(null); void openRoom(room) }}>{roomAvatar(room, true)}<span>{room.title}</span><small>{room.memberIds.length} 人</small></button>)}</div></div>
      })()}
      <div className={css.originCard}><span>{t('originalSkill')}</span><strong>{selected.name}</strong><small>{selected.sourceLabel}</small></div>
      {selected.homepage === undefined && selected.repository === undefined ? null : <div className={css.profileLinks}>{selected.homepage === undefined ? null : <a href={selected.homepage} target="_blank" rel="noreferrer">{t('homepageLink')}</a>}{selected.repository === undefined ? null : <a href={selected.repository} target="_blank" rel="noreferrer">{t('repositoryLink')}</a>}</div>}<div className={css.profileActions}><Button className={css.primary} variant="primary" onClick={() => { void beginContactChat(selected) }}>{t('continueChat')}</Button><Button className={css.secondaryAction} onClick={() => { setEditingPersona(true) }}>{t('editIdentity')}</Button><Button className={css.secondaryAction} onClick={() => { toggleFavorite(selected.id) }}>{favorites.includes(selected.id) ? `★ ${t('frequentContact')}` : `☆ ${t('addFrequent')}`}</Button>{selected.source !== 'workbuddy' || selected.path === undefined ? null : <Button className={css.secondaryAction} disabled={rootBusy === selected.name} onClick={() => { const path = selected.path; if (path === undefined) return; setRootBusy(selected.name); void linkSkill(path, selected.name, new AbortController().signal).then(() => { setNotice(`${t('enabledSkill')}：${selected.name}`); setContactsRevision(current => current + 1) }, (error: unknown) => { setNotice(`${t('enableSkillFailed')}：${error instanceof Error ? error.message : String(error)}`) }).finally(() => { setRootBusy(null) }) }}>{t('enableSkill')}</Button>}</div></>}</Dialog> : null}

    {groupOpen ? <Dialog className={css.groupDialog} label={t('newGroup')} onClose={() => { setGroupOpen(false) }}>
        <div className={css.groupHeader}><div><h2>{t('newGroup')}</h2><p>{t('groupWorkspace').replace('{workspace}', currentWorkspace?.title ?? t('noWorkspace'))}</p></div><IconButton className={css.close} variant="ghost" aria-label="关闭" onClick={() => { setGroupOpen(false) }}>×</IconButton></div>
        <div className={css.groupBody}><div className={css.groupFormGrid}><div className={css.groupIdentityEditor}><GroupAvatar avatarId={groupAvatar} label={groupName || t('newGroup')}/><div><strong>{t('groupAvatarLabel')}</strong><small>{t('groupAvatarHint')}</small></div></div>
          <label className={css.field}><span>{t('groupName')}</span><input value={groupName} onChange={event => { setGroupName(event.target.value) }} placeholder={t('groupNamePlaceholder')}/></label></div><button className={css.groupMore} type="button" aria-expanded={groupMoreOpen} onClick={() => { setGroupMoreOpen(open => !open) }}><span>{t('moreSettings')}</span><small>{t('groupMoreHint')}</small><b>{groupMoreOpen ? '⌃' : '⌄'}</b></button>{groupMoreOpen ? <div className={css.groupMorePanel}><div className={css.groupAvatarLibrary}>{ANIMAL_AVATARS.map(avatarId => <button type="button" data-selected={groupAvatar === avatarId} key={avatarId} onClick={() => { setGroupAvatar(avatarId) }}><GroupAvatar avatarId={avatarId} label={avatarId} small/></button>)}</div>
          <label className={css.field}><span>{t('groupRole')}</span><textarea value={groupPrompt} onChange={event => { setGroupPrompt(event.target.value) }} placeholder="描述这个群组负责什么、如何协作以及输出标准。它会作为每次对话的系统提示词…"/></label>
          <button className={css.generatePrompt} type="button" disabled={groupMembers.length === 0} onClick={() => { const members = allContacts.filter(contact => groupMembers.includes(contact.id)); setGroupPrompt(generatedGroupPrompt(groupName.trim() || t('collabGroup'), members)) }}>{t('generateFromMembers')}</button>
          <div className={css.workspaceBindings}><div className={css.bindingHeader}><span><strong>{t('bindProjects')}</strong><small>{t('bindDefaultHint')}</small></span><button type="button" onClick={() => { void addLinkedWorkspace('create') }}>{t('addDirectory')}</button></div>{workspaces.items.map(workspace => <button type="button" data-selected={groupWorkspaceIds.includes(workspace.workspaceId)} key={workspace.workspaceId} onClick={() => { toggleWorkspaceBinding('create', workspace.workspaceId) }}><IconFolderOpenOutline16/><span><strong>{workspace.title}</strong><small>{workspace.path}</small></span><b>{groupWorkspaceIds.includes(workspace.workspaceId) ? '✓' : '＋'}</b></button>)}</div>
        </div> : null}<div className={css.memberToolbar}><div><strong>{t('pickMembers')}</strong><small>已选 {groupMembers.length} 个，点击成员可加入或剔出</small></div><input value={memberQuery} onChange={event => { setMemberQuery(event.target.value) }} placeholder="搜索昵称、原始 Skill、能力或 skills.sh…" aria-label={t('searchMembers')} autoComplete="off" spellCheck={false} type="search"/></div>
        <div className={css.groupCandidates}>{visibleMemberContacts.map(contact => { const display = displayOf(contact, 'persona', state.personas); const included = groupMembers.includes(contact.id); return <button className={css.pickRow} data-included={included || undefined} type="button" key={contact.id} onClick={() => { setGroupMembers(current => included ? current.filter(id => id !== contact.id) : [...current, contact.id]) }}><AnimalAvatar avatarId={display.avatar} label={display.name}/><span className={css.pickCopy}><strong>{display.name}</strong><small>{contact.name} · {contact.description}</small></span><b>{included ? '−' : '＋'}</b></button> })}{deferredMemberQuery.length >= 2 && externalPhase === 'loading' ? <div className={css.status}>{t('searchingExternal')}</div> : null}{externalResults.map(result => marketplaceRow(result, 'draft-group'))}</div>
        </div><div className={css.groupFooter}><Button className={css.secondary} onClick={() => { setGroupOpen(false) }}>{t('cancel')}</Button><Button className={css.create} variant="primary" disabled={groupMembers.length < 2 || workspaceId === undefined} onClick={createGroup}>{t('create')}</Button></div>
    </Dialog> : null}

    {automationOpen && activeRoom !== undefined ? <div className={css.groupBackdrop} onMouseDown={event => { if (event.target === event.currentTarget) setAutomationOpen(false) }}><section className={css.automationDialog} role="dialog"><div className={css.groupHeader}><div><h2>{t('newAutomation')}</h2><p>目标对话：{activeRoom.title}</p></div><button className={css.close} onClick={() => { setAutomationOpen(false) }}>×</button></div><label className={css.field}><span>{t('nameLabel')}</span><input value={automationName} onChange={event => { setAutomationName(event.target.value) }} placeholder={t('automationNamePlaceholder')}/></label><label className={css.field}><span>{t('taskPrompt')}</span><textarea value={automationPrompt} onChange={event => { setAutomationPrompt(event.target.value) }} placeholder={t('automationPromptPlaceholder')}/></label><div className={css.scheduleChoice}><button type="button" data-active={automationSchedule === 'once'} onClick={() => { setAutomationSchedule('once') }}>{t('runOnce')}</button><button type="button" data-active={automationSchedule === 'recurring'} onClick={() => { setAutomationSchedule('recurring') }}>{t('runRecurring')}</button></div><label className={css.field}><span>{automationSchedule === 'once' ? t('runAt') : t('firstRunAt')}</span><input type="datetime-local" value={automationWhen} onChange={event => { setAutomationWhen(event.target.value) }}/></label>{automationSchedule === 'recurring' ? <div className={css.repeatFields}><label className={css.field}><span>{t('intervalLabel')}</span><input inputMode="numeric" min="1" type="number" value={automationInterval} onChange={event => { setAutomationInterval(event.target.value) }}/></label><label className={css.field}><span>{t('unitLabel')}</span><select value={automationUnit} onChange={event => { setAutomationUnit(event.target.value === 'h' ? 'h' : 'd') }}><option value="h">{t('unitHour')}</option><option value="d">{t('unitDay')}</option></select></label></div> : null}<div className={css.automationSummary}><span>{t('teamLabel')}</span><strong>{activeRoom.memberIds.length === 0 ? t('noSkillGroup') : activeRoom.memberIds.map(id => state.personas[id]?.displayName ?? id).join('、')}</strong><small>{activeRoom.memberIds.length === 0 ? t('plainPromptMode') : t('coordinatorHandles')}</small></div><div className={css.groupFooter}><button className={css.secondary} onClick={() => { setAutomationOpen(false) }}>取消</button><button className={css.create} disabled={automationPrompt.trim() === ''} onClick={() => { void createAutomation() }}>{t('createAutomation')}</button></div></section></div> : null}

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

    {roomMenu !== null ? (() => {
      const room = state.rooms.find(item => item.roomId === roomMenu.roomId)
      if (room === undefined) return null
      const close = (): void => { setRoomMenu(null) }
      return <div className={css.menuBackdrop} onMouseDown={close}>
        <div className={css.roomMenu} style={{ left: `${Math.min(roomMenu.x, window.innerWidth - 190)}px`, top: `${Math.min(roomMenu.y, window.innerHeight - 170)}px` }} onMouseDown={(event) => { event.stopPropagation() }}>
          <button type="button" onClick={() => { togglePin(room); close() }}>{room.pinnedAt === undefined ? t('pin') : t('unpin')}</button>
          <button type="button" onClick={() => { setSavedRooms(current => current.includes(room.roomId) ? current.filter(id => id !== room.roomId) : [...current, room.roomId]); close() }}>{savedRooms.includes(room.roomId) ? t('unsaveRoom') : t('saveRoom')}</button>
          <button type="button" onClick={() => { updateRoom(room.roomId, { archivedAt: Date.now() }); close() }}>{t('archive')}</button>
          <button className={css.menuDanger} type="button" onClick={() => { setDeleteConfirm(room.roomId); close() }}>{t('delete')}</button>
        </div>
      </div>
    })() : null}

    {deleteConfirm !== null ? <Dialog className={css.confirmDialog} label={t('delete')} onClose={() => { setDeleteConfirm(null) }}><h2>{t('deleteRoomTitle')}</h2><p>{t('deleteRoomBody')}</p><div className={css.confirmActions}><Button onClick={() => { setDeleteConfirm(null) }}>{t('cancel')}</Button><Button variant="danger" onClick={() => { deleteRoom(deleteConfirm); setDeleteConfirm(null) }}>{t('delete')}</Button></div></Dialog> : null}

    {archiveConfirm !== null ? <Dialog className={css.confirmDialog} label="归档群组" onClose={() => { setArchiveConfirm(null) }}><h2>{t('archiveGroupTitle')}</h2><p>{t('archiveGroupBody')}</p><div className={css.confirmActions}><Button onClick={() => { setArchiveConfirm(null) }}>取消</Button><Button variant="danger" onClick={() => { updateRoom(archiveConfirm, { archivedAt: Date.now() }); setArchiveConfirm(null); setRoomSettingsOpen(false) }}>归档</Button></div></Dialog> : null}

    {roomSettingsOpen && activeRoom?.type === 'group' ? <Drawer className={`${css.panel} ${css.groupSettingsPanel}`} label={t('groupSettings')} onClose={() => { setRoomSettingsOpen(false) }}><div className={css.panelTop}><GroupAvatar avatarId={roomAvatarDraft} label={activeRoom.title}/><IconButton className={css.close} variant="ghost" aria-label="关闭" onClick={() => { setRoomSettingsOpen(false) }}>×</IconButton></div><div className={css.groupAvatarLibrary}>{ANIMAL_AVATARS.map(avatarId => <button type="button" data-selected={roomAvatarDraft === avatarId} key={avatarId} onClick={() => { setRoomAvatarDraft(avatarId) }}><GroupAvatar avatarId={avatarId} label={avatarId} small/></button>)}</div><label className={css.field}><span>{t('groupNameLabel')}</span><input value={roomTitleDraft} onChange={event => { setRoomTitleDraft(event.target.value) }}/></label><label className={css.field}><span>{t('groupRolePrompt')}</span><textarea value={roomPromptDraft} onChange={event => { setRoomPromptDraft(event.target.value) }} placeholder={t('groupRolePlaceholder')}/></label><button className={css.generatePrompt} type="button" onClick={() => { setRoomPromptDraft(generatedGroupPrompt(roomTitleDraft.trim() || activeRoom.title, activeMembers)) }}>{t('regenerateFromMembers')}</button><div className={css.workspaceBindings}><div className={css.bindingHeader}><span><strong>{t('bindProjects')}</strong><small>{t('bindingHint')}</small></span><button type="button" onClick={() => { void addLinkedWorkspace('settings') }}>{t('addDirectory')}</button></div>{workspaces.items.map(workspace => <button type="button" data-selected={roomWorkspaceIds.includes(workspace.workspaceId)} key={workspace.workspaceId} onClick={() => { toggleWorkspaceBinding('settings', workspace.workspaceId) }}><IconFolderOpenOutline16/><span><strong>{workspace.title}</strong><small>{workspace.path}</small></span><b>{roomWorkspaceIds.includes(workspace.workspaceId) ? '✓' : '＋'}</b></button>)}</div><div className={css.panelHint}>{t('memberPanelHint')}</div><div className={css.memberToolbar}><div><strong>{t('allMembers')}</strong><small>{activeRoom.memberIds.length} 个已加入</small></div><input value={memberQuery} onChange={event => { setMemberQuery(event.target.value) }} placeholder={t('searchMembersPlaceholder')} aria-label={t('searchMembers')} autoComplete="off" spellCheck={false} type="search"/></div><div className={css.roomMemberGrid}>{visibleMemberContacts.map(contact => { const included = activeRoom.memberIds.includes(contact.id); const coordinator = activeRoom.coordinatorId === contact.id; const display = displayOf(contact, 'persona', state.personas); return <div className={css.roomMemberItem} data-included={included || undefined} key={contact.id}><button type="button" className={css.memberPersona} disabled={!included} onClick={() => { updateRoom(activeRoom.roomId, { coordinatorId: contact.id }) }}><AnimalAvatar avatarId={display.avatar} label={display.name} seed={contact.id}/><span><strong>{display.name}</strong><small>{coordinator ? t('coordinator') : contact.name}</small></span></button><button type="button" className={css.memberToggle} onClick={() => { toggleActiveRoomMember(contact.id) }}>{included ? '−' : '＋'}</button></div> })}{deferredMemberQuery.length >= 2 && externalPhase === 'loading' ? <div className={css.status}>{t('searchingExternal')}</div> : null}{externalResults.map(result => marketplaceRow(result, 'active-group'))}</div><div className={css.profileActions}><Button className={css.primary} variant="primary" onClick={() => { const linked = roomWorkspaceIds.length === 0 ? [activeRoom.workspaceId] : roomWorkspaceIds; if (roomTitleDraft.trim() !== '') updateRoom(activeRoom.roomId, { title: roomTitleDraft.trim(), systemPrompt: roomPromptDraft.trim(), avatarId: roomAvatarDraft, workspaceId: linked[0] ?? activeRoom.workspaceId, workspaceIds: linked }); setRoomSettingsOpen(false) }}>{t('saveGroup')}</Button><Button className={css.danger} variant="danger" onClick={() => { setArchiveConfirm(activeRoom.roomId) }}>{t('archiveGroup')}</Button></div></Drawer> : null}
  </div>
}

export function DSChatBrand(): React.JSX.Element {
  return <span className={css.dsChatBrand}>DS <b>Chat</b></span>
}
