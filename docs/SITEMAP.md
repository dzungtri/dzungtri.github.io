# Sitemap and Content Model

## Public routes

- `/` : positioning, profile, brand pillars, recent work, latest posts
- `/blog/` : all posts + client-side search
- `/posts/<slug>/` : single post page
- `/404.html` : not found fallback
- `/sitemap.xml` : generated sitemap for indexing

## Authoring sources

- `content/site.json` : global profile data, links, repositories
- `content/profile.md` : profile section markdown
- `content/posts/*.md` : blog posts with front matter

## Private sources (never publish)

- `context/private/resume/`
- `context/private/profile-drafts/`
- `context/private/notes/`

Front matter format:

```md
---
title: Your title
date: YYYY-MM-DD
summary: One paragraph summary
tags: tag1, tag2
---
```

## Daily workflow

1. Create a draft: `npm run new:post -- "Post title"`
2. Edit generated markdown in `content/posts/`
3. Rebuild and preview: `npm run preview`
4. Commit and push: `npm run deploy:quick -- "blog: your message"`

GitHub Actions deploys automatically on push to `main`.

## Publishing strategy for personal brand

- Research notes: short insights from experiments, model behavior, and architecture tradeoffs
- CTO execution logs: team/process lessons, delivery patterns, and decision frameworks
- Case write-ups: what worked, what failed, and practical outcomes from real projects
- Monthly synthesis: strategic viewpoint on applied AI and engineering leadership
