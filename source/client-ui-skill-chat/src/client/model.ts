import type { WorkspaceId } from '@deepseek-ai/dsh-api-workspace-controller/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { ChatBinding, ContactGroup, SkillContact } from './SkillContactsBrowser.tsx'

export type RoomType = 'general' | 'direct' | 'group'

export interface SkillPersona {
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

export interface RoomMemberSnapshot {
  readonly skillId: string
  readonly displayName: string
  readonly avatarId: string
  readonly originalName: string
}

export interface RoomSession {
  readonly roomSessionId: string
  readonly roomId: string
  readonly harnessSessionId: SessionId
  readonly title: string
  readonly memberSnapshot: readonly RoomMemberSnapshot[]
  readonly createdAt: number
  readonly updatedAt: number
  readonly archivedAt?: number
}

export interface ChatRoom {
  readonly roomId: string
  readonly type: RoomType
  readonly workspaceId: WorkspaceId
  readonly workspaceIds?: readonly WorkspaceId[]
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

export type AutomationIntent = 'research' | 'create' | 'review' | 'operate' | 'custom'

export interface AutomationDefinition {
  readonly automationId: string
  readonly name: string
  readonly workspaceId: WorkspaceId
  readonly roomId: string
  readonly intent: AutomationIntent
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

export interface SkillChatState {
  readonly version: 2
  readonly rooms: readonly ChatRoom[]
  readonly roomSessions: readonly RoomSession[]
  readonly personas: Readonly<Record<string, SkillPersona>>
  readonly automations: readonly AutomationDefinition[]
  readonly migratedAt?: number
}

export const EMPTY_SKILL_CHAT_STATE: SkillChatState = {
  version: 2,
  rooms: [],
  roomSessions: [],
  personas: {},
  automations: [],
}

export const ANIMAL_AVATARS = [
  'fox-coral', 'fox-mint', 'cat-cream', 'cat-lilac', 'bear-honey', 'bear-sky',
  'rabbit-rose', 'rabbit-leaf', 'owl-plum', 'owl-sand', 'panda-moss', 'panda-peach',
  'otter-ocean', 'otter-sun', 'deer-sage', 'deer-dawn', 'seal-ice', 'seal-berry',
  'dog-cocoa', 'dog-blue', 'mouse-lemon', 'mouse-pink', 'tiger-apricot', 'tiger-jade',
] as const

const FRIENDLY_NAMES = [
  '栗子', '团团', '阿鹿', '小满', '布丁', '云朵', '米粒', '松松',
  '桃桃', '可可', '星野', '麦麦', '小禾', '圆圆', '朵朵', '木木',
  '豆豆', '暖暖', '果果', '泡泡', '小岛', '悠悠', '橙子', '月牙',
] as const

export function stableHash(value: string): number {
  let hash = 2166136261
  for (const char of value) {
    hash ^= char.codePointAt(0) ?? 0
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function capabilityList(contact: SkillContact): readonly string[] {
  const values = `${contact.description} ${contact.whenToUse ?? ''}`
    .split(/[。；;,.，\n]/u)
    .map(value => value.trim())
    .filter(value => value.length >= 2)
    .slice(0, 4)
  return values.length === 0 ? [contact.description] : values
}

export function defaultPersona(contact: SkillContact, now = Date.now()): SkillPersona {
  const hash = stableHash(contact.id)
  return {
    skillId: contact.id,
    displayName: FRIENDLY_NAMES[hash % FRIENDLY_NAMES.length] ?? '小满',
    avatarId: ANIMAL_AVATARS[(hash >>> 5) % ANIMAL_AVATARS.length] ?? 'fox-coral',
    originalName: contact.name,
    roleLabel: contact.source === 'harness' ? '项目内 AI 同事' : contact.source === 'workbuddy' ? 'WorkBuddy 专家' : '社区 Skill 专家',
    bio: contact.description,
    capabilities: capabilityList(contact),
    source: contact.sourceLabel,
    ...(contact.homepage === undefined ? {} : { homepage: contact.homepage }),
    ...(contact.repository === undefined ? {} : { repository: contact.repository }),
    customizedName: false,
    customizedAvatar: false,
    updatedAt: now,
  }
}

export function ensurePersonas(
  contacts: readonly SkillContact[],
  personas: Readonly<Record<string, SkillPersona>>,
  now = Date.now(),
): Readonly<Record<string, SkillPersona>> {
  let changed = false
  const next = { ...personas }
  const usedNames = new Set(Object.values(personas).filter(persona => persona.customizedName).map(persona => persona.displayName))
  for (const contact of contacts.toSorted((left, right) => left.id.localeCompare(right.id))) {
    const current = next[contact.id]
    const generated = defaultPersona(contact, now)
    let generatedName = generated.displayName
    if (usedNames.has(generatedName)) generatedName = `${generatedName}·${stableHash(contact.id).toString(36).slice(0, 2).toUpperCase()}`
    while (usedNames.has(generatedName)) generatedName = `${generatedName}·`
    usedNames.add(current?.customizedName === true ? current.displayName : generatedName)
    if (current === undefined) {
      next[contact.id] = { ...generated, displayName: generatedName }
      changed = true
      continue
    }
    const refreshed = {
      ...current,
      ...current.customizedName ? {} : { displayName: generatedName },
      originalName: contact.name,
      bio: contact.description,
      capabilities: capabilityList(contact),
      source: contact.sourceLabel,
      ...(contact.homepage === undefined ? {} : { homepage: contact.homepage }),
      ...(contact.repository === undefined ? {} : { repository: contact.repository }),
    }
    if (JSON.stringify(refreshed) !== JSON.stringify(current)) {
      next[contact.id] = refreshed
      changed = true
    }
  }
  return changed ? next : personas
}

export function roomForSession(
  rooms: readonly ChatRoom[],
  roomSessions: readonly RoomSession[],
  sessionId: SessionId | undefined,
): ChatRoom | undefined {
  if (sessionId === undefined) return undefined
  const roomSession = roomSessions.find(item => item.harnessSessionId === sessionId && item.archivedAt === undefined)
  return roomSession === undefined ? undefined : rooms.find(room => room.roomId === roomSession.roomId)
}

export function activeHarnessSession(
  room: ChatRoom,
  roomSessions: readonly RoomSession[],
): SessionId | undefined {
  const active = room.activeSessionId === undefined
    ? undefined
    : roomSessions.find(item => item.roomSessionId === room.activeSessionId && item.archivedAt === undefined)
  return active?.harnessSessionId
}

export function migrateLegacyState(
  groups: readonly ContactGroup[],
  bindings: Readonly<Record<string, ChatBinding>>,
  sessionWorkspace: Readonly<Record<string, WorkspaceId | undefined>>,
  sessionUpdatedAt: Readonly<Record<string, number>>,
  now = Date.now(),
): Pick<SkillChatState, 'rooms' | 'roomSessions' | 'migratedAt'> {
  const rooms = new Map<string, ChatRoom>()
  const roomSessions: RoomSession[] = []
  for (const [rawSessionId, binding] of Object.entries(bindings)) {
    const workspaceId = sessionWorkspace[rawSessionId]
    if (workspaceId === undefined) continue
    const roomId = binding.kind === 'group' && binding.groupId !== undefined
      ? `room:group:${binding.groupId}`
      : `room:direct:${workspaceId}:${binding.members[0]?.id ?? rawSessionId}`
    const group = binding.groupId === undefined ? undefined : groups.find(item => item.id === binding.groupId)
    const members = group?.members ?? binding.members
    const coordinatorId = group?.leaderId ?? members[0]?.id ?? 'unknown'
    const updatedAt = sessionUpdatedAt[rawSessionId] ?? now
    const roomSessionId = `room-session:${rawSessionId}`
    roomSessions.push({
      roomSessionId,
      roomId,
      harnessSessionId: rawSessionId as SessionId,
      title: binding.name,
      memberSnapshot: members.map(member => ({
        skillId: member.id,
        displayName: member.name,
        avatarId: binding.avatar,
        originalName: member.name,
      })),
      createdAt: updatedAt,
      updatedAt,
    })
    const existing = rooms.get(roomId)
    const activeSessionId = existing === undefined || updatedAt >= existing.updatedAt
      ? roomSessionId
      : existing.activeSessionId
    rooms.set(roomId, {
      roomId,
      type: binding.kind === 'group' ? 'group' : 'direct',
      workspaceId,
      workspaceIds: [workspaceId],
      ...(binding.kind === 'group' ? { avatarId: ANIMAL_AVATARS[stableHash(roomId) % ANIMAL_AVATARS.length] } : {}),
      title: group?.name ?? binding.name,
      memberIds: members.map(member => member.id),
      coordinatorId,
      sessionIds: [...(existing?.sessionIds ?? []), roomSessionId],
      ...(activeSessionId === undefined ? {} : { activeSessionId }),
      createdAt: Math.min(existing?.createdAt ?? updatedAt, updatedAt),
      updatedAt: Math.max(existing?.updatedAt ?? updatedAt, updatedAt),
    })
  }
  return { rooms: [...rooms.values()], roomSessions, migratedAt: now }
}
