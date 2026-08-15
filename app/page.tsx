'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './components/Button';
import SectionHeading from './components/SectionHeading';
import FeatureCard from './components/FeatureCard';
import InsightCard from './components/InsightCard';
import TimelineCard from './components/TimelineCard';
import ScreenshotShowcase from './components/ScreenshotShowcase';
import AnimatedSection from './components/AnimatedSection';
import GradientShimmer from './components/GradientShimmer';
import FAQSection from './components/FAQSection';
import DownloadButtons from './components/DownloadButtons';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-surface/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" aria-label="Elora home">
              <Image src="/icon.svg" alt="Elora" width={40} height={40} className="rounded-xl" />
            </Link>
            <Link href="/" className="text-2xl font-bold text-text hover:opacity-80 transition-opacity">Elora</Link>
          </div>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium" aria-label="Main navigation">
            <Link href="/features" className="text-secondary-text hover:text-text transition-colors">Features</Link>
            <Link href="/pricing" className="text-secondary-text hover:text-text transition-colors">Pricing</Link>
            <Link href="/compare" className="text-secondary-text hover:text-text transition-colors">Compare</Link>
            <Link href="/blog" className="text-secondary-text hover:text-text transition-colors">Blog</Link>
            <Link href="/faq" className="text-secondary-text hover:text-text transition-colors">FAQ</Link>
            <Link href="/support" className="text-secondary-text hover:text-text transition-colors">Support</Link>
          </nav>
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden 2xl:flex items-center gap-1 text-sm">
              <span className="text-yellow-500">★★★★★</span>
              <span className="font-semibold text-text">5.0</span>
            </div>
            <div className="hidden xl:block">
              <DownloadButtons layout="horizontal" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 overflow-x-hidden">
        <GradientShimmer />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 xl:py-24">
          <div className="flex flex-col xl:flex-row items-center gap-8 xl:gap-16">
            {/* Hero Content */}
            <div className="flex-1 text-center xl:text-left flex flex-col">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text mb-4 xl:mb-8 leading-tight order-1"
              >
                Elora: the AI journal that truly <span className="text-primary italic">gets</span> you
              </motion.h1>

              {/* Hero Screenshot - Shows on mobile/tablet/laptop after heading */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="xl:hidden order-2 mb-6"
              >
                <div className="relative w-full max-w-md mx-auto my-4 px-4 sm:px-0">
                  <Image
                    src="/hero.webp"
                    alt="Elora journal app interface showing AI insights, voice journaling, and personal growth tracking features"
                    width={800}
                    height={600}
                    priority
                    className="w-full h-auto rounded-2xl relative z-10"
                  />
                  <div className="absolute bottom-0 left-[10%] right-[10%] h-8 bg-black/20 blur-2xl -z-10 translate-y-4"></div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-xl xl:text-2xl text-secondary-text mb-8 leading-relaxed hidden xl:block order-3"
              >
                Elora is a voice and text AI journaling app with automatic transcription, emotional pattern detection, and end-to-end encryption.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-4 order-3 xl:order-4"
              >
                <DownloadButtons layout="horizontal" />
                <div className="flex items-center gap-2 justify-center xl:justify-start text-sm text-secondary-text">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-lg">★★★★★</span>
                    <span className="font-semibold text-text ml-1">5.0</span>
                  </div>
                  <span>·</span>
                  <span>18 reviews</span>
                </div>
              </motion.div>

              {/* Subtitle - Shows on mobile/tablet/laptop after reviews */}
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-secondary-text mt-6 leading-relaxed xl:hidden order-4"
              >
                Elora is a voice and text AI journaling app with automatic transcription, emotional pattern detection, and end-to-end encryption.
              </motion.p>
            </div>

            {/* Hero Screenshot - Shows on large desktop only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden xl:flex flex-1 justify-center items-center"
            >
              <div className="relative w-full max-w-2xl">
                <Image
                  src="/hero.webp"
                  alt="Elora journal app interface showing AI insights, voice journaling, and personal growth tracking features"
                  width={800}
                  height={600}
                  priority
                  className="w-full h-auto rounded-2xl xl:rounded-3xl relative z-10"
                />
                <div className="absolute bottom-0 left-[10%] right-[10%] h-8 bg-black/20 blur-2xl -z-10 translate-y-4"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Elora Section */}
      <AnimatedSection id="features" background="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Elora is different"
            subtitle="Elora analyzes journal entries with AI, works by voice or text, and encrypts everything end-to-end."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <FeatureCard
              icon="🧠"
              title="AI that genuinely gets you"
              description="Elora's AI analyzes your journal entries to detect emotional patterns, recurring themes, and personal growth trends over time. Each insight is based on your unique history."
              index={0}
            />
            <FeatureCard
              icon="🔒"
              title="Private by design"
              description="All entries are encrypted end-to-end. Elora does not sell your data, show ads, or use your entries to train AI models. You remain in control."
              index={1}
            />
            <FeatureCard
              icon="💡"
              title="Life-changing insights"
              description="Get summaries, emotional themes, and behavioral insights after each journal entry. Elora identifies patterns across weeks and months of entries."
              index={2}
            />
            <FeatureCard
              icon="🎙️"
              title="Voice or text"
              description="Speak your entries naturally and Elora transcribes them automatically. Type if you prefer. Both input methods feed into the same insight engine."
              index={3}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Use Cases Section */}
      <AnimatedSection background="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Elora helps you with"
            subtitle="Personal growth, emotional processing, and clearer decisions — tracked through your journal history."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon="🌱"
              title="Personal Growth"
              description="Track recurring emotional patterns and personal growth trends across your journal history. Surface themes like confidence shifts, stress triggers, and relationship dynamics."
              index={0}
            />
            <FeatureCard
              icon="🎨"
              title="Creative Breakthrough"
              description="Journal your ideas and let Elora connect thoughts that surfaced weeks apart. Discover links between entries you would not find manually."
              index={1}
            />
            <FeatureCard
              icon="❤️"
              title="Emotional Processing"
              description="Each entry is tagged with emotional themes. Review how your emotional landscape shifts over days, weeks, and months."
              index={2}
            />
            <FeatureCard
              icon="🧘"
              title="Mindful Reflection"
              description="Receive thoughtful prompts based on patterns from your own journal, not generic templates. Reflect with relevance."
              index={3}
            />
            <FeatureCard
              icon="🎯"
              title="Decision Making"
              description="Explore past entries about a decision and surface what mattered most in similar situations. Gain clarity from your own history."
              index={4}
            />
            <FeatureCard
              icon="🌟"
              title="Mental Wellness"
              description="Monitor mood trends and identify recurring triggers through AI-analyzed journal patterns. Support your mental health journey with data you control."
              index={5}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Insight Examples Section */}
      <AnimatedSection background="bg-gradient-to-b from-background via-surface to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Example insights"
            subtitle="Here is the kind of AI-generated insight Elora produces from your journal entries."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <InsightCard
              title="Pattern Recognition"
              insight="I notice you tend to feel most creative in the mornings after journaling. This pattern has been consistent for the past three weeks. Consider protecting this time for your most important creative work."
              date="Yesterday"
              category="Productivity"
              index={0}
            />
            <InsightCard
              title="Emotional Growth"
              insight="Your entries show increasing self-compassion when discussing challenges. The language you use about setbacks has shifted from self-criticism to curiosity. This is profound growth."
              date="This Week"
              category="Wellness"
              index={1}
            />
            <InsightCard
              title="Decision Clarity"
              insight="When you write about this decision, your energy and enthusiasm are noticeably higher when discussing the creative direction. Your authentic excitement is showing you the path."
              date="3 days ago"
              category="Life Choices"
              index={2}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Timeline Examples Section */}
      <AnimatedSection background="bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Track your growth over time"
            subtitle="Elora builds a visual timeline of your thoughts, emotions, and patterns across weeks and months."
          />
          <div className="space-y-4">
            <TimelineCard
              date="Week 1"
              title="Starting the journey"
              content="Just downloaded Elora. Feeling curious but uncertain about journaling regularly. Taking it one day at a time."
              mood="🌱"
              position="left"
              index={0}
            />
            <TimelineCard
              date="Week 4"
              title="Finding my rhythm"
              content="Journaling has become part of my morning routine. The voice feature makes it so easy. Already noticing patterns in my thoughts."
              mood="☀️"
              position="right"
              index={1}
            />
            <TimelineCard
              date="Week 8"
              title="Breakthrough moment"
              content="Had a major insight today about why I've been feeling stuck. Elora's reflection helped me connect things I'd written weeks ago. Mind blown."
              mood="💡"
              position="left"
              index={2}
            />
            <TimelineCard
              date="Week 12"
              title="Consistent growth"
              content="Looking back at my first entries, I can see how much I've grown. More self-aware, more intentional, more at peace."
              mood="🌟"
              position="right"
              index={3}
            />
            <TimelineCard
              date="Week 16"
              title="Transformation"
              content="Elora has become my trusted companion. The insights genuinely understand me. This isn't just journaling anymore—it's real growth."
              mood="✨"
              position="left"
              index={4}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Screenshots-as-Story Section */}
      <AnimatedSection background="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32 overflow-hidden">
          <ScreenshotShowcase
            imageSrc="/screenshots/entry-view.webp"
            title="Start with just one thought"
            alt="Elora simple journaling start screen with minimal interface encouraging first journal entry"
            description="No pressure, no expectations. Begin your journey with a single entry. Elora makes it easy to start and even easier to keep going."
            reverse={false}
            index={0}
          />
          <ScreenshotShowcase
            imageSrc="/screenshots/powerful-insight.webp"
            title="Express yourself your way"
            alt="Elora voice and text journaling options showing microphone for voice recording and keyboard for typing"
            description="Whether you prefer to type or speak, Elora adapts to you. Voice journaling feels like talking to a trusted friend who truly listens."
            reverse={true}
            index={1}
          />
          <ScreenshotShowcase
            imageSrc="/screenshots/explore-prompt.webp"
            title="Guided prompts that matter"
            alt="Elora AI-powered reflection prompts and thoughtful questions for guided journaling and self-discovery"
            description="When you're not sure what to write, Elora asks thoughtful questions that help you explore what's really on your mind."
            reverse={false}
            index={2}
          />
          <ScreenshotShowcase
            imageSrc="/screenshots/explore-response.webp"
            title="Journaling that feels good"
            alt="Elora beautiful journaling interface with elegant design, smooth animations, and delightful user experience"
            description="Beautiful, intuitive design that makes reflection a joy, not a chore. You'll actually look forward to opening Elora each day."
            reverse={true}
            index={3}
          />
          <ScreenshotShowcase
            imageSrc="/screenshots/insights.webp"
            title="Track meaningful progress"
            alt="Elora personal growth tracking dashboard displaying AI insights, emotional patterns, and progress visualization over time"
            description="See your growth over time with insights that show patterns, progress, and breakthroughs. Your journey visualized."
            reverse={false}
            index={4}
          />
          <ScreenshotShowcase
            imageSrc="/screenshots/timeline-view.webp"
            title="Your thoughts, your space"
            alt="Elora private journal with end-to-end encryption, local device storage, and complete data privacy protection"
            description="Complete privacy and security. Your journal entries are encrypted and stay on your device. No cloud sync means no data breaches."
            reverse={true}
            index={5}
          />
        </div>
      </AnimatedSection>

      {/* Explore Feature Section */}
      <AnimatedSection background="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl border border-primary/20">
            <SectionHeading
              title="Chat with your journal"
              subtitle="Explore: a conversational AI interface that knows your full journal history."
            />
            <div className="space-y-6 text-center max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-secondary-text leading-relaxed">
                Ask Elora questions about your past entries, recurring themes, or patterns. Explore searches your journal history and provides context-aware responses based on your unique journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 bg-background rounded-2xl">
                  <div className="text-4xl mb-3">💬</div>
                  <h4 className="font-bold text-text mb-2">Conversational Q&A</h4>
                  <p className="text-sm text-secondary-text">Ask questions about your entries in natural language</p>
                </div>
                <div className="p-6 bg-background rounded-2xl">
                  <div className="text-4xl mb-3">🔍</div>
                  <h4 className="font-bold text-text mb-2">Semantic Search</h4>
                  <p className="text-sm text-secondary-text">Instantly finds relevant entries by meaning, not keywords</p>
                </div>
                <div className="p-6 bg-background rounded-2xl">
                  <div className="text-4xl mb-3">🧭</div>
                  <h4 className="font-bold text-text mb-2">Personal Context</h4>
                  <p className="text-sm text-secondary-text">Answers draw from your entire journal, not generic knowledge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Entity Fact Section */}
      <AnimatedSection background="bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://elora.day/#webpage",
              "url": "https://elora.day",
              "name": "Elora — AI Voice Journaling App for iOS & Android",
              "description": "Elora is a voice and text AI journaling application for iOS and Android that transcribes journal entries, detects emotional patterns, and generates personalized insights. All entries are encrypted end-to-end.",
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["#entity-statement"]
              }
            })
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-6 text-center">
            What is Elora?
          </h2>
          <p id="entity-statement" className="text-lg text-secondary-text leading-relaxed mb-8 text-center max-w-3xl mx-auto">
            Elora is a voice and text AI journaling application for iOS and Android. It transcribes voice journal entries, analyzes text and voice entries for emotional patterns, and generates personalized insights. All entries are encrypted end-to-end. Elora is free to download with an optional Elora Premium subscription.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-3xl mx-auto">
            <div className="bg-surface p-6 rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-text mb-4">Elora vs Traditional Journaling</h3>
              <ul className="space-y-3 text-secondary-text">
                <li className="flex gap-2"><span className="text-primary font-bold">&#x2713;</span> Voice input with automatic transcription</li>
                <li className="flex gap-2"><span className="text-primary font-bold">&#x2713;</span> Automatic emotional pattern detection</li>
                <li className="flex gap-2"><span className="text-primary font-bold">&#x2713;</span> Semantic search across all entries</li>
                <li className="flex gap-2"><span className="text-primary font-bold">&#x2713;</span> Soul Map graph visualization</li>
                <li className="flex gap-2"><span className="text-primary font-bold">&#x2713;</span> Cross-device sync</li>
                <li className="flex gap-2"><span className="text-primary font-bold">&#x2713;</span> End-to-end encryption</li>
              </ul>
            </div>
            <div className="bg-surface p-6 rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-text mb-4">Key Facts</h3>
              <ul className="space-y-3 text-secondary-text">
                <li><strong className="text-text">Platforms:</strong> iOS and Android</li>
                <li><strong className="text-text">Pricing:</strong> Free + Elora Premium ($4.99/month)</li>
                <li><strong className="text-text">Privacy:</strong> End-to-end encryption, no data sold</li>
                <li><strong className="text-text">AI:</strong> Providers include Anthropic and OpenAI</li>
                <li><strong className="text-text">Storage:</strong> Offline-first with secure cloud sync</li>
                <li><strong className="text-text">Founded:</strong> 2024</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="/features"
              className="inline-block text-primary hover:underline font-semibold"
            >
              View all features &#8594;
            </a>
            <span className="mx-3 text-muted">·</span>
            <a
              href="/blog"
              className="inline-block text-primary hover:underline font-semibold"
            >
              Read our blog &#8594;
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Privacy Section */}
      <AnimatedSection background="bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Privacy by design"
            subtitle="Your journal belongs to you. Here is how we protect it."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h4 className="text-xl font-bold text-text mb-3">End-to-End Encryption</h4>
              <p className="text-secondary-text">All journal entries are encrypted end-to-end. Only you can read them. Elora does not have access to your journal content.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚫</div>
              <h4 className="text-xl font-bold text-text mb-3">No Tracking, No Ads</h4>
              <p className="text-secondary-text">We do not track your behavior, sell your data, or show you ads. Your entries are not used to train AI models.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">✋</div>
              <h4 className="text-xl font-bold text-text mb-3">You are in Control</h4>
              <p className="text-secondary-text">Export or delete your data at any time. Your journal belongs to you, always. Full privacy policy available below.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" href="/privacy-policy">
              Read Full Privacy Policy
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection background="bg-background">
        <FAQSection />
      </AnimatedSection>

      {/* Final CTA Section */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        <GradientShimmer />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6"
          >
            Start your journey with Elora today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary-text mb-10"
          >
            Free to download. End-to-end encrypted. Available on iOS and Android.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <DownloadButtons layout="horizontal" />
            <div className="flex items-center gap-2 text-sm text-secondary-text">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-lg">★★★★★</span>
                <span className="font-semibold text-text ml-1">5.0</span>
              </div>
              <span>·</span>
              <span>18 reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text text-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/icon.svg" alt="Elora" width={32} height={32} className="rounded-lg" />
                <span className="text-xl font-bold">Elora</span>
              </div>
              <p className="text-secondary-text text-sm">
                AI voice journaling app for iOS and Android. End-to-end encrypted. Free download.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="/compare" className="hover:text-primary transition-colors">Compare</a></li>
                <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="/support" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm text-secondary-text mb-2">
                Questions or feedback?
              </p>
              <a href="mailto:samrmccarthy6@gmail.com" className="text-sm hover:text-primary transition-colors">
                samrmccarthy6@gmail.com
              </a>
            </div>
          </div>
          <div className="border-t border-secondary-text/20 pt-8 text-center text-sm text-secondary-text">
            <p>&copy; {new Date().getFullYear()} Elora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
