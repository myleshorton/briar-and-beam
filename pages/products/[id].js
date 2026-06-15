import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { products } from '../../data/products';
import styles from '../../styles/ProductDetail.module.css';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);
  const [selectedWood, setSelectedWood] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? h.scrollTop / total : 0);
      setScrolled(h.scrollTop > 60);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [id]);

  if (!router.isReady) return null;

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return (
      <div className={styles.notFound}>
        <p className="smallcaps">N&deg;. 404 — Not Found</p>
        <h1><em>This piece is not in our ledger.</em></h1>
        <Link href="/" className={styles.notFoundLink}>Return to the Collection &rarr;</Link>
      </div>
    );
  }

  const productIndex = products.findIndex((p) => p.id === product.id) + 1;
  const num = productIndex.toString().padStart(2, '0');

  const images = product.images || [product.image];
  const variant = product.variants ? (product.variants[selectedImage] || product.variants[0]) : null;
  const adjustedPrice = variant
    ? variant.price
    : product.price + (product.woodOptions?.[selectedWood]?.priceAdjust || 0);
  const details = variant
    ? [`Wood: ${variant.wood}`, `Dimensions: ${variant.dims}`, ...product.details]
    : product.details;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('briarBeamCart')) || [];
    const wood = variant ? variant.wood : (product.woodOptions?.[selectedWood]?.name || '');
    const cartId = variant ? `${product.id}-${variant.name}` : `${product.id}-${wood}`;
    const existing = cart.find((item) => item.cartId === cartId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        ...product,
        cartId,
        name: variant ? variant.name : product.name,
        image: variant ? variant.image : product.image,
        selectedWood: wood,
        price: adjustedPrice,
        quantity,
      });
    }

    localStorage.setItem('briarBeamCart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
    setQuantity(1);
  };

  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 3);
  const description = product.description || '';
  const firstSentenceMatch = description.match(/^(.+?[.!?])\s/);
  const pullquote = firstSentenceMatch ? firstSentenceMatch[1] : description.slice(0, 110);
  const restDescription = firstSentenceMatch ? description.slice(firstSentenceMatch[0].length) : '';

  return (
    <div className={styles.container}>
      <Head>
        <title>{product.name} — Briar &amp; Beam</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Head>

      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} />

      <header className={`${styles.header} ${scrolled ? styles.headerSolid : ''}`}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.wordmark}>
            <span>Briar</span>
            <span className={styles.wordmarkAmp}>&amp;</span>
            <span>Beam</span>
          </Link>
          <nav className={styles.nav}>
            <Link href="/">Collection</Link>
            <Link href="/about">Atelier</Link>
            <a href="mailto:brianandbeam@gmail.com">Inquire</a>
            <Link href="/" className={styles.back}>
              <span aria-hidden="true">&larr;</span>
              <span>Back</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles.spread}>
        {/* Left column — image gallery */}
        <section className={styles.gallery}>
          <div
            className={`${styles.mainImageWrap} ${product.variants ? styles.mainImagePortrait : ''} ${images.length > 1 ? styles.mainImageClickable : ''}`}
            onClick={() => images.length > 1 && setSelectedImage((selectedImage + 1) % images.length)}
            role={images.length > 1 ? 'button' : undefined}
            tabIndex={images.length > 1 ? 0 : undefined}
            onKeyDown={(e) => {
              if (images.length <= 1) return;
              if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setSelectedImage((selectedImage + 1) % images.length);
              } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setSelectedImage((selectedImage - 1 + images.length) % images.length);
              }
            }}
            aria-label={images.length > 1 ? `Image ${selectedImage + 1} of ${images.length}. Click to advance.` : undefined}
          >
            <div
              key={selectedImage}
              className={styles.mainImage}
              style={{ backgroundImage: `url(${images[selectedImage]})`, backgroundPosition: product.imagePosition || 'center' }}
            />
            <span className={styles.imgIndex}>
              {selectedImage + 1} / {images.length}
            </span>
            {images.length > 1 && (
              <span className={styles.mainImageArrow} aria-hidden="true">&rarr;</span>
            )}
          </div>

          {product.variants && (
            <p className={`smallcaps ${styles.pickerLabel}`}>
              Choose your board &mdash; <em>{variant.name}</em>
            </p>
          )}

          <div className={`${styles.thumbStrip} ${product.variants ? styles.boardPicker : ''}`}>
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`${styles.thumb} ${idx === selectedImage ? styles.thumbActive : ''}`}
                onClick={() => setSelectedImage(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <span style={{ backgroundImage: `url(${img})` }} />
              </button>
            ))}
          </div>
        </section>

        {/* Right column — editorial */}
        <section className={styles.editorial}>
          <div className={styles.editorialInner}>
            <div className="reveal">
              <p className={styles.eyebrow}>
                {product.category}
              </p>
              <h1 className={styles.title}>
                <em>{variant ? variant.name : product.name}</em>
              </h1>
            </div>

            <div className={`reveal ${styles.priceRow}`} style={{ '--delay': '120ms' }}>
              <span className={styles.price}>${adjustedPrice.toLocaleString()}</span>
              <span className={styles.priceNote}><em>USD &middot; ships in 3–6 weeks</em></span>
            </div>

            <p className={`reveal ${styles.pullquote}`} style={{ '--delay': '200ms' }}>
              <span className={styles.openQuote}>&ldquo;</span>
              {pullquote}
            </p>

            {restDescription && (
              <p className={`reveal ${styles.body}`} style={{ '--delay': '280ms' }}>
                {restDescription}
              </p>
            )}

            <div className={`reveal ${styles.specs}`} style={{ '--delay': '360ms' }}>
              <p className="smallcaps">Specifications</p>
              <ul>
                {details.map((d, i) => {
                  const [label, ...rest] = d.split(':');
                  const value = rest.join(':').trim();
                  return (
                    <li key={i}>
                      <span className={styles.specLabel}>{label}</span>
                      {value && <span className={styles.specValue}>{value}</span>}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={`reveal ${styles.actions}`} style={{ '--delay': '440ms' }}>
              {product.woodOptions && product.woodOptions.length > 1 && (
                <div className={styles.woodGroup}>
                  <p className="smallcaps">Wood</p>
                  <div className={styles.woodOptions}>
                    {product.woodOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedWood(idx)}
                        className={`${styles.woodOption} ${idx === selectedWood ? styles.woodOptionActive : ''}`}
                      >
                        <span><em>{opt.name}</em></span>
                        {opt.priceAdjust > 0 && (
                          <span className={`${styles.woodAdjust} mono`}>+${opt.priceAdjust}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.qtyRow}>
                <p className="smallcaps">Quantity</p>
                <div className={styles.qtyCtl}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease">−</button>
                  <span className="mono">{quantity.toString().padStart(2, '0')}</span>
                  <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase">+</button>
                </div>
              </div>

              <button
                className={`${styles.reserveBtn} ${added ? styles.reserveBtnAdded : ''}`}
                onClick={handleAddToCart}
                disabled={adjustedPrice === 0}
              >
                <span className="smallcaps">
                  {adjustedPrice === 0 ? 'Inquire for pricing' : added ? 'Added to cart' : 'Add to cart'}
                </span>
                <span className={styles.reserveArrow} aria-hidden="true">&rarr;</span>
              </button>
            </div>

            <div className={`reveal ${styles.fineprint}`} style={{ '--delay': '520ms' }}>
              <div>
                <p className="smallcaps">Lead time</p>
                <p>3–6 weeks, made to order in our workshop.</p>
              </div>
              <div>
                <p className="smallcaps">Shipping</p>
                <p>White-glove delivery, calculated at checkout.</p>
              </div>
              <div>
                <p className="smallcaps">Returns</p>
                <p>No returns unless damaged in transit.</p>
              </div>
              <div>
                <p className="smallcaps">Custom</p>
                <p>
                  <a href="mailto:brianandbeam@gmail.com">Inquire about a custom version &rarr;</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Related */}
      <section className={styles.related}>
        <div className={styles.relatedHeader}>
          <span className="reveal smallcaps">More Pieces</span>
          <h2 className={`reveal ${styles.relatedTitle}`} style={{ '--delay': '120ms' }}>
            From the <em>Collection</em>
          </h2>
        </div>

        <div className={styles.relatedGrid}>
          {otherProducts.map((p, i) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className={`reveal ${styles.relatedCard}`}
              style={{ '--delay': `${i * 80}ms` }}
            >
              <div className={styles.relatedImageWrap}>
                <div className={styles.relatedImage} style={{ backgroundImage: `url(${p.image})`, backgroundPosition: p.imagePosition || 'center', backgroundSize: p.variants ? 'contain' : undefined, backgroundRepeat: p.variants ? 'no-repeat' : undefined, backgroundColor: p.variants ? 'var(--paper-deep)' : undefined }} />
              </div>
              <div className={styles.relatedMeta}>
                <h3><em>{p.name}</em></h3>
                <p className={styles.relatedCategory}>{p.category}</p>
                <span className={styles.relatedPrice}>
                  {p.price > 0 ? `$${p.price.toLocaleString()}` : 'Inquire'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>&copy; 2026 Briar &amp; Beam &middot; Made by hand</span>
        <span><a href="mailto:brianandbeam@gmail.com">brianandbeam@gmail.com</a></span>
      </footer>
    </div>
  );
}
