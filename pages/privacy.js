import Link from 'next/link';
import styles from '../styles/Policy.module.css';

export default function Privacy() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/"><h1>Briar & Beam</h1></Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/">Shop</Link>
          <Link href="/about">About</Link>
          <a href="mailto:brianandbeam@gmail.com">Contact</a>
        </nav>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: April 2026</p>

        <section className={styles.section}>
          <p>Briar & Beam LLC (&ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your privacy. This Policy explains what information we collect, how we use it, and the choices you have.</p>
        </section>

        <section className={styles.section}>
          <h2>Information We Collect</h2>
          <ul>
            <li><strong>Order information:</strong> name, shipping and billing address, email, phone number, and the items you order.</li>
            <li><strong>Payment information:</strong> processed directly by Stripe. We never see or store your full card number.</li>
            <li><strong>Correspondence:</strong> messages you send us by email or through the Site.</li>
            <li><strong>Automatic data:</strong> limited technical data such as IP address, browser type, and pages visited, collected via standard web logs and analytics.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How We Use Information</h2>
          <ul>
            <li>To fulfill and ship your order, calculate taxes, and process refunds.</li>
            <li>To respond to inquiries and provide customer support.</li>
            <li>To send occasional updates about your order or, with your consent, about new work.</li>
            <li>To prevent fraud and comply with legal obligations.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Who We Share It With</h2>
          <p>We share information only with service providers who need it to run the business:</p>
          <ul>
            <li><strong>Stripe</strong> &mdash; payment processing.</li>
            <li><strong>Vercel</strong> &mdash; website hosting.</li>
            <li><strong>Shipping carriers</strong> &mdash; to deliver your order.</li>
            <li><strong>Email providers</strong> &mdash; to send transactional messages.</li>
          </ul>
          <p>We do not sell your personal information.</p>
        </section>

        <section className={styles.section}>
          <h2>Cookies</h2>
          <p>The Site uses a small number of cookies necessary for site functionality (such as maintaining your cart). We do not currently use third-party advertising cookies.</p>
        </section>

        <section className={styles.section}>
          <h2>Your Rights</h2>
          <p>Depending on where you live, you may have the right to request access to, correction of, or deletion of your personal information. To make a request, email <a href="mailto:brianandbeam@gmail.com">brianandbeam@gmail.com</a>. California residents: see the CCPA rights below.</p>
        </section>

        <section className={styles.section}>
          <h2>California Residents (CCPA)</h2>
          <p>California residents may request disclosure of the categories of personal information we have collected about them, request deletion, and opt out of any sale (we do not sell personal information). Requests can be sent to the address above.</p>
        </section>

        <section className={styles.section}>
          <h2>Retention</h2>
          <p>We keep order records as long as needed to fulfill our business and tax obligations (typically seven years) and delete other data when it is no longer necessary.</p>
        </section>

        <section className={styles.section}>
          <h2>Children</h2>
          <p>The Site is not directed to children under 13, and we do not knowingly collect information from them.</p>
        </section>

        <section className={styles.section}>
          <h2>Changes</h2>
          <p>We may update this Policy from time to time. The &ldquo;Last updated&rdquo; date above will reflect any changes.</p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>Questions about privacy? Email <a href="mailto:brianandbeam@gmail.com">brianandbeam@gmail.com</a>.</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 Briar & Beam LLC.</p>
        <p>
          <Link href="/about">About</Link> ·
          <Link href="/shipping">Shipping</Link> ·
          <Link href="/returns">Returns</Link> ·
          <Link href="/privacy">Privacy</Link> ·
          <Link href="/terms">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
