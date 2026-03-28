#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/gravewhisper/my-agent"
TARGET_DIR="${PI_CODING_AGENT_DIR:-$HOME/.pi/agent}"
BACKUP_DIR="${TARGET_DIR}.bak.$(date +%Y%m%d-%H%M%S)"

if ! command -v git >/dev/null 2>&1; then
  echo "error: git is required" >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "error: npm is required" >&2
  exit 1
fi

if ! command -v pi >/dev/null 2>&1; then
  npm install -g @mariozechner/pi-coding-agent
fi

mkdir -p "$(dirname "$TARGET_DIR")"

if [ -e "$TARGET_DIR" ]; then
  mv "$TARGET_DIR" "$BACKUP_DIR"
  echo "Backed up existing Pi config to: $BACKUP_DIR"
fi

git clone "$REPO_URL" "$TARGET_DIR"

if [ -f "$TARGET_DIR/settings.json" ]; then
  python3 - "$TARGET_DIR/settings.json" <<'PY'
import json, subprocess, sys
path = sys.argv[1]
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)
for pkg in data.get('packages', []):
    src = pkg['source'] if isinstance(pkg, dict) else pkg
    print(f"Installing {src}...")
    subprocess.run(['pi', 'install', src], check=True)
PY
fi

echo
echo "Done."
echo "Next step: run 'pi' and then /login (or set your API keys)."
