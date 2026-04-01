# AGENTS.md

This repository is the canonical source for `https://dzungtri.github.io/`.

## Repo purpose

- Personal profile
- Daily/weekly blog writing
- Easy GitHub Pages deployment

## Structure

- `_config.yml`: Jekyll site config
- `_data/profile.json`: global profile data and homepage sections
- `_includes/profile.md`: profile narrative content
- `_posts/*.{md,html}`: blog posts and archive content
- `_layouts/`: Jekyll layouts
- `_pages/`: static pages like `about` and `projects`
- `assets/posts/`: post-local CSS and JS for HTML/interactive posts
- `assets/site/`: CSS and JS for the public site
- `public/`: generated output (do not edit by hand)
- `scripts/new-post.mjs`: generate new post template
- `scripts/deploy.sh`: build, commit, push helper
- `skills/deploy/SKILL.md`: deploy quick guide for coding agents
- `context/`: private source materials (local only; never publish)

## Commands

- Build: `npm run build`
- New post: `npm run new:post -- "Post title"`
- New HTML post: `npm run new:post -- --format html "Post title"`
- Preview: `npm run preview`
- Quick deploy: `npm run deploy:quick -- "content: update"`
- Update GitHub owner in remotes: `npm run sync:owner`

## Post authoring guide

- Prefer Markdown for normal writing: create `_posts/YYYY-MM-DD-slug.md`.
- Use HTML posts only when you need custom markup or page-scoped JS/CSS: create `_posts/YYYY-MM-DD-slug.html` with front matter and `layout: post`.
- Keep HTML post assets in `assets/posts/<slug>/`.
- Reference HTML post assets with front matter:
  - `post_styles` for CSS files
  - `post_scripts` for JS files
- For JS-heavy or custom-markup posts, add `search_summary` and `search_content` so search index text stays clean.
- Do not put post-specific JS into `assets/site/app.js` unless the behavior is truly shared across multiple pages.

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
