'use client';

import React, { useRef, useState } from 'react';
import { Mic } from 'lucide-react';

const T = {
  surface: 'var(--guided-surface)',
  ink: 'var(--guided-ink)',
  inkSoft: 'var(--guided-ink-soft)',
  muted: 'var(--guided-muted)',
  border: 'var(--guided-border)',
  accent: 'var(--guided-accent)',
};

interface TranscriptResult {
  readonly 0: { transcript: string };
  isFinal: boolean;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: { results: TranscriptResult[] }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

function makeRecognizer(): SpeechRecognitionInstance | null {
  const root = window as any;
  const SR = root.SpeechRecognition || root.webkitSpeechRecognition;
  if (!SR) return null;
  return new SR();
}

function isDictationSupported(): boolean {
  return typeof window !== 'undefined' &&
    Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
}

/**
 * Text + voice input with Web Speech API dictation and a text fallback.
 * Mirrors the mobile answer input (textarea + record button, pulsed while
 * recording). Efficient interim results are surfaced into the field.
 */
export function AnswerInput({
  value,
  onValue,
  onVoiceCommit,
  onFocusChange,
  maxChars = 2000,
  placeholder = 'Write what comes to mind…',
}: {
  value: string;
  onValue: (next: string) => void;
  onVoiceCommit?: (committed: string) => void;
  onFocusChange?: (focused: boolean) => void;
  maxChars?: number;
  placeholder?: string;
}) {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [focused, setFocused] = useState(false);
  // Resolved lazily on the client — prerender/SSR has no window, so detection
  // must happen in an effect, not in a useState initializer.
  const [dictationSupported, setDictationSupported] = useState(false);
  const recRef = useRef<SpeechRecognitionInstance | null>(null);
  const committedRef = useRef(value);

  React.useEffect(() => {
    setDictationSupported(isDictationSupported());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayValue = interim ? interim : value;

  const stopListening = () => {
    const rec = recRef.current;
    recRef.current = null;
    setListening(false);
    setInterim('');
    if (!rec) return;
    try {
      rec.stop();
    } catch {
      /* aborted */
    }
  };

  const startListening = () => {
    if (listening) return stopListening();
    const rec = makeRecognizer();
    if (!rec) {
      setDictationSupported(false);
      return;
    }
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    let finalText = '';
    rec.onresult = (e: { results: TranscriptResult[] }) => {
      const result = e.results[e.results.length - 1];
      if (!result) return;
      if (result.isFinal) {
        finalText = result[0].transcript;
        const base = committedRef.current;
        const spacer = base && !/\s$/.test(base) ? ' ' : '';
        const next = (base + spacer + finalText).trim();
        committedRef.current = next;
        onValue(next);
        onVoiceCommit?.(next);
        setInterim('');
      } else {
        setInterim(result[0].transcript);
      }
    };
    rec.onend = () => {
      recRef.current = null;
      setListening(false);
      setInterim('');
    };
    rec.onerror = () => {
      recRef.current = null;
      setListening(false);
      setInterim('');
    };

    recRef.current = rec;
    committedRef.current = value;
    try {
      rec.start();
      setListening(true);
    } catch {
      setDictationSupported(false);
      setListening(false);
    }
  };

  return (
    <div
      className={`w-full flex flex-col guided-input ${focused ? 'guided-input-focused' : ''}`}
      style={{
        backgroundColor: T.surface,
        borderRadius: 18,
        border: focused ? '1.5px solid var(--guided-accent)' : `1px solid ${T.border}`,
        boxShadow: focused ? '0 4px 14px rgba(3, 90, 252, 0.16)' : '0 1px 2px rgba(16,24,40,0.05)',
      }}
    >
      <label
        className="block px-4 pb-1.5"
        style={{ color: T.muted, fontSize: 12.5, fontWeight: 560, letterSpacing: 0.1 }}
      >
        Your answer
      </label>
      <textarea
        value={displayValue}
        placeholder={placeholder}
        maxLength={maxChars}
        rows={3}
        onFocus={() => {
          setFocused(true);
          onFocusChange?.(true);
        }}
        onBlur={() => {
          setFocused(false);
          onFocusChange?.(false);
        }}
        onChange={(e) => {
          const next = e.target.value;
          committedRef.current = next;
          onValue(next);
        }}
        className="w-full resize-none px-4 py-2"
        style={{
          color: T.ink,
          background: 'transparent',
          outline: 'none',
          fontSize: 16, // >=16px prevents iOS focus-zoom
          lineHeight: '26px',
          minHeight: 120,
        }}
      />
      <div
        className="flex items-center justify-between px-3 py-1.5"
        style={{ borderTop: '1px solid color-mix(in srgb, var(--guided-border) 60%, white)' }}
      >
        <span style={{ color: T.muted, fontSize: 12 }}>
          {value.length.toLocaleString()} / {maxChars.toLocaleString()}
        </span>
        <button
          type="button"
          onClick={startListening}
          aria-label={listening ? 'Stop dictation' : 'Use voice dictation'}
          title={dictationSupported ? (listening ? 'Stop dictation' : 'Dictate this answer') : 'Dictation not supported in this browser, type instead'}
          className={`flex items-center gap-2 ${listening ? '' : 'guided-lift'}`}
          style={{
            borderRadius: 999,
            padding: '8px 16px',
            border: 'none',
            background: listening ? T.accent : 'color-mix(in srgb, var(--guided-accent) 8%, white)',
            color: listening ? '#fff' : T.inkSoft,
            boxShadow: '0 1px 2px rgba(16,24,40,0.06)',
          }}
        >
          <Mic size={17} color={listening ? '#fff' : 'var(--guided-ink-soft)'} strokeWidth={1.8} />
          <span style={{ fontSize: 13.5, fontWeight: 560 }}>
            {listening ? 'Listening…' : dictationSupported ? 'Dictate' : 'Mic unavailable'}
          </span>
        </button>
      </div>
    </div>
  );
}