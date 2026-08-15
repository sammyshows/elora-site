import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: "Elora Pricing — Free & Premium Plans",
  description: "Elora is free to download. Elora Premium unlocks unlimited Explore chat and advanced insights for $4.99/month. Monthly and Annual subscriptions available on iOS and Android.",
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Elora Premium",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "iOS, Android",
    "offers": [
      { "@type": "Offer", "name": "Elora Free", "price": "0", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Elora Premium", "price": "4.99", "priceCurrency": "USD", "description": "USD 4.99 per month. Unlocks unlimited Explore chat and advanced insights." }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
        />
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
          Elora Pricing
        </h1>
        <p className="text-lg text-secondary-text mb-10">
          Free to download. Upgrade to Elora Premium when you are ready for more.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-text mb-2">Free</h2>
            <p className="text-4xl font-bold text-text mb-6">$0</p>
            <ul className="space-y-2.5 text-sm text-secondary-text">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>Text &amp; voice journaling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>AI summaries &amp; emotional themes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>Emotional pattern tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>Guided reflection prompts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>Soul Map visualization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>End-to-end encryption</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-primary bg-surface p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-text mb-2">Elora Premium</h2>
            <p className="text-4xl font-bold text-text mb-1">$4.99<span className="text-lg font-medium text-secondary-text">/month</span></p>
            <p className="text-sm text-secondary-text mb-6">Billed monthly via Apple or Google. Annual plan available.</p>
            <ul className="space-y-2.5 text-sm text-secondary-text">
              <li className="flex items-start gap-2 font-semibold text-text">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>Everything in Free, plus:</span>
              </li>
              <li className="flex items-start gap-2 pl-6">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>Unlimited Explore chat</span>
              </li>
              <li className="flex items-start gap-2 pl-6">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>Advanced AI insights</span>
              </li>
              <li className="flex items-start gap-2 pl-6">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>Cross-device sync</span>
              </li>
              <li className="flex items-start gap-2 pl-6">
                <span className="mt-0.5 shrink-0 text-primary font-bold">&#x2713;</span>
                <span>Priority support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface px-5 py-4 text-sm text-secondary-text">
          <p className="m-0">
            Subscriptions auto-renew and can be canceled anytime in device settings.
            Refunds are handled by Apple (App Store) or Google (Google Play).
            See <a href="/terms" className="text-primary hover:underline font-medium">Terms of Service</a> for full details.
          </p>
        </div>
      </main>
    </div>
  );
}