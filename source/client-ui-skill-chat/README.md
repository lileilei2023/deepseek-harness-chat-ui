---
description: "Replace the Web sidebar browsing region with a chat-style Skill contact and recent-session browser."
kind: "package-reference"
---

# @deepseek-ai/dsh-experimental-client-ui-skill-chat

English | [中文](README.zh.md)

## Summary

This opt-in browser plugin projects Harness Skills and read-only WorkBuddy catalog entries as chat contacts. It replaces only `sidebar.workspaces` at a lower Slot priority, leaving the Web layout, conversation, composer, tools, approvals, and Session controller unchanged.

## Table of Contents

- [Use this package](#use-this-package)
- [UI Kit, Shell Slots, and Skins](#ui-kit-shell-slots-and-skins)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

## Use this package

Mount the package through `@deepseek-ai/dsh-experimental-skill-chat-web-profile` after the stable Web bundle. The sidebar gains a Workspace binding control; Chats, Contacts, and Groups tabs; frequent/all contact filters; deterministic Chinese persona names and avatars; a raw-name mode; source badges; and person-like profile panels. Search combines Harness and WorkBuddy contacts with remote `skills.sh` results, which users can install into the selected Workspace.

Active group conversations expose a right-side member panel for adding, removing, and inspecting members. One explicit `@` mention attributes the final visible reply to that Skill; ambiguous or unaddressed group messages fall back to the configured group lead. Tool and reasoning trajectory rows remain visually separate from human-like message bubbles.

The floating Room header keeps project files, a real Session terminal, diff output, an embeddable browser, and a temporary side conversation next to the active chat. File previews are bounded to Workspace-owned paths. The terminal uses the Session PTY when available and falls back to a real one-command Host subprocess. Temporary conversations run in hidden Sessions and never replace the Room's active Session.

Harness contacts use the existing Session-addressed `skills/list` Remote. WorkBuddy contacts use the independent `workbuddySkills/list` Remote and remain discoverable before a Session exists. When both sources contain the same name, the executable Harness contact wins. Starting a direct or group chat restores that Room's active Session and creates one only when the Room has none; the explicit New Conversation action creates another RoomSession. A group has a selectable coordinator, and the composer `@` menu exposes the group's members as structured Skill-contact references. Room, RoomSession, persona, and automation records live in Host-owned storage, while browser storage is limited to display preferences and compatibility bindings.

## UI Kit, Shell Slots, and Skins

The browser now consumes the package-owned DS Chat UI Kit for avatars, avatar stacks, buttons, surfaces, dialogs, drawers, empty states, Room rows, chat bubbles, and workbench panels. Product components continue to own Room, Persona, automation, terminal, file, and browser behavior; the UI Kit owns reusable geometry, interaction feedback, focus treatment, and skin-facing CSS variables.

The `sidebar.workspaces` replacement declares `ds-chat.sidebar.before-rooms`, `ds-chat.sidebar.after-rooms`, `ds-chat.room.header.actions`, `ds-chat.room.drawer`, `ds-chat.composer.before`, `ds-chat.composer.actions`, `ds-chat.message.artifact`, and `ds-chat.settings.section`. Contributions use the normal reversible Slot registry, so feature plugins can add product surfaces without importing a skin or reaching into the main browser component.

The built-in Skin Runtime validates dsh-web-compatible Skin Manifest v2 packages fail-closed, requires CSS scoped beneath `html[data-dsh-skin="<id>"]`, rejects remote imports and escaping asset URLs, and never executes hooks. It ships `ds-chat-mint` and `teamily-soft`, supports hover/focus preview, apply, reset, and browser-persisted preference, and exposes a Skin Center through `ds-chat.settings.section`. This compatibility layer accepts declarative manifest and stylesheet data; loading user directories remains Host work for the next phase.

## Model Experience

### Skill selection and group role

#### What the model sees

Direct Skill chat can send the visible `/<skill-name>` prefix inserted for a Harness-native contact. Group chat leaves each new user message untouched; the Host injects the group's persisted function through `skill-chat:room-role` as a system-prompt section.

#### Token effect

The user-reviewed Skill invocation or configured group function consumes tokens. Contact lists, avatars, and catalog metadata add no tokens.

#### KV Cache effect

An unchanged group function remains stable between turns and can participate in provider prefix caching. Editing the function changes the corresponding prompt prefix.

## Known Limitations and Deferred Work

- The sidebar persists direct and group Rooms through the Host-owned Skill Chat state document. Reopening a Room resumes its active Session; creating another Session requires the explicit New Conversation action.
- Chats separate persistent groups from collapsible Session history and include a General Chat entry that does not bind a Skill.
- Skill personas use stable neutral names and 24 built-in animal avatars. Users can edit or reset both while retaining the original Skill identity and source metadata.
- Group Rooms support member changes, coordinator selection, rename, archive, and Session history. They still use one Harness Session and one multi-role prompt rather than concurrent Agent fan-out.
- Automations persist with their target Room. The Host scans active due records, creates a new Workspace Session, starts the prompt, and writes the resulting RoomSession back to state. Exact-time execution requires the Host process to be running.
- skills.sh installs and automation creation expose pending, success, and concrete failure feedback instead of silent actions.
- Embedded browser previews depend on the target page's `X-Frame-Options` and Content Security Policy; the drawer always exposes an external-open link when embedding is denied.
- WorkBuddy contacts remain metadata-only. Installed `skills.sh` contacts become project-local Harness Skills; compatibility still depends on each downloaded Skill's own instructions and required tools.

### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

The component consumes one merged contact DTO so later Contact Directory storage can replace either source without changing the visible list and panel contract.

</details>

**Runtime invariant:** No companion is published. Slot disposal and generated Remote disposal are verified together by the browser plugin test.
