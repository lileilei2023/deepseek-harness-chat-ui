# DeepSeek Harness Chat UI

> A personified, social AI collaboration interface for DeepSeek Harness — Skills become recognizable digital members that users can discover, personalize, message directly, and bring into persistent group chats.

This is **not another ChatGPT-style single-assistant shell**. DS Chat treats every Skill as a social identity with a friendly name, circular animal avatar, profile, direct-message relationship, and a role inside long-lived group rooms.

[中文说明](README.zh.md) · [Features](#features) · [Install](#install-from-github) · [Development](#development)

## Demo

![Personified Skills social collaboration demo](docs/media/deepseek-harness-chat-ui-demo.gif)

The live demo shows a real group consultation: inspect the group's members and system role, ask three personified Skills to contribute, receive a coordinated answer, switch to another group, and return without losing the conversation. The embedded GIF runs at 15 FPS for smoother playback.

[Watch the full 48-second MP4 demo](docs/media/deepseek-harness-chat-ui-demo.mp4)

![DeepSeek Harness Chat UI main screen](docs/images/deepseek-harness-chat-ui-main.png)

## Why this project

DeepSeek Harness provides a powerful agent runtime, but its default interface is organized around sessions and workspaces. This plugin turns Skills into a personified social collaboration network with contacts, direct conversations, persistent groups, and visible member identities:

- **Persistent rooms** restore the previous conversation instead of silently creating a new session.
- **Normal chat** works without selecting a Skill.
- **Personified Skills** appear as recognizable contacts with deterministic names, circular animal avatars, profiles, and original capability metadata.
- **Group chats** let users search Skills, pull them into a group, choose a coordinator, and define a reusable group system prompt.
- **Automation entry points** connect scheduled tasks to rooms and conversation history.
- **Project and terminal sidecars** keep files and command-line work beside the active conversation.
- **Skin support** allows declarative visual themes without touching Room or automation data.

## Screenshots

### Create a group with personified Skills

Search installed Skills, add or remove them like group members, choose a circular group avatar, and define the group's role as its system prompt.

![Create a DeepSeek Harness multi-agent group](docs/images/deepseek-harness-chat-ui-groups.png)

### Theme center

![DeepSeek Harness Chat UI theme center](docs/images/deepseek-harness-chat-ui-themes.png)

## Features

| Area | Capability |
| --- | --- |
| Social chat | Normal chat, Skill contacts, direct conversations, group chats, collapsible session history |
| Groups | Searchable members, coordinator selection, group system prompt, project binding |
| Personification | Circular animal avatars, deterministic friendly names, profiles and original Skill metadata |
| Skills | Installed Skill directory, `skills.sh` search, install and install-then-add flows |
| Workspace | Project browser, file preview, terminal and sidecar task entry points |
| Automation | Room-bound definitions, run-now flow and persisted run history |
| Appearance | Mint and Teamily-inspired skins using the DSH Web Skin Manifest v2 contract |

## Requirements

- DeepSeek Harness `0.1.2-alpha.5`
- Node.js `22.19+` or `24+`
- `pnpm` available on `PATH` because `dsh plugin` delegates package installation to pnpm

## Install from GitHub

The repository contains both the original TypeScript/React/CSS source and committed browser/host build artifacts. Harness users can install it directly from GitHub without downloading a release archive:

```sh
dsh plugin --profile web add github:lileilei2023/deepseek-harness-chat-ui
dsh --profile web
```

Remove it with:

```sh
dsh plugin --profile web remove deepseek-harness-chat-ui
```

## Install from a cloned repository

```sh
git clone https://github.com/lileilei2023/deepseek-harness-chat-ui.git
cd deepseek-harness-chat-ui
npm install
./install-ds-chat.sh
```

Windows users can run `install-ds-chat.cmd`; macOS users can double-click `install-ds-chat.command`.

## Source code

The complete editable implementation is committed under `source/`:

```text
source/
├── client-ui-skill-chat/       # React UI, Room state, personas, skins and sidecars
├── workbuddy-skill-catalog/    # Host service, persistence, Skill install and automation APIs
└── skill-chat-web-profile/     # Original Harness profile bundle
```

`dist/` contains the reviewed build consumed by users installing directly from GitHub. It is committed intentionally so installation does not execute a remote `prepare` script.

## Development

DeepSeek Harness is still pre-release and its Web client bundler lives inside the Harness repository. Use a dedicated matching Harness checkout or worktree when rebuilding:

```sh
git clone --depth 1 --branch dsh-v0.1.2-alpha.5 https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install

cd ../deepseek-harness-chat-ui
npm install
npm run rebuild -- ../deepseek-harness
npm run check
```

`npm run rebuild` materialises the three plugin packages under the Harness checkout's `packages/experimental`, registers them in the `tsconfig.host.json` and `tsconfig.client.json` project-reference aggregates, builds the Host and Client faces, and refreshes `dist/`. Pass `--client-only` to skip the Host face while iterating on the UI. Do not point it at a checkout containing uncommitted work.

`npm run build` is the original entry point. It drives the Harness's full workspace build and expects the three packages to already exist under `packages/experimental`, which a clean public checkout does not have — use `npm run rebuild` there.

## Skill sources

The catalog scans directories for `SKILL.md` files and lists what it finds as contacts. Nothing is downloaded, executed, or mounted into the runtime — it is a read-only metadata scan. Three roots are scanned by default:

| Root | Path | Layout |
| --- | --- | --- |
| WorkBuddy | `~/.workbuddy/plugins/cache/workbuddy-builtin` | `<plugin>/<version>/**` |
| Claude Code | `~/.claude/skills` | `<skill>/SKILL.md`, plus one level of bundles |
| Claude plugins | `~/.claude/plugins/marketplaces` | nested |

Override the roster from the profile's patch layer:

```yaml
- id: workbuddy-skill-catalog
  config:
    roots:
      - { id: workbuddy, label: WorkBuddy, path: '~/.workbuddy/plugins/cache/workbuddy-builtin', layout: plugin-version }
      - { id: team, label: Team, path: /srv/shared/skills, layout: flat }
```

A Skill name found under more than one root keeps the first root's entry, so roster order is precedence order. `config.root` still relocates the WorkBuddy cache on its own and leaves the other roots in place.

## Compatibility

The first release intentionally targets DeepSeek Harness `0.1.2-alpha.5`. Harness APIs are evolving quickly, so future Harness versions may require a matching plugin release. Model providers, API keys, permissions, and session logs remain managed by Harness; this repository does not include credentials.

## License

MIT. The extracted code retains attribution to the original DeepSeek Harness project.
