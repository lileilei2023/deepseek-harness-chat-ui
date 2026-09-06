/**
 * Terminal escape-sequence rendering for the workbench terminal.
 *
 * The panel used to put raw output into a `<pre>`, so anything that paints —
 * git, npm, pytest, `ls --color` — printed `ESC[32m` as literal characters.
 * The host solves the same problem in `ui-primitives`, but the client bundle
 * gate forbids reaching into another plugin's source, and only its
 * `TerminalBlock` (one command plus its output, not a live buffer) is on the
 * package's public export. So this is the plugin's own parser: no dependency,
 * and small enough to read in one sitting.
 *
 * The terminal surface is a fixed dark ground in both colour schemes
 * (`--ds-chat-code-bg` is declared once, on `:root`), so the palette below is
 * tuned for that ground rather than swapped per theme. Pure black would
 * disappear into it, which is why colour 0 is a visible grey.
 */

import type { CSSProperties } from 'react'

/** One run of text carrying a single graphic state. */
export interface AnsiSpan {
  /** The run's plain text, free of escape sequences and newlines. */
  readonly text: string
  /** Resolved inline style, or undefined for a run that sets none. */
  readonly style: CSSProperties | undefined
}

/** The spans of one output line, in order. */
export type AnsiLine = readonly AnsiSpan[]

/** The 8 base colours, picked to stay legible on the panel's dark ground. */
const BASE = ['#5c6773', '#f14c4c', '#23d18b', '#e5c07b', '#4fa6ff', '#d670d6', '#29b8db', '#d9e2ea'] as const
/** The 8 bright colours, one step lighter than their base counterpart. */
const BRIGHT = ['#7f8c99', '#ff6a6a', '#4ade80', '#f5d67b', '#6cb6ff', '#e28ce2', '#56d4f0', '#ffffff'] as const
/** The escape byte that opens every sequence. */
const ESC = '\u001b'
/** The bell byte, one of the two terminators an OSC sequence may use. */
const BEL = '\u0007'
/**
 * How far an OSC scan looks for its terminator.
 *
 * Output arrives one polled page at a time, so a sequence can be cut in half at
 * a page edge. Scanning to the end of the text would then hide every remaining
 * line behind an introducer that never closes.
 */
const OSC_MAX = 512
/** The 6 levels each channel takes in the xterm 216-colour cube. */
const CUBE = [0, 95, 135, 175, 215, 255] as const

/** Graphic state carried across escape sequences within one output stream. */
interface Graphics {
  fg: string | undefined
  bg: string | undefined
  bold: boolean
  dim: boolean
  italic: boolean
  underline: boolean
  strike: boolean
  inverse: boolean
}

/**
 * Resolve one xterm 256-colour index.
 * @param index - the palette index, 0-255.
 * @returns a CSS colour, or undefined for an index outside the palette.
 */
function palette256(index: number): string | undefined {
  if (index < 0 || index > 255) return undefined
  if (index < 8) return BASE[index]
  if (index < 16) return BRIGHT[index - 8]
  if (index < 232) {
    const value = index - 16
    const red = CUBE[Math.floor(value / 36) % 6] ?? 0
    const green = CUBE[Math.floor(value / 6) % 6] ?? 0
    const blue = CUBE[value % 6] ?? 0
    return `rgb(${String(red)} ${String(green)} ${String(blue)})`
  }
  const grey = 8 + (index - 232) * 10
  return `rgb(${String(grey)} ${String(grey)} ${String(grey)})`
}

/**
 * Read one extended-colour argument run (`38`/`48`).
 *
 * Both forms are consumed here so the caller keeps a single cursor: `5;n`
 * selects a palette index, `2;r;g;b` a direct colour.
 * @param codes - the full SGR parameter list.
 * @param at - index of the `5` or `2` selector.
 * @returns the resolved colour and how many parameters it consumed.
 */
function extendedColor(codes: readonly number[], at: number): { color: string | undefined; used: number } {
  const selector = codes[at]
  if (selector === 5) return { color: palette256(codes[at + 1] ?? -1), used: 2 }
  if (selector !== 2) return { color: undefined, used: 1 }
  const red = codes[at + 1] ?? 0
  const green = codes[at + 2] ?? 0
  const blue = codes[at + 3] ?? 0
  return { color: `rgb(${String(red)} ${String(green)} ${String(blue)})`, used: 4 }
}

/**
 * Apply one SGR parameter list to the running graphic state.
 * @param state - the state to mutate.
 * @param codes - parameters of a single `ESC [ ... m` sequence.
 */
function applySgr(state: Graphics, codes: readonly number[]): void {
  for (let index = 0; index < codes.length; index += 1) {
    const code = codes[index] ?? 0
    if (code === 0) {
      Object.assign(state, { fg: undefined, bg: undefined, bold: false, dim: false, italic: false, underline: false, strike: false, inverse: false })
    } else if (code === 1) state.bold = true
    else if (code === 2) state.dim = true
    else if (code === 3) state.italic = true
    else if (code === 4) state.underline = true
    else if (code === 7) state.inverse = true
    else if (code === 9) state.strike = true
    else if (code === 22) { state.bold = false; state.dim = false } else if (code === 23) state.italic = false
    else if (code === 24) state.underline = false
    else if (code === 27) state.inverse = false
    else if (code === 29) state.strike = false
    else if (code >= 30 && code <= 37) state.fg = BASE[code - 30]
    else if (code === 38) { const read = extendedColor(codes, index + 1); state.fg = read.color; index += read.used } else if (code === 39) state.fg = undefined
    else if (code >= 40 && code <= 47) state.bg = BASE[code - 40]
    else if (code === 48) { const read = extendedColor(codes, index + 1); state.bg = read.color; index += read.used } else if (code === 49) state.bg = undefined
    else if (code >= 90 && code <= 97) state.fg = BRIGHT[code - 90]
    else if (code >= 100 && code <= 107) state.bg = BRIGHT[code - 100]
  }
}

/**
 * Project the running graphic state onto a style object.
 * @param state - the current graphic state.
 * @returns the style, or undefined when the run needs no wrapper.
 */
function styleOf(state: Graphics): CSSProperties | undefined {
  const style: CSSProperties = {}
  // Inverse swaps the roles rather than picking new colours, so a run that only
  // sets inverse still reads as a highlight against the panel's own ground.
  const foreground = state.inverse ? state.bg ?? 'var(--ds-chat-code-bg)' : state.fg
  const background = state.inverse ? state.fg ?? 'var(--ds-chat-code-fg)' : state.bg
  if (foreground !== undefined) style.color = foreground
  if (background !== undefined) style.background = background
  if (state.bold) style.fontWeight = 600
  if (state.dim) style.opacity = 0.65
  if (state.italic) style.fontStyle = 'italic'
  if (state.underline && state.strike) style.textDecoration = 'underline line-through'
  else if (state.underline) style.textDecoration = 'underline'
  else if (state.strike) style.textDecoration = 'line-through'
  return Object.keys(style).length === 0 ? undefined : style
}

/**
 * Parse terminal output into styled spans grouped by line.
 *
 * Beyond SGR colour this handles the two things that otherwise leak visible
 * junk into the panel: non-SGR control sequences (cursor moves, screen clears,
 * window titles) are dropped rather than printed, and a bare carriage return
 * restarts the current line the way a progress bar expects — without it every
 * `npm install` tick would stack up as its own line.
 * @param text - raw output, escape sequences included.
 * @returns one entry per output line; always at least one.
 */
export function parseAnsiLines(text: string): AnsiLine[] {
  const state: Graphics = { fg: undefined, bg: undefined, bold: false, dim: false, italic: false, underline: false, strike: false, inverse: false }
  const lines: AnsiSpan[][] = [[]]
  let current = lines[0] as AnsiSpan[]
  let pending = ''
  let pendingStyle = styleOf(state)

  /** Close the run collected so far, keeping empty runs out of the output. */
  const flush = (): void => {
    if (pending === '') return
    current.push({ text: pending, style: pendingStyle })
    pending = ''
  }

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index] as string
    if (char === ESC) {
      const next = text[index + 1]
      if (next === '[') {
        // CSI: parameters, then one final byte that says what it does.
        let cursor = index + 2
        while (cursor < text.length && /[0-9;:?<>=!]/u.test(text[cursor] as string)) cursor += 1
        const final = text[cursor]
        if (final === 'm') {
          flush()
          const params = text.slice(index + 2, cursor)
          applySgr(state, params === '' ? [0] : params.split(';').map(part => part === '' ? 0 : Number.parseInt(part, 10) || 0))
          pendingStyle = styleOf(state)
        }
        index = cursor
        continue
      }
      if (next === ']') {
        // OSC: a window title or hyperlink, terminated by BEL or ESC \. A real
        // one never spans a line, so a newline ends the search too.
        let cursor = index + 2
        const limit = Math.min(text.length, index + 2 + OSC_MAX)
        while (cursor < limit && text[cursor] !== BEL && text[cursor] !== '\n' && !(text[cursor] === ESC && text[cursor + 1] === '\\')) cursor += 1
        const terminator = text[cursor]
        // No terminator means this was not really an OSC — a page boundary cut
        // it, or the bytes were never a sequence. Consuming to the end of the
        // text would hide every line after it, so only the escape byte is
        // dropped and the rest is printed as the plain text it is.
        if (terminator !== BEL && terminator !== ESC) { index += 1; continue }
        index = terminator === ESC ? cursor + 1 : cursor
        continue
      }
      index += 1
      continue
    }
    if (char === '\n') {
      flush()
      current = []
      lines.push(current)
      continue
    }
    if (char === '\r') {
      // A progress bar rewrites its line in place; keeping the old text would
      // print one line per tick instead of one line that updates.
      flush()
      current.length = 0
      continue
    }
    if (char === '\b') {
      flush()
      const last = current[current.length - 1]
      if (last !== undefined && last.text.length > 0) {
        const trimmed = last.text.slice(0, -1)
        if (trimmed === '') current.pop()
        else current[current.length - 1] = { text: trimmed, style: last.style }
      }
      continue
    }
    // Every other C0 control byte is invisible in a terminal; printing it as a
    // replacement glyph would be noise the shell never intended to show.
    if (char !== '\t' && char < ' ') continue
    pending += char
  }
  flush()
  return lines
}
