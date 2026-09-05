import { useState, useSyncExternalStore } from 'react'
import { Button, Dialog, IconButton, Surface } from '../ui/index.tsx'
import type { DSChatSidebarSlotOwner } from '../shell/slots.ts'
import type { SkinRuntime } from './runtime.ts'
import css from './SkinCenter.module.css'

export interface SkinCenterInjected { readonly skinRuntime: SkinRuntime }

export function SkinCenter({ skinRuntime }: SkinCenterInjected & DSChatSidebarSlotOwner): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const snapshot = useSyncExternalStore(skinRuntime.subscribe, skinRuntime.getSnapshot, skinRuntime.getSnapshot)
  const close = (): void => { skinRuntime.preview(undefined); setOpen(false) }
  return <>
    <Button className={css.trigger} variant="ghost" size="small" onClick={() => { setOpen(true) }}>◐ 外观与皮肤</Button>
    {open ? <Dialog label="DS Chat 皮肤中心" onClose={close} className={css.panel}>
      <header className={css.header}><span><strong>皮肤中心</strong><small>兼容 dsh-web Skin Manifest v2；皮肤只改变视觉，不接触 Room、Persona 或自动化逻辑。</small></span><IconButton variant="ghost" aria-label="关闭" onClick={close}>×</IconButton></header>
      <div className={css.grid}>{snapshot.skins.map(skin => <button className={css.card} data-active={snapshot.activeId === skin.manifest.id || undefined} type="button" key={skin.manifest.id} onMouseEnter={() => { skinRuntime.preview(skin.manifest.id) }} onMouseLeave={() => { skinRuntime.preview(undefined) }} onFocus={() => { skinRuntime.preview(skin.manifest.id) }} onBlur={() => { skinRuntime.preview(undefined) }} onClick={() => { skinRuntime.apply(skin.manifest.id) }} style={{
          '--skin-accent': skin.manifest.accent,
          // The manifest's optional preview ground, so an always-dark skin does
          // not advertise itself on whatever ground happens to be active.
          ...(skin.manifest.preview?.light === undefined ? {} : { '--skin-ground': skin.manifest.preview.light }),
        } as React.CSSProperties}>
        <Surface level="sunken" className={css.preview} data-grounded={skin.manifest.preview?.light === undefined ? undefined : true}><aside/><main><i/><i/><i/></main></Surface>
        <span className={css.copy}><strong>{skin.manifest.name}</strong><small>{skin.manifest.tagline}</small></span>
      </button>)}</div>
      <footer className={css.footer}><span className={css.diagnostic}>{snapshot.diagnostics.length === 0 ? 'Manifest 校验通过 · L1/L2 安全模式' : `${snapshot.diagnostics.length} 个无效皮肤已隔离`}</span><Button onClick={() => { skinRuntime.reset() }}>恢复默认</Button></footer>
    </Dialog> : null}
  </>
}
