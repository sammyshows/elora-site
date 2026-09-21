'use client';

import React, { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { postWebEvents } from '@/lib/guided-api';
import { GuidedEventNames } from '@/lib/guided-events';

/**
 * OAuth callback handler (port of app/auth/callback.tsx + oAuthCallbackUtils).
 *
 * Supabase appends tokens in the URL fragment. We extract them, set the
 * session (which promotes the anonymous user to a linked account WITHOUT
 * changing the user_id — the entry is claimed automatically), log the funnel
 * outcome, then return to /guided.
 */
export default function AuthCallback() {
  const [message, setMessage] = useState('Finishing sign-in…');

  useEffect(() => {
    void (async () => {
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const searchParams = new URLSearchParams(window.location.search);

      const userId = searchParams.get('user_id') || 'anon';
      const runId = searchParams.get('run_id') || undefined;
      const error = hashParams.get('error') || searchParams.get('error');
      const errorDescription =
        hashParams.get('error_description') || searchParams.get('error_description');
      const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');

      const fail = async (reason: string) => {
        setMessage('Could not link your account.');
        try {
          await postWebEvents(userId, [
            {
              event_name: GuidedEventNames.ENTRY_CLAIMED_FAILED,
              step_index: 0,
              metadata: { user_id: userId, run_id: runId, error: reason },
            },
          ]);
        } catch {
          /* logging must never block redirect */
        }
        window.location.replace('/guided?claimed=failed');
      };

      if (error) {
        await fail(errorDescription || error);
        return;
      }

      if (!accessToken || !refreshToken) {
        await fail('OAuth tokens missing from callback');
        return;
      }

      try {
        const sb = getSupabase();
        const { error: setError } = await sb.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (setError) throw setError;

        setMessage('Account linked — saving your entry.');
        try {
          await postWebEvents(userId, [
            {
              event_name: GuidedEventNames.ENTRY_CLAIMED_SUCCESS,
              step_index: 0,
              metadata: { user_id: userId, run_id: runId },
            },
          ]);
        } catch {
          /* non-fatal */
        }
        window.location.replace('/guided?claimed=success');
      } catch (err) {
        await fail(err instanceof Error ? err.message : 'setSession failed');
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--guided-canvas)' }}>
      <p style={{ color: 'var(--guided-ink-soft)', fontSize: 15 }}>{message}</p>
    </div>
  );
}