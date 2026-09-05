import type { WorkspaceId } from '@deepseek-ai/dsh-api-workspace-controller/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { ChatBinding, ContactGroup, SkillContact } from './SkillContactsBrowser.tsx'
import { AVATAR_LIBRARY } from './ui/avatar.tsx'

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
  /** When the room was pinned; pinned rooms sort above the recency list. */
  readonly pinnedAt?: number
  /**
   * Manual position within its band (pinned or unpinned). Absent until the
   * room is dragged, so an untouched list stays purely recency-ordered and
   * only the rooms a person has actually arranged hold a fixed place.
   */
  readonly order?: number
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

// From the generator, so the picker and the portraits can never disagree
// about what identities exist. 24 species × 16 palettes.
export const ANIMAL_AVATARS = AVATAR_LIBRARY

/**
 * The given-name pool. Sized against a real Skill directory rather than a demo
 * one: with three Skill roots scanned a machine easily reaches several hundred
 * contacts, and a 24-name pool meant almost every persona carried a
 * disambiguating suffix instead of a name.
 */
const FRIENDLY_NAMES = [
  '栗子', '团团', '阿鹿', '小满', '布丁', '云朵', '米粒', '松松',
  '桃桃', '可可', '星野', '麦麦', '小禾', '圆圆', '朵朵', '木木',
  '豆豆', '暖暖', '果果', '泡泡', '小岛', '悠悠', '橙子', '月牙',
  '汤圆', '芝麻', '花卷', '麻薯', '元宝', '青提', '柚子', '荔枝',
  '杏仁', '山楂', '莲子', '菱角', '笋尖', '菌菇', '糖糖', '蜜蜜',
  '酥酥', '脆脆', '软软', '糯糯', '绵绵', '云吞', '米糕', '豆花',
  '银杏', '白露', '小雪', '谷雨', '惊蛰', '立夏', '秋分', '冬至',
  '海棠', '芦苇', '竹影', '松针', '苔苔', '藤藤', '荷叶', '川川',
  '岭岭', '湖心', '江南', '星尘', '月半', '拂晓', '晚晚', '早早',
  '咕咕', '呱呱', '啾啾', '喵喵', '汪汪', '哞哞', '叽叽', '嘟嘟',
  '沙沙', '露露', '霜霜', '雾雾', '叮叮', '咚咚', '铃铃', '当当',
  '噜噜', '呼呼', '嗡嗡', '滴滴', '答答', '咔咔', '唰唰', '哒哒',
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
    // The Skill's own id is the seed, so an auto-assigned portrait is as
    // distinct as the Skill is. Drawing from the picker's fixed library instead
    // would collide by the birthday bound — 334 Skills over 192 presets left
    // only 159 distinct faces.
    avatarId: contact.id,
    originalName: contact.name,
    // `source` is the kind discriminator, and every scanned root reports
    // `workbuddy`; using it for the label called a Claude Skill a WorkBuddy
    // expert. `sourceShort` names the root the Skill actually came from.
    roleLabel: contact.source === 'harness'
      ? '项目内 AI 同事'
      : contact.source === 'workbuddy' ? `${contact.sourceShort ?? 'WorkBuddy'} 专家` : '社区 Skill 专家',
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
    // Duplicates are normal once the pool is smaller than the contact list. A
    // readable ordinal ("松松2") keeps the persona a name; the former base36
    // hash ("松松·1B") read as a machine id and undid the personification.
    let generatedName = generated.displayName
    for (let ordinal = 2; usedNames.has(generatedName); ordinal += 1) {
      generatedName = `${generated.displayName}${ordinal}`
    }
    usedNames.add(current?.customizedName === true ? current.displayName : generatedName)
    if (current === undefined) {
      next[contact.id] = { ...generated, displayName: generatedName }
      changed = true
      continue
    }
    // An avatar the user never chose is generated data, so it follows the
    // library. Without this, personas minted against an older, smaller library
    // keep its silhouettes forever and the new species are never seen. A
    // customised avatar is the user's and is left alone.
    // `customizedAvatar` already records whether the user chose this portrait,
    // so that flag alone decides. Testing library membership instead would
    // treat an auto-assigned library entry as a user's pick and freeze it.
    const staleAvatar = current.customizedAvatar !== true && current.avatarId !== contact.id
    const refreshed = {
      ...current,
      ...staleAvatar ? { avatarId: generated.avatarId } : {},
      ...current.customizedName ? {} : { displayName: generatedName },
      originalName: contact.name,
      bio: contact.description,
      capabilities: capabilityList(contact),
      // Derived from the contact, never chosen by the user, so it follows the
      // catalog: personas minted while every root reported WorkBuddy keep
      // calling a Claude Skill a WorkBuddy expert otherwise.
      roleLabel: generated.roleLabel,
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

/**
 * Order the room list.
 *
 * Pinned rooms form their own band above the rest. Inside a band a room that
 * has been dragged holds its position, and everything else falls back to
 * recency — so arranging two rooms by hand does not freeze the other thirty
 * into whatever order they happened to have that day.
 * @param rooms - the rooms to order.
 * @returns a new array, most relevant first.
 */
export function orderRooms(rooms: readonly ChatRoom[]): readonly ChatRoom[] {
  return [...rooms].sort((left, right) => {
    const pinned = Number(right.pinnedAt !== undefined) - Number(left.pinnedAt !== undefined)
    if (pinned !== 0) return pinned
    const placed = Number(right.order !== undefined) - Number(left.order !== undefined)
    if (placed !== 0) return placed
    if (left.order !== undefined && right.order !== undefined) return left.order - right.order
    return right.updatedAt - left.updatedAt
  })
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
