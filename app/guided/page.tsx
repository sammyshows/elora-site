'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check as CheckIcon, RotateCcw } from 'lucide-react';
import {
  ReflectionCard as ReflectionCardData,
  followUpGuidedJournal,
  initGuidedJournal,
  synthesizeGuidedJournal,
} from '@/lib/guided-api';
import { GuidedEventNames, setLogUser, track, flushEvents } from '@/lib/guided-events';
import { runTurnstile } from '@/lib/turnstile';
import { randomOpeningPrompt } from '@/lib/guided-prompts';
import { ANSWER_LIMIT, bumpAnswerCount, ensureUserId, isLocked, nextRunId, resolveUserId } from '@/lib/guided-quota';
import { Gateway } from './components/Gateway';
import { PromptStage } from './components/PromptStage';
import { ReflectionCard } from './components/ReflectionCard';
import { ClaimPrompt } from './components/ClaimPrompt';
import { ScreenshotShowcase } from './components/ScreenshotShowcase';
import { StoreBadges } from './components/StoreBadges';
import { EASE_OUT_CUBIC } from './components/primitives';

const T = {
  ink: 'var(--guided-ink)',
  inkSoft: 'var(--guided-ink-soft)',
  muted: 'var(--guided-muted)',
  accent: 'var(--guided-accent)',
};

type Stage = 'boot' | 'gateway' | 'done' | 'answer' | 'synthesizing' | 'reflection';

type Turn = { prompt: string; answer: string };

interface PersistedState {
  traditional: boolean;
  session: import('@/lib/guided-api').InitResponse | null;
  turns: Turn[];
  activePrompt: string | null;
  limitReached: boolean;
  card: ReflectionCardData | null;
  claimed: boolean;
}

const STORAGE_KEY = 'elora.web_guided.v2';

function loadPersisted(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PersistedState) : null;
  } catch {
    return null;
  }
}

export default function GuidedPage() {
  const [stage, setStage] = useState<Stage>('boot');
  const [traditional, setTraditional] = useState(false);
  const [session, setSession] = useState<import('@/lib/guided-api').InitResponse | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [generating, setGenerating] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [card, setCard] = useState<ReflectionCardData | null>(null);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const voiceUsedRef = useRef(false);
  const savePromptLoggedRef = useRef(false);
  const bootedRef = useRef(false);

  const persist = () => {
    try {
      if (typeof window === 'undefined') return;
      const state: PersistedState = {
        traditional,
        session,
        turns,
        activePrompt,
        limitReached,
        card,
        claimed,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — non-fatal */
    }
  };

  // ------------------------------------------------------------------- boot
  React.useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    void (async () => {
      // Identity is the anonymous Supabase user id (the same model as the app).
      // The device uuid seeds attribution for anything that fires before auth
      // resolves, then aliases into the anon id — which also warms the session
      // so the first API call never blocks on sign-in.
      setLogUser(ensureUserId());
      void resolveUserId().then((id) => setLogUser(id));
      const claimedParam = new URLSearchParams(window.location.search).get('claimed');
      const saved = loadPersisted();

      const applySaved = (s: PersistedState) => {
        setTraditional(s.traditional);
        setSession(s.session);
        setTurns(s.turns || []);
        setActivePrompt(s.activePrompt);
        setLimitReached(s.limitReached);
        setCard(s.card);
        setClaimed(!!s.claimed);
        if (s.session?.user_id) setLogUser(s.session.user_id);
      };

      if (!saved || !saved.session) {
        // Landing fresh: the quota cookie gates further interaction and routes
        // to the "Continue in the app" showcase instead of the gateway.
        if (isLocked()) setStage('done');
        else setStage('gateway');
        return;
      }

      applySaved(saved);

      if (saved.card) {
        setStage('reflection');
        if (claimedParam === 'success' && !saved.claimed) {
          setClaimed(true);
          saved.claimed = true;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        }
        return;
      }

      setStage(saved.turns?.length > 0 || saved.activePrompt ? 'answer' : 'gateway');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------------------------------------------------- persistence
  React.useEffect(() => {
    if (stage === 'boot') return;
    persist();
  }, [stage, turns, activePrompt, limitReached, card, claimed, content, session, traditional]);

  // ----------------------------------------------------------- funnel events
  React.useEffect(() => {
    if (stage === 'reflection' && card && !savePromptLoggedRef.current) {
      savePromptLoggedRef.current = true;
      track(GuidedEventNames.SAVE_PROMPT_VIEWED, turns.length, {
        metadata: { journal_entry_id: card.journal_entry_id },
      });
      void flushEvents();
    }
  }, [stage, card, turns]);

  // ----------------------------------------------------------------- actions
  const beginGuided = async () => {
    setError(null);
    try {
      const init = await initGuidedJournal(
        await resolveUserId(),
        nextRunId(),
        randomOpeningPrompt(),
        await runTurnstile('elora_guided_init'),
      );
      setSession(init);
      setLogUser(init.user_id);
      setActivePrompt(init.prompt);
      setTraditional(false);
      setTurns([]);
      setLimitReached(false);
      setStage('answer');
    } catch (err) {
      setError(toMessage(err));
      setStage('gateway');
    }
  };

  const beginTraditional = async () => {
    setError(null);
    try {
      const init = await initGuidedJournal(
        await resolveUserId(),
        nextRunId(),
        randomOpeningPrompt(),
        await runTurnstile('elora_guided_init'),
      );
      setSession(init);
      setLogUser(init.user_id);
      setTraditional(true);
      setActivePrompt(null);
      setTurns([]);
      setLimitReached(false);
      setStage('answer');
    } catch (err) {
      setError(toMessage(err));
      setStage('gateway');
    }
  };

  const changePrompt = (next: string) => setActivePrompt(next);

  const onContinue = async () => {
    if (!session || !activePrompt) return;
    const answer = content.trim();
    if (answer.length === 0 || generating) return;

    setGenerating(true);
    track(GuidedEventNames.INPUT_SUBMITTED, turns.length + 1, {
      metadata: {
        mode: voiceUsedRef.current ? 'voice' : 'text',
        char_length: answer.length,
        turn_index: turns.length + 1,
      },
    });
    voiceUsedRef.current = false;

    try {
      const res = await followUpGuidedJournal(session.user_id, session.run_id, {
        current_prompt: activePrompt,
        answer,
        conversation_history: turns,
        turnstile_token: await runTurnstile('elora_guided_follow_up'),
      });
      setTurns((prev) => [...prev, { prompt: activePrompt, answer }]);
      setContent('');
      setLimitReached(res.prompt_limit_reached);
      bumpAnswerCount(); // track total answers for the quota gate
      if (res.next_prompt) {
        setActivePrompt(res.next_prompt);
      } else {
        setLimitReached(true);
      }
    } catch (err) {
      setError(toMessage(err));
    } finally {
      setGenerating(false);
    }
  };

  const onFinish = async () => {
    if (!session) return;
    setError(null);
    const answer = content.trim();
    const finalTurns = answer ? [...turns, { prompt: activePrompt || '', answer }] : turns;
    setStage('synthesizing');

    try {
      const token = await runTurnstile('elora_guided_synthesize');
      const result = await synthesizeGuidedJournal(session.user_id, session.run_id, {
        turnstile_token: token,
        turns: finalTurns,
      });
      setTurns(finalTurns);
      setCard(result);
      setContent('');
      bumpAnswerCount(); // track total answers for the quota gate
      setStage('reflection');
    } catch (err) {
      setError(toMessage(err));
      setStage('answer');
    }
  };

  const startClaim = async (provider: 'google' | 'apple') => {
    if (!session) return;
    track(GuidedEventNames.AUTH_PROVIDER_CLICKED, 0, { metadata: { provider } });
    void flushEvents();

    const { getSupabase } = await import('@/lib/supabase');
    const sb = getSupabase();
    const redirectTo = `${window.location.origin}/auth/callback?user_id=${session.user_id}&run_id=${session.run_id}`;
    const { data, error: linkError } = await sb.auth.linkIdentity({
      provider,
      options: { redirectTo },
    });

    if (linkError) {
      track(GuidedEventNames.ENTRY_CLAIMED_FAILED, 0, {
        metadata: { provider, error: linkError.message },
      });
      void flushEvents();
      setError(toMessage(linkError));
      return;
    }
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  /** Discard the current session and return to the gateway. */
  const handleRestart = () => {
    if (typeof window !== 'undefined') {
      if (!window.confirm('Start a new entry? Your current progress will be discarded.')) return;
      localStorage.removeItem(STORAGE_KEY);
    }
    const newUserId = typeof window !== 'undefined' ? ensureUserId() : '';
    setLogUser(newUserId);
    // If the quota gate is already tripped, restoring to the gateway would
    // bypass it — send locked browsers straight to the showcase.
    setStage(isLocked() ? 'done' : 'gateway');
    setSession(null);
    setActivePrompt(null);
    setTurns([]);
    setContent('');
    setCard(null);
    setLimitReached(false);
    setClaimed(false);
    setTraditional(false);
    setError(null);
    setGenerating(false);
    savePromptLoggedRef.current = false;
    voiceUsedRef.current = false;
  };

  // Stage cross-fade wrapper (remounts on every stage change).
  const stageWrap = (children: React.ReactNode) => (
    <motion.div
      key={stage}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween', duration: 0.32, ease: EASE_OUT_CUBIC }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="guided-page">
      {/* Sticky glass navigation */}
      <header className="guided-glass sticky top-0" style={{ zIndex: 30 }}>
        <div className="guided-shell flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/icon.svg" alt="Elora" width={32} height={32} style={{ borderRadius: 8 }} />
            <span style={{ color: T.ink, fontSize: 19, fontWeight: 700, letterSpacing: -0.4 }}>Elora</span>
          </Link>
          {stage === 'boot' || stage === 'gateway' || stage === 'done' ? (
            <span className="guided-micro" style={{ textTransform: 'none' }}>
              Journal that thinks like you
            </span>
          ) : stage === 'reflection' ? (
            <Link
              href="/"
              className="flex items-center gap-1.5"
              style={{
                textDecoration: 'none',
                borderRadius: 999,
                padding: '6px 13px',
                color: T.inkSoft,
                fontSize: 13.5,
                fontWeight: 580,
                border: '1px solid color-mix(in srgb, var(--guided-border) 70%, white)',
              }}
            >
              Go home
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleRestart}
              className="flex items-center gap-1.5"
              title="Start a new entry"
              style={{
                background: 'none',
                border: '1px solid color-mix(in srgb, var(--guided-border) 70%, white)',
                borderRadius: 999,
                padding: '6px 13px',
                color: T.inkSoft,
                fontSize: 13.5,
                fontWeight: 580,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} color="currentColor" strokeWidth={2} />
              Discard
            </button>
          )}
        </div>
      </header>

      {error && (
        <div className="guided-shell" role="alert" style={{ display: 'flex', marginTop: 12 }}>
          <div className="guided-card" style={{ padding: '12px 16px', borderRadius: 14, border: '1px solid #fecaca', color: '#b91c1c', fontSize: 14, lineHeight: '20px' }}>
            {error}
          </div>
        </div>
      )}

      <main style={{ flex: 1 }}>
        <div className="guided-shell">
          {stage === 'boot' &&
            stageWrap(
              <div className="flex flex-col items-center gap-4" style={{ paddingTop: 'clamp(96px, 14vh, 180px)' }}>
                <motion.div
                  style={{ width: 44, height: 44, borderRadius: 22, border: `2px solid ${T.accent}` }}
                  animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.12, 1] }}
                  transition={{ type: 'tween', duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="guided-body">Waking up your journal…</p>
              </div>,
            )}

          {stage === 'gateway' &&
            stageWrap(
              <div style={{ paddingTop: 'clamp(64px, 10vh, 140px)', paddingBottom: 'clamp(72px, 12vh, 120px)' }}>
                <div className="text-center">
                  <span className="guided-chip">Private · AI-assisted journaling</span>
                  <h1 className="guided-display" style={{ marginTop: 18 }}>
                    Start an entry
                  </h1>
                  <p
                    className="guided-lede"
                    style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}
                  >
                    Answer one gentle prompt, let Elora ask one or two more, and get a
                    reflection worth keeping in under three minutes.
                  </p>
                </div>

                <div className="mt-9" style={{ marginTop: 'clamp(32px, 5vh, 56px)' }}>
                  <Gateway onGuided={() => void beginGuided()} onTraditional={() => void beginTraditional()} />
                </div>

                <p className="guided-micro text-center" style={{ marginTop: 28 }}>
                  Completely private to your account and secure. No account needed to start.
                </p>
              </div>,
            )}

          {stage === 'done' &&
            stageWrap(
              <div className="grid lg:grid-cols-2 gap-10 items-center" style={{ paddingTop: 'clamp(48px, 8vh, 112px)', paddingBottom: 40 }}>
                <div className="text-center lg:text-left">
                  <span className="guided-chip">
                    <CheckIcon size={13} /> Free reflections used
                  </span>
                  <h1 className="guided-display" style={{ marginTop: 18 }}>
                    Continue in the app
                  </h1>
                  <p className="guided-lede" style={{ marginTop: 10 }}>
                    You&apos;ve explored your {ANSWER_LIMIT} guided reflections on the web.
                    Pick up where you left off in the Elora app, where your journal,
                    patterns, and reflections live together.
                  </p>
                  <div className="mt-8 flex flex-col gap-3">
                    <StoreBadges />
                    <Link href="/" className="guided-link-cta w-full" style={{ alignSelf: 'center' }}>
                      Back to elora.day
                    </Link>
                  </div>
                </div>
                <PhoneShowcase src="/guided-iphone.png" alt="Elora guided journal on iPhone" />
              </div>,
            )}

          {stage === 'answer' &&
            stageWrap(
              <div style={{ paddingTop: 28, paddingBottom: 40 }}>
                <div className="flex items-center justify-between">
                  <span className="guided-chip">
                    {traditional ? 'Free entry' : `Prompt ${Math.min(turns.length + 1, 3)} of 3`}
                  </span>
                  <span className="guided-micro">Reflection step</span>
                </div>
                <PromptStage
                  traditional={traditional}
                  activePrompt={activePrompt}
                  turnsCount={turns.length}
                  content={content}
                  onContentChange={setContent}
                  generatingFollowUp={generating}
                  promptLimitReached={limitReached}
                  onPromptChange={changePrompt}
                  onContinue={() => void onContinue()}
                  onFinish={() => void onFinish()}
                  onVoiceCommit={() => {
                    voiceUsedRef.current = true;
                  }}
                />
              </div>,
            )}

          {stage === 'synthesizing' &&
            stageWrap(
              <div className="flex flex-col items-center gap-6" style={{ paddingTop: 'clamp(112px, 16vh, 200px)' }}>
                <div className="guided-card guided-lift" style={{ width: 72, height: 72, borderRadius: 36 }}>
                  <motion.div
                    style={{ position: 'relative', inset: 0 }}
                    animate={{ rotate: [0, 360, 0], scale: [1, 1.1, 1] }}
                    transition={{ type: 'tween', duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center justify-center text-3xl"
                  >
                    ✦
                  </motion.div>
                </div>
                <h2 className="guided-heading">Reflecting on your entry…</h2>
                <p className="guided-lede" style={{ maxWidth: 420, textAlign: 'center' }}>
                  Finding the patterns and themes in what you shared.
                </p>
              </div>,
            )}

          {stage === 'reflection' && card &&
            stageWrap(
              <div className="flex flex-col gap-6" style={{ paddingTop: 32, paddingBottom: 48 }}>
                <div>
                  <h2 className="guided-heading">Your reflection</h2>
                  <p className="guided-lede" style={{ marginTop: 8 }}>
                    Here&apos;s what your entry surfaced, and how to keep it.
                  </p>
                </div>
                <ReflectionCard card={card} />
                <ClaimPrompt
                  claimed={claimed}
                  onGoogle={() => void startClaim('google')}
                  onApple={() => void startClaim('apple')}
                />
                <div className="text-center" style={{ marginTop: 8 }}>
                  <h3 className="guided-heading" style={{ textAlign: 'center' }}>
                    Download the app to do more!
                  </h3>
                  <p className="guided-lede" style={{ maxWidth: 480, margin: '8px auto 0', textAlign: 'center' }}>
                    Deeper insights, patterns and more - built from every entry you write.
                  </p>
                </div>
                <ScreenshotShowcase />
              </div>,
            )}
        </div>
      </main>
    </div>
  );
}

function toMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

/**
 * "Continue in the app" phone mockup. Renders the iPhone screenshot at
 * /public/guided-iphone.png when present; falls back to a generated
 * device frame so the stage never looks broken.
 */
function PhoneShowcase({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex justify-center" style={{ padding: '24px 0' }}>
      <div
        style={{
          width: 244,
          height: 496,
          borderRadius: 40,
          border: '3px solid color-mix(in srgb, var(--guided-border) 70%, white)',
          backgroundColor: 'var(--guided-surface)',
          boxShadow: '0 24px 64px rgba(16,24,40,0.16), 0 2px 6px rgba(16,24,40,0.08)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* notch */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            width: 72,
            height: 16,
            transform: 'translateX(-50%)',
            borderRadius: 8,
            backgroundColor: '#111',
          }}
        />
        {!failed && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: loaded || failed ? 'block' : 'none',
            }}
          />
        )}
        {!loaded && (
          <div
            className="flex flex-col items-center justify-center"
            style={{
              position: 'absolute',
              inset: 44,
              borderRadius: 16,
              backgroundColor: 'color-mix(in srgb, var(--guided-accent) 8%, white)',
            }}
          >
            <img src="/icon.svg" alt="" width={72} height={72} style={{ borderRadius: 16 }} />
            <p style={{ color: 'var(--guided-ink)', fontSize: 15, fontWeight: 650, marginTop: 12, letterSpacing: -0.2 }}>
              Elora
            </p>
            <p className="guided-micro" style={{ marginTop: 4, textAlign: 'center' }}>
              Drop your screenshot in
              <br />
              public/guided-iphone.png
            </p>
          </div>
        )}
      </div>
    </div>
  );
}