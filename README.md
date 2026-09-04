# DeepSeek Harness Chat UI

> A social-network-style AI collaboration interface for DeepSeek Harness — Skills become recognizable digital members that users can discover, message directly, personalize, and bring into persistent group chats.

[中文说明](README.zh.md) · [Features](#features) · [Install](#install-from-github) · [Development](#development)

![DeepSeek Harness Chat UI main screen](docs/images/deepseek-harness-chat-ui-main.png)

## Why this project

DeepSeek Harness provides a powerful agent runtime, but its default interface is organized around sessions and workspaces. This plugin turns Skills into a social collaboration network with contacts, direct conversations, persistent groups, and visible member identities:

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
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
git checkout v0.1.2-alpha.5
pnpm install

cd ../deepseek-harness-chat-ui
npm install
DSH_SOURCE=../deepseek-harness npm run build
npm run check
```

`npm run build` copies the editable source into the matching Harness checkout, runs the official Host and Web Client build pipeline, and refreshes `dist/`. Do not point it at a checkout containing uncommitted work.

## Compatibility

The first release intentionally targets DeepSeek Harness `0.1.2-alpha.5`. Harness APIs are evolving quickly, so future Harness versions may require a matching plugin release. Model providers, API keys, permissions, and session logs remain managed by Harness; this repository does not include credentials.

## License

MIT. The extracted code retains attribution to the original DeepSeek Harness project.
