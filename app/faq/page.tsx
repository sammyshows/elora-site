import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Elora FAQ — Frequently Asked Questions",
  description: "Answers to common questions about Elora, the AI voice journaling app. Pricing, privacy, encryption, features, voice journaling, and how to delete or export your data.",
  alternates: { canonical: '/faq' },
};

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is Elora?",
    answer: "Elora is a voice-first AI journaling app for iOS and Android. It transcribes voice journal entries, analyzes them for emotional patterns, and generates personalized insights. All entries are encrypted end-to-end."
  },
  {
    question: "How does Elora work?",
    answer: "You journal by voice or text. Elora transcribes voice entries automatically, then analyzes each entry for emotional themes and topics. It generates summaries and tags, and over time it detects patterns and trends across your journal."
  },
  {
    question: "Is Elora free?",
    answer: "Yes. Elora is free to download with core journaling, AI summaries, and pattern tracking. Elora Premium adds unlimited Explore chat and advanced insights."
  },
  {
    question: "How much does Elora Premium cost?",
    answer: "Elora Premium is $4.99 per month (USD), billed via Apple or Google. An Annual plan is also available. See the pricing page for details."
  },
  {
    question: "Is Elora available on Android?",
    answer: "Yes. Elora is available on both the Apple App Store (iOS) and Google Play (Android). Your journal syncs across devices when signed into the same account."
  },
  {
    question: "Can I journal with my voice?",
    answer: "Yes. Elora is voice-first. Speak your entry and Elora transcribes it automatically. You can also type if you prefer. Both input methods feed into the same insight engine."
  },
  {
    question: "What is the Explore feature?",
    answer: "Explore is a conversational AI interface that answers questions based on your journal history. You can ask about past entries, recurring themes, or personal growth trends, and it searches your entries by meaning."
  },
  {
    question: "What is the Soul Map?",
    answer: "The Soul Map is a graph visualization that connects your thoughts, emotions, and recurring themes across journal entries. It helps you see how different parts of your life connect."
  },
  {
    question: "What insights does Elora provide?",
    answer: "Elora generates summaries, emotional themes, and behavioral insights after each entry. It tracks recurring patterns, mood trends, and personal growth indicators across your journal history."
  },
  {
    question: "Is Elora end-to-end encrypted?",
    answer: "Yes. All journal entries are encrypted end-to-end. Only you can read your entries; Elora does not have access to your journal content."
  },
  {
    question: "Does Elora sell my data?",
    answer: "No. Elora does not sell user data and does not show advertisements."
  },
  {
    question: "Does Elora train AI on my journal?",
    answer: "No. Elora does not use your entries, summaries, or embeddings to train any external AI models. AI processing is limited to providing the app's features back to you."
  },
  {
    question: "What AI providers does Elora use?",
    answer: "Elora uses AI providers including Anthropic and OpenAI to generate summaries and insights. These providers do not use your data to train their models when accessed via their APIs."
  },
  {
    question: "Do I need internet to use Elora?",
    answer: "Elora works offline for writing entries. AI insights and voice transcription require an internet connection. Entries sync securely when you are online."
  },
  {
    question: "How do I delete my Elora account?",
    answer: "Open Elora, go to Settings, and select Delete Account. You can also email support with the subject \"Delete My Account\". Your entries and personal data are removed within up to 30 days."
  },
  {
    question: "How do I cancel Elora Premium?",
    answer: "Subscriptions are managed by Apple or Google. On iOS, open Settings > your Apple ID > Subscriptions and select Elora. On Android, open Google Play > Payments & subscriptions > Subscriptions. Cancel at least 24 hours before renewal."
  },
  {
    question: "How do I export my journal data?",
    answer: "Email support to request a data export. You will receive your entries in a portable format such as JSON. You can also delete your data at any time from Settings."
  },
  {
    question: "How do I get a refund for Elora Premium?",
    answer: "Refunds are handled by Apple Support (App Store) or Google Play Support. Elora cannot process refunds for in-app purchases directly."
  },
  {
    question: "How do I get started with Elora?",
    answer: "Download Elora from the App Store or Google Play, create an account, and speak or type your first entry. Elora will suggest prompts if you need inspiration. The more you journal, the more personalized your insights become."
  }
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: '1.6',
      color: 'var(--foreground)',
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 style={{ fontSize: '36px', marginBottom: '8px', fontWeight: '700' }}>
        Frequently Asked Questions
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '40px' }}>
        Answers to common questions about Elora.
      </p>

      <div style={{ display: 'grid', gap: '12px' }}>
        {faqs.map((faq, index) => (
          <details
            key={index}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <summary style={{
              cursor: 'pointer',
              padding: '16px 20px',
              fontWeight: '600',
              listStyle: 'none',
              color: 'var(--foreground)',
            }}>
              {faq.question}
            </summary>
            <div style={{ padding: '0 20px 16px', color: 'var(--foreground)' }}>
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '24px',
        marginTop: '40px',
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, fontSize: '16px' }}>
          Still have questions? <a href="/support" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>Contact support</a>.
        </p>
        <p style={{ margin: '16px 0 0', fontSize: '16px' }}>
          <a href="https://apps.apple.com/au/app/elora-journal-with-insight/id6753067869" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>Download on the App Store</a>
          {' · '}
          <a href="https://play.google.com/store/apps/details?id=com.elora.ai" style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}>Get it on Google Play</a>
        </p>
      </div>
    </div>
  );
}