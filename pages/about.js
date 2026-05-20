import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/About.module.css';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2400&q=85&auto=format&fit=crop';
const PORTRAIT_IMAGE = 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1400&q=85&auto=format&fit=crop';

export default function About() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

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
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>The Atelier — Briar &amp; Beam</title>
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
            <a href="#story">Atelier</a>
            <a href="mailto:brianandbeam@gmail.com">Inquire</a>
          </nav>
        </div>
      </header>

      {/* Cover */}
      <section className={styles.cover}>
        <div className={styles.coverImageWrap}>
          <div
            className={`${styles.coverImage} kenburns`}
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
          <div className={styles.coverTint} />
        </div>
        <div className={styles.coverGrid}>
          <span className="rise smallcaps" style={{ '--delay': '300ms' }}>Our Story</span>
          <h1 className={styles.coverTitle}>
            <span className="rise" style={{ '--delay': '500ms' }}>Furniture that</span>
            <span className="rise italic-display" style={{ '--delay': '700ms' }}>tells a story.</span>
          </h1>
          <p className={`rise ${styles.coverDek}`} style={{ '--delay': '950ms' }}>
            A small workshop. Two people, hardwoods, hand tools, and one piece at a time.
          </p>
        </div>
      </section>

      {/* Editorial standfirst */}
      <section className={styles.standfirst}>
        <span className="reveal smallcaps">An Introduction</span>
        <p className={`reveal ${styles.standfirstText}`} style={{ '--delay': '120ms' }}>
          <em>Every piece of wood has lived.</em> It grew in a forest for decades — weathered seasons, absorbed sunlight, held birds. In our hands, that story continues. We turn it into furniture handcrafted with intention: pieces designed to be touched, lived with, and passed down. Quality isn&rsquo;t hidden in our work; it&rsquo;s in every joint, every grain, every finish. Heirloom pieces. Not for this moment, but for a lifetime.
        </p>
      </section>

      {/* Two-column origin story with portrait */}
      <article id="story" className={styles.feature}>
        <aside className={styles.featureImage}>
          <div className={`reveal ${styles.featureImageInner}`} style={{ backgroundImage: `url(${PORTRAIT_IMAGE})` }} />
          <span className={`reveal ${styles.imageCaption}`} style={{ '--delay': '160ms' }}>
            The shop.
          </span>
        </aside>

        <div className={styles.featureText}>
          <span className="reveal smallcaps">Our Story</span>
          <h2 className={`reveal ${styles.featureTitle}`} style={{ '--delay': '120ms' }}>
            For most of my life, I lived with furniture that felt <em>temporary.</em>
          </h2>
          <div className={`reveal ${styles.featureBody}`} style={{ '--delay': '240ms' }}>
            <p>IKEA when money was tight. Pottery Barn when I could stretch the budget. Pieces that looked fine in the store but never quite felt like mine — like they were just holding space until something better came along. I always assumed that something better was simply out of reach.</p>
            <p>What I really wanted was to be surrounded by beauty. Not just objects that filled a room, but pieces that felt alive — that had weight and warmth and a story. Furniture my children would want in their own homes one day. Things that would outlast me and carry something of our family forward.</p>
            <p className={styles.bigStatement}><em>Then I met Augustin.</em></p>
            <p>Augustin is a carpenter of rare talent — someone who understands wood the way a musician understands sound. I had sketches and dreams; he had the hands and the knowledge to bring them to life. Together we built the pieces I had spent decades imagining. A dining table that made me want to host every dinner party. A console that stopped me in my tracks every time I walked past it.</p>
            <p>After a few pieces, we looked at each other and knew: we couldn&rsquo;t keep this to ourselves. Briar &amp; Beam exists to bring the joy of truly beautiful, lasting furniture to the people who have always deserved it.</p>
          </div>
        </div>
      </article>

      {/* Pull quote */}
      <section className={styles.pullquote}>
        <p className="reveal">
          <span className={styles.openQuote}>&ldquo;</span>
          The most sustainable piece of furniture is the one <em>you never replace.</em>
        </p>
      </section>

      {/* Philosophy as numbered manifesto */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoHeader}>
          <span className="reveal smallcaps">Our Philosophy</span>
          <h2 className={`reveal ${styles.manifestoTitle}`} style={{ '--delay': '120ms' }}>
            A different way.
          </h2>
        </div>

        <ol className={styles.manifestoList}>
          <li className="reveal" style={{ '--delay': '0ms' }}>
            <div>
              <h3>Craft over convenience.</h3>
              <p>We prioritize quality and longevity over speed. Each piece takes weeks to complete. That&rsquo;s how long it takes to do it right.</p>
            </div>
          </li>
          <li className="reveal" style={{ '--delay': '120ms' }}>
            <div>
              <h3>Material honesty.</h3>
              <p>We celebrate the natural beauty of wood. No veneer, no shortcuts. You see the real grain, feel the real finish, and own something genuinely handmade by people who care.</p>
            </div>
          </li>
          <li className="reveal" style={{ '--delay': '240ms' }}>
            <div>
              <h3>Timeless design.</h3>
              <p>Our pieces don&rsquo;t follow trends. They&rsquo;re designed to feel current today and classic in fifty years — furniture that transcends seasons and improves with age.</p>
            </div>
          </li>
          <li className="reveal" style={{ '--delay': '360ms' }}>
            <div>
              <h3>Slowness as a feature.</h3>
              <p>Lead times of three to six weeks aren&rsquo;t a constraint — they&rsquo;re the method. Each piece is built front to back by the same pair of hands.</p>
            </div>
          </li>
        </ol>
      </section>

      {/* Sustainability colophon */}
      <section className={styles.coda}>
        <div className={styles.codaInner}>
          <span className="reveal smallcaps">Sustainability &amp; Ethics</span>
          <p className="reveal" style={{ '--delay': '120ms' }}>
            True sustainability isn&rsquo;t about green marketing — it&rsquo;s about making things worth keeping. Our wood comes from FSC-certified suppliers. Offcuts become smaller pieces or return to the earth. We ship in recyclable packaging.
          </p>
          <p className="reveal" style={{ '--delay': '240ms' }}>
            But our biggest commitment is the simplest: we make things that last. By choosing Briar &amp; Beam, you&rsquo;re not just buying a table — you&rsquo;re voting for a world where quality and longevity are valued over convenience and disposal.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <span className="reveal smallcaps">Visit the Collection</span>
        <h2 className={`reveal ${styles.ctaTitle}`} style={{ '--delay': '120ms' }}>
          Ready to bring a piece <em>home?</em>
        </h2>
        <div className={`reveal ${styles.ctaActions}`} style={{ '--delay': '240ms' }}>
          <Link href="/" className={styles.ctaPrimary}>
            <span className="smallcaps">View the Collection</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <a href="mailto:brianandbeam@gmail.com" className={styles.ctaSecondary}>
            <span className="smallcaps">Inquire about custom work</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>&copy; 2026 Briar &amp; Beam &middot; Made by hand</span>
        <span>
          <Link href="/shipping">Shipping</Link> &middot;
          <Link href="/returns"> Returns</Link> &middot;
          <Link href="/privacy"> Privacy</Link> &middot;
          <Link href="/terms"> Terms</Link>
        </span>
      </footer>
    </div>
  );
}
