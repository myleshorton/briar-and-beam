import Link from 'next/link';
import styles from '../styles/Policy.module.css';

export default function Terms() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/"><h1>Briar & Beam</h1></Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/">Shop</Link>
          <Link href="/about">About</Link>
          <a href="mailto:briarandbeam@gmail.com">Contact</a>
        </nav>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.updated}>Last updated: April 2026</p>

        <section className={styles.section}>
          <p>Welcome to Briar & Beam. By accessing or purchasing from briarandbeam.com (the &ldquo;Site&rdquo;), you agree to the following terms. Please read them carefully.</p>
        </section>

        <section className={styles.section}>
          <h2>1. Who We Are</h2>
          <p>Briar & Beam is operated by Briar & Beam LLC, a Wyoming limited liability company. References to &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo; mean Briar & Beam LLC.</p>
        </section>

        <section className={styles.section}>
          <h2>2. Orders & Acceptance</h2>
          <p>All orders placed through the Site are offers to purchase. We reserve the right to accept or decline any order at our discretion, including after payment has been processed. If we decline an order, we will refund the purchase price in full.</p>
          <p>Product descriptions, photographs, and dimensions are provided as accurately as possible. Because our pieces are handmade from natural wood, each piece will have unique variations in grain, color, and character. These variations are not defects.</p>
        </section>

        <section className={styles.section}>
          <h2>3. Pricing & Payment</h2>
          <p>Prices are listed in U.S. dollars and are subject to change without notice. Applicable sales tax will be calculated at checkout based on the shipping destination. Payment is processed securely through Stripe; we do not store your payment card details.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Lead Times & Production</h2>
          <p>Our furniture is made to order. Typical lead times are 3&ndash;6 weeks from order confirmation to shipment, though complex or custom pieces may take longer. Estimated lead times are not guarantees.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Shipping, Returns & Cancellations</h2>
          <p>Shipping, return, and cancellation terms are governed by our <Link href="/shipping">Shipping Policy</Link> and <Link href="/returns">Return Policy</Link>, which are incorporated into these Terms by reference.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Intellectual Property</h2>
          <p>All content on the Site &mdash; including photographs, designs, text, and the Briar & Beam name and logo &mdash; is the property of Briar & Beam LLC and may not be reproduced without written permission.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Briar & Beam LLC&apos;s total liability for any claim arising out of or related to an order shall not exceed the purchase price paid for the product giving rise to the claim. We are not liable for indirect, incidental, or consequential damages.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Warranty Disclaimer</h2>
          <p>Our furniture is warranted against defects in workmanship for one year from the date of delivery. Natural movement of wood (seasonal expansion, slight checking, patina development) is expected and is not a defect. Outside of this express warranty, products are sold &ldquo;as is&rdquo; and we disclaim all implied warranties to the fullest extent permitted by law.</p>
        </section>

        <section className={styles.section}>
          <h2>9. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of Wyoming, without regard to its conflict-of-laws rules. Any dispute shall be resolved in the state or federal courts located in Wyoming.</p>
        </section>

        <section className={styles.section}>
          <h2>10. Contact</h2>
          <p>Questions about these Terms? Email <a href="mailto:briarandbeam@gmail.com">briarandbeam@gmail.com</a>.</p>
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
