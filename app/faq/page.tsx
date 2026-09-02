import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: "Elora FAQ — Frequently Asked Questions",
  description: "Answers about Elora, the AI journal for deep self-discovery. How pattern recognition works, voice and text journaling, Explore chat, pricing, and privacy.",
  alternates: { canonical: '/faq' },
};

const faqs: { question: string; answer: string }[] = [
  { question: "What is Elora?", answer: "Elora is a voice and text AI journal for iOS and Android built for deep self-discovery. It transcribes voice entries, analyzes them for emotional and behavioral patterns, and generates personalized insights and clarity. All entries are end-to-end encrypted." },
  { question: "How does Elora work?", answer: "You journal by voice or text. Elora transcribes voice entries automatically, then analyzes each entry for emotional themes and topics. It generates summaries and tags, and over time it detects patterns and trends across your journal." },
  { question: "Is Elora free?", answer: "Yes. Elora is free to download with core journaling, AI summaries, and pattern tracking. Elora Premium adds unlimited Explore chat and advanced insights." },
  { question: "How much does Elora Premium cost?", answer: "Elora Premium is $4.99 per month (USD), billed via Apple or Google. An Annual plan is also available." },
  { question: "Is Elora available on Android?", answer: "Yes. Elora is available on both the Apple App Store (iOS) and Google Play (Android). Your journal syncs across devices when signed into the same account." },
  { question: "Can I journal with my voice?", answer: "Yes. Speak your entry and Elora transcribes it automatically. You can also type if you prefer. Both input methods feed into the same insight engine." },
  { question: "What is the Explore feature?", answer: "Explore is a conversational AI interface that answers questions based on your journal history. You can ask about past entries, recurring themes, or personal growth trends, and it searches your entries by meaning." },
  { question: "What is the Soul Map?", answer: "The Soul Map is a visual map of your emotional patterns. It connects recurring themes, moods, and the parts of your life you write about, so you can see how your thinking connects over time." },
  { question: "What insights does Elora provide?", answer: "Elora generates summaries, emotional themes, and behavioral insights after each entry. It surfaces hidden patterns, mood trends, and personal growth indicators across your journal history, giving you clarity on how you actually think and feel." },
  { question: "Is Elora end-to-end encrypted?", answer: "Yes. All journal entries are encrypted end-to-end. Only you can read your entries; Elora does not have access to your journal content." },
  { question: "Does Elora sell my data?", answer: "No. Elora does not sell user data and does not show advertisements." },
  { question: "Does Elora train AI on my journal?", answer: "No. Elora does not use your entries, summaries, or embeddings to train any external AI models. AI processing is limited to providing the app's features back to you." },
  { question: "What AI providers does Elora use?", answer: "Elora uses AI providers including Anthropic and OpenAI to generate summaries and insights. These providers do not use your data to train their models when accessed via their APIs." },
  { question: "Do I need internet to use Elora?", answer: "Elora works offline for writing entries. AI insights and voice transcription require an internet connection. Entries sync securely when you are online." },
  { question: "How do I delete my Elora account?", answer: "Open Elora, go to Settings, and select Delete Account. Your entries and personal data are removed within up to 30 days." },
  { question: "How do I cancel Elora Premium?", answer: "Subscriptions are managed by Apple or Google. iOS: Settings > your Apple ID > Subscriptions > Elora. Android: Google Play > Payments & subscriptions > Subscriptions > Elora. Cancel at least 24 hours before renewal." },
  { question: "How do I export my journal data?", answer: "Email support to request a data export. You will receive your entries in a portable format such as JSON. You can also delete your data at any time from Settings." },
  { question: "How do I get a refund for Elora Premium?", answer: "Refunds are handled by Apple Support (App Store) or Google Play Support. Elora cannot process refunds for in-app purchases directly." },
  { question: "How do I get started with Elora?", answer: "Download Elora from the App Store or Google Play, create an account, and speak or type your first entry. Elora will suggest prompts if you need inspiration." },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Frequently Asked Questions</h1>
        <p className="text-lg text-secondary-text mb-10">Answers to common questions about Elora.</p>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="group rounded-2xl border border-border bg-surface shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
              <summary className="flex cursor-pointer list-none select-none items-center justify-between gap-4 px-5 py-4 font-semibold text-text">
                <span>{f.question}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-muted transition-all duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-secondary-text leading-relaxed">{f.answer}</div>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-surface p-6 text-center text-sm text-secondary-text shadow-sm">
          <p className="mb-3">Still have questions? <a href="/support" className="text-primary font-semibold hover:underline">Contact support</a>.</p>
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