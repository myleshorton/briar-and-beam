import Link from 'next/link';
import styles from '../styles/Policy.module.css';

export default function Shipping() {
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
        <h1 className={styles.title}>Shipping Policy</h1>
        <p className={styles.updated}>Last updated: April 2026</p>

        <section className={styles.section}>
          <p>Our furniture is substantial, handmade, and shipped with care. Because every piece is made to order, shipping timelines reflect the craftsmanship behind them.</p>
        </section>

        <section className={styles.section}>
          <h2>Lead Time</h2>
          <p>Pieces are built to order. Typical production time is 3&ndash;6 weeks before a piece is ready to ship. You will receive an email update when your piece is complete and scheduled for delivery.</p>
        </section>

        <section className={styles.section}>
          <h2>Where We Ship</h2>
          <p>We currently ship to addresses in the contiguous United States. For Alaska, Hawaii, or international delivery, please contact us before ordering at <a href="mailto:briarandbeam@gmail.com">briarandbeam@gmail.com</a> for a custom quote.</p>
        </section>

        <section className={styles.section}>
          <h2>Shipping Methods</h2>
          <ul>
            <li><strong>Small items (under 70 lbs):</strong> carrier ground (UPS or FedEx). Delivered to your door.</li>
            <li><strong>Large furniture (tables, consoles, benches):</strong> freight carrier with curbside delivery. The carrier will call to schedule a delivery window. Someone must be present to sign for the delivery.</li>
            <li><strong>White-glove delivery</strong> (in-home placement, unpacking, debris removal) is available for an additional fee on most larger pieces. Contact us for a quote.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Shipping Costs</h2>
          <p>Shipping costs are calculated at checkout based on the piece, your location, and the service level. For oversized or custom pieces we may follow up by email with a precise freight quote before production begins; your order is not final until you approve any revised shipping cost.</p>
        </section>

        <section className={styles.section}>
          <h2>Inspection at Delivery</h2>
          <p>Please inspect your piece carefully before signing the delivery receipt. If you see any damage to the packaging or the piece itself, <strong>note it clearly on the delivery receipt</strong> before signing and take photographs. This is critical &mdash; without this note, freight carriers will generally not honor damage claims. Email photos and your order number to <a href="mailto:briarandbeam@gmail.com">briarandbeam@gmail.com</a> within 48 hours of delivery and we will make it right.</p>
        </section>

        <section className={styles.section}>
          <h2>Missed Deliveries & Redelivery Fees</h2>
          <p>Freight carriers will attempt to contact you to schedule a delivery window. If you miss a scheduled delivery or the carrier is unable to reach you, redelivery or storage fees charged by the carrier are the responsibility of the customer.</p>
        </section>

        <section className={styles.section}>
          <h2>Title & Risk of Loss</h2>
          <p>Risk of loss transfers to you upon delivery by the carrier. We insure shipments against damage in transit and will work with you and the carrier on any legitimate claim documented per the inspection procedure above.</p>
        </section>

        <section className={styles.section}>
          <h2>Questions</h2>
          <p>Shipping questions? Email <a href="mailto:briarandbeam@gmail.com">briarandbeam@gmail.com</a> before ordering so we can make sure a piece will work for your space and your delivery situation.</p>
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
