---
description: "Expose installed WorkBuddy Skill metadata as a bounded, read-only Remote catalog for experimental browser surfaces."
kind: "package-reference"
---

# @deepseek-ai/dsh-experimental-workbuddy-skill-catalog

English | [中文](README.zh.md)

## Summary

This experimental Host plugin scans the local WorkBuddy builtin plugin cache and exposes Skill names, descriptions, optional usage guidance, plugin ownership, and installed versions through `ctx.remote.workbuddySkills.list()`. It also proxies bounded discovery queries to the public `skills.sh` search API and can install a selected public GitHub-backed result into a registered Workspace's `.dsh/skills` directory. It never reads WorkBuddy databases, conversations, logs, traces, credentials, or browser storage.

## Table of Contents

- [Use this package](#use-this-package)
- [Configuration](#configuration)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

## Use this package

Mount the package on the Host and mount its generated `./remote` contribution in the browser client. The scanner skips symbolic links, caps metadata reads at 64 KiB per file, caps the catalog at 2,000 contacts, and returns an empty list when WorkBuddy is not installed. Duplicate `plugin + skill name` entries keep the numerically newest version directory.

Every returned contact has `invocable: false`. The catalog is a discovery source only; it does not register WorkBuddy Skills with the Harness Skill service or grant their tools and credentials to an Agent.

`skills.sh` installation is project-scoped. The Host validates the registered Workspace, source identity, repository tree, file count, declared and downloaded byte limits, relative paths, and Git symlink modes before committing a bundle. The existing filesystem Skill provider then discovers the new `.dsh/skills/<name>/SKILL.md` entry.

## Configuration

| Field | Default | Meaning |
|---|---|---|
| `root` | `~/.workbuddy/plugins/cache/workbuddy-builtin` | WorkBuddy builtin plugin cache to scan |
| `stateFile` | `~/.workbuddy/skill-chat/state.v2.json` | Atomic Skill Chat Room, persona, and automation state |

## Model Experience

### Room role and catalog metadata

#### What the model sees

Catalog metadata is returned only through the browser-facing `workbuddySkills/list` Remote. For a Session mapped to a group Room, the Host contributes that Room's persisted function description as a system-prompt section. Direct and General Chat Rooms add no prompt section.

#### Token effect

Group Sessions consume the tokens in their configured Room function description. Catalog browsing and installation add no model input.

#### KV Cache effect

The group function is stable for every turn while unchanged, so providers may reuse its prefix. Editing it changes the affected group's prompt prefix.

## Known Limitations and Deferred Work

- Only the WorkBuddy builtin plugin cache is included by default; marketplace and connector catalogs are excluded.
- `skills.sh` search and installation depend on public skills.sh and GitHub endpoints; private repositories are not supported.
- Installation accepts regular Git blobs only, skips symbolic links, and caps one bundle at 160 files and 12 MiB.
- `whenToUse` extraction recognizes an English `## When to Use` section and otherwise relies on the frontmatter description.
- Executing a WorkBuddy Skill requires a separate, explicit import and compatibility flow.
- The Host scans due Skill Chat automations every 30 seconds. It recovers overdue active tasks after restart but cannot execute while the Host process is stopped.
- Project workbench Remotes enforce Workspace ownership for file browsing and bounded previews. Terminal Remotes use a Session terminal backend when present and otherwise execute a bounded one-command Host subprocess. Sidecar Remotes own hidden Agent Sessions that are disposed when the drawer or plugin closes.

### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

The catalog intentionally owns no watcher. Each explicit list request reads the current cache, keeping lifecycle and invalidation semantics out of this first search-pool integration.

</details>

**Runtime invariant:** No companion is published. Path containment, symbolic-link exclusion, read bounds, and non-invocability are enforced by the catalog operation and its tests.
