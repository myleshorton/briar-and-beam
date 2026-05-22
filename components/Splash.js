import { useEffect, useState } from 'react';
import styles from '../styles/Splash.module.css';

export default function Splash() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem('bb_splash_seen')) {
        setShow(true);
        document.body.style.overflow = 'hidden';
      }
    } catch (e) {
      /* sessionStorage unavailable — skip splash */
    }
  }, []);

  const enter = () => {
    setLeaving(true);
    try { sessionStorage.setItem('bb_splash_seen', '1'); } catch (e) {}
    document.body.style.overflow = '';
    setTimeout(() => setShow(false), 1000);
  };

  if (!show) return null;

  return (
    <div
      className={`${styles.splash} ${leaving ? styles.leaving : ''}`}
      role="dialog"
      aria-label="Welcome to Briar & Beam"
    >
      <div
        className={styles.photo}
        style={{ backgroundImage: 'url(/images/atelier/makers-wide.jpg)' }}
        aria-hidden="true"
      />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.eyebrow} style={{ '--d': '200ms' }}>Heirloom Furniture</p>
        <h1 className={styles.wordmark} style={{ '--d': '360ms' }}>
          <span>Briar</span>
          <span className={styles.amp}>&amp;</span>
          <span>Beam</span>
        </h1>
        <p className={styles.tagline} style={{ '--d': '560ms' }}>
          Made by hand. <em>Made to last.</em>
        </p>
        <button className={styles.enter} onClick={enter} style={{ '--d': '760ms' }}>
          <span>Enter the shop</span>
          <span className={styles.arrow} aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
