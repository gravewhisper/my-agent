# My Pi setup

My Pi config, versioned so a new machine can go from empty to familiar in one command.

**Live path:** `~/.pi/agent`  
**Repo:** `https://github.com/gravewhisper/my-agent`

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/gravewhisper/my-agent/master/install.sh | bash
```

It will:
- install Pi if needed
- back up an existing `~/.pi/agent`
- clone this repo
- install packages from `settings.json`

Then run:

```bash
pi
```

And inside Pi:

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

These do not get synced:
- `auth.json`
- `sessions/`

## Want to inspect the installer first?

```bash
curl -fsSL -o install.sh https://raw.githubusercontent.com/gravewhisper/my-agent/main/install.sh
less install.sh
bash install.sh
```
