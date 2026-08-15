import type { Metadata, Viewport } from "next";
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
  title: "Elora — AI Voice Journaling App for iOS & Android",
  description: "Elora is a voice-first AI journaling app that transcribes entries, detects emotional patterns, and generates personalized insights. End-to-end encrypted. Free on iOS and Android.",
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
    title: 'Elora — AI Voice Journaling App for iOS & Android',
    description: 'Voice-first AI journaling with automatic transcription, emotional pattern detection, and end-to-end encryption. Free download.',
    siteName: 'Elora',
    images: [
      {
        url: '/og.jpeg',
        width: 1200,
        height: 630,
        alt: 'Elora — AI Voice Journaling App for iOS and Android',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elora — AI Voice Journaling App',
    description: 'Voice-first AI journaling with emotional pattern detection and end-to-end encryption.',
    images: ['/og.jpeg'],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
        "@id": "https://elora.day/#app",
        "name": "Elora",
        "alternateName": "Elora Journal",
        "applicationCategory": "LifestyleApplication",
        "applicationSubCategory": "Journaling, Personal Growth, Mental Wellness",
        "operatingSystem": "iOS 16.0+, Android 8.0+",
        "url": "https://elora.day",
        "downloadUrl": [
          "https://apps.apple.com/au/app/elora-journal-with-insight/id6753067869",
          "https://play.google.com/store/apps/details?id=com.elora.ai"
        ],
        "softwareVersion": "5.3",
        "description": "Elora is a voice-first AI journaling application for iOS and Android that transcribes journal entries, detects emotional patterns, and generates personalized insights. All entries are encrypted end-to-end. Features include voice journaling, text journaling, AI summaries, emotional pattern detection, Explore conversational chat, and Soul Map visualization. Elora does not sell data, show ads, or use entries to train AI models.",
        "offers": [
          {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "description": "Free download with in-app subscription"
          },
          {
            "@type": "Offer",
            "name": "Elora Premium",
            "price": "4.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "description": "Monthly subscription (USD 4.99/month) for unlimited Explore chat and advanced insights"
          }
        ],
        "featureList": [
          "Voice journaling with automatic transcription",
          "Text journaling",
          "AI summaries, themes, and emotional tags",
          "Emotional pattern detection across entries",
          "Explore: conversational chat with journal history",
          "Soul Map: graph visualization of recurring themes",
          "Offline-first storage with secure cloud sync",
          "End-to-end encryption",
          "Cross-device sync",
          "No ads, no data selling, no AI training on user entries"
        ],
        "screenshot": [
          "https://elora.day/screenshots/explore-prompt.webp",
          "https://elora.day/screenshots/insights.webp",
          "https://elora.day/screenshots/powerful-insight.webp",
          "https://elora.day/screenshots/entry-view.webp",
          "https://elora.day/screenshots/explore-response.webp",
          "https://elora.day/screenshots/timeline-view.webp"
        ],
        "publisher": { "@id": "https://elora.day/#org" },
        "inLanguage": "en",
        "datePublished": "2024-01-01"
      },
      {
        "@type": "WebSite",
        "@id": "https://elora.day/#website",
        "url": "https://elora.day",
        "name": "Elora — AI Voice Journaling App",
        "description": "Official website for Elora, a voice-first AI journaling app for iOS and Android with end-to-end encryption.",
        "publisher": { "@id": "https://elora.day/#org" },
        "inLanguage": "en"
      },
      {
        "@type": "Organization",
        "@id": "https://elora.day/#org",
        "name": "Elora",
        "url": "https://elora.day",
        "logo": "https://elora.day/icon.svg",
        "description": "Creator of Elora, an AI-powered voice journaling app for iOS and Android.",
        "foundingDate": "2024",
        "founder": { "@id": "https://elora.day/#founder" },
        "sameAs": [
          "https://apps.apple.com/au/app/elora-journal-with-insight/id6753067869",
          "https://play.google.com/store/apps/details?id=com.elora.ai"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://elora.day/#founder",
        "name": "Samuel McCarthy",
        "jobTitle": "Founder",
        "worksFor": { "@id": "https://elora.day/#org" }
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