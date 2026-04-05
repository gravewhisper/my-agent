#!/usr/bin/env sh
set -eu

REPO_URL="https://github.com/gravewhisper/my-agent"
TARGET_DIR="${PI_CODING_AGENT_DIR:-$HOME/.pi/agent}"
BACKUP_DIR="${TARGET_DIR}.bak.$(date +%Y%m%d-%H%M%S)"
LOCAL_BIN="$HOME/.local/bin"

export PATH="$LOCAL_BIN:$PATH"

need_cmd() {
  command -v "$1" >/dev/null 2>&1
}

require_cmds() {
  missing=""

  for cmd in git python3 pi uv rg fd grg fnd; do
    if ! need_cmd "$cmd"; then
      missing="$missing $cmd"
    fi
  done

  if [ -z "$missing" ]; then
    return 0
  fi

  echo "error: missing required tools:${missing}" >&2
  echo "error: install the prerequisites from README.md first, then rerun install.sh" >&2
  exit 1
}

validate_install() {
  failed=0

  echo
  echo "Validation:"

  if need_cmd pi; then
    echo "- pi: ok"
  else
    echo "- pi: missing"
    failed=1
  fi

  if need_cmd grg; then
    echo "- grg: ok"
  else
    echo "- grg: missing"
    failed=1
  fi

  if need_cmd fnd; then
    echo "- fnd: ok"
  else
    echo "- fnd: missing"
    failed=1
  fi

  if [ -d "$TARGET_DIR" ]; then
    echo "- repo: ok ($TARGET_DIR)"
  else
    echo "- repo: missing ($TARGET_DIR)"
    failed=1
  fi

  if [ -f "$TARGET_DIR/settings.json" ]; then
    echo "- settings.json: ok"
  else
    echo "- settings.json: missing"
    failed=1
  fi

  if [ "$failed" -ne 0 ]; then
    echo
    echo "Install finished with validation errors." >&2
    exit 1
  fi
}

require_cmds

mkdir -p "$(dirname "$TARGET_DIR")"
mkdir -p "$LOCAL_BIN"

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

validate_install

echo
if ! printf '%s' ":$PATH:" | grep -q ":$LOCAL_BIN:"; then
  echo "Note: add $LOCAL_BIN to your PATH if grg/fnd are not found in new shells."
fi

echo
printf '%s
' \
  "Done." \
  "Next:" \
  "- run: pi" \
  "- inside Pi: /login" \
  "- verify wrappers: type grep && type find"
