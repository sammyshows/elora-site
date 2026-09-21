'use client';

/**
 * Client-side structured event funnel for /guided.
 *
 * Buffers events and flushes them to POST /web/guided-journal/log in batches
 * (debounced), with a best-effort flush on unload. Every event matches the
 * canonical shape at rest:
 *
 *   { session_id, event_name, step_index, timestamp, duration_ms, metadata }
 */

import { ClientEvent } from '@/lib/guided-api';

export const GuidedEventNames = Object.freeze({
  SESSION_START: 'guided_session_start',
  INPUT_SUBMITTED: 'guided_input_submitted',
  FOLLOWUP_PRESENTED: 'guided_followup_presented',
  SYNTHESIS_STARTED: 'guided_synthesis_started',
  SYNTHESIS_COMPLETED: 'guided_synthesis_completed',
  SAVE_PROMPT_VIEWED: 'save_prompt_viewed',
  AUTH_PROVIDER_CLICKED: 'auth_provider_clicked',
  ENTRY_CLAIMED_SUCCESS: 'entry_claimed_success',
  ENTRY_CLAIMED_FAILED: 'entry_claimed_failed',
});

type BufferEntry = ClientEvent & { queuedAt: number };

let userIdRef: string | null = null;
let buffer: BufferEntry[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let flushing = false;

/** Ensure a session_id exists for logging (call after init). */
export function setLogUser(userId: string): void {
  userIdRef = userId;
}

export function track(
  eventName: string,
  stepIndex: number,
  opts?: { durationMs?: number; metadata?: Record<string, any> },
): void {
  if (!userIdRef) return; // cannot attribute a funnel event without a user
  buffer.push({
    event_name: eventName,
    step_index: stepIndex,
    duration_ms: opts?.durationMs,
    metadata: opts?.metadata,
    queuedAt: Date.now(),
  });
  armFlush();
}

export async function flushEvents(): Promise<void> {
  if (flushing || buffer.length === 0) return;
  const userId = userIdRef;
  if (!userId) {
    buffer = [];
    return;
  }

  flushing = true;
  const batch = buffer.splice(0, buffer.length);
  try {
    const { postWebEvents } = await import('@/lib/guided-api');
    await postWebEvents(userId, batch.map(({ queuedAt, ...e }) => e));
  } catch (err) {
    console.warn('[Elora] Failed to flush guided events (retrying later):', err);
    buffer = [...batch, ...buffer].slice(0, 200); // cap the retry buffer
  } finally {
    flushing = false;
  }
}

function armFlush(): void {
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    void flushEvents();
  }, 1200);
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => void flushEvents());
}