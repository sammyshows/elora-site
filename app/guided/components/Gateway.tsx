'use client';

import React from 'react';
import { ArrowRight, PenLine, Sparkles, Star } from 'lucide-react';
import { FadeUp, PressableScale } from './primitives';

const T = {
  ink: 'var(--guided-ink)',
  inkSoft: 'var(--guided-ink-soft)',
  accent: 'var(--guided-accent)',
};

function RecommendedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1"
      style={{
        borderRadius: 999,
        padding: '3px 10px',
        backgroundColor: 'color-mix(in srgb, var(--guided-accent) 14%, white)',
        color: T.accent,
        fontSize: 14,
        fontWeight: 650,
        letterSpacing: 0.1,
      }}
    >
      <Star size={12} color="currentColor" fill="currentColor" strokeWidth={2} />
      Recommended
    </span>
  );
}

/**
 * GATEWAY — mode cards, responsive (stack → 2-up), hover-lift,
 * "Recommended" badge on Guided, clear "start" affordance.
 */
export function Gateway({ onGuided, onTraditional }: { onGuided: () => void; onTraditional: () => void }) {
  return (
    <div className="grid grid-cols-1 -mx-4 gap-4 sm:grid-cols-2 sm:-mx-6 items-stretch">
      <FadeUp delay={0.06} y={12}>
        <PressableScale onTap={onGuided} radius={22} style={{ cursor: 'pointer' }}>
          <div className="guided-card guided-lift px-6 py-4 h-full">
            <div className="flex items-center justify-between">
              <span
                className="flex items-center justify-center"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: 'color-mix(in srgb, var(--guided-accent) 12%, white)',
                  color: T.accent,
                }}
              >
                <Sparkles size={26} color="#035afc" strokeWidth={1.7} />
              </span>
              <RecommendedBadge />
            </div>
            <h3 style={{ color: T.ink, fontSize: 22, fontWeight: 700, letterSpacing: -0.3, marginTop: 16 }}>
              Guided
            </h3>
            <p className="guided-body" style={{ marginTop: 6, color: T.inkSoft, fontSize: 13 }}>
              Get inspiration from one of Elora&apos;s prompts and follow it wherever it leads.
            </p>
            <div className="mt-4 flex items-center gap-2" style={{ color: T.accent, fontSize: 14, fontWeight: 600 }}>
              Start reflecting
              <ArrowRight size={16} color="#035afc" strokeWidth={2} />
            </div>
          </div>
        </PressableScale>
      </FadeUp>

      <FadeUp delay={0.16} y={12}>
        <PressableScale onTap={onTraditional} radius={22} style={{ cursor: 'pointer' }}>
          <div className="guided-card guided-lift px-6 py-4 h-full">
            <div className="flex items-center justify-between">
              <span
                className="flex items-center justify-center"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: 'color-mix(in srgb, var(--guided-accent) 12%, white)',
                  color: T.inkSoft,
                }}
              >
                <PenLine size={26} color="#6B7280" strokeWidth={1.7} />
              </span>
              <span className="guided-micro" style={{ visibility: 'hidden' }}>
                Recommended
              </span>
            </div>
            <h3 style={{ color: T.ink, fontSize: 22, fontWeight: 700, letterSpacing: -0.3, marginTop: 16 }}>
              Traditional
            </h3>
            <p className="guided-body" style={{ marginTop: 6, color: T.inkSoft, fontSize: 13 }}>
              Something&apos;s already on your mind? Open a blank page and let it out.
            </p>
            <div className="mt-4 flex items-center gap-2" style={{ color: T.inkSoft, fontSize: 14, fontWeight: 600 }}>
              Start writing
              <ArrowRight size={16} color="#6B7280" strokeWidth={2} />
            </div>
          </div>
        </PressableScale>
      </FadeUp>
    </div>
  );
}