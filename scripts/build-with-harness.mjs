#!/usr/bin/env node

import { cpSync, existsSync, readFileSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const harnessRoot = resolve(process.argv[2] ?? process.env.DSH_SOURCE ?? '../deepseek-harness-chat-web')
const harnessManifest = resolve(harnessRoot, 'apps/cli/package.json')

if (!existsSync(harnessManifest)) {
  throw new Error(`DeepSeek Harness checkout not found: ${harnessRoot}`)
}

const harnessVersion = JSON.parse(readFileSync(harnessManifest, 'utf8')).version
if (harnessVersion !== '0.1.2-alpha.5') {
  throw new Error(`Expected DeepSeek Harness 0.1.2-alpha.5, found ${harnessVersion}`)
}

const packages = [
  'client-ui-skill-chat',
  'workbuddy-skill-catalog',
  'skill-chat-web-profile',
]

for (const packageName of packages) {
  const source = resolve(root, 'source', packageName)
  const destination = resolve(harnessRoot, 'packages/experimental', packageName)
  if (!existsSync(source) || !existsSync(destination)) {
    throw new Error(`Missing source or Harness package for ${packageName}`)
  }
  for (const entry of ['src', 'tests']) {
    const from = resolve(source, entry)
    const to = resolve(destination, entry)
    if (!existsSync(from)) continue
    rmSync(to, { recursive: true, force: true })
    cpSync(from, to, { recursive: true })
  }
}

const commands = [
  ['pnpm', ['run', 'build']],
]

const buildEnvironment = {
  ...process.env,
  CI: 'true',
  DSH_LEFTHOOK_ALLOW_HOOKS_PATH_OVERRIDE: '1',
}

for (const [command, args] of commands) {
  const result = spawnSync(command, args, { cwd: harnessRoot, env: buildEnvironment, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

const sync = spawnSync(process.execPath, [resolve(root, 'scripts/sync-from-harness.mjs'), harnessRoot], {
  cwd: root,
  stdio: 'inherit',
})
process.exit(sync.status ?? 1)
