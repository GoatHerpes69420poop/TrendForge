import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import products from '../data/products'

export default function Checkout() {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [processing, setProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="btn-primary">Browse Catalog</Link>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase! Your download is ready.
          </p>
          <Link to={`/download/${product.slug}`} className="btn-primary text-lg">
            Download Your Product
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      setCompleted(true)
    }, 1500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                placeholder="john@example.com"
              />
              <p className="text-sm text-gray-500 mt-1">Your download link will be sent here</p>
            </div>

            {/* Simulated Payment */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Payment Method</h3>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Credit / Debit Card</p>
                  <p className="text-xs text-gray-500">Secure payment via Stripe</p>
                </div>
                <span className="text-green-600 text-sm font-medium">✓</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="btn-primary w-full text-lg disabled:opacity-70"
            >
              {processing ? 'Processing...' : `Pay $${product.price} — Get Instant Access`}
            </button>
            <p className="text-center text-xs text-gray-500">
              🔒 Secure checkout. Your information is protected.
            </p>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-6">Order Summary</h3>
            <div className="flex gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">
                  {product.category === 'eBook' ? '📖' : product.category === 'Planner' ? '📅' : '✓'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm">{product.name}</p>
                <p className="text-xs text-gray-500 mt-1">{product.category}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${product.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                <span>Total</span>
                <span className="text-purple-600">${product.price}</span>
              </div>
            </div>
            <div className="mt-6 space-y-2 text-xs text-gray-500">
              <p className="flex items-center gap-2">✅ Instant PDF download</p>
              <p className="flex items-center gap-2">✅ Lifetime access</p>
              <p className="flex items-center gap-2">✅ Free updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}