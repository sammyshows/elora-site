import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: "Elora Features — AI Journaling App",
  description: "Analysis-first AI journaling for deep self-discovery: emotional and behavioral pattern recognition, conversational clarity with your journal history, voice and text entry, and private end-to-end encryption.",
  alternates: { canonical: '/features' },
};

const features = [
  { title: "Emotional & Behavioral Pattern Recognition", description: "Elora tracks moods, emotional themes, and topics across entries over weeks and months, surfacing hidden behavioral patterns so you can see how you actually think and grow.", category: "Analysis" },
  { title: "AI Insights & Summaries", description: "Each entry is analyzed for emotional themes, key topics, and recurring patterns. Summaries appear in your timeline automatically.", category: "Analysis" },
  { title: "Voice Journaling", description: "Speak your journal entries naturally. Elora transcribes your voice into text automatically.", category: "Input" },
  { title: "Text Journaling", description: "Type entries using the keyboard. Both voice and text entries feed into the same insight engine.", category: "Input" },
  { title: "Explore: Chat with Your Journal", description: "A conversational interface that answers questions based on your journal history. Ask about past entries, recurring themes, or personal growth trends for clarity.", category: "Interaction" },
  { title: "Soul Map", description: "A map of your emotional patterns — recurring themes, moods, and connections between parts of your life, built from how you journal over time.", category: "Visualization" },
  { title: "Guided Reflection Prompts", description: "When you are unsure what to write, Elora suggests prompts based on patterns from your own journal, not generic templates.", category: "Journaling" },
  { title: "Cross-Device Sync", description: "Journal data syncs securely across iOS and Android devices when signed into the same account.", category: "Platform" },
  { title: "Offline-First Storage", description: "Entries are saved on-device first and sync securely when online. Journaling works without an internet connection.", category: "Privacy" },
  { title: "End-to-End Encryption", description: "All journal entries are encrypted end-to-end. Only you can read your entries. Elora cannot access your journal content.", category: "Privacy" },
  { title: "No Ads or Data Selling", description: "Elora does not show advertisements, sell user data, or use journal entries to train AI models.", category: "Privacy" },
  { title: "Elora Premium", description: "Unlimited Explore chat conversations and advanced AI insights. Available as a Monthly or Annual subscription at $4.99/month.", category: "Pricing" },
];

export default function FeaturesPage() {
  const categories = [...new Set(features.map((f) => f.category))];

  const featureSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Elora Features",
    "itemListElement": features.map((f, i) => ({ "@type": "ListItem", "position": i + 1, "name": f.title, "description": f.description }))
  };

  const card = "rounded-2xl border border-border bg-surface p-6 shadow-sm hover:shadow-md transition-shadow";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featureSchema) }} />
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Elora Features</h1>
        <p className="text-lg text-secondary-text mb-12">Analysis-first AI journaling for deep self-discovery on iOS and Android.</p>

        {categories.map((cat) => (
          <section key={cat} className="mb-12">
            <h2 className="text-xl font-semibold text-text mb-4 pb-2 border-b border-border">
              {cat}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.filter((f) => f.category === cat).map((f) => (
                <div key={f.title} className={card}>
                  <h3 className="text-base font-semibold text-text mb-2">{f.title}</h3>
                  <p className="text-sm text-secondary-text leading-relaxed m-0">{f.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}