import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { posts } from '../../data/journal';
import Seo, { articleJsonLd, breadcrumbJsonLd } from '../../components/Seo';
import styles from '../../styles/Journal.module.css';

export default function JournalPost() {
  const router = useRouter();
  const { slug } = router.query;
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
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  if (!router.isReady) return null;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <p className="smallcaps">Not found</p>
        <h1>This entry isn&rsquo;t in the journal.</h1>
        <Link href="/journal" className={styles.notFoundLink}>Back to the journal &rarr;</Link>
      </div>
    );
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className={styles.container}>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/journal/${post.slug}`}
        image={post.image}
        type="article"
        article={{
          published: post.date,
          modified: post.date,
          author: post.author,
          section: post.category,
          tags: post.keywords,
        }}
        jsonLd={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: 'Journal', path: '/journal' },
            { name: post.title, path: `/journal/${post.slug}` },
          ]),
        ]}
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
            <Link href="/about">Atelier</Link>
            <Link href="/journal">Journal</Link>
            <a href="mailto:briarandbeam@gmail.com">Inquire</a>
          </nav>
        </div>
      </header>

      <article className={styles.post}>
        <div className={styles.postHero}>
          <Link href="/journal" className={styles.postBack}>
            <span aria-hidden="true">&larr;</span>
            <span className="smallcaps">Journal</span>
          </Link>
          <p className={styles.postHead}>
            <span className="smallcaps">{post.category}</span>
            <span className={styles.entryDot}>·</span>
            <span>{post.readTime} read</span>
            <span className={styles.entryDot}>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <p className={styles.postExcerpt}>{post.excerpt}</p>
          <p className={styles.postAuthor}><em>By {post.author}</em></p>
        </div>

        <div className={styles.postImage} style={{ backgroundImage: `url(${post.image})` }} />

        <div className={styles.postBody}>
          {post.content.map((block, i) => {
            if (block.type === 'p') return <p key={i} className={styles.postPara}>{block.text}</p>;
            if (block.type === 'h2') return <h2 key={i} className={styles.postH2}>{block.text}</h2>;
            if (block.type === 'h3') return <h3 key={i} className={styles.postH3}>{block.text}</h3>;
            if (block.type === 'pullquote') {
              return (
                <blockquote key={i} className={styles.postPullquote}>
                  <span className={styles.postQuoteMark}>&ldquo;</span>
                  {block.text}
                </blockquote>
              );
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className={styles.postList}>
                  {block.text.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              );
            }
            return null;
          })}
        </div>
      </article>

      {related.length > 0 && (
        <section className={styles.related}>
          <p className={`reveal smallcaps ${styles.relatedHead}`}>More from the journal</p>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <Link key={p.slug} href={`/journal/${p.slug}`} className={`reveal ${styles.relatedCard}`}>
                <div className={styles.relatedImage} style={{ backgroundImage: `url(${p.image})` }} />
                <div>
                  <p className={styles.relatedHeadInner}>
                    <span className="smallcaps">{p.category}</span>
                    <span className={styles.entryDot}>·</span>
                    <span>{p.readTime}</span>
                  </p>
                  <h3 className={styles.relatedTitle}>{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className={styles.footer}>
        <span>&copy; 2026 Briar &amp; Beam &middot; Made by hand</span>
        <span><a href="mailto:briarandbeam@gmail.com">briarandbeam@gmail.com</a></span>
      </footer>
    </div>
  );
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
