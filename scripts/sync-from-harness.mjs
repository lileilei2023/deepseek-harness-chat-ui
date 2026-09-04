#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const PACKAGE_NAME = 'deepseek-harness-chat-ui'
const INTERNAL_CATALOG = '@deepseek-ai/dsh-experimental-workbuddy-skill-catalog'
const INTERNAL_CLIENT = '@deepseek-ai/dsh-experimental-client-ui-skill-chat'
const repositoryRoot = resolve(import.meta.dirname, '..')
const harnessRoot = resolve(process.argv[2] ?? process.env.DSH_SOURCE ?? '../deepseek-harness-chat-web')

const artifacts = [
  ['packages/experimental/workbuddy-skill-catalog/lib/index.js', 'dist/index.js'],
  ['packages/experimental/client-ui-skill-chat/lib/client.js', 'dist/client.js'],
]

for (const [sourcePath, destinationPath] of artifacts) {
  const source = resolve(harnessRoot, sourcePath)
  const destination = resolve(repositoryRoot, destinationPath)
  if (!existsSync(source)) {
    throw new Error(`Missing built Harness artifact: ${source}`)
  }
  mkdirSync(dirname(destination), { recursive: true })
  copyFileSync(source, destination)
  const rewritten = readFileSync(destination, 'utf8')
    .replaceAll(INTERNAL_CATALOG, PACKAGE_NAME)
    .replaceAll(INTERNAL_CLIENT, PACKAGE_NAME)
    .replace(/[\t ]+$/gmu, '')
  writeFileSync(destination, rewritten)
}

console.log(`Synchronized DS Chat artifacts from ${harnessRoot}`)
