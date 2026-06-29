import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { products } from '../data/products';
import Seo, { organizationJsonLd, localBusinessJsonLd } from '../components/Seo';

const HERO_IMAGE = '/images/julien/julien-1.jpg';
const ATELIER_IMAGE = 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1800&q=85&auto=format&fit=crop';

const PROCESS = [
  { n: '01', title: 'Selection', text: 'We choose every board by hand — domestic white oak and walnut from FSC-certified suppliers, examined for grain, figure, and stability.' },
  { n: '02', title: 'Joinery', text: 'Mortise-and-tenon, hand-cut dovetails, drawbore pegs. Traditional methods that create strength without metal fasteners.' },
  { n: '03', title: 'Finishing', text: 'Hand-applied oil and wax — no spray, no shortcuts. The wood keeps breathing; the finish only deepens with age.' },
  { n: '04', title: 'Delivery', text: 'White-glove placement in your home. Each piece arrives with its own ledger of materials, makers, and care notes.' },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutLoading(true);
    setCheckoutError(null);
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
      setCheckoutError(e.message);
      setCheckoutLoading(false);
    }
  };
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Hydrate cart
  useEffect(() => {
    const saved = localStorage.getItem('briarBeamCart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('briarBeamCart', JSON.stringify(cart));
  }, [cart]);

  // Scroll progress + header state
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const ratio = total > 0 ? h.scrollTop / total : 0;
      setProgress(ratio);
      setScrolled(h.scrollTop > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));
  const updateQty = (id, delta) => {
    const next = cart
      .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
      .filter((i) => i.quantity > 0);
    setCart(next);
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  // Featured: The Julien (id 5) — fall back to first
  const featured = products.find((p) => p.id === 5) || products[0];
  const rest = products.filter((p) => p.id !== featured.id);

  return (
    <div className={styles.container}>
      <Seo
        title="Heirloom American Hardwood Furniture, Made by Hand in Colorado"
        description="Handcrafted solid walnut and white oak furniture from a small two-person atelier in Louisville, Colorado. Mortise & tenon joinery, hand-rubbed oil finishes. Built once. Kept always."
        path="/"
        jsonLd={[organizationJsonLd, localBusinessJsonLd]}
      />

      {/* Scroll progress hairline */}
      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} />

      {/* Header */}
      <header className={`${styles.header} ${scrolled ? styles.headerSolid : ''}`}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.wordmark}>
            <span className={styles.wordmarkBriar}>Briar</span>
            <span className={styles.wordmarkAmp}>&amp;</span>
            <span className={styles.wordmarkBeam}>Beam</span>
          </Link>
          <nav className={styles.nav}>
            <a href="#collection">Collection</a>
            <Link href="/about">Atelier</Link>
            <Link href="/journal">Journal</Link>
            <a href="#process">Process</a>
            <a href="mailto:briarandbeam@gmail.com">Inquire</a>
            <Link href="/cart" className={styles.cartBtn} aria-label="View cart">
              <span className="smallcaps">Cart</span>
              <span className={styles.cartCount}>{cartCount.toString().padStart(2, '0')}</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero — full-bleed product photo with centered typography */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <div
            className={styles.heroImage}
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            aria-hidden="true"
          />
          <div className={styles.heroVignette} />
        </div>
        <div className={styles.heroInner}>
          <span className="rise smallcaps" style={{ '--delay': '300ms' }}>Made by Hand</span>
          <h1 className="rise" style={{ '--delay': '500ms' }}>
            <span className={styles.heroWordmark}>Briar <em>&amp;</em> Beam</span>
          </h1>
          <p className={`rise ${styles.heroTagline}`} style={{ '--delay': '750ms' }}>
            Heirloom American Furniture
          </p>
          <p className={`rise ${styles.heroLede}`} style={{ '--delay': '950ms' }}>
            Solid hardwood, joined by hand, finished with oil. Built once. Kept always.
          </p>
          <a href="#collection" className={`rise ${styles.heroCta}`} style={{ '--delay': '1150ms' }}>
            <span className="smallcaps">Shop the Collection</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Editorial intro */}
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <span className="reveal smallcaps">An Introduction</span>
          <h2 className={`reveal ${styles.introQuote}`} style={{ '--delay': '120ms' }}>
            Made to <em>become family.</em>
          </h2>
          <div className={styles.introBody}>
            <p className="reveal" style={{ '--delay': '240ms' }}>
              The pieces you live with aren&rsquo;t just objects. They&rsquo;re where your family gathers — the corners that hold birthdays, the table that hosts a thousand Sunday mornings, the console that quietly watches over a hallway for forty years.
            </p>
            <p className="reveal" style={{ '--delay': '320ms' }}>
              A good piece of furniture grows with a household. It softens at the edges. It deepens in color. It collects stories the way an old house does. We build ours to be lived with that way — solid hardwood, joined by hand, finished with oil. Built once. Kept always.
            </p>
          </div>
        </div>
      </section>

      {/* Featured piece */}
      <section id="collection" className={styles.featured}>
        <div className={styles.collectionHeader}>
          <span className="reveal smallcaps">The Collection</span>
          <h2 className={`reveal ${styles.collectionTitle}`} style={{ '--delay': '120ms' }}>
            Seven pieces, <em>made by hand.</em>
          </h2>
        </div>

        <div className={styles.featuredInner}>
          <Link href={`/products/${featured.id}`} className={`reveal ${styles.featuredImageWrap}`}>
            <div className={styles.featuredImage} style={{ backgroundImage: `url(${featured.image})` }} />
            <div className={styles.featuredOverlay}>
              <span className="smallcaps">View piece &rarr;</span>
            </div>
          </Link>

          <aside className={`reveal ${styles.featuredText}`} style={{ '--delay': '160ms' }}>
            <span className="smallcaps">Featured Piece</span>
            <h3 className={styles.featuredTitle}>
              <em>The {featured.name.replace('The ', '')}</em>
            </h3>
            <p className={styles.featuredCategory}>{featured.category}</p>
            <p className={styles.featuredDescription}>{featured.description}</p>
            <div className={styles.featuredMeta}>
              <span className={styles.featuredPrice}>${featured.price.toLocaleString()}</span>
              <Link href={`/products/${featured.id}`} className={styles.featuredLink}>
                <span>Read the full piece</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Index grid */}
      <section className={styles.index}>
        <div className={styles.indexHeader}>
          <span className="reveal smallcaps">More from the Collection</span>
        </div>

        <div className={styles.indexGrid}>
          {rest.map((p, i) => {
            const second = (p.images && p.images[1]) || p.image;
            return (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className={`reveal ${styles.card}`}
                style={{ '--delay': `${i * 80}ms` }}
              >
                <div className={styles.cardImageWrap}>
                  <div className={styles.cardImage} style={{ backgroundImage: `url(${p.image})`, backgroundPosition: p.imagePosition || 'center', backgroundSize: p.variants ? 'contain' : undefined, backgroundRepeat: p.variants ? 'no-repeat' : undefined, backgroundColor: p.variants ? 'var(--paper-deep)' : undefined }} />
                  <div className={styles.cardImageHover} style={{ backgroundImage: `url(${second})`, backgroundPosition: p.imagePosition || 'center', backgroundSize: p.variants ? 'contain' : undefined, backgroundRepeat: p.variants ? 'no-repeat' : undefined, backgroundColor: p.variants ? 'var(--paper-deep)' : undefined }} />
                </div>
                <div className={styles.cardMeta}>
                  <h3 className={styles.cardName}><em>{p.name}</em></h3>
                  <p className={styles.cardCategory}>{p.category}</p>
                  <span className={styles.cardPrice}>
                    {p.price > 0 ? `$${p.price.toLocaleString()}` : 'Inquire'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section id="process" className={styles.process}>
        <div className={styles.processInner}>
          <div className={styles.processHeader}>
            <span className="reveal smallcaps">The Process</span>
            <h2 className={`reveal ${styles.processTitle}`} style={{ '--delay': '120ms' }}>
              Slow on purpose.
            </h2>
            <p className={`reveal ${styles.processLead}`} style={{ '--delay': '240ms' }}>
              Lead times of three to six weeks aren&rsquo;t a constraint — they&rsquo;re a method. Each piece is built front to back by the same pair of hands, in a single small shop.
            </p>
          </div>

          <ol className={styles.processList}>
            {PROCESS.map((p, i) => (
              <li
                key={p.n}
                className={`reveal ${styles.processItem}`}
                style={{ '--delay': `${i * 120}ms` }}
              >
                <span className={styles.processNum}>{parseInt(p.n, 10)}</span>
                <div>
                  <h3 className={styles.processStepTitle}>{p.title}</h3>
                  <p className={styles.processStepText}>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Atelier / custom CTA */}
      <section className={styles.atelier}>
        <div className={styles.atelierImageWrap}>
          <div
            className={`${styles.atelierImage} kenburns`}
            style={{ backgroundImage: `url(${ATELIER_IMAGE})` }}
          />
          <div className={styles.atelierTint} />
        </div>
        <div className={styles.atelierCard}>
          <span className="reveal smallcaps">Visit the Atelier</span>
          <h2 className={`reveal ${styles.atelierTitle}`} style={{ '--delay': '120ms' }}>
            Have something <em>specific</em> in mind?
          </h2>
          <p className={`reveal ${styles.atelierBody}`} style={{ '--delay': '240ms' }}>
            We accept a small number of custom commissions each season — dining tables, beds, built-ins. Send us a sketch, a photograph you&rsquo;ve been carrying, or just a paragraph. We&rsquo;ll write back.
          </p>
          <a href="mailto:briarandbeam@gmail.com" className={`reveal ${styles.atelierLink}`} style={{ '--delay': '360ms' }}>
            <span>briarandbeam@gmail.com</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerHero}>
          <span className={styles.footerWordmark}>
            Briar <em>&amp;</em> Beam
          </span>
        </div>

        <div className={styles.footerCols}>
          <div>
            <span className="smallcaps">Collection</span>
            <ul>
              {products.slice(0, 5).map((p) => (
                <li key={p.id}><Link href={`/products/${p.id}`}>{p.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <span className="smallcaps">Atelier</span>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><a href="mailto:briarandbeam@gmail.com">Custom Work</a></li>
              <li><Link href="/shipping">Shipping</Link></li>
              <li><Link href="/returns">Returns</Link></li>
            </ul>
          </div>
          <div>
            <span className="smallcaps">Contact</span>
            <ul>
              <li><a href="mailto:briarandbeam@gmail.com">briarandbeam@gmail.com</a></li>
              <li>By appointment</li>
            </ul>
          </div>
          <div>
            <span className="smallcaps">Fine Print</span>
            <ul>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.colophon}>
          <span>&copy; 2026 Briar &amp; Beam</span>
          <span>Made by hand</span>
        </div>
      </footer>

      {/* Order pad (cart) */}
      <div
        className={`${styles.cartScrim} ${cartOpen ? styles.cartScrimOpen : ''}`}
        onClick={() => setCartOpen(false)}
      />
      <aside className={`${styles.cart} ${cartOpen ? styles.cartOpen : ''}`} aria-hidden={!cartOpen}>
        <div className={styles.cartHeader}>
          <span className="smallcaps">Cart</span>
          <button className={styles.cartClose} onClick={() => setCartOpen(false)} aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.cartEmpty}>
            <p className={styles.cartEmptyTitle}><em>Your cart is empty.</em></p>
            <p className={styles.cartEmptyBody}>Browse the collection to add a piece.</p>
          </div>
        ) : (
          <>
            <ul className={styles.cartItems}>
              {cart.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <div className={styles.cartItemTop}>
                    <span className={styles.cartItemName}><em>{item.name}</em></span>
                    <span className="mono">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                  <div className={styles.cartItemBottom}>
                    <div className={styles.qty}>
                      <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease">−</button>
                      <span className="mono">{item.quantity.toString().padStart(2, '0')}</span>
                      <button onClick={() => updateQty(item.id, 1)} aria-label="Increase">+</button>
                    </div>
                    <button className={styles.cartRemove} onClick={() => removeFromCart(item.id)}>
                      <span className="smallcaps">Remove</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <span className="smallcaps">Subtotal</span>
                <span className={`${styles.cartTotalAmt} mono`}>${total.toLocaleString()}</span>
              </div>
              <button
                className={styles.cartReserve}
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                <span className="smallcaps">{checkoutLoading ? 'Loading…' : 'Checkout'}</span>
                {!checkoutLoading && <span aria-hidden="true">&rarr;</span>}
              </button>
              {checkoutError && (
                <p className={styles.cartError}>{checkoutError}</p>
              )}
              <p className={styles.cartNote}>
                Each piece is made to order. Lead time 3–6 weeks. Shipping quoted separately.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
