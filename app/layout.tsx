import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elora - Journal with Deep Insight & AI Understanding",
  description: "Your journal that truly understands you. Elora is a voice-first, emotionally intelligent journaling app that offers deep AI insights, personal growth tracking, and complete privacy. Experience journaling that genuinely gets you.",
  keywords: ["journaling app", "AI journal", "voice journaling", "personal growth", "mental health", "emotional intelligence", "private journal", "daily reflection", "mindfulness app", "AI insights"],
  authors: [{ name: "Samuel McCarthy" }],
  creator: "Samuel McCarthy",
  publisher: "Elora",
  metadataBase: new URL('https://elora.day'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://elora.day',
    title: 'Elora - Journal with Deep Insight & AI Understanding',
    description: 'Your journal that truly understands you. Voice-first, emotionally intelligent journaling with deep AI insights and complete privacy.',
    siteName: 'Elora',
    images: [
      {
        url: '/screenshots/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Elora - AI-Powered Journaling App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elora - Journal with Deep Insight & AI Understanding',
    description: 'Your journal that truly understands you. Voice-first, emotionally intelligent journaling with deep AI insights.',
    images: ['/screenshots/hero.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  other: {
    'color-scheme': 'light',
    'apple-itunes-app': 'app-id=6753067869',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        "name": "Elora - AI Journal with Insights",
        "alternateName": "Elora Journal",
        "applicationCategory": "LifestyleApplication",
        "applicationSubCategory": "Journaling, Mental Wellness, Personal Growth",
        "operatingSystem": "iOS 16.0 or later",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2025-12-31"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "ratingCount": "16",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": "Elora is a voice-first, emotionally intelligent AI journaling app that provides deep insights for personal growth. Features include voice journaling, text journaling, AI-powered insights, pattern recognition, timeline visualization, and the Explore feature for chatting with your journal history. Completely private with end-to-end encryption.",
        "downloadUrl": "https://apps.apple.com/au/app/elora-journal-with-insight/id6753067869",
        "screenshot": [
          "https://elora.day/screenshots/hero.webp",
          "https://elora.day/screenshots/text-or-voice.webp",
          "https://elora.day/screenshots/grow.webp",
          "https://elora.day/screenshots/safe.webp"
        ],
        "featureList": [
          "Voice journaling with natural speech recognition",
          "Text-based journaling",
          "AI-powered personal insights",
          "Emotional pattern recognition",
          "Growth tracking and timeline visualization",
          "Explore feature: Chat with your journal",
          "Guided reflection prompts",
          "End-to-end encryption",
          "Offline-first design",
          "No ads or tracking"
        ],
        "author": {
          "@type": "Person",
          "name": "Samuel McCarthy",
          "email": "samrmccarthy6@gmail.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Elora",
          "email": "samrmccarthy6@gmail.com",
          "url": "https://elora.day"
        },
        "datePublished": "2024-01-01",
        "inLanguage": "en",
        "keywords": "journal app, AI journal, voice journaling, mental health app, personal growth app, mindfulness app, emotional intelligence, private journal, daily reflection, AI insights, self-discovery"
      },
      {
        "@type": "WebSite",
        "url": "https://elora.day",
        "name": "Elora - Journal with Deep Insight & AI Understanding",
        "description": "Official website for Elora, the AI-powered journaling app for iOS. Download Elora to experience voice-first journaling with deep insights, complete privacy, and personal growth tracking.",
        "publisher": {
          "@type": "Organization",
          "name": "Elora",
          "url": "https://elora.day",
          "logo": "https://elora.day/icon.svg",
          "email": "samrmccarthy6@gmail.com",
          "sameAs": []
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://elora.day/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "Elora",
        "url": "https://elora.day",
        "logo": "https://elora.day/icon.svg",
        "description": "Elora creates AI-powered tools for personal growth and self-discovery through journaling.",
        "email": "samrmccarthy6@gmail.com",
        "founder": {
          "@type": "Person",
          "name": "Samuel McCarthy"
        },
        "foundingDate": "2024",
        "sameAs": []
      }
    ]
  };

  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
