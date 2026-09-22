'use client';

/**
 * Cloudflare Turnstile — invisible widget.
 *
 * The widget itself is hidden; when a challenge passes it invokes the
 * callback with a one-time token that must be exchanged server-side via
 * siteverify. When NEXT_PUBLIC_TURNSTILE_SITE_KEY is empty (dev), no widget
 * is rendered and null is returned — the backend skips verification when its
 * secret is also unset.
 */

let scriptLoaded = false;

async function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined' || (window as any).turnstile || scriptLoaded) return;
  scriptLoaded = true;
  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  script.async = true;
  document.head.appendChild(script);
  await new Promise<void>((resolve) => {
    script.onload = () => resolve();
    setTimeout(resolve, 2500); // never block on third-party
  });
}

/**
 * Render the invisible Turnstile and await the token.
 * @returns the challenge token, or null when disabled/errored.
 */
export async function runTurnstile(action: string): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null; // dev: no widget, backend skips verification

  await loadTurnstileScript();
  const g = window as any;
  if (!g.turnstile) return null;

  const containerId = `cf-turnstile-${Date.now()}`;
  const container = document.createElement('div');
  container.id = containerId;
  container.style.cssText =
    'position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;';
  document.body.appendChild(container);

  return new Promise<string | null>((resolve) => {
    const done = (value: string | null) => {
      resolve(value);
      try {
        container.remove();
      } catch {
        /* already gone */
      }
    };

    try {
      // Pass the element node (not the id string): avoids the widget's
      // getElementById lookup racing the insert.
      g.turnstile.render(container, {
        sitekey: siteKey,
        action,
        theme: 'light',
        callback: (token: string) => done(token),
        'error-callback': () => done(null),
      });
    } catch (err) {
      console.warn('[Elora] Turnstile render failed:', err);
      done(null);
      return;
    }
    // Safety net — the callback should always fire, but never hang the flow.
    setTimeout(() => done(null), 15000);
  });
}