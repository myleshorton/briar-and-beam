import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/CartPage.module.css';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('briarBeamCart') || '[]');
      setCart(Array.isArray(saved) ? saved : []);
    } catch (e) {
      setCart([]);
    }
    setHydrated(true);
  }, []);

  const save = (next) => {
    setCart(next);
    try {
      localStorage.setItem('briarBeamCart', JSON.stringify(next));
    } catch (e) { /* ignore */ }
  };

  const itemKey = (item, idx) => item.cartId || `${item.id}-${idx}`;

  const updateQty = (key, delta) => {
    save(
      cart
        .map((i, idx) =>
          itemKey(i, idx) === key ? { ...i, quantity: Math.max(0, (i.quantity || 1) + delta) } : i
        )
        .filter((i) => (i.quantity || 0) > 0)
    );
  };

  const removeItem = (key) => {
    save(cart.filter((i, idx) => itemKey(i, idx) !== key));
  };

  const subtotal = cart.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);

  const checkout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Failed to start checkout.');
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cart — Briar &amp; Beam</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.wordmark}>
            <span className={styles.wordmarkBriar}>Briar</span>
            <span className={styles.wordmarkAmp}>&amp;</span>
            <span className={styles.wordmarkBeam}>Beam</span>
          </Link>
          <nav className={styles.nav}>
            <Link href="/">Collection</Link>
            <Link href="/about">Atelier</Link>
            <a href="mailto:briarandbeam@gmail.com">Inquire</a>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <span className={`smallcaps ${styles.eyebrow}`}>Your Order</span>
        <h1 className={styles.title}>The <em>Cart</em></h1>

        {!hydrated ? (
          <p className={styles.loading}>Loading your cart…</p>
        ) : cart.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}><em>Your cart is empty.</em></p>
            <p className={styles.emptyBody}>Browse the collection to add a piece.</p>
            <Link href="/" className={styles.back}>
              <span className="smallcaps">View the collection</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <ul className={styles.items}>
              {cart.map((item, idx) => {
                const key = itemKey(item, idx);
                return (
                  <li key={key} className={styles.item}>
                    {item.image && (
                      <div className={styles.imageWrap}>
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                      </div>
                    )}
                    <div className={styles.meta}>
                      <h3 className={styles.itemName}><em>{item.name}</em></h3>
                      {item.selectedWood && (
                        <p className={styles.itemSpec}>{item.selectedWood}</p>
                      )}
                      <p className={styles.itemPrice}>${(item.price || 0).toLocaleString()}</p>
                    </div>
                    <div className={styles.qtyCtl}>
                      <button onClick={() => updateQty(key, -1)} aria-label="Decrease">−</button>
                      <span className="mono">{(item.quantity || 1).toString().padStart(2, '0')}</span>
                      <button onClick={() => updateQty(key, 1)} aria-label="Increase">+</button>
                    </div>
                    <div className={styles.lineTotal}>
                      <span className="mono">
                        ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                    <button
                      className={styles.remove}
                      onClick={() => removeItem(key)}
                      aria-label={`Remove ${item.name}`}
                    >
                      ×
                    </button>
                  </li>
                );
              })}
            </ul>

            <aside className={styles.summary}>
              <div className={styles.summaryRow}>
                <span className="smallcaps">Subtotal</span>
                <span className={`${styles.summaryAmount} mono`}>
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <p className={styles.shippingNote}>
                Shipping is quoted separately based on your address — we&rsquo;ll contact you within one business day with the cost.
              </p>
              <p className={styles.leadNote}>
                Lead time <em>3–6 weeks</em>. Each piece made to order.
              </p>

              {error && <p className={styles.error}>{error}</p>}

              <button
                className={styles.checkout}
                onClick={checkout}
                disabled={loading || cart.length === 0}
              >
                <span className="smallcaps">{loading ? 'Loading…' : 'Checkout'}</span>
                {!loading && <span aria-hidden="true">&rarr;</span>}
              </button>

              <Link href="/" className={styles.continue}>
                <span className="smallcaps">Continue shopping</span>
              </Link>
            </aside>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <span>&copy; 2026 Briar &amp; Beam &middot; Made by hand</span>
      </footer>
    </div>
  );
}
