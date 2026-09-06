/**
 * The row a delegated member gets in the transcript.
 *
 * A group whose coordinator fans work out to three members showed three
 * identical grey lines reading `工具调用 · subagent · <task>`. Everything that
 * made the room a room — who these people are, what each of them looks like —
 * stopped at the roster panel, and the part a person actually watches went back
 * to being a tool log. This gives the delegation the member's own face and
 * name, which is the whole premise of the product applied to the one place it
 * was missing.
 *
 * Registered on `tool.call.toolview` under the `subagent` key. That key has no
 * shipped occupant, so this is additive: no other tool's rendering changes, and
 * nothing shipped is shadowed. The cost is that this row owns the whole
 * presentation for `subagent` calls, including the expandable report the
 * generic row used to provide — so it provides one.
 */
import { useState } from 'react'
import type { ToolCallBlock } from '@deepseek-ai/dsh-client-ui-chat/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type {} from '@deepseek-ai/dsh-client-ui-tool/client'
import { Avatar } from './ui/index.tsx'
import { memberForSubagent, useHeaderBridge } from './SkillContactsBrowser.tsx'
import { tr } from './i18n.ts'
import css from './SkillContactsBrowser.module.css'

/** The two `subagent` arguments this row displays. */
export interface SubagentArgs {
  /** The model's own 3-to-5-word label for the delegated task. */
  readonly description: string
  /** The standalone prompt handed to the child. */
  readonly prompt: string
}

/**
 * Read the call's arguments.
 * @param raw - the recorded JSON argument string.
 * @returns the description and prompt, each empty when absent or unparsable.
 */
export function subagentArgs(raw: string): SubagentArgs {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    // A rejected or truncated call keeps its args verbatim, which need not be
    // JSON. The row still has a status and a body to show.
    return { description: '', prompt: '' }
  }
  if (typeof parsed !== 'object' || parsed === null) return { description: '', prompt: '' }
  const record = parsed as Record<string, unknown>
  return {
    description: typeof record.description === 'string' ? record.description : '',
    prompt: typeof record.prompt === 'string' ? record.prompt : '',
  }
}

/** How far into the prompt the member's name is looked for. */
const OPENING = 400

/**
 * Which member this child was started for.
 *
 * The group prompt tells the coordinator to open every child's prompt with
 * 「先加载 <成员名> 这个 Skill」, so that sentence is the signal. The display
 * description is not: it names the task in three to five words and, as the
 * screenshots of a real run show, usually never mentions the member at all.
 *
 * Only the prompt's opening is searched. A long brief routinely names other
 * members in passing — "把结果发给 X" — and matching on the whole text would
 * hand the row to whoever was mentioned rather than to whoever is working.
 * @param args - the recorded description and prompt.
 * @param members - the room's members, keyed by Skill name.
 * @returns the matched member key, or undefined when nothing named one.
 */
export function subagentMember(
  args: SubagentArgs,
  members: readonly { readonly key: string; readonly name: string }[],
): string | undefined {
  const opening = args.prompt.slice(0, OPENING)
  const named = /(?:加载|load)\s*[「『"'@]?\s*([^\s「」『』"'，,。.]+)/u.exec(opening)?.[1]
  if (named !== undefined) {
    const direct = memberForSubagent(named, members)
    if (direct !== undefined) return direct
  }
  return memberForSubagent(`${args.description}\n${opening}`, members)
}

/**
 * The child's returned report.
 * @param block - the running or settled call.
 * @returns the joined text blocks, or an empty string while it is still running.
 */
export function subagentReport(block: ToolCallBlock): string {
  if (!('kind' in block)) return ''
  return block.content
    .flatMap(entry => entry.type === 'text' ? [entry.text] : [])
    .join('\n')
    .trim()
}

type Verdict = 'running' | 'done' | 'failed'

/**
 * How the call ended.
 * @param block - the running or settled call.
 * @returns the row's state.
 */
export function subagentVerdict(block: ToolCallBlock): Verdict {
  if (!('kind' in block)) return 'running'
  return block.isError ? 'failed' : 'done'
}

const VERDICT_KEY = {
  running: 'subagentRunning',
  done: 'subagentDone',
  failed: 'subagentFailed',
} as const

/** What the owner hands every atomic tool view, narrowed to what this row reads. */
export interface SubagentRowProps {
  readonly callId: string
  readonly block: ToolCallBlock
  readonly sessionId: SessionId
  readonly inspect?: (() => void) | undefined
}

/**
 * Render one delegated member's turn.
 * @param props - the owner's call payload and the session it belongs to.
 * @returns the member row.
 */
export function SubagentRow({ block, sessionId, inspect }: SubagentRowProps): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const bridge = useHeaderBridge()
  const args = subagentArgs('kind' in block ? block.call?.argsRaw ?? '' : block.argsRaw)
  const verdict = subagentVerdict(block)
  const report = subagentReport(block)
  // Only this session's roster. The bridge publishes whichever room is on
  // screen, and attributing one room's child to another room's member would be
  // a confident lie rather than a missing face.
  const roster = bridge !== null && bridge.sessionId === sessionId ? bridge.memberActivity : []
  const key = subagentMember(args, roster)
  const member = roster.find(candidate => candidate.key === key)
  const task = args.description === '' ? tr('subagentTask') : args.description
  return <div className={css.subagentRow} data-state={verdict}>
    <button
      type="button"
      className={css.subagentHead}
      aria-expanded={open}
      onClick={() => { setOpen(current => !current) }}
    >
      <span className={css.subagentFace}>
        {member === undefined
          // No matched member: a portrait here would invent one. The neutral
          // mark says "a delegated child" and stops there.
          ? <span className={css.subagentAnon} aria-hidden="true">✦</span>
          : <Avatar avatarId={member.avatarId} label={member.name} seed={member.key} size={30}/>}
        {verdict === 'running' ? <i className={css.subagentPulse}/> : null}
      </span>
      <span className={css.subagentCopy}>
        <b>{member?.name ?? tr('subagentAnon')}</b>
        <small>{task}</small>
      </span>
      <span className={css.subagentState}>{tr(VERDICT_KEY[verdict])}</span>
    </button>
    {open
      ? <div className={css.subagentBody}>
        {report === '' ? <p className={css.subagentEmpty}>{tr('subagentNoReport')}</p> : <pre>{report}</pre>}
        <div className={css.subagentBodyActions}>
          {args.prompt === '' ? null : <details><summary>{tr('subagentBrief')}</summary><pre>{args.prompt}</pre></details>}
          {inspect === undefined
            ? null
            : <button type="button" onClick={() => { inspect() }}>{tr('subagentInspect')}</button>}
        </div>
      </div>
      : null}
  </div>
}
