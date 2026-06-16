/**
 * TrendForge AI — Stripe Checkout API Server
 * 
 * Runs alongside the Vite dev server.
 * Vite proxies /api/* to this server on port 3001.
 * 
 * Environment variables:
 *   STRIPE_SECRET_KEY — required (get from https://dashboard.stripe.com/test/apikeys)
 *   PORT — server port (default: 3001)
 *   CLIENT_URL — frontend URL for redirects (default: http://localhost:3000)
 */

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const path = require('path');

const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const app = express();
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// Stripe product configurations (matches products.js slugs)
const PRODUCT_MAP = {
  'ai-powered-content-creator': { name: 'The AI-Powered Content Creator', price: 1499 },
  '30-day-social-media-content-planner': { name: '30-Day Social Media Content Planner', price: 999 },
  'high-converting-resume-cover-letter-checklist': { name: 'High-Converting Resume & Cover Letter Checklist', price: 799 },
  'side-hustle-solopreneurs-playbook': { name: "The Side-Hustle Solopreneur's Playbook", price: 2499 },
  'no-code-saas-launch-checklist': { name: 'No-Code SaaS Launch Checklist', price: 1299 },
};

// If Stripe is configured, create a real Checkout Session
// Otherwise, return a simulated success response
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { slug, email, name } = req.body;

    if (!slug || !PRODUCT_MAP[slug]) {
      return res.status(400).json({ error: 'Invalid product slug' });
    }

    const product = PRODUCT_MAP[slug];

    if (SECRET_KEY) {
      // REAL Stripe Checkout Session
      const stripe = Stripe(SECRET_KEY);

      // First, get or create the product in Stripe
      const products = await stripe.products.list({ limit: 100 });
      let stripeProduct = products.data.find(p => p.metadata?.slug === slug);

      if (!stripeProduct) {
        stripeProduct = await stripe.products.create({
          name: product.name,
          metadata: { slug },
        });
      }

      // Create a price for this product
      const price = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.price,
        currency: 'usd',
      });

      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: price.id, quantity: 1 }],
        mode: 'payment',
        customer_email: email,
        success_url: `${CLIENT_URL}/download/${slug}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${CLIENT_URL}/checkout/${slug}`,
        metadata: { slug, customer_name: name || 'Customer' },
      });

      return res.json({ url: session.url });
    } else {
      // Fallback to real static Stripe Payment Links (pre-created for our managed Stripe account)
      const STATIC_PAYMENT_LINKS = {
        'ai-powered-content-creator': 'https://buy.stripe.com/14AcN44f5faU3o71xPe3e00',
        '30-day-social-media-content-planner': 'https://buy.stripe.com/4gMbJ0cLB0g04sbdgxe3e01',
        'high-converting-resume-cover-letter-checklist': 'https://buy.stripe.com/14A00i3b1d2MbUD3FXe3e02',
        'side-hustle-solopreneurs-playbook': 'https://buy.stripe.com/fZu9ASaDtaUE5wfgsJe3e03',
        'no-code-saas-launch-checklist': 'https://buy.stripe.com/28E8wOh1R4wg8Ir5O5e3e04'
      };

      const paymentLink = STATIC_PAYMENT_LINKS[slug];
      if (paymentLink) {
        const redirectUrl = `${paymentLink}?prefilled_email=${encodeURIComponent(email)}`;
        console.log(`[Stripe API] Redirecting ${email} to live hosted Checkout link for ${slug}`);
        return res.json({
          url: redirectUrl,
          simulated: false,
          isStaticLink: true
        });
      } else {
        return res.json({
          url: `${CLIENT_URL}/download/${slug}?mode=simulated`,
          simulated: true,
        });
      }
    }
  } catch (err) {
    console.error('Stripe error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    stripe: SECRET_KEY ? 'configured' : 'simulated',
    mode: SECRET_KEY ? 'live payments' : 'development (no Stripe key)',
  });
});

app.listen(PORT, () => {
  console.log(`\n🔑 Stripe API server running on port ${PORT}`);
  console.log(`   Mode: ${SECRET_KEY ? '🔴 LIVE (Stripe connected)' : '🟡 SIMULATED (no STRIPE_SECRET_KEY)'}`);
  console.log(`   Frontend: ${CLIENT_URL}`);
  if (!SECRET_KEY) {
    console.log(`\n   To enable live payments, set:`);
    console.log(`   STRIPE_SECRET_KEY=sk_test_... node server/stripe-api.js`);
    console.log(`   Get a key at https://dashboard.stripe.com/test/apikeys\n`);
  }
});