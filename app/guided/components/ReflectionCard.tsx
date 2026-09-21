'use client';

import React from 'react';
import { ReflectionCard as CardData } from '@/lib/guided-api';
import { CardEntrance } from './primitives';

const T = {
  ink: 'var(--guided-ink)',
  inkSoft: 'var(--guided-ink-soft)',
  muted: 'var(--guided-muted)',
  accent: 'var(--guided-accent)',
  emotionTag: 'var(--guided-emotion-tag)',
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch {
    return '';
  }
}

/**
 * REFLECTION CARD — the "reflection card" product moment, rendered as a
 * modern article-like card: emoji tile, title, mood tags, Elora's take, and
 * the guided Q&A that got you here.
 */
export function ReflectionCard({ card }: { card: CardData }) {
  return (
    <CardEntrance delay={0.1}>
      <article
        className="guided-card"
        style={{
          borderRadius: 24,
          padding: 'clamp(24px, 4vw, 36px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-4" style={{ marginBottom: 20 }}>
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'color-mix(in srgb, var(--guided-accent) 12%, white)',
              fontSize: 30,
            }}
          >
            {card.emoji || '📝'}
          </div>
          <div className="flex-1 min-w-0">
            <h2
              className="truncate"
              style={{
                color: T.ink,
                fontSize: 'clamp(20px, 3vw, 28px)',
                lineHeight: '32px',
                fontWeight: 700,
                letterSpacing: -0.3,
              }}
            >
              {card.title || 'Untitled Reflection'}
            </h2>
            <p className="guided-micro" style={{ color: T.muted, marginTop: 4 }}>
              {formatDate(card.created_at)} · saved to your Elora journal
            </p>
          </div>
        </div>

        {/* Mood tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 16 }}>
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1"
                style={{
                  backgroundColor: T.emotionTag,
                  borderRadius: 999,
                  color: T.ink,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Elora's take */}
        {card.ai_summary && (
          <div
            style={{
              borderRadius: '0 14px 14px 0',
              backgroundColor: 'color-mix(in srgb, var(--guided-accent) 12%, transparent)',
              border: 'none',
              borderLeft: '3px solid var(--guided-accent)',
              padding: '14px 18px',
            }}
          >
            <p style={{ color: T.inkSoft, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.1 }}>
              Elora&apos;s take
            </p>
            <p className="guided-body" style={{ marginTop: 6, color: T.ink, fontSize: 14 }}>
              {card.ai_summary}
            </p>
          </div>
        )}

        {/* Guided Q&A */}
        {card.turns && card.turns.length > 0 && (
          <div className="mt-5 flex flex-col gap-4">
            <div className="guided-sep" />
            {card.turns.map((step, i) => (
              <div key={i}>
                <p
                  style={{
                    color: T.ink,
                    fontSize: 15,
                    fontWeight: 620,
                    lineHeight: '23px',
                    letterSpacing: -0.1,
                  }}
                >
                  {step.prompt}
                </p>
                <p
                  className="mt-2.5 guided-body"
                  style={{ color: T.ink, whiteSpace: 'pre-wrap', marginLeft: 24 }}
                >
                  {step.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </article>
    </CardEntrance>
  );
}