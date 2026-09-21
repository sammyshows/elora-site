'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { EASE_OUT_CUBIC } from './primitives';

const T = {
  ink: 'var(--guided-ink)',
  inkSoft: 'var(--guided-ink-soft)',
  accent: 'var(--guided-accent)',
};

/**
 * "Change prompt" modal — springs in with three alternative prompts.
 * Backdrop fades in, the panel spring-pops (scale 0.9 → 1), options cascade in.
 */
export function ChangePromptModal({
  open,
  current,
  options,
  onSelect,
  onClose,
}: {
  open: boolean;
  current: string | null;
  options: string[];
  onSelect: (prompt: string) => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Choose a prompt">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'tween', duration: 0.22, ease: EASE_OUT_CUBIC }}
        onClick={onClose}
        style={{ backgroundColor: 'rgba(11, 11, 11, 0.45)', backdropFilter: 'blur(4px)' }}
      />

      <motion.div
        className="guided-card w-full"
        initial={{ scale: 0.9, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 230, damping: 20 }}
        style={{
          maxWidth: 640,
          width: 'min(640px, 94vw)',
          borderRadius: 22,
          position: 'relative',
          paddingBottom: 16,
        }}
      >
        {/* Header — title centered between a spacer and the close button */}
        <div className="flex items-center justify-between" style={{ padding: '16px 18px 8px' }}>
          <span style={{ width: 34 }} aria-hidden />
          <p
            style={{
              flex: 1,
              textAlign: 'center',
              color: T.ink,
              fontSize: 17,
              fontWeight: 650,
              letterSpacing: -0.2,
            }}
          >
            Choose a prompt
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              borderRadius: 999,
              padding: 8,
              cursor: 'pointer',
              color: T.inkSoft,
            }}
          >
            <X size={18} color="currentColor" strokeWidth={2.2} />
          </button>
        </div>

        {/* Alternatives */}
        {options.map((prompt, i) => (
          <motion.div
            key={prompt}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'tween', duration: 0.28, delay: 0.05 * i + 0.08, ease: EASE_OUT_CUBIC }}
          >
            <button
              type="button"
              onClick={() => onSelect(prompt)}
              className="guided-card guided-lift text-left"
              style={{
                margin: `${i === 0 ? 14 : 10}px auto 0`,
                width: '95%',
                borderRadius: 18,
                padding: '16px 18px',
                border: prompt === current
                  ? '2px solid var(--guided-accent)'
                  : '2px solid color-mix(in srgb, var(--guided-border) 55%, var(--guided-ink-soft))',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                overflowWrap: 'break-word',
                boxShadow: '0 1px 2px rgba(16, 24, 40, 0.05), 0 4px 12px rgba(16, 24, 40, 0.07)',
              }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  backgroundColor:
                    prompt === current
                      ? 'var(--guided-accent)'
                      : 'color-mix(in srgb, var(--guided-accent) 14%, white)',
                  color: prompt === current ? '#fff' : 'var(--guided-accent)',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  color: T.ink,
                  fontSize: 16,
                  lineHeight: '24px',
                  fontWeight: 520,
                  flex: 1,
                  minWidth: 0,
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                }}
              >
                {prompt}
              </span>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}