/**
 * Skill portraits.
 *
 * These were hand-drawn SVG primitives — circles for heads, triangles for ears
 * — and at 30px in a directory of several hundred Skills they read as the same
 * picture in different colours. Identity is this product's premise, so the
 * artwork now comes from a real illustration set: DiceBear's `micah` style,
 * generated locally from a seed.
 *
 * Two decisions worth keeping:
 *
 * - **`<img>` with a data URI, not inline SVG.** Every DiceBear document
 *   declares `id="viewboxMask"`. Inlining several on one page makes those ids
 *   collide and all but the first render blank — which is exactly what happens
 *   in a 334-row contact list. An `<img>` is its own document, so the ids
 *   cannot clash.
 * - **A deterministic background tint.** Portraits differ by hair, skin and
 *   accessory, which is plenty at 64px and marginal at 30px. The tint carries
 *   the differentiation in a list; the portrait carries the personality.
 *
 * Artwork: Avatar Illustration System by Micah Lanier, CC BY 4.0. The
 * attribution is recorded in the repository README.
 */

import { createAvatar } from '@dicebear/core'
import * as micah from '@dicebear/micah'
import type { CSSProperties } from 'react'

/** Background tints, one per identity, in the plugin's own palette. */
export const AVATAR_BACKGROUNDS = [
  'fff1e8', 'e9f8ef', 'eef1ff', 'fff5d9', 'e7f5fb', 'faeaf3', 'ecfbf7', 'fdeee6',
  'f2edfd', 'e8f4e6', 'fdecec', 'e9eff5', 'fff8e1', 'efe9e3', 'e6f7ff', 'f7ecff',
] as const

/** How many distinct identities the picker offers. */
const LIBRARY_SIZE = 192

/**
 * Every pickable identity. An identity is just a seed: the generator maps it to
 * a portrait, so the library is a list of seeds rather than a list of drawings.
 */
export const AVATAR_LIBRARY: readonly string[] = Array.from(
  { length: LIBRARY_SIZE },
  (_, index) => `p${index + 1}`,
)

/** FNV-style string hash; stable across runs and platforms. */
export function seedOf(value: string): number {
  let hash = 2166136261
  for (const char of value) {
    hash ^= char.codePointAt(0) ?? 0
    hash = Math.imul(hash, 16777619) >>> 0
  }
  return hash
}

/**
 * Generated portraits are pure functions of their inputs and a list re-renders
 * on every keystroke of the search box, so each one is built once and kept.
 */
const cache = new Map<string, string>()
const CACHE_LIMIT = 1024

/**
 * Render one identity to a data URI.
 * @param avatarId - the stored identity, used as the generator's seed.
 * @param size - pixel size the SVG declares.
 * @returns a `data:image/svg+xml` URI.
 */
export function avatarDataUri(avatarId: string, size: number): string {
  const key = `${avatarId}@${size}`
  const hit = cache.get(key)
  if (hit !== undefined) return hit
  const background = AVATAR_BACKGROUNDS[seedOf(avatarId) % AVATAR_BACKGROUNDS.length] ?? 'eef1ff'
  const uri = createAvatar(micah, {
    seed: avatarId,
    size,
    backgroundColor: [background],
    radius: 50,
  }).toDataUri()
  // Bounded so a long session browsing hundreds of Skills at several sizes
  // cannot grow this without limit; identities are cheap to regenerate.
  if (cache.size >= CACHE_LIMIT) cache.clear()
  cache.set(key, uri)
  return uri
}

export interface CartoonAvatarProps {
  /** Stored identity; the generator's seed. */
  readonly avatarId: string
  /**
   * Ignored. Expression and accessory used to be derived separately from the
   * Skill id; the illustration set varies them from the seed itself, so the
   * prop is kept only so call sites need not change.
   */
  readonly seed?: string
  readonly size?: number
  readonly title?: string
  readonly className?: string | undefined
}

/**
 * Draw one portrait.
 * @param props - identity and presentation.
 * @returns the avatar image.
 */
export function CartoonAvatar({ avatarId, size = 40, title, className }: CartoonAvatarProps): React.JSX.Element {
  // Generated at twice the box so the portrait stays crisp on a retina panel.
  const uri = avatarDataUri(avatarId, size * 2)
  const style = { '--avatar-size': `${size}px` } as CSSProperties
  return <span className={className} title={title} style={style} data-avatar>
    <img src={uri} alt="" width={size} height={size} draggable={false}/>
  </span>
}
