import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: "Elora vs Other Journaling Apps — Comparison",
  description: "Compare Elora against traditional and other AI journaling apps. Deep self-discovery, hidden pattern recognition, conversational mental clarity, and private-by-design storage.",
  alternates: { canonical: '/compare' },
};

const compareRows: [string, string, string][] = [
  ['Deep self-discovery insight engine', 'No', 'Yes'],
  ['Hidden emotional & behavioral pattern detection', 'No', 'Yes'],
  ['Conversational clarity with your history (Explore)', 'No', 'Yes'],
  ['Voice input with transcription', 'No', 'Yes'],
  ['Searchable history by meaning', 'No', 'Yes'],
  ['Visual map of themes (Soul Map)', 'No', 'Yes'],
  ['AI summaries & insights', 'No', 'Yes'],
  ['Guided reflection prompts', 'No', 'Yes'],
  ['Cross-device sync', 'No', 'Yes'],
  ['End-to-end encryption', 'N/A', 'Yes'],
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
          <p className="text-secondary-text mb-4">Elora is built for deep self-discovery. It transcribes your voice and text entries, analyzes them for emotional and behavioral patterns you might miss, and lets you chat with your journal history to turn them into clarity. Most journaling apps only store what you write; Elora helps you understand why you wrote it.</p>
          <ul className="space-y-2 text-sm text-secondary-text pl-5">
            <li>Voice and text input with automatic transcription</li>
            <li>Hidden emotional & behavioral pattern recognition</li>
            <li>Explore: conversational clarity from your journal history</li>
            <li>Soul Map: visual map of your emotional themes and how they connect</li>
            <li>Private by default with end-to-end encryption</li>
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
            <li><strong className="text-text">Explore</strong> — conversational clarity from your own history.</li>
            <li><strong className="text-text">Soul Map</strong> — a map of recurring emotional patterns and how they connect.</li>
            <li><strong className="text-text">Offline-first storage</strong> — journal without internet, sync securely when online.</li>
            <li><strong className="text-text">End-to-end encryption</strong> — private by design, no data selling, no ads, no AI training on your entries.</li>
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