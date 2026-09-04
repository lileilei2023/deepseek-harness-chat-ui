---
description: "用聊天式 Skill 联系人和最近会话浏览器替换 Web 侧栏浏览区域。"
kind: "package-reference"
---

# @deepseek-ai/dsh-experimental-client-ui-skill-chat

[English](README.md) | 中文

## 概述

这个可选浏览器插件把 Harness Skill 与只读 WorkBuddy 目录项投影为聊天联系人。它只以更低的 Slot 优先级替换 `sidebar.workspaces`，保留 Web 布局、会话区、输入框、工具、审批和 Session Controller。

## 目录

- [使用方式](#use-this-package)
- [UI Kit、Shell Slots 与皮肤](#ui-kit-shell-slots-and-skins)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [开发备注](#dev-note)

<a id="use-this-package"></a>
## 使用方式

通过 `@deepseek-ai/dsh-experimental-skill-chat-web-profile` 在稳定 Web bundle 之后挂载本包。侧栏提供 Workspace 绑定控件以及消息、联系人和群组页签，支持常用/全部联系人、确定性的中文拟人名与头像、原始名称模式、来源标记和拟人化联系人主页。搜索会合并 Harness、WorkBuddy 联系人与远端 `skills.sh` 结果，用户可以把外部结果安装到当前 Workspace。

激活的群聊会显示右侧成员栏，支持添加、移除和查看成员资料。消息只明确 `@` 一名成员时，最终可见回复归属该 Skill；目标不明确时回退到群主导 Skill。工具与推理轨迹保持为后台过程，不伪装成人类聊天气泡。

浮层 Room 头部在当前聊天旁提供项目文件、真实 Session Terminal、Diff、可嵌入浏览器和临时旁路对话。文件预览只允许读取 Workspace 内的有界文本；Terminal 优先使用 Session PTY，没有 PTY 时回退到真实的一次性 Host 子进程；临时对话运行在隐藏 Session 中，不替换 Room 的活动 Session。

Harness 联系人使用已有的 Session 地址化 `skills/list` Remote；WorkBuddy 联系人使用独立的 `workbuddySkills/list` Remote，因此没有 Session 时也可浏览。两个来源名称相同时，可执行的 Harness 联系人优先。发起单聊或群聊会恢复该 Room 的活动 Session，仅在 Room 尚无 Session 时创建；显式点击“新对话”才会创建另一条 RoomSession。群组可选择协调者；输入框的 `@` 菜单会列出当前群成员，并插入结构化 Skill 联系人引用。Room、RoomSession、Persona 与自动化由 Host 持久化，浏览器存储仅保留显示偏好和兼容绑定。

<a id="ui-kit-shell-slots-and-skins"></a>
## UI Kit、Shell Slots 与皮肤

浏览器界面现在实际使用包内 DS Chat UI Kit，统一头像、头像栈、按钮、表面容器、弹窗、抽屉、空状态、Room 行、聊天气泡和工作台面板。Room、Persona、自动化、终端、文件与浏览器行为仍由产品组件负责；UI Kit 只管理可复用几何、按压反馈、焦点可访问性和皮肤变量。

`sidebar.workspaces` 替换项声明 `ds-chat.sidebar.before-rooms`、`ds-chat.sidebar.after-rooms`、`ds-chat.room.header.actions`、`ds-chat.room.drawer`、`ds-chat.composer.before`、`ds-chat.composer.actions`、`ds-chat.message.artifact` 与 `ds-chat.settings.section`。扩展继续使用现有可逆 Slot 注册机制，因此功能插件无需导入或理解具体皮肤，也无需继续修改主浏览器组件。

内置 Skin Runtime 以 fail-closed 方式校验兼容 dsh-web 的 Skin Manifest v2，要求 CSS 限定在 `html[data-dsh-skin="<id>"]` 下，拒绝远程导入与越界资源路径，并且不执行 hooks。首批内置 `ds-chat-mint` 与 `teamily-soft`，支持悬停/聚焦试穿、应用、重置和浏览器持久化偏好；皮肤中心通过 `ds-chat.settings.section` 接入。当前兼容层接收声明式 manifest 与样式内容，用户皮肤目录扫描留给下一阶段 Host 能力。

## Model Experience

### 显式选择 Harness Skill

#### What the model sees

用户提交后，普通输入框会发送为 Harness 原生联系人插入的可见 `/<skill-name>` 前缀。WorkBuddy 联系人不会写入输入框。

#### Token effect

只有经过用户检查的 Skill 调用会成为普通用户消息内容；联系人列表与元数据不增加 token。

#### KV Cache effect

无；浏览器插件不改变请求组装或模型提供方的缓存前缀。

## Known Limitations and Deferred Work

- 侧栏通过 Host 管理的状态文档持久化单聊和群组 Room。重新进入 Room 会恢复活动 Session，只有显式点击“新对话”才创建另一段 Session。
- 聊天页将长期群组与可折叠的会话历史分开，并提供不绑定任何 Skill 的“普通对话”入口。
- Skill Persona 使用稳定的中性昵称和 24 个内置动物头像；用户可以修改或恢复默认值，同时保留原始 Skill 身份与来源。
- 群组 Room 支持成员调整、协调者选择、重命名、归档和 Session 历史，但仍使用一条 Harness Session 和一份多角色提示词，不代表真实并行 Agent。
- 自动化与目标 Room 一起持久化。Host 会扫描到期任务、创建 Workspace Session、启动提示词并把 RoomSession 写回状态；准点执行要求 Host 进程正在运行。
- skills.sh 安装与自动化创建会显示进行中、成功或具体失败原因，避免无反馈操作。
- 浏览器内嵌预览受目标页面的 `X-Frame-Options` 与 Content Security Policy 限制；无法嵌入时抽屉仍提供外部打开链接。
- WorkBuddy 联系人仍只提供元数据。已安装的 `skills.sh` 联系人成为项目级 Harness Skill；是否可执行仍取决于下载 Skill 自身声明的工具和环境依赖。

<a id="dev-note"></a>
### 开发备注

<details>
<summary>维护者工作上下文 — 点击展开</summary>

组件消费统一的联系人 DTO，因此后续 Contact Directory 持久化可以替换任一数据源，而无需改变列表与资料面板契约。

</details>

**运行时不变量：** 不发布 companion。浏览器插件测试同时验证 Slot 与生成 Remote 的卸载。
