import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Elora vs Other Journaling Apps — Comparison",
  description: "Compare Elora against traditional journaling and other journaling apps. Voice transcription, AI emotional insights, Explore chat, Soul Map, and end-to-end encryption.",
  alternates: { canonical: '/compare' },
};

export default function ComparePage() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: '1.6',
      color: 'var(--foreground)',
    }}>
      <h1 style={{ fontSize: '36px', marginBottom: '8px', fontWeight: '700' }}>
        Elora vs Other Journaling Apps
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '40px' }}>
        How Elora compares to traditional journaling and popular journaling apps.
      </p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '24px', fontWeight: '600', marginBottom: '16px',
          borderBottom: '2px solid var(--border)', paddingBottom: '8px',
        }}>
          What makes Elora different?
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Elora combines voice journaling with automatic transcription, emotional pattern detection, and a conversational Explore feature that answers questions about your own journal history. Most journaling apps store text only; Elora analyzes it and makes it queryable by meaning.
        </p>
        <ul style={{ paddingLeft: '24px', margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>Voice-first with automatic transcription</li>
          <li style={{ marginBottom: '8px' }}>AI emotional pattern detection across entries</li>
          <li style={{ marginBottom: '8px' }}>Explore: chat with your journal history</li>
          <li style={{ marginBottom: '8px' }}>Soul Map: graph visualization of recurring themes</li>
          <li style={{ marginBottom: '8px' }}>End-to-end encryption</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '24px', fontWeight: '600', marginBottom: '16px',
          borderBottom: '2px solid var(--border)', paddingBottom: '8px',
        }}>
          Elora vs Traditional (Pen-and-Paper) Journaling
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border)' }}>Capability</th>
              <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid var(--border)' }}>Traditional journal</th>
              <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid var(--border)' }}>Elora</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Voice input with transcription', 'No', 'Yes'],
              ['Automatic emotional pattern detection', 'No', 'Yes'],
              ['Searchable history by meaning', 'No', 'Yes'],
              ['Visual timeline of themes', 'No', 'Yes (Soul Map)'],
              ['Cross-device sync', 'No', 'Yes'],
              ['End-to-end encryption', 'N/A', 'Yes'],
              ['AI summaries & insights', 'No', 'Yes'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{row[0]}</td>
                <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid var(--border)' }}>{row[1]}</td>
                <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid var(--border)', fontWeight: '600' }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '24px', fontWeight: '600', marginBottom: '16px',
          borderBottom: '2px solid var(--border)', paddingBottom: '8px',
        }}>
          Elora vs Other AI Journaling Apps
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Elora's differentiators are:
        </p>
        <ul style={{ paddingLeft: '24px', margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>
            <strong>Offline-first storage</strong> — journal without an internet connection, then sync securely when online.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Explore</strong> — a queryable journal that answers questions about your own history, not generic prompts.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Soul Map</strong> — a graph of your recurring themes, emotions, and connections.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>End-to-end encryption</strong> — no data selling, no ads, no AI training on your entries.
          </li>
        </ul>
      </section>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, fontSize: '16px' }}>
          <a href="https://apps.apple.com/au/app/elora-journal-with-insight/id6753067869" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>Download on the App Store</a>
          {' · '}
          <a href="https://play.google.com/store/apps/details?id=com.elora.ai" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>Get it on Google Play</a>
        </p>
      </div>
    </div>
  );
}