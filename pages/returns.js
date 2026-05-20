import Link from 'next/link';
import styles from '../styles/Policy.module.css';

export default function Returns() {
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
        <h1 className={styles.title}>Return Policy</h1>
        <p className={styles.updated}>Last updated: April 2026</p>

        <section className={styles.section}>
          <p>Every piece is made to order and handcrafted. Please read this policy before you purchase so there are no surprises.</p>
        </section>

        <section className={styles.section}>
          <h2>Order Cancellations</h2>
          <ul>
            <li><strong>Within 48 hours of ordering:</strong> full refund, no questions asked. Production has not yet begun.</li>
            <li><strong>After 48 hours, before production is complete:</strong> cancellation accepted with a 25% restocking fee to cover materials and labor already committed.</li>
            <li><strong>After production is complete:</strong> orders cannot be cancelled. The piece was made specifically for you.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Returns of Delivered Pieces</h2>
          <p>Because every piece is built to order, we do not accept returns based on change of mind. Please use our photos, dimensions, and wood options to confirm a piece is right for your space before ordering. We are happy to answer questions, send additional photos, or share wood samples before you purchase &mdash; just email <a href="mailto:brianandbeam@gmail.com">brianandbeam@gmail.com</a>.</p>
        </section>

        <section className={styles.section}>
          <h2>Damaged or Defective Pieces</h2>
          <p>If your piece arrives damaged or with a workmanship defect, we will make it right. Options include repair, replacement of the affected component, or a full replacement, at our discretion.</p>
          <p>To file a claim:</p>
          <ul>
            <li>Note any visible damage on the delivery receipt <em>before signing</em> (see our <Link href="/shipping">Shipping Policy</Link>).</li>
            <li>Email <a href="mailto:brianandbeam@gmail.com">brianandbeam@gmail.com</a> within 48 hours of delivery with your order number and clear photos of the issue.</li>
            <li>Do not dispose of packaging until we&apos;ve resolved the claim &mdash; it&apos;s often needed for carrier claims.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>What Is Not a Defect</h2>
          <p>Our pieces are made from solid, natural wood. The following are expected characteristics and are not grounds for a claim:</p>
          <ul>
            <li>Variations in grain pattern, color, and figure between pieces.</li>
            <li>Seasonal movement, minor gaps at joints, or small surface checks from changes in humidity.</li>
            <li>Gradual color change and deepening patina over time.</li>
            <li>Hand-tool marks or subtle asymmetries that reflect the piece was made by a person, not a machine.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>One-Year Workmanship Warranty</h2>
          <p>Every piece is warranted against defects in workmanship for one year from delivery. Normal wear, damage from misuse or accidents, and natural wood movement as described above are not covered.</p>
        </section>

        <section className={styles.section}>
          <h2>Refunds</h2>
          <p>Approved refunds are issued to the original payment method within 10 business days. The original shipping cost is non-refundable except in the case of a confirmed defect or carrier damage.</p>
        </section>

        <section className={styles.section}>
          <h2>Questions</h2>
          <p>We&apos;d rather answer questions before you buy than resolve a problem after. Reach out any time at <a href="mailto:brianandbeam@gmail.com">brianandbeam@gmail.com</a>.</p>
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
