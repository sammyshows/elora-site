'use client';

import { Session, SupabaseClient, createClient } from '@supabase/supabase-js';

/**
 * Supabase client for elora.day.
 * - Anonymous sign-in on first visit (the same model as the mobile app), so a
 *   guided entry is bound to an anonymous user that later `linkIdentity()`
 *   upgrades to a Google/Apple account without changing the user_id.
 * - persistSession uses localStorage; a refresh reuses the SAME anon user.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let client: SupabaseClient | null = null;
let sessionPromise: Promise<Session | null> | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;
  if (!url || !anonKey) {
    console.warn(
      '[Elora] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. Auth will not work.',
    );
  }
  client = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false, // we handle the OAuth callback manually
    },
  });
  return client;
}

/**
 * Return the active session (existing, or a freshly created anonymous one).
 *
 * Concurrent callers share a single in-flight promise so parallel requests at
 * boot can never mint two anonymous users.
 */
export function ensureAnonSession(): Promise<Session | null> {
  if (sessionPromise) return sessionPromise;
  sessionPromise = (async () => {
    const sb = getSupabase();

    const { data, error } = await sb.auth.getSession();
    if (error) {
      console.error('[Elora] Failed to read session:', error.message);
    }
    if (data?.session) return data.session;

    const { data: signIn, error: signInError } = await sb.auth.signInAnonymously();
    if (signInError) {
      console.error('[Elora] Anonymous sign-in failed:', signInError.message);
      return null;
    }
    return signIn?.session;
  })().finally(() => {
    sessionPromise = null;
  });
  return sessionPromise;
}

/**
 * The canonical guided-flow user id: the anonymous Supabase user id (the same
 * model as the mobile app). Only null when auth is unavailable.
 */
export async function currentSupabaseUserId(): Promise<string | null> {
  const session = await ensureAnonSession();
  return session?.user?.id ?? null;
}

/**
 * Resolve the current access token (creating an anon session if needed).
 */
export async function currentAccessToken(): Promise<string | undefined> {
  const session = await ensureAnonSession();
  return session?.access_token;
}

export async function currentUserId(): Promise<string | undefined> {
  const session = await ensureAnonSession();
  return session?.user?.id;
}

export async function isAnonymousUser(): Promise<boolean> {
  const session = await ensureAnonSession();
  return session?.user?.is_anonymous ?? true;
}