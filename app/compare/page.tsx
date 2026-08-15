import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: "Elora vs Other Journaling Apps — Comparison",
  description: "Compare Elora against traditional journaling and other journaling apps. Voice and text input, AI emotional insights, Explore chat, Soul Map, and end-to-end encryption.",
  alternates: { canonical: '/compare' },
};

const compareRows: [string, string, string][] = [
  ['Voice input with transcription', 'No', 'Yes'],
  ['Automatic emotional pattern detection', 'No', 'Yes'],
  ['Searchable history by meaning', 'No', 'Yes'],
  ['Visual timeline of themes', 'No', 'Yes (Soul Map)'],
  ['Cross-device sync', 'No', 'Yes'],
  ['End-to-end encryption', 'N/A', 'Yes'],
  ['AI summaries & insights', 'No', 'Yes'],
  ['Guided reflection prompts', 'No', 'Yes'],
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Elora vs Other Journaling Apps</h1>
        <p className="text-lg text-secondary-text mb-12">How Elora compares to traditional journaling and popular journaling apps.</p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-text mb-3">What makes Elora different?</h2>
          <p className="text-secondary-text mb-4">Elora combines voice and text journaling with automatic transcription, emotional pattern detection, and a conversational Explore feature that answers questions about your own journal history. Most journaling apps store text only; Elora analyzes it and makes it queryable by meaning.</p>
          <ul className="space-y-2 text-sm text-secondary-text pl-5">
            <li>Voice and text input with automatic transcription</li>
            <li>AI emotional pattern detection across entries</li>
            <li>Explore: chat with your journal history</li>
            <li>Soul Map: graph visualization of recurring themes</li>
            <li>End-to-end encryption</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-text mb-4">Elora vs Traditional (Pen-and-Paper) Journaling</h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 font-semibold text-text">Capability</th>
                  <th className="text-center px-5 py-3 font-semibold text-text">Traditional journal</th>
                  <th className="text-center px-5 py-3 font-semibold text-text">Elora</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 text-text">{row[0]}</td>
                    <td className="text-center px-5 py-3 text-secondary-text">{row[1]}</td>
                    <td className="text-center px-5 py-3 font-semibold text-text">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-text mb-3">Elora vs Other AI Journaling Apps</h2>
          <p className="text-secondary-text mb-4">Elora's differentiators:</p>
          <ul className="space-y-2 text-sm text-secondary-text pl-5">
            <li><strong className="text-text">Offline-first storage</strong> — journal without internet, sync securely when online.</li>
            <li><strong className="text-text">Explore</strong> — a queryable journal that answers questions about your own history.</li>
            <li><strong className="text-text">Soul Map</strong> — a graph of your recurring themes, emotions, and connections.</li>
            <li><strong className="text-text">End-to-end encryption</strong> — no data selling, no ads, no AI training on your entries.</li>
          </ul>
        </section>

        <div className="rounded-xl border border-border bg-surface p-5 text-center text-sm shadow-sm">
          <p className="m-0">
            <a href="https://apps.apple.com/au/app/elora-journal-with-insight/id6753067869" className="text-primary font-semibold hover:underline">Download on the App Store</a>
            {' · '}
            <a href="https://play.google.com/store/apps/details?id=com.elora.ai" className="text-primary font-semibold hover:underline">Get it on Google Play</a>
          </p>
        </div>
      </main>
    </div>
  );
}