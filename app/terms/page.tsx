export default function Terms() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: '1.6',
      color: 'var(--foreground)'
    }}>
      <h1 style={{
        fontSize: '36px',
        marginBottom: '8px',
        color: 'var(--foreground)',
        fontWeight: '700'
      }}>
        Terms & Conditions
      </h1>

      <p style={{
        fontSize: '16px',
        color: 'var(--foreground)',
        marginBottom: '40px',
        fontStyle: 'italic'
      }}>
        Last updated: 26 September 2025
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
          1. Introduction
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Welcome to Elora ("the App", "we", "our", "us"). These Terms & Conditions ("Terms") govern your use of Elora on iOS (App Store) and Android (Google Play).
        </p>
        <p style={{ marginBottom: '16px' }}>
          By using Elora, you agree to be bound by these Terms. If you do not agree, please do not use the App.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Data Controller:</strong> Samuel McCarthy<br/>
          <strong>Contact Email:</strong> <a href="mailto:samrmccarthy6@gmail.com" style={{ color: 'var(--foreground)', textDecoration: 'none' }}>samrmccarthy6@gmail.com</a>
        </p>
      </div>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          2. Eligibility
        </h2>
        <div style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{ margin: 0, color: 'var(--foreground)' }}>
            <strong>You must be at least 16 years old to use Elora.</strong>
          </p>
        </div>
        <p>
          By using the App, you confirm that you meet this requirement and that you have the authority to agree to these Terms.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          3. Use of the App
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Elora is a journaling tool powered by AI to help you reflect and gain insights. Features include:
        </p>
        <div style={{
          display: 'grid',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600', color: 'var(--foreground)' }}>
              Voice Journaling
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>
              Record entries via your microphone
            </p>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600', color: 'var(--foreground)' }}>
              Text Journaling
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>
              Write entries manually
            </p>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600', color: 'var(--foreground)' }}>
              AI Summarization
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>
              Entries may be processed by Anthropic's Claude and OpenAI's GPT-4.1 Mini to generate summaries, themes, and reflections
            </p>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600', color: 'var(--foreground)' }}>
              AI Insight Engine
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>
              Prompts, suggestions, and pattern recognition
            </p>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600', color: 'var(--foreground)' }}>
              Graph Visualization ("Soul Map")
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>
              Mapping emotional and behavioral patterns
            </p>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600', color: 'var(--foreground)' }}>
              Offline-First Storage
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>
              Entries saved locally via expo-sqlite, then synced securely to PostgreSQL (Railway)
            </p>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600', color: 'var(--foreground)' }}>
              User Accounts (Optional)
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>
              Create an account with email/password or SSO (Google, Apple, etc.) via Supabase Auth
            </p>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600', color: 'var(--foreground)' }}>
              Embeddings
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>
              Summaries may be converted into embeddings for semantic search and pattern detection
            </p>
          </div>
        </div>
        <div style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '16px'
        }}>
          <p style={{ margin: 0, color: 'var(--foreground)' }}>
            <strong>You may use the App for personal journaling purposes only.</strong> Commercial use, automated access, or misuse is prohibited.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          4. User Accounts
        </h2>
        <div style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{ margin: 0, color: 'var(--foreground)' }}>
            <strong>Creating an account is optional.</strong> Without an account, you may use Elora offline, but syncing and certain features will not be available.
          </p>
        </div>
        <p style={{ marginBottom: '16px' }}>
          If you create an account:
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '0' }}>
          <li style={{ marginBottom: '8px' }}>You must provide accurate information (e.g., valid email).</li>
          <li style={{ marginBottom: '8px' }}>You are responsible for maintaining the security of your login credentials (including SSO access).</li>
          <li style={{ marginBottom: '8px' }}>You must notify us immediately of unauthorized access to your account.</li>
          <li style={{ marginBottom: '8px' }}>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          5. User Content
        </h2>
        <div style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{ margin: 0, color: 'var(--foreground)' }}>
            <strong>You retain full ownership of your journal entries, summaries, and related content.</strong>
          </p>
        </div>
        <p style={{ marginBottom: '16px' }}>
          By using the App, you grant us a limited license to process your content solely for:
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '8px' }}>Storing and syncing your data,</li>
          <li style={{ marginBottom: '8px' }}>Generating summaries, insights, embeddings, and visualizations, and</li>
          <li style={{ marginBottom: '8px' }}>Providing you with the App's features.</li>
        </ul>
        <p style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '12px',
          margin: 0
        }}>
          <strong>Your content is private by default and is never shared publicly or with other users.</strong>
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          6. Subscriptions and Payments
        </h2>
        <div style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{ margin: 0, color: 'var(--foreground)' }}>
            <strong>Elora is currently free to use.</strong> Some features may become part of a future subscription plan or one-time in-app purchases.
          </p>
        </div>
        <p style={{ marginBottom: '16px' }}>
          If subscriptions are introduced:
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '0' }}>
          <li style={{ marginBottom: '8px' }}>Pricing, billing cycles, and cancellation terms will be disclosed in-app.</li>
          <li style={{ marginBottom: '8px' }}>Apple App Store and Google Play billing rules will apply.</li>
          <li style={{ marginBottom: '8px' }}>You will always be informed before being charged.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          7. Third-Party Services
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Elora relies on third-party processors to function, including:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <strong>Anthropic (Claude)</strong><br/>
            <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>AI summarization and themes</span>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <strong>OpenAI (GPT-4.1 Mini)</strong><br/>
            <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Prompts and reflections</span>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <strong>Supabase</strong><br/>
            <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Authentication and SSO</span>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <strong>Railway</strong><br/>
            <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Backend hosting</span>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <strong>Redis & PostgreSQL</strong><br/>
            <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Data scheduling, storage, and embeddings</span>
          </div>
        </div>
        <div style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '16px'
        }}>
          <p style={{ margin: 0 }}>
            These providers process your data only for delivering app features. <strong>We do not authorize them to use your data for advertising or training models.</strong>
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          8. Termination & Account Deletion
        </h2>
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            flex: '1',
            minWidth: '200px'
          }}>
            <strong>In-App:</strong> Settings → Delete Account
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            flex: '1',
            minWidth: '200px'
          }}>
            <strong>Email:</strong> <a href="mailto:samrmccarthy6@gmail.com" style={{ color: 'var(--foreground)', textDecoration: 'none' }}>samrmccarthy6@gmail.com</a> with subject "Delete My Account"
          </div>
        </div>
        <p style={{ marginBottom: '16px' }}>
          Deleting your account will remove your journal entries, summaries, embeddings, and associated personal data from our systems within up to 30 days.
        </p>
        <p>
          We may suspend or terminate access if you violate these Terms or engage in misuse of the App.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          9. Intellectual Property
        </h2>
        <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '12px' }}>
            All intellectual property in Elora (software, design, branding, features) belongs to Samuel McCarthy.
          </li>
          <li style={{ marginBottom: '12px' }}>
            You may not copy, modify, distribute, reverse engineer, or create derivative works from the App.
          </li>
          <li style={{ marginBottom: '12px' }}>
            You retain rights to your own content (journal entries, voice/text submissions).
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          10. Disclaimer of Warranties
        </h2>
        <div style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{ margin: 0, color: 'var(--foreground)' }}>
            <strong>Elora is provided on an "as-is" and "as-available" basis.</strong>
          </p>
        </div>
        <ul style={{ paddingLeft: '24px' }}>
          <li style={{ marginBottom: '12px' }}>
            We make no guarantees about uninterrupted service, accuracy of AI outputs, or fitness for a particular purpose.
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong>AI-generated insights are for reflection and personal growth only and should not be considered medical, psychological, or legal advice.</strong>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          11. Limitation of Liability
        </h2>
        <p style={{ marginBottom: '16px' }}>
          To the maximum extent permitted by law:
        </p>
        <ul style={{ paddingLeft: '24px' }}>
          <li style={{ marginBottom: '12px' }}>
            We are not liable for indirect, incidental, or consequential damages, including data loss, arising from your use of the App.
          </li>
          <li style={{ marginBottom: '12px' }}>
            Our total liability for any claim shall not exceed the amount (if any) you paid for the App in the 12 months before the claim.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          12. International Use
        </h2>
        <p>
          Elora is operated from Australia. If you access the App from outside Australia, you are responsible for compliance with your local laws.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          13. Changes to Terms
        </h2>
        <p>
          We may update these Terms from time to time. The "Last updated" date reflects the current version. If changes are material, we will notify you in-app or by email (if you have an account). Continued use of the App after changes constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          14. Governing Law
        </h2>
        <p>
          These Terms are governed by the laws of Victoria, Australia, without regard to conflict of law principles.
        </p>
      </section>

      <section style={{
        background: 'var(--background)',
        border: '2px solid var(--border)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '40px'
      }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600'
        }}>
          15. Contact Us
        </h2>
        <p style={{ margin: 0, fontSize: '16px' }}>
          For questions about these Terms, please contact:<br/><br/>
          <strong>Samuel McCarthy</strong><br/>
          📧 <a href="mailto:samrmccarthy6@gmail.com" style={{ color: 'var(--foreground)', textDecoration: 'none' }}>samrmccarthy6@gmail.com</a>
        </p>
      </section>
    </div>
  );
}