import Link from 'next/link';
import { useEffect, useState } from 'react';
import { posts } from '../../data/journal';
import Seo from '../../components/Seo';
import styles from '../../styles/Journal.module.css';

export default function Journal() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(document.documentElement.scrollTop > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className={styles.container}>
      <Seo
        title="Journal — Notes from the Atelier"
        description="Notes on craft, wood, and the slow making of heirloom furniture. From the Briar & Beam workshop in Louisville, Colorado."
        path="/journal"
      />

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
            <Link href="/journal">Journal</Link>
            <a href="mailto:briarandbeam@gmail.com">Inquire</a>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <span className="rise smallcaps" style={{ '--delay': '200ms' }}>The Journal</span>
        <h1 className="rise" style={{ '--delay': '400ms' }}>
          Notes from the <em>atelier.</em>
        </h1>
        <p className={`rise ${styles.heroDek}`} style={{ '--delay': '600ms' }}>
          On craft, on wood, on the slow making of heirloom furniture.
        </p>
      </section>

      <section className={styles.list}>
        {sortedPosts.map((post, i) => (
          <article key={post.slug} className={`reveal ${styles.entry}`} style={{ '--delay': `${i * 80}ms` }}>
            <Link href={`/journal/${post.slug}`} className={styles.entryLink}>
              <div className={styles.entryImage} style={{ backgroundImage: `url(${post.image})` }} />
              <div className={styles.entryMeta}>
                <p className={styles.entryHead}>
                  <span className="smallcaps">{post.category}</span>
                  <span className={styles.entryDot}>·</span>
                  <span>{post.readTime} read</span>
                </p>
                <h2 className={styles.entryTitle}>{post.title}</h2>
                <p className={styles.entryExcerpt}>{post.excerpt}</p>
                <span className={styles.entryRead}>
                  <span>Read</span>
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </section>

      <footer className={styles.footer}>
        <span>&copy; 2026 Briar &amp; Beam &middot; Made by hand</span>
        <span><a href="mailto:briarandbeam@gmail.com">briarandbeam@gmail.com</a></span>
      </footer>
    </div>
  );
}
