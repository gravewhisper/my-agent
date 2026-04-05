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
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | sh
```

`install.sh` backs up an existing `~/.pi/agent`, clones this repo, and installs packages from `settings.json`.

Then run:

```bash
pi
```

Inside Pi:

```text
/login
```

## Requirements

- Pi (`pi`)
- `uv`
- `ripgrep` (`rg`)
- `fd`
- `grg` and `fnd`
- `~/.local/bin` on `PATH`

## Fresh machine setup

### macOS

```bash
brew install uv ripgrep fd
npm install -g @mariozechner/pi-coding-agent
uv tool install git+https://github.com/kaofelix/greprip
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | sh
```

### Linux (Arch)

```bash
sudo pacman -Syu --needed uv ripgrep fd
npm install -g @mariozechner/pi-coding-agent
uv tool install git+https://github.com/kaofelix/greprip
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | sh
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
