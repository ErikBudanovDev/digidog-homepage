# DigiDog outreach service

Runs on the VPS at https://digidog-services.com (nginx → 127.0.0.1:3795, container `outreach`).
Sends 1:1 emails through the local Postfix (DKIM-signed), tracks clicks and opens, hosts the unsubscribe page and keeps the stop list.

- `POST /api/send` `{to, name?, subject, text, lead_id?, step?, country?, track_open?}` — links in `text` as `[label](https://…)`.
- `GET /api/status`, `GET /api/events?since=ISO`, `GET /api/messages?since=ISO`, `GET /api/suppressions`
- `POST /api/suppress {email, reason}` (use `@domain.com` to block a whole domain), `POST /api/mode {mode: "test"|"live"}`
- Public: `/r/<token>` click redirect, `/o/<id>.gif` open pixel, `/u/<token>` unsubscribe page (POST confirms; one-click header supported).

Safety: test mode only delivers to TEST_ALLOW addresses; daily cap; one send per address and step; stop list checked on every send.
All API calls need `Authorization: Bearer $OUTREACH_TOKEN` (token lives in `/opt/outreach/.env` on the VPS and `~/.config/digidog/outreach.env` on the MacBook; never commit it).
Opens are approximate (mail apps preload images); events within 45 s of sending or from scanners are marked `auto`.
