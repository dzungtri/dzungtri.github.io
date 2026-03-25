# Sitemap and Content Model

## Public routes

- `/` : executive profile homepage
- `/writing/` : writing archive + search
- `/blog/` : redirect to `/writing/`
- `/posts/<slug>/` : single post page
- `/about/` : background and scope
- `/projects/` : representative work
- `/404.html` : not found fallback
- `/search-index.json` : generated client-side search index
- `/feed.xml` : RSS feed

## Authoring sources

- `_config.yml` : global site config
- `_data/profile.json` : homepage/profile structured data
- `_includes/profile.md` : profile narrative markdown
- `_posts/*.md` : published posts
- `assets/site/site.css` : site styles
- `assets/site/app.js` : site interactions and search

## Private sources

- `context/private/resume/`
- `context/private/profile-drafts/`
- `context/private/notes/`

## Front matter format

```md
---
layout: post
title: Your title
date: YYYY-MM-DD
description: One paragraph summary
tags: tag1, tag2
---
```

## Publishing strategy

- Practical AI engineering notes
- CTO execution logs and delivery patterns
- Legacy modernization and reverse-engineering case notes
- Long-term archive of technical experiments and essays
