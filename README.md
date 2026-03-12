# uni-search

A simple Node.js CLI to search websites directly from your terminal.

Available commands:

- `goo`: search on Google
- `yt`: search on YouTube
- `wiki`: search on Wikipedia (English)
- `uni`: utility command to manage custom search providers

## Requirements

- Node.js installed
- npm installed

Check your versions:

```bash
node -v
npm -v
```

## Installation

From the project root:

```bash
npm install
chmod +x bin/goo.js bin/yt.js bin/wiki.js bin/uni.js
npm install -g .
```

## Usage

After global installation, you can run the commands from any folder:

```bash
goo how to wake up early
yt godot tutorial
wiki china
```

## Adding new search providers

Use:

```bash
uni add <command> "<url-with-%s>"
```

Example with Bing:

```bash
uni add bing "https://www.bing.com/search?q=%s"
npm install -g .
bing my search
```

Example with DuckDuckGo:

```bash
uni add duck "https://duckduckgo.com/?q=%s"
npm install -g .
duck prompt engineering
```

Important rules:

- the command name must use letters, numbers, or `-`
- the URL must include `%s` (where the search query will be inserted)
- always run `npm install -g .` after adding a new provider

## Removing a search provider

Use:

```bash
uni remove <command>
```

Example:

```bash
uni remove bing
npm install -g .
```

Notes:

- base commands (`goo`, `yt`, `wiki`, `uni`) are protected
- to remove a protected command, use `--force`

Force example:

```bash
uni remove wiki --force
npm install -g .
```

## Local development (without global install)

You can run commands directly from `bin`:

```bash
node bin/goo.js "my search"
node bin/yt.js "godot tutorial"
```

## Updating global commands after changes

Whenever you change the CLI, reinstall globally:

```bash
npm install -g .
```

## Uninstalling global commands

```bash
npm uninstall -g uni-search
```
