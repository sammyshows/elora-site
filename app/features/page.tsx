import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Elora Features — AI Voice Journaling App",
  description: "Voice journaling, AI insights, emotional pattern detection, Explore chat, Soul Map visualization, and end-to-end encryption. All features of Elora for iOS and Android.",
  alternates: { canonical: '/features' },
  openGraph: {
    title: "Elora Features — AI Voice Journaling App",
    description: "Voice journaling, AI insights, emotional pattern detection, Explore chat, Soul Map visualization, and end-to-end encryption.",
    url: 'https://elora.day/features',
  },
};

const features = [
  {
    title: "Voice Journaling",
    description: "Speak your journal entries naturally. Elora transcribes voice recordings into text automatically. No typing required.",
    category: "Input",
  },
  {
    title: "Text Journaling",
    description: "Type entries using the keyboard. Both voice and text entries feed into the same insight engine.",
    category: "Input",
  },
  {
    title: "AI Insights & Summaries",
    description: "Each entry is analyzed for emotional themes, key topics, and recurring patterns. Summaries appear in your timeline automatically.",
    category: "Analysis",
  },
  {
    title: "Emotional Pattern Detection",
    description: "Elora tracks moods, emotional themes, and topics across entries over weeks and months. Patterns are surfaced so you can see your growth.",
    category: "Analysis",
  },
  {
    title: "Explore: Chat with Your Journal",
    description: "A conversational interface that answers questions based on your journal history. Ask about past entries, recurring themes, or personal growth trends.",
    category: "Interaction",
  },
  {
    title: "Soul Map",
    description: "A graph visualization connecting thoughts, emotions, and recurring themes across your journal entries. See how different parts of your life connect.",
    category: "Visualization",
  },
  {
    title: "Guided Reflection Prompts",
    description: "When you are unsure what to write, Elora suggests prompts based on patterns from your own journal, not generic templates.",
    category: "Journaling",
  },
  {
    title: "Offline-First Storage",
    description: "Entries are saved on-device first and sync securely when online. Journaling works without an internet connection.",
    category: "Privacy",
  },
  {
    title: "End-to-End Encryption",
    description: "All journal entries are encrypted end-to-end. Only you can read your entries. Elora cannot access your journal content.",
    category: "Privacy",
  },
  {
    title: "Cross-Device Sync",
    description: "Journal data syncs securely across iOS and Android devices when signed into the same account.",
    category: "Platform",
  },
  {
    title: "No Ads or Data Selling",
    description: "Elora does not show advertisements, sell user data, or use journal entries to train AI models.",
    category: "Privacy",
  },
  {
    title: "Elora Premium",
    description: "Unlimited Explore chat conversations and advanced AI insights. Available as a Monthly or Annual subscription.",
    category: "Pricing",
  },
];

export default function FeaturesPage() {
  const categories = [...new Set(features.map(f => f.category))];

  const featureSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Elora Features",
    "itemListElement": features.map((f, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": f.title,
      "description": f.description
    }))
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: '1.6',
      color: 'var(--text)',
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featureSchema) }}
      />
      <h1 style={{ fontSize: '36px', marginBottom: '8px', fontWeight: '700' }}>
        Elora Features
      </h1>
      <p style={{ fontSize: '18px', color: 'var(--foreground)', marginBottom: '40px' }}>
        Voice-first AI journaling for iOS and Android. End-to-end encrypted.
      </p>

      {categories.map(category => (
        <section key={category} style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '24px', fontWeight: '600', marginBottom: '16px',
            borderBottom: '2px solid var(--border)', paddingBottom: '8px',
          }}>
            {category}
          </h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {features.filter(f => f.category === category).map(f => (
              <div key={f.title} style={{
                background: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '20px',
              }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: '600' }}>{f.title}</h3>
                <p style={{ margin: 0, color: 'var(--foreground)' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}