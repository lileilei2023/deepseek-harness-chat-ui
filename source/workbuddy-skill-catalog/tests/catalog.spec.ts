import { mkdtemp, mkdir, readFile, realpath, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import SystemPrompt from '@deepseek-ai/dsh-system-prompt'
import { WorkBuddySkillCatalog, scanSkillRoots, scanWorkBuddySkillContacts } from '../src/index.ts'

async function writeSkill(root: string, plugin: string, version: string, relativePath: string, content: string): Promise<string> {
  const directory = join(root, plugin, version, relativePath)
  await mkdir(directory, { recursive: true })
  const path = join(directory, 'SKILL.md')
  await writeFile(path, content)
  return path
}

async function catalogContext(): Promise<Context> {
  const ctx = new Context()
  await ctx.plugin(SystemPrompt)
  return ctx
}

function tarArchive(files: Readonly<Record<string, string>>): Buffer {
  const blocks: Buffer[] = []
  for (const [path, content] of Object.entries(files)) {
    const data = Buffer.from(content)
    const header = Buffer.alloc(512)
    header.write(path, 0, 100, 'utf8')
    header.write('0000644\0', 100, 8, 'ascii')
    header.write('0000000\0', 108, 8, 'ascii')
    header.write('0000000\0', 116, 8, 'ascii')
    header.write(`${data.byteLength.toString(8).padStart(11, '0')}\0`, 124, 12, 'ascii')
    header.write('00000000000\0', 136, 12, 'ascii')
    header.fill(0x20, 148, 156)
    header.write('0', 156, 1, 'ascii')
    header.write('ustar\0', 257, 6, 'ascii')
    const checksum = header.reduce((sum, byte) => sum + byte, 0)
    header.write(`${checksum.toString(8).padStart(6, '0')}\0 `, 148, 8, 'ascii')
    blocks.push(header, data, Buffer.alloc(Math.ceil(data.byteLength / 512) * 512 - data.byteLength))
  }
  return Buffer.concat([...blocks, Buffer.alloc(1024)])
}

describe('WorkBuddy Skill catalog', () => {
  afterEach(() => { vi.unstubAllGlobals() })

  it('persists Skill Chat state atomically and returns an empty document initially', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-skill-chat-state-'))
    const stateFile = join(root, 'state.json')
    const catalog = new WorkBuddySkillCatalog(await catalogContext(), { stateFile })

    await expect(catalog.getSkillChatState()).resolves.toEqual({
      version: 2, rooms: [], roomSessions: [], personas: {}, automations: [],
    })
    const state = {
      version: 2 as const,
      rooms: [{
        roomId: 'room:one', type: 'direct' as const, workspaceId: 'workspace', title: '栗子',
        memberIds: ['skill'], coordinatorId: 'skill', sessionIds: [], createdAt: 1, updatedAt: 1,
      }],
      roomSessions: [], personas: {}, automations: [],
    }
    await expect(catalog.putSkillChatState(state)).resolves.toEqual(state)
    await expect(catalog.getSkillChatState()).resolves.toEqual(state)
    await expect(readFile(stateFile, 'utf8')).resolves.toContain('"room:one"')
  })

  it('runs an automation in a new Workspace Session and records it in the Room', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-skill-chat-run-'))
    const ctx = await catalogContext()
    const followup = vi.fn()
    const session = { id: 'session' }
    const attachSession = vi.fn(() => Promise.resolve())
    ctx.provide('workspaceRegistry', { get: () => ({ path: root, status: async () => 'ok' as const, attachSession }) })
    ctx.provide('agentDefaultModel', { currentSelection: () => ({ provider: 'test', model: 'test' }) })
    ctx.provide('agents', { create: async ({ sessionId }: { sessionId: string }) => ({ agent: { session: { ...session, id: sessionId }, followup } }) })
    ctx.provide('sessionTitle', { rename: vi.fn() })
    const catalog = new WorkBuddySkillCatalog(ctx, { stateFile: join(root, 'state.json') })
    await catalog.putSkillChatState({
      version: 2,
      rooms: [{ roomId: 'room', type: 'group', workspaceId: 'workspace', title: '研究组', memberIds: ['skill'], coordinatorId: 'skill', sessionIds: [], createdAt: 1, updatedAt: 1 }],
      roomSessions: [],
      personas: { skill: { skillId: 'skill', displayName: '栗子', avatarId: 'fox-coral', originalName: 'research', roleLabel: '专家', bio: '研究', capabilities: ['研究'], source: 'Harness', customizedName: false, customizedAvatar: false, updatedAt: 1 } },
      automations: [{ automationId: 'automation', name: '日报', workspaceId: 'workspace', roomId: 'room', intent: 'research', prompt: '生成日报', memberIds: ['skill'], coordinatorId: 'skill', schedule: { kind: 'once', runAt: new Date().toISOString() }, lifecycle: 'run-once', status: 'active', createdAt: 1, updatedAt: 1, nextRunAt: 1 }],
    })

    const result = await catalog.runSkillChatAutomation('automation')
    expect(result.state.roomSessions).toHaveLength(1)
    expect(result.state.rooms[0]?.activeSessionId).toBe(result.state.roomSessions[0]?.roomSessionId)
    expect(result.state.automations[0]?.status).toBe('completed')
    expect(attachSession).toHaveBeenCalledWith(result.sessionId)
    expect(followup).toHaveBeenCalledOnce()
  })

  it('injects the persisted group function as a Session system prompt', async () => {
    const ctx = await catalogContext()
    const catalog = new WorkBuddySkillCatalog(ctx)
    await catalog.putSkillChatState({
      version: 2,
      rooms: [{
        roomId: 'room', type: 'group', workspaceId: 'workspace', title: '研究组',
        memberIds: ['skill'], coordinatorId: 'skill', systemPrompt: '你是研究组，先核验来源再给结论。',
        sessionIds: ['room-session'], activeSessionId: 'room-session', createdAt: 1, updatedAt: 1,
      }],
      roomSessions: [{
        roomSessionId: 'room-session', roomId: 'room', harnessSessionId: 'session', title: '研究组',
        memberSnapshot: [], createdAt: 1, updatedAt: 1,
      }],
      personas: {}, automations: [],
    })

    const assembly = await ctx.systemPrompt.assemble({ scope: { id: 'session' } })
    expect(assembly.sections).toContainEqual({
      name: 'skill-chat:room-role',
      text: '你是研究组，先核验来源再给结论。',
    })
  })

  it('reads nested metadata and derives plugin provenance', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-workbuddy-catalog-'))
    await writeSkill(root, 'sheetagent', '1.2.3', 'skills/excel-handler', `---
name: excel-handler
description: Handles spreadsheet files.
---
# Excel Handler

## When to Use

- Edit an existing workbook.
- Analyze tabular data.

## Workflow
Do work.
`)

    await expect(scanWorkBuddySkillContacts(root)).resolves.toEqual([{
      id: 'workbuddy:sheetagent:excel-handler',
      name: 'excel-handler',
      description: 'Handles spreadsheet files.',
      whenToUse: 'Edit an existing workbook. Analyze tabular data.',
      source: 'workbuddy',
      originId: 'workbuddy',
      originLabel: 'WorkBuddy',
      plugin: 'sheetagent',
      version: '1.2.3',
      invocable: false,
    }])
  })

  it('keeps the newest duplicate and ignores malformed or linked entries', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-workbuddy-catalog-'))
    await writeSkill(root, 'demo', '1.9.0', '', '---\nname: duplicate\ndescription: old\n---\n')
    await writeSkill(root, 'demo', '1.10.0', '', '---\nname: duplicate\ndescription: new\n---\n')
    await writeSkill(root, 'broken', '1.0.0', '', '# no frontmatter\n')
    const outside = await mkdtemp(join(tmpdir(), 'dsh-workbuddy-outside-'))
    await writeFile(join(outside, 'SKILL.md'), '---\nname: escaped\ndescription: escaped\n---\n')
    await symlink(outside, join(root, 'linked'))

    const contacts = await scanWorkBuddySkillContacts(root)
    expect(contacts).toHaveLength(1)
    expect(contacts[0]).toMatchObject({ name: 'duplicate', description: 'new', version: '1.10.0' })
  })

  it('reads a flat root, where SKILL.md sits one level down', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-flat-catalog-'))
    await mkdir(join(root, 'poster'), { recursive: true })
    await writeFile(join(root, 'poster', 'SKILL.md'), '---\nname: poster\ndescription: Makes posters.\n---\n')
    // A bundle directory holding several Skills is still one level of nesting,
    // and its middle segment is a name rather than a version.
    await mkdir(join(root, 'legal', 'arbitration'), { recursive: true })
    await writeFile(join(root, 'legal', 'arbitration', 'SKILL.md'), '---\nname: arbitration\ndescription: Files claims.\n---\n')

    const contacts = await scanSkillRoots([{ id: 'claude', label: 'Claude', path: root, layout: 'flat' }])
    expect(contacts.map(contact => contact.name)).toEqual(['arbitration', 'poster'])
    expect(contacts).toContainEqual(expect.objectContaining({
      id: 'claude:poster:poster',
      originId: 'claude',
      originLabel: 'Claude',
      plugin: 'poster',
    }))
    // No version directory in this layout, so no version is claimed.
    expect(contacts.every(contact => contact.version === undefined)).toBe(true)
  })

  it('merges roots in precedence order and keeps the first owner of a name', async () => {
    const first = await mkdtemp(join(tmpdir(), 'dsh-root-a-'))
    const second = await mkdtemp(join(tmpdir(), 'dsh-root-b-'))
    await writeSkill(first, 'pack', '1.0.0', '', '---\nname: shared\ndescription: from the first root\n---\n')
    await mkdir(join(second, 'shared'), { recursive: true })
    await writeFile(join(second, 'shared', 'SKILL.md'), '---\nname: shared\ndescription: from the second root\n---\n')
    await mkdir(join(second, 'only-here'), { recursive: true })
    await writeFile(join(second, 'only-here', 'SKILL.md'), '---\nname: only-here\ndescription: unique\n---\n')

    const contacts = await scanSkillRoots([
      { id: 'workbuddy', label: 'WorkBuddy', path: first, layout: 'plugin-version' },
      { id: 'claude', label: 'Claude', path: second, layout: 'flat' },
    ])
    expect(contacts.map(contact => contact.name)).toEqual(['only-here', 'shared'])
    expect(contacts.find(contact => contact.name === 'shared')).toMatchObject({
      description: 'from the first root',
      originLabel: 'WorkBuddy',
    })
    expect(contacts.find(contact => contact.name === 'only-here')).toMatchObject({ originLabel: 'Claude' })
  })

  it('skips a Skill whose frontmatter is not valid YAML instead of failing the scan', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-bad-yaml-'))
    await mkdir(join(root, 'broken'), { recursive: true })
    // An unquoted description containing a colon: valid Markdown, invalid YAML.
    await writeFile(join(root, 'broken', 'SKILL.md'), '---\nname: broken\ndescription: install first: npm i -g thing\n---\n')
    await mkdir(join(root, 'fine'), { recursive: true })
    await writeFile(join(root, 'fine', 'SKILL.md'), '---\nname: fine\ndescription: Works.\n---\n')

    const contacts = await scanSkillRoots([{ id: 'claude', label: 'Claude', path: root, layout: 'flat' }])
    expect(contacts.map(contact => contact.name)).toEqual(['fine'])
  })

  it('returns an empty catalog for a missing installation and honors aborts', async () => {
    const root = join(tmpdir(), `dsh-workbuddy-missing-${randomUUID()}`)
    await expect(scanWorkBuddySkillContacts(root)).resolves.toEqual([])
    await expect(scanWorkBuddySkillContacts(root, AbortSignal.abort(new Error('stop')))).rejects.toThrow('stop')
  })

  it('projects bounded skills.sh search metadata without installing results', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({
      skills: [
        { id: 'owner/repo/demo', skillId: 'demo', name: 'demo', source: 'owner/repo', installs: 42 },
        { id: 'owner/repo/fallback', skillId: 'fallback', name: 'fallback', source: 'owner/repo', installs: 'unknown' },
        { id: 3, name: 'invalid', source: 'owner/repo', installs: 7 },
      ],
    }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
    const catalog = new WorkBuddySkillCatalog(await catalogContext(), { skillsShOrigin: 'https://skills.example' })

    await expect(catalog.searchExternal('x')).resolves.toEqual({ contacts: [] })
    await expect(catalog.searchExternal('react')).resolves.toEqual({ contacts: [
      { id: 'owner/repo/demo', skillId: 'demo', name: 'demo', source: 'owner/repo', installs: 42, repository: 'https://github.com/owner/repo' },
      { id: 'owner/repo/fallback', skillId: 'fallback', name: 'fallback', source: 'owner/repo', installs: 0, repository: 'https://github.com/owner/repo' },
    ] })
    expect(fetchMock).toHaveBeenCalledWith('https://skills.example/api/search?q=react&limit=20', {
      headers: { accept: 'application/json' },
    })
  })

  it('installs one marketplace Skill into the registered Workspace', async () => {
    const workspace = await mkdtemp(join(tmpdir(), 'dsh-skill-install-'))
    const ctx = await catalogContext()
    ctx.provide('workspaceRegistry', {
      get: () => ({ path: workspace, status: async () => 'ok' as const }),
    })
    const fetchMock = vi.fn(async (url: string) => {
      if (url.includes('/git/trees/HEAD')) return new Response(JSON.stringify({ tree: [
        { path: 'skills/demo/SKILL.md', type: 'blob', mode: '100644', size: 75 },
        { path: 'skills/demo/assets/example.txt', type: 'blob', mode: '100644', size: 7 },
        { path: 'skills/demo/link', type: 'blob', mode: '120000', size: 12 },
      ] }), { status: 200 })
      if (url.endsWith('/skills/demo/SKILL.md')) {
        return new Response('---\nname: demo\ndescription: Demo skill.\n---\n\n## When to Use\n\n- Testing installs.\n')
      }
      if (url.endsWith('/skills/demo/assets/example.txt')) return new Response('example')
      return new Response('', { status: 404 })
    })
    vi.stubGlobal('fetch', fetchMock)
    const catalog = new WorkBuddySkillCatalog(ctx)

    const installed = await catalog.installExternal({
      workspaceId: 'workspace',
      id: 'owner/repo/demo',
      skillId: 'demo',
      source: 'owner/repo',
    })

    expect(installed.contact).toMatchObject({
      id: 'skills-sh:owner/repo/demo',
      name: 'demo',
      description: 'Demo skill.',
      whenToUse: 'Testing installs.',
      invocable: true,
    })
    await expect(readFile(join(workspace, '.dsh/skills/demo/SKILL.md'), 'utf8')).resolves.toContain('name: demo')
    await expect(readFile(join(workspace, '.dsh/skills/demo/assets/example.txt'), 'utf8')).resolves.toBe('example')
  })

  it('installs a repository whose only Skill lives at the root', async () => {
    const workspace = await mkdtemp(join(tmpdir(), 'dsh-root-skill-install-'))
    const ctx = await catalogContext()
    ctx.provide('workspaceRegistry', {
      get: () => ({ path: workspace, status: async () => 'ok' as const }),
    })
    vi.stubGlobal('fetch', vi.fn(async (url: string) => {
      if (url.includes('/git/trees/HEAD')) return new Response(JSON.stringify({ tree: [
        { path: 'SKILL.md', type: 'blob', mode: '100644', size: 74 },
      ] }), { status: 200 })
      if (url.endsWith('/SKILL.md')) return new Response('---\nname: akshare-stock\ndescription: Stock research.\n---\n')
      return new Response('', { status: 404 })
    }))
    const catalog = new WorkBuddySkillCatalog(ctx)

    const installed = await catalog.installExternal({
      workspaceId: 'workspace', id: 'molezzz/openclaw-stock-skill/akshare-stock',
      skillId: 'akshare-stock', source: 'molezzz/openclaw-stock-skill',
    })

    expect(installed.contact.name).toBe('akshare-stock')
    await expect(readFile(join(workspace, '.dsh/skills/akshare-stock/SKILL.md'), 'utf8')).resolves.toContain('Stock research.')
  })

  it('falls back to a bounded GitHub source archive when the tree API is rate limited', async () => {
    const workspace = await mkdtemp(join(tmpdir(), 'dsh-archive-skill-install-'))
    const ctx = await catalogContext()
    ctx.provide('workspaceRegistry', {
      get: () => ({ path: workspace, status: async () => 'ok' as const }),
    })
    const archive = gzipSync(tarArchive({
      'repo-main/skills/serenity/SKILL.md': '---\nname: serenity\ndescription: Calm research assistant.\n---\n',
      'repo-main/skills/serenity/assets/prompt.txt': 'Stay calm.',
    }))
    const fetchMock = vi.fn(async (url: string) => {
      if (url.includes('/git/trees/HEAD')) return new Response('rate limited', { status: 403 })
      if (url.includes('codeload.github.com')) return new Response(archive, { status: 200 })
      return new Response('', { status: 404 })
    })
    vi.stubGlobal('fetch', fetchMock)
    const catalog = new WorkBuddySkillCatalog(ctx)

    const installed = await catalog.installExternal({
      workspaceId: 'workspace', id: 'owner/repo/serenity', skillId: 'serenity', source: 'owner/repo',
    })

    expect(installed.contact).toMatchObject({ name: 'serenity', description: 'Calm research assistant.' })
    await expect(readFile(join(workspace, '.dsh/skills/serenity/assets/prompt.txt'), 'utf8')).resolves.toBe('Stay calm.')
    expect(fetchMock).toHaveBeenCalledWith('https://codeload.github.com/owner/repo/tar.gz/HEAD', expect.any(Object))
  })

  it('keeps project browsing inside the registered Workspace', async () => {
    const workspace = await mkdtemp(join(tmpdir(), 'dsh-project-browse-'))
    const outside = await mkdtemp(join(tmpdir(), 'dsh-project-outside-'))
    await writeFile(join(workspace, 'README.md'), 'inside')
    await writeFile(join(outside, 'secret.txt'), 'outside')
    const ctx = await catalogContext()
    ctx.provide('workspaceRegistry', {
      get: () => ({ path: workspace, status: async () => 'ok' as const }),
    })
    const catalog = new WorkBuddySkillCatalog(ctx)
    const resolvedWorkspace = await realpath(workspace)

    await expect(catalog.browseProject({ workspaceId: 'workspace' })).resolves.toMatchObject({
      path: resolvedWorkspace,
      root: resolvedWorkspace,
      entries: [{ name: 'README.md', kind: 'file', hidden: false }],
    })
    await expect(catalog.browseProject({ workspaceId: 'workspace', path: outside })).rejects.toThrow('escapes Workspace')
    await expect(catalog.readProjectFile({ workspaceId: 'workspace', path: join(workspace, 'README.md') })).resolves.toMatchObject({
      name: 'README.md', content: 'inside', language: 'markdown', binary: false, truncated: false,
    })
    await expect(catalog.readProjectFile({ workspaceId: 'workspace', path: join(outside, 'secret.txt') })).rejects.toThrow('escapes Workspace')
  })

  it('runs terminal commands through the Host subprocess fallback', async () => {
    const workspace = await mkdtemp(join(tmpdir(), 'dsh-terminal-fallback-'))
    const ctx = await catalogContext()
    const agent = { id: 'session', ctx: { get: () => undefined } }
    const stdout = { readFrom: vi.fn(() => ({ text: `${workspace}\nterminal-ok\n`, nextOffset: 1, lossy: false })) }
    const stderr = { readFrom: vi.fn(() => ({ text: '', nextOffset: 0, lossy: false })) }
    const spawn = vi.fn(() => ({
      pid: 1, stdin: undefined, stdout: undefined, stderr: undefined,
      collected: { stdout, stderr }, done: Promise.resolve({ exitCode: 0 }),
      terminate: vi.fn(), waitForExit: vi.fn(() => Promise.resolve(true)),
    }))
    ctx.provide('agents', { get: () => agent } as never)
    ctx.provide('workspaceRegistry', {
      get: () => ({ path: workspace, sessionIds: ['session'], status: async () => 'ok' as const }),
    } as never)
    ctx.provide('subprocess', { spawn } as never)
    const catalog = new WorkBuddySkillCatalog(ctx)

    const opened = await catalog.openSkillChatTerminal({ sessionId: 'session', workspaceId: 'workspace' })
    const result = await catalog.sendSkillChatTerminal({
      sessionId: 'session', terminalId: opened.terminalId, command: 'pwd && printf "terminal-ok\\n"',
    })

    expect(opened.terminalId).toBe('oneshot:workspace')
    expect(result.text).toContain(workspace)
    expect(result.text).toContain('terminal-ok')
    expect(result.text).toContain('[exit 0]')
    expect(spawn).toHaveBeenCalledWith(expect.objectContaining({ cwd: workspace }))
  })
})
