/**
 * Locale lookup for components the shell mounts on its own.
 *
 * The sidebar receives `t` as a prop, but the header tools, the composer
 * strip and the workbench are mounted into Host slots of their own and have
 * no such prop. The Host stamps the chosen language on `<html lang>`, so that
 * is what this reads.
 */
import { en, zh, type SkillChatKey } from './locales.ts'

/**
 * Translator for everything outside the browser component.
 *
 * `t` arrives as a prop, which reaches `SkillContactsBrowser` but not the two
 * slot-mounted siblings the Host renders elsewhere, nor the helpers defined at
 * module scope. The Host stamps the chosen locale on `<html lang>`, so reading
 * it there gives the same answer without threading a prop through every one of
 * these call sites.
 * @param key - the message key.
 * @returns the localized string, falling back to Chinese.
 */
export function tr(key: SkillChatKey): string {
  const table = document.documentElement.lang.toLowerCase().startsWith('en') ? en : zh
  return table[key] ?? zh[key]
}

/**
 * Close a popover when the pointer goes down outside it, or on Escape.
 *
 * Three menus — create, workbench, project picker — only closed by clicking
 * their own trigger again, which is not how a popover behaves anywhere else:
 * picking nothing left the panel stuck open over the list. One hook rather than
 * three backdrops, because a backdrop also swallows scrolling and the first
 * click that lands on whatever is underneath.
 * @param open - whether the popover is showing.
 * @param close - called once to dismiss it.
 * @returns ref for the popover's own element, so clicks inside are ignored.
 */
