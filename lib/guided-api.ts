'use client';

/**
 * Typed client for the isolated web guided-journal API.
 * Every call carries the source-isolation headers:
 *   x-client-source: elora-web
 *   x-web-api-key:   <NEXT_PUBLIC_WEB_API_KEY>
 * plus the Supabase access token (anonymous or linked) as the Bearer JWT.
 */

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
const WEB_API_KEY = process.env.NEXT_PUBLIC_WEB_API_KEY || '';

export interface InitResponse {
  success: boolean;
  user_id: string;
  run_id: string;
  prompt: string;
  alternate_prompts: string[];
  mode: 'guided' | 'free';
  max_input_chars: number;
  follow_up_limit: number;
  synthesis_allowed: boolean;
}

export interface FollowUpResponse {
  success: boolean;
  next_prompt: string | null;
  prompt_limit_reached: boolean;
  step_index: number;
}

export interface ReflectionCard {
  success: boolean;
  user_id: string;
  run_id: string;
  journal_entry_id: string;
  title: string | null;
  emoji: string | null;
  user_summary: string | null;
  ai_summary: string | null;
  tags: string[];
  turns: { prompt: string; answer: string }[];
  created_at: string;
}

export interface ClientEvent {
  event_name: string;
  step_index: number;
  duration_ms?: number;
  metadata?: Record<string, any>;
}

async function post<T>(path: string, body: Record<string, any>): Promise<T> {
  const { currentAccessToken } = await import('@/lib/supabase');
  const token = await currentAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-client-source': 'elora-web',
  };
  if (WEB_API_KEY) headers['x-web-api-key'] = WEB_API_KEY;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    let code: string | undefined;
    try {
      const json = await res.json();
      message = json?.message || json?.error || message;
      code = json?.code;
    } catch {
      /* keep status text */
    }
    const err = new Error(message) as Error & { status?: number; code?: string };
    err.status = res.status;
    err.code = code;
    throw err;
  }
  return res.json() as Promise<T>;
}

export function initGuidedJournal(
  userId: string,
  runId: string,
  prompt?: string | null,
  turnstileToken?: string | null,
): Promise<InitResponse> {
  return post<InitResponse>('/web/guided-journal/init', {
    user_id: userId,
    run_id: runId,
    prompt: prompt || undefined,
    turnstile_token: turnstileToken || undefined,
  });
}

export function followUpGuidedJournal(
  userId: string,
  runId: string,
  payload: {
    current_prompt: string;
    answer: string;
    conversation_history: { prompt: string; answer: string }[];
    turnstile_token?: string | null;
  },
): Promise<FollowUpResponse> {
  return post<FollowUpResponse>('/web/guided-journal/follow-up', {
    user_id: userId,
    run_id: runId,
    current_prompt: payload.current_prompt,
    answer: payload.answer,
    conversation_history: payload.conversation_history,
    turnstile_token: payload.turnstile_token || undefined,
  });
}

export function synthesizeGuidedJournal(
  userId: string,
  runId: string,
  payload: {
    turnstile_token?: string | null;
    turns: { prompt: string; answer: string }[];
  },
): Promise<ReflectionCard> {
  return post<ReflectionCard>('/web/guided-journal/synthesize', {
    user_id: userId,
    run_id: runId,
    turnstile_token: payload.turnstile_token || undefined,
    turns: payload.turns,
  });
}

export function postWebEvents(userId: string, events: ClientEvent[]): Promise<{ success: boolean; received: number }> {
  return post('/web/guided-journal/log', { user_id: userId, events });
}