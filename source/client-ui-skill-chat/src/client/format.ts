/** Value formatting shared by the sidebar and the workbench. */
export function roomTime(value: number): string {
  const then = new Date(value)
  const now = new Date()
  const sameDay = then.toDateString() === now.toDateString()
  if (sameDay) return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(then)
  if (now.getTime() - value < 6 * 24 * 60 * 60 * 1000) {
    return new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(then)
  }
  return new Intl.DateTimeFormat(undefined, { month: 'numeric', day: 'numeric' }).format(then)
}
export function hashOf(value: string): number {
  let hash = 0
  for (const char of value) hash = ((hash * 31) + (char.codePointAt(0) ?? 0)) >>> 0
  return hash
}
export function fileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/**
 * One previewed file, in whichever form reads best.
 *
 * Shared by the artifacts and files panes so the two cannot drift into
 * different ideas of what opening a file means.
 * @param props - the file, and the rendered/source toggle.
 * @returns the preview body.
 */
/**
 * Whether a produced file is something a person reads.
 *
 * "Everything modified since the room started" catches the reports and also
 * every intermediate a member's script wrote — two hundred `circle_*.json`
 * ahead of the one report someone wants. A deliverable is a document, so
 * documents lead and the rest is collapsed behind a count rather than dropped:
 * the data is often worth reaching, just never worth ranking first.
 * @param name - the file's name.
 * @returns true for readable document types.
 */
