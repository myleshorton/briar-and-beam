import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/About.module.css';
import Seo, { organizationJsonLd } from '../components/Seo';

const HERO_IMAGE = '/images/atelier/makers-wide.jpg';
const PORTRAIT_IMAGE = '/images/atelier/makers-portrait.jpg';

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
      <Seo
        title="The Atelier — Two People, Solid Wood, Made by Hand"
        description="The story behind Briar & Beam — a small Colorado atelier making heirloom American hardwood furniture by hand. Solid walnut and white oak. Traditional joinery. Built to last generations."
        path="/about"
        jsonLd={organizationJsonLd}
      />

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
            <a href="mailto:briarandbeam@gmail.com">Inquire</a>
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
            <p className={styles.bigStatement}><em>Then I met Ronny.</em></p>
            <p>Ronny is a carpenter of rare talent — someone who understands wood the way a musician understands sound. I had sketches and dreams; he had the hands and the knowledge to bring them to life. Together we built the pieces I had spent decades imagining. A dining table that made me want to host every dinner party. A console that stopped me in my tracks every time I walked past it.</p>
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

      {/* What you're paying for */}
      <section className={styles.craft}>
        <div className={styles.craftInner}>
          <span className="reveal smallcaps">What You&rsquo;re Paying For</span>
          <h2 className={`reveal ${styles.craftTitle}`} style={{ '--delay': '120ms' }}>
            Solid wood. <em>Real hands.</em>
          </h2>
          <div className={`reveal ${styles.craftBody}`} style={{ '--delay': '240ms' }}>
            <p>Most furniture sold in America is veneer over engineered wood, stapled together, sprayed with lacquer, and shipped from a container. It looks like wood from across the room. It is not wood. It cannot be refinished, cannot be repaired, cannot be passed down. In ten years it ends up at the curb.</p>
            <p>We don&rsquo;t make any of that.</p>
            <p>Every Briar &amp; Beam piece is built from solid American hardwood &mdash; new walnut or new white oak, FSC-certified, chosen one board at a time. We join with mortise and tenon, drawbore pegs, hand-cut dovetails. No screws. No metal fasteners. No veneer. No shortcuts.</p>
            <p>The finish is six coats of hand-rubbed oil and wax, applied slowly by hand over two days. No spray gun. The wood keeps breathing; the finish only deepens with time.</p>
            <p>Each piece is built front to back by the same hands, made to order, signed and dated when it leaves the workshop. We don&rsquo;t keep inventory. We don&rsquo;t run a production line.</p>
          </div>

          <div className={`reveal ${styles.compareTable}`} style={{ '--delay': '360ms' }}>
            <div className={styles.compareHead}>
              <div></div>
              <div><span className="smallcaps">Briar &amp; Beam</span></div>
              <div><span className="smallcaps">Elsie Green</span></div>
              <div><span className="smallcaps">Roseland USA</span></div>
              <div><span className="smallcaps">Pottery Barn</span></div>
            </div>

            <div className={styles.compareRow}>
              <div className={styles.compareLabel}>Material</div>
              <div>New FSC-certified solid walnut &amp; white oak</div>
              <div>Mostly reclaimed pine &amp; mixed woods</div>
              <div>Solid American hardwood</div>
              <div>Veneer over MDF &amp; engineered wood</div>
            </div>

            <div className={styles.compareRow}>
              <div className={styles.compareLabel}>Where made</div>
              <div>Louisville, Colorado</div>
              <div>Mixed &mdash; US studios &amp; imported</div>
              <div>USA</div>
              <div>Asia (mass production)</div>
            </div>

            <div className={styles.compareRow}>
              <div className={styles.compareLabel}>Construction</div>
              <div>Mortise &amp; tenon, hand-cut dovetails, drawbore pegs</div>
              <div>Varies &mdash; mix of joinery &amp; production</div>
              <div>Traditional joinery</div>
              <div>Screws, staples, cam locks</div>
            </div>

            <div className={styles.compareRow}>
              <div className={styles.compareLabel}>Finish</div>
              <div>6 coats hand-rubbed oil &amp; wax</div>
              <div>Distressed, lime-washed, antiqued</div>
              <div>Hand-rubbed oil</div>
              <div>Spray lacquer / poly</div>
            </div>

            <div className={styles.compareRow}>
              <div className={styles.compareLabel}>Production</div>
              <div>One piece at a time, made to order</div>
              <div>Small-batch + curated vintage</div>
              <div>Made to order, small workshop</div>
              <div>Factory production runs</div>
            </div>

            <div className={styles.compareRow}>
              <div className={styles.compareLabel}>Signed by maker</div>
              <div>Every piece, dated</div>
              <div>No</div>
              <div>Yes</div>
              <div>No</div>
            </div>
          </div>

          <p className={`reveal ${styles.craftClose}`} style={{ '--delay': '480ms' }}>
            This is why our work costs more than the factory furniture you see at the chain stores. It also costs roughly the same &mdash; and sometimes less &mdash; than smaller atelier brands using reclaimed softwood or imported hardwood. The difference is the wood itself, and the hands that built it.
          </p>
        </div>
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
          <a href="mailto:briarandbeam@gmail.com" className={styles.ctaSecondary}>
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
