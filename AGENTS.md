# AGENTS.md

This repository is the canonical source for `https://dzungtri.github.io/`.

## Repo purpose

- Personal profile
- Daily/weekly blog writing
- Easy GitHub Pages deployment

## Structure

- `content/site.json`: global profile data and links
- `content/profile.md`: profile section content
- `content/posts/*.md`: blog posts (front matter + markdown)
- `scripts/build.mjs`: static site generator
- `scripts/new-post.mjs`: generate new post template
- `scripts/deploy.sh`: build, commit, push helper
- `site/`: static assets copied to `public/`
- `public/`: generated output (do not edit by hand)
- `skills/deploy/SKILL.md`: deploy quick guide for coding agents
- `context/`: private source materials (local only; never publish)

## Commands

- Build: `npm run build`
- New post: `npm run new:post -- "Post title"`
- Preview: `npm run preview`
- Quick deploy: `npm run deploy:quick -- "content: update"`
- Update GitHub owner in remotes: `npm run sync:owner`

## Commit and deploy rules

- Keep commits focused: one logical change per commit.
- For content updates, use prefix `content:`.
- For structure/build updates, use prefix `chore:` or `build:`.
- Deploy only from `main`.
- Do not edit generated files in `public/` manually.
- Always run `npm run build` before commit.
- Never expose private files in `context/`.
- Resume file is private context material, not a public download.

## Canonical repository URLs

- Main site: `https://github.com/dzungtri/dzungtri.github.io`
- Profile host: `https://dzungtri.github.io/`
- Example migrated repos:
- `https://github.com/dzungtri/sady`
- `https://github.com/dzungtri/japanese-dict-quiz`
