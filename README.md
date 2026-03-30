# My Pi setup

My Pi config, versioned so a new machine can go from empty to familiar in one command.

**Live path:** `~/.pi/agent`  
**Repo:** `https://github.com/gravewhisper/my-agent`

## Install

### One-command install

```bash
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | bash
```

It will:
- install missing base dependencies automatically on Arch Linux
- install Pi if needed
- back up an existing `~/.pi/agent`
- clone this repo
- install packages from `settings.json`
- install `greprip` if `grg` / `fnd` are missing after the base dependencies are available

Then run:

```bash
pi
```

And inside Pi:

```text
/login
```

## New machine setup

Use this when setting up a freshly cloned repo on a new macOS or Linux machine where the required tools may not already be installed.

### What needs to exist

This setup expects:
- `git`
- `curl`
- `npm`
- `python3`
- `uv`
- `ripgrep` (`rg`)
- `fd` (`fd`)
- Pi itself (`pi`)
- `greprip` (`grg` and `fnd`)

Notes:
- `install.sh` can automatically install missing base dependencies on Arch Linux via `pacman`, then installs Pi if `pi` is missing.
- `settings.json` uses a shell prefix that routes `grep` to `grg` and `find` to `fnd`, so `greprip` must also be installed on the machine.
- `install.sh` also installs `greprip` automatically when `grg` or `fnd` are missing.
- Make sure the directory used by `uv tool install` is on your `PATH` (commonly `~/.local/bin`).

### macOS

Install system dependencies:

```bash
# Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Required tools
brew install git node python uv ripgrep fd
```

Then install this Pi setup:

```bash
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | bash
```

`install.sh` should also install `greprip` automatically on Arch only; on macOS install it manually:

```bash
uv tool install git+https://github.com/kaofelix/greprip
```

If `grg` or `fnd` are not found after install, add the uv tool bin dir to your shell config and restart your shell:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Linux (Arch)

Install system dependencies:

```bash
sudo pacman -Syu --needed git curl nodejs npm python uv ripgrep fd
```

Make sure your local bin directory is on `PATH` so `uv tool install` binaries like `grg` and `fnd` are available:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Then install this Pi setup:

```bash
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | bash
```

`install.sh` should also install `greprip` automatically. If you ever need to install it manually:

```bash
uv tool install git+https://github.com/kaofelix/greprip
```

### Manual setup immediately after cloning

If you clone the repo yourself instead of using the one-command installer:

```bash
git clone https://github.com/gravewhisper/my-agent ~/.pi/agent
cd ~/.pi/agent
```

Then do the following on a fresh machine:

1. Install base dependencies for your OS: `git`, `curl`, `npm`, `python3`, `uv`, `rg`, and `fd`.
2. Install Pi if needed:
   ```bash
   npm install -g @mariozechner/pi-coding-agent
   ```
3. Install the configured Pi packages from `settings.json`:
   ```bash
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
   ```
4. Install `greprip`:
   ```bash
   uv tool install git+https://github.com/kaofelix/greprip
   ```
5. Verify the wrappers exist:
   ```bash
   command -v grg
   command -v fnd
   ```
6. Start a new Pi session:
   ```bash
   pi
   ```
7. Inside Pi, authenticate if needed:
   ```text
   /login
   ```

### Sanity checks

After setup, these should work:

```bash
pi --version
rg --version
fd --version
command -v grg
command -v fnd
```

In a fresh Pi session, the shell overrides from `settings.json` should also be active:

```bash
type grep
type find
```

## Update

```bash
cd ~/.pi/agent
git add .
git commit -m "update pi setup"
git push
```

## Local-only

These do not get synced:
- `auth.json`
- `sessions/`

## Want to inspect the installer first?

```bash
curl -fsSL -o install.sh https://raw.githubusercontent.com/gravewhisper/my-agent/main/install.sh
less install.sh
bash install.sh
```
