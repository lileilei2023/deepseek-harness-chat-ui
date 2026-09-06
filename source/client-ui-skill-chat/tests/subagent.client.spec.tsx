// @vitest-environment jsdom
/**
 * The delegated-member row.
 *
 * Attribution is the part worth pinning: the row puts a named colleague's face
 * on a piece of work, so matching the wrong member is worse than matching none,
 * and the tests below are mostly about the ways a long brief can tempt it into
 * the wrong answer.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import type { ToolCallBlock } from '@deepseek-ai/dsh-client-ui-chat/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'

/** What `useHeaderBridge` returns for the render under test. */
let bridge: unknown = null

vi.mock('../src/client/SkillContactsBrowser.tsx', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/client/SkillContactsBrowser.tsx')>()
  // Only the bridge is stubbed: the room publishes it from a running instance,
  // and `memberForSubagent` is the real matcher this row is built on.
  return { ...actual, useHeaderBridge: () => bridge }
})

const {
  SubagentRow, subagentArgs, subagentMember, subagentReport, subagentVerdict,
} = await import('../src/client/subagent.tsx')

const SESSION = 'session-1' as SessionId

const MEMBERS = [
  { key: 'kouzhao-industry-analysis', name: '布丁', avatarId: 'p1', working: true },
  { key: 'pa-guyouquan', name: '豆花', avatarId: 'p2', working: false },
  { key: 'pa-etf', name: '芝麻', avatarId: 'p3', working: false },
]

/** A running call carrying the given arguments. */
const running = (args: Record<string, unknown>): ToolCallBlock => ({
  callId: 'call-1',
  name: 'subagent',
  argsRaw: JSON.stringify(args),
  turn: 1,
  step: 1,
  time: 0,
  subCalls: [],
} as unknown as ToolCallBlock)

/** A settled call with the given report text. */
const settled = (args: Record<string, unknown>, text: string, isError = false): ToolCallBlock => ({
  kind: 'tool-result',
  seq: 2,
  time: 0,
  callId: 'call-1',
  call: { name: 'subagent', argsRaw: JSON.stringify(args) },
  callTime: 0,
  content: [{ type: 'text', text }],
  isError,
  subCalls: [],
} as unknown as ToolCallBlock)

beforeEach(() => { bridge = { sessionId: SESSION, memberActivity: MEMBERS } })
afterEach(() => { cleanup(); bridge = null })

describe('subagent call arguments', () => {
  it('reads the display description and the brief', () => {
    expect(subagentArgs('{"description":"区块链周期阶段分析","prompt":"先加载 X"}'))
      .toEqual({ description: '区块链周期阶段分析', prompt: '先加载 X' })
  })

  it('returns empty fields rather than throwing on args that are not JSON', () => {
    // A rejected or truncated call keeps whatever the model produced.
    expect(subagentArgs('{"description":"half')).toEqual({ description: '', prompt: '' })
    expect(subagentArgs('')).toEqual({ description: '', prompt: '' })
  })

  it('ignores fields of the wrong type', () => {
    expect(subagentArgs('{"description":7,"prompt":null}')).toEqual({ description: '', prompt: '' })
  })
})

describe('matching a child to its member', () => {
  it('takes the member from the load instruction the group prompt asks for', () => {
    const args = { description: '区块链周期阶段分析', prompt: '先加载 kouzhao-industry-analysis 这个 Skill，再按它的方法完成以下任务。' }
    expect(subagentMember(subagentArgs(JSON.stringify(args)), MEMBERS)).toBe('kouzhao-industry-analysis')
  })

  it('accepts the nickname when the coordinator writes that instead', () => {
    expect(subagentMember({ description: '', prompt: '先加载 豆花 这个 Skill' }, MEMBERS)).toBe('pa-guyouquan')
  })

  it('does not hand the row to a member the brief merely mentions later', () => {
    // The one that would break attribution in a real room: the brief names who
    // to send the result to, and that member is not the one doing the work.
    const prompt = '先加载 pa-etf 这个 Skill。完成后把结论交给 豆花 汇总，再抄送 布丁。'
    expect(subagentMember({ description: '套利空间扫描', prompt }, MEMBERS)).toBe('pa-etf')
  })

  it('leaves a child with no load instruction unattributed', () => {
    expect(subagentMember({ description: '整理今天的会议纪要', prompt: '把纪要整理成三段。' }, MEMBERS))
      .toBeUndefined()
  })

  it('ignores a name that appears only far into the brief', () => {
    const prompt = `${'背景说明。'.repeat(120)}最后请 布丁 复核。`
    expect(subagentMember({ description: '', prompt }, MEMBERS)).toBeUndefined()
  })
})

describe('reading the outcome', () => {
  it('joins the text the child returned and skips other blocks', () => {
    const block = {
      kind: 'tool-result',
      content: [{ type: 'text', text: '结论一' }, { type: 'image', data: '…' }, { type: 'text', text: '结论二' }],
      isError: false,
    } as unknown as ToolCallBlock
    expect(subagentReport(block)).toBe('结论一\n结论二')
  })

  it('has nothing to report while the call is still running', () => {
    expect(subagentReport(running({ description: 'x', prompt: 'y' }))).toBe('')
    expect(subagentVerdict(running({ description: 'x', prompt: 'y' }))).toBe('running')
  })

  it('separates a returned answer from a failed one', () => {
    expect(subagentVerdict(settled({}, '好了'))).toBe('done')
    expect(subagentVerdict(settled({}, '出错了', true))).toBe('failed')
  })
})

describe('the row', () => {
  const brief = '先加载 kouzhao-industry-analysis 这个 Skill，再完成以下任务。'

  it('gives the work the member persona name and portrait', () => {
    render(<SubagentRow
      callId="call-1"
      block={running({ description: '区块链周期阶段分析', prompt: brief })}
      sessionId={SESSION}
    />)
    expect(screen.getByText('布丁')).toBeTruthy()
    expect(screen.getByText('区块链周期阶段分析')).toBeTruthy()
    expect(screen.getByTitle('布丁')).toBeTruthy()
  })

  it('shows no portrait for a child that named no member', () => {
    render(<SubagentRow
      callId="call-1"
      block={running({ description: '整理纪要', prompt: '把纪要整理成三段。' })}
      sessionId={SESSION}
    />)
    expect(screen.getByText('子代理')).toBeTruthy()
    expect(document.querySelector('img')).toBeNull()
  })

  it('does not borrow another session\'s roster', () => {
    // The bridge publishes whichever room is on screen. Attributing this
    // session's child to that room's member would be a confident lie.
    bridge = { sessionId: 'other-session' as SessionId, memberActivity: MEMBERS }
    render(<SubagentRow
      callId="call-1"
      block={running({ description: '区块链周期阶段分析', prompt: brief })}
      sessionId={SESSION}
    />)
    expect(screen.queryByText('布丁')).toBeNull()
    expect(screen.getByText('子代理')).toBeTruthy()
  })

  it('keeps the report the generic tool row used to expand', () => {
    render(<SubagentRow
      callId="call-1"
      block={settled({ description: '区块链周期阶段分析', prompt: brief }, '当前处于扩张期。')}
      sessionId={SESSION}
    />)
    expect(screen.queryByText('当前处于扩张期。')).toBeNull()
    fireEvent.click(screen.getByRole('button', { expanded: false }))
    expect(screen.getByText('当前处于扩张期。')).toBeTruthy()
    expect(screen.getByText('交办内容')).toBeTruthy()
  })

  it('offers the trajectory only when the owner supplies one', () => {
    const inspect = vi.fn()
    render(<SubagentRow
      callId="call-1"
      block={settled({ description: 'x', prompt: brief }, '好了')}
      sessionId={SESSION}
      inspect={inspect}
    />)
    fireEvent.click(screen.getByRole('button', { expanded: false }))
    fireEvent.click(screen.getByText('查看轨迹'))
    expect(inspect).toHaveBeenCalledOnce()
  })
})
