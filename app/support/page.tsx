import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Elora Support — Contact & Help",
  description: "Get help with Elora, the AI voice journaling app. Contact support, find answers about accounts, subscriptions, data export, and deleting your account.",
  alternates: { canonical: '/support' },
};

export default function Support() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: '1.6',
      color: 'var(--text)',
    }}>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '8px',
        color: 'var(--text)',
        fontWeight: '700'
      }}>
        Elora Support
      </h1>

      <p style={{
        fontSize: '16px',
        color: 'var(--text)',
        marginBottom: '40px',
        fontStyle: 'italic'
      }}>
        Help and answers for the Elora journaling app.
      </p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--text)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          Common Questions
        </h2>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text)' }}>
              How do I delete my Elora account?
            </h3>
            <p style={{ margin: 0, color: 'var(--text)' }}>
              Open Elora, go to Settings, and select Delete Account. Alternatively, email support with the subject "Delete My Account". Your journal entries, summaries, and personal data are permanently removed within up to 30 days.
            </p>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text)' }}>
              How do I cancel Elora Premium?
            </h3>
            <p style={{ margin: 0, color: 'var(--text)' }}>
              Subscriptions are managed by Apple or Google, not Elora. On iOS, open Settings &gt; your Apple ID &gt; Subscriptions and select Elora. On Android, open Google Play &gt; Payments &amp; subscriptions &gt; Subscriptions. Cancel at least 24 hours before renewal to avoid the next charge.
            </p>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text)' }}>
              How do I export my journal data?
            </h3>
            <p style={{ margin: 0, color: 'var(--text)' }}>
              Email support to request a data export. You will receive your entries in a portable format (such as JSON). You can also delete your data at any time from Settings.
            </p>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text)' }}>
              How do I get a refund for Elora Premium?
            </h3>
            <p style={{ margin: 0, color: 'var(--text)' }}>
              Refunds for in-app purchases are handled by Apple Support (App Store) or Google Play Support. Elora cannot process refunds directly.
            </p>
          </div>
        </div>
      </section>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h2 style={{
          fontSize: '20px',
          marginBottom: '16px',
          color: 'var(--text)',
          fontWeight: '600'
        }}>
          Contact Us
        </h2>
        <p style={{ marginBottom: '16px', color: 'var(--text)' }}>
          For all other queries, questions, or support requests regarding the Elora app, contact our team:
        </p>
        <p style={{ margin: 0, fontSize: '18px', color: 'var(--text)' }}>
          <strong>Email:</strong> <a href="mailto:samrmccarthy6@gmail.com" style={{ color: '#007bff', textDecoration: 'none' }}>samrmccarthy6@gmail.com</a>
        </p>
      </div>

      <section style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: '16px',
        marginBottom: '32px'
      }}>
        <p style={{ margin: 0, color: 'var(--text)' }}>
          We aim to respond to all inquiries as quickly as possible. Please include as much detail as possible about your question or issue so we can provide the best assistance.
        </p>
      </section>
    </div>
  );
}