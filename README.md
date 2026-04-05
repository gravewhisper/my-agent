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

- `uv`
- `ripgrep` (`rg`)
- `fd`
- `grg` and `fnd`
- `~/.local/bin` on `PATH`

## Fresh machine setup

### macOS

```bash
brew install uv ripgrep fd
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
sudo pacman -Syu --needed uv ripgrep fd
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | bash
```

If `grg` or `fnd` are missing:

```bash
uv tool install git+https://github.com/kaofelix/greprip
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
