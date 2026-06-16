import { Link } from 'react-router-dom'
import products from '../data/products'

const categoryColors = {
  'eBook': 'bg-blue-100 text-blue-700',
  'Planner': 'bg-green-100 text-green-700',
  'Checklist': 'bg-amber-100 text-amber-700',
}

export default function Products() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Product{' '}
            <span className="gradient-text">Catalog</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Browse our collection of AI-crafted digital templates, planners, and eBooks.
            Every asset is instantly downloadable after purchase.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.slug}`} className="card group">
              <div className="aspect-[16/10] bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white text-3xl font-bold">
                      {product.category === 'eBook' ? '📖' : product.category === 'Planner' ? '📅' : '✓'}
                    </span>
                  </div>
                  <span className={`badge ${categoryColors[product.category]} shadow-sm`}>
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <span className="font-bold text-xl text-purple-600">${product.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{product.shortDescription}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-4 h-4 text-purple-500">✦</span>
                    <span>{product.format}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="badge bg-gray-100 text-gray-600 text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}