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
}] as const
