#!/bin/bash
# Cloud sessions only: fetch the personal Claude config repo (outside this repo)
# and install its skills. Never fails the session; prints what happened.
set -uo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

CFG="$HOME/claude-config"
URL="https://github.com/kamchankang-git/claude"

if git -C "$CFG" rev-parse HEAD >/dev/null 2>&1; then
  git -C "$CFG" pull -q --ff-only >/dev/null 2>&1 || echo "claude-config: pull failed, using existing copy"
else
  rm -rf "$CFG" 2>/dev/null
  if ! git clone -q --depth 1 "$URL" "$CFG" >/dev/null 2>&1; then
    echo "claude-config: clone failed (is kamchankang-git/claude attached to this session?). Skipping skills."
    exit 0
  fi
fi

if [ -d "$CFG/.claude/skills" ]; then
  mkdir -p "$HOME/.claude/skills"
  cp -r "$CFG/.claude/skills/." "$HOME/.claude/skills/"
  echo "claude-config: $(ls "$CFG/.claude/skills" | wc -l) skills installed from kamchankang-git/claude; read ~/claude-config/CLAUDE.md and memory/MEMORY.md before work."
fi
exit 0
