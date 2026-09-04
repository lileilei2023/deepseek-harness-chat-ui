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
    tagline: '清爽、轻拟物、适合长时间协作',
    description: 'DS Chat 默认皮肤，使用柔和薄荷色、圆形头像与清晰层级。',
    tags: ['builtin', 'mint', 'light'],
    accent: '#2fbc79',
    order: 0,
    contributes: { stylesheet: 'skin.css' },
  },
  css: `html[data-dsh-skin="ds-chat-mint"] {
    --ds-chat-accent-solid: #2fbf79;
    --ds-chat-accent: linear-gradient(180deg, #43d38b, #22ad68);
    --ds-chat-accent-border: color-mix(in srgb, #2fbf79 34%, transparent);
    --ds-chat-accent-soft: #e8f7ee;
    --ds-chat-accent-faint: linear-gradient(145deg, #f7fff9, #ecfaf2);
    --ds-chat-avatar-gradient: radial-gradient(circle at 32% 26%, #fff 0 16%, #c8f2d8 42%, #8ad8a9 100%);
    --ds-chat-focus: #2fbf79;
    --ds-chat-surface: color-mix(in srgb, var(--dsw-alias-bg-base) 96%, #effcf5);
    --ds-chat-surface-raised: linear-gradient(145deg, color-mix(in srgb, var(--dsw-alias-bg-base) 94%, white), color-mix(in srgb, var(--dsw-alias-bg-subtle) 90%, #ecfaf2));
    --ds-chat-surface-sunken: color-mix(in srgb, var(--dsw-alias-bg-subtle) 88%, #e8f8ef);
    --ds-chat-row-hover: color-mix(in srgb, var(--dsw-alias-bg-hover) 82%, #e8f8ef);
    --ds-chat-row-selected: color-mix(in srgb, #e5f8ed 80%, var(--dsw-alias-bg-base));
    --ds-chat-user-bubble: #e7f8ee;
    --ds-chat-radius-control: 12px;
    --ds-chat-radius-lg: 18px;
    --ds-chat-radius-xl: 24px;
    --ds-chat-shadow: 0 16px 40px rgb(28 62 45 / 12%), inset 0 1px 0 rgb(255 255 255 / 78%);
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
    --ds-chat-accent: linear-gradient(180deg, #8585ef, #6262d9);
    --ds-chat-accent-border: color-mix(in srgb, #7777e7 34%, transparent);
    --ds-chat-accent-soft: #efefff;
    --ds-chat-accent-faint: linear-gradient(145deg, #fafaff, #f0efff);
    --ds-chat-avatar-gradient: radial-gradient(circle at 32% 26%, #fff 0 16%, #dcdcff 42%, #aaaaf1 100%);
    --ds-chat-focus: #7777e7;
    --ds-chat-surface: color-mix(in srgb, var(--dsw-alias-bg-base) 97%, #f5f3ff);
    --ds-chat-surface-raised: linear-gradient(145deg, color-mix(in srgb, var(--dsw-alias-bg-base) 95%, white), color-mix(in srgb, var(--dsw-alias-bg-subtle) 88%, #f0efff));
    --ds-chat-surface-sunken: color-mix(in srgb, var(--dsw-alias-bg-subtle) 88%, #f0efff);
    --ds-chat-row-hover: color-mix(in srgb, var(--dsw-alias-bg-hover) 80%, #efefff);
    --ds-chat-row-selected: color-mix(in srgb, #ededff 82%, var(--dsw-alias-bg-base));
    --ds-chat-user-bubble: #efefff;
    --ds-chat-radius-control: 13px;
    --ds-chat-radius-lg: 20px;
    --ds-chat-radius-xl: 26px;
    --ds-chat-shadow: 0 18px 44px rgb(61 57 120 / 13%), inset 0 1px 0 rgb(255 255 255 / 82%);
  }`,
}] as const
