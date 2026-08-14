import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Elora Pricing — Free & Premium Plans",
  description: "Elora is free to download. Elora Premium unlocks unlimited Explore chat and advanced insights. Monthly and Annual subscriptions available.",
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: "Elora Pricing — Free & Premium Plans",
    description: "Elora is free to download. Elora Premium unlocks unlimited Explore chat and advanced insights.",
    url: 'https://elora.day/pricing',
  },
};

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Elora Premium",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "iOS, Android",
    "offers": [
      {
        "@type": "Offer",
        "name": "Elora Free",
        "price": "0",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "Elora Premium",
        "price": "4.99",
        "priceCurrency": "USD",
        "description": "USD 4.99 per month. Unlocks unlimited Explore chat and advanced insights."
      }
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <h1 style={{ fontSize: '36px', marginBottom: '8px', fontWeight: '700' }}>
        Elora Pricing
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '40px' }}>
        Free to download. Upgrade to Elora Premium when you are ready for more.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Free</h2>
          <p style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>$0</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'inline-block' }}>
            <li style={{ padding: '8px 0' }}>Text &amp; voice journaling</li>
            <li style={{ padding: '8px 0' }}>AI summaries &amp; themes</li>
            <li style={{ padding: '8px 0' }}>Emotional pattern tracking</li>
            <li style={{ padding: '8px 0' }}>Guided reflection prompts</li>
            <li style={{ padding: '8px 0' }}>Soul Map visualization</li>
            <li style={{ padding: '8px 0' }}>End-to-end encryption</li>
          </ul>
        </div>

        <div style={{
          background: 'var(--background)',
          border: '2px solid #007bff',
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Elora Premium</h2>
          <p style={{ fontSize: '36px', fontWeight: '700', marginBottom: '4px' }}>$4.99<span style={{ fontSize: '16px', fontWeight: '400' }}>/month</span></p>
          <p style={{ fontSize: '14px', color: 'var(--foreground)', marginBottom: '16px' }}>Billed monthly via Apple or Google. Annual plan available.</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'inline-block' }}>
            <li style={{ padding: '8px 0' }}>Everything in Free, plus:</li>
            <li style={{ padding: '8px 0' }}>Unlimited Explore chat</li>
            <li style={{ padding: '8px 0' }}>Advanced AI insights</li>
            <li style={{ padding: '8px 0' }}>Cross-device sync</li>
            <li style={{ padding: '8px 0' }}>Priority support</li>
          </ul>
        </div>
      </div>

      <div style={{
        background: 'var(--background)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '20px',
        fontSize: '14px',
      }}>
        <p style={{ margin: 0 }}>
          Subscriptions auto-renew and can be canceled anytime in device settings.
          Refunds are handled by Apple (App Store) or Google (Google Play).
          See <a href="/terms" style={{ color: '#007bff', textDecoration: 'none' }}>Terms of Service</a> for full details.
        </p>
      </div>
    </div>
  );
}