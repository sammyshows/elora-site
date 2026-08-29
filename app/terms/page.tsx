import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: "Elora Journaling App | Terms & Conditions",
  description: "Terms and conditions for Elora, the AI journaling app. Covers accounts, subscriptions, Elora Premium billing, AI feature liability, and data ownership.",
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main style={{
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
        Elora Journaling App | Terms & Conditions
      </h1>

      <p style={{
        fontSize: '16px',
        color: 'var(--foreground)',
        marginBottom: '40px',
        fontStyle: 'italic'
      }}>
        Last updated: 29 August 2026
      </p>

      <div style={{
        background: '#FFF8E1',
        border: '1px solid #FFC107',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
        fontSize: '15px',
        color: 'var(--foreground)',
      }}>
        <p style={{ margin: 0 }}><strong>Elora is the AI journaling app for iOS and Android.</strong> If you are looking for a different service called Elora, this page is not for you. To cancel an Elora journaling subscription, see Section 13 below.</p>
      </div>

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
          <strong>Data Controller:</strong> Samuel McCarthy
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
              An interactive chat interface powered by AI for reflective conversation based on your journal history.
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
              Entries saved on-device first, then synced securely to our servers when online.
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
              Elora is a software program utilizing AI. It does not have feelings, consciousness, a physical body, or independent agency. Any appearance of emotion is a simulated response designed to be supportive.
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
            <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>AI Providers</span>
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
            <strong>Cloud Hosting Provider</strong><br/>
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

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '16px',
          color: 'var(--foreground)',
          fontWeight: '600',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '8px'
        }}>
          13. Cancelling Your Subscription
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Subscriptions to Elora Premium are managed by Apple and Google, not by Elora. To cancel your subscription:
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
          <li style={{ marginBottom: '8px' }}>
            <strong>iOS (App Store):</strong> Open Settings {'>'} your Apple ID {'>'} Subscriptions {'>'} Elora {'>'} Cancel Subscription.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Android (Google Play):</strong> Open Google Play {'>'} Payments & subscriptions {'>'} Subscriptions {'>'} Elora {'>'} Cancel Subscription.
          </li>
        </ul>
        <p style={{ marginBottom: '16px' }}>
          Cancel at least 24 hours before your renewal date to avoid the next charge. Refund requests must be directed to Apple Support or Google Play Support; Elora cannot process refunds for in-app purchases.
        </p>
        <p style={{ margin: 0 }}>
          For other questions, visit the <a href="/support" style={{ color: '#007bff', textDecoration: 'none' }}>support page</a>.
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
          14. Apple App Store Supplementary Terms
        </h2>
        <p style={{ marginBottom: '16px' }}>
          If you downloaded Elora from the Apple App Store, the following terms apply:
        </p>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Acknowledgment
            </h3>
            <p style={{ margin: 0 }}>
              You and Elora acknowledge that these Terms are concluded between you and Elora only, and not with Apple, and that Elora, not Apple, is solely responsible for the App and its content.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Scope of License
            </h3>
            <p style={{ margin: 0 }}>
              The license granted to you for Elora is a non-transferable license to use the App on any Apple-branded products that you own or control, as permitted by the Usage Rules set forth in the Apple Media Services Terms and Conditions.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Maintenance and Support
            </h3>
            <p style={{ margin: 0 }}>
              Elora is solely responsible for providing any maintenance and support services. You and Elora acknowledge that Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Warranty
            </h3>
            <p style={{ margin: 0 }}>
              In the event of any failure of the App to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price for the App to you (to the maximum extent permitted by applicable law). To the maximum extent permitted by applicable law, Apple has no other warranty obligation whatsoever with respect to the App.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Product Claims
            </h3>
            <p style={{ margin: 0 }}>
              Elora, not Apple, is responsible for addressing any claims relating to the App or your possession and/or use of the App, including product liability claims, consumer protection claims, or regulatory compliance claims.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Intellectual Property
            </h3>
            <p style={{ margin: 0 }}>
              In the event of any third-party claim that the App or your possession and use of the App infringes a third party's intellectual property rights, Elora, not Apple, will be solely responsible for the investigation, defense, settlement, and discharge of any such claim.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Legal Compliance
            </h3>
            <p style={{ margin: 0 }}>
              You represent and warrant that (i) you are not located in a country subject to a U.S. Government embargo or designated as a "terrorist supporting" country, and (ii) you are not listed on any U.S. Government list of prohibited or restricted parties.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--foreground)' }}>
              Third-Party Beneficiary
            </h3>
            <p style={{ margin: 0 }}>
              You and Elora acknowledge and agree that Apple, and Apple's subsidiaries, are third-party beneficiaries of these Terms, and that Apple will have the right to enforce these Terms against you as a third-party beneficiary.
            </p>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}