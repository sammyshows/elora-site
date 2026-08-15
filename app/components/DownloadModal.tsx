'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const APP_STORE_URL = 'https://apps.apple.com/au/app/elora-journal-with-insight/id6753067869';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.elora.ai';

export default function DownloadModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  const overlay: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  };

  const backdrop: React.CSSProperties = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
  };

  const panel: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: 360,
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };

  const optionLink: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    border: '1px solid #E8EAED',
    background: '#FAFBFC',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color 0.15s, background 0.15s',
  };

  if (!mounted) {
    return (
      <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90">
        Download Now
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        Download Now
      </button>

      {open &&
        createPortal(
          <div style={overlay}>
            <div style={backdrop} onClick={close} aria-hidden="true" />
            <div style={panel} role="dialog" aria-modal="true" aria-label="Download Elora">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#222222', marginBottom: 2 }}>Download Elora</div>
                  <div style={{ fontSize: 14, color: '#555555' }}>Free on iPhone, iPad &amp; Android</div>
                </div>
                <button
                  onClick={close}
                  aria-label="Close"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 6,
                    borderRadius: 8,
                    color: '#555555',
                    lineHeight: 0,
                  }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={optionLink}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(3,90,252,0.4)';
                    e.currentTarget.style.background = '#F0F4FF';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#E8EAED';
                    e.currentTarget.style.background = '#FAFBFC';
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" color="#222222" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M17.05 12.54c-.03-3.1 2.53-4.58 2.64-4.65-1.44-2.1-3.68-2.39-4.48-2.42-1.9-.19-3.72 1.12-4.68 1.12-.97 0-2.46-1.09-4.04-1.06-2.08.03-4 1.21-5.07 3.07-2.16 3.75-.55 9.3 1.55 12.34 1.03 1.49 2.26 3.16 3.87 3.1 1.55-.06 2.14-1 4.01-1 1.87 0 2.4 1 4.04.97 1.67-.03 2.73-1.52 3.75-3.02 1.18-1.73 1.67-3.4 1.7-3.49-.04-.01-3.25-1.25-3.29-4.96zM14.28 4.05c.86-1.03 1.43-2.47 1.27-3.9-1.23.05-2.72.82-3.6 1.85-.79.91-1.48 2.37-1.29 3.77 1.37.1 2.77-.7 3.62-1.72z"/>
                  </svg>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#222222' }}>iPhone &amp; iPad</div>
                    <div style={{ fontSize: 12, color: '#555555' }}>Download on the App Store</div>
                  </div>
                  <span style={{ color: '#035afc', flexShrink: 0 }} aria-hidden="true">&#8594;</span>
                </a>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={optionLink}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(3,90,252,0.4)';
                    e.currentTarget.style.background = '#F0F4FF';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#E8EAED';
                    e.currentTarget.style.background = '#FAFBFC';
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" color="#222222" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25S6.31 12.75 7 12.75s1.25.56 1.25 1.25S7.69 15.25 7 15.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
                  </svg>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#222222' }}>Android</div>
                    <div style={{ fontSize: 12, color: '#555555' }}>Get it on Google Play</div>
                  </div>
                  <span style={{ color: '#035afc', flexShrink: 0 }} aria-hidden="true">&#8594;</span>
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}