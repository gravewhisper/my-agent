# My Pi setup

Versioned Pi config for `~/.pi/agent`.

- Repo: `https://github.com/gravewhisper/my-agent`
- Provider/model: `openai-codex` / `gpt-5.4`
- Theme: `monokai-classic`
- Shell wrappers: `grep -> grg`, `find -> fnd`
- Pi packages:
  - `npm:pi-powerline-footer`
  - `npm:pi-btw`
  - `npm:@danchamorro/pi-prompt-enhancer`
  - `npm:@ssweens/pi-handoff`

## Install

Install:

```bash
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | bash
```

`install.sh` installs missing Arch dependencies, installs Pi if needed, backs up an existing `~/.pi/agent`, clones this repo, installs packages from `settings.json`, and installs `greprip` if needed.

Then run:

```bash
pi
```

Inside Pi:

```text
/login
```

## Requirements

- `git`
- `curl`
- `npm`
- `python3`
- `uv`
- `rg`
- `fd`
- `grg` and `fnd`
- `~/.local/bin` on `PATH`

## Fresh machine setup

### macOS

```bash
# Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install git node python uv ripgrep fd
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | bash
```

If `grg` or `fnd` are missing:

```bash
uv tool install git+https://github.com/kaofelix/greprip
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Linux (Arch)

```bash
sudo pacman -Syu --needed git curl nodejs npm python uv ripgrep fd
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | bash
```

If `grg` or `fnd` are missing:

```bash
uv tool install git+https://github.com/kaofelix/greprip
```

## Manual setup after cloning

```bash
git clone https://github.com/gravewhisper/my-agent ~/.pi/agent
cd ~/.pi/agent
npm install -g @mariozechner/pi-coding-agent
python3 - ~/.pi/agent/settings.json <<'PY'
import json, subprocess, sys
path = sys.argv[1]
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)
for pkg in data.get('packages', []):
    src = pkg['source'] if isinstance(pkg, dict) else pkg
    print(f"Installing {src}...")
    subprocess.run(['pi', 'install', src], check=True)
PY
uv tool install git+https://github.com/kaofelix/greprip
pi
```

Then inside Pi:

```text
/login
```

## Update

```bash
cd ~/.pi/agent
git add .
git commit -m "update pi setup"
git push
```

## Local-only

- `auth.json`
- `sessions/`
