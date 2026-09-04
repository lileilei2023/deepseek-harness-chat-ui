#!/usr/bin/env node

/**
 * Rebuild `dist/` from `source/` against a DeepSeek Harness checkout.
 *
 * `build-with-harness.mjs` drives the Harness's own full workspace build and
 * requires the three plugin packages to already exist under
 * `packages/experimental`, which a clean public checkout does not have. This
 * script materialises them (manifest, tsconfig and tsdown config included),
 * registers them in the two tsconfig aggregates so `tsc -b` can see them, and
 * then builds only the two packages whose artifacts `dist/` actually carries.
 *
 * Usage: node scripts/rebuild.mjs [harness-checkout] [--client-only]
 *   harness-checkout defaults to $DSH_SOURCE, then ../deepseek-harness.
 */

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const positional = process.argv.slice(2).filter(argument => !argument.startsWith('--'))
const clientOnly = process.argv.includes('--client-only')
const harnessRoot = resolve(positional[0] ?? process.env.DSH_SOURCE ?? '../deepseek-harness')

const EXPECTED_HARNESS = '0.1.2-alpha.5'
const manifestPath = resolve(harnessRoot, 'apps/cli/package.json')
if (!existsSync(manifestPath)) {
  throw new Error(
    `DeepSeek Harness checkout not found at ${harnessRoot}.\n`
    + `Clone it with: git clone --depth 1 --branch dsh-v${EXPECTED_HARNESS} `
    + 'https://github.com/deepseek-ai/deepseek-harness.git',
  )
}
const harnessVersion = JSON.parse(readFileSync(manifestPath, 'utf8')).version
if (harnessVersion !== EXPECTED_HARNESS) {
  throw new Error(`Expected DeepSeek Harness ${EXPECTED_HARNESS}, found ${harnessVersion}`)
}

/** Package name, and which tsconfig aggregate `tsc -b` must reach it through. */
const PACKAGES = [
  { name: 'client-ui-skill-chat', aggregate: 'tsconfig.client.json' },
  { name: 'workbuddy-skill-catalog', aggregate: 'tsconfig.host.json' },
  { name: 'skill-chat-web-profile', aggregate: 'tsconfig.host.json' },
]

// The whole package is copied, not just `src`: a clean Harness checkout has no
// destination directory at all, so the manifest and build configs have to
// arrive with the sources for pnpm and tsdown to see a workspace package.
for (const { name } of PACKAGES) {
  const from = resolve(root, 'source', name)
  const to = resolve(harnessRoot, 'packages/experimental', name)
  if (!existsSync(from)) throw new Error(`Missing plugin source: ${from}`)
  for (const entry of ['src', 'tests']) {
    rmSync(resolve(to, entry), { recursive: true, force: true })
  }
  mkdirSync(to, { recursive: true })
  cpSync(from, to, { recursive: true })
}

// Project references are how `tsc -b` discovers a package; without them the
// aggregate build silently skips it and tsdown finds no `lib/types` entry.
for (const { name, aggregate } of PACKAGES) {
  const file = resolve(harnessRoot, aggregate)
  const text = readFileSync(file, 'utf8')
  const reference = `{ "path": "./packages/experimental/${name}" }`
  if (text.includes(reference)) continue
  const anchor = '  "references": ['
  if (!text.includes(anchor)) throw new Error(`No references array in ${aggregate}`)
  writeFileSync(file, text.replace(anchor, `${anchor}\n    ${reference},`))
}

const environment = { ...process.env, CI: 'true', DSH_LEFTHOOK_ALLOW_HOOKS_PATH_OVERRIDE: '1' }
const faces = clientOnly ? ['client'] : ['host', 'client']
for (const face of faces) {
  const result = spawnSync('pnpm', ['run', `build:lib:${face}`], {
    cwd: harnessRoot,
    env: environment,
    stdio: 'inherit',
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

const sync = spawnSync(process.execPath, [resolve(root, 'scripts/sync-from-harness.mjs'), harnessRoot], {
  cwd: root,
  stdio: 'inherit',
})
process.exit(sync.status ?? 1)
