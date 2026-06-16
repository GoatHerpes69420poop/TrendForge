import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TF</span>
            </div>
            <span className="font-bold text-xl">
              <span className="gradient-text">TrendForge</span>
              <span className="text-gray-900"> AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Catalog
            </Link>
            <Link to="/products" className="btn-primary text-sm !px-4 !py-2">
              Browse All
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}