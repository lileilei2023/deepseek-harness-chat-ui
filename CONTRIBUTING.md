# Contributing

The editable TypeScript, React, CSS, and tests are committed under `source/`. The official DeepSeek Harness client bundler is currently required to regenerate the distributable Web module.

1. Create a dedicated DeepSeek Harness `0.1.2-alpha.5` checkout or worktree.
2. Modify the files under `source/` in this repository.
3. Run `DSH_SOURCE=/path/to/deepseek-harness npm run build`.
4. Run `npm ci && npm run check`.
5. Commit the source changes, tests, documentation, screenshots when relevant, and refreshed `dist/` artifacts.

The root distribution manifest must not contain `workspace:` dependencies or internal experimental package identifiers. The source snapshots intentionally retain their original Harness workspace manifests so the official build pipeline can consume them.
