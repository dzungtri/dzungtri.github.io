# GitHub Pages Deployment

This repository deploys `https://dzungtri.github.io/` from one source of truth.

## Build and deploy model

- Source content: `content/`
- Static assets: `site/`
- Build script: `scripts/build.mjs`
- Generated output: `public/`
- Private materials: `context/` (ignored from Git)
- Deploy workflow: `.github/workflows/deploy-pages.yml`

## Local commands

```bash
npm run build
npm run preview
npm run deploy:quick -- "content: update"
```

## Repository settings

1. Repository name must be `dzungtri.github.io`.
2. In GitHub Pages settings, select `GitHub Actions`.
3. Push to `main` to trigger deploy.

## Daily writing flow

```bash
npm run new:post -- "Post title"
npm run build
git add content site scripts docs AGENTS.md README.md
git commit -m "content: add new post"
git push origin main
```
