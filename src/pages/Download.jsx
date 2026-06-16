import { useParams, Link } from 'react-router-dom'
import products from '../data/products'

export default function Download() {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Download Not Found</h1>
        <Link to="/products" className="btn-primary">Browse Catalog</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-4xl">🎉</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-gray-500 mb-8">Your download is ready</p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <span className="text-2xl">
                {product.category === 'eBook' ? '📖' : product.category === 'Planner' ? '📅' : '✓'}
              </span>
            </div>
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.format}</p>
            </div>
          </div>
          <div className="space-y-3">
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault()
                alert(`Download initiated: ${product.name}\n\nIn production, this would trigger a secure PDF download.`)
              }}
              className="btn-primary w-full text-center"
            >
              ⬇ Download Now
            </Link>
            <p className="text-xs text-gray-500 text-center">
              The download will start automatically. A copy has also been sent to your email.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold mb-4">You Might Also Like</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {products.filter(p => p.id !== product.id).slice(0, 2).map(p => (
              <Link key={p.id} to={`/product/${p.slug}`} className="card p-4 text-left group">
                <p className="font-semibold text-sm group-hover:text-purple-600 transition-colors">{p.name}</p>
                <p className="text-purple-600 font-bold text-sm mt-1">${p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}