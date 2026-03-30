import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { products } from '../data/products';
import Router from 'next/router';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('briarBeamCart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('briarBeamCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    setCart(updated.filter(item => item.quantity > 0));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Briar & Beam</h1>
        </div>
        <nav className={styles.nav}>
          <a href="#shop">Shop</a>
          <Link href="/about">About</Link>
          <a href="#contact">Contact</a>
          <button className={styles.cartIcon} onClick={() => setCartOpen(!cartOpen)}>
            🛒 <span className={styles.cartCount}>{cart.length}</span>
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1500382017468-7049fae79ece?w=1200&h=1200&fit=crop)` }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroText}>
          <h2>Furniture Made for a Lifetime</h2>
          <p>We make things the right way. Slow. Thoughtful. Built to be loved, not replaced. Every piece is handcrafted by people who care about wood, about craft, about making something that will be in your home for decades.</p>
        </div>
      </section>

      {/* Products */}
      <main className={styles.main}>
        <div className={styles.productGrid}>
          {products.map(product => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className={styles.productCard}>
                <div
                  className={styles.productImage}
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.category}</p>
                <p className={styles.productPrice}>${product.price.toLocaleString()}</p>
                <button
                  className={styles.addButton}
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Cart Panel */}
      <div className={`${styles.cartPanel} ${cartOpen ? styles.cartOpen : ''}`}>
        <button className={styles.cartClose} onClick={() => setCartOpen(false)}>✕</button>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p className={styles.cartEmpty}>Your cart is empty</p>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div>
                    <p className={styles.cartItemName}>{item.name}</p>
                    <p className={styles.cartItemPrice}>${item.price}</p>
                    <div className={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cartTotal}>
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button className={styles.checkoutBtn}>Checkout (Coming Soon)</button>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 Briar & Beam. Handmade with intention.</p>
        <p>
          <a href="mailto:hello@briarandbeam.com">hello@briarandbeam.com</a> ·
          <a href="#">About</a> ·
          <a href="#">Sustainability</a>
        </p>
      </footer>
    </div>
  );
}
