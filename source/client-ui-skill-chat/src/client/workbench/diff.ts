/** Turning a unified patch into rows the panel can colour. */
import type { DiffLine } from './types.ts'

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
