import type { Context } from '@deepseek-ai/cordis'
import type { SkillEntry } from '@deepseek-ai/dsh-api-remotes/client'
import type { ISessions } from '@deepseek-ai/dsh-api-session-controller/client'
import type { IWorkspaces, WorkspaceId } from '@deepseek-ai/dsh-api-workspace-controller/client'
import workBuddySkillsRemote from '@deepseek-ai/dsh-experimental-workbuddy-skill-catalog/remote'
import type { WorkBuddySkillContact } from '@deepseek-ai/dsh-experimental-workbuddy-skill-catalog/types'
import type { SkillsShContact } from '@deepseek-ai/dsh-experimental-workbuddy-skill-catalog/types'
import type { SkillChatStateDocument } from '@deepseek-ai/dsh-experimental-workbuddy-skill-catalog/types'
import type { TypertRemoteContribution } from '@deepseek-ai/dsh-typert-protocol'
import type {} from '@deepseek-ai/dsh-api-session-controller/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type { IConversation } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { InputTriggerServiceContract, InputTriggerSource } from '@deepseek-ai/dsh-client-ui-input-trigger/client'
import type { UiWorkspace } from '@deepseek-ai/dsh-client-ui-workspace/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import type {} from '@deepseek-ai/dsh-client-ui-chat/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import {
  CHAT_BINDINGS_KEY, displayOf, DSChatBrand, MODE_KEY, readStored, SkillChatHeaderTools, SkillChatMessageActions, SkillContactsBrowser, STATE_KEY,
} from './SkillContactsBrowser.tsx'
import type { ChatBinding, ContactGroup, ExternalSkillContact, SkillContact } from './SkillContactsBrowser.tsx'
import type { SkillChatState } from './model.ts'
import { DS_CHAT_SHELL_CHILDREN } from './shell/index.ts'
import { createSkinRuntime, SkinCenter } from './skin/index.ts'
import { en, NS, type SkillChatKey, zh } from './locales.ts'

export * from './shell/index.ts'
export * from './skin/index.ts'
export * from './ui/index.tsx'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    skillChat: SkillChatKey
  }
}

function stateFromRemote(value: SkillChatStateDocument): SkillChatState {
  return value as unknown as SkillChatState
}

export const inject = [
  'slots', 'sessions', 'workspaces', 'uiWorkspace', 'conversation', 'inputTriggers', 'remote', 'locale',
]

function registerUi(ctx: Context): void {
  const sessions = ctx.get('sessions') as ISessions
  const workspaces = ctx.get('workspaces') as IWorkspaces
  const uiWorkspace = ctx.get('uiWorkspace') as UiWorkspace
  const conversation = ctx.get('conversation') as IConversation
  const skinRuntime = createSkinRuntime()
  ctx.effect(() => () => { skinRuntime.dispose() }, 'skill-chat: skin runtime')
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'skill-chat: dictionaries')

  const loadContacts = async (sessionId: SessionId | undefined, signal: AbortSignal): Promise<readonly SkillContact[]> => {
    const [nativeResult, workBuddyResult] = await Promise.all([
      sessionId === undefined ? undefined : ctx.remote.skills.list({ sessionId }, signal),
      ctx.remote.workbuddySkills.list(signal),
    ])
    if (nativeResult !== undefined && !nativeResult.ok) throw new Error(nativeResult.error.message)
    if (!workBuddyResult.ok) throw new Error(workBuddyResult.error.message)
    return mergeContacts(nativeResult?.value.skills ?? [], workBuddyResult.value.contacts)
  }
  const searchExternal = async (query: string, signal: AbortSignal): Promise<readonly ExternalSkillContact[]> => {
    const result = await ctx.remote.workbuddySkills.searchExternal(query, signal)
    if (!result.ok) throw new Error(result.error.message)
    return result.value.contacts.map((contact: SkillsShContact) => ({ ...contact }))
  }
  const loadState = async (signal: AbortSignal): Promise<SkillChatState> => {
    const result = await ctx.remote.workbuddySkills.getSkillChatState(signal)
    if (!result.ok) throw new Error(result.error.message)
    return stateFromRemote(result.value)
  }
  const saveState = async (state: SkillChatState, signal: AbortSignal): Promise<void> => {
    const result = await ctx.remote.workbuddySkills.putSkillChatState(state, signal)
    if (!result.ok) throw new Error(result.error.message)
  }
  const runAutomation = async (
    automationId: string,
    signal: AbortSignal,
  ): Promise<{ readonly sessionId: SessionId; readonly state: SkillChatState }> => {
    const result = await ctx.remote.workbuddySkills.runSkillChatAutomation(automationId, signal)
    if (!result.ok) throw new Error(result.error.message)
    return {
      sessionId: result.value.sessionId as unknown as SessionId,
      state: stateFromRemote(result.value.state),
    }
  }
  const installExternal = async (
    workspaceId: WorkspaceId,
    contact: ExternalSkillContact,
    signal: AbortSignal,
  ): Promise<SkillContact> => {
    const result = await ctx.remote.workbuddySkills.installExternal({ workspaceId, ...contact }, signal)
    if (!result.ok) throw new Error(result.error.message)
    return result.value.contact
  }

  /**
   * Who can be mentioned in this Session.
   *
   * The Room Session's own member snapshot is the record: it was taken when the
   * Session started, so it survives a catalog whose contact ids shifted. The
   * legacy per-Session binding map is consulted only for conversations that
   * predate Rooms.
   * @param sessionId - the Harness Session the composer belongs to.
   * @returns mentionable members, possibly empty.
   */
  const roomMembers = (sessionId: string): readonly {
    name: string
    skill: string
    description: string
    section?: string
  }[] => {
    const state = readStored<SkillChatStateDocument>(STATE_KEY, {
      version: 2, rooms: [], roomSessions: [], personas: {}, automations: [],
    })
    const roomSession = state.roomSessions.find(item => item.harnessSessionId === sessionId)
    const room = roomSession === undefined
      ? undefined
      : state.rooms.find(item => item.roomId === roomSession.roomId)
    if (roomSession !== undefined && roomSession.memberSnapshot.length > 0) {
      return roomSession.memberSnapshot.map(member => ({
        name: state.personas[member.skillId]?.displayName ?? member.displayName,
        skill: member.originalName,
        description: state.personas[member.skillId]?.bio ?? '',
        ...room?.type === 'group' ? { section: room.title } : {},
      }))
    }
    if (room !== undefined && room.memberIds.length > 0) {
      return room.memberIds.map((id) => {
        const persona = state.personas[id]
        const skill = persona?.originalName ?? id.slice(id.lastIndexOf(':') + 1)
        return {
          name: persona?.displayName ?? skill,
          skill,
          description: persona?.bio ?? '',
          ...room.type === 'group' ? { section: room.title } : {},
        }
      })
    }
    const binding = readStored<Readonly<Record<string, ChatBinding>>>(CHAT_BINDINGS_KEY, {})[sessionId]
    if (binding === undefined) return []
    const mode = readStored<'persona' | 'raw'>(MODE_KEY, 'persona')
    return binding.members.map((contact) => {
      const display = displayOf(contact, mode)
      return {
        name: display.name,
        skill: contact.name,
        description: contact.description,
        ...binding.kind === 'group' ? { section: binding.name } : {},
      }
    })
  }

  /**
   * The log sequence one assistant message closed at.
   *
   * Forking needs a seq, and the per-message slot hands out a message id only.
   * The Session's own event window carries both, so the lookup is a scan of
   * what the client already holds rather than another round trip.
   * @param sessionId - the Session the message belongs to.
   * @param messageId - the durable message id from the slot.
   * @returns the seq, or undefined when the message is outside the loaded window.
   */
  const messageSeq = (sessionId: SessionId, messageId: string): number | undefined => {
    const entries = sessions.binding(sessionId)?.eventSource.getSnapshot().entries ?? []
    for (let index = entries.length - 1; index >= 0; index -= 1) {
      const entry = entries[index]
      if (entry === undefined || entry.type !== 'event') continue
      // `assistant/message` carries the durable id one level in, under the
      // message it wraps; the event's own `data` has only turn/step/usage.
      const event = entry.event as { seq?: number; data?: { message?: { id?: string } } }
      if (event.data?.message?.id === messageId && typeof event.seq === 'number') return event.seq
    }
    return undefined
  }

  const mentionSource: InputTriggerSource = {
    trigger: '@',
    name: 'skill-contact',
    order: -20,
    showGroupTitle: false,
    candidates(session, { query, signal }) {
      signal.throwIfAborted()
      // Members come from the Room graph, with the pre-Room binding map as a
      // fallback. Reading only the binding map meant every Room created since
      // it stopped being written offered no candidates at all, which is what
      // made `@` do nothing in a group and left people typing raw contact ids.
      const members = roomMembers(session.sessionId)
      if (members.length === 0) return Promise.resolve([])
      const normalized = query.trim().toLocaleLowerCase()
      return Promise.resolve(members.flatMap((member) => {
        if (normalized.length > 0 && !`${member.name} ${member.skill} ${member.description}`.toLocaleLowerCase().includes(normalized)) return []
        return [{
          name: member.name,
          // The Skill's own name leads the second line: it is what the roster in
          // the room's brief calls this member, and what the `skill` tool loads,
          // so a person picking from this list can see the two are the same one.
          description: member.description === ''
            ? member.skill
            : `${member.skill} · ${member.description}`,
          ...member.section === undefined ? {} : { section: member.section },
          value: JSON.stringify({ name: member.name, skill: member.skill, description: member.description }),
        }]
      }))
    },
    onPick({ candidate }) {
      if (candidate.value === undefined) return undefined
      const value = JSON.parse(candidate.value) as { name: string; skill: string; description: string }
      return {
        insert: {
          source: 'skill-contact',
          ref: candidate.value,
          label: value.name,
          clipboardText: `@${value.name}`,
        },
      }
    },
    codec: {
      clipboardText(ref) {
        const value = JSON.parse(ref) as { skill: string }
        return `@${value.skill}`
      },
      // The composer shows the nickname; the model receives the Skill's name.
      // The room's brief lists members as `@<skill name>`, so serializing the
      // nickname made the mention a second vocabulary the model had to map onto
      // the first before it could load anything. Now the token in the message is
      // the token in the roster, and the nickname rides along for the reply.
      serialize(ref) {
        const value = JSON.parse(ref) as { name: string; skill: string }
        return Promise.resolve(`@${value.skill}（昵称：${value.name}）`)
      },
    },
  }
  ctx.effect(() => (ctx.get('inputTriggers') as InputTriggerServiceContract).registerSource(mentionSource), 'skill-chat: @ contacts')

  ctx.slots.inject('sidebar.workspaces', () => ctx.slots.register({
    name: 'sidebar.workspaces',
    priority: -20,
    locale: NS,
    children: DS_CHAT_SHELL_CHILDREN,
    inject: () => ({
      loadContacts,
      searchExternal,
      installExternal,
      openSession: (sessionId: SessionId) => { sessions.open(sessionId) },
      renameSession: async (sessionId: SessionId, name: string) => {
        const session = sessions.binding(sessionId)?.session
        if (session === undefined) return
        const result = await session.rename(name)
        if (!result.ok) throw new Error(result.error.message)
      },
      startSession: (workspaceId: WorkspaceId) => sessions.create({ workspaceId }),
      forkSession: (sessionId: SessionId, atSeq: number, increaseTitle: boolean) =>
        sessions.fork({ sessionId, atSeq, increaseTitle }),
      messageSeq: (sessionId: SessionId, messageId: string) => messageSeq(sessionId, messageId),
      addWorkspace: async () => {
        const path = await uiWorkspace.pickDirectory()
        if (path === null) return null
        return (await workspaces.create({ path })).workspaceId
      },
      chooseContact: async (sessionId: SessionId, contact: SkillContact, displayName: string) => {
        const actx = sessions.scope(sessionId)
        if (actx === undefined) throw new Error(`skill-chat: session "${sessionId}" has no client scope`)
        const draft = contact.invocable
          ? `/${contact.name} `
          : `请以「${displayName}」的身份协助我。原始 Skill：${contact.name}。能力：${contact.description}\n\n我的需求是：`
        conversation.input.for(actx).setDraft(draft)
        await sessions.binding(sessionId)?.session.rename(displayName)
      },
      chooseGroup: async (sessionId: SessionId, group: ContactGroup, displayNames: readonly string[]) => {
        const actx = sessions.scope(sessionId)
        if (actx === undefined) throw new Error(`skill-chat: session "${sessionId}" has no client scope`)
        void displayNames
        conversation.input.for(actx).setDraft('')
        await sessions.binding(sessionId)?.session.rename(group.name)
      },
      loadState,
      saveState,
      runAutomation,
      linkSkill: async (path: string, name: string, signal: AbortSignal) => {
        const result = await ctx.remote.workbuddySkills.linkSkill({ path, name }, signal)
        if (!result.ok) throw new Error(result.error.message)
        return result.value
      },
      unlinkSkill: async (name: string, signal: AbortSignal) => {
        const result = await ctx.remote.workbuddySkills.unlinkSkill(name, signal)
        if (!result.ok) throw new Error(result.error.message)
      },
      browseProject: async (workspaceId: WorkspaceId, path: string | undefined, signal: AbortSignal) => {
        const result = await ctx.remote.workbuddySkills.browseProject({ workspaceId, ...(path === undefined ? {} : { path }) }, signal)
        if (!result.ok) throw new Error(result.error.message)
        return result.value
      },
      readProjectFile: async (workspaceId: WorkspaceId, path: string, signal: AbortSignal) => {
        const result = await ctx.remote.workbuddySkills.readProjectFile({ workspaceId, path }, signal)
        if (!result.ok) throw new Error(result.error.message)
        return result.value
      },
      openTerminal: async (sessionId: SessionId, workspaceId: WorkspaceId, signal: AbortSignal) => {
        const result = await ctx.remote.workbuddySkills.openSkillChatTerminal({ sessionId, workspaceId }, signal)
        if (!result.ok) throw new Error(result.error.message)
        return result.value
      },
      sendTerminal: async (sessionId: SessionId, terminalId: string, command: string, signal: AbortSignal) => {
        const result = await ctx.remote.workbuddySkills.sendSkillChatTerminal({ sessionId, terminalId, command }, signal)
        if (!result.ok) throw new Error(result.error.message)
        return result.value
      },
      closeTerminal: async (sessionId: SessionId, terminalId: string) => {
        const result = await ctx.remote.workbuddySkills.closeSkillChatTerminal({ sessionId, terminalId })
        if (!result.ok) throw new Error(result.error.message)
      },
      startSidecar: async (request, signal: AbortSignal) => {
        const result = await ctx.remote.workbuddySkills.startSkillChatSidecar(request, signal)
        if (!result.ok) throw new Error(result.error.message)
        return result.value
      },
      sendSidecar: async (sidecarId: string, message: string, signal: AbortSignal) => {
        const result = await ctx.remote.workbuddySkills.sendSkillChatSidecar({ sidecarId, message }, signal)
        if (!result.ok) throw new Error(result.error.message)
        return result.value
      },
      closeSidecar: async (sidecarId: string) => {
        const result = await ctx.remote.workbuddySkills.closeSkillChatSidecar(sidecarId)
        if (!result.ok) throw new Error(result.error.message)
      },
    }),
  }, SkillContactsBrowser))

  ctx.slots.inject('ds-chat.settings.section', () => ctx.slots.register({
    name: 'ds-chat.settings.section',
    id: 'skin-center',
    order: 10,
    inject: () => ({ skinRuntime }),
  }, SkinCenter))

  ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
    name: 'conversation.session.header.utilities',
    id: 'skill-chat-tools',
    order: 20,
  }, SkillChatHeaderTools))

  ctx.slots.inject('sidebar.brand.name', () => ctx.slots.register({
    name: 'sidebar.brand.name',
    priority: -30,
  }, DSChatBrand))

  // A list slot, so the entry is added beside the shipped actions rather than
  // replacing them. The per-turn `turnTail` chain carries the seq directly but
  // is already occupied by deliverables, and taking it would displace them.
  ctx.slots.inject('conversation.chat.assistant-actions', () => ctx.slots.register({
    name: 'conversation.chat.assistant-actions',
    id: 'skill-chat-branch',
    order: 30,
  }, SkillChatMessageActions))
}

export function mergeContacts(
  nativeSkills: readonly SkillEntry[],
  workBuddySkills: readonly WorkBuddySkillContact[],
): readonly SkillContact[] {
  const nativeNames = new Set(nativeSkills.map(skill => skill.name))
  return [
    ...nativeSkills.map(skill => ({
      id: `harness:${skill.name}`,
      name: skill.name,
      description: skill.description,
      ...skill.whenToUse === undefined ? {} : { whenToUse: skill.whenToUse },
      source: 'harness' as const,
      sourceLabel: 'DeepSeek Harness',
      invocable: true as const,
      modelInvocable: skill.modelInvocable,
    })),
    ...workBuddySkills
      .filter(skill => !nativeNames.has(skill.name))
      .map(skill => ({
        ...skill,
        // The label names the root the Skill actually came from; before the
        // catalog scanned more than one, every entry claimed WorkBuddy.
        sourceLabel: skill.version === undefined
          ? `${skill.originLabel} · ${skill.plugin}`
          : `${skill.originLabel} · ${skill.plugin} ${skill.version}`,
        sourceShort: skill.originLabel,
        modelInvocable: false,
      })),
  ]
}

/** Mount the generated WorkBuddy Remote contribution before registering the UI. */
export async function mountSkillChatUi(
  ctx: Context,
  contribution: TypertRemoteContribution,
): Promise<() => Promise<void>> {
  const disposeRemote = await ctx.remote.$mount(contribution)
  const ui = ctx.inject([
    'slots', 'sessions', 'workspaces', 'uiWorkspace', 'conversation', 'inputTriggers',
    'remote.skills', 'remote.workbuddySkills', 'locale',
  ], registerUi)
  try {
    await ui
  } catch (error) {
    await ui.dispose()
    await disposeRemote()
    throw error
  }
  return async () => {
    await ui.dispose()
    await disposeRemote()
  }
}

export async function apply(ctx: Context): Promise<() => Promise<void>> {
  return await mountSkillChatUi(ctx, workBuddySkillsRemote)
}
