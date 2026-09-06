/**
 * The workbench: the drawer beside a room that holds its members, its
 * deliverables, the project tree, a terminal, a diff and a browser.
 *
 * It reads props and renders. Nothing here touches the sidebar's state, which
 * is why it could leave `SkillContactsBrowser.tsx` whole — that file had grown
 * to hold five unrelated surfaces at once.
 */
/* oxlint-disable @stylistic/max-len, @stylistic/arrow-parens, @stylistic/indent */
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  IconBranchOutline16,
  IconCodeOutline16,
  IconFolderOpenOutline16,
  IconGlobeOutline14,
  IconNewChatOutline16,
  MarkdownText,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { parseAnsiLines, type AnsiLine } from '../ansi.ts'
import { fileSize, roomTime } from '../format.ts'
import { tr } from '../i18n.ts'
import { Avatar, Drawer, EmptyState, IconButton, WorkbenchPanel } from '../ui/index.tsx'
import type {
  ProjectEntry, ProjectFilePreview, RoomArtifact, TerminalPaneProps, WorkbenchDrawerProps,
} from './types.ts'
import { parseDiff } from './diff.ts'
import css from '../SkillContactsBrowser.module.css'

export type { WorkbenchDrawerProps, TerminalPaneProps } from './types.ts'

/**
 * Render terminal scrollback with its colour intact.
 *
 * Output went into a `<pre>` verbatim before this, so anything that paints —
 * git, npm, pytest, `ls --color` — printed `\u001b[32m` as literal characters.
 * `parseAnsiLines` resolves the escape runs into spans whose colours are theme
 * tokens, so the same buffer reads correctly under either scheme.
 * @param text - raw output, escape sequences included.
 * @returns one span-styled row per output line.
 */
export function TerminalOutput({ text }: { readonly text: string }): React.JSX.Element {
  const lines = useMemo<readonly AnsiLine[]>(() => parseAnsiLines(text), [text])
  return <>{lines.map((line, index) => <span className={css.terminalLine} key={index}>
    {line.length === 0
      ? '\u00a0'
      : line.map((span, spanIndex) => span.style === undefined
        ? span.text
        : <span key={spanIndex} style={span.style}>{span.text}</span>)}
  </span>)}</>
}

export function TerminalPane(props: TerminalPaneProps): React.JSX.Element {
  const scroller = useRef<HTMLPreElement | null>(null)
  const follow = useRef(true)
  const [cursor, setCursor] = useState<number | null>(null)
  const text = props.terminal === null ? '' : `${props.earlier}${props.terminal.text}`

  useEffect(() => {
    const element = scroller.current
    if (element === null || !follow.current) return
    element.scrollTop = element.scrollHeight
  }, [text])

  /** Remember whether the reader is parked at the tail, so polling can respect it. */
  const onScroll = (): void => {
    const element = scroller.current
    if (element === null) return
    follow.current = element.scrollHeight - element.scrollTop - element.clientHeight < 24
  }

  /** Walk the local command history, the way a shell's own up-arrow does. */
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'c' && event.ctrlKey) { event.preventDefault(); props.onInterrupt(); return }
    if (props.history.length === 0) return
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const next = cursor === null ? props.history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      props.onCommand(props.history[next] ?? '')
      return
    }
    if (event.key !== 'ArrowDown' || cursor === null) return
    event.preventDefault()
    const next = cursor + 1
    if (next >= props.history.length) { setCursor(null); props.onCommand(''); return }
    setCursor(next)
    props.onCommand(props.history[next] ?? '')
  }

  const running = props.terminal?.busy === true
  return <>
    {props.hasEarlier
      ? <button className={css.terminalEarlier} type="button" onClick={props.onLoadEarlier}>{tr('terminalTruncated')}</button>
      : null}
    <pre className={css.terminalOutput} ref={scroller} onScroll={onScroll} aria-live="polite" aria-atomic="false">
      {props.error !== null
        ? props.error
        : props.terminal === null
          ? (props.busy ? tr('startingTerminal') : tr('terminalIdle'))
          : <TerminalOutput text={text}/>}
    </pre>
    <form className={css.terminalComposer} onSubmit={event => { event.preventDefault(); setCursor(null); props.onSubmit() }}>
      <span>$</span>
      <input
        value={props.command}
        onChange={event => { props.onCommand(event.target.value) }}
        onKeyDown={onKeyDown}
        placeholder={tr('terminalPlaceholder')}
        aria-label={tr('terminalCommandLabel')}
        autoComplete="off"
        spellCheck={false}
        autoFocus
      />
      {/* A stop control only while there is something to stop: an always-on
        * button next to Run is one mis-click away from killing nothing. */}
      {running
        ? <button className={css.terminalStop} type="button" onClick={props.onInterrupt} title="Ctrl-C">{tr('terminalStop')}</button>
        : null}
      <button type="submit" disabled={running || props.terminal === null}>{running ? tr('terminalRunning') : tr('runLabel')}</button>
    </form>
  </>
}

export function DiffView({ text }: { readonly text: string }): React.JSX.Element {
  const lines = useMemo(() => parseDiff(text), [text])
  const changes = lines.filter(line => line.kind === 'add' || line.kind === 'remove').length
  const patched = lines.some(line => line.kind === 'file' || line.kind === 'hunk')
  if (text.includes('__DSCHAT_NO_REPO__')) {
    return <EmptyState className={css.drawerEmpty} title="这个项目不在 Git 仓库里">{tr('diffNeedsGit')}</EmptyState>
  }
  // Without a patch there is nothing to colour, and dumping the raw preamble —
  // a prompt echo, or git's own usage text — is worse than saying so plainly.
  if (!patched) return <EmptyState className={css.drawerEmpty} title="没有未提交的改动">{tr('emptyWorkspace')}</EmptyState>
  return <div className={css.diffView}>
    <div className={css.diffSummary}>{changes} 行改动</div>
    <div className={css.diffBody}>
      {lines.map((line, index) => <div className={css.diffLine} data-kind={line.kind} key={index}>
        <span className={css.diffGutter}>{line.kind === 'add' ? '+' : line.kind === 'remove' ? '−' : ''}</span>
        <span className={css.diffText}>{line.text || '\u00a0'}</span>
      </div>)}
    </div>
  </div>
}

/** Human-readable byte size for a directory listing. */
/**
 * Whether a previewed file is worth rendering rather than reading.
 *
 * Only self-contained HTML: it is what these Skills hand back as a report, and
 * it carries its own styles and scripts, so there is nothing to resolve. A page
 * that pulled in siblings would render broken, because `srcdoc` has no base URL
 * to resolve them against.
 * @param file - the previewed file.
 * @returns true when a rendered view is offered.
 */
export function isRenderable(file: ProjectFilePreview): boolean {
  return !file.binary && !file.truncated && /\.(html?|md|markdown)$/i.test(file.name)
}

/** Whether the rendered view for this file is Markdown rather than an HTML frame. */
export function isMarkdownFile(file: ProjectFilePreview): boolean {
  return /\.(md|markdown)$/i.test(file.name)
}

/**
 * Chrome for the Markdown renderer. Defined once at module scope because the
 * component discards its render cache when this object's identity changes.
 */
const MARKDOWN_LABELS = {
  code: { copyLabel: '复制', copiedLabel: '已复制' },
  footnotes: '脚注',
}

export function isDeliverable(name: string): boolean {
  return /\.(md|markdown|html?|pdf|docx?|pptx?|xlsx?|csv|txt)$/i.test(name)
}

/**
 * MIME type for a preview, so a saved or reopened file behaves like itself.
 * @param file - the previewed file.
 * @returns a content type for the Blob.
 */
export function fileMediaType(file: ProjectFilePreview): string {
  const extension = file.name.toLocaleLowerCase().split('.').pop() ?? ''
  if (extension === 'html' || extension === 'htm') return 'text/html;charset=utf-8'
  if (extension === 'svg') return 'image/svg+xml;charset=utf-8'
  if (extension === 'json') return 'application/json;charset=utf-8'
  if (extension === 'csv') return 'text/csv;charset=utf-8'
  return 'text/plain;charset=utf-8'
}

/**
 * Hand the previewed file to the browser, to save or to open on its own.
 *
 * A workspace file has no HTTP address and `file://` is blocked from this
 * origin, so a Blob of the content already read is the route out. That is also
 * why a truncated or binary preview offers neither: saving the visible prefix
 * under the real file's name would hand someone a corrupt copy.
 * @param file - the previewed file.
 * @param mode - save it, or open it in a new tab.
 */
export function takeFileAway(file: ProjectFilePreview, mode: 'download' | 'open'): void {
  const url = URL.createObjectURL(new Blob([file.content ?? ''], { type: fileMediaType(file) }))
  try {
    if (mode === 'open') {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    link.rel = 'noopener'
    document.body.append(link)
    link.click()
    link.remove()
  } finally {
    // The tab keeps its own reference once it has loaded, and the download has
    // already started; holding the object alive past that only leaks it.
    setTimeout(() => { URL.revokeObjectURL(url) }, 60_000)
  }
}

export function ProjectFileView(
  { file, rendered, onToggle, onReveal }: {
    readonly file: ProjectFilePreview
    readonly rendered: boolean
    readonly onToggle: () => void
    readonly onReveal: (path: string) => void
  },
): React.JSX.Element {
  // A prefix saved under the real file's name is worse than no download.
  const complete = !file.binary && !file.truncated
  return <>
    <div className={css.filePreviewMeta}>
      <strong>{file.name}</strong>
      <small>{file.language} · {fileSize(file.size)}{file.truncated ? tr('truncated') : ''}</small>
      <span className={css.previewActions}>
        {isRenderable(file) ? <button className={css.previewToggle} type="button" onClick={onToggle}>{rendered ? tr('viewSource') : tr('viewRendered')}</button> : null}
        {complete ? <button className={css.previewToggle} type="button" onClick={() => { takeFileAway(file, 'download') }}>{tr('downloadFile')}</button> : null}
        {complete && isRenderable(file) ? <button className={css.previewToggle} type="button" onClick={() => { takeFileAway(file, 'open') }}>{tr('openInTab')}</button> : null}
        <button className={css.previewToggle} type="button" onClick={() => { onReveal(file.path) }}>{tr('revealFile')}</button>
      </span>
    </div>
    {file.binary
      ? <div className={css.drawerEmpty}>{tr('binaryFile')}</div>
      : rendered && isMarkdownFile(file)
        // Most of what a room hands back is Markdown, and it was printed as
        // numbered source. The shell's own renderer draws it, so a report reads
        // here the way it reads in the transcript.
        ? <div className={css.filePreviewMarkdown}><MarkdownText text={file.content ?? ''} labels={MARKDOWN_LABELS}/></div>
        : rendered
          // Self-contained HTML is the other deliverable. `srcdoc` renders it
          // from the content already read, so no route has to serve the
          // workspace over HTTP — and `file://` in an iframe would be blocked
          // from this origin anyway. The sandbox withholds same-origin, so the
          // report cannot reach this page or its data.
          ? <iframe className={css.filePreviewFrame} title={file.name} srcDoc={file.content ?? ''} sandbox="allow-scripts allow-popups"/>
          : <div className={css.filePreviewBody}>{(file.content ?? '').split('\n').map((line, index) => <div className={css.codeLine} key={index}><span className={css.codeLineNo}>{index + 1}</span><span className={css.codeLineText}>{line || '\u00a0'}</span></div>)}</div>}
  </>
}

/**
 * The previewed file, with whatever history the workspace can show for it.
 *
 * Both the deliverables pane and the files pane render this: a report you are
 * reading has the same question either way — what did the last pass change.
 * @param props - the drawer's props.
 * @returns the version bar and either the file or a diff.
 */
export function filePreview(props: WorkbenchDrawerProps): React.JSX.Element | null {
  if (props.file === null) return null
  const history = props.history
  return <>
    {history === null || !history.available || history.versions.length === 0
      ? null
      : <div className={css.versionBar}>
        <span>{tr('versions')}</span>
        {history.dirty
          ? <button type="button" onClick={() => { props.onArtifactDiff(history.versions[0]?.ref ?? '') }}>{tr('uncommittedChange')}</button>
          : null}
        {history.versions.slice(0, 8).map((version, index) => <button
          type="button"
          key={version.ref}
          title={version.subject}
          onClick={() => { props.onArtifactDiff(history.versions[index + 1]?.ref ?? version.ref, version.ref) }}
        >{roomTime(version.at)}</button>)}
      </div>}
    {props.diff === null
      ? <ProjectFileView file={props.file} rendered={props.renderedFile} onToggle={props.onToggleRendered} onReveal={props.onRevealFile}/>
      : <div className={css.versionDiff}>
        <button className={css.versionBack} type="button" onClick={props.onCloseArtifactDiff}>{tr('backToFile')}</button>
        {props.diff === '' ? <div className={css.status}>{tr('loading')}</div> : <DiffView text={props.diff}/>}
      </div>}
  </>
}

export function WorkbenchDrawer(props: WorkbenchDrawerProps): React.JSX.Element {
  const title = props.tool === 'members'
    ? tr('membersPanel')
    : props.tool === 'files'
      ? tr('projectFiles')
      : props.tool === 'terminal' ? tr('terminalLabel') : props.tool === 'diff' ? tr('viewDiff') : tr('browserLabel')
  return <Drawer className={css.workbenchDrawer} label={title} onClose={props.onClose}>
    <WorkbenchPanel>
      <header className={css.workbenchHeader}>
        <span className={css.projectPanelIcon}>{props.tool === 'members' ? <IconNewChatOutline16/> : props.tool === 'files' ? <IconFolderOpenOutline16/> : props.tool === 'terminal' ? <IconCodeOutline16/> : props.tool === 'diff' ? <IconBranchOutline16/> : <IconGlobeOutline14/>}</span>
        <span><strong>{title}</strong><small>{props.workspaceTitle}</small></span>
        <IconButton className={css.close} variant="ghost" aria-label="关闭" onClick={props.onClose}>×</IconButton>
      </header>
      {/* What this room produced, rather than everything the project holds. The
        * files pane beside it still answers "what is in here"; this one answers
        * "where is the thing the team just made", which is the question people
        * actually arrive with. */}
      {props.tool === 'members' ? <div className={css.membersPanel} role="list" aria-label={tr('membersPanel')}>
        {/* Broadcast, the way a group chat's `@everyone` works. It writes the
          * instruction rather than a bare mention because the coordinator has
          * to be told what "everyone" means: one answer each, in parallel,
          * without it summarising them into a single voice. */}
        {props.members.length < 2 ? null : <button className={css.broadcastRow} type="button" onClick={props.onBroadcast}>
          <span>@{tr('everyone')}</span>
          <small>{tr('everyoneHint')}</small>
        </button>}
        {props.members.length === 0
          ? <div className={css.drawerEmpty}>{tr('noMembers')}</div>
          : props.members.map(member => <div className={css.memberRow} role="listitem" data-working={member.working || undefined} key={member.key}>
            <span className={css.workingAvatar}>
              <Avatar avatarId={member.avatarId} label={member.name} seed={member.key} size={32}/>
              {member.working ? <i className={css.workingDot}/> : null}
            </span>
            <span className={css.memberRowCopy}>
              <strong>{member.name}{member.key === props.coordinatorKey ? <em>{tr('memberCoordinator')}</em> : null}</strong>
              <small>{member.working ? member.doing ?? tr('memberWorking') : tr('memberIdle')}</small>
            </span>
            <button type="button" aria-label={`@ ${member.name}`} onClick={() => { props.onMentionMember(member.name) }}>@</button>
          </div>)}
        {props.unattributedWork === 0
          ? null
          : <div className={css.artifactCaption}>{tr('otherWork')} · {props.unattributedWork}</div>}
      </div> : null}
      {props.tool === 'artifacts' ? <div className={css.fileWorkbench}>
        <div className={css.fileBrowser}>
          <div className={css.projectFileList}>
            {props.artifactsBusy && props.artifacts.length === 0
              ? <div className={css.status}>{tr('loading')}</div>
              : props.artifacts.length === 0
                ? <div className={css.drawerEmpty}>{tr('noArtifacts')}</div>
                : (() => {
                  /* Who made it, and when. A traced file names the member; a
                   * scanned one can only say the file changed, so it says that
                   * instead of inventing an author. */
                  const row = (item: RoomArtifact): React.JSX.Element => {
                    const origin = props.onArtifactOrigin(item)
                    return <button
                      className={css.artifactRow}
                      type="button"
                      data-selected={props.file?.path === item.path || undefined}
                      key={item.path}
                      onClick={() => { props.onPreviewFile(item.path) }}
                    >
                      <IconCodeOutline16/>
                      <span>
                        <b>{item.name}</b>
                        <small>{origin ?? tr('artifactChanged')} · {roomTime(item.producedAt ?? item.modifiedAt)}</small>
                      </span>
                    </button>
                  }
                  const rest = props.artifacts.filter(item => !isDeliverable(item.name))
                  return <>
                    {props.artifactsTraced ? null : <div className={css.artifactCaption}>{tr('artifactsUntraced')}</div>}
                    {props.artifacts.filter(item => isDeliverable(item.name)).map(row)}
                    {rest.length === 0 ? null : <>
                      <button className={css.artifactMore} type="button" onClick={props.onToggleArtifactRest}>
                        {props.artifactRestOpen ? '▾' : '▸'} {tr('otherFiles')} · {rest.length}
                      </button>
                      {props.artifactRestOpen ? rest.map(row) : null}
                    </>}
                  </>
                })()}
          </div>
        </div>
        <div className={css.filePreview}>
          {props.file === null
            ? <div className={css.drawerEmpty}>{tr('pickArtifactHint')}</div>
            : filePreview(props)}
        </div>
      </div> : null}
      {props.tool === 'files' ? <div className={css.fileWorkbench}>
        <div className={css.fileBrowser}>
          <nav className={css.pathBar} aria-label="路径">{(() => {
            const current = props.listing?.path ?? props.workspacePath
            const relative = current.startsWith(props.workspacePath) ? current.slice(props.workspacePath.length).replace(/^\//u, '') : current
            const parts = relative === '' ? [] : relative.split('/')
            return <>
              <button type="button" onClick={() => { props.onBrowse(undefined) }}>{props.workspaceTitle}</button>
              {parts.map((part, index) => <span key={`${part}-${index}`}>
                <b>/</b>
                <button type="button" onClick={() => { props.onBrowse(`${props.workspacePath}/${parts.slice(0, index + 1).join('/')}`) }}>{part}</button>
              </span>)}
            </>
          })()}</nav>
          <div className={css.fileFilter}>
            <input
              value={props.fileQuery}
              onChange={(event) => { props.onFileQuery(event.target.value) }}
              placeholder={tr('filterFiles')}
              aria-label={tr('filterFiles')}
              autoComplete="off"
              spellCheck={false}
              type="search"
            />
          </div>
          <div className={css.projectFileList}>
            {props.fileQuery.trim() !== ''
              ? (props.fileHits.length === 0
                ? <div className={css.status}>{tr('searchingFiles')}</div>
                : props.fileHits.map(hit => <button
                  type="button"
                  key={hit.path}
                  data-selected={props.file?.path === hit.path || undefined}
                  onClick={() => { props.onPreviewFile(hit.path) }}
                  onContextMenu={(event) => { event.preventDefault(); props.onFileMenu({ path: hit.path, name: hit.name, kind: 'file', x: event.clientX, y: event.clientY }) }}
                ><IconCodeOutline16/><span>{hit.name}</span>{hit.line === undefined ? null : <small>{hit.line}</small>}</button>))
              :
            props.error !== null ? <div className={css.status}>{props.error}</div> : props.listing === null ? <div className={css.status}>{tr('readingDir')}</div> : <>
              {props.listing.parent === undefined ? null : <button type="button" onClick={() => { props.onBrowse(props.listing?.parent) }}><IconFolderOpenOutline16/><span>{tr('backParent')}</span></button>}
              {(function renderEntries(entries: readonly ProjectEntry[], depth: number): React.JSX.Element[] {
                return entries.filter(entry => !entry.hidden).toSorted((left, right) => left.kind === right.kind ? left.name.localeCompare(right.name) : left.kind === 'directory' ? -1 : 1).flatMap((entry) => {
                  const open = props.expandedDirs.includes(entry.path)
                  const row = <button
                    type="button"
                    data-selected={props.file?.path === entry.path || undefined}
                    style={{ paddingLeft: `${8 + depth * 12}px` }}
                    key={entry.path}
                    onClick={() => { if (entry.kind === 'directory') props.onToggleDirectory(entry.path); else props.onPreviewFile(entry.path) }}
                    onContextMenu={(event) => { event.preventDefault(); props.onFileMenu({ path: entry.path, name: entry.name, kind: entry.kind, x: event.clientX, y: event.clientY }) }}
                  >{entry.kind === 'directory' ? <span className={css.treeCaret}>{open ? '\u25be' : '\u25b8'}</span> : <IconCodeOutline16/>}<span>{entry.name}</span></button>
                  const children = entry.kind === 'directory' && open ? props.dirListings[entry.path] : undefined
                  return children === undefined ? [row] : [row, ...renderEntries(children, depth + 1)]
                })
              })(props.listing.entries, 0)}
            </>
            }
          </div>
        </div>
        <div className={css.filePreview}>
          {/* Open files stay open. Reading a report and the one it argues with
            * used to mean losing the first. */}
          {props.openFiles.length <= 1 ? null : <div className={css.fileTabs}>
            {props.openFiles.map(item => <button
              type="button"
              data-active={props.file?.path === item.path || undefined}
              key={item.path}
              onClick={() => { props.onPreviewFile(item.path) }}
            >{item.name}<b onClick={(event) => { event.stopPropagation(); props.onCloseFile(item.path) }}>×</b></button>)}
          </div>}
          {props.file === null ? <div className={css.drawerEmpty}>{tr('pickFileHint')}</div> : filePreview(props)}
        </div>
      </div> : null}
      {props.tool === 'diff' ? <div className={css.diffWorkbench}>
        {props.error !== null ? <div className={css.status}>{props.error}</div>
          : props.terminalBusy && props.terminal === null ? <div className={css.status}>{tr('readingDiff')}</div>
          : <DiffView text={props.terminal?.text ?? ''}/>}
      </div> : null}
      {props.tool === 'terminal' ? <div className={css.terminalWorkbench}>
        {/* Several shells, the way any terminal panel has them; switching back
          * replays what a shell printed while it was off screen. */}
        <div className={css.terminalTabs}>
          {props.terminals.map(item => <button
            type="button"
            data-active={props.activeTerminalId === item.id || undefined}
            key={item.id}
            onClick={() => { props.onSelectTerminal(item.id) }}
          >{item.label}<b onClick={(event) => { event.stopPropagation(); props.onCloseTerminal(item.id) }}>×</b></button>)}
          <button className={css.terminalAdd} type="button" aria-label={tr('newTerminal')} onClick={props.onAddTerminal}>＋</button>
        </div>
        <TerminalPane
          terminal={props.terminal}
          busy={props.terminalBusy}
          error={props.error}
          command={props.terminalCommand}
          earlier={props.terminalEarlier}
          hasEarlier={props.terminalHasEarlier}
          history={props.terminalHistory}
          onCommand={props.onTerminalCommand}
          onSubmit={props.onTerminalSubmit}
          onInterrupt={props.onTerminalInterrupt}
          onLoadEarlier={props.onTerminalLoadEarlier}
        />
      </div> : null}
      {props.tool === 'browser' ? <div className={css.browserWorkbench}>
        <form className={css.browserBar} onSubmit={event => { event.preventDefault(); props.onBrowserNavigate(props.browserDraft) }}>
          <button type="button" disabled={!props.canGoBack} onClick={props.onBrowserBack}>←</button>
          <button type="button" disabled={!props.canGoForward} onClick={props.onBrowserForward}>→</button>
          <button type="button" onClick={props.onBrowserRefresh}>↻</button>
          <input
            value={props.browserDraft}
            onChange={event => { props.onBrowserDraft(event.target.value) }}
            placeholder={tr('browserPlaceholder')}
            aria-label={tr('browserAddress')}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit">{tr('openLabel')}</button>
        </form>
        {props.browserUrl === ''
          ? <div className={css.drawerEmpty}>{tr('browserEmpty')}</div>
          : <iframe key={props.browserKey} className={css.browserFrame} src={props.browserUrl} title={tr('browserFrameTitle')} sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"/>}
        {props.browserUrl === ''
          ? null
          : <div className={css.workbenchFootnote}>{tr('embedBlocked')}<a href={props.browserUrl} target="_blank" rel="noreferrer">{props.browserUrl}</a></div>}
      </div> : null}
    </WorkbenchPanel>
  </Drawer>
}
