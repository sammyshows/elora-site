'use client';

/**
 * Anonymous reflection quota.
 *
 * We track how many answers a browser has submitted in total (localStorage).
 * At ANSWER_LIMIT (10) a cookie is set. On a NEW start (landing on /guided
 * with no in-progress session) the cookie gates further interaction and shows
 * the "Continue in the app" showcase instead.
 *
 * The cookie is intentionally ONLY read at landing — users who already have a
 * session in flight are allowed to finish it.
 */

const STORAGE_KEY = 'elora.web_guided.answers';
const COOKIE_NAME = 'elora_guided_done';
const COOKIE_MAX_AGE_DAYS = 30;

const USER_KEY = 'elora.web_guided.user';
const RUN_KEY = 'elora.web_guided.run';

export const ANSWER_LIMIT = 10;

function randomUuid(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return 'web-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

/**
 * Device-level fallback identity: a uuid v4 generated once and kept in
 * localStorage. Used only to attribute events in the brief window before the
 * anonymous Supabase session resolves — see resolveUserId().
 */
export function ensureUserId(): string {
  try {
    let id = localStorage.getItem(USER_KEY);
    if (!id) {
      id = randomUuid();
      localStorage.setItem(USER_KEY, id);
    }
    return id;
  } catch {
    return randomUuid(); // storage unavailable — regenerate per call
  }
}

/**
 * Resolve the canonical guided-flow identity: the anonymous Supabase user id
 * (the same model as the mobile app). The device uuid is only a fallback for
 * the brief window before the anonymous session resolves, so attribution never
 * drops.
 */
export async function resolveUserId(): Promise<string> {
  const { currentSupabaseUserId } = await import('@/lib/supabase');
  return (await currentSupabaseUserId()) || ensureUserId();
}

/**
 * Per-journey run id: rotated whenever a new guided flow starts (also used as
 * the journal entry id at synthesis so re-submits are idempotent).
 */
export function nextRunId(): string {
  const id = randomUuid();
  try {
    localStorage.setItem(RUN_KEY, id);
  } catch {
    /* storage unavailable */
  }
  return id;
}

/**
 * The current run id for this browser (e.g. to reconcile across reloads).
 * Generates one on first use.
 */
export function ensureRunId(): string {
  try {
    let id = localStorage.getItem(RUN_KEY);
    if (!id) {
      id = randomUuid();
      localStorage.setItem(RUN_KEY, id);
    }
    return id;
  } catch {
    return randomUuid();
  }
}

export function currentAnswerCount(): number {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

/**
 * Record an answered prompt. Returns the new total.
 * Sets the gate cookie once the threshold is crossed.
 */
export function bumpAnswerCount(): number {
  const next = currentAnswerCount() + 1;
  try {
    localStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    /* storage unavailable */
  }
  if (next >= ANSWER_LIMIT) {
    setLockedCookie();
  }
  return next;
}

/**
 * The gate: true once the browser has hit the answer limit, or the cookie has
 * already been set. Only ever consulted when landing fresh (no session).
 */
export function isLocked(): boolean {
  if (typeof document === 'undefined') return false;
  return readCookie() || currentAnswerCount() >= ANSWER_LIMIT;
}

function readCookie(): boolean {
  try {
    return document.cookie.split('; ').some((part) => part === `${COOKIE_NAME}=1`);
  } catch {
    return false;
  }
}

function setLockedCookie(): void {
  if (typeof document === 'undefined') return;
  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${COOKIE_NAME}=1; Path=/; Max-Age=${COOKIE_MAX_AGE_DAYS * 86400}; SameSite=Lax${secure}`;
  } catch {
    /* cookies unavailable */
  }
}