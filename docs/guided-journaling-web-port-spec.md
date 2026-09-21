# Elora Guided Journaling — Technical Specification & Web Porting Blueprint

**Target:** Frictionless, public web version of Guided Journaling on `elora.day`.
**Goal:** Anonymous users complete a 3-step reflection session, see their reflection card, then authenticate (Google / Apple) to persist + claim the session into their mobile account.

---

## 0. Architecture Map (as-built)

| Layer | Tech | Location |
|---|---|---|
| Mobile app | Expo SDK 57 / RN 19.2, TypeScript, Zustand, Reanimated 4.5, Supabase JS | `/Users/sammccarthy/code/elora` |
| Backend API | NestJS (Node), Postgres + pgvector, Deepgram, Anthropic (Claude), Voyage AI | `/Users/sammccarthy/code/elora-api` (port `3001`, Swagger at `/api`) |
| Auth | Supabase Auth (anonymous users + Google/Apple OAuth identity linking) | `elora-api` verifies JWT via service-role `getUser()` |
| Web (target) | Next.js 16 + Tailwind v4 + Framer Motion | `/Users/sammccarthy/code/elora-site` |

**Key architectural fact:** the entire guided journaling flow is already *anonymous-first and claimable*. The mobile app signs every new device in as a **Supabase anonymous user**, runs the guided session, and saves entries **bound to that anonymous `user_id`**. When the user later taps "Link with Google/Apple", the app calls `supabase.auth.linkIdentity()` which attaches the OAuth identity to that **same auth.users row — the `user_id` never changes**, so all entries are instantly "claimed". The web port can mirror this exact model instead of inventing a new one.

---

## 1. Guided Journaling State Machine & Flow

### 1.1 File map

| File | Role |
|---|---|
| `app/(tabs)/new-entry.tsx` (3,598 lines) | The entire guided composition screen: gateway → intro → pinned prompt → text/voice input → follow-ups → save |
| `app/journal-entry.tsx` | Read-only entry detail (reflection card: emoji, title, tags, AI summary, guided Q/A blocks) |
| `app/(tabs)/journal.tsx` | Journal list tab (entry cards) |
| `services/guidedPromptsCache.ts` | AsyncStorage cache (refresh-once-per-session) for 3 seed prompts |
| `services/api/guidedPrompts.ts` | API client for `/get-guided-prompts`, `/get-retrospective-prompts`, `/get-guided-prompt-followup` |
| `services/api/journal.ts` | API client for create/get/update entry + insights |
| `services/api/client.ts` | Authenticated fetch wrapper (injects Supabase `Bearer` JWT) |
| `services/journalDatabase.ts` | Local SQLite store + sync (offline-first) |
| `stores/useJournalStore.ts` | Zustand store for entries, sync flags, celebrations, link-prompt trigger |
| `types/journal.ts` | `JournalEntry`, `GuidedMessageStep` types |

### 1.2 State (all in `new-entry.tsx`)

```ts
type Mode = 'text' | 'voice' | 'mixed';

// guidedPromptMode: null = gateway, 'free' = traditional canvas,
// 'daily' | 'retrospective' = guided session  (line 472)
guidedPromptMode: GuidedPromptMode | 'free' | null

activePrompt: string | null       // prompt pinned at top, currently being answered
pendingPrompt: string | null      // prompt reserved before active commits
turns: { prompt: string; answer: string }[]   // completed Q/A pairs
promptLimitReached: boolean       // true when server says follow-ups are done
generatingFollowUp: boolean       // true while the next prompt is being generated
dailySeeds / retroSeeds: string[] // cached pool (async loaded on mount)
promptsOpen: boolean              // the "choose your prompt" chooser is open
introPrompt: string | null        // big centered prompt during the intro sequence
transitionMode: GuidedPromptMode | null  // intro animation in flight
methodSelected: boolean           // entry has opened (mic/text visible)
mode: Mode                        // last-used input mode (persisted in `last_entry_mode`)
```

### 1.3 Stage machine

```
GATEWAY ──(tap "Guided")──▶ INTRO ──(3.2s hold + lift)──▶ ENTRY (prompt pinned)
   │                                                        │
   └──(tap "Traditional")──▶ ENTRY (blank canvas)           │
                                                           ▼
                                            ANSWER (text | voice/STT streaming)
                                                           │
                                              (tap "Continue")
                                                           ▼
                                            FOLLOW-UP GEN (Reflecting…, ~1–3s)
                                                           │
                                              prompt swap animation
                                                           ▼
                                            NEXT PROMPT (max ~2 follow-ups)
                                                           │
                                              (tap "Finish & Save")
                                                           ▼
                          SAVE (local SQLite → POST /create-journal-entry → enrich)
                                                           ▼
                                      gateway reset (performCleanReset) + navigate to Journal tab
```

Visual (matching `handlePromptSelected`, `startModeTransition`, `continueGuided`):

```
(1) GATEWAY            (2) INTRO           (3) ENTRY          (4) TURNS
┌──────────────────┐   ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│   Start an entry │   │                │  │  *pinned card* │  │  *pinned card* │
│  What are you in │   │  "What is a    │  │ change prompt  │  │ change prompt  │
│  the mood for?   │   │   tiny moment  │  │ ┌────────────┐ │  │ ┌────────────┐ │
│ ┌──────────────┐ │   │   today that…" │  │ │ textarea   │ │  │ │ new prompt │ │
│ │ 🤖 Guided    │ │   │   (centered)   │  │ └────────────┘ │  │ │ (springs in)│ │
│ └──────────────┘ │   └────────────────┘  │   [🎤]          │  └────────────┘ │
│      or          │                       │                 │  ┌────────────┐ │
│ ┌──────────────┐ │                       │  ◉ Continue     │  │  textarea   │ │
│ │ ✏️ Traditional│ │                       │   Finish & Save │  └────────────┘ │
│ └──────────────┘ │                       └────────────────┘  │  Finish & Save│
└──────────────────┘                                           └────────────────┘
```

### 1.4 Step-by-step lifecycle

1. **Init (mount):** 3 async jobs — shuffle `PLACEHOLDER_PROMPTS` (rotating textarea placeholder, 3s cycle), load `getCachedGuidedPrompts()` + `getCachedRetrospectivePrompts()` (12h cache in AsyncStorage, keyed `guided_prompts_cache` / `retrospective_prompts_cache`), hydrate persisted draft (`journal_draft_content`, `pending_recording_uri`, `last_entry_mode`).
2. **Gateway:** two cards (`renderLandingCard`): **Guided** (`comment-ai` icon, sub "Best if you want inspiration") and **Traditional** (`pencil-ai` icon, "For when something's on your mind"), split by an "or" divider. `FadeUp` stagger: Guided delay 40ms, divider 120ms, Traditional 180ms.
3. **Guided intro (`startModeTransition`):**
   - `logUserAction(GUIDED_SELECTED)`.
   - Random prompt from merged pool (`getPromptPool` = `dailySeeds + retroSeeds`, else 3 random from the 20 `FALLBACK_PROMPTS`).
   - Fade out landing cards 300ms → reveal prompt centered 420ms (400ms delay) → hold **2.8s** → translate up to pinned header slot 900ms `Easing.inOut(Easing.quad)`, fading in card chrome → `handlePromptSelected` commits + opens entry.
4. **Entry opens (`handlePromptSelected`):** pins prompt top (`introTranslateY → 0`), honors last-used input mode, fades content in 400ms, "change prompt" label fades in 200ms later. Alternatively the user taps a prompt directly on the chooser — same pinning, no intro.
5. **Answer input:**
   - **Text:** multiline input, keyboard-safe layout (`KeyboardAvoidingView`, iOS/Android listeners).
   - **Voice:** `useAudioRecorder` (file record via `expo-audio` `RecordingPresets.HIGH_QUALITY`) OR streaming `useLiveTranscription` (16kHz PCM mic → WebSocket → Deepgram). Streaming shows live interim transcript + a Skia-drawn waveform. See §3.
6. **Continue (`continueGuided`):**
   - Guard: requires non-empty trimmed content, not already generating.
   - `POST /get-guided-prompt-followup` with `{ mode, promptCount: turns.length + 1, currentPrompt: activePrompt, response: answer, conversationHistory: turns }`.
   - On success: push `{ prompt: activePrompt, answer }` to `turns`, clear content, `setPromptLimitReached(response.promptLimitReached)`.
   - **Prompt swap animation:** old card fades 180ms + scales 0.8 → text swapped → new card fades 260ms + **springs in with `friction: 5, tension: 40`** (bouncy overshoot) + iOS haptic tick.
   - Server returns `promptLimitReached: true` once `promptCount >= 2`, i.e. after the **2nd follow-up answer** (~3 prompts total: 1 seed + 2 follow-ups). `handleAskAnother()` resets the flag so the user can ask for more.
7. **Save (`handleSave`):**
   - Guided entries are flattened for the `content` column (`flattenGuidedContent`): each turn becomes `**Prompt:** {prompt}\n{answer}`, turns joined with `\n\n---\n\n`; the in-flight answer is folded into the current block.
   - `guidedEntry: GuidedMessageStep[]` = `[...turns, { prompt, answer }]` (or `turns` alone if nothing pending).
   - Write local SQLite first (`addEntryToDatabase`, `unsynced: true`), then `POST /create-journal-entry` (server returns `title`, `emoji`, `userSummary`, `aiSummary`, `tags`, `guidEntry`, timestamps — written back into SQLite + store), `fetchEntries()`, `performCleanReset()`, `router.push('/(tabs)/journal')`.
   - Post-save bookkeeping: refresh prompt cache (new options next session), first-entry / weekly-goal celebrations, and for anonymous users at ≥4 entries the **LinkAccountPromptModal** is triggered (`pendingLinkPrompt`).

### 1.5 Web port mapping (state machine)

- Model as a React state machine identical to §1.2. No server round-trip needed for seed prompts if you accept the one extra call: **seed prompts are fully static on the server** (see §2.1) — for web, cache them in the browser (`localStorage`/sessionStorage) exactly like `guidedPromptsCache.ts`, keyed per-day.
- Persist the session **before auth** in the browser so a refresh/OSS stride doesn't lose the entry: keep `{ sessionId, turns, activePrompt, mode }` in sessionStorage, and on `Save` call `/create-journal-entry` with the **anonymous JWT** (see §5.4 claim flow).

---

## 2. AI Prompts, Prompt Architecture & Backend Endpoints

### 2.1 Seed prompt pools — static, no LLM call

The "opening question selection" is **not AI-generated**. `GET`-style `POST /get-guided-prompts` pulls 3 random prompts from a hardcoded merge of two pools:

`elora-api/src/common/prompts/guided-prompts.ts`
- `DAILY_GENERIC_PROMPTS` (62 strings) — daily reflection prompts.
- `RETROSPECTIVE_PROMPTS` (20 strings) — memory "chapter" anchors (bedroom at age ten, favorite hiding spot, etc.).
- `getRandomPrompts(pool, 3)` — Fisher–Yates-style shuffle + slice.
- A personalized tailored AI seed exists (`getTailoredDailySeedPrompt` + `getRecentContext`) but is **disabled in `getDailyPrompts()`** (commented as unused).
- The mobile client also carries 20 literal `FALLBACK_PROMPTS` (`new-entry.tsx:56`) used only when the cache is empty.

**Web impact:** replicate the pools server-side (backend unchanged) and cache the 3 returned strings client-side. $0 LLM cost.

### 2.2 Dynamic follow-up prompt

`POST /get-guided-prompt-followup` — `elora-api/src/journal/guided-prompt.service.ts`

**Temperature/model:** `AIService.sendToAnthropicAPIV2(prompt, 'haiku', 256, ...)` → model `claude-haiku-4-5-20251001`, `max_tokens: 256`. **No temperature is set** anywhere in `ai.service.ts`, so Anthropic's default (`temperature` 1.0) applies.

**Prompt templates** (`common/prompts/guided-prompts.ts`):
- `getDailyFollowUpPrompt(conversationHistory, currentPrompt, latestResponse)` — "empathetic, grounded personal reflection wingman". Rules: dig into emotional reality; plain warm English; **1–2 sentences max**; no greetings/affirmations/filler; **no em dashes**; output ONLY the question. Includes full Q/A history (`Q: …\nA: …` blocks).
- `getRetrospectiveFollowUpPrompt(...)` — "warm, perceptive personal biographer… excavation tool"; contrast past/present; no trivia; concise; no filler; no em dashes.

**Request schema (`guided-prompt.dto.ts`):**
```json
POST /get-guided-prompt-followup      // Bearer <anon-or-user JWT>
{
  "mode": "daily",                    // "daily" | "retrospective"
  "promptCount": 2,                   // 1-based count of completed prompts (min 1)
  "currentPrompt": "What was a tiny moment today...",
  "response": "I got annoyed at the coffee machine…",
  "conversationHistory": [            // optional, prior completed turns
    { "prompt": "…", "answer": "…" }
  ]
}
```
**Response:**
```json
{ "success": true, "nextPrompt": "…", "promptLimitReached": false }
```
`promptLimitReached = body.promptCount >= 2`.

### 2.3 Final synthesis / summary generation

This happens **inside `POST /create-journal-entry`**, not during the session. `elora-api/src/journal/journal.service.ts → createJournalEntry()`:

Concurrently (with `Promise.allSettled` so partial failures don't drop the entry):

| Step | Function | Model | Max tokens |
|---|---|---|---|
| Embedding | `AIService.getEmbeddings()` → Voyage `voyage-3-large`, 1024-d vector | Voyage | – |
| Summary JSON | `AIService.summarizeJournalEntry()` → `getSummarizeJournalEntryPrompt()` | `claude-sonnet-4-5-20250929` | 1024 |

Then:
1. `saveJournalEntry()` — transactional `INSERT` into `journal_entries` + `journal_entry_tags`.
2. **Async (non-blocking):** `ProfileService.updateUserProfile()` (fast model `claude-haiku-4-5-20251001`, 2000 tokens, prompt in `common/prompts/journal.ts::getUserProfileExtractionPrompt` — a large append-only plain-text profile updater) and graph node/edge extraction.
3. Returns the enriched row.

**Summary prompt result contract** (`getSummarizeJournalEntryPrompt`, `journal.ts:11`):
```json
{
  "title": "1-3 words capturing the core",
  "emoji": "one emoji that fits the mood",
  "userSummary": "1-2 sentences they'd want to remember",
  "aiSummary": "deeper patterns and insights...",
  "tags": ["3 keywords like Family, Anxiety, Growth"]
}
```
Language rule: keys in English, **values in the language of the entry**. Parsed via `parseAIResponseObject`.

**Create entry request/response:**
```json
POST /create-journal-entry
{
  "journalEntryId": "uuid (client-generated v4)",
  "chat": [{ "role": "user", "content": "<flattened guided content>" }],
  "timestamp": "2026-09-17T09:24:00.000Z",      // optional
  "guidedEntry": [{ "prompt": "…", "answer": "…" }]  // optional, guided only
}
```
```json
{
  "success": true,
  "entryId": "…", "message": "…",
  "title": "…", "emoji": "…", "userSummary": "…", "aiSummary": "…",
  "tags": ["…"], "guidedEntry": [{"prompt":"…","answer":"…"}],
  "timestamp": "…", "created_at": "…", "updated_at": "…"
}
```

### 2.4 Full endpoint inventory (authenticated unless noted)

| Method/Path | Body → Response |
|---|---|
| `POST /get-guided-prompts` | `{}` → `{ success, prompts: string[3] }` (static pool) |
| `POST /get-retrospective-prompts` | `{}` → `{ success, prompts: string[3] }` (compat) |
| `POST /get-guided-prompt-followup` | §2.2 |
| `POST /create-journal-entry` | §2.3 |
| `POST /get-journal-entries` | `{}` → `{ success, data: JournalEntry[] }` (LIMIT 100, `ORDER BY timestamp DESC`; `tags` via `array_agg` join) |
| `POST /get-journal-entry` | `{ journalEntryId }` |
| `POST /update-journal-entry` | `{ journalEntryId, title, emoji }` |
| `POST /delete-journal-entry` | `{ journalEntryId }` |
| `POST /update-journal-entry-datetime` | `{ journalEntryId, timestamp }` |
| `POST /get-journal-insights` | `{}` → `{ success, insights: [{title, content}] }` (last 30d, sonnet 2000) |
| `POST /transcription/transcribe` | multipart `audio` + `userId`,`language` (or `audioUrl`) → §3.2 |
| `WS /api/live-transcription` | subprotocol `access_token.<jwt>` → §3.1 |
| `GET /user-settings/account-tiers` | account tiers (for Explore limits — not journaling) |

**Auth on every route:** global `SupabaseJwtGuard` (`AppModule` provides it as `APP_GUARD`); `Bearer <supabase access token>` verified via `supabase.auth.getUser(token)` with the service-role client. Exception: none of the journaling routes are `@Public()`.

**Model/latency notes (from `ai-logger.types.ts` pricing table + `ai.service.ts`):**
- `claude-haiku-4-5-20251001` — input $1/M, output $5/M (fast: follow-ups, profile updates).
- `claude-sonnet-4-5-20250929` — input $3/M, output $15/M (deep: summaries, insights, values).
- `voyage-3-large` — 1024 dims.
- Anthropic **prompt caching** (`cache_control: ephemeral`) is used only for Explore chat (`useCache`), **not** journaling.

---

## 3. Audio / Speech-to-Text Implementation

Elora uses **Deepgram `nova-3`** behind a NestJS proxy, two ways:

### 3.1 Streaming path (default for voice input in guided/entry)

1. **Capture:** `expo-audio` `useAudioStream({ sampleRate: 16000, channels: 1, encoding: 'int16' })` → mono 16kHz little-endian PCM chunks (`hooks/useLiveTranscription.ts`).
2. **Transport:** client opens `ws(s)://<API>/api/live-transcription?encoding=linear16&sample_rate=16000&channels=1` (or `encoding=wav` in test mode). **Auth is the WebSocket subprotocol** string `access_token.<jwt>`. `elora-api/src/transcription/transcription.gateway.ts` parses the subprotocol, verifies via `SupabaseService.verifyAccessToken`, then pipes.
3. **Server proxy:** opens `wss://api.deepgram.com/v1/listen?model=nova-3&language=en&smart_format=true&interim_results=true&endpointing=500`, forwards binary PCM + JSON control frames (`KeepAlive` every 3s, `CloseStream` on stop) and relays Deepgram's JSON events back:
   - `Results` with `is_final` bool (interim + final), `channel.alternatives[0].transcript`
   - `SpeechStarted`, `UtteranceEnd`
4. **Client UX:** interim text renders live under the mic button; finals are accumulated server-side-agnostically on the client (`finalText`); `amplitude` (RMS) drives the Skia waveform; silence > 5s → haptic + `silenceDetected`; **fallback:** every PCM chunk is also accumulated and if the socket drops, the client builds a 44-byte-header WAV in-memory and uploads it via the post-record path (§3.2).
5. **Stop:** send `CloseStream`, wait for final `Results`+close (10s timeout); `status: 'finalizing'` spinner → `'completed'`.

### 3.2 Post-record path

`hooks/useAudioRecorder.ts` → `expo-audio` `RecordingPresets.HIGH_QUALITY` records a file (iOS `m4a`, Android `mp4`), then `services/api/transcription.ts` multipart-uploads to `POST /transcription/transcribe`.
- Allowed MIME: `audio/wav`, `audio/x-wav`, `audio/mpeg`, `audio/mp4`, `audio/m4a`, `audio/x-m4a`, `audio/webm`, `audio/mp3`; 25 MB cap.
- `TranscriptionService` calls Deepgram `listen.prerecorded.transcribeFile(buffer, { model: 'nova-3', language, punctuate: true, smart_format: true, paragraphs: true, diarize: false })`.
- Response: `{ success, transcript, confidence, duration, model: 'nova-3' }`.
- A URL variant (`transcribeUrl`) exists for test mode.
- Body fields: multipart field `audio`, plus `userId`, `language` (default `en`; `multi` accepted).

### 3.3 Browser equivalents (recommended for elora.day)

Replicate the streaming design — it's already browser-native:

1. **Capture:** `navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 16000, channels: 1 } })` → `AudioContext` + `AudioWorkletStream` or `MediaRecorder` (WebM/Opus). For true 16kHz int16 PCM parity, use an `AudioWorkletNode` in an `AudioContext` resampled to 16kHz, emit `int16` frames — mirrors the mobile contract exactly and keeps the backend proxy unchanged.
2. **Transport:** browser `WebSocket` (Node 20 / all evergreen browsers) to `wss://elora-api.example/api/live-transcription?encoding=linear16&sample_rate=16000&channels=1` with subprotocol `access_token.<anonJwt>` — **no backend change needed**. Side-gate: subprotocol auth over `wss` is trivial (any string).
3. **Alternative (Whisper API):** if you'd rather not proxy, `POST /v1/audio/transcriptions` with `model=whisper-1` gives comparable quality but is post-record, higher latency. Recommendation: keep Deepgram proxy for latency parity.
4. **Fallback:** always record with `MediaRecorder('audio/webm')` to a `Blob` for the post-record path when the socket drops.

Latency notes: mobile shows interim text ~300–700ms after speech onset (Deepgram `interim_results=true`, `endpointing=500`). Expect the same over browser → WebSocket.

---

## 4. Visual Design System, Micro-Interactions & Animations

### 4.1 Theme tokens (`theme.ts`, `stores/useAppSettingsStore.ts`)

Theme switching: `themeMode: 'light' | 'dark' | 'system'`, persisted in AsyncStorage key `themeMode`, resolved via `Appearance.getColorScheme()`, applied from Zustand `useAppSettingsStore` → `theme.*` tokens throughout. Web equivalent: `prefers-color-scheme` + a toggle; tokens as CSS custom properties.

```ts
// lightTheme  (note: NOT pure alabaster — light gray slate #F8F8F8)
background: '#F8F8F8', surface: '#FFFFFF', primary: '#035afc',
primaryText: '#ffffff', secondary: '#FFB997', text: '#222222',
secondaryText: '#555555', muted: '#999999', mutedBackground: '#E3DED7',
border: '#E3DED7', emotionTag: '#C1DFF0', highlight: '#FBEEC1'

// darkTheme
background: '#0B0B0B', surface: '#1A1A1A', primary: '#035afc',
secondary: '#FF9F80', text: '#F2F2F2', secondaryText: '#B5B5B5',
muted: '#777777', mutedBackground: '#1A1A1A', border: '#333333',
emotionTag: '#6E9BC5', highlight: '#3D2E1E'
```

Common pattern: translucent tinted surfaces via hex+alpha, e.g. `theme.primary + '33'` (border), `theme.primary + '14'` (icon chip bg), `theme.primary + '66'` (disabled), `theme.primary + '20'` / `+ '40'` (badges).

### 4.2 Typography

- **No custom font family** is loaded — platform system font (iOS default / Android default), rafts of sizes, weights, and **negative letter-spacing** for headings. Map to a single variable family on web (e.g. Inter) to keep the feel.
- Guided typography:
  - Gateway title: 30 / weight 200 / `letterSpacing: -0.4` / lineHeight 38, subtitle 15 / 300 / lineHeight 21.
  - Landing card label: 17 / 600 / `-0.2`; sub-caption 11 / 400 / lineHeight 18.
  - Chooser header: 24 / 400 / `-0.3`.
  - Prompt card text: auto-shrink tiers — `len>170 → 14/20`, `>120 → 15/22`, else **16/24**, weight 500, centered.
  - "change prompt": 13 / 500, muted, lowercase (via `textTransform`).
  - Continue pill: 16 / 600; Finish & Save: 14 / 600 secondaryText.
  - Reflection card (journal-entry): title 18/700 lineHeight 32; guided prompt 13/700 lineHeight 18; answer 14/lineHeight 20; tags 12/600; body 14/lineHeight 18.

### 4.3 Border-radius kit (de-facto)

| Radius | Uses |
|---|---|
| 8 | inline chips, AI-summary panel, body card, unsynced badge |
| 12 | buttons, inputs, emoji-picker cells (48×48), tag pills in list |
| 16 | tag pills, EntryCard list cards |
| 20 | primary CTA pill (guided footer), modals |
| 24 | chooser prompt cards, bottom-sheet top corners |
| 26 | landing gateway cards |
| 30 | emoji circles (60×60) |

Shadows: `shadowOpacity 0.1, shadowRadius 8, elevation 3` (cards); modals `0.3 / 20 / elevation 10`. Gateway cards intentionally **no shadow** (`gateCardShadow()` returns `{}`).

### 4.4 Key components & their micro-interactions (all Reanimated 4.5)

`react-native-reanimated` `Animated.*` primitives: `timing`, `spring`, `parallel`, `sequence`, `loop`, `delay`, with `easing: Easing.out|inOut|ease|linear|quad|cubic`, and `useNativeDriver: true` (hardware-accelerated).

| Interaction | Spec | Where |
|---|---|---|
| Gateway cards cascade in | opacity 340ms `out(cubic)` + spring `friction 9, tension 70`, delays 40/120/180ms | `new-entry.tsx` `FadeUp` |
| Press feedback | spring scale →0.97 (`friction 6, tension 200`) on press-in; white accent overlay `out(ease)` 140ms; settle spring back | `PressableScale`, radius 26 |
| Intro (Guided tap) | fade cards 300ms → centered prompt fade-in 420ms (delay 400) → hold 2800ms → lift up 900ms `inOut(quad)` + chrome fade | `startModeTransition` |
| Prompt pin + entry fade | content fade 400ms `out(ease)`; "change prompt" label 400ms @200ms delay | `handlePromptSelected` |
| Chooser options pop-in | opacity 260ms `out(cubic)` + spring (`friction 8, tension 34`), delays 200/400/600ms; refresh label @720ms | `handleOpenPromptChooser`/refresh |
| Choose/change prompt flight | chosen card translates from chooser slot-0 up to header 780ms `out(cubic)`; alternatives fade out 200ms; badge fade | `handleExpandedSelect` |
| Follow-up card swap | out: opacity 180ms `out(ease)` + scale→0.8; in: opacity 260ms + **spring `friction 5, tension 40`** + haptic tick | `continueGuided` |
| Guided footer shows | opacity 240ms `out(ease)` once content/turns exist; "Saving…" label pulses 1→0.3→1 | `guidedFooterOpacity`, `saveLabelOpacity` |
| Recording/Transcribing pulse | opacity 1→0.6→1 loop, 1200ms each way | recording text |
| Placeholder rotation | fade 500ms out/in, rotate every 3.5s | textarea placeholder |
| Reflection card entrance | `Animated.timing(fadeAnim, 500ms)` + slide `translateY 16→0` spring | `journal-entry.tsx` |
| Loading skeleton | "Loading..." text 16, `LoadingSpinner` component | `journal-entry.tsx:422` |

**Web mapping:** Framer Motion is already in `elora-site` deps — mirror with `motion.initial/animate/transition`, e.g. `type: 'spring', stiffness/damping` ≈ `friction/tension` (Reanimated spring `friction,tension` ~ Framer `damping≈friction*?, stiffness≈tension`); `Easing.out(cubic)` ≈ `cubicBezier(0.25,0.1,0.25,1)` or `easeOutCubic`; `useNativeDriver` ≈ `transform`/`opacity` only.

---

## 5. Auth & Account Linking Architecture

### 5.1 Stack

- **Provider:** Supabase Auth (`@supabase/supabase-js ^2.76.1`). Providers configured: Google, Apple. No custom OAuth/JWT anywhere.
- **Mobile client** (`lib/supabase.ts`): `createClient(url, anonKey)` with a custom `SecureStore` storage adapter (iOS Keychain/Android Keystore), `autoRefreshToken: true`, `persistSession: true`, `detectSessionInUrl: false`.
- **Backend** (`elora-api/src/auth/`): `SupabaseJwtGuard` (global `APP_GUARD`) verifies the `Bearer` token using `SupabaseService.verifyAccessToken()` → `supabase.auth.getUser(token)` with the **service-role** client. Attaches `request.user = { id, email, is_anonymous, ...user }`.

### 5.2 Mobile auth flows (`lib/AuthProvider.tsx`)

```
initializeAuth():
  getSession() → session? use it
  else → if local SQLite has entries: show "Session Expired" modal (sign-in or "start fresh")
       → else supabase.auth.signInAnonymously()   // anon account, is_anonymous = true

linkAccount(provider):                     // the "claim" path — used by LinkAccountPromptModal
  supabase.auth.linkIdentity({ provider, options: { redirectTo: Linking.createURL('auth/callback') } })
  → open browser (expo-web-browser) → callback URL parsed by parseOAuthCallbackUrl()
  → supabase.auth.setSession({ access_token, refresh_token })   // tokens from #/fragment

signInWithOAuth(provider):                 // existing-user sign-in
  supabase.auth.signInWithOAuth({ provider, options: { redirectTo } }) → same setSession dance
  └─ replaces the current anon session (different user) — entries fetch fresh

signOut():  clearUserState() → supabase.auth.signOut() → signInAnonymously() (new clean anon)
```

**This is the entire "claim an anonymous session" model, already shipped.** `linkIdentity()` keeps the **same auth.users row**, so `user_id` on every `journal_entries` row is unchanged and the entries are instantly in the account. `SignInModal` + `LinkAccountPromptModal` (protective sheet shown after the 4th anonymous entry) drive these.

Error contract (`lib/oAuthCallbackUtils.ts`): `identity_already_exists` ("already linked to another user"), `user_already_exists` ("sign in instead"), plus the usual `access_denied`/`invalid_request`/etc.

### 5.3 Data model (Postgres, `elora-api/db/schema.sql`)

```sql
CREATE TABLE journal_entries (
  journal_entry_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,            -- references Supabase auth.users::id (no FK; managed externally)
  content TEXT NOT NULL,
  guided_entry JSONB,               -- [{"prompt": "...", "answer": "..."}] | NULL
  embedding vector(1024),           -- voyage-3-large
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',      -- { message_count, created_via, model_used }
  title TEXT, emoji TEXT,
  user_summary TEXT, ai_summary TEXT,
  profile_developments TEXT, key_facts TEXT
);
CREATE TABLE journal_entry_tags (
  journal_entry_tag_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journal_entry_id UUID REFERENCES journal_entries(journal_entry_id) ON DELETE CASCADE,
  tag TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

- `entry_number` is a DB-managed value (`INSERT ... RETURNING journal_entry_id, entry_number` without inserting it — auto-generated by a manual DB default/trigger), monotonic per user.
- **Timestamps are ISO-8601 UTC** (`TIMESTAMPTZ`); mobile sends `new Date().toISOString()`.
- `metadata.created_via` is hardcoded `'web_app'` in `journal.service.ts` (shared by mobile — set `web` explicitly when you ship web to segment).
- Daily spot-check: `journal_entries.user_id` is `TEXT`, one row per entry; sync is keyed on `journal_entry_id` (client-generated **UUID v4**, `uuidv4()`).

### 5.4 Sync logic (mobile, offline-first)

`services/journalDatabase.ts` + `stores/useJournalStore.ts`:
1. `fetchEntries()`: load SQLite cache instantly → fire `POST /get-journal-entries` in background → upsert into SQLite (merging server rows + local `unsynced` rows keyed by `journal_entry_id`) → rehydrate store.
2. Save path: SQLite write (`unsynced: true`) → server create → on success update SQLite/store with enriched server fields (title/emoji/summaries/tags/guided_entry/updated_at) → clear `unsynced`.
3. Web equivalent: no SQLite — a `localStorage` "unsynced queue" keyed by `journal_entry_id` plays the same role; upsert semantic is idempotent because `journal_entry_id` is client-generated and the insert is keyed off it.

### 5.5 Claim flow specification for elora.day (anonymous session → account)

The mobile pattern ports 1:1. Spec:

```
(a) Browser session start:
    supabase.auth.signInAnonymously()   // create/reuse a SINGLE anon user per browser
    store refresh_token (httpOnly cookie or localStorage) so reloads reuse the SAME anon user
    // CRITICAL: if reload creates a NEW anon user, the un-claimed entry's user_id mismatches.
    // Reuse the same anon session across page loads.

(b) Run guided session fully client-side; cache { turns, activePrompt, placeholder... } in sessionStorage.
    On "Finish & Save":
      POST /create-journal-entry  with Bearer <anon JWT>
      → entry persisted under the anon user id. Keep returned entryId + enriched card.

(c) Post-save claim (CTM "Save my reflection"):
    supabase.auth.linkIdentity({ provider: 'google'|'apple', options: { redirectTo: 'https://elora.day/auth/callback' } })
    → user completes OAuth → callback URL carries #access_token & #refresh_token
    → supabase.auth.setSession({ access_token, refresh_token })
    → SAME auth.users row (anon → linked). user_id unchanged → entry already claimed. Done.

(d) Edge cases to handle (reuse oAuthCallbackUtils verbiage):
    - identity_already_exists / user_already_exists → user must sign in as that account (merge or switch).
    - New browser (fresh anon user): the un-claimed entry from another session is NOT on this account.
      Consider an explicit "Claim with code" fallback later (server-side transfer of journals between
      user_ids — a NEW protected endpoint, e.g. POST /claim-entry { entryId } transferring user_id
      ownership where both rows are anonymous).
```

**Is a new backend endpoint required?** For the happy path, **no** — Supabase `linkIdentity` already performs the claim because entries are bound to the anon `user_id`. A new **`POST /claim-guest-entry`** endpoint (transfer `journal_entries.user_id` from anon-user A to user B where B is authenticated and both journal rows are owned by A) should be added only for the cross-session fallback (§5.5d) or if you later let mobile claim a web-made entry.

Security note: never expose a claim endpoint keyed only by `journal_entry_id` without authenticating **both** the current anon user and the target owner.

---

## 6. Web Implementation Scaffold (Next.js)

Relevant existing deps: Next.js 16, React 19.2, Tailwind v4, Framer Motion. Add `@supabase/supabase-js`.

```
elora-site/app/
  guided/
    page.tsx                  // entry: starts anon session, routes to /guided/session
    session/page.tsx          // the 3-step guided flow (state machine of §1)
    reflection/page.tsx       // enriched reflection card from /create-journal-entry response
    claim/page.tsx            // "Authenticate to save" → linkIdentity + callback handling
  auth/callback/page.tsx      // parse #fragment tokens → setSession → redirect to reflection
elora-site/lib/
  supabase.ts                 // createClient(EXPO_PUBLIC_SUPABASE_URL, ANON_KEY) w/ local adapter
  guided.ts                   // port of guidedPromptsCache + getPromptPool + FALLBACK_PROMPTS
  api.ts                      // port of services/api/client.ts (+ journal/guidedPrompts/transcription)
  claim.ts                    // linkIdentity + setSession orchestration
  anonSession.ts              // create/reuse ONE anon user per browser (localStorage refresh token)
components/guided/
  GatewayCards.tsx            // Guided / Traditional cards (Framer Motion FadeUp + PressableScale)
  PinnedPromptCard.tsx        // intro sequence + pin + change-prompt affordance
  PromptChooser.tsx           // 3-option chooser + flight animations
  VoiceInput.tsx              // MediaRecorder/Worklet → WS → Deepgram proxy; interim text + waveform
  GuidedFooter.tsx            // Continue (Reflecting…) / Finish & Save
  ReflectionCard.tsx          // port of journal-entry.tsx card (emoji/title/tags/AI summary/Q/A)
```

Key ports:
- **Client** → `lib/api.ts`: identical `Authorization: Bearer <jwt>` logic; Supabase session from `supabase.auth.getSession()`.
- **Seed caching**: replicate `guidedPromptsCache.ts` using sessionStorage (per-day key `guided_prompts_cache`).
- **Typing/streaming UX:** keep the 3-prompt cap from `promptLimitReached`, mirror the follow-up swap spring (Framer `type:'spring', stiffness: 200, damping: ~10` approximates `friction 5, tension 40` overshoot).
- **Voice:** implement §3.3 — Web Audio worklet at 16kHz int16 → `WebSocket` with `access_token.<jwt>` subprotocol → reuse `elora-api/transcription.gateway.ts` unchanged.
- **Theme:** port `theme.ts` to CSS vars; `prefers-color-scheme` for the `system` mode.

---

## 7. Appendix — Exact payloads cheatsheet

```txt
POST /get-guided-prompts                → { success: true, prompts: [3 strings] }
POST /get-guided-prompt-followup        → { success: true, nextPrompt: string, promptLimitReached: bool }
POST /create-journal-entry              → { success, entryId, title, emoji, userSummary, aiSummary,
                                            tags: string[], guidedEntry: [{prompt, answer}],
                                            timestamp, created_at, updated_at }
POST /get-journal-entries               → { success, data: JournalEntry[] }   // tags[] joined, guided_entry parsed
WS /api/live-transcription?encoding=linear16&sample_rate=16000&channels=1
    subprotocol: access_token.<jwt>
    in (binary): PCM int16LE 16kHz mono chunks
    in (text):   {"type":"KeepAlive"}  /  {"type":"CloseStream"}
    out (text):  Deepgram Results {type, channel.alternatives[0].transcript, is_final}, SpeechStarted, UtteranceEnd
POST /transcription/transcribe (multipart audio + userId + language)
    → { success, transcript, confidence, duration, model: "nova-3" }
```

## 8. Open questions / recommended follow-ups

1. Confirm Supabase project: anonymous sign-ins enabled (default `anon` role grants) + Google/Apple OAuth clients configured with `https://elora.day/auth/callback`.
2. Decide if cross-session claiming (guest entry made in browser A, claimed in browser B or mobile) needs the new `POST /claim-guest-entry` endpoint (§5.5d). Happy-path same-session flow needs zero backend work.
3. `metadata.created_via` is currently `'web_app'` for all platforms — worth parameterizing when the web client ships.
4. Verify `entry_number` default/trigger exists in the live Railway/Prod Postgres (it is *not* in `schema.sql`) — `/create-journal-entry` `RETURNING ... entry_number` depends on it.