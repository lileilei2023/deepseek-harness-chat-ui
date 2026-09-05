import { CartoonAvatar } from './avatar.tsx'
import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import css from './ui.module.css'



function classes(...values: readonly (string | undefined | false)[]): string {
  return values.filter(Boolean).join(' ')
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
  /** Extra seed — normally the Skill's id — driving expression and accessory. */
  readonly seed?: string
  readonly size?: number
  readonly className?: string | undefined
}

export function Avatar({ avatarId, label, seed, size = 40, className }: AvatarProps): React.JSX.Element {
  return <CartoonAvatar
    avatarId={avatarId}
    {...seed === undefined ? {} : { seed }}
    size={size}
    title={label}
    className={classes(css.avatar, className)}
  />
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
