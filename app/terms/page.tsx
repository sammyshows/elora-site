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
        Last updated: 7 February 2026
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
            <strong>You must be at least 18 years old to use Elora.</strong>
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
              Journaling & Visualization
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>
              Voice/Text entry, graph visualization ("Soul Map"), and pattern recognition.
            </p>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600', color: 'var(--foreground)' }}>
              AI "Explore" Chat
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground)' }}>
              An interactive chat interface powered by Large Language Models (LLMs) for reflective conversation.
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
              Entries saved locally via expo-sqlite, then synced securely to our database when online.
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
            <strong>Creating an account is optional but recommended.</strong> Without an account, you may use Elora offline, but cross-device syncing and Premium features will not be available.
          </p>
        </div>
        <ul style={{ paddingLeft: '24px', marginBottom: '0' }}>
          <li style={{ marginBottom: '8px' }}>You must provide accurate information (e.g., valid email).</li>
          <li style={{ marginBottom: '8px' }}>You are responsible for maintaining the security of your login credentials.</li>
          <li style={{ marginBottom: '8px' }}>We reserve the right to suspend accounts that violate these Terms.</li>
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
          5. User Content & Ownership
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
          By using the App, you grant us a limited, worldwide license to process your content solely for:
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '8px' }}>Storing and syncing your data securely,</li>
          <li style={{ marginBottom: '8px' }}>Generating AI summaries, insights, embeddings, and visualizations, and</li>
          <li style={{ marginBottom: '8px' }}>Delivering the App's features to you.</li>
        </ul>
        <p style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '12px',
          margin: 0
        }}>
          <strong>Your content is private.</strong> We do not sell your journal entries to third parties or use them to train public AI models.
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
          6. Subscriptions ("Elora Premium")
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Elora offers a subscription service called "Elora Premium" which unlocks enhanced features (e.g., unlimited Explore chat, advanced insights).
        </p>

        <div style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--foreground)' }}>
            Billing & Auto-Renewal
          </h3>
          <ul style={{ paddingLeft: '24px', marginBottom: '0' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Payment:</strong> Payment will be charged to your Apple ID or Google Play account at confirmation of purchase.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Auto-Renewal:</strong> Subscriptions automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Charges:</strong> Your account will be charged for renewal within 24 hours prior to the end of the current period at the cost of the chosen package (Monthly or Annual).
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Management:</strong> You can manage and cancel subscriptions in your device's Account Settings after purchase. We cannot cancel subscriptions for you.
            </li>
          </ul>
        </div>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Free Trials
            </h3>
            <p>
              If offered a free trial (e.g., 7 days), your subscription will automatically convert to a paid subscription at the end of the trial period unless canceled at least 24 hours before the trial ends. Unused portions of a free trial are forfeited upon purchasing a subscription.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Cross-Platform Access
            </h3>
            <p>
              Your subscription is tied to your Elora User Account. You may access Premium features on both iOS and Android devices if you are logged into the same account.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Refunds
            </h3>
            <p>
              All refund requests must be directed to Apple Support or Google Play Support. We do not have the ability to process refunds for in-app purchases directly.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Price Changes
            </h3>
            <p>
              We reserve the right to adjust pricing for our service or any components thereof. Any price changes will take effect following notice to you, usually via the App Store/Google Play notification system.
            </p>
          </div>
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
          7. AI Features & "Explore" Chat Liability
        </h2>
        <div style={{
          border: '2px solid #eab308', 
          background: 'rgba(234, 179, 8, 0.1)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <p style={{ margin: 0, fontWeight: '600', color: 'var(--foreground)' }}>
            Elora utilizes Artificial Intelligence (AI) to generate responses. By using the "Explore" chat or AI features, you explicitly acknowledge and agree to the following:
          </p>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              A. I Am Code, Not Human
            </h3>
            <p>
              Elora is a software program utilizing Large Language Models. It does not have feelings, consciousness, a physical body, or independent agency. It cannot "love" you, "miss" you, or form a genuine human relationship. Any appearance of emotion is a simulated response designed to be supportive.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              B. Not Medical or Professional Advice
            </h3>
            <p>
              <strong>ELORA IS NOT A DOCTOR, THERAPIST, LAWYER, OR FINANCIAL ADVISOR.</strong>
            </p>
            <p>
              The App is a self-reflection tool. It cannot diagnose mental health conditions, treat illness, or provide legal/investment advice. Do not make health, financial, or safety decisions based solely on AI responses.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              C. No Crisis Support
            </h3>
            <p>
              Elora is not equipped to handle emergencies. If you are in danger, contemplating self-harm, or experiencing a medical emergency, you must contact local emergency services immediately (e.g., 000 in Australia, 911 in USA).
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              D. Accuracy & Hallucinations
            </h3>
            <p>
              AI models can occasionally generate incorrect, misleading, or fabricated information ("hallucinations"). You are responsible for verifying any factual information provided by the App.
            </p>
          </div>
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
          8. Third-Party Services
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Elora relies on trusted third-party processors to function. By using the App, you acknowledge the use of:
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
            <strong>RevenueCat</strong><br/>
            <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Subscription & Purchase processing</span>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <strong>Anthropic & OpenAI</strong><br/>
            <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>LLM Providers for Text/Chat</span>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <strong>Supabase</strong><br/>
            <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Authentication & Database</span>
          </div>
          <div style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <strong>Railway & PostgreSQL</strong><br/>
            <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>Backend hosting</span>
          </div>
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
          9. Termination & Account Deletion
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
            <strong>Email:</strong> <a href="mailto:samrmccarthy6@gmail.com" style={{ color: 'var(--foreground)', textDecoration: 'none' }}>samrmccarthy6@gmail.com</a>
          </div>
        </div>
        <p style={{ marginBottom: '16px' }}>
          Deleting your account will remove your journal entries, summaries, and associated personal data from our systems. Note that subscription cancellations must be done separately via your device settings.
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
            We do not store your financial payment details (credit card numbers); this is handled entirely by the App Store and Google Play.
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
            We are not liable for indirect, incidental, or consequential damages arising from your use of the App or reliance on AI advice.
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
          12. Governing Law
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
          13. Contact Us
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