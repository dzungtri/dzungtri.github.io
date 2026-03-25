# dzungtri.github.io

Personal profile and blog repository for `https://dzungtri.github.io/`.

## Quick start

```bash
npm ci
npm run build
npm run preview
```

## Writing

```bash
npm run new:post -- "Your post title"
```

Edit file in `content/posts/`, then:

```bash
npm run deploy:quick -- "content: publish new post"
```

## Privacy boundary

- Private profile/resume source files are stored under `context/`.
- `context/` is excluded from public Git commits.
- Resume is not published as a public download.

## Docs

- Architecture and rules: `AGENTS.md`
- Sitemap and content model: `docs/SITEMAP.md`
- Deployment notes: `DEPLOY-GITHUB-PAGES.md`
- Agent deploy helper: `skills/deploy/SKILL.md`
