---
description: "为 DeepSeek Harness Web Profile 增加实验性的 SkillChat 联系人界面与 WorkBuddy 元数据目录。"
kind: "package-bundle"
---

# @deepseek-ai/dsh-experimental-skill-chat-web-profile

[English](README.md) | 中文

## 概述

这个私有 Bundle 在稳定 Web 应用之后增加 WorkBuddy 元数据目录与 SkillChat 浏览器插件。移除该 Bundle 后会恢复普通 Workspace 侧栏，不改变 Agent、Skill 或 Session 行为。

## 目录

- [使用方式](#use-this-package)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [开发备注](#dev-note)

<a id="use-this-package"></a>
## 使用方式

从本仓库源码启动时，推荐使用一条命令：

```sh
./start-ds-chat.sh
```

跨平台启动器会安装锁定版本的依赖、构建缺失或过期的产物，并把本 Bundle 安装到已忽略的 `.dsh/` 目录中的隔离 Web Profile。Windows 使用 `start-ds-chat.cmd`；macOS 也可以双击 `start-ds-chat.command`。

把该层添加到已初始化的 Web Profile：

```sh
pnpm dsh plugin --profile web add ./packages/experimental/skill-chat-web-profile
```

Host 插件负责 Room、Persona、自动化、skills.sh 安装、项目工作台和隐藏旁路对话状态；浏览器插件通过 Slot 优先级替换侧栏浏览单元，同时保留稳定的会话区域和输入框。

## Model Experience

### Profile 组合的联系人选择

#### What the model sees

普通对话会原样发送用户内容；Skill 单聊可插入选中的 `/<skill-name>` Harness 调用；群聊保持用户消息为普通 user prompt，并由 Host 通过 `skill-chat:room-role` 把持久化的群组职能作为 system prompt 注入。

#### Token effect

用户内容与当前群组职能会消耗 token；挂载 Profile、浏览联系人和搜索 skills.sh 不会进入模型输入。

#### KV Cache effect

群组职能不变时可保持缓存前缀稳定；编辑职能会改变对应群组的 system prompt 前缀。

## Known Limitations and Deferred Work

- 当前 Profile 已提供 Host 持久化 Room、显式 RoomSession 历史、可编辑 Persona、群组职能、项目级 skills.sh 安装，以及 Host 驱动的单次或周期自动化。
- Room 头部可打开 Workspace 文件预览、真实 Terminal 与 Diff、带外部打开兜底的 iframe 浏览器，以及不切换活动 Room 的隐藏 Session 旁路对话。
- 群组路由仍使用一条 Harness Session 和协调者语义，不宣称真实并行多 Agent 执行。
- WorkBuddy 目录项在安装或显式导入为 Harness Skill 前仍只提供元数据。

<a id="dev-note"></a>
### 开发备注

<details>
<summary>维护者工作上下文 — 点击展开</summary>

该 patch 先挂载 Host 目录，再挂载浏览器插件，以确保客户端连接时生成的 Remote 命名空间已存在。

</details>

**运行时不变量：** 不发布 companion。移除该 Bundle 会同时移除 Host 目录与侧栏替换。
