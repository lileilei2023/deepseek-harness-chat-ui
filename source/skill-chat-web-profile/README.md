---
description: "Add the experimental SkillChat contact browser and WorkBuddy metadata catalog to a DeepSeek Harness Web profile."
kind: "package-bundle"
---

# @deepseek-ai/dsh-experimental-skill-chat-web-profile

English | [中文](README.zh.md)

## Summary

This private bundle adds the WorkBuddy metadata catalog and SkillChat browser plugin after the stable Web application. Removing the bundle restores the ordinary Workspace sidebar without changing Agent, Skill, or Session behavior.

## Table of Contents

- [Use this package](#use-this-package)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

## Use this package

From this repository checkout, the supported one-command path is:

```sh
./start-ds-chat.sh
```

The cross-platform launcher installs pinned dependencies, builds missing or stale artifacts, and installs this bundle into an isolated Web profile under the ignored `.dsh/` directory. Windows uses `start-ds-chat.cmd`; macOS may double-click `start-ds-chat.command`.

For an already built developer checkout, add the layer permanently to the user's Web profile with:

```sh
pnpm dsh plugin --profile web add ./packages/experimental/skill-chat-web-profile
```

The Host plugin owns Room, persona, automation, skills.sh installation, project-workbench, and hidden side-conversation state. The browser plugin replaces the sidebar browsing cell through Slot priority while retaining the stable conversation surface and composer.

## Model Experience

### Profile-composed contact selection

#### What the model sees

General Chat sends the user's content unchanged. Direct Skill chat may insert the selected `/<skill-name>` Harness invocation. Group chat keeps user messages unchanged and contributes the persisted group function through the `skill-chat:room-role` Host-side system-prompt section.

#### Token effect

User content and the active group function consume tokens. Mounting the profile, browsing contacts, and searching skills.sh do not.

#### KV Cache effect

An unchanged group function can remain cache-stable. Editing the function changes the corresponding system-prompt prefix.

## Known Limitations and Deferred Work

- The profile supports Host-persisted Rooms, explicit RoomSession history, editable personas, group functions, project-local skills.sh installation, and Host-driven one-time or recurring automations.
- The Room header opens Workspace-scoped file previews, real terminal and diff output, an iframe browser with an external-open fallback, and a hidden-Session side conversation without changing the active Room.
- Group routing remains a single Harness Session with coordinator semantics; it does not claim true concurrent multi-Agent execution.
- WorkBuddy catalog entries remain metadata-only until installed or otherwise imported as Harness Skills.

### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

The patch mounts the Host catalog before the browser plugin so the generated Remote namespace exists when the client connects.

</details>

**Runtime invariant:** No companion is published. Removing the bundle removes both the Host catalog and sidebar replacement.
