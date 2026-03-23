import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

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

  const products = [
    {
      id: 1,
      name: 'The Eloise Table',
      description: 'Dining. Farm table in solid oak. Seats six. Matte finish.',
      price: 2400,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=700&fit=crop'
    },
    {
      id: 2,
      name: 'The Juniper',
      description: 'Side table. Walnut with refined proportions and hand-finished details.',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=700&fit=crop'
    },
    {
      id: 3,
      name: 'The Jack Side Tables',
      description: 'Side tables. Pair of oak tables with clean design. Versatile.',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=700&fit=crop'
    },
    {
      id: 4,
      name: 'The Julien',
      description: 'Coffee table. Handcrafted walnut with traditional joinery.',
      price: 3800,
      image: 'https://images.unsplash.com/photo-1577808840935-c00414ecd12d?w=500&h=700&fit=crop'
    },
    {
      id: 5,
      name: 'The Aubrey',
      description: 'Coffee table. French-inspired with six drawers. Walnut.',
      price: 4000,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=700&fit=crop'
    },
    {
      id: 6,
      name: 'The Livia',
      description: 'Console. Country style with timeless charm and handcrafted details.',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=700&fit=crop'
    }
  ];

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
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className={styles.cartIcon} onClick={() => setCartOpen(!cartOpen)}>
            🛒 <span className={styles.cartCount}>{cart.length}</span>
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <h2>Small Batch Furniture Built to Last</h2>
        <p>We believe in art and making people happy. Each piece is handcrafted with intention, designed to bring joy and endure for generations.</p>
      </section>

      {/* Products */}
      <main className={styles.main}>
        <div className={styles.productGrid}>
          {products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage} style={{ backgroundImage: `url(${product.image})` }}></div>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>${product.price.toLocaleString()}</p>
              <button className={styles.addButton} onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
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
