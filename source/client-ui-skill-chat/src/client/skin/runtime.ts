import { BUILTIN_SKINS } from './builtins.ts'
import { validateSkinPackage, type DSChatSkinPackage, type SkinDiagnostic } from './manifest.ts'

export const SKIN_PREFERENCE_KEY = 'dsh.skill-chat.skin.v1'
const DEFAULT_SKIN_ID = 'ds-chat-mint'
const STYLE_ID = 'dsh-skill-chat-skin'

export interface SkinSnapshot {
  readonly activeId: string
  readonly previewId?: string
  readonly skins: readonly DSChatSkinPackage[]
  readonly diagnostics: readonly SkinDiagnostic[]
  readonly revision: number
}

export interface SkinRuntime {
  readonly getSnapshot: () => SkinSnapshot
  readonly subscribe: (listener: () => void) => () => void
  readonly apply: (id: string) => void
  readonly preview: (id: string | undefined) => void
  readonly reset: () => void
  readonly dispose: () => void
}

function storedPreference(): string {
  try { return localStorage.getItem(SKIN_PREFERENCE_KEY) ?? DEFAULT_SKIN_ID } catch { return DEFAULT_SKIN_ID }
}

function writePreference(id: string): void {
  try { localStorage.setItem(SKIN_PREFERENCE_KEY, id) } catch {}
}

export function createSkinRuntime(packages: readonly unknown[] = BUILTIN_SKINS): SkinRuntime {
  const diagnostics: SkinDiagnostic[] = []
  const skins: DSChatSkinPackage[] = []
  for (const candidate of packages) {
    const result = validateSkinPackage(candidate)
    if (result.ok) skins.push(result.value)
    else diagnostics.push(result.diagnostic)
  }
  skins.sort((left, right) => (left.manifest.order ?? 0) - (right.manifest.order ?? 0))
  const fallback = skins.find(skin => skin.manifest.id === DEFAULT_SKIN_ID) ?? skins[0]
  if (fallback === undefined) throw new Error('DS Chat requires at least one valid skin')
  const saved = storedPreference()
  let activeId = skins.some(skin => skin.manifest.id === saved) ? saved : fallback.manifest.id
  let previewId: string | undefined
  let revision = 0
  let snapshot: SkinSnapshot
  const listeners = new Set<() => void>()

  const publish = (): void => {
    revision += 1
    snapshot = Object.freeze({
      activeId,
      ...(previewId === undefined ? {} : { previewId }),
      skins: Object.freeze([...skins]),
      diagnostics: Object.freeze([...diagnostics]),
      revision,
    })
    for (const listener of listeners) listener()
  }
  const render = (): void => {
    if (typeof document === 'undefined') return
    const selected = skins.find(skin => skin.manifest.id === (previewId ?? activeId)) ?? fallback
    document.documentElement.dataset.dshSkin = selected.manifest.id
    let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null
    if (style === null) {
      style = document.createElement('style')
      style.id = STYLE_ID
      document.head.append(style)
    }
    style.textContent = [selected.css, selected.patches ?? ''].filter(Boolean).join('\n')
  }
  const update = (): void => { render(); publish() }
  snapshot = Object.freeze({ activeId, skins: Object.freeze([...skins]), diagnostics: Object.freeze([...diagnostics]), revision })
  render()

  return {
    getSnapshot: () => snapshot,
    subscribe: (listener) => { listeners.add(listener); return () => { listeners.delete(listener) } },
    apply: (id) => {
      if (!skins.some(skin => skin.manifest.id === id)) throw new Error(`Unknown DS Chat skin: ${id}`)
      activeId = id
      previewId = undefined
      writePreference(id)
      update()
    },
    preview: (id) => {
      if (id !== undefined && !skins.some(skin => skin.manifest.id === id)) throw new Error(`Unknown DS Chat skin: ${id}`)
      previewId = id
      update()
    },
    reset: () => {
      activeId = fallback.manifest.id
      previewId = undefined
      writePreference(activeId)
      update()
    },
    dispose: () => {
      if (typeof document !== 'undefined') {
        document.getElementById(STYLE_ID)?.remove()
        delete document.documentElement.dataset.dshSkin
      }
      listeners.clear()
    },
  }
}
