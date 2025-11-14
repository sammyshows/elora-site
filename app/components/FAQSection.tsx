'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is Elora and how does it work?",
    answer: "Elora is an AI-powered journaling app that helps you gain deep insights into your thoughts, emotions, and personal growth. You can journal using voice or text, and Elora's advanced AI analyzes your entries to provide personalized insights, identify patterns, and help you understand yourself better over time."
  },
  {
    question: "Is my journal data private and secure?",
    answer: "Absolutely. Your privacy is our top priority. All journal entries are encrypted and stored locally on your device. We don't use cloud sync, which means your data never leaves your phone. There's no tracking, no ads, and we never sell your data. Your thoughts are yours alone."
  },
  {
    question: "How is Elora different from other journaling apps?",
    answer: "Elora stands out with its deep AI understanding that genuinely gets to know you over time. Unlike generic journaling apps with surface-level prompts, Elora provides personalized, meaningful insights based on your unique patterns and history. Plus, our voice-first design and complete privacy focus make reflection natural and secure."
  },
  {
    question: "Can I use voice to journal?",
    answer: "Yes! Elora is designed with voice-first journaling in mind. Simply speak your thoughts naturally, and Elora transcribes and understands them. Many users find voice journaling more authentic and effortless than typing, especially when processing emotions or capturing spontaneous insights."
  },
  {
    question: "What kind of insights does Elora provide?",
    answer: "Elora provides personalized insights about your emotional patterns, growth trends, recurring themes, and behavioral patterns. The AI identifies connections between entries, highlights areas of growth, recognizes when you're experiencing breakthroughs, and offers meaningful observations that help you understand yourself better."
  },
  {
    question: "What is the Explore feature?",
    answer: "Explore is like having ChatGPT that knows your entire journal history. You can ask Elora questions about your past entries, patterns, or growth, and it will search through your history to provide context-aware responses based on your unique journey. It's a powerful tool for self-discovery and reflection."
  },
  {
    question: "How much does Elora cost?",
    answer: "Elora offers a free download with core journaling features. Premium features including advanced AI insights, unlimited voice entries, and the Explore feature are available through a subscription. Check the App Store for current pricing and subscription options."
  },
  {
    question: "Is Elora available on Android?",
    answer: "Currently, Elora is available exclusively on iOS (iPhone and iPad). We're focused on delivering the best possible experience on Apple devices first. Android support may be considered in the future based on user demand."
  },
  {
    question: "Do I need internet to use Elora?",
    answer: "Elora works both online and offline. You can write journal entries anytime without an internet connection. However, some features like AI insights and voice transcription require an internet connection to function. Your entries are always stored locally on your device."
  },
  {
    question: "How do I get started with Elora?",
    answer: "Getting started is simple! Download Elora from the App Store, create an account (or use anonymously), and start with your first entry. You can type or speak - whatever feels natural. Elora will guide you with thoughtful prompts if you need inspiration. The more you journal, the more personalized your insights become."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Generate FAQ schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about Elora"
        />
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-surface rounded-2xl border border-border overflow-hidden hover:border-primary/40 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-background/50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-text pr-8">
                  {faq.question}
                </span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-primary flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-secondary-text leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
