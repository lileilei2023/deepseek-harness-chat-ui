# CLAUDE.md

给在这个仓库里工作的 agent。写下的都是从代码和实测里确认过的事实，不是设想。

## 这是什么

`deepseek-harness-chat-ui` —— DeepSeek Harness 的一个插件，把 Skill 变成可
私聊、可拉群的「数字同事」。不是又一个单助手套壳：每个 Skill 有稳定昵称、生成
式头像、资料页和群组职能。

仓库里同时有 TypeScript/React 源码与已提交的构建产物，因此 Harness 用户可以
直接从 GitHub 安装，不需要自己构建。

## 三个包

| 目录 | 面 | 职责 |
| --- | --- | --- |
| `source/client-ui-skill-chat` | client | 侧栏、房间、工作台、皮肤。主文件 `src/client/SkillContactsBrowser.tsx`（约 2400 行） |
| `source/workbuddy-skill-catalog` | host | Skill 目录扫描、软链、房间状态持久化、项目浏览/终端/搜索（约 1400 行） |
| `source/skill-chat-web-profile` | host | Web profile 装配 |

`dist/index.js`（host 面）与 `dist/client.js`（client 面）是提交进仓库的构建
产物；`scripts/check-package.mjs` 校验其自包含。

## 怎么构建

官方的 `build-with-harness.mjs` 对仓库外的贡献者是坏的（它要求三个插件包已经
存在于 Harness 的 `packages/experimental` 下，而干净的公开检出没有）。用这个：

```bash
npm run rebuild -- ~/workspace/deepseek-harness      # 完整（host + client）
node scripts/rebuild.mjs ~/workspace/deepseek-harness --client-only   # 仅客户端，UI 迭代用
```

它会把三个包materialize 进 Harness 检出、登记 tsconfig 工程引用、构建两个
face、再同步回 `dist/`。**Harness 版本被钉在 `0.1.2-alpha.5`**，不匹配会直接报错。

改了 `package.json` 的依赖后，需要先在 Harness 检出里
`CI= pnpm install --no-frozen-lockfile`，否则 rebuild 会因 lockfile 过期失败。

## 怎么验证

```bash
cd ~/workspace/deepseek-harness && CI=true pnpm exec vitest run \
  packages/experimental/workbuddy-skill-catalog packages/experimental/client-ui-skill-chat
cd ~/workspace/deepseek-harness-chat-ui && npm run check
```

改了测试后要 `cp -R source/*/tests ~/workspace/deepseek-harness/packages/experimental/*/`
再跑，rebuild 不同步 tests 目录。

**跑一个演示实例务必带 `--no-open`**：否则 `dsh web` 会打开用户的真实浏览器，
那个标签页可能持有旧的 bundle 与陈旧的 localStorage，会把服务端状态覆盖掉，
表现为「我改的东西没生效」或「数据莫名其妙没了」。

## 会咬人的几件事

**状态文件在 `$DSH_HOME/skill-chat/state.v2.json`。** 默认路径由
`defaultStateFile()` 决定。**任何测试构造 `WorkBuddySkillCatalog` 时都必须传
显式 `stateFile`**——测试进程里 `DSH_HOME` 未设置就落到 `~/.dsh`，会覆盖运行
这套测试的人的真实房间数据。`catalog.spec.ts` 的 `beforeEach` 已经把
`DSH_HOME` 整体 stub 到临时目录，别拆掉那道保险。

**联系人 id 是 `<root>:<plugin>:<name>`，不稳定。** 哪个 root 拥有一个重名
Skill 取决于扫描名单，所以扩充 `DEFAULT_ROOTS` 会重新编号所有联系人，让既有
房间的成员 id 全部悬空。三处有按名回退（`memberContact()`、`ensureLinked()`、
宿主的 `memberSkillName()`）。**根治的做法是把成员改存 Skill 名而不是带 root
前缀的 id**，还没做。

**扫描出来的 Skill 默认不可调用。** 它只是目录里的一张名片；宿主的 Skill 服务
没见过它，模型加载会得到 `unknown or no longer available`。加入房间时会把它
软链进 `$DSH_HOME/skills`（宿主默认扫描且带文件监听的根）。软链而非复制：原
目录仍是唯一事实来源。

**web 模式下宿主 base 的 `skill-filesystem` 行是 disabled 的**，由各 agent
preset 自行挂载。所以改 `settings.yaml` 或 profile 的 `cordis.patch.yml` 去配
`customSkillDirs` **都不生效**——实测过。

**CSS 变量无 fallback 会让整条声明作废。** 这个坑在这个项目里踩过两次
（`--ds-chat-accent-strong` 根本不存在）。`:root` 放字面量，`body` 放从宿主
alias 派生的值——写反了暗色下会得到空值。

**皮肤只声明身份与形状，明暗归外壳。** 曾经有过一个「常暗」皮肤，它必须重画
整个外壳；宿主发布 78 个 palette alias，还有若干硬编码底色够不到，最终撤回了。
别再往回走。

## 设计立场

- 这是**聊天软件**，不是 IDE。工作台的职责是「拿到团队交付物」，不是复刻编辑器。
- 形状编码类别：肖像是圆（人），房间是圆角方块（群或普通对话）。
- 破坏性操作要有二次确认；会话日志只追加，没有 delete/truncate，所以「回到某条」
  只能是 fork。

## 文档

- `README.md` / `README.zh.md` —— 中英双语，改功能时两边都要动。
- `docs/UI设计评审与优化方案.md` —— 逐轮评审记录，含每次的判断依据与被推翻的决定。
- `TODO.md` —— 已知的打磨欠账，按严重度排序。
