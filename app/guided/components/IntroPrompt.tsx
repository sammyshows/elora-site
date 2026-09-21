'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_INOUT_QUAD } from './primitives';

const T = {
  ink: 'var(--guided-ink)',
  accent: 'var(--guided-accent)',
};

const INTRO_FADE_MS = 420;
const INTRO_HOLD_MS = 2800;
const INTRO_LIFT_MS = 900;
const TOTAL_MS = INTRO_FADE_MS + INTRO_HOLD_MS + INTRO_LIFT_MS;
/** Where the card must land: below the sticky nav, aligned with the answer view. */
const REST_TOP = 148;

/**
 * INTRO — hold + lift entrance (unchanged choreography):
 *   gateway fades out → prompt card fades in centered (420ms) → holds ~2.8s →
 *   lifts to the pinned slot (900ms, easeInOutQuad) → onDone.
 */
export function IntroPrompt({ prompt, onDone }: { prompt: string; onDone: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(360);
  const measured = useRef(false);

  React.useEffect(() => {
    if (measured.current) return;
    measured.current = true;
    requestAnimationFrame(() => {
      const c = containerRef.current;
      const card = cardRef.current;
      if (!c || !card) return;
      const cardH = card.getBoundingClientRect().height || 120;
      const vh = c.getBoundingClientRect().height || window.innerHeight;
      setOffset(Math.max(0, vh / 2 - cardH / 2 - REST_TOP));
    });
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(onDone, TOTAL_MS + 80);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  const totalSec = TOTAL_MS / 1000;
  const fadeEnd = INTRO_FADE_MS / TOTAL_MS;

  return (
    <div ref={containerRef} className="fixed inset-0" style={{ background: 'var(--guided-canvas)', zIndex: 60 }}>
      <div className="flex flex-col items-center" style={{ minHeight: '100vh' }}>
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: [0, 1, 1], y: [offset, offset, 0] }}
          transition={{ type: 'tween', duration: totalSec, times: [0, fadeEnd, 1], ease: EASE_INOUT_QUAD }}
          className="max-w-[600px] w-[min(100%,600px)]"
          style={{ marginTop: 16 }}
        >
          <div
            className="guided-card"
            style={{
              borderRadius: 24,
              padding: '28px 28px',
              border: '1px solid color-mix(in srgb, var(--guided-accent) 22%, white)',
              textAlign: 'center',
            }}
          >
            <span
              className="inline-flex items-center gap-1.5"
              style={{
                borderRadius: 999,
                padding: '4px 12px',
                backgroundColor: 'color-mix(in srgb, var(--guided-accent) 10%, white)',
                color: T.accent,
                fontSize: 12,
                fontWeight: 550,
              }}
            >
              <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden>
                <circle cx="6" cy="6" r="5" fill="currentColor" opacity="0.85" />
              </svg>
              Guided entry
            </span>
            <p
              style={{
                color: T.ink,
                fontSize: 'clamp(20px, 3vw, 30px)',
                lineHeight: 1.4,
                fontWeight: 560,
                letterSpacing: -0.015,
                textAlign: 'center',
                marginTop: 18,
              }}
            >
              {prompt}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}