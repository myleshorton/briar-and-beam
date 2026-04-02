import { useRouter } from 'next/router';
import { products } from '../../data/products';
import styles from '../../styles/ProductDetail.module.css';
import { useState } from 'react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);
  const [selectedWood, setSelectedWood] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!router.isReady) {
    return null;
  }

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('briarBeamCart')) || [];
    const wood = product.woodOptions?.[selectedWood]?.name || '';
    const cartId = `${product.id}-${wood}`;
    const existing = cart.find(item => item.cartId === cartId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        ...product,
        cartId,
        selectedWood: wood,
        price: product.price + (product.woodOptions?.[selectedWood]?.priceAdjust || 0),
        quantity
      });
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
            style={{ backgroundImage: `url(${(product.images || [product.image])[selectedImage]})` }}
          ></div>
          {product.images && (
            <div className={styles.thumbnailStrip}>
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`${styles.thumbnail} ${idx === selectedImage ? styles.thumbnailActive : ''}`}
                  style={{ backgroundImage: `url(${img})` }}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.price}>
            ${(product.price + (product.woodOptions?.[selectedWood]?.priceAdjust || 0)).toLocaleString()}
          </p>

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
            {product.woodOptions && (
              <div className={styles.woodSelect}>
                <label>Wood:</label>
                <select
                  value={selectedWood}
                  onChange={(e) => setSelectedWood(Number(e.target.value))}
                >
                  {product.woodOptions.map((option, idx) => (
                    <option key={idx} value={idx}>
                      {option.name}{option.priceAdjust > 0 ? ` (+$${option.priceAdjust})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
            <p><strong>Shipping:</strong> Calculated at checkout</p>
            <p><strong>Returns:</strong> No returns unless damaged</p>
            <p><strong>Questions?</strong> <a href="mailto:brianandbeam@gmail.com">Contact us</a></p>
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
