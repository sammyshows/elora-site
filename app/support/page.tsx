export default function Support() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: '1.6',
      color: 'var(--foreground)',
    }}>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '8px',
        color: 'var(--foreground)',
        fontWeight: '700'
      }}>
        Elora Support
      </h1>

      <p style={{
        fontSize: '16px',
        color: 'var(--foreground)',
        marginBottom: '40px',
        fontStyle: 'italic'
      }}>
        We're here to help
      </p>

      <div style={{
        background: 'var(--background)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h2 style={{
          fontSize: '20px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600'
        }}>
          Contact Us
        </h2>
        <p style={{ marginBottom: '16px' }}>
          For all queries, questions, or support requests regarding the Elora app, please contact our team:
        </p>
        <p style={{ margin: 0, fontSize: '18px' }}>
          <strong>Email:</strong> <a href="mailto:samrmccarthy6@gmail.com" style={{ color: '#007bff', textDecoration: 'none' }}>samrmccarthy6@gmail.com</a>
        </p>
      </div>

      <section style={{
        background: 'var(--background)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        padding: '16px',
        marginBottom: '32px'
      }}>
        <p style={{ margin: 0, color: 'var(--foreground)' }}>
          We aim to respond to all inquiries as quickly as possible. Please include as much detail as possible about your question or issue so we can provide the best assistance.
        </p>
      </section>
    </div>
  );
}
