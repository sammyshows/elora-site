'use client';

import React from 'react';
import Image from 'next/image';
import { Check, Shield } from 'lucide-react';
import { CardEntrance } from './primitives';

const T = {
  ink: 'var(--guided-ink)',
  inkSoft: 'var(--guided-ink-soft)',
  muted: 'var(--guided-muted)',
  accent: 'var(--guided-accent)',
};

function GoogleLogo() {
  return (
    <Image
      src="/brand/logo-google.svg"
      alt=""
      width={24}
      height={24}
      className="h-auto w-[24px]"
      unoptimized
      priority
    />
  );
}

function AppleLogo() {
  return (
    <Image
      src="/brand/logo-apple.svg"
      alt=""
      width={24}
      height={24}
      className="h-auto w-[24px]"
      unoptimized
      priority
    />
  );
}

/**
 * CLAIM PROMPT — non-intrusive account-link panel.
 * Google / Apple provider cards with explicit privacy microcopy. There is no
 * dismiss: the finale funnel pushes toward linking, with the app showcase as
 * the alternative path.
 */
export function ClaimPrompt({
  onGoogle,
  onApple,
  claimed,
}: {
  onGoogle: () => void;
  onApple: () => void;
  claimed: boolean;
}) {
  return (
    <CardEntrance delay={0.35}>
      <div className="guided-card" style={{ borderRadius: 22, padding: 'clamp(12px, 2vw, 18px)' }}>
        {claimed ? (
          <div className="text-center">
            <span
              className="flex items-center justify-center mx-auto"
              style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: 'color-mix(in srgb, var(--guided-accent) 14%, white)', color: T.accent }}
            >
              <Check size={26} color="currentColor" strokeWidth={2.2} />
            </span>
            <h3 className="guided-heading" style={{ margin: '14px auto 0' }}>
              Saved to your account
            </h3>
            <p className="guided-lede" style={{ maxWidth: 380, margin: '8px auto 0' }}>
              This reflection is synced to your Elora journal, ready in the app next time.
            </p>
          </div>
        ) : (
          <div className="py-2">
            <h3 className="guided-heading" style={{ textAlign: 'center' }}>
              Keep this reflection
            </h3>
            <p
              className="guided-lede"
              style={{
                width: '80%',
                margin: '10px auto 0',
                textAlign: 'center',
                fontSize: 13.5,
                lineHeight: '20px',
              }}
            >
              Link an account and this entry joins your Elora journal, where it starts
              building your pattern map across entries.
            </p>

            <div className="hidden md:flex mt-4 flex-col items-center gap-2" style={{ color: T.muted }}>
              <p className="guided-micro" style={{ textAlign: 'center' }}>• Syncs to iOS & Android apps</p>
              <p className="guided-micro" style={{ textAlign: 'center' }}>• Not used to train models</p>
            </div>

            <div className="mt-5 flex flex-col gap-3 items-center sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={onGoogle}
                className="guided-card guided-lift flex items-center justify-center gap-2.5 w-[80%] sm:w-auto"
                style={{ borderRadius: 16, padding: '13px 10px', border: '1px solid color-mix(in srgb, var(--guided-border) 70%, white)', cursor: 'pointer' }}
              >
                <GoogleLogo />
                <span style={{ color: T.ink, fontSize: 15, fontWeight: 620 }}>Continue with Google</span>
              </button>
              <button
                type="button"
                onClick={onApple}
                className="guided-card guided-lift flex items-center justify-center gap-2.5 w-[80%] sm:w-auto"
                style={{ borderRadius: 16, padding: '13px 10px', border: '1px solid color-mix(in srgb, var(--guided-border) 70%, white)', cursor: 'pointer' }}
              >
                <AppleLogo />
                <span style={{ color: T.ink, fontSize: 15, fontWeight: 620 }}>Continue with Apple</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="guided-micro text-center" style={{ marginTop: 16, color: T.muted }}>
        <span className="inline-flex items-center gap-1.5">
          <Shield size={17} color="currentColor" strokeWidth={1.7} />
          Encrypted & private by design
        </span>
      </div>
    </CardEntrance>
  );
}