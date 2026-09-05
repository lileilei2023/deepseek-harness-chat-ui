# DeepSeek Harness Chat UI

> 面向 DeepSeek Harness 的拟人化、社交化 AI 协作界面：把 Skill 变成可发现、可改名换头像、可私聊、可拉群的数字成员。

这**不是又一个 ChatGPT 式单助手套壳**。DS Chat 让每个 Skill 拥有稳定昵称、生成式头像、个人资料和群组职能，像使用社交软件一样建立联系人、恢复私聊并组织长期协作群。机器上每个 agent 工具的 Skill——Claude Code、WorkBuddy、Codex、Hermes、豆包、Trae——都会变成可私聊、可拉群的联系人；而且拉进群之后模型是真的能加载它，不是名片上的一个名字。

[English](README.md) · [功能](#功能) · [安装](#从-github-直接安装) · [开发](#源码开发)

## 演示

![Skill 拟人化与社交群聊演示](docs/media/deepseek-harness-chat-ui-demo.gif)

演示使用真实模型完成一次群组咨询：查看群成员与群组职能，让三位拟人化 Skill 分工回答，由协调者汇总结果；随后切换到另一个群组再返回，原对话仍会恢复。内嵌 GIF 使用 15 FPS，播放更流畅。

[观看 26 秒完整 MP4 演示](docs/media/deepseek-harness-chat-ui-demo.mp4)

![DeepSeek Harness Chat UI 主界面](docs/images/deepseek-harness-chat-ui-main.png)

## 为什么做这个项目

DeepSeek Harness 提供了强大的 Agent Runtime，但默认界面更偏向 Session 和 Workspace。本插件把 Skill 组织成一个拟人化、社交化协作网络，强调联系人、私聊、群聊和清晰的成员身份：

- **持久化 Room**：切换群组再回来时恢复原对话，不再隐式创建 Session。
- **普通对话入口**：不选择 Skill 也能直接和模型交流。
- **Skill 拟人化**：每个 Skill 都有稳定昵称、按 Skill 生成的插画头像（DiceBear Micah，见致谢）、资料页和原始能力信息。
- **可以拉群**：像社交软件一样搜索 Skill、加入或剔除群成员、设置协调者和群组 System Prompt；加进群的 Skill 会被软链进宿主的 Skill 目录，模型是真的能调用它。
- **自动化入口**：与外壳「新会话」并列的顶层入口，把计划任务、运行记录和目标 Room 联系起来。
- **文件与终端侧栏**：在当前对话旁打开项目文件、终端和临时任务。
- **皮肤系统**：通过声明式 Skin Manifest 修改视觉，不接触 Room、Persona 或自动化数据。

## 截图

### 把拟人化 Skill 拉进群聊

可以像社交软件拉群一样搜索已安装 Skill、加入或剔除成员、选择群组头像，并设置用于 System Prompt 的群组职能。

![创建 DeepSeek Harness 多智能体群组](docs/images/deepseek-harness-chat-ui-groups.png)

### 定时自动化

每条自动化都跑在它所属的房间里。选一张场景卡片即可预填名称、提示词和周期，也可以从空白开始。

![DeepSeek Harness Chat UI 自动化](docs/images/deepseek-harness-chat-ui-automations.png)

### 皮肤中心

![DeepSeek Harness Chat UI 皮肤中心](docs/images/deepseek-harness-chat-ui-themes.png)

## 功能

| 模块 | 能力 |
| --- | --- |
| 社交对话 | 普通对话、Skill 联系人、私聊、群聊统一在一份按时间倒序的房间列表里，搜索常驻 |
| 房间管理 | 置顶、拖拽排序、归档、删除，以及存为常用小组——小组跟着你走，不属于某个项目 |
| 群组 | 成员搜索、协调者、群组职能、项目目录绑定；房间由最多四张成员头像组成的 2×2 方块标识 |
| Skill 拟人化 | 生成式头像、稳定友好昵称、资料页和原始 Skill 元数据 |
| Skills | 机器上所有 agent 工具的 Skill 目录汇总成一份通讯录，`skills.sh` 搜索、安装、安装并加入 |
| 真实可调用 | 加入房间即把该 Skill 软链进宿主自己的 Skill 根目录，模型能真的加载它 |
| 成员并发 | 一次需要多个成员时，协调者为每人各起一个后台子代理并发进行，各自加载对应 Skill——是真的并发，不是叙述出来的 |
| 按发言人配脸 | 每段转述带上撰写它的那个成员的头像，一个群才读起来像一个群 |
| Workspace | 项目文件浏览、文件预览、终端与旁路任务入口 |
| 自动化 | 与外壳「新会话」并列的顶层入口，场景模板、Room 绑定、立即运行与运行历史 |
| 外观 | 薄荷工作台、Teamily 柔光、常暗「夜航」三套皮肤，基于 DSH Skin Manifest v2；明暗配色跟随外壳 |

![DeepSeek Harness Chat UI 暗色模式](docs/images/deepseek-harness-chat-ui-dark.png)

## 环境要求

- DeepSeek Harness `0.1.2-alpha.5`
- Node.js `22.19+` 或 `24+`
- 命令行中可使用 `pnpm`，因为 `dsh plugin` 会通过 pnpm 安装插件

## 从 GitHub 直接安装

仓库同时提供完整 TypeScript/React/CSS 源码和经过验证的 Host/Web 构建产物，不需要下载 Release 压缩包：

```sh
dsh plugin --profile web add github:lileilei2023/deepseek-harness-chat-ui
dsh --profile web
```

卸载：

```sh
dsh plugin --profile web remove deepseek-harness-chat-ui
```

## 克隆源码安装

```sh
git clone https://github.com/lileilei2023/deepseek-harness-chat-ui.git
cd deepseek-harness-chat-ui
npm install
./install-ds-chat.sh
```

Windows 可以运行 `install-ds-chat.cmd`；macOS 可以双击 `install-ds-chat.command`。

## 原始源码

完整可编辑实现位于 `source/`：

```text
source/
├── client-ui-skill-chat/       # React UI、Room、Persona、皮肤和侧栏
├── workbuddy-skill-catalog/    # Host 服务、持久化、Skill 安装和自动化 API
└── skill-chat-web-profile/     # 原始 Harness Profile Bundle
```

`dist/` 是 GitHub 直接安装时使用的已验证构建产物。提交它是为了避免安装远程仓库时执行不受信任的 `prepare` 构建脚本，而不是用构建产物替代源码。

## 源码开发

DeepSeek Harness 仍处于预发布阶段，其 Web Client Bundler 位于 Harness 仓库内部。重新构建时请使用独立的匹配版本 checkout 或 worktree：

```sh
git clone --depth 1 --branch dsh-v0.1.2-alpha.5 https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install

cd ../deepseek-harness-chat-ui
npm install
npm run rebuild -- ../deepseek-harness
npm run check
```

`npm run rebuild` 会在 Harness checkout 的 `packages/experimental` 下物化本仓库的三个插件包，把它们登记进 `tsconfig.host.json` 与 `tsconfig.client.json` 的工程引用，构建 Host 与 Client 两个 face，再刷新 `dist/`。只调 UI 时可以加 `--client-only` 跳过 Host face。不要将它指向包含未提交改动的 Harness 工作目录。

`npm run build` 是原有入口：它驱动 Harness 的完整工作区构建，并要求这三个包已经存在于 `packages/experimental`，而公开 checkout 并没有——那种情况请使用 `npm run rebuild`。

## Skill 来源

目录服务扫描指定目录下的 `SKILL.md` 并把结果列为联系人。列出这一步是只读的元数据扫描：不下载、不执行。默认把每个 agent 工具的常规位置都扫一遍——不存在的目录只多一次失败的 `readdir`，比让人手工配路径便宜：

| 来源 | 路径 | 布局 |
| --- | --- | --- |
| WorkBuddy | `~/.workbuddy/plugins/cache/workbuddy-builtin` | `<plugin>/<version>/**` |
| WorkBuddy（用户级） | `~/.workbuddy/skills` | `<skill>/SKILL.md` |
| Claude Code | `~/.claude/skills` | `<skill>/SKILL.md`，另支持一层 bundle |
| Claude 插件 | `~/.claude/plugins/marketplaces` | 嵌套 |
| Codex | `~/.codex/skills` | `<skill>/SKILL.md` |
| Hermes | `~/.hermes/skills` | `<skill>/SKILL.md` |
| 豆包 | `~/DoubaoWork/skills` | `<skill>/SKILL.md` |
| Trae | `~/.trae/builtin/global/skills` | `<skill>/SKILL.md` |
| OpenClaw | `~/.openclaw/skills` | `<skill>/SKILL.md` |
| 共享 | `~/.agents/skills` | `<skill>/SKILL.md` |

同名 Skill 出现在多个来源时保留靠前来源的条目，因此名单顺序即优先级。在 Profile 的 patch 层可以覆盖这份名单：

```yaml
- id: workbuddy-skill-catalog
  config:
    roots:
      - { id: workbuddy, label: WorkBuddy, path: '~/.workbuddy/plugins/cache/workbuddy-builtin', layout: plugin-version }
      - { id: team, label: 团队, path: /srv/shared/skills, layout: flat }
```

### 从名片到真的能调用

扫描到的 Skill 一开始只是一张名片。宿主的 Skill 服务从没见过它，所以模型去加载会得到 `Error: skill "X" is unknown or no longer available`。把这个 Skill 加进房间就解决了：DS Chat 会把它的目录软链到 `$DSH_HOME/skills`——宿主自己的用户级 Skill 根目录，而宿主本来就在监听那里的变化。

用软链而不是复制是有意的。工具自己的目录仍是唯一事实来源，在那里改完立刻生效，也就没有「同步任务」需要跑或者忘记跑。只有你真的放进房间的 Skill 才会被链接，所以一台装了几百个 Skill 的机器不会把它们全推进每个会话的目录。取消只需一次 `unlinkSkill`；不是本插件建立的链接一律不动。

## 致谢

Skill 头像由 [DiceBear](https://www.dicebear.com)（MIT）在本地生成，画风为 **Micah** —— [Micah Lanier](https://dribbble.com/micahlanier) 的 *Avatar Illustration System*，授权 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。运行时不发起任何网络请求：生成器已打进产物，每个头像由 Skill 自身的 id 推导。

## 兼容性

首个版本锁定 DeepSeek Harness `0.1.2-alpha.5`。Harness API 仍在快速演进，后续 Harness 版本可能需要对应的插件版本。模型提供方、API Key、权限和 Session 日志继续由 Harness 管理，本仓库不包含任何凭证。

## 许可证

MIT。抽取的代码继续保留对 DeepSeek Harness 原项目的归属说明。
