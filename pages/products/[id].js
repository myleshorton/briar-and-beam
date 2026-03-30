import { useRouter } from 'next/router';
import { products } from '../../data/products';
import styles from '../../styles/ProductDetail.module.css';
import { useState } from 'react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);

  if (!router.isReady) {
    return null;
  }

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('briarBeamCart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('briarBeamCart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    setQuantity(1);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <button onClick={() => router.push('/')}>← Back to Shop</button>
          <h1>Briar & Beam</h1>
        </div>
      </header>

      {/* Product Detail */}
      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          <div
            className={styles.mainImage}
            style={{ backgroundImage: `url(${product.image})` }}
          ></div>
        </div>

        <div className={styles.infoSection}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.price}>${product.price.toLocaleString()}</p>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.details}>
            <h3>Specifications</h3>
            <ul>
              {product.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}>
            <div className={styles.quantityControl}>
              <label>Quantity:</label>
              <div className={styles.quantityButtons}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          <div className={styles.shipping}>
            <p><strong>Shipping:</strong> Free within continental US</p>
            <p><strong>Returns:</strong> 30-day satisfaction guarantee</p>
            <p><strong>Questions?</strong> <a href="mailto:hello@briarandbeam.com">Contact us</a></p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 Briar & Beam. Handmade with intention.</p>
      </footer>
    </div>
  );
}
