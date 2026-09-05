import { Context, Service } from '@deepseek-ai/cordis'
import { describe, expect, it, vi } from 'vitest'
import { SlotRegistry } from '@deepseek-ai/dsh-client-ui-renderer/client'
import type { TypertRemoteContribution } from '@deepseek-ai/dsh-typert-protocol'
import type { InputTriggerSource } from '@deepseek-ai/dsh-client-ui-input-trigger/client'
import {
  bindLegacyGroups, CHAT_BINDINGS_KEY, groupsForWorkspace, responderForMessage,
  SkillContactsBrowser, type ContactGroup, type SkillContact, parseDiff } from '../src/client/SkillContactsBrowser.tsx'
import {
  activeHarnessSession, defaultPersona, ensurePersonas, migrateLegacyState, roomForSession,
} from '../src/client/model.ts'
import { inject, mergeContacts, mountSkillChatUi } from '../src/client/index.ts'
import { createSkinRuntime, SKIN_PREFERENCE_KEY, validateSkinPackage } from '../src/client/skin/index.ts'

const REMOTE: TypertRemoteContribution = {
  package: '@deepseek-ai/dsh-experimental-workbuddy-skill-catalog',
  descriptors: [],
}

describe('SkillChat browser plugin', () => {
  it('creates stable neutral personas with one of the built-in animal avatars', () => {
    const contact = {
      id: 'harness:design', name: 'design', description: 'Design interfaces.',
      source: 'harness', sourceLabel: 'Harness', invocable: true, modelInvocable: true,
    } satisfies SkillContact
    const first = defaultPersona(contact, 100)
    const second = defaultPersona(contact, 200)

    expect(first.displayName).toBe(second.displayName)
    expect(first.avatarId).toBe(second.avatarId)
    expect(first.displayName).not.toContain('设计')
    expect(ensurePersonas([contact], {})).toHaveProperty(contact.id)
  })

  it('adds a stable suffix when generated persona names collide', () => {
    const contacts = [{
      id: 'harness:bytedance-auth', name: 'bytedance-auth', description: 'Authenticate.',
      source: 'harness', sourceLabel: 'Harness', invocable: true, modelInvocable: true,
    }, {
      id: 'skills-sh:molezzz/openclaw-stock-skill/akshare-stock', name: 'akshare-stock', description: 'Analyze stocks.',
      source: 'skills-sh', sourceLabel: 'skills.sh', invocable: true, modelInvocable: true,
    }] satisfies readonly SkillContact[]

    const personas = ensurePersonas(contacts, {})
    expect(new Set(Object.values(personas).map(persona => persona.displayName)).size).toBe(2)
    expect(ensurePersonas(contacts, personas)).toEqual(personas)
  })

  it('migrates legacy bindings into one resumable room with multiple sessions', () => {
    const contact = {
      id: 'harness:design', name: 'design', description: 'Design interfaces.',
      source: 'harness', sourceLabel: 'Harness', invocable: true, modelInvocable: true,
    } satisfies SkillContact
    const group = {
      id: 'group-one', name: '设计组', members: [contact], leaderId: contact.id,
      workspaceId: 'workspace' as never, createdAt: 1,
    } satisfies ContactGroup
    const migrated = migrateLegacyState([group], {
      first: { name: group.name, avatar: 'old', kind: 'group', members: [contact], groupId: group.id },
      second: { name: group.name, avatar: 'old', kind: 'group', members: [contact], groupId: group.id },
    }, { first: 'workspace' as never, second: 'workspace' as never }, { first: 10, second: 20 }, 30)

    expect(migrated.rooms).toHaveLength(1)
    expect(migrated.rooms[0]?.sessionIds).toHaveLength(2)
    expect(activeHarnessSession(migrated.rooms[0]!, migrated.roomSessions)).toBe('second')
    expect(roomForSession(migrated.rooms, migrated.roomSessions, 'first' as never)?.roomId)
      .toBe(migrated.rooms[0]?.roomId)
  })

  it('attributes one explicit mention and otherwise falls back to the group lead', () => {
    const members = [{
      id: 'harness:design', name: 'design', description: 'Design interfaces.',
      source: 'harness', sourceLabel: 'Harness', invocable: true, modelInvocable: true,
    }, {
      id: 'harness:finance', name: 'finance', description: 'Analyze finance.',
      source: 'harness', sourceLabel: 'Harness', invocable: true, modelInvocable: true,
    }] satisfies readonly SkillContact[]

    expect(responderForMessage(members, 'harness:design', '@finance 请分析', 'raw')?.id)
      .toBe('harness:finance')
    expect(responderForMessage(members, 'harness:design', '@finance @design 一起分析', 'raw')?.id)
      .toBe('harness:design')
    expect(responderForMessage(members, 'harness:design', '请分析', 'raw')?.id)
      .toBe('harness:design')
  })

  it('binds legacy groups once and keeps groups isolated by Workspace', () => {
    const legacy = [{
      id: 'group:legacy', name: 'Legacy', members: [{
        id: 'harness:design', name: 'design', description: 'Design interfaces.',
        source: 'harness', sourceLabel: 'Harness', invocable: true, modelInvocable: true,
      }], leaderId: 'harness:design', createdAt: 1,
    }] satisfies readonly ContactGroup[]
    const alpha = 'alpha' as never
    const beta = 'beta' as never
    const migrated = bindLegacyGroups(legacy, alpha)

    expect(groupsForWorkspace(migrated, alpha)).toHaveLength(1)
    expect(groupsForWorkspace(migrated, beta)).toHaveLength(0)
    expect(bindLegacyGroups(migrated, beta)).toBe(migrated)
  })

  it('merges native and WorkBuddy contacts while preserving native name ownership', () => {
    expect(mergeContacts([{
      name: 'shared', description: 'Harness copy', modelInvocable: true,
    }], [{
      id: 'workbuddy:demo:shared',
      name: 'shared',
      description: 'WorkBuddy copy',
      source: 'workbuddy',
      originId: 'workbuddy',
      originLabel: 'WorkBuddy',
      plugin: 'demo',
      version: '1.0.0',
      invocable: false,
    }, {
      id: 'workbuddy:demo:external',
      name: 'external',
      description: 'External only',
      source: 'workbuddy',
      originId: 'workbuddy',
      originLabel: 'WorkBuddy',
      plugin: 'demo',
      version: '1.0.0',
      invocable: false,
    }])).toEqual([
      expect.objectContaining({ id: 'harness:shared', name: 'shared', invocable: true }),
      expect.objectContaining({ id: 'workbuddy:demo:external', name: 'external', invocable: false }),
    ])
  })

  it('registers and releases the sidebar replacement', async () => {
    const ctx = new Context()
    const slots = new SlotRegistry(ctx)
    slots.register({
      name: 'root',
      children: { 'sidebar.workspaces': { kind: 'single', scope: 'root' } },
    } as never, () => null)
    ctx.provide('sessions', {})
    ctx.provide('workspaces', {})
    ctx.provide('uiWorkspace', {})
    ctx.provide('conversation', {})
    ctx.provide('locale', { register: () => () => {} })
    let mentionSource: InputTriggerSource | undefined
    const unregisterMention = vi.fn()
    ctx.provide('inputTriggers', {
      registerSource: (source: InputTriggerSource) => {
        mentionSource = source
        return unregisterMention
      },
    })
    class RemoteService extends Service {
      readonly disposeMount = vi.fn(() => Promise.resolve())
      readonly mount = vi.fn((_contribution: unknown) => Promise.resolve(this.disposeMount))

      constructor(serviceCtx: Context) {
        super(serviceCtx, 'remote')
      }

      $mount(contribution: unknown): Promise<() => Promise<void>> {
        return this.mount(contribution)
      }
    }
    const remote = new RemoteService(ctx)
    ctx.provide('remote.skills', { list: async () => ({ ok: true, value: { skills: [] } }) })
    ctx.provide('remote.workbuddySkills', {
      list: async () => ({ ok: true, value: { contacts: [] } }),
      searchExternal: async () => ({ ok: true, value: { contacts: [] } }),
      installExternal: async () => ({ ok: true, value: { contact: {}, path: '' } }),
    })

    const fiber = ctx.plugin({ inject: [...inject], apply: clientCtx => mountSkillChatUi(clientCtx, REMOTE) })
    await fiber.await()

    const entry = slots.entries('sidebar.workspaces')[0]
    expect(entry?.options).toMatchObject({ priority: -20 })
    expect(entry?.locale).toBe('skillChat')
    expect(entry?.component).toBe(SkillContactsBrowser)
    expect(slots.spec('ds-chat.sidebar.before-rooms')).toMatchObject({ kind: 'list', scope: 'root' })
    expect(slots.spec('ds-chat.room.header.actions')).toMatchObject({ kind: 'list', scope: 'root' })
    expect(slots.spec('ds-chat.settings.section')).toMatchObject({ kind: 'list', scope: 'root' })
    expect(slots.entries('ds-chat.settings.section')).toHaveLength(1)
    const disposeContribution = slots.register({
      name: 'ds-chat.sidebar.before-rooms', id: 'test-contribution', order: 5,
    }, () => null)
    expect(slots.entries('ds-chat.sidebar.before-rooms')).toHaveLength(1)
    disposeContribution()
    expect(slots.entries('ds-chat.sidebar.before-rooms')).toHaveLength(0)
    expect(remote.mount).toHaveBeenCalledWith(REMOTE)
    expect(mentionSource).toMatchObject({ trigger: '@', name: 'skill-contact' })

    await fiber.dispose()
    expect(slots.entries('sidebar.workspaces')).toHaveLength(0)
    expect(remote.disposeMount).toHaveBeenCalledOnce()
    expect(unregisterMention).toHaveBeenCalledOnce()
  })

  it('applies, previews, resets, and rejects unsafe Skin Manifest v2 packages', () => {
    const storage = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => { storage.set(key, value) },
    })
    const runtime = createSkinRuntime()

    expect(runtime.getSnapshot().activeId).toBe('ds-chat-mint')
    runtime.preview('teamily-soft')
    expect(runtime.getSnapshot().previewId).toBe('teamily-soft')
    runtime.apply('teamily-soft')
    expect(runtime.getSnapshot().activeId).toBe('teamily-soft')
    expect(runtime.getSnapshot().previewId).toBeUndefined()
    expect(storage.get(SKIN_PREFERENCE_KEY)).toBe('teamily-soft')
    runtime.reset()
    expect(runtime.getSnapshot().activeId).toBe('ds-chat-mint')

    const unsafe = validateSkinPackage({
      source: 'dsh-web',
      manifest: {
        skinManifestVersion: 2, id: 'unsafe', name: 'Unsafe', version: '1', author: 'test',
        tagline: 'unsafe', accent: '#112233', contributes: { stylesheet: 'skin.css' },
      },
      css: '@import "https://example.com/skin.css"; html[data-dsh-skin="unsafe"] {}',
    })
    expect(unsafe).toMatchObject({ ok: false })
    runtime.dispose()
    vi.unstubAllGlobals()
  })

  it('offers bound group members through the composer @ menu', async () => {
    const storage = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => { storage.set(key, value) },
    })
    storage.set(CHAT_BINDINGS_KEY, JSON.stringify({
      session: {
        name: '产品群', avatar: '🎨', kind: 'group',
        members: [{
          id: 'harness:design', name: 'design', description: 'Design interfaces.',
          source: 'harness', sourceLabel: 'Harness', invocable: true, modelInvocable: true,
        }],
      },
    }))

    const ctx = new Context()
    const slots = new SlotRegistry(ctx)
    slots.register({ name: 'root', children: { 'sidebar.workspaces': { kind: 'single', scope: 'root' } } } as never, () => null)
    ctx.provide('sessions', {})
    ctx.provide('workspaces', {})
    ctx.provide('uiWorkspace', {})
    ctx.provide('conversation', {})
    ctx.provide('locale', { register: () => () => {}, bind: () => (key: string) => key })
    let source: InputTriggerSource | undefined
    ctx.provide('inputTriggers', { registerSource: (next: InputTriggerSource) => { source = next; return () => {} } })
    class RemoteService extends Service {
      constructor(serviceCtx: Context) { super(serviceCtx, 'remote') }
      $mount(): Promise<() => Promise<void>> { return Promise.resolve(async () => {}) }
    }
    new RemoteService(ctx)
    ctx.provide('remote.skills', { list: async () => ({ ok: true, value: { skills: [] } }) })
    ctx.provide('remote.workbuddySkills', {
      list: async () => ({ ok: true, value: { contacts: [] } }),
      searchExternal: async () => ({ ok: true, value: { contacts: [] } }),
      installExternal: async () => ({ ok: true, value: { contact: {}, path: '' } }),
    })

    const fiber = ctx.plugin({ inject: [...inject], apply: clientCtx => mountSkillChatUi(clientCtx, REMOTE) })
    await fiber.await()
    const candidates = await source!.candidates({ sessionId: 'session' as never }, {
      query: 'design', position: 'inline', drilled: false, signal: new AbortController().signal,
    })
    expect(candidates).toEqual([expect.objectContaining({ description: 'Design interfaces.' })])
    expect(source!.onPick({
      candidate: candidates[0]!, session: { sessionId: 'session' as never }, position: 'inline', via: 'enter', action: 'pick',
      span: { start: 0, end: 3, draftRev: 1 },
    })).toMatchObject({ insert: { source: 'skill-contact', label: candidates[0]!.name } })
    await fiber.dispose()
    vi.unstubAllGlobals()
  })
})

describe('parseDiff', () => {
  it('types a unified patch and drops the headers git repeats', () => {
    const patch = [
      'diff --git a/src/app.ts b/src/app.ts',
      'index 1111111..2222222 100644',
      '--- a/src/app.ts',
      '+++ b/src/app.ts',
      '@@ -1,4 +1,5 @@',
      ' const name = "app"',
      '-const version = 1',
      '+const version = 2',
      '+const built = true',
      ' export { name }',
    ].join('\n')
    const lines = parseDiff(patch)
    expect(lines.map(line => line.kind)).toEqual(['file', 'hunk', 'context', 'remove', 'add', 'add', 'context'])
    // The file row keeps the path alone, not the whole `diff --git a/… b/…`.
    expect(lines[0]).toEqual({ kind: 'file', text: 'src/app.ts' })
    // The +/- markers are stripped so the gutter can own them.
    expect(lines.find(line => line.kind === 'add')).toEqual({ kind: 'add', text: 'const version = 2' })
  })

  it('keeps everything before the first patch as preamble', () => {
    // The text arrives as raw terminal output: the command echo and the
    // --stat summary sit above the patch and must not be read as context.
    const lines = parseDiff('$ git diff\n README.md | 2 +-\n\ndiff --git a/README.md b/README.md\n@@ -1 +1 @@\n-old\n+new')
    expect(lines.filter(line => line.kind === 'meta').map(line => line.text))
      .toEqual(['$ git diff', ' README.md | 2 +-'])
    expect(lines.some(line => line.kind === 'file')).toBe(true)
  })

  it('reports no patch when git printed something else entirely', () => {
    const lines = parseDiff('warning: Not a git repository.\nusage: git diff --no-index …')
    expect(lines.every(line => line.kind === 'meta')).toBe(true)
    expect(lines.some(line => line.kind === 'file' || line.kind === 'hunk')).toBe(false)
  })
})
