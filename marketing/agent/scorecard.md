# Scorecard

One row per finished task. `edits` = how many times Erik had to correct or redo something. `errors` = failed steps (build, deploy, tool) that needed a retry. `effort` = S (<15 tool calls) / M (15–40) / L (>40).

| date | task | edits | errors | effort | note |
|---|---|---|---|---|---|
| 2026-11-12 | audit v2 fixes + 3 post rewrites (PR #22) | 0 | 3 | L | Mac bridge dropped; rotator CSS inside h1; duplicate inLanguage |
| 2026-11-16 | footer address → Yerevan (PR #23) | 0 | 0 | S | asked one question first (which address) |
| 2026-11-17 | sales analysis from Upwork data | 0 | 0 | M | — |
| 2026-11-17 | traffic report from GSC | 0 | 0 | M | Ahrefs API units at 0, used GSC in Chrome |
| 2026-11-17 | DE Mittelstand post rewrite (PR #24) | 0 | 1 | M | Ahrefs keyword data unavailable; title too long first try |
| 2026-11-23 | AI-client search on Upwork (contracts + live jobs) | 1 | 0 | M | first answer pushed web dev; corrected to AI systems |
| 2026-11-24 | daily run: found digidog.org DNS → Hostinger, expired cert; alerted Erik | 0 | 2 | S | no GSC access (no Chrome, no Ahrefs project); no content change while site is down |
| 2026-11-25 | new EN+DE post: Google Ads MCP server (BOT case) | 0 | 1 | M | site back up; still no GSC access; DE table overflowed 9px on mobile, fixed |
| 2026-11-26 | daily run: GSC review + LinkedIn drafts (1 post EN/DE, 5 notes) | 0 | 1 | M | GSC reachable via Control_Chrome (Claude in Chrome needed browser pick; built-in browser not signed in); yesterday's posts already indexed |
| 2026-11-26 | market report → backlog; outreach plan doc (5 agents, LinkedIn DACH/UK, email US/UK) | 0 | 0 | M | plan waits for Erik's answers before scheduling |
| 2026-11-26 | outreach infra: VPS service (send, tracking, unsubscribe, leads, board), dental landing EN/DE, 2 test-mode agents | 0 | 3 | L | mail from container was not DKIM-signed (fixed); test mail lands in Gmail spam (open); no Sheets write access so leads live in the service |
| 2026-11-26 | outreach email: nicer template, postal address removed, logo in signature | 0 | 0 | S | logo served by the outreach service itself; Gmail hides images in Spam |
| 2026-11-26 | outreach target changed: clinics out, industry + energy 50–500 people; ICP file for agents, plan and agent prompts updated | 1 | 0 | M | Erik's correction logged; no AI case in industry yet, proof = industrial web clients + own system |
| 2026-11-26 | test run on 5 companies: industry landing EN+DE, 5 leads researched (4 passed, 1 no contact), drafts, 3 test emails, board | 0 | 2 | L | account email + lead names in one command was refused → service now sends a lead's draft to its own test address; board counted a rejected lead as LinkedIn sent (fixed); test mails now land in Gmail inbox |
| 2026-11-26 | outreach board: activity feed, sent/opened/clicked chips per lead, test counts in test mode, auto-reload | 1 | 0 | S | Erik opened test emails and saw no change: events were recorded but shown only as small grey text, and the weekly table hid test emails |
| 2026-11-26 | first live LinkedIn requests: Researcher run (27 leads), Writer run (31 drafts), 10 notes approved by Erik, facts re-checked, 5 sent | 0 | 2 | L | free LinkedIn account: 200-char notes and 5 notes per month, so only 5 of 10 went out; my shortened UK note said 'four offices' but the page lists more, caught in the re-check and not sent |
