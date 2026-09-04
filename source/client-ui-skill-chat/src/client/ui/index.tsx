import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import css from './ui.module.css'

const AVATAR_PALETTES = [
  ['#fff1e8', '#f07f62', '#7b3e31'], ['#e9f8ef', '#55b783', '#245b40'], ['#eef1ff', '#7d82d8', '#3f4278'],
  ['#fff5d9', '#dfaa3f', '#76530f'], ['#e7f5fb', '#51a7c8', '#245e73'], ['#faeaf3', '#d779aa', '#713652'],
] as const

function classes(...values: readonly (string | undefined | false)[]): string {
  return values.filter(Boolean).join(' ')
}

function hashOf(value: string): number {
  let hash = 0
  for (const char of value) hash = ((hash * 31) + (char.codePointAt(0) ?? 0)) >>> 0
  return hash
}

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  readonly as?: 'div' | 'aside' | 'section'
  readonly level?: 'base' | 'raised' | 'sunken'
  readonly className?: string | undefined
}

export function Surface({ as: Tag = 'div', level = 'base', className, ...props }: SurfaceProps): React.JSX.Element {
  return <Tag {...props} className={classes(css.surface, className)} data-level={level}/>
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: 'default' | 'primary' | 'ghost' | 'danger'
  readonly size?: 'small' | 'medium' | 'large'
}

export function Button({ variant = 'default', size = 'medium', className, type = 'button', ...props }: ButtonProps): React.JSX.Element {
  return <button {...props} type={type} className={classes(css.button, className)} data-variant={variant} data-size={size}/>
}

export function IconButton({ variant = 'default', size = 'medium', className, type = 'button', ...props }: ButtonProps): React.JSX.Element {
  return <button {...props} type={type} className={classes(css.iconButton, className)} data-variant={variant} data-size={size}/>
}

export interface AvatarProps {
  readonly avatarId: string
  readonly label: string
  readonly size?: number
  readonly className?: string | undefined
}

export function Avatar({ avatarId, label, size = 42, className }: AvatarProps): React.JSX.Element {
  const animal = avatarId.split('-')[0] ?? 'fox'
  const palette = AVATAR_PALETTES[hashOf(avatarId) % AVATAR_PALETTES.length] ?? AVATAR_PALETTES[0]
  const ears = animal === 'rabbit' || animal === 'deer'
  const round = animal === 'bear' || animal === 'panda' || animal === 'mouse'
  return <span className={classes(css.avatar, className)} title={label} style={{ '--avatar-size': `${size}px`, '--avatar-bg': palette[0], '--avatar-main': palette[1], '--avatar-ink': palette[2] } as CSSProperties}>
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {ears ? <><ellipse cx="15" cy="9" rx="6" ry="11"/><ellipse cx="33" cy="9" rx="6" ry="11"/></> : <><circle cx="13" cy="13" r={round ? 8 : 7}/><circle cx="35" cy="13" r={round ? 8 : 7}/></>}
      <circle className={css.avatarFace} cx="24" cy="26" r="18"/>
      {animal === 'panda' ? <><ellipse className={css.avatarPatch} cx="17" cy="24" rx="5" ry="6"/><ellipse className={css.avatarPatch} cx="31" cy="24" rx="5" ry="6"/></> : null}
      <circle className={css.avatarEye} cx="17" cy="25" r="2"/><circle className={css.avatarEye} cx="31" cy="25" r="2"/>
      <path className={css.avatarMuzzle} d="M20 32 Q24 36 28 32"/>
      <circle className={css.avatarNose} cx="24" cy="30" r="2.4"/>
    </svg>
  </span>
}

export function AvatarStack({ children, className, overlap = 9 }: {
  readonly children: ReactNode
  readonly className?: string | undefined
  readonly overlap?: number
}): React.JSX.Element {
  const style = { '--avatar-stack-overlap': `${overlap}px` } as CSSProperties
  return <span className={classes(css.avatarStack, className)} style={style}>{children}</span>
}

interface OverlayProps {
  readonly children: ReactNode
  readonly className?: string | undefined
  readonly label: string
  readonly onClose: () => void
}

export function Dialog({ children, className, label, onClose }: OverlayProps): React.JSX.Element {
  return <div className={css.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <Surface as="section" level="raised" className={classes(css.dialog, className)} role="dialog" aria-modal="true" aria-label={label}>
      {children}
    </Surface>
  </div>
}

export function Drawer({ children, className, label, onClose }: OverlayProps): React.JSX.Element {
  return <div className={css.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <Surface as="aside" level="raised" className={classes(css.drawer, className)} role="dialog" aria-modal="true" aria-label={label}>
      {children}
    </Surface>
  </div>
}

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>): React.JSX.Element {
  return <input {...props} className={classes(css.searchInput, props.className)}/>
}

export function EmptyState({ title, children, className }: {
  readonly title: string
  readonly children?: ReactNode
  readonly className?: string | undefined
}): React.JSX.Element {
  return <div className={classes(css.emptyState, className)}>
    <strong>{title}</strong>
    {children === undefined ? null : <p>{children}</p>}
  </div>
}

export function ChatBubble({ role, children, className }: {
  readonly role: 'user' | 'assistant'
  readonly children: ReactNode
  readonly className?: string | undefined
}): React.JSX.Element {
  return <div className={classes(css.chatBubble, className)} data-role={role}>{children}</div>
}

type RoomRowProps = ButtonHTMLAttributes<HTMLButtonElement> & { readonly selected?: boolean }

export function RoomRow({ selected = false, className, ...props }: RoomRowProps): React.JSX.Element {
  return <button {...props} type="button" className={classes(css.roomRow, className)} data-selected={selected || undefined}/>
}

export function WorkbenchPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div {...props} className={classes(css.workbenchPanel, className)}/>
}
