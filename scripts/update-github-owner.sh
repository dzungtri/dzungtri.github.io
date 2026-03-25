#!/usr/bin/env bash
set -euo pipefail

NEW_OWNER="${1:-dzungtri}"
ROOT_DIR="${2:-$HOME}"

echo "Scanning repositories under: $ROOT_DIR"
echo "New owner: $NEW_OWNER"

find "$ROOT_DIR" -name ".git" -type d -prune | while read -r gitdir; do
  repo_dir="$(dirname "$gitdir")"
  if ! git -C "$repo_dir" remote get-url origin >/dev/null 2>&1; then
    continue
  fi

  old_url="$(git -C "$repo_dir" remote get-url origin)"
  new_url="$old_url"
  new_url="${new_url/github.com:pysync\//github.com:${NEW_OWNER}/}"
  new_url="${new_url/github.com\/pysync\//github.com/${NEW_OWNER}/}"

  if [[ "$new_url" != "$old_url" ]]; then
    git -C "$repo_dir" remote set-url origin "$new_url"
    echo "Updated: $repo_dir"
    echo "  $old_url"
    echo "  -> $new_url"
  fi
done
