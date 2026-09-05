/**
 * Cartoon avatar generator.
 *
 * The previous avatar drew one face — a circle, two dot eyes, one curved
 * muzzle — and varied only the ears (three silhouettes) across six palettes,
 * so a directory of several hundred Skills resolved to 24 pictures repeated
 * over and over. Identity is this product's whole premise, so the avatar has
 * to carry it.
 *
 * Everything is derived from a seed string, so an avatar is stable for a
 * Skill without being stored, and nothing is fetched: the artwork is inline
 * SVG built from four independent layers.
 *
 * - `species` — 24 genuinely different silhouettes (ear shape, head outline,
 *   markings, muzzle). This is the layer read first at 30px.
 * - `palette` — 16 coat/ink pairs.
 * - `face` — 6 eye styles × 5 mouths, so two Skills sharing a species and a
 *   palette still differ.
 * - `accessory` — 8 slots including none.
 *
 * A user picks `species-palette` (384 combinations in the library); the face
 * and accessory come from the Skill's own id, so the picker stays browsable
 * while the population stays varied.
 */

import type { CSSProperties } from 'react'

/** Coat, main and ink. Ordered so neighbouring entries are not near-duplicates. */
export const AVATAR_PALETTES = [
  ['#fff1e8', '#f07f62', '#7b3e31'], ['#e9f8ef', '#55b783', '#245b40'],
  ['#eef1ff', '#7d82d8', '#3f4278'], ['#fff5d9', '#dfaa3f', '#76530f'],
  ['#e7f5fb', '#51a7c8', '#245e73'], ['#faeaf3', '#d779aa', '#713652'],
  ['#ecfbf7', '#3fb8a6', '#175c53'], ['#fdeee6', '#e0894a', '#7a4318'],
  ['#f2edfd', '#9c7ae0', '#4a3178'], ['#e8f4e6', '#79ae5c', '#37552a'],
  ['#fdecec', '#e0655f', '#7a2c28'], ['#e9eff5', '#6f89a8', '#31445a'],
  ['#fff8e1', '#c9a227', '#6b5410'], ['#efe9e3', '#a2846b', '#4f3c2d'],
  ['#e6f7ff', '#4f9ae8', '#1f4d80'], ['#f7ecff', '#b96fd4', '#5f2d70'],
] as const

/** Silhouettes, ordered so the library reads as a varied grid rather than a gradient. */
export const AVATAR_SPECIES = [
  'fox', 'cat', 'bear', 'rabbit', 'owl', 'panda', 'otter', 'deer',
  'seal', 'dog', 'mouse', 'tiger', 'frog', 'penguin', 'koala', 'hamster',
  'wolf', 'pig', 'sheep', 'monkey', 'chick', 'bat', 'raccoon', 'axolotl',
] as const

export type AvatarSpecies = typeof AVATAR_SPECIES[number]

/** Every pickable identity: one entry per species and palette pair. */
export const AVATAR_LIBRARY: readonly string[] = AVATAR_SPECIES.flatMap(
  species => AVATAR_PALETTES.map((_, index) => `${species}-${index}`),
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

/** Pull an independent small integer out of one seed. */
function pick(seed: number, slot: number, size: number): number {
  return (Math.imul(seed ^ Math.imul(slot + 1, 2654435761), 2246822519) >>> 8) % size
}

/**
 * Resolve an avatar id into the species and palette it names. Ids are written
 * `species-palette`; anything unrecognised falls back to a hash of the id so a
 * legacy or hand-typed value still draws something stable.
 * @param avatarId - the stored identity.
 * @returns species name and palette index.
 */
function resolve(avatarId: string): { species: AvatarSpecies, palette: number } {
  const [head, tail] = avatarId.split('-')
  const named = AVATAR_SPECIES.find(item => item === head)
  const index = Number.parseInt(tail ?? '', 10)
  const seed = seedOf(avatarId)
  return {
    species: named ?? AVATAR_SPECIES[seed % AVATAR_SPECIES.length] ?? 'fox',
    palette: Number.isNaN(index)
      ? seed % AVATAR_PALETTES.length
      : Math.abs(index) % AVATAR_PALETTES.length,
  }
}

/* -------------------------------------------------------------------------
 * Layer 1: silhouette. Drawn behind the face so ears read as ears.
 * `main` fills, `ink` details. Coordinates target a 48×48 viewBox with the
 * face centred at (24, 26) with radius 18.
 * ---------------------------------------------------------------------- */


/**
 * Head geometry per species. A single circle for everyone was the main reason
 * the old set read as one face: the silhouette is what the eye resolves first
 * at 30px, so it has to differ before the ears do.
 */
const HEADS: Partial<Record<AvatarSpecies, { rx: number, ry: number, cy: number }>> = {
  fox: { rx: 17, ry: 16, cy: 26 },
  wolf: { rx: 16.5, ry: 17, cy: 26 },
  cat: { rx: 17, ry: 15.5, cy: 27 },
  bear: { rx: 18, ry: 17, cy: 27 },
  panda: { rx: 18, ry: 17, cy: 27 },
  rabbit: { rx: 15, ry: 16, cy: 28 },
  owl: { rx: 18, ry: 16, cy: 26 },
  otter: { rx: 17, ry: 15, cy: 28 },
  deer: { rx: 14.5, ry: 17, cy: 28 },
  seal: { rx: 16, ry: 17, cy: 27 },
  dog: { rx: 16, ry: 16.5, cy: 27 },
  mouse: { rx: 14.5, ry: 14.5, cy: 29 },
  tiger: { rx: 18, ry: 16.5, cy: 27 },
  frog: { rx: 19, ry: 14, cy: 30 },
  penguin: { rx: 15, ry: 17.5, cy: 27 },
  koala: { rx: 16, ry: 15, cy: 28 },
  hamster: { rx: 17.5, ry: 15, cy: 28 },
  pig: { rx: 18, ry: 15.5, cy: 27 },
  sheep: { rx: 14.5, ry: 15, cy: 29 },
  monkey: { rx: 16, ry: 16, cy: 27 },
  chick: { rx: 16, ry: 15, cy: 28 },
  bat: { rx: 16.5, ry: 14.5, cy: 28 },
  raccoon: { rx: 17.5, ry: 15.5, cy: 27 },
  axolotl: { rx: 17, ry: 15, cy: 28 },
}

function EarLayer({ species }: { readonly species: AvatarSpecies }): React.JSX.Element | null {
  switch (species) {
    case 'fox':
    case 'wolf':
      return <><path d="M8 18 L12 2 L23 12 Z"/><path d="M40 18 L36 2 L25 12 Z"/></>
    case 'cat':
      return <><path d="M10 17 L11 4 L23 13 Z"/><path d="M38 17 L37 4 L25 13 Z"/></>
    case 'bear':
    case 'panda':
      return <><circle cx="11" cy="12" r="8"/><circle cx="37" cy="12" r="8"/></>
    case 'rabbit':
      return <><ellipse cx="16" cy="7" rx="5" ry="12"/><ellipse cx="32" cy="7" rx="5" ry="12"/></>
    case 'owl':
      return <><path d="M9 14 L14 4 L21 11 Z"/><path d="M39 14 L34 4 L27 11 Z"/></>
    case 'otter':
    case 'hamster':
      return <><circle cx="12" cy="15" r="6"/><circle cx="36" cy="15" r="6"/></>
    case 'deer':
      return <>
        <path d="M15 12 L12 2 M12 6 L7 3 M33 12 L36 2 M36 6 L41 3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
        <ellipse cx="11" cy="17" rx="4" ry="6"/><ellipse cx="37" cy="17" rx="4" ry="6"/>
      </>
    case 'dog':
      return <><ellipse cx="9" cy="24" rx="6" ry="11"/><ellipse cx="39" cy="24" rx="6" ry="11"/></>
    case 'mouse':
      return <><circle cx="11" cy="14" r="10"/><circle cx="37" cy="14" r="10"/></>
    case 'tiger':
      return <><circle cx="12" cy="13" r="7"/><circle cx="36" cy="13" r="7"/></>
    case 'koala':
      return <>
        <circle cx="9" cy="19" r="10"/><circle cx="39" cy="19" r="10"/>
        <circle className="avatarInner" cx="9" cy="19" r="6"/><circle className="avatarInner" cx="39" cy="19" r="6"/>
      </>
    case 'pig':
      return <><path d="M11 20 L10 8 L22 14 Z"/><path d="M37 20 L38 8 L26 14 Z"/></>
    case 'sheep':
      return <>
        <circle cx="13" cy="12" r="7"/><circle cx="35" cy="12" r="7"/><circle cx="24" cy="8" r="8"/>
        <ellipse cx="8" cy="21" rx="4" ry="6"/><ellipse cx="40" cy="21" rx="4" ry="6"/>
      </>
    case 'monkey':
      return <><circle cx="8" cy="26" r="7"/><circle cx="40" cy="26" r="7"/></>
    case 'bat':
      return <><path d="M6 16 L10 1 L24 13 Z"/><path d="M42 16 L38 1 L24 13 Z"/></>
    case 'raccoon':
      return <><path d="M10 16 L13 4 L23 12 Z"/><path d="M38 16 L35 4 L25 12 Z"/></>
    case 'chick':
      return <><path d="M22 9 L24 1 L27 9 Z"/></>
    case 'frog':
      return <><circle cx="14" cy="12" r="8"/><circle cx="34" cy="12" r="8"/></>
    case 'seal':
    case 'penguin':
    case 'axolotl':
      return null
    default:
      return null
  }
}

/** Markings that sit on top of the face and define the species as much as the ears do. */
function MarkLayer({ species }: { readonly species: AvatarSpecies }): React.JSX.Element | null {
  switch (species) {
    case 'panda':
      return <><ellipse className="avatarPatch" cx="17" cy="24" rx="5.4" ry="6.4"/><ellipse className="avatarPatch" cx="31" cy="24" rx="5.4" ry="6.4"/></>
    case 'raccoon':
      return <path className="avatarPatch" d="M10 24 Q24 18 38 24 Q34 31 24 30 Q14 31 10 24 Z"/>
    case 'tiger':
      return <path className="avatarInk" d="M18 13 L16 18 M24 12 L24 17 M30 13 L32 18" strokeWidth="2.2" strokeLinecap="round" fill="none" stroke="currentColor"/>
    case 'penguin':
      return <ellipse className="avatarPatch" cx="24" cy="29" rx="12" ry="13"/>
    case 'owl':
      return <><circle className="avatarPatch" cx="17" cy="25" r="7"/><circle className="avatarPatch" cx="31" cy="25" r="7"/></>
    case 'dog':
      return <ellipse className="avatarPatch" cx="24" cy="33" rx="9" ry="7"/>
    case 'cat':
      return <path className="avatarInk" d="M4 27 L13 28 M4 32 L13 31 M44 27 L35 28 M44 32 L35 31" strokeWidth="1.6" strokeLinecap="round" fill="none" stroke="currentColor"/>
    case 'axolotl':
      return <>
        <path d="M6 20 L1 14 M6 26 L0 26 M42 20 L47 14 M42 26 L48 26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
        <circle className="avatarPatch" cx="15" cy="32" r="3"/><circle className="avatarPatch" cx="33" cy="32" r="3"/>
      </>
    case 'sheep':
      return <ellipse className="avatarPatch" cx="24" cy="31" rx="10" ry="8"/>
    case 'monkey':
      return <ellipse className="avatarPatch" cx="24" cy="30" rx="11" ry="10"/>
    case 'hamster':
      return <><circle className="avatarPatch" cx="12" cy="31" r="5"/><circle className="avatarPatch" cx="36" cy="31" r="5"/></>
    case 'frog':
      return <path className="avatarInk" d="M14 33 Q24 40 34 33" strokeWidth="2.2" strokeLinecap="round" fill="none" stroke="currentColor"/>
    default:
      return null
  }
}

/* -------------------------------------------------------------------------
 * Layer 3: face. Eyes and mouth vary per Skill so a shared species+palette
 * still reads as two different characters.
 * ---------------------------------------------------------------------- */

const EYE_Y = 25

function Eyes({ variant, species }: { readonly variant: number, readonly species: AvatarSpecies }): React.JSX.Element {
  // Frogs and owls carry their eyes high and wide; everyone else shares a pair.
  const y = species === 'frog' ? 13 : EYE_Y
  const [left, right] = species === 'frog' ? [14, 34] : [17, 31]
  switch (variant) {
    case 0:
      return <><circle className="avatarEye" cx={left} cy={y} r="2.4"/><circle className="avatarEye" cx={right} cy={y} r="2.4"/></>
    case 1: // happy arcs
      return <path className="avatarEye" d={`M${left - 3} ${y + 1} Q${left} ${y - 3} ${left + 3} ${y + 1} M${right - 3} ${y + 1} Q${right} ${y - 3} ${right + 3} ${y + 1}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    case 2: // wink
      return <><circle className="avatarEye" cx={left} cy={y} r="2.4"/><path className="avatarEye" d={`M${right - 3} ${y} Q${right} ${y - 3} ${right + 3} ${y}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
    case 3: // wide, with a highlight
      return <>
        <circle className="avatarEye" cx={left} cy={y} r="3.2"/><circle className="avatarEye" cx={right} cy={y} r="3.2"/>
        <circle className="avatarGlint" cx={left + 1.2} cy={y - 1.2} r="1"/><circle className="avatarGlint" cx={right + 1.2} cy={y - 1.2} r="1"/>
      </>
    case 4: // sleepy lines
      return <path className="avatarEye" d={`M${left - 3} ${y} L${left + 3} ${y} M${right - 3} ${y} L${right + 3} ${y}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    default: // sparkle
      return <>
        <circle className="avatarEye" cx={left} cy={y} r="2.6"/><circle className="avatarEye" cx={right} cy={y} r="2.6"/>
        <path className="avatarGlint" d={`M${left + 2} ${y - 3} l1 1 -1 1 -1 -1 z M${right + 2} ${y - 3} l1 1 -1 1 -1 -1 z`}/>
      </>
  }
}

function Mouth({ variant, species }: { readonly variant: number, readonly species: AvatarSpecies }): React.JSX.Element | null {
  const beak = species === 'chick' || species === 'penguin' || species === 'owl'
  if (beak) return <path className="avatarBeak" d="M20 30 L24 36 L28 30 Z"/>
  if (species === 'pig') return <><ellipse className="avatarNose" cx="24" cy="31" rx="6" ry="4.6"/><circle className="avatarInk" cx="22" cy="31" r="1"/><circle className="avatarInk" cx="26" cy="31" r="1"/></>
  const nose = <circle className="avatarNose" cx="24" cy="30" r="2.2"/>
  switch (variant) {
    case 0: return <>{nose}<path className="avatarMuzzle" d="M20 33 Q24 36.5 28 33"/></>
    case 1: return <>{nose}<path className="avatarMuzzle" d="M19 33 Q24 39 29 33"/></>
    case 2: return <>{nose}<path className="avatarMuzzle" d="M21 34 Q24 35.5 27 34"/></>
    case 3: return <>{nose}<ellipse className="avatarInk" cx="24" cy="35" rx="3.4" ry="2.6"/></>
    default: return <>{nose}<path className="avatarMuzzle" d="M24 32 L24 34 M21 35 Q24 37.5 27 35"/></>
  }
}

/* -------------------------------------------------------------------------
 * Layer 4: accessory. Small, high-contrast, and drawn last.
 * ---------------------------------------------------------------------- */

function Accessory({ variant }: { readonly variant: number }): React.JSX.Element | null {
  switch (variant) {
    case 1: // round glasses
      return <g className="avatarGear" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="17" cy="25" r="5"/><circle cx="31" cy="25" r="5"/><path d="M22 25 L26 25"/>
      </g>
    case 2: // headphones
      return <g className="avatarGear">
        <path d="M8 26 A16 16 0 0 1 40 26" fill="none" stroke="currentColor" strokeWidth="2.4"/>
        <rect x="4" y="24" width="7" height="11" rx="3.5"/><rect x="37" y="24" width="7" height="11" rx="3.5"/>
      </g>
    case 3: // scarf
      return <g className="avatarGear"><path d="M9 39 Q24 46 39 39 L39 44 Q24 50 9 44 Z"/></g>
    case 4: // cap
      return <g className="avatarGear"><path d="M7 15 Q24 -1 41 15 L41 18 L7 18 Z"/><rect x="3" y="16" width="20" height="4" rx="2"/></g>
    case 5: // flower
      return <g className="avatarGear">
        <circle cx="38" cy="11" r="2.6"/><circle cx="43" cy="11" r="2.6"/>
        <circle cx="40.5" cy="7" r="2.6"/><circle cx="40.5" cy="15" r="2.6"/>
        <circle className="avatarGlint" cx="40.5" cy="11" r="1.6"/>
      </g>
    case 6: // bow tie
      return <g className="avatarGear"><path d="M17 42 L23 39 L23 45 Z"/><path d="M31 42 L25 39 L25 45 Z"/><rect x="22.4" y="40.4" width="3.2" height="3.2" rx="1"/></g>
    case 7: // antenna
      return <g className="avatarGear"><path d="M24 8 L24 2" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="24" cy="1.6" r="2.4"/></g>
    default:
      return null
  }
}

export interface CartoonAvatarProps {
  /** Stored identity, `species-palette`. */
  readonly avatarId: string
  /** Extra seed — the Skill's own id — driving expression and accessory. */
  readonly seed?: string
  readonly size?: number
  readonly title?: string
  readonly className?: string | undefined
}

/**
 * Draw one avatar.
 * @param props - identity, seed and presentation.
 * @returns the inline SVG portrait.
 */
export function CartoonAvatar({ avatarId, seed, size = 40, title, className }: CartoonAvatarProps): React.JSX.Element {
  const { species, palette } = resolve(avatarId)
  const colors = AVATAR_PALETTES[palette] ?? AVATAR_PALETTES[0]
  const head = HEADS[species] ?? { rx: 17, ry: 16, cy: 27 }
  const faceSeed = seedOf(seed ?? avatarId)
  const eyes = pick(faceSeed, 0, 6)
  const mouth = pick(faceSeed, 1, 5)
  // Two thirds of a population wearing props reads as clutter, so most have none.
  const accessory = pick(faceSeed, 2, 12) < 8 ? 0 : pick(faceSeed, 3, 7) + 1
  const style = {
    '--avatar-size': `${size}px`,
    '--avatar-bg': colors[0],
    '--avatar-main': colors[1],
    '--avatar-ink': colors[2],
  } as CSSProperties
  return <span className={className} title={title} style={style} data-avatar-species={species}>
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <g className="avatarEars"><EarLayer species={species}/></g>
      <ellipse className="avatarFace" cx="24" cy={head.cy} rx={head.rx} ry={head.ry}/>
      <MarkLayer species={species}/>
      <Eyes variant={eyes} species={species}/>
      <Mouth variant={mouth} species={species}/>
      <Accessory variant={accessory}/>
    </svg>
  </span>
}
