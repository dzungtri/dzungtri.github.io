#!/usr/bin/env bash
set -euo pipefail

MESSAGE="${1:-content: update profile and blog content}"

npm run build

git add -u
git add \
  .github/workflows/deploy-pages.yml \
  .gitignore \
  404.md \
  AGENTS.md \
  Gemfile \
  README.md \
  _config.yml \
  _data \
  _includes \
  _layouts \
  _pages \
  _posts \
  assets \
  blog \
  docs \
  index.html \
  package.json \
  scripts \
  skills \
  context/README.md

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "$MESSAGE"
git push origin main
