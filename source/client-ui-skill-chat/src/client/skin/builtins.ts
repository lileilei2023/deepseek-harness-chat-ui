import type { DSChatSkinPackage } from './manifest.ts'

export const BUILTIN_SKINS: readonly DSChatSkinPackage[] = [{
  source: 'builtin',
  manifest: {
    $schema: 'https://schemas.linxin666.org/dsh-skin/v2.json',
    skinManifestVersion: 2,
    id: 'ds-chat-mint',
    name: '薄荷工作台',
    nameEn: 'DS Chat Mint',
    version: '1.0.0',
    author: 'DS Chat',
    tagline: '清爽、平整、适合长时间协作',
    description: 'DS Chat 默认皮肤：薄荷强调色、平整材质与发丝描边，明暗两种配色均适用。',
    tags: ['builtin', 'mint', 'light'],
    accent: '#17b877',
    order: 0,
    contributes: { stylesheet: 'skin.css' },
  },
  css: `html[data-dsh-skin="ds-chat-mint"] {
    /* A skin states its identity and its shape; every tint, stroke, focus ring
       and selection fill is derived from the accent in theme.css, so a skin
       never restates the same green six times. */
    --ds-chat-accent-solid: #17b877;
    --ds-chat-accent-hover: #12a068;
    --ds-chat-radius-control: 12px;
    --ds-chat-radius-lg: 18px;
    --ds-chat-radius-xl: 24px;
  }
  html[data-dsh-skin="ds-chat-mint"] body[data-ds-dark-theme] {
    --ds-chat-accent-solid: #3ddb95;
    --ds-chat-accent-hover: #57e5a7;
    --ds-chat-on-accent: #04231a;
  }`,
}, {
  source: 'builtin',
  manifest: {
    $schema: 'https://schemas.linxin666.org/dsh-skin/v2.json',
    skinManifestVersion: 2,
    id: 'teamily-soft',
    name: 'Teamily 柔光',
    nameEn: 'Teamily Soft',
    version: '1.0.0',
    author: 'DS Chat',
    tagline: '温暖白底、蓝紫强调与层叠卡片',
    description: '参考 Teamily 协作产品的柔和社交感，同时保留 DS Chat 的工作台密度。',
    tags: ['builtin', 'soft', 'collaboration'],
    accent: '#6c6ce5',
    order: 10,
    contributes: { stylesheet: 'skin.css' },
  },
  css: `html[data-dsh-skin="teamily-soft"] {
    --ds-chat-accent-solid: #6c6ce5;
    --ds-chat-accent-hover: #5a5ad6;
    --ds-chat-radius-control: 13px;
    --ds-chat-radius-lg: 20px;
    --ds-chat-radius-xl: 26px;
  }
  html[data-dsh-skin="teamily-soft"] body[data-ds-dark-theme] {
    --ds-chat-accent-solid: #a5a5ff;
    --ds-chat-accent-hover: #b9b9ff;
    --ds-chat-on-accent: #14103a;
  }`,
}, {
  source: 'builtin',
  manifest: {
    $schema: 'https://schemas.linxin666.org/dsh-skin/v2.json',
    skinManifestVersion: 2,
    id: 'ds-chat-nocturne',
    name: '夜航',
    nameEn: 'DS Chat Nocturne',
    version: '1.0.0',
    author: 'DS Chat',
    tagline: '常暗底色、蓝紫强调，社群聊天风格',
    description: '参考 Discord 的社群聊天观感：无论系统明暗都保持深色底，强调色为蓝紫，圆角更大、层级靠明度而非描边。',
    tags: ['builtin', 'dark', 'community'],
    accent: '#5865f2',
    order: 20,
    contributes: { stylesheet: 'skin.css' },
  },
  // Most skins state identity and shape and let the shell own the ground, so
  // they follow the light/dark switch. This one deliberately owns the ground:
  // a permanently dark room is its identity. A skin that takes the ground has
  // to take all of it — surface, text, border and fills together — or it
  // reproduces the very failure the token layer exists to prevent, so every
  // one of those is restated here rather than a single background colour.
  //
  // The declarations target `body` because that is where the host publishes
  // its palette and where the plugin binds the host-derived tokens; a rule on
  // `html` alone would be overridden by that binding.
  css: `html[data-dsh-skin="ds-chat-nocturne"] {
    --ds-chat-accent-solid: #5865f2;
    --ds-chat-accent-hover: #4752c4;
    --ds-chat-on-accent: #fff;
    --ds-chat-accent-soft: color-mix(in srgb, #5865f2 18%, transparent);
    --ds-chat-accent-soft-strong: color-mix(in srgb, #5865f2 28%, transparent);
    --ds-chat-accent-border: color-mix(in srgb, #5865f2 46%, transparent);
    --ds-chat-accent-text: #c3c8ff;
    --ds-chat-radius-control: 8px;
    --ds-chat-radius-sm: 6px;
    --ds-chat-radius-md: 10px;
    --ds-chat-radius-lg: 12px;
    --ds-chat-radius-xl: 16px;
  }
  html[data-dsh-skin="ds-chat-nocturne"] body {
    color-scheme: dark;
    --ds-chat-surface: #313338;
    --ds-chat-surface-raised: #383a40;
    --ds-chat-text-color: #dbdee1;
    --ds-chat-text-secondary: #b5bac1;
    --ds-chat-muted: #949ba4;
    --ds-chat-border: rgb(255 255 255 / 6%);
    --ds-chat-border-strong: rgb(255 255 255 / 10%);
    --ds-chat-hover: rgb(255 255 255 / 6%);
    --ds-chat-fill-quaternary: rgb(255 255 255 / 4%);
    --ds-chat-fill-tertiary: rgb(255 255 255 / 8%);
    --ds-chat-fill-secondary: rgb(255 255 255 / 12%);
    --ds-chat-fill-primary: rgb(255 255 255 / 16%);
    --ds-chat-shadow-1: 0 1px 2px rgb(0 0 0 / 30%);
    --ds-chat-shadow-2: 0 4px 14px rgb(0 0 0 / 42%);
    --ds-chat-shadow-3: 0 16px 40px rgb(0 0 0 / 58%);
    --ds-chat-scrim: rgb(0 0 0 / 60%);
    --ds-chat-danger: #f23f43;
    --ds-chat-warning: #f0b132;
    --ds-chat-info: #00a8fc;
  }
  /* An always-dark skin has to reach the shell's own palette as well: the
     conversation column is drawn by the host from --dsw-alias-*, so a skin
     that only redefines the plugin's tokens leaves a dark sidebar beside a
     white room. These map the host's aliases onto the same palette, which is
     the same mechanism the host uses for its own dark scheme. */
  html[data-dsh-skin="ds-chat-nocturne"] body {
    --dsw-alias-bg-base: #313338;
    --dsw-alias-bg-layer-1: #2b2d31;
    --dsw-alias-bg-layer-2: #383a40;
    --dsw-alias-bg-layer-3: #404249;
    --dsw-alias-label-primary: #dbdee1;
    --dsw-alias-label-secondary: #b5bac1;
    --dsw-alias-label-tertiary: #949ba4;
    --dsw-alias-border-l2: rgb(255 255 255 / 6%);
    --dsw-alias-border-l3: rgb(255 255 255 / 10%);
    --dsw-alias-border-l4: rgb(255 255 255 / 14%);
    --dsw-alias-interactive-bg-hover: rgb(255 255 255 / 6%);
    --dsw-alias-interactive-bg-hover-solid: #404249;
    --dsw-alias-bg-overlay: #232428;
    --dsw-alias-bg-skeleton: rgb(255 255 255 / 8%);
  }
  /* The sidebar sits one step darker than the room, the way a community client
     separates its channel list from its conversation. */
  html[data-dsh-skin="ds-chat-nocturne"] [data-skill-chat-root] {
    --ds-chat-surface: #2b2d31;
    background: #2b2d31;
  }
  html[data-dsh-skin="ds-chat-nocturne"] [data-skill-chat-root] [class*="roomRow"][data-selected="true"] {
    background: rgb(255 255 255 / 10%);
  }`,
}] as const
