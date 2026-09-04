---
description: "将已安装 WorkBuddy Skill 元数据作为有界、只读的 Remote 目录提供给实验性浏览器界面。"
kind: "package-reference"
---

# @deepseek-ai/dsh-experimental-workbuddy-skill-catalog

[English](README.md) | 中文

## 概述

这个实验性 Host 插件扫描本机 WorkBuddy builtin 插件缓存，并通过 `ctx.remote.workbuddySkills.list()` 暴露 Skill 名称、描述、可选适用场景、所属插件和安装版本。它还代理有界的 `skills.sh` 公共搜索，并可把用户选中的公开 GitHub Skill 安装到已注册 Workspace 的 `.dsh/skills` 目录。它不读取 WorkBuddy 数据库、会话、日志、trace、凭据或浏览器存储。

## 目录

- [使用方式](#use-this-package)
- [配置](#configuration)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [开发备注](#dev-note)

<a id="use-this-package"></a>
## 使用方式

在 Host 挂载本包，并在浏览器客户端挂载其生成的 `./remote` contribution。扫描器跳过符号链接，每个文件最多读取 64 KiB，目录最多返回 2,000 个联系人；未安装 WorkBuddy 时返回空列表。同一 `plugin + Skill 名称` 的重复项保留数字版本较新的目录。

所有返回联系人均为 `invocable: false`。该目录只用于发现，不会把 WorkBuddy Skill 注册到 Harness Skill 服务，也不会把其工具或凭据授予 Agent。

`skills.sh` 安装限定在项目范围。Host 在提交 bundle 前校验 Workspace、来源身份、仓库树、文件数量、声明与实际下载字节数、相对路径和 Git 符号链接模式；随后由现有文件系统 Skill Provider 自动发现 `.dsh/skills/<name>/SKILL.md`。

<a id="configuration"></a>
## 配置

| 字段 | 默认值 | 含义 |
|---|---|---|
| `root` | `~/.workbuddy/plugins/cache/workbuddy-builtin` | 要扫描的 WorkBuddy builtin 插件缓存 |
| `stateFile` | `~/.workbuddy/skill-chat/state.v2.json` | 原子保存 Skill Chat Room、Persona 和自动化状态 |

## Model Experience

### Room 职能与目录元数据

#### What the model sees

目录元数据只通过浏览器侧 `workbuddySkills/list` Remote 返回。对于映射到群组 Room 的 Session，Host 会把该 Room 持久化的职能说明注入为系统提示词；单聊与普通对话不会增加此提示词。

#### Token effect

群组 Session 会消耗其 Room 职能说明对应的 token；浏览目录和安装 Skill 不会进入模型输入。

#### KV Cache effect

群组职能未修改时，每轮保持稳定，模型提供方可以复用其前缀缓存；编辑职能会改变对应群组的提示词前缀。

## Known Limitations and Deferred Work

- 默认只纳入 WorkBuddy builtin 插件缓存，不包含 marketplace 与 connector 目录。
- `skills.sh` 搜索与安装依赖 skills.sh 和 GitHub 公共端点，不支持私有仓库。
- 安装只接收普通 Git blob、跳过符号链接，并把单个 bundle 限制在 160 个文件和 12 MiB 内。
- `whenToUse` 目前只识别英文 `## When to Use` 小节，其他 Skill 使用 frontmatter 描述。
- 执行 WorkBuddy Skill 需要后续独立、显式的导入与兼容流程。
- Host 每 30 秒扫描到期的 Skill Chat 自动化。重启后可恢复仍处于活动状态的逾期任务，但 Host 停止期间无法执行。
- 项目工作台 Remote 会校验 Workspace 归属并限制文件预览大小。Terminal Remote 优先使用 Session 终端后端，否则执行有界的一次性 Host 子进程；旁路对话 Remote 持有隐藏 Agent Session，并在抽屉或插件关闭时释放。

<a id="dev-note"></a>
### 开发备注

<details>
<summary>维护者工作上下文 — 点击展开</summary>

该目录有意不持有 watcher。每次显式列表请求都会读取当前缓存，避免在首版搜索池接入中引入额外生命周期和失效语义。

</details>

**运行时不变量：** 不发布 companion。路径约束、符号链接排除、读取上限与不可调用性由目录操作及其测试直接保证。
