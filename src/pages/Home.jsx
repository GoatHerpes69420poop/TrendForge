import { Link } from 'react-router-dom'
import products from '../data/products'

export default function Home() {
  const featured = products.filter(p => p.popular)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              AI-Powered Digital Assets
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Premium Digital{' '}
              <span className="gradient-text">Templates</span>
              {' '}&amp;{' '}
              <span className="gradient-text">eBooks</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
              Instantly downloadable, AI-crafted templates and guides for creators,
              freelancers, and students. Jumpstart your next project with premium-grade materials.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary text-lg">
                Explore Catalog
              </Link>
              <Link to="/products" className="btn-secondary text-lg">
                View All Products
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative gradient blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
      </section>

      {/* Trust Bar */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl font-bold gradient-text">Instant</p>
              <p className="text-sm text-gray-500">Download</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">AI-Crafted</p>
              <p className="text-sm text-gray-500">Premium Quality</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">100+</p>
              <p className="text-sm text-gray-500">Ready Prompts</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">Proven</p>
              <p className="text-sm text-gray-500">Frameworks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trending{' '}
            <span className="gradient-text">Assets</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our most popular digital products — crafted by AI, designed for creators.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.slug}`} className="card group">
              <div className="aspect-[16/10] bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white text-2xl font-bold">
                      {product.category === 'eBook' ? '📖' : product.category === 'Planner' ? '📅' : '✓'}
                    </span>
                  </div>
                  <span className="badge bg-white/80 text-purple-700 shadow-sm">{product.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  <span className="font-bold text-lg text-purple-600">${product.price}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{product.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="badge bg-gray-100 text-gray-600 text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Level Up?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Get instant access to our entire library of AI-crafted templates, planners, and guides.
          </p>
          <Link to="/products" className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-purple-700 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Browse the Catalog
          </Link>
        </div>
      </section>
    </div>
  )
}