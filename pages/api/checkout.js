// Stripe Checkout Session creation.
// Receives cart items, validates prices against canonical product data
// (never trusts client-sent prices), creates a Checkout Session, returns
// the URL the client redirects to.

import Stripe from 'stripe';
import { products } from '../../data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe is not configured on this deployment.' });
  }

  try {
    const { items } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Your cart is empty.' });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const line_items = items.map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Unknown product in cart.`);
      }

      // Look up canonical name/image/price from the product data
      const variant = product.variants && product.variants.find((v) => v.name === item.name);
      const wood = !variant && product.woodOptions && product.woodOptions.find((w) => w.name === item.selectedWood);

      let displayName, imagePath, unitPrice;
      if (variant) {
        displayName = `${product.name}: ${variant.name}`;
        imagePath = variant.image || product.image;
        unitPrice = variant.price;
      } else if (wood) {
        displayName = `${product.name} (${wood.name})`;
        imagePath = product.image;
        unitPrice = product.price + (wood.priceAdjust || 0);
      } else {
        displayName = product.name;
        imagePath = product.image;
        unitPrice = product.price;
      }

      if (!unitPrice || unitPrice <= 0) {
        throw new Error(`${displayName} is inquire-only and can't be checked out yet.`);
      }

      const images = imagePath && imagePath.startsWith('/')
        ? [`${origin}${imagePath}`]
        : imagePath
          ? [imagePath]
          : [];

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: displayName,
            description: product.category || undefined,
            images,
          },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: Math.max(1, Math.min(99, parseInt(item.quantity, 10) || 1)),
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      shipping_address_collection: { allowed_countries: ['US'] },
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      custom_text: {
        submit: {
          message:
            'Shipping is quoted separately after your order based on your address. We will contact you within one business day with the shipping cost and to confirm details.',
        },
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: err.message || 'Failed to create a checkout session.' });
  }
}
