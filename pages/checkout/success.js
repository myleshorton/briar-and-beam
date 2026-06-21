import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../../styles/Checkout.module.css';

export default function CheckoutSuccess() {
  // Clear the cart on successful purchase
  useEffect(() => {
    try {
      localStorage.removeItem('briarBeamCart');
    } catch (e) { /* ignore */ }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Thank you — Briar &amp; Beam</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.wordmark}>
            <span className={styles.wordmarkBriar}>Briar</span>
            <span className={styles.wordmarkAmp}>&amp;</span>
            <span className={styles.wordmarkBeam}>Beam</span>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <span className={`smallcaps ${styles.eyebrow}`}>Order Received</span>
        <h1 className={styles.title}>Thank <em>you.</em></h1>
        <div className={styles.body}>
          <p>Your order is in. We&rsquo;ll reach out within <strong>one business day</strong> with your shipping quote and to confirm the details.</p>
          <p>Lead time is <em>3 to 6 weeks</em> &mdash; each piece is made to order by hand.</p>
          <p className={styles.contact}>
            Questions? <a href="mailto:briarandbeam@gmail.com">briarandbeam@gmail.com</a>
          </p>
        </div>
        <Link href="/" className={styles.back}>
          <span className="smallcaps">Continue browsing</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </main>

      <footer className={styles.footer}>
        <span>&copy; 2026 Briar &amp; Beam &middot; Made by hand</span>
      </footer>
    </div>
  );
}
