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
    version: '2.0.0',
    author: 'DS Chat',
    tagline: '蓝紫强调、紧凑圆角，社群聊天风格',
    description: '参考 Discord 的社群聊天观感：蓝紫强调色，圆角更小、层级靠明度而非描边。跟随系统与应用的明暗开关。',
    tags: ['builtin', 'community'],
    accent: '#5865f2',
    order: 20,
    contributes: { stylesheet: 'skin.css' },
  },
  /*
   * This skin used to own the ground: it forced a dark room whatever the shell
   * was set to. That is not a colour choice, it is a second theme engine, and
   * it loses. The shell publishes seventy-eight palette aliases and paints a
   * few surfaces — the sidebar column, the composer card — from hardcoded
   * values no alias reaches, so an always-dark skin over a light shell left
   * white slabs behind the brand, the composer and the person's own message.
   * Closing that gap needs the shell's hashed class names, which change with
   * every release.
   *
   * So the skin states identity and shape and lets the shell own light and
   * dark, like the other two. Dark mode is then the shell's, which is complete
   * by construction, and this skin is a palette rather than a theme.
   */
  css: `html[data-dsh-skin="ds-chat-nocturne"] {
    --ds-chat-accent-solid: #5865f2;
    --ds-chat-accent-hover: #4752c4;
    --ds-chat-on-accent: #fff;
    --ds-chat-accent-text: #4752c4;
    --ds-chat-radius-control: 8px;
    --ds-chat-radius-sm: 6px;
    --ds-chat-radius-md: 10px;
    --ds-chat-radius-lg: 12px;
    --ds-chat-radius-xl: 16px;
  }
  html[data-dsh-skin="ds-chat-nocturne"] body[data-ds-dark-theme] {
    --ds-chat-accent-solid: #7d88ff;
    --ds-chat-accent-hover: #99a2ff;
    --ds-chat-accent-text: #c3c8ff;
    --ds-chat-on-accent: #12163a;
  }
  /* Selection reads by lightness rather than a border, which is this skin's
     one structural idea and costs nothing on either ground. */
  html[data-dsh-skin="ds-chat-nocturne"] [data-skill-chat-root] [class*="roomRow"][data-selected="true"] {
    background: var(--ds-chat-accent-soft-strong);
  }`,
}] as const
