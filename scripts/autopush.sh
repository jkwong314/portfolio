#!/bin/bash
cd /Users/jkwong/Desktop/claude/portfolio
git add -A
if ! git diff --cached --quiet; then
  git commit -m "Auto-save $(date '+%Y-%m-%d %H:%M')"
  git push origin main
fi
