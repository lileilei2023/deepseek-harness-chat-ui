// @vitest-environment jsdom
/**
 * Rendering tests for the workbench surfaces. Everything here was previously
 * only reachable by driving a running instance, which is why a regression in
 * any of it would have shown up as "the panel is blank" long after the change
 * that caused it.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import {
  filePreview, ProjectFileView, TerminalPane,
  type ProjectFilePreview, type WorkbenchDrawerProps,
} from '../src/client/SkillContactsBrowser.tsx'

afterEach(cleanup)

/** A text preview of a produced file, with everything the panel needs. */
const previewFile = (over: Partial<ProjectFilePreview> = {}): ProjectFilePreview => ({
  path: '/w/report.md',
  name: 'report.md',
  content: '# 报告\n第一版结论。',
  size: 42,
  language: 'markdown',
  binary: false,
  truncated: false,
  ...over,
})

/** Only the props `filePreview` reads; the rest of the drawer is not involved. */
const previewProps = (over: Partial<WorkbenchDrawerProps> = {}): WorkbenchDrawerProps => ({
  file: previewFile(),
  history: null,
  diff: null,
  renderedFile: false,
  onArtifactDiff: vi.fn(),
  onCloseArtifactDiff: vi.fn(),
  onToggleRendered: vi.fn(),
  onRevealFile: vi.fn(),
  ...over,
} as WorkbenchDrawerProps)

describe('filePreview', () => {
  const versions = [
    { ref: 'bbbbbbb', at: Date.parse('2026-09-06T02:00:00Z'), subject: '第二版' },
    { ref: 'aaaaaaa', at: Date.parse('2026-09-05T02:00:00Z'), subject: '第一版' },
  ]

  it('shows nothing extra when the workspace has no history for the file', () => {
    // A workspace that is not a repository must read as "no history to show",
    // not as a file that was never changed.
    const { container } = render(filePreview(previewProps({ history: { available: false, versions: [], dirty: false } })))
    expect(container.querySelector('[class*="versionBar"]')).toBeNull()
    expect(screen.getByText('report.md')).toBeTruthy()
  })

  it('compares one version against the one before it', () => {
    const onArtifactDiff = vi.fn()
    render(filePreview(previewProps({ history: { available: true, versions, dirty: false }, onArtifactDiff })))

    // Clicking the newest version asks what it changed — so the range runs from
    // its predecessor to it, not from it to nothing.
    fireEvent.click(screen.getByTitle('第二版'))
    expect(onArtifactDiff).toHaveBeenCalledWith('aaaaaaa', 'bbbbbbb')
    // The oldest has no predecessor; comparing it with itself is the honest
    // answer, and yields an empty diff rather than a crash.
    fireEvent.click(screen.getByTitle('第一版'))
    expect(onArtifactDiff).toHaveBeenLastCalledWith('aaaaaaa', 'aaaaaaa')
  })

  it('offers the uncommitted change only while there is one', () => {
    const onArtifactDiff = vi.fn()
    const { rerender } = render(filePreview(previewProps({
      history: { available: true, versions, dirty: true }, onArtifactDiff,
    })))
    fireEvent.click(screen.getByText('未提交的改动'))
    // Against the newest commit, with no second ref: that is the working copy.
    expect(onArtifactDiff).toHaveBeenCalledWith('bbbbbbb')

    rerender(filePreview(previewProps({ history: { available: true, versions, dirty: false } })))
    expect(screen.queryByText('未提交的改动')).toBeNull()
  })

  it('replaces the file with the diff, and comes back', () => {
    const onCloseArtifactDiff = vi.fn()
    render(filePreview(previewProps({
      history: { available: true, versions, dirty: false },
      diff: '--- a/report.md\n+++ b/report.md\n@@ -1 +1 @@\n-第一版结论。\n+第二版结论。',
      onCloseArtifactDiff,
    })))

    // DiffView splits a line into a marker and its text, so this reads the
    // rendered text as a whole rather than looking for one node. The file's own
    // content must be gone: the diff replaces it rather than sitting beside it.
    expect(document.body.textContent).toContain('第二版结论。')
    expect(document.body.textContent).not.toContain('# 报告')
    fireEvent.click(screen.getByText('← 回到文件'))
    expect(onCloseArtifactDiff).toHaveBeenCalledOnce()
  })
})

describe('ProjectFileView', () => {
  const view = (file: ProjectFilePreview): ReturnType<typeof render> =>
    render(<ProjectFileView file={file} rendered={false} onToggle={vi.fn()} onReveal={vi.fn()}/>)

  it('offers to save a complete text file', () => {
    view(previewFile({ name: 'report.html', language: 'html' }))
    expect(screen.getByText('下载')).toBeTruthy()
    expect(screen.getByText('新标签打开')).toBeTruthy()
    expect(screen.getByText('在文件夹中显示')).toBeTruthy()
  })

  it('refuses to save a truncated or binary preview', () => {
    // Saving the visible prefix under the real file's name hands someone a
    // corrupt copy, which is worse than not offering the button.
    view(previewFile({ truncated: true }))
    expect(screen.queryByText('下载')).toBeNull()
    cleanup()
    // A binary preview carries no content at all, which is a different shape
    // from an empty string; `exactOptionalPropertyTypes` is right to insist.
    const { content: _text, ...binary } = previewFile()
    view({ ...binary, binary: true })
    expect(screen.queryByText('下载')).toBeNull()
    // Locating it on disk still works for both.
    expect(screen.getByText('在文件夹中显示')).toBeTruthy()
  })
})

describe('TerminalPane', () => {
  const pane = (over: Partial<Parameters<typeof TerminalPane>[0]> = {}): ReturnType<typeof render> => render(
    <TerminalPane
      terminal={{ terminalId: 't', text: 'ready', status: 'running', truncated: false, busy: false, totalLines: 1, lineBegin: 0, lineEnd: 1 }}
      busy={false}
      error={null}
      command=""
      earlier=""
      hasEarlier={false}
      history={[]}
      onCommand={vi.fn()}
      onSubmit={vi.fn()}
      onInterrupt={vi.fn()}
      onLoadEarlier={vi.fn()}
      {...over}
    />,
  )

  it('shows a stop control only while a command is running', () => {
    pane({ terminal: { terminalId: 't', text: '', status: 'running', truncated: false, busy: true, totalLines: 0, lineBegin: 0, lineEnd: 0 } })
    expect(screen.getByText('停止')).toBeTruthy()
    // An always-on stop button is one mis-click away from killing nothing.
    cleanup()
    pane()
    expect(screen.queryByText('停止')).toBeNull()
    expect(screen.getByText('运行')).toBeTruthy()
  })

  it('walks the command history with the arrow keys', () => {
    const onCommand = vi.fn()
    pane({ history: ['git status', 'pnpm test'], onCommand })
    const input = screen.getByLabelText('终端命令')

    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(onCommand).toHaveBeenLastCalledWith('pnpm test')
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(onCommand).toHaveBeenLastCalledWith('git status')
    // Walking back past the newest clears the line, the way a shell does.
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(onCommand).toHaveBeenLastCalledWith('pnpm test')
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(onCommand).toHaveBeenLastCalledWith('')
  })

  it('interrupts on Ctrl-C', () => {
    const onInterrupt = vi.fn()
    pane({ onInterrupt })
    fireEvent.keyDown(screen.getByLabelText('终端命令'), { key: 'c', ctrlKey: true })
    expect(onInterrupt).toHaveBeenCalledOnce()
  })

  it('offers to load earlier output only when some was dropped', () => {
    const onLoadEarlier = vi.fn()
    pane({ hasEarlier: true, onLoadEarlier })
    fireEvent.click(screen.getByText(/滚出缓冲/u))
    expect(onLoadEarlier).toHaveBeenCalledOnce()
    cleanup()
    pane()
    expect(screen.queryByText(/滚出缓冲/u)).toBeNull()
  })

  it('renders colour rather than escape sequences', () => {
    const { container } = pane({
      terminal: {
        terminalId: 't', text: '\u001b[32mpass\u001b[0m plain', status: 'running',
        truncated: false, busy: false, totalLines: 1, lineBegin: 0, lineEnd: 1,
      },
    })
    expect(container.textContent).toContain('pass plain')
    expect(container.textContent).not.toContain('[32m')
    expect(container.querySelector('span[style*="rgb(35, 209, 139)"], span[style*="#23d18b"]')).toBeTruthy()
  })
})
