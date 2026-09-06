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

改了 `package.json` 的依赖后，顺序是：**先跑一次 `npm run rebuild`**（它会把包
物化进 Harness 检出，这一步会因 lockfile 过期而失败），再在 Harness 检出里
`CI= pnpm install --no-frozen-lockfile`，然后重跑 rebuild。反过来无效——install
读的是物化后的 `package.json`，还没物化就装不到新依赖。

## 怎么验证

```bash
cd ~/workspace/deepseek-harness && CI=true pnpm exec vitest run \
  packages/experimental/workbuddy-skill-catalog packages/experimental/client-ui-skill-chat
cd ~/workspace/deepseek-harness-chat-ui && npm run check
```

改了测试后要 `cp -R source/*/tests ~/workspace/deepseek-harness/packages/experimental/*/`
再跑，rebuild 不同步 tests 目录。只改了源码没改测试时，同样要 `cp -R source/*/src`
过去——否则跑的是上一次 rebuild 时的代码，会看到早已修掉的失败。

想在真实实例里验证，用一个隔离的 `DSH_HOME` 起演示实例，别碰用户已有的：

```bash
export DSH_HOME=/tmp/dschat-demo
dsh plugin --profile web add "$(pwd)"
dsh web --port 7811 --no-open
```

宿主的 Remote 走 `POST /api/workbuddySkills/<method>`，body 是
`{type:'client-request', rpcId, method:'workbuddySkills/<method>', payload:{args:{request:{…}}}}`，
鉴权只认页面自己的 cookie——所以从页面 console 里 `fetch` 调，curl 会 401。
这是绕开 UI 直接验一个 Remote 最快的方式。

重拍 README 截图：

```bash
node scripts/shoot.mjs 'http://127.0.0.1:7811/?token=…' docs/images
```

它用 DevTools 协议驱动无头 Chrome，拍的是浏览器真正画出来的东西。**务必指向一个
自己的 `DSH_HOME` 演示实例**——这些图会进仓库，而真实实例里是你自己的对话。没有
配 API Key 的实例，会话区会显示一条红色的凭据报错，那几张就不要用。

**跑一个演示实例务必带 `--no-open`**：否则 `dsh web` 会打开用户的真实浏览器，
那个标签页可能持有旧的 bundle 与陈旧的 localStorage，会把服务端状态覆盖掉，
表现为「我改的东西没生效」或「数据莫名其妙没了」。

## 会咬人的几件事

**状态文件在 `$DSH_HOME/skill-chat/state.v2.json`，文档版本已到 3。** 路径没变
（改文件名会让旧版本读不到），但 `version: 3` 起成员与 persona 都以 **Skill 名**
为键，不再是 `<root>:<plugin>:<name>`。客户端在加载时对宿主文档与浏览器本地副本
各跑一次 `migrateMemberKeys`，幂等；宿主的校验同时接受 2 和 3，因为未重启的宿主
仍持有 2。 默认路径由
`defaultStateFile()` 决定。**任何测试构造 `WorkBuddySkillCatalog` 时都必须传
显式 `stateFile`**——测试进程里 `DSH_HOME` 未设置就落到 `~/.dsh`，会覆盖运行
这套测试的人的真实房间数据。`catalog.spec.ts` 的 `beforeEach` 已经把
`DSH_HOME` 整体 stub 到临时目录，别拆掉那道保险。

**联系人 id 是 `<root>:<plugin>:<name>`，不稳定——所以成员不再用它。** 哪个 root
拥有一个重名 Skill 取决于扫描名单，扩充 `DEFAULT_ROOTS` 会重新编号所有联系人。
房间成员、协调者、persona 现在存 Skill 名（目录本来就按名去重，一个名字同一时刻
只对应一个联系人）。`memberContact()` 仍保留一层按名回退，用来读别的机器写的、
还没迁移的文档。**新代码不要再用 `contact.id` 做持久化的键。**

**扫描出来的 Skill 默认不可调用。** 它只是目录里的一张名片；宿主的 Skill 服务
没见过它，模型加载会得到 `unknown or no longer available`。加入房间时会把它
软链进 `$DSH_HOME/skills`（宿主默认扫描且带文件监听的根）。软链而非复制：原
目录仍是唯一事实来源。

**web 模式下宿主 base 的 `skill-filesystem` 行是 disabled 的**，由各 agent
preset 自行挂载。所以改 `settings.yaml` 或 profile 的 `cordis.patch.yml` 去配
`customSkillDirs` **都不生效**——实测过。

**客户端 bundle 有纯度门禁，别引用别的插件。** `dsh-client-bundle-purity` 会拒绝
跨插件的值导入，包括 `@deepseek-ai/dsh-client-ui-primitives/src/ansi.ts` 这种深层
路径——只有默认 externals、声明过的 `dsh.client.external`、以及 cordis 服务是允许
的。所以 ANSI 解析器是插件自带的（`src/client/ansi.ts`），不是借宿主那份。

**宿主面没有这道门禁，但有更糟的后果。** 试过把 `@deepseek-ai/dsh-tool-fs-search`
加进依赖以复用它打包的 ripgrep，本地能跑；但插件从 GitHub 装到别处时，那个包的
**传递依赖**不在，Node 直接 `ERR_MODULE_NOT_FOUND`，**整个 Harness 起不来**。
比一个慢一点的搜索严重得多。现在 `rg` 从 PATH 取，取不到就回退到遍历。

**`content-visibility` 会让 `getComputedStyle` 失真。** 被跳过的子树里读到的颜色
可能是另一套主题的值。做对比度审计时因此误报过一批「暗色下白底白字」——截图才是
准的。要用计算样式测量，先临时挂
`*{content-visibility:visible!important}`，量完移除。

**同一个选择器在这份样式表里可能被写了两遍。** `.description`、`.time` 都各有两处
定义，靠源码顺序决定谁生效——改了靠前那处会毫无反应。改之前先
`grep -n '^\.名字'` 数一下。

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
