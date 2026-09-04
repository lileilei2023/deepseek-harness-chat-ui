#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const manifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
const expectedName = manifest.name
const required = [
  'dist/index.js',
  'dist/client.js',
  'cordis.patch.yml',
  'source/client-ui-skill-chat/src/client/SkillContactsBrowser.tsx',
  'source/workbuddy-skill-catalog/src/index.ts',
]

for (const path of required) {
  if (!existsSync(resolve(root, path))) throw new Error(`Missing distribution file: ${path}`)
}

const host = readFileSync(resolve(root, 'dist/index.js'), 'utf8')
const client = readFileSync(resolve(root, 'dist/client.js'), 'utf8')
const patch = readFileSync(resolve(root, 'cordis.patch.yml'), 'utf8')
const forbidden = [
  '@deepseek-ai/dsh-experimental-workbuddy-skill-catalog',
  '@deepseek-ai/dsh-experimental-client-ui-skill-chat',
]

for (const value of forbidden) {
  if (`${host}\n${client}\n${patch}\n${JSON.stringify(manifest)}`.includes(value)) {
    throw new Error(`Distribution still contains internal reference: ${value}`)
  }
}

const dependencySpecs = {
  ...manifest.dependencies,
  ...manifest.peerDependencies,
  ...manifest.optionalDependencies,
}
for (const [name, version] of Object.entries(dependencySpecs)) {
  if (String(version).startsWith('workspace:')) {
    throw new Error(`Dependency ${name} still uses an internal workspace range`)
  }
}

if (!client.includes(`id: "${expectedName}"`)) {
  throw new Error(`Client bundle is not registered as ${expectedName}`)
}
if (!patch.includes(`name: ${expectedName}`)) {
  throw new Error(`Profile patch does not install ${expectedName}`)
}
if (manifest.private === true) throw new Error('Distribution package must not be private')
if (manifest.dsh?.bundle?.patch !== './cordis.patch.yml') {
  throw new Error('Package must expose cordis.patch.yml through dsh.bundle.patch')
}
if (manifest.dshავის?.client !== undefined) {
  throw new Error('Unexpected malformed dsh client manifest')
}
if (manifest.dsh?.client?.platform !== 'web') {
  throw new Error('Package must expose a Web client entry')
}

console.log(`✓ ${expectedName} distribution is self-contained`)
