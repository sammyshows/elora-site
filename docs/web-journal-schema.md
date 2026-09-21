# Elora Web Guided Journal — Database Schema

Reference schema for the tables backing `elora.day/guided`. DDL is
provisioned **externally** (apply `elora-api/db/seed/*.sql` in your migration
process) — the API never creates or mutates schema at runtime.

Postgres (with `TIMESTAMPTZ`); `user_id` is intentionally **not** stored here —
web sessions are anonymous and the Supabase access token already identifies the
caller server-side.

---

## `web_journal_logs`

Funnel events. Kept intentionally minimal — `user_id`, `event_name`,
`created_at`. Step index, duration and metadata live in application logs, not
this table. `user_id` is a **client-owned device uuid v4** (rotated never;
`run_id` for a single journey lives in event metadata).

| Column       | Type        | Notes |
|--------------|-------------|-------|
| `id`         | `BIGSERIAL` | PK |
| `user_id`    | `TEXT`      | Device uuid v4, generated + stored by the client (localStorage) |
| `event_name` | `TEXT`      | One of the whitelisted funnel events |
| `created_at` | `TIMESTAMPTZ NOT NULL DEFAULT NOW()` | When the event occurred |

```sql
CREATE TABLE IF NOT EXISTS web_journal_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_web_journal_logs_user
  ON web_journal_logs (user_id);

CREATE INDEX IF NOT EXISTS idx_web_journal_logs_event_time
  ON web_journal_logs (event_name, created_at);
```

### Whitelisted event names

| Event | Emitted |
|---|---|
| `guided_session_start` | Session created (+ prompt assigned) |
| `guided_input_submitted` | Answer submitted (text/voice) |
| `guided_followup_presented` | Follow-up prompt generated (model latency logged in app logs) |
| `guided_synthesis_started` / `guided_synthesis_completed` | Summary generation |
| `save_prompt_viewed` | "Save this entry" CTA rendered |
| `auth_provider_clicked` | Google / Apple selected |
| `entry_claimed_success` / `entry_claimed_failed` | Account linking outcome |

### Client ingestion

`POST /web/guided-journal/log` accepts a batch of these events
(`{ user_id, events: [{ event_name, step_index, duration_ms, metadata }] }`).
The server validates `event_name` against the whitelist and persists only the
`(user_id, event_name)` pair; `created_at` is set by the database.

---

## `web_journal_prompts`

One row per **answered prompt** (opening + follow-ups), stored regardless of
whether the entry was later claimed. Used for funnel tracking and abuse
analysis.

| Column         | Type        | Notes |
|----------------|-------------|-------|
| `id`           | `BIGSERIAL` | PK |
| `user_id`      | `TEXT`      | Device uuid v4 (client-owned identity) |
| `run_id`       | `TEXT`      | Per-journey uuid (rotated per guided flow; also the journal entry id) |
| `prompt`       | `TEXT`      | The prompt that was shown |
| `prompt_index` | `INTEGER`   | 1-based answer order within the session |
| `answer`       | `TEXT`      | The user's answer |
| `created_at`   | `TIMESTAMPTZ NOT NULL DEFAULT NOW()` | |

```sql
CREATE TABLE IF NOT EXISTS web_journal_prompts (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  run_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  prompt_index INTEGER NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, run_id, prompt_index)
);

CREATE INDEX IF NOT EXISTS idx_web_journal_prompts_session
  ON web_journal_prompts (user_id);

CREATE INDEX IF NOT EXISTS idx_web_journal_prompts_created
  ON web_journal_prompts (created_at);
```

Writes are idempotent (`INSERT … ON CONFLICT (user_id, run_id, prompt_index) DO NOTHING`), so a re-sent follow-up or the final synthesis write never duplicates an answer, and a device can run the guided flow multiple times (each run has its own `run_id`).

---

## Related configuration

- Table/event constants: `elora-api/src/web-journal/web.journal.types.ts`
- Insert logic: `elora-api/src/web-journal/web-journal.logger.ts`
- Provisioning DDL: `elora-api/db/seed/web_journal_logs.sql`, `elora-api/db/seed/web_journal_prompts.sql`
- API routes: `elora-api/src/web-journal/web-journal.controller.ts`