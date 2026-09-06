#!/usr/bin/env node

/**
 * Capture the README screenshots from a running DS Chat instance.
 *
 * Drives headless Chrome over the DevTools protocol directly. Node 22 has a
 * global WebSocket, so this needs no browser-automation dependency added to a
 * plugin that would otherwise not have one — and what it captures is what the
 * browser actually painted, not a mock.
 *
 * Point it at a demo instance with its own `DSH_HOME`, never at your working
 * one: these images end up in the repository, and a real instance has your real
 * conversations in it.
 *
 *   export DSH_HOME=/tmp/dschat-demo
 *   dsh plugin --profile web add "$(pwd)"
 *   dsh web --port 7811 --no-open
 *   node scripts/shoot.mjs 'http://127.0.0.1:7811/?token=…' docs/images
 *
 * `--no-open` matters: without it `dsh web` opens your real browser, and that
 * tab's stale localStorage can overwrite the instance's state.
 */

import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const [url, outDir] = process.argv.slice(2)
if (url === undefined || outDir === undefined) throw new Error('usage: shoot.mjs <url> <out-dir>')
mkdirSync(outDir, { recursive: true })

const PORT = 9222
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const WIDTH = 1440
const HEIGHT = 900

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--window-size=${WIDTH},${HEIGHT}`,
  '--hide-scrollbars',
  // Retina, so the images stay sharp when GitHub scales them down.
  '--force-device-scale-factor=2',
  '--no-first-run',
  '--no-default-browser-check',
  `--user-data-dir=${resolve(outDir, '.chrome-profile')}`,
  'about:blank',
], { stdio: 'ignore' })

const sleep = ms => new Promise(done => setTimeout(done, ms))

/** Wait for the DevTools endpoint to answer. */
async function endpoint() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      if (response.ok) return await response.json()
    } catch {
      // Chrome is still starting; the loop is the wait.
    }
    await sleep(250)
  }
  throw new Error('Chrome DevTools endpoint never came up')
}

await endpoint()
const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' })).json()

const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((done, fail) => { socket.onopen = done; socket.onerror = fail })

let nextId = 0
const pending = new Map()
socket.onmessage = (event) => {
  const message = JSON.parse(event.data)
  const entry = pending.get(message.id)
  if (entry === undefined) return
  pending.delete(message.id)
  if (message.error !== undefined) entry.fail(new Error(JSON.stringify(message.error)))
  else entry.done(message.result)
}

function send(method, params = {}) {
  const id = (nextId += 1)
  return new Promise((done, fail) => {
    pending.set(id, { done, fail })
    socket.send(JSON.stringify({ id, method, params }))
  })
}

/** Run an async expression in the page and return its JSON value. */
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', {
    expression: `(async () => { ${expression} })()`,
    awaitPromise: true,
    returnByValue: true,
  })
  if (result.exceptionDetails !== undefined) {
    throw new Error(result.exceptionDetails.exception?.description ?? 'evaluate failed')
  }
  return result.result.value
}

async function shoot(name) {
  const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  writeFileSync(resolve(outDir, `${name}.png`), Buffer.from(data, 'base64'))
  console.log(`captured ${name}.png`)
}

await send('Page.enable')
await send('Runtime.enable')
await send('Page.navigate', { url })
await sleep(9000)

const ROOT = "document.querySelector('[data-skill-chat-root]')"

// A first run shows the model-key prompt, and the sidebar starts collapsed in a
// fresh profile. Neither belongs in a screenshot.
await evaluate(`
  [...document.querySelectorAll('button')].find(b => /稍后配置|Later/.test(b.textContent))?.click();
  await new Promise(r => setTimeout(r, 900));
  [...document.querySelectorAll('button')].find(b => (b.getAttribute('aria-label') || '') === '打开侧边栏')?.click();
  await new Promise(r => setTimeout(r, 1500));
`)

/** Open the busiest group, which is what the room list should be showing. */
const openGroup = `
  const root = ${ROOT};
  const rows = [...root.querySelectorAll('[class*="roomRow"] button, button[class*="roomRow"]')];
  const target = rows.find(r => /小组|、/.test(r.textContent)) ?? rows[0];
  if (target) target.click();
  await new Promise(r => setTimeout(r, 3500));
`

// --- main: the room list beside an open room --------------------------------
await evaluate(openGroup)
await shoot('deepseek-harness-chat-ui-main')

// --- members: who is in the room and what they are doing --------------------
await evaluate(`
  const root = ${ROOT};
  [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '工作台')?.click();
  await new Promise(r => setTimeout(r, 800));
  [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '成员')?.click();
  await new Promise(r => setTimeout(r, 1800));
`)
await shoot('deepseek-harness-chat-ui-members')

// --- groups: the new-group dialog, mid-selection ----------------------------
await evaluate(`
  const root = ${ROOT};
  [...document.querySelectorAll('[class*="workbenchDrawer"] button')].find(b => b.textContent.trim() === '×')?.click();
  await new Promise(r => setTimeout(r, 700));
  [...root.querySelectorAll('button')].find(b => b.textContent.trim() === '＋')?.click();
  await new Promise(r => setTimeout(r, 700));
  [...document.querySelectorAll('button')].find(b => /群聊/.test(b.textContent) && b.querySelector('strong'))?.click();
  await new Promise(r => setTimeout(r, 3200));
  const dlg = document.querySelector('[class*="groupDialog"]');
  const nameInput = dlg?.querySelector('input:not([type=search])');
  if (nameInput) {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(nameInput, '产品设计小组');
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
  }
  await new Promise(r => setTimeout(r, 600));
  for (const row of [...(dlg?.querySelectorAll('[class*="pickRow"]') ?? [])].slice(0, 3)) {
    row.click();
    await new Promise(r => setTimeout(r, 250));
  }
  await new Promise(r => setTimeout(r, 600));
`)
await shoot('deepseek-harness-chat-ui-groups')

// --- automations: templates, and the runs that already happened -------------
await evaluate(`
  const dlg = document.querySelector('[class*="groupDialog"]');
  [...(dlg?.querySelectorAll('button') ?? [])].find(b => b.textContent.trim() === '取消')?.click();
  await new Promise(r => setTimeout(r, 900));
  const root = ${ROOT};
  [...root.querySelectorAll('button')].find(b => b.className.includes('automationEntry'))?.click();
  await new Promise(r => setTimeout(r, 1600));
`)
await shoot('deepseek-harness-chat-ui-automations')

// --- themes: the skin centre ------------------------------------------------
await evaluate(`
  const root = ${ROOT};
  [...root.querySelectorAll('[role="tab"]')].find(t => /消息|Chats/.test(t.textContent))?.click();
  await new Promise(r => setTimeout(r, 600));
  [...root.querySelectorAll('button')].find(b => /外观与皮肤/.test(b.textContent))?.click();
  await new Promise(r => setTimeout(r, 1600));
`)
await shoot('deepseek-harness-chat-ui-themes')

// --- dark: the same room under the shell's own dark theme -------------------
// Through the shell's setting, not by stamping the attribute: the plugin's
// tokens follow the Host's palette, and only the setting moves both.
await evaluate(`
  document.querySelector('[class*="backdrop"], [class*="menuBackdrop"]')?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '×')?.click();
  await new Promise(r => setTimeout(r, 700));
  [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '设置')?.click();
  await new Promise(r => setTimeout(r, 2000));
  [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '深色')?.click();
  await new Promise(r => setTimeout(r, 1200));
  [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '关闭')?.click();
  await new Promise(r => setTimeout(r, 1500));
`)
await evaluate(openGroup)
await shoot('deepseek-harness-chat-ui-dark')

socket.close()
chrome.kill()
console.log('done')
