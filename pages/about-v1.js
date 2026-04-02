import Link from 'next/link';
import styles from '../styles/About.module.css';

export default function AboutV1() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <h1>Briar & Beam</h1>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/">Shop</Link>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h2>Furniture That Tells a Story</h2>
            <p>Every piece of wood has lived. It grew in a forest for decades, weathered seasons, absorbed sunlight. In our hands, that story continues. We transform it into furniture handcrafted with intention&mdash;pieces designed to be touched, lived with, and passed down. Quality isn&apos;t hidden in our work; it&apos;s in every joint, every grain, every finish. Furniture that&apos;s beautiful inside and out. Heirloom pieces. Not for this moment, but for a lifetime.</p>
          </div>
          <div className={styles.heroImage}>
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=700&fit=crop" alt="Handcrafted wooden furniture" />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <main className={styles.main}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Our Story</h3>
          <p className={styles.sectionText}>
            For most of my life, I lived with furniture that felt temporary. IKEA when money was tight. Pottery Barn when I could stretch the budget. Pieces that looked fine in the store but never quite felt like mine &mdash; like they were just holding space until something better came along. I always assumed that something better was simply out of reach.
          </p>
          <p className={styles.sectionText}>
            What I really wanted was to be surrounded by beauty. Not just objects that filled a room, but pieces that felt alive &mdash; that had weight and warmth and a story. Furniture my children would want in their own homes one day. Things that would outlast me and carry something of our family forward.
          </p>
          <p className={styles.sectionText}>
            Then I met Ronny.
          </p>
          <p className={styles.sectionText}>
            Ronny is a carpenter of rare talent &mdash; someone who understands wood the way a musician understands sound. I had sketches and dreams; he had the hands and the knowledge to bring them to life. Together we built the pieces I had spent decades imagining. A dining table that made me want to host every dinner party. A console that stopped me in my tracks every time I walked past it. Furniture that finally felt like it belonged.
          </p>
          <p className={styles.sectionText}>
            After a few pieces, we looked at each other and knew: we couldn&apos;t keep this to ourselves. If I had spent my whole life wanting this and not knowing where to find it, so had a lot of other people. That&apos;s why Briar &amp; Beam exists &mdash; to bring the joy of truly beautiful, lasting furniture to the people who have always deserved it.
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>A Different Way</h3>
          <p className={styles.sectionText}>
            We live in a culture that celebrates speed, scale, and savings. Buy now, replace later. Mass-produce, cut corners, move on to the next thing. Most furniture today is designed with an invisible expiration date&mdash;engineered to be affordable and disposable, not to endure.
          </p>
          <p className={styles.sectionText}>
            But something shifts when you own a piece made to last. A table built with mortise-and-tenon joinery doesn&apos;t just hold your meals&mdash;it becomes part of your home&apos;s story. A console made from solid walnut doesn&apos;t just store your keys&mdash;it grows more beautiful as it ages. Quality furniture isn&apos;t a luxury; it&apos;s a rebellion against waste.
          </p>
          <p className={styles.sectionText}>
            We&apos;ve chosen a harder path. Slower. More expensive upfront. But infinitely more worthwhile.
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Our Philosophy</h3>
          <div className={styles.philosophy}>
            <div className={styles.philosophyItem}>
              <h4>Craft Over Convenience</h4>
              <p>We prioritize quality and longevity over speed. Each piece takes weeks to complete, allowing us to perfect every detail and ensure structural integrity that lasts generations.</p>
            </div>
            <div className={styles.philosophyItem}>
              <h4>Material Honesty</h4>
              <p>We celebrate the natural beauty of wood. No veneer, no shortcuts. You see the real grain, feel the real finish, and own something genuinely handmade by people who care.</p>
            </div>
            <div className={styles.philosophyItem}>
              <h4>Timeless Design</h4>
              <p>Our pieces don&apos;t follow trends. They&apos;re designed to feel current today and classic in fifty years&mdash;furniture that transcends seasons and styles and actually improves with age.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>The Process</h3>
          <p className={styles.sectionText}>
            From selection to delivery, every step matters. We begin by choosing wood that speaks to us&mdash;examining grain patterns, checking for stability, and envisioning the finished piece. Hand-joinery comes next: mortise and tenon joints, dovetails, and traditional techniques that create strength without fasteners.
          </p>
          <p className={styles.sectionText}>
            Finishing is where wood truly comes alive. We use hand-applied oils and waxes that enhance the natural color while protecting the surface. The result is furniture with warmth and character&mdash;not a uniform, factory shine, but the authentic patina of a well-made thing.
          </p>
          <p className={styles.sectionText}>
            Lead times vary by piece, typically 3&ndash;6 weeks. This isn&apos;t a drawback&mdash;it&apos;s a feature. We build to order, ensuring each piece is crafted with focus and care, just for you.
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Sustainability &amp; Ethics</h3>
          <p className={styles.sectionText}>
            True sustainability isn&apos;t about green marketing&mdash;it&apos;s about making things worth keeping. We&apos;re committed to responsible forestry and minimal waste. Our wood suppliers are certified and share our values. Offcuts become smaller pieces or return to the earth. We ship in recyclable packaging and work with carbon-conscious logistics partners.
          </p>
          <p className={styles.sectionText}>
            But our biggest environmental commitment is the simplest: we make things that last. The most sustainable piece of furniture is the one you never replace. By choosing Briar &amp; Beam, you&apos;re not just buying a table&mdash;you&apos;re voting for a world where quality and longevity are valued over convenience and disposal.
          </p>
        </section>

        <section className={styles.cta}>
          <h3>Ready to Bring Home a Piece of Briar &amp; Beam?</h3>
          <p>Browse our collection or get in touch to discuss a custom piece.</p>
          <div className={styles.ctaButtons}>
            <Link href="/" className={styles.button}>Shop Now</Link>
            <a href="mailto:brianandbeam@gmail.com" className={styles.button + ' ' + styles.secondary}>Get in Touch</a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 Briar & Beam. Handmade with intention.</p>
        <p>
          <a href="mailto:brianandbeam@gmail.com">brianandbeam@gmail.com</a> ·
          <Link href="/about">About</Link> ·
          <a href="#sustainability">Sustainability</a>
        </p>
      </footer>
    </div>
  );
}
