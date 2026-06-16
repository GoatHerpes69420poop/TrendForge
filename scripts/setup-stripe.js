#!/usr/bin/env node
/**
 * Stripe Product & Price Setup Script for TrendForge AI
 * 
 * Run: node scripts/setup-stripe.js
 * Requires: STRIPE_SECRET_KEY environment variable
 * 
 * Creates Stripe Products, Prices (one-time), and Payment Links
 * and outputs configuration to be added to products.js
 */

const Stripe = require('stripe');

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!SECRET_KEY) {
  console.error('ERROR: STRIPE_SECRET_KEY environment variable is required.');
  console.error('  Get your test key from https://dashboard.stripe.com/test/apikeys');
  console.error('  Then run: STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe.js');
  process.exit(1);
}

const stripe = Stripe(SECRET_KEY);

const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

const products = [
  {
    name: 'The AI-Powered Content Creator',
    description: '70+ page eBook — Master AI-powered content creation with 100+ prompts and workflows.',
    price: 14.99,
    images: ['https://placehold.co/400x600/9333ea/ffffff?text=AI+Content+Creator'],
    metadata: { slug: 'ai-powered-content-creator', type: 'eBook', pages: '70+' },
  },
  {
    name: '30-Day Social Media Content Planner',
    description: '40+ page planner — Complete daily content framework with AI prompts for all platforms.',
    price: 9.99,
    images: ['https://placehold.co/400x600/f97316/ffffff?text=Social+Planner'],
    metadata: { slug: '30-day-social-media-content-planner', type: 'Planner', pages: '40+' },
  },
  {
    name: 'High-Converting Resume & Cover Letter Checklist',
    description: '25+ page checklist — ATS-optimized audit system with 100+ checkpoints.',
    price: 7.99,
    images: ['https://placehold.co/400x600/059669/ffffff?text=Resume+Checklist'],
    metadata: { slug: 'high-converting-resume-cover-letter-checklist', type: 'Checklist', pages: '25+' },
  },
  {
    name: "The Side-Hustle Solopreneur's Playbook",
    description: '35+ page eBook — 90-day blueprint to building a $5k/month digital product business.',
    price: 24.99,
    images: ['https://placehold.co/400x600/059669/ffffff?text=Solopreneur+Playbook'],
    metadata: { slug: 'side-hustle-solopreneurs-playbook', type: 'eBook', pages: '35+' },
  },
  {
    name: 'No-Code SaaS Launch Checklist',
    description: '30+ page checklist — Complete guide from idea validation to post-launch growth, no code required.',
    price: 12.99,
    images: ['https://placehold.co/400x600/4f46e5/ffffff?text=SaaS+Checklist'],
    metadata: { slug: 'no-code-saas-launch-checklist', type: 'Checklist', pages: '30+' },
  },
];

async function setupStripe() {
  console.log('🚀 Setting up TrendForge AI products on Stripe...\n');

  const results = [];

  for (const product of products) {
    console.log(`Creating: ${product.name} — $${product.price}`);

    // Create or lookup Stripe Product
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      images: product.images,
      metadata: product.metadata,
    });
    console.log(`  ✅ Product created: ${stripeProduct.id}`);

    // Create Price (one-time)
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: Math.round(product.price * 100), // Stripe uses cents
      currency: 'usd',
    });
    console.log(`  ✅ Price created: ${stripePrice.id}`);

    // Create Payment Link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      after_completion: {
        type: 'redirect',
        redirect: { url: `${DOMAIN}/download/${product.metadata.slug}` },
      },
      metadata: { slug: product.metadata.slug },
    });
    console.log(`  ✅ Payment Link: ${paymentLink.url}`);

    results.push({
      slug: product.metadata.slug,
      stripeProductId: stripeProduct.id,
      stripePriceId: stripePrice.id,
      stripePaymentLink: paymentLink.url,
    });
  }

  console.log('\n📋 === STRIPE CONFIGURATION ===');
  console.log('Add the following to your products.js:\n');
  console.log('// Stripe Configuration');
  for (const r of results) {
    console.log(`// ${r.slug}`);
    console.log(`stripeProductId: '${r.stripeProductId}',`);
    console.log(`stripePriceId: '${r.stripePriceId}',`);
    console.log(`stripePaymentLink: '${r.stripePaymentLink}',`);
    console.log('');
  }
}

setupStripe().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});