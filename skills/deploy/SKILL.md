# Deploy Skill

Use this checklist when shipping profile/blog updates for `dzungtri.github.io`.

## Scope

- Repository: `https://github.com/dzungtri/dzungtri.github.io`
- Branch: `main`
- Host: GitHub Pages via Actions

## Steps

1. Validate content structure
- `content/site.json`
- `content/profile.md`
- `content/posts/*.md`

2. Build
- `npm run build`

3. Optional preview
- `npm run preview`

4. Commit and push
- `npm run deploy:quick -- "content: short message"`

5. Verify deployment
- Check latest workflow run in GitHub Actions
- Confirm live site `https://dzungtri.github.io/`

## Guardrails

- Never edit `public/` files manually.
- Never publish `context/` or resume source files.
- Keep one logical change per commit.
- Use clear commit prefixes: `content:`, `chore:`, `build:`.
