#!/usr/bin/env python3
import json, pathlib
CONTENT = r'''
**Quick answer**: The GitHub MCP Server is GitHub's official open-source server that lets AI assistants like Claude, Cursor and GitHub Copilot read repositories, manage issues and pull requests, and check GitHub Actions through natural language. The fastest setup is the hosted remote server at `https://api.githubcopilot.com/mcp/`: one click in VS Code, one `claude mcp add` command in Claude Code, or a JSON block in Cursor. Claude Desktop uses the local Docker image. You need a GitHub account and, outside VS Code, a fine-grained personal access token. Setup takes 5 minutes.

## What Is the GitHub MCP Server?

The GitHub MCP Server connects AI tools to GitHub through the [Model Context Protocol](/blog/what-is-mcp-model-context-protocol), the open standard AI assistants use to call external tools. Once connected, you can ask your assistant things like "list the open PRs waiting for my review", "why did last night's CI run fail?" or "create an issue for the login bug with these repro steps", and it does the work through GitHub's API instead of you clicking through the UI.

It is maintained by GitHub itself in the [github/github-mcp-server](https://github.com/github/github-mcp-server) repository under the MIT license.

## The Numbers Behind It

The official repository has passed **32,000 GitHub stars and 4,800 forks** ([github/github-mcp-server](https://github.com/github/github-mcp-server)), which puts it among the most-used MCP servers in existence. Two dates matter for anyone following older tutorials:

- **April 2025** — the original npm package `@modelcontextprotocol/server-github` was deprecated ([GitHub installation guides](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/README.md)). If a guide tells you to `npx` it, the guide is out of date.
- **June 12, 2025** — GitHub launched the hosted remote server in public preview ([GitHub Changelog](https://github.blog/changelog/2025-06-12-remote-github-mcp-server-is-now-available-in-public-preview)); it became generally available on **September 4, 2025**.

GitHub's own pitch for the remote version is that you skip local installs entirely and "new updates are applied automatically." For most people that makes remote the right default.

## Remote or Local: Which One?

| | Remote (hosted by GitHub) | Local (Docker or binary) |
|---|---|---|
| Install | None — paste a URL | Docker image or Go binary |
| Updates | Automatic | You pull new versions |
| Auth | OAuth (VS Code) or PAT | OAuth or PAT |
| Extra tools | Copilot coding agent, Copilot Spaces | — |
| GitHub Enterprise Server | Not supported | Supported |
| Best for | Claude Code, Cursor, VS Code | Claude Desktop, GHES, air-gapped setups |

## Step 1: Create a Fine-Grained Personal Access Token

Skip this step only if you use VS Code with OAuth.

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Repository access:** pick *only the repositories* you want the AI to touch. Don't choose "All repositories" on day one.
3. **Permissions:** Contents (read), Issues (read and write), Pull requests (read and write), Metadata (read). Add Actions (read) if you want CI questions answered.
4. Set an expiry (90 days is sensible) and copy the token.

Treat it like a password: never commit it, never paste it into a chat.

## Step 2: Connect Your AI Tool

### Claude Code

One command in your terminal:

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer YOUR_GITHUB_PAT"
```

Run `/mcp` inside Claude Code to confirm GitHub shows as connected. The same command works in the VS Code integrated terminal if you use the Claude Code extension ([Claude Code docs](https://code.claude.com/docs/en/vs-code)).

### Claude Desktop

Claude Desktop runs the official Docker image locally. Make sure Docker Desktop is running, then open the config file:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_PAT" }
    }
  }
}
```

Fully quit and restart Claude Desktop. The GitHub tools appear under the tools icon in a new chat.

### Cursor

Add this to `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project):

```json
{
  "mcpServers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": { "Authorization": "Bearer YOUR_GITHUB_PAT" }
    }
  }
}
```

Open **Cursor Settings → MCP** and check that the server shows a green status.

### VS Code with GitHub Copilot

Use the **Install in VS Code** button in the official README, or add this to `.vscode/mcp.json`:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

Note the key is `servers`, not `mcpServers`. You need VS Code 1.101 or later; the first run opens a browser window for OAuth, so no token is needed. Switch Copilot Chat to **Agent mode** to use the tools.

## Step 3: Limit What the AI Can Do (Toolsets)

By default the server enables five toolsets: **context, repos, issues, pull_requests and users**. That is a sensible start. More tools is not better: every tool description eats context and makes the model more likely to pick the wrong one.

With the local server you control this precisely:

```bash
# Only what you need
GITHUB_TOOLSETS="repos,issues,pull_requests,actions" ./github-mcp-server

# Look but don't touch
./github-mcp-server --read-only
```

Available toolsets include `actions`, `code_security`, `dependabot`, `discussions`, `notifications`, `projects`, `secret_protection` and more. For the remote server, the same controls are set through URL paths and headers described in GitHub's remote server documentation.

Our recommendation: run **read-only for the first week**. You will learn what the assistant actually does with GitHub before it can open, close or merge anything.

## 7 Things Worth Asking It on Day One

1. "Which pull requests are waiting for my review, oldest first?"
2. "Summarize what changed in `main` this week."
3. "Why did the last failed workflow run in `api` fail? Show the relevant log lines."
4. "List open Dependabot alerts across my repos, highest severity first."
5. "Create an issue in `web` titled 'Checkout button unresponsive on Safari' with these steps: …"
6. "Find where we call the Stripe API and list the files."
7. "Draft release notes from the PRs merged since tag v2.3.0."

Items 1–4 are read-only and a good first test.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `401 Bad credentials` | Expired or mistyped token | Generate a new fine-grained token and replace it |
| AI "can't find" a repo | Token doesn't include that repository | Edit the token's repository access |
| Claude Desktop shows no GitHub tools | Docker not running, or app not fully restarted | Start Docker Desktop, quit Claude completely, reopen |
| `docker: pull access denied` | Stale ghcr.io login | `docker logout ghcr.io`, try again |
| Tutorial says `npx @modelcontextprotocol/server-github` | Package deprecated in April 2025 | Use the remote URL or the Docker image |
| Model picks wrong tools, slow answers | Too many toolsets enabled | Reduce to the toolsets you actually use |

## Where It Fits in an AI Operations Setup

GitHub MCP is most useful when it is not alone. Paired with the [Slack MCP Server](/blog/slack-mcp-server-setup-guide), an assistant can post a daily summary of stuck pull requests to your team channel. Paired with a project board, it can turn bug reports into issues without anyone copy-pasting. If you are deciding what should be an MCP server versus a simple instruction file, read [Claude Skills vs MCP Servers](/blog/claude-skills-vs-mcp-servers).

**Related guides:** [Claude Skills vs MCP Servers](/blog/claude-skills-vs-mcp-servers) · [Slack MCP Server setup](/blog/slack-mcp-server-setup-guide) · [Supabase MCP Server setup](/blog/supabase-mcp-server-setup-guide) · [Playwright MCP Server setup](/blog/playwright-mcp-server-complete-guide)

## Frequently Asked Questions

### Is the GitHub MCP Server free?
Yes. The server is open source under the MIT license, and the hosted remote server is free to use with a GitHub account. Some remote-only tools, such as the Copilot coding agent, require a Copilot plan.

### Remote or local — which should I use?
Remote, unless you use Claude Desktop, GitHub Enterprise Server, or need to run in an isolated network. Remote needs no install and updates automatically.

### Is it safe to give an AI access to my repositories?
It is as safe as the token you give it. Use a fine-grained token limited to specific repositories, grant only the permissions you need, set an expiry, and start in read-only mode.

### Does it work with private repositories?
Yes, if your token (or OAuth grant) includes those repositories.

### Can it work with GitHub Enterprise?
GitHub Enterprise Cloud with data residency (ghe.com) works with the remote server using your enterprise URL. GitHub Enterprise Server needs the local server with the `GITHUB_HOST` setting.

### Why do old tutorials use npx?
They refer to `@modelcontextprotocol/server-github`, which was deprecated in April 2025 when GitHub took over the official server. Use the remote URL or the Docker image instead.

If you want GitHub, Slack and your other tools wired into one AI workflow for your team, see our [AI Integration service](/services/ai-integration) or [book a free consultation](https://calendly.com/erik-budanov/beratungsgespraech).
'''
FAQS = [
 ("What is the GitHub MCP Server?", "The GitHub MCP Server is GitHub's official open-source Model Context Protocol server. It lets AI assistants such as Claude, Cursor and GitHub Copilot read repositories, manage issues and pull requests, and inspect GitHub Actions runs through natural language."),
 ("Is the GitHub MCP Server free?", "Yes. It is open source under the MIT license and the hosted remote server at api.githubcopilot.com/mcp/ is free with a GitHub account. Some remote-only tools, such as the Copilot coding agent, require a Copilot plan."),
 ("Should I use the remote or local GitHub MCP Server?", "Use the remote server unless you use Claude Desktop, GitHub Enterprise Server, or an isolated network. The remote server needs no installation and updates automatically; it became generally available on September 4, 2025."),
 ("How do I add the GitHub MCP Server to Claude Code?", "Run: claude mcp add --transport http github https://api.githubcopilot.com/mcp/ --header \"Authorization: Bearer YOUR_GITHUB_PAT\" and check the connection with /mcp inside Claude Code."),
 ("Is it safe to give an AI access to my GitHub repositories?", "Use a fine-grained personal access token limited to specific repositories, grant only the permissions you need, set an expiry date, and start with read-only mode for the first week."),
 ("Why do older tutorials use npx @modelcontextprotocol/server-github?", "That npm package was deprecated in April 2025 when GitHub took over the official server. Use the remote URL or the ghcr.io/github/github-mcp-server Docker image instead."),
]
def ts(s): return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
entry = "  {\n" \
 '    slug: "github-mcp-server-setup-guide",\n' \
 '    /* Published: 2026-09-22 | Status: PUBLISHED */\n' \
 '    title: "GitHub MCP Server: Setup Guide for Claude Code, Claude Desktop, Cursor & VS Code (2026)",\n' \
 '    metaTitle: "GitHub MCP Server Setup: Claude, Cursor & VS Code",\n' \
 '    metaDescription:\n      "Set up GitHub\'s official MCP server in 5 minutes. Exact configs for Claude Code, Claude Desktop, Cursor and VS Code, safe token scopes, toolsets and fixes.",\n' \
 '    excerpt:\n      "GitHub\'s official MCP server lets Claude, Cursor and Copilot read repos, manage issues and PRs, and debug CI. Exact setup for every client, safe token scopes, and the fixes for what breaks.",\n' \
 "    content: `" + ts(CONTENT) + "`,\n" \
 '    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1080&q=80",\n' \
 '    tag: "AI Integration",\n    category: "ai",\n    author: "Erik Budanov",\n    date: "2026-09-22",\n    readTime: "8 min read",\n' \
 '    keywords: ["github mcp server", "github mcp", "github mcp server claude code", "github mcp server cursor", "github mcp server vs code", "github mcp server setup", "github remote mcp server"],\n' \
 "    faqs: [\n" + "".join(f"      {{ question: {json.dumps(q)}, answer: {json.dumps(a)} }},\n" for q, a in FAQS) + "    ],\n  },\n"
p = pathlib.Path("src/lib/blog-data.ts"); s = p.read_text()
assert 'slug: "github-mcp-server-setup-guide"' not in s
start = s.index("export const blogPosts: BlogPost[] = [")
end = s.index("\n];", start)
s = s[:end] + "\n" + entry.rstrip("\n") + s[end:]
p.write_text(s); print("inserted", len(CONTENT.split()), "words")
