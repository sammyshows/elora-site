'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, Shuffle } from 'lucide-react';
import { AnswerInput } from './AnswerInput';
import { ChangePromptModal } from './ChangePromptModal';
import { SpringPop } from './primitives';
import { alternatesFor } from '@/lib/guided-prompts';

const T = {
  ink: 'var(--guided-ink)',
  inkSoft: 'var(--guided-ink-soft)',
  muted: 'var(--guided-muted)',
  accent: 'var(--guided-accent)',
};

function promptType(text: string) {
  const len = text.length;
  return {
    fontSize: len > 170 ? 18 : len > 120 ? 19 : 21,
    lineHeight: len > 170 ? '28px' : len > 120 ? '30px' : '32px',
  };
}

/**
 * PROMPT STAGE — pinned prompt card, spring-in "change prompt" modal with
 * three alternatives, the labeled answer input, and the floating action
 * buttons (Continue / Finish & Save) rendered right beneath the textarea.
 *
 * Visibility rules (content-driven, not focus-driven):
 *  - Actions show whenever there is any content in the answer box, OR a
 *    prompt has already been answered (turn 2/3).
 *  - "Change prompt" follows the inverse of that same rule: it only appears
 *    on a fresh guided prompt (no content, no turns yet).
 */
export function PromptStage({
  activePrompt,
  turnsCount,
  content,
  onContentChange,
  generatingFollowUp,
  promptLimitReached,
  onPromptChange,
  onContinue,
  onFinish,
  traditional,
  onVoiceCommit,
}: {
  activePrompt: string | null;
  turnsCount: number;
  content: string;
  onContentChange: (v: string) => void;
  generatingFollowUp: boolean;
  promptLimitReached: boolean;
  onPromptChange: (next: string) => void;
  onContinue: () => void;
  onFinish: () => void;
  traditional: boolean;
  onVoiceCommit?: () => void;
}) {
  const [chooserOpen, setChooserOpen] = useState(false);
  const modalOptions = activePrompt ? alternatesFor(activePrompt, 3) : [];

  const hasContent = content.trim().length > 0;
  // Actions are visible whenever there's text OR we're already on prompt 2/3.
  const actionsVisible = hasContent || turnsCount >= 1;

  const showContinue = actionsVisible && !promptLimitReached;
  const showFinish = actionsVisible;

  return (
    <div className="w-full flex flex-col gap-6 mt-4">
      {/* Pinned prompt card */}
      {!traditional && activePrompt && (
        <SpringPop key={activePrompt} spring={{ stiffness: 120, damping: 8 }}>
          <div
            className="guided-card"
            style={{
              borderRadius: 22,
              padding: '22px 24px',
              border: '1px solid color-mix(in srgb, var(--guided-accent) 26%, white)',
            }}
          >
            <p
              style={{
                color: T.ink,
                ...promptType(activePrompt),
                fontWeight: 560,
                letterSpacing: -0.012,
                textAlign: 'center',
              }}
            >
              {activePrompt}
            </p>
          </div>
        </SpringPop>
      )}

      {/* Change-prompt affordance — always mounted in this window; fades to
          invisible + unclickable while there is content, fades back in. */}
      {!traditional && activePrompt && turnsCount < 1 && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: hasContent ? 0 : 1, y: 0 }}
          transition={{ type: 'tween', duration: 0.3, delay: 0.2 }}
          onClick={() => setChooserOpen(true)}
          aria-hidden={hasContent}
          tabIndex={hasContent ? -1 : 0}
          className="flex items-center gap-1.5 mx-auto"
          style={{
            color: T.muted,
            fontSize: 13,
            fontWeight: 520,
            background: 'none',
            border: 'none',
            padding: '6px 12px',
            cursor: 'pointer',
            pointerEvents: hasContent ? 'none' : 'auto',
          }}
        >
          <Shuffle size={15} color="currentColor" strokeWidth={2} />
          Change prompt
        </motion.button>
      )}

      {/* Answer input */}
      <AnswerInput
        value={content}
        onValue={onContentChange}
        onVoiceCommit={onVoiceCommit}
      />

      <p className="guided-micro" style={{ textAlign: 'center' }}>
        {promptLimitReached && turnsCount >= 1
          ? 'That was the last prompt. Continue whenever you like.'
          : 'Take your time. There is no right answer.'}
      </p>

      {/* Floating action buttons — below the hint, with noticeable spacing */}
      {(showContinue || showFinish) && (
        <div className="flex flex-col items-center gap-3 w-full" style={{ marginTop: 22 }}>
          {showContinue && (
            <button
              type="button"
              className="guided-cta px-10"
              onClick={onContinue}
              disabled={generatingFollowUp}
              style={{ maxWidth: 320 }}
            >
              {generatingFollowUp ? 'Reflecting…' : 'Continue'}
              {generatingFollowUp && <Loader size={17} color="#fff" strokeWidth={2.4} className="guided-spinner" />}
            </button>
          )}
          {showFinish && (
            <button type="button" className="guided-link-cta" onClick={onFinish} disabled={generatingFollowUp}>
              {promptLimitReached ? 'Finish & see your reflection' : 'Finish & Save'}
            </button>
          )}
        </div>
      )}

      {/* Spring-in chooser modal */}
      <ChangePromptModal
        open={chooserOpen}
        current={activePrompt}
        options={modalOptions}
        onSelect={(next) => {
          if (next !== activePrompt) onPromptChange(next);
          setChooserOpen(false);
        }}
        onClose={() => setChooserOpen(false)}
      />
    </div>
  );
}