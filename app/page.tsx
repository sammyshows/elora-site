'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/icon.svg" alt="Elora" width={40} height={40} className="rounded-xl" />
            <span className="text-2xl font-bold text-text">Elora</span>
          </div>
          <div className="flex items-center gap-4">
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
                Your journal that <span className="text-primary">truly understands</span> you
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
                Experience journaling with deep AI insights that genuinely get you. Private, personal, and profound.
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
                Experience journaling with deep AI insights that genuinely get you. Private, personal, and profound.
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
            subtitle="Not just another journaling app. Elora genuinely understands you, learns from you, and grows with you."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <FeatureCard
              icon="🧠"
              title="AI that genuinely gets you"
              description="Powered by advanced AI that develops a deep understanding of your thoughts, patterns, and emotions over time. Not generic, truly personal."
              index={0}
            />
            <FeatureCard
              icon="🔒"
              title="Private by design"
              description="Your data, your control. Everything stays on your device. No ads, no tracking, no selling your information. Complete privacy."
              index={1}
            />
            <FeatureCard
              icon="💡"
              title="Life-changing insights"
              description="Receive meaningful, personalized insights that help you understand yourself better. Real depth, not surface-level observations."
              index={2}
            />
            <FeatureCard
              icon="🎙️"
              title="Voice or text"
              description="Journal however feels natural. Speak your thoughts aloud or type them out. Elora understands both perfectly."
              index={3}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Use Cases Section */}
      <AnimatedSection background="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Transform your life, one entry at a time"
            subtitle="Whether you're seeking clarity, growth, or simply a deeper understanding of yourself."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon="🌱"
              title="Personal Growth"
              description="Track your journey and watch yourself evolve. Elora helps you identify patterns, celebrate progress, and set meaningful goals."
              index={0}
            />
            <FeatureCard
              icon="🎨"
              title="Creative Breakthrough"
              description="Unlock your creative potential. Journal your ideas and let Elora help you connect dots you never saw before."
              index={1}
            />
            <FeatureCard
              icon="❤️"
              title="Emotional Processing"
              description="Navigate complex emotions with clarity. Elora provides a safe space to explore feelings and gain perspective."
              index={2}
            />
            <FeatureCard
              icon="🧘"
              title="Mindful Reflection"
              description="Cultivate daily mindfulness practice. Reflect on your day with guided prompts that encourage deeper awareness."
              index={3}
            />
            <FeatureCard
              icon="🎯"
              title="Decision Making"
              description="Gain clarity on important decisions. Elora helps you weigh options and understand what truly matters to you."
              index={4}
            />
            <FeatureCard
              icon="🌟"
              title="Mental Wellness"
              description="Support your mental health journey. Track moods, identify triggers, and build resilience through reflection."
              index={5}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Insight Examples Section */}
      <AnimatedSection background="bg-gradient-to-b from-background via-surface to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Insights that actually matter"
            subtitle="Experience the depth of understanding that makes Elora truly special."
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
            title="Watch yourself grow"
            subtitle="See your journey unfold with a visual timeline of your thoughts, emotions, and breakthroughs."
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
              subtitle="Introducing Explore: Your personal AI that knows your entire journey."
            />
            <div className="space-y-6 text-center max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-secondary-text leading-relaxed">
                Ask Elora anything about your past entries, patterns, or growth. It searches through your history and provides context-aware responses based on your unique journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 bg-background rounded-2xl">
                  <div className="text-4xl mb-3">💬</div>
                  <h4 className="font-bold text-text mb-2">Natural Conversation</h4>
                  <p className="text-sm text-secondary-text">Like ChatGPT, but it knows you deeply</p>
                </div>
                <div className="p-6 bg-background rounded-2xl">
                  <div className="text-4xl mb-3">🔍</div>
                  <h4 className="font-bold text-text mb-2">Smart Search</h4>
                  <p className="text-sm text-secondary-text">Instantly finds relevant entries and patterns</p>
                </div>
                <div className="p-6 bg-background rounded-2xl">
                  <div className="text-4xl mb-3">🧭</div>
                  <h4 className="font-bold text-text mb-2">Personal Guide</h4>
                  <p className="text-sm text-secondary-text">Get insights based on your entire history</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* SEO Long-Form Content Section */}
      <AnimatedSection background="bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "The Future of Personal Growth: AI-Powered Journaling",
              "description": "Discover how AI-powered journaling apps like Elora are transforming personal growth, mental wellness, and self-discovery through voice journaling, deep insights, and complete privacy.",
              "author": {
                "@type": "Person",
                "name": "Samuel McCarthy",
                "email": "samrmccarthy6@gmail.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Elora",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://elora.day/icon.svg"
                }
              },
              "datePublished": "2024-01-01",
              "dateModified": "2024-01-01",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://elora.day/#article"
              },
              "articleSection": "Personal Growth, Mental Health, Technology",
              "keywords": "AI journaling, voice journaling, personal growth app, mental wellness, emotional intelligence, private journal, self-discovery, mindfulness app",
              "wordCount": 800
            })
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none" itemScope itemType="https://schema.org/Article">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
              The Future of Personal Growth: AI-Powered Journaling
            </h2>

            <p className="text-lg text-secondary-text leading-relaxed mb-6">
              In an age where self-awareness and personal growth have become essential for mental wellness, traditional journaling methods often fall short. That's where <strong>Elora</strong>, an innovative <a href="#features" className="text-primary hover:underline">AI-powered journal app</a>, transforms the landscape of personal reflection and emotional intelligence.
            </p>

            <h3 className="text-2xl font-bold text-text mt-8 mb-4">
              Why Choose an AI Journal App Over Traditional Journaling?
            </h3>

            <p className="text-lg text-secondary-text leading-relaxed mb-6">
              While pen-and-paper journaling has been a cornerstone of self-reflection for centuries, <strong>AI journaling apps for personal growth</strong> offer unprecedented advantages. Elora combines the intimacy of traditional journaling with cutting-edge artificial intelligence to provide <a href="#features" className="text-primary hover:underline">insights that genuinely understand you</a>.
            </p>

            <p className="text-lg text-secondary-text leading-relaxed mb-6">
              Unlike generic journal prompts or basic diary apps, Elora's <strong>emotionally intelligent AI</strong> learns your unique patterns, communication style, and emotional landscape. It's like having a deeply perceptive friend who remembers every conversation and can help you connect dots you never saw before. Learn more about <a href="/privacy-policy" className="text-primary hover:underline">how we protect your privacy</a> while delivering these powerful insights.
            </p>

            <h3 className="text-2xl font-bold text-text mt-8 mb-4">
              Voice Journaling: Express Yourself Naturally
            </h3>

            <p className="text-lg text-secondary-text leading-relaxed mb-6">
              One of Elora's most beloved features is <strong>voice journaling</strong>. Many people find typing restrictive when trying to process complex emotions or capture spontaneous insights. With voice-first design, you can speak your thoughts naturally, as if talking to a trusted confidant. The AI transcribes and understands your words, making reflection effortless and authentic.
            </p>

            <h3 className="text-2xl font-bold text-text mt-8 mb-4">
              Privacy-First: Your Thoughts, Your Control
            </h3>

            <p className="text-lg text-secondary-text leading-relaxed mb-6">
              In a world of data breaches and privacy concerns, Elora stands out as a <strong>private journaling app with AI</strong>. Your entries never leave your device. There's no cloud sync, no data selling, no ads. Your most personal thoughts remain exactly that—personal. This commitment to privacy means you can journal with complete honesty, knowing your words are safe.
            </p>

            <h3 className="text-2xl font-bold text-text mt-8 mb-4">
              Real Intelligence, Real Understanding
            </h3>

            <p className="text-lg text-secondary-text leading-relaxed mb-6">
              What sets Elora apart from other <strong>mindfulness and mental health apps</strong> is the depth of its AI understanding. The insights aren't generic motivational quotes or surface-level observations. Elora genuinely gets to know you—your values, your struggles, your growth patterns. Over time, it becomes an invaluable tool for <strong>self-discovery and emotional wellness</strong>. Explore our <a href="#features" className="text-primary hover:underline">key features that make journaling transformative</a>.
            </p>

            <p className="text-lg text-secondary-text leading-relaxed mb-6">
              Whether you're navigating life transitions, working on personal development, processing emotions, or simply seeking greater self-awareness, Elora provides the support and insight you need. It's not just a journal—it's a companion for your most important journey: understanding yourself. Read our <a href="/support" className="text-primary hover:underline">support guide</a> to get started.
            </p>

            <h3 className="text-2xl font-bold text-text mt-8 mb-4">
              Start Your Journey Today
            </h3>

            <p className="text-lg text-secondary-text leading-relaxed">
              Join thousands of people who have transformed their lives through consistent, meaningful reflection with Elora. <a href="https://apps.apple.com/au/app/elora-journal-with-insight/id6753067869" className="text-primary hover:underline font-semibold">Download the app today</a> and experience the difference that truly intelligent, deeply private, emotionally aware journaling can make in your life. Check our <a href="/terms" className="text-primary hover:underline">terms of service</a> and <a href="/privacy-policy" className="text-primary hover:underline">privacy policy</a> to learn more about our commitment to your privacy.
            </p>
          </article>
        </div>
      </AnimatedSection>

      {/* Privacy Section */}
      <AnimatedSection background="bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Your privacy is sacred"
            subtitle="We take your trust seriously. Here's our commitment to you."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h4 className="text-xl font-bold text-text mb-3">End-to-End Encryption</h4>
              <p className="text-secondary-text">Your entries are encrypted and stay on your device. No one can read them but you.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚫</div>
              <h4 className="text-xl font-bold text-text mb-3">No Tracking, No Ads</h4>
              <p className="text-secondary-text">We don't track your behavior, sell your data, or show you ads. Ever.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">✋</div>
              <h4 className="text-xl font-bold text-text mb-3">You're in Control</h4>
              <p className="text-secondary-text">Export or delete your data anytime. Your journal belongs to you, always.</p>
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
            Change your life, one entry at a time
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary-text mb-10"
          >
            Join the journey to deeper self-understanding. Your future self will thank you.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/icon.svg" alt="Elora" width={32} height={32} className="rounded-lg" />
                <span className="text-xl font-bold">Elora</span>
              </div>
              <p className="text-secondary-text text-sm">
                Journal with deep insight and AI understanding. Your companion for personal growth and self-discovery.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
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
            <p>&copy; 2025 Elora. All rights reserved. Made with care for your growth.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
