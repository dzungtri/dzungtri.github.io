#!/usr/bin/env bash
set -euo pipefail

MESSAGE="${1:-site: update profile and blog content}"

npm run build
git add -u
git add \
  .github/workflows/deploy-pages.yml \
  .gitignore \
  AGENTS.md \
  DEPLOY-GITHUB-PAGES.md \
  README.md \
  content \
  docs \
  package.json \
  package-lock.json \
  scripts \
  site \
  skills \
  context/README.md

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "$MESSAGE"
git push origin main
