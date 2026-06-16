import { useParams, Link } from 'react-router-dom'
import products from '../data/products'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn-primary">Browse Catalog</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-purple-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-purple-600">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Preview */}
        <div>
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-xl">
                <span className="text-white text-4xl">
                  {product.category === 'eBook' ? '📖' : product.category === 'Planner' ? '📅' : '✓'}
                </span>
              </div>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 text-purple-700 font-medium text-sm shadow-sm">
                {product.category}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="badge bg-gray-100 text-gray-600">{tag}</span>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-purple-500 rounded-full" />
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-purple-600 font-bold mb-2">${product.price}</p>
          <p className="text-gray-500 text-sm mb-6">{product.format}</p>
          <p className="text-lg text-gray-700 mb-8">{product.tagline}</p>

          {/* Long Description */}
          <div className="prose prose-gray max-w-none mb-8">
            {product.longDescription.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold text-lg text-gray-900">{line.replace(/\*\*/g, '')}</p>
              }
              if (line.startsWith('*') && line.endsWith('*')) {
                return <p key={i} className="italic text-gray-700">{line.replace(/\*/g, '')}</p>
              }
              return line ? <p key={i} className="text-gray-600">{line}</p> : null
            })}
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">What's Inside</h3>
            <ul className="space-y-3">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span className="text-gray-700">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="mb-8 bg-green-50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 text-green-800">Key Benefits</h3>
            <ul className="space-y-2">
              {product.benefits.map((ben, i) => (
                <li key={i} className="flex items-start gap-2 text-green-700">
                  <span>✅</span>
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Audience */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Who This Is For</h3>
            <div className="flex flex-wrap gap-2">
              {product.audience.map((a, i) => (
                <span key={i} className="badge bg-gray-100 text-gray-700">{a}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link to={`/checkout/${product.slug}`} className="btn-primary text-lg w-full text-center">
            Get Instant Access — ${product.price}
          </Link>
          <p className="text-center text-sm text-gray-500 mt-3">
            Instant PDF download • No shipping • Lifetime access
          </p>
        </div>
      </div>
    </div>
  )
}