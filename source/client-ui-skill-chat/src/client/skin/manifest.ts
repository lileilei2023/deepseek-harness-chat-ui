export const DSH_SKIN_MANIFEST_VERSION = 2 as const

export interface DSChatSkinPreview {
  readonly light?: string
  readonly dark?: string
}

export interface DSChatSkinManifest {
  readonly $schema?: string
  readonly skinManifestVersion: typeof DSH_SKIN_MANIFEST_VERSION
  readonly id: string
  readonly name: string
  readonly nameEn?: string
  readonly version: string
  readonly author: string
  readonly tagline: string
  readonly description?: string
  readonly tags?: readonly string[]
  readonly accent: string
  readonly order?: number
  readonly preview?: DSChatSkinPreview
  readonly contributes: {
    readonly stylesheet: string
    readonly patches?: string
  }
}

export interface DSChatSkinPackage {
  readonly manifest: DSChatSkinManifest
  readonly css: string
  readonly patches?: string
  readonly source: 'builtin' | 'dsh-web'
}

export interface SkinDiagnostic {
  readonly id: string
  readonly message: string
}

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u
const HEX_PATTERN = /^#[0-9a-f]{6}$/iu

export function validateSkinPackage(value: unknown):
  | { readonly ok: true; readonly value: DSChatSkinPackage }
  | { readonly ok: false; readonly diagnostic: SkinDiagnostic } {
  if (typeof value !== 'object' || value === null) {
    return { ok: false, diagnostic: { id: 'unknown', message: 'Skin package must be an object.' } }
  }
  const skin = value as Record<string, unknown>
  const manifestValue = skin.manifest
  if (typeof manifestValue !== 'object' || manifestValue === null) {
    return { ok: false, diagnostic: { id: 'unknown', message: 'skin.json is missing.' } }
  }
  const manifest = manifestValue as Record<string, unknown>
  const id = typeof manifest.id === 'string' ? manifest.id : 'unknown'
  if (manifest.skinManifestVersion !== DSH_SKIN_MANIFEST_VERSION) {
    return { ok: false, diagnostic: { id, message: 'Only dsh-web Skin Manifest v2 is supported.' } }
  }
  if (!ID_PATTERN.test(id)) return { ok: false, diagnostic: { id, message: 'Skin id must use lowercase kebab-case.' } }
  if (typeof manifest.name !== 'string' || manifest.name.trim() === '') return { ok: false, diagnostic: { id, message: 'Skin name is required.' } }
  if (typeof manifest.version !== 'string' || manifest.version.trim() === '') return { ok: false, diagnostic: { id, message: 'Skin version is required.' } }
  if (typeof manifest.author !== 'string' || manifest.author.trim() === '') return { ok: false, diagnostic: { id, message: 'Skin author is required.' } }
  if (typeof manifest.tagline !== 'string' || manifest.tagline.trim() === '') return { ok: false, diagnostic: { id, message: 'Skin tagline is required.' } }
  if (typeof manifest.accent !== 'string' || !HEX_PATTERN.test(manifest.accent)) {
    return { ok: false, diagnostic: { id, message: 'Skin accent must be a six-digit hex color.' } }
  }
  const contributes = manifest.contributes
  if (typeof contributes !== 'object' || contributes === null || (contributes as Record<string, unknown>).stylesheet !== 'skin.css') {
    return { ok: false, diagnostic: { id, message: 'Skin v2 stylesheet must be skin.css.' } }
  }
  if (typeof skin.css !== 'string' || skin.css.trim() === '') return { ok: false, diagnostic: { id, message: 'Skin stylesheet is empty.' } }
  if (!skin.css.includes(`html[data-dsh-skin="${id}"]`)) return { ok: false, diagnostic: { id, message: `Skin CSS must be scoped to html[data-dsh-skin="${id}"].` } }
  if (/(@import|url\(\s*["']?(?:https?:)?\/\/|url\(\s*["']?\.\.\/)/iu.test(skin.css)) return { ok: false, diagnostic: { id, message: 'Remote imports and escaping asset URLs are not allowed.' } }
  return { ok: true, value: value as DSChatSkinPackage }
}
