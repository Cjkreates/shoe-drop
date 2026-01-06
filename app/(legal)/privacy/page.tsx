export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold uppercase tracking-tight mb-12 text-zinc-50">
          PRIVACY POLICY
        </h1>

        <div className="space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-zinc-50">1. INFORMATION WE COLLECT</h2>
            <p>
              AERO INC. ("we," "us," or "our") collects information that you provide directly to us, including 
              your name, email address, phone number, shipping address, and payment information when you make 
              a purchase. We also collect information automatically when you visit our website, such as your IP 
              address and browsing behavior.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-zinc-50">2. HOW WE USE YOUR INFORMATION</h2>
            <p>
              We use the information we collect to process your orders, communicate with you about your 
              purchases, send you marketing communications (with your consent), improve our website and 
              services, and comply with legal obligations. We do not sell your personal information to 
              third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-zinc-50">3. PAYMENT INFORMATION</h2>
            <p>
              All payment transactions are processed securely through Paystack. We do not store your full 
              credit card or M-Pesa PIN details on our servers. Payment information is encrypted and handled 
              in accordance with PCI DSS standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-zinc-50">4. DATA SECURITY</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. However, 
              no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-zinc-50">5. YOUR RIGHTS</h2>
            <p>
              Under the Data Protection Act of Kenya, you have the right to access, correct, or delete your 
              personal information. You may also opt-out of marketing communications at any time by 
              contacting us or using the unsubscribe link in our emails.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-zinc-50">6. COOKIES</h2>
            <p>
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize 
              content. You can control cookies through your browser settings, though this may affect 
              website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-zinc-50">7. CONTACT US</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              AERO INC.<br />
              Nakuru, Kenya<br />
              Email: privacy@aero.ke
            </p>
          </section>

          <section>
            <p className="text-sm text-zinc-500 mt-12">
              Last updated: January 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}



