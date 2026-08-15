import SectionHeading from './SectionHeading';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is Elora and how does it work?",
    answer: "Elora is an AI-powered voice journaling app for iOS and Android. You journal using voice or text. Elora transcribes voice entries, analyzes them for emotional themes and patterns, and provides personalized insights. All entries are encrypted end-to-end."
  },
  {
    question: "Is my journal data private and secure?",
    answer: "Yes. All journal entries are encrypted end-to-end. Elora does not sell your data, show ads, or use your entries to train AI models. Entries are stored on your device and synced securely when online. You can export or delete your data at any time."
  },
  {
    question: "How is Elora different from other journaling apps?",
    answer: "Elora combines voice journaling, automatic emotional pattern detection, and a conversational Explore feature that lets you ask questions about your own journal history. Most journaling apps store text only; Elora analyzes it and makes it searchable by meaning and theme."
  },
  {
    question: "Can I use voice to journal?",
    answer: "Yes. Elora is designed with both voice and text journaling. Speak your thoughts naturally and Elora transcribes them automatically. Both voice and text entries feed into the same insight engine."
  },
  {
    question: "What kind of insights does Elora provide?",
    answer: "Elora generates summaries, emotional themes, and behavioral insights after each entry. It tracks recurring patterns, mood trends, and personal growth indicators across your journal history. Insights become more personalized as you journal more."
  },
  {
    question: "What is the Explore feature?",
    answer: "Explore is a conversational AI interface that answers questions based on your journal history. You can ask about past entries, recurring themes, or personal growth trends. It searches your entries by meaning, not just keywords."
  },
  {
    question: "How much does Elora cost?",
    answer: "Elora is free to download with core journaling and AI insight features. Elora Premium is $4.99/month (Monthly or Annual) and unlocks unlimited Explore chat conversations and advanced insights."
  },
  {
    question: "Is Elora available on Android?",
    answer: "Yes. Elora is available on both the Apple App Store (iOS) and Google Play (Android). Your journal syncs across devices when signed into the same account."
  },
  {
    question: "Do I need internet to use Elora?",
    answer: "Elora works offline. You can write journal entries without an internet connection. AI insights and voice transcription require an internet connection. Entries sync securely when you are online."
  },
  {
    question: "How do I get started with Elora?",
    answer: "Download Elora from the App Store or Google Play. Create an account or start journaling immediately. You can type or speak your first entry. Elora will suggest prompts if you need inspiration."
  }
];

export default function FAQSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Elora"
      />
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-surface rounded-2xl border border-border overflow-hidden hover:border-primary/40 transition-colors duration-300"
          >
            <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between text-left hover:bg-background/50 transition-colors duration-200">
              <span className="text-lg font-semibold text-text pr-8">
                {faq.question}
              </span>
              <svg
                className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-5 text-secondary-text leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="/faq" className="inline-block text-primary hover:underline font-semibold">
          View all frequently asked questions &#8594;
        </a>
      </div>
    </div>
  );
}